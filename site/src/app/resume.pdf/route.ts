import { NextResponse } from 'next/server'
import { getUxPage } from '@/lib/sanity-queries'

// Stable /resume.pdf URL that redirects to the current Sanity-hosted file.
// Uploading a new resume in the CMS updates the destination automatically —
// the public URL never changes, so any external links remain valid.

const SANITY_PROJECT = 'uwr1du4g'
const SANITY_DATASET = 'production'

export const revalidate = 300

export async function GET() {
  const page = await getUxPage().catch(() => null)
  const ref = page?.resumeFile?.asset?._ref

  if (!ref) {
    return new NextResponse('Resume not available', { status: 404 })
  }

  // Sanity asset refs look like `file-<hash>-pdf`; the CDN URL needs `<hash>.pdf`.
  const filename = ref.replace(/^file-/, '').replace(/-pdf$/, '.pdf')
  const cdnUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT}/${SANITY_DATASET}/${filename}`

  return NextResponse.redirect(cdnUrl, 302)
}
