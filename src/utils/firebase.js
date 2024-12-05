import "firebase/firestore"
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDe9ocr18oYqqEraSbPmStepxicRQ9STLo",
  authDomain: "talentrank-b1592.firebaseapp.com",
  projectId: "talentrank-b1592",
  storageBucket: "talentrank-b1592.firebasestorage.app",
  messagingSenderId: "968737560532",
  appId: "1:968737560532:web:8bf5c313024ba5c8572841",
  measurementId: "G-7T37RGBZTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getFirestore(app);

export {storage}
