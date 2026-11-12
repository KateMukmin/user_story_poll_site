import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOptionNames } from '@/lib/content';

export const dynamic = 'force-dynamic';

function clean(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 60);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const option = getOptionNames().find((o) => o.id === body.option);

  if (!option) return NextResponse.json({ error: 'Choose a format to vote for.' }, { status: 400 });
  if (!firstName || !lastName) {
    return NextResponse.json({ error: 'Enter your first and last name to vote.' }, { status: 400 });
  }

  // One vote per person: first + last name, ignoring capitalization and extra spaces
  const voterKey = `${firstName} ${lastName}`.toLowerCase();
  const duplicate = NextResponse.json(
    { error: `A vote has already been recorded for ${firstName} ${lastName}. Each person can vote once.` },
    { status: 409 },
  );

  const existing = await prisma.vote.findUnique({ where: { voterKey } });
  if (existing) return duplicate;

  try {
    await prisma.vote.create({ data: { voterKey, firstName, lastName, option: option.id } });
  } catch (error) {
    if (error?.code === 'P2002') return duplicate;
    throw error;
  }
  return NextResponse.json({ ok: true, name: option.name });
}
