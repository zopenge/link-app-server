import { cookies } from 'next/headers';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import type { CookieOptions } from 'cookies-next/lib/types';
import authConfig from './config';

const TOKEN_NAME = 'auth_token';

// Cookie default options
const defaultOptions: CookieOptions = {
  path: '/',
  secure: authConfig.session.secure,
  sameSite: 'lax',
  httpOnly: true,
  maxAge: 60 * 60 * 24 // 24 hours
};

export const setAuthToken = (token: string, options?: CookieOptions) => {
  setCookie(TOKEN_NAME, token, {
    ...defaultOptions,
    ...options,
  });
};

export const getAuthToken = () => {
  return getCookie(TOKEN_NAME);
};

export const removeAuthToken = () => {
  deleteCookie(TOKEN_NAME);
};

// Server-side cookie operations
export const serverCookies = {
  set: (name: string, value: string, options?: CookieOptions) => {
    cookies().set(name, value, {
      ...defaultOptions,
      ...options,
    });
  },
  get: (name: string) => {
    return cookies().get(name)?.value;
  },
  delete: (name: string) => {
    cookies().delete(name);
  }
}; 