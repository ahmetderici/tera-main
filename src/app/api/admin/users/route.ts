import { NextRequest, NextResponse } from 'next/server';
import { adminFirestore } from '@/lib/firebaseAdmin';

// GET /api/admin/users
export async function GET(req: NextRequest) {
  try {
    // Fetch all users
    const usersSnap = await adminFirestore.collection('users').orderBy('updatedAt', 'desc').get();
    const users = [];
    for (const userDoc of usersSnap.docs) {
      const user = userDoc.data();
      // Fetch reports for each user
      const reportsSnap = await adminFirestore.collection('reports').where('email', '==', user.email).get();
      user.reports = reportsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Ensure plan field is included
      user.plan = user.plan || 'trial';
      users.push(user);
    }
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/admin/users
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    const email = data.email.toLowerCase();
    const userRef = adminFirestore.collection('users').doc(email);
    await userRef.update({ plan: 'pro', updatedAt: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PATCH /api/admin/users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 