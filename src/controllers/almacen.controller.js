import almacenModel from "../models/almacen.model.js";

//Mostrar almacenes
const listar = async (req,res)=>{
    try {
        const almacenes = await almacenModel.obtenerTodos();
        res.render('almacenes/index',{
            almacenes,
            title: 'Almacenes',
            activePage: 'almacenes'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar almacenes');
    }
};

//Registrar almacen
const registrar = async (req,res)=>{
    try {
        const {nombre, ubicacion} = req.body;
        if(!nombre || !nombre.trim()){
            return res.status(400).send('El nombre es obligatorio');
        }
        await almacenModel.crear(nombre.trim(), ubicacion);
        res.redirect('/almacenes')

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar almacen')
        
    }
}
// Mostrar formulario de edición
const mostrarEditar = async (req, res) => {

    try {

        const almacen = await almacenModel.obtenerPorId(req.params.id);

        if (!almacen) {
            return res.status(404).send('Almacén no encontrado');
        }

        res.render('almacenes/editar', {
            almacen
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Error al consultar almacén');

    }

};

// Actualizar almacén
const editar = async (req, res) => {

    try {

        const { nombre, ubicacion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).send('El nombre es obligatorio');
        }

        const almacen = await almacenModel.obtenerPorId(req.params.id);

        if (!almacen) {
            return res.status(404).send('Almacén no encontrado');
        }

        await almacenModel.actualizar(
            req.params.id,
            nombre.trim(),
            ubicacion
        );

        res.redirect('/almacenes');

    } catch (error) {

        console.error(error);

        res.status(500).send('Error al actualizar almacén');

    }

};

// Desactivar almacén
const eliminar = async (req, res) => {

    try {

        const almacen = await almacenModel.obtenerPorId(req.params.id);

        if (!almacen) {
            return res.status(404).send('Almacén no encontrado');
        }

        await almacenModel.desactivar(req.params.id);

        res.redirect('/almacenes');

    } catch (error) {

        console.error(error);

        res.status(500).send('Error al desactivar almacén');

    }

};

export default {
    listar,
    registrar,
    mostrarEditar,
    editar,
    eliminar
};