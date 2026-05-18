'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return (
    <div id="sanity-studio-root" className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  );
}
