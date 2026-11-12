import { NextResponse } from 'next/server';
import { COOKIE, tokenFor } from '@/lib/auth';

export async function POST(request) {
  const { password = '' } = await request.json().catch(() => ({}));
  let role = null;
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) role = 'admin';
  else if (process.env.POLL_PASSWORD && password === process.env.POLL_PASSWORD) role = 'voter';

  if (!role) {
    return NextResponse.json({ error: 'That password is incorrect. Check it and try again.' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true, role });
  response.cookies.set(COOKIE, tokenFor(role, role === 'admin' ? process.env.ADMIN_PASSWORD : process.env.POLL_PASSWORD), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
