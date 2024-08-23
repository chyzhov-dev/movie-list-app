'use server';

import { cookies } from 'next/headers';

export async function deleteToken() {
  cookies().delete('token');
}

export async function setToken( token: string ) {
  cookies().set('token', token, {
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    secure: true,
    httpOnly: true
  });
}