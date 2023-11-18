import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  (request: NextRequestWithAuth) => {
    const session = request?.nextauth?.token;

    if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'))
      return NextResponse.redirect(new URL('/dashboard', request.url));

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
