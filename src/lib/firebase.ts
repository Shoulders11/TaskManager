import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHETCXypTsvfktE5eXbXRMVhI2WxQ6IMo",
  authDomain: "task-tracker-a2518.firebaseapp.com",
  projectId: "task-tracker-a2518",
  storageBucket: "task-tracker-a2518.firebasestorage.app",
  messagingSenderId: "862622480401",
  appId: "1:862622480401:web:d320e27510aaea725919b0",
  measurementId: "G-6X078LDV9L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;