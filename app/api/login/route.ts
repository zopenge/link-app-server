import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import authConfig from '@/lib/config';
import { serverCookies } from '@/lib/cookies';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!authConfig.database.enabled) {
      return NextResponse.json(
        { message: 'Database not configured' },
        { status: 500 }
      );
    }

    // TODO: Add your actual authentication logic here
    // For demo purposes, we'll just check if email and password exist
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        email,
        // Add any additional user data you want to include
      },
      authConfig.jwt.secret,
      {
        expiresIn: authConfig.jwt.expirationTime,
        issuer: authConfig.jwt.issuer,
        algorithm: authConfig.jwt.algorithm as jwt.Algorithm,
      }
    );

    // Set the token in cookie
    serverCookies.set('auth_token', token, {
      maxAge: 60 * 60 * 24, // 24 hours
      secure: authConfig.session.secure,
      httpOnly: true,
      sameSite: 'lax'
    });

    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 400 }
    );
  }
} 