import { NextRequest, NextResponse } from 'next/server';
import { adminFirestore } from '@/lib/firebaseAdmin';

// GET /api/user?email=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    const userSnap = await adminFirestore.collection('users').where('email', '==', email.toLowerCase()).limit(1).get();
    if (userSnap.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = userSnap.docs[0].data();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in GET /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/user
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.email || !data.name) {
      return NextResponse.json({ error: 'Email and name required' }, { status: 400 });
    }
    const email = data.email.toLowerCase();
    const userRef = adminFirestore.collection('users').doc(email);
    const userData = {
      email,
      name: data.name,
      school: data.school || null,
      title: data.title || null,
      plan: 'trial',
      updatedAt: new Date().toISOString(),
    };
    await userRef.set(userData, { merge: true });
    const userSnap = await userRef.get();
    return NextResponse.json(userSnap.data());
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 