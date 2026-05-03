import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simple middleware to ensure requests are passing through Next.js
  // This helps identify if the 404 is coming from Next.js or the external server (Nginx)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
