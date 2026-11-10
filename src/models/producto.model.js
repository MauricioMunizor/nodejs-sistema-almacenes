import pool from '../config/database.js'

//Obtener todos los prouctos
const obtenerTodosProductos = async ()=>{
    const[rows] = await pool.query(
        'SELECT * FROM productos ORDER BY id DESC'
    );
    return rows;
}

//Registrar un producto
const crearProducto = async (nombre, sku, descripcion, unidad_medida)=>{
    const[result] = await pool.query(
        'INSERT INTO productos (nombre, sku, descripcion, unidad_medida) VALUES (?, ?, ?, ?)', [nombre, sku, descripcion, unidad_medida]
    );
    return result;
}

//Obtener un producto por ID
const obtenerProductoPorId = async (id)=>{
    const[rows] = await pool.query(
        'SELECT * FROM productos WHERE id = ?', [id]
    );
    return rows[0];
}

//Actualizar un producto
const actualizarProducto = async (id, nombre, sku, descripcion, unidad_medida)=>{
    const[result] = await pool.query(
        'UPDATE productos SET nombre = ?, sku = ?, descripcion = ?, unidad_medida = ? WHERE id = ?', [nombre, sku, descripcion, unidad_medida, id]
    );
    return result;
}

//Desactivar un producto
const desactivarProducto = async (id)=>{
    const[result] = await pool.query(
        'UPDATE productos SET estado = FALSE WHERE id = ?', [id]
    )
    return result;
}

export default{
    obtenerTodosProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    desactivarProducto
}