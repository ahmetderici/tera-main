import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { adminStorage } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    // Expecting: { email, files: [base64 strings], name }
    const data = await req.json();
    if (!data.email || !Array.isArray(data.files) || data.files.length === 0) {
      return NextResponse.json({ error: 'Email and files required' }, { status: 400 });
    }
    const email = data.email.toLowerCase();
    const mergedPdf = await PDFDocument.create();
    for (const base64 of data.files) {
      const pdfBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    const mergedPdfBytes = await mergedPdf.save();
    const reportId = uuidv4();
    const fileName = `reports/${email}/${reportId}.pdf`;
    // Upload merged PDF to Firebase Storage
    const file = adminStorage.file(fileName);
    await file.save(Buffer.from(mergedPdfBytes), { contentType: 'application/pdf' });
    const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 1000 * 60 * 60 * 24 * 7 }); // 7 days
    return NextResponse.json({ url, fileName, reportId });
  } catch (error) {
    console.error('Error in POST /api/pdf/process:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 