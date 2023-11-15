import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Limit the middleware to paths starting with `/api/`

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/verification')) {
    if (!request.cookies.get('userId')?.value) {
      const response = NextResponse.redirect(new URL('/', request.url));
      return response;
    }
  }

  return NextResponse.next();
}
