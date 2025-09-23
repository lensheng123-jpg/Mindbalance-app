// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADtOh_rp-HFAxnjozZ1i7zVBE59bNXEWI",
  authDomain: "mindbalanceaid-dd001.firebaseapp.com",
  projectId: "mindbalanceaid-dd001",
  storageBucket: "mindbalanceaid-dd001.firebasestorage.app",
  messagingSenderId: "1083821581583",
  appId: "1:1083821581583:web:0e9363b9067ea56e904a7a",
  measurementId: "G-DN67LF4WN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);

import { getFirestore } from "firebase/firestore";