// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserPopupRedirectResolver, browserSessionPersistence,GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  // Your own firebase configuration object
};

// Initialize Firebase
export const API_KEY = "<YOUR-API-KEY>";
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence:browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver
});

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
