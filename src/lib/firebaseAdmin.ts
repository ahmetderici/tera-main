import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import fs from 'fs';
import path from 'path';

let serviceAccount: any;
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} else {
  // Fallback to local file for dev
  const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
}

const adminApp = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'tera-3d2ef.appspot.com',
    })
  : getApp();

const adminFirestore = getFirestore(adminApp);
const adminStorage = getStorage(adminApp).bucket();

export { adminApp, adminFirestore, adminStorage }; 