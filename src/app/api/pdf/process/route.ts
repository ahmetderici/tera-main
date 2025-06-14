import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { adminStorage, adminFirestore } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

async function validateAndProcessPDF(base64: string, index: number) {
  try {
    // Validate base64 string
    if (!base64 || typeof base64 !== 'string') {
      throw new Error(`Invalid base64 string at position ${index}`);
    }

    // Decode base64
    const pdfBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    if (pdfBytes.length === 0) {
      throw new Error(`Empty PDF at position ${index}`);
    }

    // Load and validate PDF
    const pdf = await PDFDocument.load(pdfBytes);
    if (pdf.getPageCount() === 0) {
      throw new Error(`PDF has no pages at position ${index}`);
    }

    return pdf;
  } catch (error) {
    console.error(`Error processing PDF at position ${index}:`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unknown error processing PDF at position ${index}`);
  }
}

async function saveToFirebase(mergedPdfBytes: Uint8Array, email: string, reportId: string) {
  const fileName = `reports/${email}/${reportId}.pdf`;
  const file = adminStorage.file(fileName);

  try {
    // Upload with retry mechanism
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        await file.save(Buffer.from(mergedPdfBytes), {
          contentType: 'application/pdf',
          metadata: {
            contentType: 'application/pdf',
            metadata: {
              email,
              reportId,
              timestamp: new Date().toISOString()
            }
          }
        });
        break;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }

    // Get signed URL with longer expiration
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 30 days
    });

    return { url, fileName };
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw new Error('Failed to save PDF to storage');
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log('Starting PDF processing request...');

  try {
    const data = await req.json();
    console.log('Request data received:', {
      email: data.email,
      fileCount: data.files?.length,
      timestamp: new Date().toISOString()
    });

    // Input validation
    if (!data.email || !Array.isArray(data.files) || data.files.length === 0) {
      return NextResponse.json({ error: 'Email and files required' }, { status: 400 });
    }

    const email = data.email.toLowerCase();

    // User validation
    const userSnap = await adminFirestore.collection('users').where('email', '==', email).limit(1).get();
    if (userSnap.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = userSnap.docs[0].data();
    console.log('User validated:', { email, plan: user.plan });

    // Plan validation
    if (user.plan === 'trial') {
      const reportsSnap = await adminFirestore.collection('reports').where('email', '==', email).get();
      if (reportsSnap.docs.length >= 2) {
        return NextResponse.json({ 
          error: 'Trial users can only upload 2 reports. Please upgrade to Pro.',
          upgradeUrl: '/pricing'
        }, { status: 403 });
      }
    }

    // Process PDFs
    console.log('Starting PDF processing...');
    const mergedPdf = await PDFDocument.create();
    const processedFiles = [];

    for (let i = 0; i < data.files.length; i++) {
      try {
        const pdf = await validateAndProcessPDF(data.files[i], i);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        processedFiles.push(i + 1);
      } catch (error) {
        console.error(`Failed to process file ${i + 1}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ 
          error: `Error processing file ${i + 1}: ${errorMessage}`,
          processedFiles
        }, { status: 400 });
      }
    }

    console.log('PDFs processed successfully:', processedFiles);

    // Save merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    const reportId = uuidv4();

    // Save to Firebase
    const { url, fileName } = await saveToFirebase(mergedPdfBytes, email, reportId);

    // Save metadata
    const reportData = {
      email,
      name: data.name || `Report ${new Date().toLocaleString()}`,
      url,
      fileName,
      createdAt: new Date().toISOString(),
      status: 'completed',
      pageCount: mergedPdf.getPageCount(),
      fileCount: data.files.length,
      processingTime: Date.now() - startTime
    };

    await adminFirestore.collection('reports').doc(reportId).set(reportData);

    console.log('PDF processing completed successfully:', {
      reportId,
      processingTime: Date.now() - startTime,
      pageCount: mergedPdf.getPageCount()
    });

    return NextResponse.json({
      url,
      fileName,
      reportId,
      message: 'PDF generated successfully',
      metadata: {
        pageCount: mergedPdf.getPageCount(),
        processingTime: Date.now() - startTime
      }
    });
  } catch (error) {
    console.error('Error in PDF processing:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Internal server error',
      details: errorMessage
    }, { status: 500 });
  }
} 