import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'dotenv/config';
console.log("Firebase Config");

/**
 * CONFIGURACIÓN DE FIREBASE
 * * Responsabilidad: Mapear las credenciales del archivo oculto .env.
 * * Nota para el equipo: Usamos 'process.env.NOMBRE_VARIABLE' para que coincida 
 * exactamente con las claves declaradas en nuestro archivo .env de la raíz.
 * 
 */

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Inicializamos la aplicación de Firebase con la configuración del entorno
export const app = initializeApp(firebaseConfig);

// Inicializamos la base de datos Firestore vinculada a esta aplicación
const db = getFirestore(app);

// Exportamos la instancia de la base de datos para que la use 'firestore.models.js'
export { db };
