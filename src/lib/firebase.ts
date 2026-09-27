import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRixJp39wLsii_4W1N74xNY0d5p3NQZ7A",
  authDomain: "sheetal-electrotech.firebaseapp.com",
  projectId: "sheetal-electrotech",
  storageBucket: "sheetal-electrotech.firebasestorage.app",
  messagingSenderId: "1057777797755",
  appId: "1:1057777797755:web:a0e40735ce32f6ae1d70de",
  measurementId: "G-1827PKGN56"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
