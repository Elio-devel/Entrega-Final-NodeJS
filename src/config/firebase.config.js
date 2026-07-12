import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Debug: Vamos a verificar si las variables se están cargando
if (!firebaseConfig.projectId) {
  console.error("❌ ERROR: No se encontró el FIREBASE_PROJECT_ID. Revisa tu archivo .env");
} else {
  console.log("✅ Conectando al proyecto de Firebase:", firebaseConfig.projectId);
}

// Inicializamos la App de Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos la instancia de la base de datos para que todos la usen
export const db = getFirestore(firebaseApp);