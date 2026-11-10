import express from 'express';
import almacenController from '../controllers/almacen.controller.js';

const router = express.Router();

//Mostrar almacenes
router.get('/', almacenController.listar);
//Registrar almacen
router.post('/registrar', almacenController.registrar);
//Mostrar formulario para editar
router.get('/editar/:id', almacenController.mostrarEditar);
//Actualizar almacen
router.post('/actualizar/:id', almacenController.editar)
//Desactivar almacen
router.post('/eliminar/:id', almacenController.eliminar)

export default router;