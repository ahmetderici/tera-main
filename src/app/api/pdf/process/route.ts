import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { adminStorage, adminFirestore } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received request with data:', { email: data.email, fileCount: data.files?.length });

    if (!data.email || !Array.isArray(data.files) || data.files.length === 0) {
      return NextResponse.json({ error: 'Email and files required' }, { status: 400 });
    }

    const email = data.email.toLowerCase();
    console.log('Processing request for email:', email);

    // Check user's plan and report limit
    const userSnap = await adminFirestore.collection('users').where('email', '==', email).limit(1).get();
    if (userSnap.empty) {
      console.log('User not found:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = userSnap.docs[0].data();
    console.log('User plan:', user.plan);

    // Check report limits
    if (user.plan === 'trial') {
      const reportsSnap = await adminFirestore.collection('reports').where('email', '==', email).get();
      if (reportsSnap.docs.length >= 2) {
        return NextResponse.json({ error: 'Trial users can only upload 2 reports. Please upgrade to Pro.' }, { status: 403 });
      }
    }

    // Create new PDF document
    const mergedPdf = await PDFDocument.create();
    console.log('Created new PDF document');

    // Process each PDF
    for (let i = 0; i < data.files.length; i++) {
      try {
        console.log(`Processing file ${i + 1}/${data.files.length}`);
        const base64 = data.files[i];
        const pdfBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        console.log(`Successfully processed file ${i + 1}`);
      } catch (error) {
        console.error(`Error processing file ${i + 1}:`, error);
        return NextResponse.json({ error: `Invalid PDF file at position ${i + 1}` }, { status: 400 });
      }
    }

    // Save merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    console.log('Successfully merged PDFs');

    const reportId = uuidv4();
    const fileName = `reports/${email}/${reportId}.pdf`;
    console.log('Saving to:', fileName);

    try {
      // Upload to Firebase Storage
      const file = adminStorage.file(fileName);
      await file.save(Buffer.from(mergedPdfBytes), {
        contentType: 'application/pdf',
        metadata: {
          contentType: 'application/pdf',
          metadata: {
            email: email,
            reportId: reportId
          }
        }
      });
      console.log('Successfully uploaded to Firebase Storage');

      // Get signed URL
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
      });
      console.log('Generated signed URL');

      // Save report metadata
      const reportData = {
        email,
        name: data.name || `Report ${new Date().toLocaleString()}`,
        url,
        fileName,
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      await adminFirestore.collection('reports').doc(reportId).set(reportData);
      console.log('Saved report metadata to Firestore');

      return NextResponse.json({
        url,
        fileName,
        reportId,
        message: 'PDF generated successfully'
      });
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      return NextResponse.json({ error: 'Failed to save PDF to storage' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in PDF processing:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 