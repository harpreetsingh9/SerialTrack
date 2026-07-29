import { NextResponse } from "next/server";

export async function middleware(request) {
  // We can validate better-auth session here
  // For now we just verify if they are accessing /w/ without auth
  
  // Note: better-auth provides middleware helpers, but we will
  // handle simple redirection logic for the /w path.
  
  // Example: if trying to access /w/ but no auth cookie, redirect to login
  const betterAuthSession = request.cookies.get("better-auth.session_token");
  
  if (request.nextUrl.pathname.startsWith('/w/')) {
      if (!betterAuthSession) {
          return NextResponse.redirect(new URL('/login', request.url));
      }
  }

  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
      if (betterAuthSession) {
          return NextResponse.redirect(new URL('/onboarding', request.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/w/:path*', '/login', '/signup'],
};
