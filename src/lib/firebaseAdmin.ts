import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import fs from 'fs';
import path from 'path';

let serviceAccount: any;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  } else if (process.env.NODE_ENV !== 'production') {
    // Fallback to local file for dev
    const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
  } else {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable must be set in production!');
  }
} catch (error) {
  console.error('Error loading service account:', error);
  throw new Error('Failed to load Firebase service account');
}

// Validate required environment variables
if (!process.env.FIREBASE_STORAGE_BUCKET) {
  console.warn('FIREBASE_STORAGE_BUCKET not set, using default bucket');
}

const adminApp = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'tera-3d2ef.appspot.com',
    })
  : getApp();

// Initialize Firestore
const adminFirestore = getFirestore(adminApp);

// Initialize Storage with explicit bucket name from env
declare type AdminStorageType = ReturnType<Storage['bucket']>;
let adminStorage: AdminStorageType;
try {
  adminStorage = getStorage(adminApp).bucket(process.env.FIREBASE_STORAGE_BUCKET || 'tera-3d2ef.appspot.com');
  console.log('Firebase Storage initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Storage:', error);
  throw new Error('Failed to initialize Firebase Storage');
}

export { adminApp, adminFirestore, adminStorage }; 