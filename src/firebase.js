// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-v2-98536.firebaseapp.com",
  projectId: "x-next-v2-98536",
  storageBucket: "x-next-v2-98536.appspot.com",
  messagingSenderId: "446509417955",
  appId: "1:446509417955:web:e0944472c6b2b2ee020cd6",
  measurementId: "G-LWKE61DQRD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
