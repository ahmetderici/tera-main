import { NextRequest, NextResponse } from 'next/server';
import { adminFirestore, adminStorage } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

// GET /api/report?email=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    const reportsSnap = await adminFirestore.collection('reports').where('email', '==', email.toLowerCase()).orderBy('createdAt', 'desc').get();
    const reports = reportsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error in GET /api/report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/report
export async function POST(req: NextRequest) {
  try {
    // Expecting: { email, name, file (base64 string) }
    const data = await req.json();
    if (!data.email || !data.file) {
      return NextResponse.json({ error: 'Email and file required' }, { status: 400 });
    }
    const email = data.email.toLowerCase();

    // Check user's plan and report limit
    const userSnap = await adminFirestore.collection('users').where('email', '==', email).limit(1).get();
    if (userSnap.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = userSnap.docs[0].data();
    if (user.plan === 'trial') {
      const reportsSnap = await adminFirestore.collection('reports').where('email', '==', email).get();
      if (reportsSnap.docs.length >= 2) {
        return NextResponse.json({ error: 'Trial users can only upload 2 reports. Please upgrade to Pro.' }, { status: 403 });
      }
    }

    const reportId = uuidv4();
    const fileBuffer = Buffer.from(data.file, 'base64');
    const fileName = `reports/${email}/${reportId}.pdf`;
    // Upload PDF to Firebase Storage
    const file = adminStorage.file(fileName);
    await file.save(fileBuffer, { contentType: 'application/pdf' });
    const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 1000 * 60 * 60 * 24 * 7 }); // 7 days
    // Save report metadata to Firestore
    const reportData = {
      email,
      name: data.name || null,
      url,
      fileName,
      createdAt: new Date().toISOString(),
    };
    await adminFirestore.collection('reports').doc(reportId).set(reportData);
    return NextResponse.json({ id: reportId, ...reportData });
  } catch (error) {
    console.error('Error in POST /api/report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/report
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.id || !data.fileName) {
      return NextResponse.json({ error: 'id and fileName required' }, { status: 400 });
    }
    // Delete Firestore document
    await adminFirestore.collection('reports').doc(data.id).delete();
    // Delete file from Storage
    await adminStorage.file(data.fileName).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 