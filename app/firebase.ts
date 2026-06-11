import { apiKey } from "@/apiKeyFirebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// configurar o firebase
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "leadpulse-66857.firebaseapp.com",
  projectId: "leadpulse-66857",
  storageBucket: "leadpulse-66857.firebasestorage.app",
  messagingSenderId: "317438561379",
  appId: "1:317438561379:web:82c8476a6c60741bbd3c56"
};

const app = initializeApp(firebaseConfig);

// banco de dados
export const db = getFirestore(app);

export default app;