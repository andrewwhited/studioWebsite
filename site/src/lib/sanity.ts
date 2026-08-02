import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const IS_PROD = process.env.NODE_ENV === 'production'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  // The CDN caches for up to a minute after a publish. That's the right trade
  // for a build, and the wrong one on localhost — it looks like the change
  // simply didn't land, and refreshing the browser can't help because the
  // staleness is server-side.
  useCdn: IS_PROD,
})

// Two caches sit between a publish and localhost: Sanity's CDN (handled above)
// and Next's Data Cache, which holds a fetch result across requests and
// outlasts the CDN by a good margin. Development bypasses both, so a publish
// shows on the next page load. Production keeps them — they're what make the
// site fast.
//
// A Proxy rather than a wrapper object so `urlFor` and every other client
// method keep working untouched.
export const sanity = IS_PROD
  ? client
  : (new Proxy(client, {
      get(target, prop, receiver) {
        if (prop !== 'fetch') return Reflect.get(target, prop, receiver)
        return (query: string, params?: Record<string, unknown>) =>
          target.fetch(query, params ?? {}, { cache: 'no-store' })
      },
    }) as typeof client)

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}
