// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEoANWkauZSKfDMJGbWR8vl1qQ8-Xe2fo",
  authDomain: "learnflow-lms.firebaseapp.com",
  projectId: "learnflow-lms",
  storageBucket: "learnflow-lms.firebasestorage.app",
  messagingSenderId: "417998172821",
  appId: "1:417998172821:web:07be6866e647bbc403219c",
  measurementId: "G-98K5VW6BM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;