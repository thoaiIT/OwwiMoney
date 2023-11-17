import type { NextRequest } from 'next/server';

// Limit the middleware to paths starting with `/api/`
const protectedRoutes = ['/dashboard', '/transactions', '/verification'];
const authRoutes = ['/login', '/register', '/verification'];

export function middleware(request: NextRequest) {
  // const cookieStore = cookies();
  // const isAuthenticated = cookieStore.get('isAuthenticated')?.value;
  // if (request.nextUrl.pathname.startsWith('/verification')) {
  //   if (!request.cookies.get('userId')?.value) {
  //     const response = NextResponse.redirect(new URL('/', request.url));
  //     return response;
  //   }
  // }
  // if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
  //   const absoluteURL = new URL('/login', request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  // if (!!isAuthenticated && authRoutes.includes(request.nextUrl.pathname)) {
  //   const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  // return NextResponse.next();
}
