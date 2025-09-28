import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";


// ✅ Firebase config now reads from .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);

// ✅ Export Firestore instance
export const db = getFirestore(app);

// ✅ Export app (for other Firebase services later, e.g., Auth/Storage)
export default app;

// Enable offline persistence so Firestore queues writes and caches reads
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn("Persistence can only be enabled in one tab at a time.");
  } else if (err.code === 'unimplemented') {
    console.warn("Browser does not support persistence.");
  }
});
