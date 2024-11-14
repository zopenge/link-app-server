import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import authConfig from '@/lib/config';

// Add paths that don't require authentication
const publicPaths = ['/login', '/api/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip authentication for public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify JWT token
    jwt.verify(token, authConfig.jwt.secret, {
      issuer: authConfig.jwt.issuer,
      algorithms: [authConfig.jwt.algorithm as jwt.Algorithm],
    });
    
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 