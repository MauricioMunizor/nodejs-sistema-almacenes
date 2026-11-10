import pool from '../config/database.js';

//Obtener todos los almacenes
const obtenerTodos = async ()=>{
    const [rows] = await pool.query(
        'SELECT * FROM almacenes ORDER BY id DESC'
    );
    return rows;
};

//Registrar un almacen
const crear = async (nombre, ubicacion) =>{
    const [result] = await pool.query(
        'INSERT INTO almacenes (nombre, ubicacion) VALUES (?, ?)',
        [nombre, ubicacion]
    );
    return result;
}

//Buscar almacen por ID
const obtenerPorId = async (id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM almacenes WHERE id = ?',
        [id]
    );
    return rows[0];
}

//Actualizar un almacen
const actualizar = async (id, nombre, ubicacion)=>{
    const [result] = await pool.query(
        'UPDATE almacenes SET nombre = ?, ubicacion = ? WHERE id = ?',
        [nombre, ubicacion, id]
    );
    return result;
}

//Desactivar almacen
const desactivar = async (id)=>{
    const[result] = await pool.query(
        'UPDATE almacenes SET estado = FALSE WHERE id = ?',
        [id]
    );
    return result;
}

export default{
    obtenerTodos,
    crear,
    obtenerPorId,
    actualizar,
    desactivar
}