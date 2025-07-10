import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCKK_cbXFO2x_YNG0xzvPClUIxecaXxe5Q",
  authDomain: "quotesmart-42fc3.firebaseapp.com",
  projectId: "quotesmart-42fc3",
  storageBucket: "quotesmart-42fc3.firebasestorage.app",
  messagingSenderId: "203476049824",
  appId: "1:203476049824:web:64a354b397373299f20ec5",
  measurementId: "G-6SGN5MWGD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;