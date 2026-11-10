import pool from '../config/database.js';

//Obener inventario de un almacen
const obtenerPorAlmacen = async (almacen_id) =>{
    const [rows] = await pool.query('SELECT inventario.id, inventario.existencia, inventario.stock_minimo, productos.nombre AS producto, productos.sku, productos.unidad_medida, almacenes.nombre AS almacen FROM inventario INNER JOIN productos ON inventario.producto_id = productos.id INNER JOIN almacenes ON inventario.almacen_id = almacenes.id WHERE inventario.almacen_id = ? ORDER BY productos.nombre ASC', [almacen_id]);
    return rows;
};
// Agregar producto a un almacén o aumentar su existencia
const agregarProducto = async (almacen_id, producto_id, existencia, stock_minimo) => {

    const [result] = await pool.query(
        `INSERT INTO inventario
            (almacen_id, producto_id, existencia, stock_minimo)

        VALUES (?, ?, ?, ?)

        AS nuevo

        ON DUPLICATE KEY UPDATE
            existencia = inventario.existencia + nuevo.existencia`,
        [almacen_id, producto_id, existencia, stock_minimo]
    );

    return result;
};

export default {
    obtenerPorAlmacen,
    agregarProducto
};