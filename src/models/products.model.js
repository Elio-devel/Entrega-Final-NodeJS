/**
 * MODELO DE DATOS - PRODUCTOS
 * Estructura esperada en Firestore:
 * - name: String
 * - description: String
 * - price: Number
 * - category: String
 * - stock: Number
 * - imageUrl: String
 * - createdAt: Timestamp
 */

export const validateProduct = (product) => {
  const { name, description, price, category, stock } = product;

  if (!name || typeof name !== 'string') {
    return { isValid: false, message: 'El nombre es obligatorio y debe ser un texto' };
  }
  if (!description || typeof description !== 'string') {
    return { isValid: false, message: 'La descripción es obligatoria y debe ser un texto' };
  }
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return { isValid: false, message: 'El precio es obligatorio y debe ser un número positivo' };
  }
  if (!category || typeof category !== 'string') {
    return { isValid: false, message: 'La categoría es obligatoria y debe ser un texto' };
  }
  if (stock === undefined || typeof stock !== 'number' || stock < 0) {
    return { isValid: false, message: 'El stock es obligatorio y debe ser un número positivo' };
  }

  return { isValid: true };
};

/**
 * Valida solo los campos presentes para actualizaciones (PATCH/PUT parcial)
 */
export const validatePartialProduct = (product) => {
  const fields = Object.keys(product);
  const errors = [];

  if (product.name !== undefined && typeof product.name !== 'string') errors.push('El nombre debe ser texto');
  if (product.description !== undefined && typeof product.description !== 'string') errors.push('La descripción debe ser texto');
  if (product.price !== undefined && (typeof product.price !== 'number' || product.price < 0)) errors.push('El precio debe ser un número positivo');
  if (product.category !== undefined && typeof product.category !== 'string') errors.push('La categoría debe ser texto');
  if (product.stock !== undefined && (typeof product.stock !== 'number' || product.stock < 0)) errors.push('El stock debe ser un número positivo');

  return {
    isValid: errors.length === 0,
    message: errors.join('. ')
  };
};