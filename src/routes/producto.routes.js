import express from 'express';
import productoController from '../controllers/producto.controller.js';

const router = express.Router();

// Mostrar todos los productos
router.get('/', productoController.listarProductos);

// Registrar un producto
router.post('/registrar', productoController.registrarProducto);

// Mostrar formulario de edición
router.get('/editar/:id', productoController.mostrarEditar);

// Procesar la edición
router.post('/editar/:id', productoController.editar);

// Desactivar un producto
router.post('/eliminar/:id', productoController.eliminar);

export default router;