/**
 * Spotify — monthly top artists.
 *
 * Auth is a one-time authorization-code grant (see scripts/spotifyAuth.mjs)
 * that yields a long-lived refresh token; short-lived access tokens are
 * minted from it server-side. Nothing here is exposed to the client — none
 * of these vars carry the NEXT_PUBLIC_ prefix.
 *
 * Both fetches revalidate on the same daily cycle as the page, so a page
 * regeneration mints exactly one token and makes exactly one API call.
 */

const REVALIDATE = 86400 // one day — top artists move slowly

export type TopArtist = {
  id: string
  name: string
  image: string | null
}

async function getAccessToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID
  const secret = process.env.SPOTIFY_CLIENT_SECRET
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN

  if (!id || !secret || !refresh) {
    console.warn('[spotify] credentials not configured — skipping')
    return null
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
    },
    body: new URLSearchParams({grant_type: 'refresh_token', refresh_token: refresh}),
    next: {revalidate: REVALIDATE},
  })

  if (!res.ok) {
    // Loud in logs, quiet on the page. A revoked refresh token fails here,
    // and it should be diagnosable without taking the page down.
    console.error(`[spotify] token refresh failed: ${res.status} ${await res.text()}`)
    return null
  }

  const data = await res.json()
  return data.access_token ?? null
}

export async function getTopArtists(limit = 5): Promise<TopArtist[]> {
  try {
    const token = await getAccessToken()
    if (!token) return []

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=${limit}`,
      {
        headers: {Authorization: `Bearer ${token}`},
        next: {revalidate: REVALIDATE},
      },
    )

    if (!res.ok) {
      console.error(`[spotify] top artists failed: ${res.status} ${await res.text()}`)
      return []
    }

    const data = await res.json()

    return (data.items ?? []).map((a: any) => ({
      id: a.id,
      // Smallest variant — these render at thumbnail size, and the 640px
      // original is 16x the pixels the layout can use.
      image: a.images?.length ? a.images[a.images.length - 1].url : null,
      name: a.name,
    }))
  } catch (err) {
    // Never let a third party take down the page.
    console.error('[spotify] unreachable:', err)
    return []
  }
}
