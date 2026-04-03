import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/*
  Subdomain routing + coming-soon mode.

  Production:
    andrewwhited.com      → serves (main) routes (/, /studio, /objects, …)
    ux.andrewwhited.com   → internally rewrites to /ux/* paths

  Coming-soon mode (COMING_SOON=true env var):
    All routes except / and /sanity redirect to /.
    The home page renders a UX-lite landing page.
    Remove the env var to go live with the full site.

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

const comingSoon = process.env.COMING_SOON === 'true'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // Coming-soon mode: only allow / and /sanity, redirect everything else
  if (comingSoon) {
    const isAllowed =
      pathname === '/' ||
      pathname.startsWith('/sanity')

    if (!isAllowed) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
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
