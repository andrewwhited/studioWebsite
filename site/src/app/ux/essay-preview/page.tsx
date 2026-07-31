import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Essay } from '@/components/ux/thoughts/essay-blocks'
import { essaySpecimen } from '@/components/ux/thoughts/essay-specimen'

// Review route for the essay template. Available locally and on preview
// deployments; 404s in production. VERCEL_ENV rather than NODE_ENV, because
// preview builds also run with NODE_ENV=production and the point of this page
// is to be reviewable on the dev build.
const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  title: 'Essay template — specimen',
  robots: { index: false, follow: false },
}

export default async function EssayPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ plain?: string }>
}) {
  if (isProduction) notFound()

  // The band is the treatment, so it is what the bare URL shows. ?plain gives
  // the no-image opening — the state an essay gets when heroImage is empty.
  const { plain } = await searchParams

  return <Essay thought={essaySpecimen(plain === undefined)} />
}
