const MAX_IMAGE_SIZE = 512_000 // 500 KB
const ALLOWED_EXTENSIONS = ['jpg', 'png']

export const imageValidation = (Rule: any) =>
  Rule.custom(async (value: any, context: any) => {
    if (!value?.asset?._ref) return true

    // 1. Check format from asset ref (format: image-{id}-{dimensions}-{ext})
    const ext = value.asset._ref.split('-').pop()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return 'Format accepté : JPG ou PNG uniquement'
    }

    // 2. Check file size via Sanity client
    const client = context.getClient({ apiVersion: '2024-01-01' })
    const asset = await client.fetch(
      `*[_type == "sanity.imageAsset" && _id == $id][0]{ size }`,
      { id: value.asset._ref.replace('image-', '').replace(/-/g, '') }
    )
    // Fallback: query by _ref directly
    const assetDoc = asset || await client.fetch(
      `*[_id == $ref][0]{ size }`,
      { ref: value.asset._ref }
    )
    if (assetDoc?.size && assetDoc.size > MAX_IMAGE_SIZE) {
      const sizeKB = Math.round(assetDoc.size / 1024)
      return `Image trop lourde (${sizeKB} KB). Maximum : 500 KB`
    }

    return true
  })
