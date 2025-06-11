import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/user?email=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}

// POST /api/user
export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.email || !data.name) {
    return NextResponse.json({ error: 'Email and name required' }, { status: 400 });
  }
  // Upsert user (create if not exists, update if exists)
  const user = await prisma.user.upsert({
    where: { email: data.email },
    update: {
      name: data.name,
      school: data.school,
      title: data.title,
    },
    create: {
      email: data.email,
      name: data.name,
      school: data.school,
      title: data.title,
    },
  });
  return NextResponse.json(user);
} 