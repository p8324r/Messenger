// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserPopupRedirectResolver, browserSessionPersistence,GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJNLoPWLAvXL0jv3KVILXoC1Ka0_v4w68",
  authDomain: "messenger-332fe.firebaseapp.com",
  projectId: "messenger-332fe",
  storageBucket: "messenger-332fe.appspot.com",
  messagingSenderId: "853015593281",
  appId: "1:853015593281:web:158810c59dd58f10fbe1c0"
};

// Initialize Firebase
export const API_KEY = "AIzaSyAJNLoPWLAvXL0jv3KVILXoC1Ka0_v4w68";
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence:browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver
});

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
