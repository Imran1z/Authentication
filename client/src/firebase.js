// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-93e2f.firebaseapp.com",
  projectId: "mern-auth-93e2f",
  storageBucket: "mern-auth-93e2f.appspot.com",
  messagingSenderId: "734313159814",
  appId: "1:734313159814:web:961d4d6bfedf585cba4507"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);