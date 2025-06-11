import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/users
export async function GET() {
  const users = await prisma.user.findMany({
    include: { reports: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(users);
} 