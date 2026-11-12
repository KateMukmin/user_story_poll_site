import { NextResponse } from 'next/server';

const COOKIE = 'poll_access';

async function tokenFor(role, password) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${role}:${password}`));
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith('/login') || pathname.startsWith('/api/login')) return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  const adminToken = process.env.ADMIN_PASSWORD ? await tokenFor('admin', process.env.ADMIN_PASSWORD) : null;
  const voterToken = process.env.POLL_PASSWORD ? await tokenFor('voter', process.env.POLL_PASSWORD) : null;
  const isAdmin = Boolean(token && adminToken && token === adminToken);
  const isVoter = isAdmin || Boolean(token && voterToken && token === voterToken);

  const needsAdmin = pathname.startsWith('/results');
  if ((needsAdmin && !isAdmin) || !isVoter) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Enter the poll password first.' }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = `?next=${encodeURIComponent(pathname + search)}${needsAdmin ? '&results=1' : ''}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
