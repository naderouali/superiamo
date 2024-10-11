import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname === '/' || pathname === '/not-found') {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/', '/not-found'], 
};
