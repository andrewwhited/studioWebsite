// JSON-LD Person schema for the UX homepage.
// Structure (schema.org keys) stays here; content (description, jobTitle,
// awards, etc.) is sourced from the uxSiteSettings singleton in Sanity.
// Refresh the description + currentOccupations every 6–8 weeks so AI tools
// keep a warm "currently" signal.

const SITE_URL = 'https://ux.andrewwhited.com'
const STUDIO_URL = 'https://andrewwhited.com'

// Stable identifier for the one Andrew Whited across every page's JSON-LD.
// Each case study and essay names this as its author instead of minting a
// fresh Person, so a crawler sees one entity with a body of work rather than
// a scatter of same-named strangers.
export const PERSON_ID = `${SITE_URL}/#person`
const PORTRAIT_FALLBACK =
  'https://cdn.sanity.io/images/uwr1du4g/production/c5cf0d8fc5f5c2359b39fa830a55f5c307908a74-3047x4547.jpg?w=800&q=80&auto=format'

const FALLBACK = {
  description:
    'Senior design leader with 11 years at IBM scaling design across Hybrid Cloud, Business Automation, and AIOps. AI product design, information architecture, multi-team design leadership.',
  jobTitle: 'Senior Design Leader',
  address: { locality: 'Austin', region: 'TX', country: 'US' },
  knowsAbout: [
    'AI Product Design',
    'Generative AI',
    'Agentic Systems',
    'Information Architecture',
    'Enterprise UX',
    'Design Leadership',
    'Multi-team Design Alignment',
    'AIOps',
    'Observability',
    'Business Automation',
    'Hybrid Cloud',
    'Design Systems',
    'UX Research Strategy',
  ],
  awards: ['IBM Outstanding Technical Achievement Award (2017)'],
  occupations: [
    { title: 'Senior Design Lead (Staff), AIOps', organization: 'IBM' },
    { title: 'Senior Design Lead (Staff), Business Automation', organization: 'IBM' },
  ],
  alumniOf: 'Auburn University',
  sameAs: ['https://linkedin.com/in/andrewwhited', STUDIO_URL],
}

type Settings = {
  personDescription?: string
  personJobTitle?: string
  personAddress?: { locality?: string; region?: string; country?: string }
  personKnowsAbout?: string[]
  personAwards?: string[]
  personOccupations?: { title?: string; organization?: string }[]
  personAlumniOf?: string
  personSameAs?: string[]
}

export function buildPersonSchema(
  settings: Settings | null,
  portraitUrl?: string,
  email?: string,
) {
  const description = settings?.personDescription || FALLBACK.description
  const jobTitle = settings?.personJobTitle || FALLBACK.jobTitle
  const address = settings?.personAddress || FALLBACK.address
  const knowsAbout =
    settings?.personKnowsAbout && settings.personKnowsAbout.length
      ? settings.personKnowsAbout
      : FALLBACK.knowsAbout
  const award =
    settings?.personAwards && settings.personAwards.length
      ? settings.personAwards
      : FALLBACK.awards
  const occupations =
    settings?.personOccupations && settings.personOccupations.length
      ? settings.personOccupations
      : FALLBACK.occupations
  const alumniOf = settings?.personAlumniOf || FALLBACK.alumniOf
  const sameAs =
    settings?.personSameAs && settings.personSameAs.length
      ? settings.personSameAs
      : FALLBACK.sameAs

  // Bare Person — simpler signal for AI tools / recruiter bots. ProfilePage
  // would add a Google rich-snippet wrapper, but that's not the audience here.
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Andrew Whited',
    url: SITE_URL,
    image: portraitUrl || PORTRAIT_FALLBACK,
    jobTitle,
    description,
    ...(email && { email: `mailto:${email}` }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: alumniOf,
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Andrew Whited Studio',
      url: STUDIO_URL,
    },
    knowsAbout,
    sameAs: [...sameAs, `${SITE_URL}/resume.pdf`],
    award,
    hasOccupation: occupations
      .filter((o) => o.title)
      .map((o) => ({
        '@type': 'Occupation',
        name: o.title,
        ...(o.organization && {
          occupationLocation: { '@type': 'Organization', name: o.organization },
        }),
      })),
  }
}
