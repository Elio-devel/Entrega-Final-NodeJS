import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../data/firebase.data.js";

/**
 * Trae todos los documentos de una colección dada.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @returns {Promise<Array<Object>>} Lista de documentos con id y datos.
 */
export async function readDocuments(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  // Mapeamos los documentos para unificar el ID de Firebase con los campos internos del objeto
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Trae un único documento por ID.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @returns {Promise<Object|null>} Documento con id y datos, o null si no existe.
 */
export async function readDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

/**
 * Agrega un nuevo documento dejando que Firebase administre y genere el Hash ID aleatorio.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {Object} data Objeto con los campos del documento.
 * @returns {Promise<string>} Id del documento creado.
 */
export async function createDocument(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

/**
 * Crea o reemplaza un documento con un id específico.
 * Use setDoc cuando desee controlar el id del documento.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @param {Object} data Objeto con los campos del documento.
 * @returns {Promise<void>}
 */
export async function setDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data);
}

/**
 * Actualiza campos parciales de un documento sin sobreescribir el resto.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @param {Object} data Objeto con los campos a actualizar.
 * @returns {Promise<void>}
 */
export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

/**
 * Ejecuta la baja/eliminación permanente de un documento por ID en la base de datos.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {string} id Identificador del documento.
 * @returns {Promise<void>}
 */
export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

/**
 * Ejemplo de consulta simple con filtros.
 * Busca documentos en una colección que cumplan con los criterios especificados.
 * @param {string} collectionName Nombre de la colección en Firestore.
 * @param {Object} filter Objeto con los criterios de filtrado.
 * @returns {Promise<Array>} Lista de documentos que cumplen con los criterios.
 */
export async function queryDocuments(collectionName, filter) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where(filter.field, filter.operator, filter.value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}
