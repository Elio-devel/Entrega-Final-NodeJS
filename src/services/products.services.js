// importamos las dependencias para nuestro product services
import { db } from '../config/firebase.config.js';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

/**
 * Función auxiliar para mapear un documento de Firestore a nuestro formato de objeto
 */

const toSlug = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const mapDoc = (docSnapshot) => {
  const data = docSnapshot.data();

  return {
    id: docSnapshot.id,
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    stock: data.stock,
    imageUrl: data.imageUrl || ''
  };
};

// ====================================================================
// CREATE
// creamos un nuevo producto en firebase
// ====================================================================
export const createProduct = async (product) => {
  const id = toSlug(product.name);

  await setDoc(doc(db, 'products', id), {
    name: product.name,
    price: Number(product.price),
    category: product.category,
    stock: Number(product.stock),
    description: product.description,
    imageUrl: product.imageUrl || ''
  });

  return { id, ...product };
};

// ====================================================================
// UPDATE
// actualizamos un producto en firebase
// ====================================================================
export const updateProduct = async (id, updatedFields) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, updatedFields);
    return { id, ...updatedFields };
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw new Error(`No se pudo actualizar el producto con ID ${id}`);
  }
};

// ====================================================================
// READ
// mostrar todos los productos de firebase
// ====================================================================
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map(mapDoc);
    return products.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw new Error('No se pudieron obtener los productos');
  }
};

// ====================================================================
// READ
// mostrar productos por id de firebase
// ====================================================================
export const getProductById = async (id) => {
  try {
    const productRef = doc(db, 'products', id);
    const docSnapshot = await getDoc(productRef);

    if (docSnapshot.exists()) {
      return mapDoc(docSnapshot);
    }

    return null;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw new Error(`No se pudo obtener el producto con ID ${id}`);
  }
};

// ====================================================================
// READ
// filtramos por categoría y precio en firebase
// ====================================================================
export const getProductsByFilters = async ({ category, price }) => {
  try {
    let q = productsCollection;

    if (category) {
      q = query(q, where('category', '==', category));
    }

    if (price) {
      q = query(q, where('price', '<=', price));
    }

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(mapDoc);

    return products.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error al filtrar productos:', error);
    throw new Error('No se pudieron filtrar los productos');
  }
};

// ====================================================================
// DELETE
// eliminamos un producto de firebase
// ====================================================================
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
    return { message: `Producto con ID ${id} eliminado con éxito` };
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw new Error(`No se pudo eliminar el producto con ID ${id}`);
  }
};
