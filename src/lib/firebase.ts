import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const firebaseConfig = {
  apiKey: "AIzaSyAKdJrGu1GJjv998ERSgZO7HM7UfBYNF3U",
  authDomain: "tera-3d2ef.firebaseapp.com",
  projectId: "tera-3d2ef",
  storageBucket: "tera-3d2ef.appspot.com",
  messagingSenderId: "42816860190",
  appId: "1:42816860190:web:98982fce476626d7d1be0f",
  measurementId: "G-HPQFQV5LQW"
};

// ✅ Client-side Firebase
export function getFirebaseApp() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export const firebaseAuth = getAuth(getFirebaseApp());
export const firestore = getFirestore(getFirebaseApp());
export const storage = getStorage(getFirebaseApp());

// ✅ Server-side (admin) Firebase
if (!admin.apps.length) {
  const serviceAccountPath = path.join(process.cwd(), "serviceAccountKey.json");
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseConfig.storageBucket,
  });
}

export const adminFirestore = admin.firestore();
export const adminStorage = admin.storage().bucket(); 