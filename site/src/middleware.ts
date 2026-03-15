import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/*
  Subdomain routing.

  Production:
    andrewwhited.com      → serves (main) routes (/, /studio, /objects, …)
    ux.andrewwhited.com   → internally rewrites to /ux/* paths

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
  const { pathname } = request.nextUrl

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
