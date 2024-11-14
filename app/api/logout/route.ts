import { NextResponse } from 'next/server';
import { serverCookies } from '@/lib/cookies';

export async function POST() {
  try {
    serverCookies.delete('auth_token');
    
    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 400 }
    );
  }
} 