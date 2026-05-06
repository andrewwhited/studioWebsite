import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/*
  Subdomain routing.

  Production:
    andrewwhited.com      → 301 redirect to ux.andrewwhited.com (same path)
    www.andrewwhited.com  → 301 redirect to ux.andrewwhited.com (same path)
    ux.andrewwhited.com   → internally rewrites to /ux/* paths

  Phase 1 posture: the apex redirect trains people toward the canonical
  ux.andrewwhited.com URL. To start serving the studio (main) site from
  the apex (Phase 2), remove the apex redirect block below.

  Local development options:
    Option A (recommended): Add to /etc/hosts:
      127.0.0.1  ux.localhost
    Then visit: http://ux.localhost:3000
    The middleware will rewrite to /ux/* correctly.

    Option B: Visit http://localhost:3000/ux directly.
    Internal links within UX pages will work on the subdomain
    but not from this path-prefixed URL. Use Option A for
    full local fidelity.
*/

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname, search } = request.nextUrl

  // Static assets in /public — pass through, never rewrite the path.
  // Without this, an image at /thoughts/foo/1.svg requested from the
  // ux. subdomain would be rewritten to /ux/thoughts/foo/1.svg and 404.
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next()
  }

  const isApex =
    hostname === 'andrewwhited.com' ||
    hostname === 'www.andrewwhited.com'

  if (isApex) {
    return NextResponse.redirect(
      `https://ux.andrewwhited.com${pathname}${search}`,
      301,
    )
  }

  const isUxSubdomain =
    hostname.startsWith('ux.') ||
    hostname === 'ux.localhost' ||
    hostname.startsWith('ux.localhost:')

  if (isUxSubdomain && !pathname.startsWith('/ux')) {
    const url = request.nextUrl.clone()
    url.pathname = `/ux${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
