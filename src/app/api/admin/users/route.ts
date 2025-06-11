import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/users
export async function GET(req: NextRequest) {
  try {
    console.log('Fetching all users from database...');
    
    const users = await prisma.user.findMany({
      include: { 
        reports: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Found ${users.length} users:`, users.map(u => ({ 
      email: u.email, 
      reports: u.reports.length 
    })));

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 