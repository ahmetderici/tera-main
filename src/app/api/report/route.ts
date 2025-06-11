import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/report?email=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email }, include: { reports: true } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user.reports);
}

// POST /api/report
export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.email || !data.url) {
    return NextResponse.json({ error: 'Email and url required' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const report = await prisma.report.create({
    data: {
      userId: user.id,
      url: data.url,
      name: data.name,
    },
  });
  return NextResponse.json(report);
} 