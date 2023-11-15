import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// Limit the middleware to paths starting with `/api/`

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/otp/register-user')) {
    const response = NextResponse.redirect(new URL('/verification', request.url));
    const splitPath = request.nextUrl.pathname.split('/');
    const id = splitPath[splitPath.length - 1] || '';
    response.cookies.set('userId', id);
    return response;
  }
}
