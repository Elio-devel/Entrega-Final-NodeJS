import * as ProductService from '../services/products.services.js';
import { validateProduct, validatePartialProduct } from '../models/products.model.js';

/**
 * Obtiene todos los productos o filtra por query params
 */
export const getAllProducts = async (req, res) => {
  try {
    const { category, price } = req.query;
    let products;

    if (category || price) {
      // Convertimos el precio a número si existe
      products = await ProductService.getProductsByFilters({ 
        category, 
        price: price ? Number(price) : undefined 
      });
    } else {
      products = await ProductService.getAllProducts();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtiene un producto por su ID
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Crea un producto (Ruta Protegida)
 */
export const createProduct = async (req, res) => {
  try {
    // Usamos la validación del modelo
    const validation = validateProduct(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Actualiza un producto (Ruta Protegida)
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const validation = validatePartialProduct(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const updated = await ProductService.updateProduct(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Elimina un producto (Ruta Protegida)
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};