// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the getAuth function
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Pv6kYMPAuQwcbp3PNYuC0C_v2R5Kso0",
  authDomain: "metrictracker-3a3e4.firebaseapp.com",
  projectId: "metrictracker-3a3e4",
  storageBucket: "metrictracker-3a3e4.firebasestorage.app",
  messagingSenderId: "866201490860",
  appId: "1:866201490860:web:4457bbaa7821cd9c681609",
  measurementId: "G-ET24XL3MZD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
