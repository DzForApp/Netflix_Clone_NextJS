// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk2AkYOgG8Cfem-3mh_-BEFP9QYhHA_hM",
  authDomain: "netflix-clone-nextjs-97962.firebaseapp.com",
  projectId: "netflix-clone-nextjs-97962",
  storageBucket: "netflix-clone-nextjs-97962.appspot.com",
  messagingSenderId: "225560812563",
  appId: "1:225560812563:web:822732ef5257df70c6f3e6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
