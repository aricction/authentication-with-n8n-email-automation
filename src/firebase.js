// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8c2CbKJF83dCWSFL3LazQ8y-Mzxu-jIM",
  authDomain: "hudo-9f0cc.firebaseapp.com",
  projectId: "hudo-9f0cc",
  storageBucket: "hudo-9f0cc.firebasestorage.app",
  messagingSenderId: "210371445358",
  appId: "1:210371445358:web:7fa8c4ed16cdf2245ddc7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
