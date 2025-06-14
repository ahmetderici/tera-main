import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { adminStorage, adminFirestore } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    // Expecting: { email, files: [base64 strings], name }
    const data = await req.json();
    if (!data.email || !Array.isArray(data.files) || data.files.length === 0) {
      return NextResponse.json({ error: 'Email and files required' }, { status: 400 });
    }
    const email = data.email.toLowerCase();

    // Check user's plan and report limit
    const userSnap = await adminFirestore.collection('users').where('email', '==', email).limit(1).get();
    if (userSnap.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = userSnap.docs[0].data();
    
    // Check report limits
    if (user.plan === 'trial') {
      const reportsSnap = await adminFirestore.collection('reports').where('email', '==', email).get();
      if (reportsSnap.docs.length >= 2) {
        return NextResponse.json({ error: 'Trial users can only upload 2 reports. Please upgrade to Pro.' }, { status: 403 });
      }
    }

    // Process PDFs
    const mergedPdf = await PDFDocument.create();
    for (const base64 of data.files) {
      try {
        // Decode base64 and create PDF
        const pdfBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
        const pdf = await PDFDocument.load(pdfBytes);
        
        // Copy all pages
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      } catch (error) {
        console.error('Error processing PDF:', error);
        return NextResponse.json({ error: 'Invalid PDF file format' }, { status: 400 });
      }
    }

    // Save merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    const reportId = uuidv4();
    const fileName = `reports/${email}/${reportId}.pdf`;

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

      // Get signed URL
      const [url] = await file.getSignedUrl({ 
        action: 'read', 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
      });

      // Save report metadata to Firestore
      const reportData = {
        email,
        name: data.name || `Report ${new Date().toLocaleString()}`,
        url,
        fileName,
        createdAt: new Date().toISOString(),
        status: 'completed'
      };
      await adminFirestore.collection('reports').doc(reportId).set(reportData);

      return NextResponse.json({ 
        url, 
        fileName, 
        reportId,
        message: 'PDF generated successfully'
      });
    } catch (error) {
      console.error('Error saving PDF:', error);
      return NextResponse.json({ error: 'Failed to save PDF' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in POST /api/pdf/process:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 