import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Add any middleware logic here if needed
  // For now, we'll handle auth protection in individual pages/components
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}