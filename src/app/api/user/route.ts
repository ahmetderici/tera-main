import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/user?email=...
export async function GET(req: NextRequest) {
  try {
    console.log('Vercel ENV (GET /api/user):', process.env.DATABASE_URL);
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { reports: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }

    return NextResponse.json(user, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Error in GET /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}

// POST /api/user
export async function POST(req: NextRequest) {
  try {
    console.log('Vercel ENV (POST /api/user):', process.env.DATABASE_URL);
    const data = await req.json();
    
    if (!data.email || !data.name) {
      return NextResponse.json({ error: 'Email and name required' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    }

    // Normalize email to lowercase
    const email = data.email.toLowerCase();

    // Upsert user (create if not exists, update if exists)
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: data.name,
        school: data.school || null,
        title: data.title || null,
      },
      create: {
        email,
        name: data.name,
        school: data.school || null,
        title: data.title || null,
      },
      include: { reports: true }
    });

    return NextResponse.json(user, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
} 