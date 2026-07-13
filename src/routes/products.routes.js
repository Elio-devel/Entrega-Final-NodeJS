import { Router } from 'express';
import * as ProductController from '../controllers/products.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);

// Rutas protegidas (Requieren Token)
/**
 * Según el requerimiento #4:
 * POST /api/products/create
 * DELETE /api/products/:id
 */
router.post('/products/create', verifyToken, ProductController.createProduct);
router.put('/products/:id', verifyToken, ProductController.updateProduct);
router.delete('/products/:id', verifyToken, ProductController.deleteProduct);

export default router;