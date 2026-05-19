/**
 * Sanity Webhook Revalidation Endpoint
 *
 * Receives POST requests from Sanity when content changes,
 * validates the HMAC-SHA256 signature, and invalidates both
 * the Data Cache (via revalidateTag) and the Full Route Cache
 * (via revalidatePath) so pages re-render with fresh data.
 *
 * Configure the webhook at: https://www.sanity.io/manage
 * → Project → API → Webhooks
 */
import { revalidateTag, revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';
import type { NextRequest } from 'next/server';

// Sanity document types that affect the frontend
const VALID_TYPES = new Set([
  'category',
  'menuItem',
  'siteSettings',
  'supplement',
  'supplementGroup',
]);

// Cascade map: when a type changes, also invalidate these related tags
const CASCADE_MAP: Record<string, string[]> = {
  supplement: ['category', 'menuItem'],
  supplementGroup: ['category', 'menuItem'],
};

type WebhookPayload = {
  _type: string;
  _id: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_WEBHOOK_SECRET,
      true // wait for Content Lake eventual consistency (~3s)
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Missing document type', { status: 400 });
    }

    const type = body._type;

    if (!VALID_TYPES.has(type)) {
      return Response.json(
        { skipped: true, reason: `Unknown type: ${type}` },
        { status: 200 }
      );
    }

    // Invalidate the Data Cache tags
    revalidateTag(type, { expire: 0 });

    // Invalidate cascading dependencies
    const cascades = CASCADE_MAP[type];
    if (cascades) {
      for (const tag of cascades) {
        revalidateTag(tag, { expire: 0 });
      }
    }

    // Bust the Full Route Cache for all menu pages.
    // revalidateTag may not fully propagate to route-level caches
    // when used with unstable_cache in Next.js 16, so we explicitly
    // invalidate the route tree as well.
    revalidatePath('/menu', 'layout');

    console.log(`[revalidate] Purged tag "${type}"${cascades ? ` + cascades: ${cascades.join(', ')}` : ''} + route cache`);

    return Response.json({
      revalidated: true,
      type,
      now: Date.now(),
    });
  } catch (err) {
    console.error('[revalidate] Webhook error:', err);
    return new Response('Internal server error', { status: 500 });
  }
}
