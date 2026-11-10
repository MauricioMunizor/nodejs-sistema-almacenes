import inventarioModel from '../models/inventario.model.js';
import almacenModel from '../models/almacen.model.js';
import productoModel from '../models/producto.model.js';

// Mostrar inventario de un almacén
const listarPorAlmacen = async (req, res) => {
    try {
        const almacen_id = Number(req.params.id);

        if (!Number.isInteger(almacen_id) || almacen_id <= 0) {
            return res.status(400).send('ID de almacén inválido');
        }

        const almacen = await almacenModel.obtenerPorId(almacen_id);

        if (!almacen) {
            return res.status(404).send('Almacén no encontrado');
        }

        const inventario = await inventarioModel.obtenerPorAlmacen(almacen_id);
        const productos = await productoModel.obtenerTodosProductos();

        res.render('inventario/index', {
            almacen,
            inventario,
            productos
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar el inventario');
    }
};

// Agregar producto al inventario
const agregarProducto = async (req, res) => {
    try {
        const almacen_id = Number(req.params.id);
        const producto_id = Number(req.body.producto_id);
        const existencia = Number(req.body.existencia);
        const stock_minimo = Number(req.body.stock_minimo);

        if (
            !Number.isInteger(almacen_id) || almacen_id <= 0 ||
            !Number.isInteger(producto_id) || producto_id <= 0 ||
            !Number.isFinite(existencia) || existencia <= 0 ||
            !Number.isFinite(stock_minimo) || stock_minimo < 0
        ) {
            return res.status(400).send('Datos de inventario inválidos');
        }

        const almacen = await almacenModel.obtenerPorId(almacen_id);

        if (!almacen) {
            return res.status(404).send('Almacén no encontrado');
        }

        const producto = await productoModel.obtenerProductoPorId(producto_id);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        await inventarioModel.agregarProducto(
            almacen_id,
            producto_id,
            existencia,
            stock_minimo
        );

        res.redirect(`/almacenes/${almacen_id}/inventario`);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar producto al inventario');
    }
};

export default {
    listarPorAlmacen,
    agregarProducto
};