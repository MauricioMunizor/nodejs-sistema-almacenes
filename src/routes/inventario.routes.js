import express from 'express';
import inventarioController from '../controllers/inventario.controller.js';

const router = express.Router();

// Mostrar inventario
router.get('/:id/inventario', inventarioController.listarPorAlmacen);

// Agregar producto al inventario
router.post('/:id/inventario/agregar', inventarioController.agregarProducto);

export default router;