import { Router } from 'express';
import * as ProductController from '../controllers/products.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.get('/api/products', ProductController.getAllProducts);
router.get('/api/products/:id', ProductController.getProductById);

// Rutas protegidas (Requieren Token)
/**
 * Según el requerimiento #4:
 * POST /api/products/create
 * DELETE /api/products/:id
 */
router.post('/api/products/create', verifyToken, ProductController.createProduct);
router.put('/api/products/:id', verifyToken, ProductController.updateProduct);
router.delete('/api/products/:id', verifyToken, ProductController.deleteProduct);

export default router;