import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/transactions', '/verification'];
const afterAuthRoutes = ['/login', '/register'];

export default withAuth(
  (request: NextRequestWithAuth) => {
    const session = request?.nextauth?.token;

    if (!session && protectedRoutes.includes(request.nextUrl.pathname))
      return NextResponse.redirect(new URL('/login', request.url));
    if (session && afterAuthRoutes.includes(request.nextUrl.pathname))
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
