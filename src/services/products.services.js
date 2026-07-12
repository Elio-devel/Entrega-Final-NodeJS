// importamos las dependencias para nuestro product services
import { db } from '../config/firebase.config.js';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

/**
 * Función auxiliar para mapear un documento de Firestore a nuestro formato de objeto
 */
const mapDoc = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    stock: data.stock,
    imageUrl: data.imageUrl || ""
  };
};

// ====================================================================
// CREATE
// creamos un nuevo producto en firebase
// ====================================================================
export const createProduct = async (product) => {
  try {
    const docRef = await addDoc(productsCollection, product);
    return {
      id: docRef.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.imageUrl || ""
    };
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw new Error('No se pudo crear el producto');
  }

};

// ====================================================================
// UPDATE
// actualizamos un producto en firebase
// ====================================================================
export const updateProduct = async (id, updatedFields) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, updatedFields);
    return { id, ...updatedFields }; // Retorna el ID y los campos actualizados
    } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error); // Usar backticks
    throw new Error(`No se pudo actualizar el producto con ID ${id}`); // Usar backticks
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

    // Ordenamos alfabéticamente por nombre antes de devolver la lista
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
    } else {
      return null;// producto no encontrado
    }
  } catch (error) { // Usar backticks
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
      // El precio ya viene como número desde el controlador
      q = query(q, where('price', '<=', price));
    }
  
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(mapDoc);

    // También ordenamos los resultados filtrados
    return products.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) { 
    console.error('Error al filtrar productos:', error); // Capitalizar "Error"
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
    return {message:`Producto con ID ${id} eliminado con éxito`}; // Usar backticks
    } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error); // Usar backticks
    throw new Error(`No se pudo eliminar el producto con ID ${id}`); // Usar backticks
  }
};
