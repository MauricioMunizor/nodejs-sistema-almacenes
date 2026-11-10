import productoModel from "../models/producto.model.js";

//consultar todos los productos
const listarProductos = async (req, res)=>{
    try {
        const productos = await productoModel.obtenerTodosProductos();
        res.render('productos/index', {
            productos,
            title: 'Productos',
            activePage: 'productos'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar productos')
    }
}

//Registrar un producto
const registrarProducto = async (req, res)=>{
    try {
        const{nombre, sku, descripcion, unidad_medida} = req.body;
        if(!nombre || !nombre.trim()){
            return res.status(400).send('El nombre es obligatorio');
        }
        if(!sku || !sku.trim()){
            return res.status(400).send('El sku es obligatorio');
        }

        await productoModel.crearProducto(
            nombre.trim(),
            sku.trim(),
            descripcion,
            unidad_medida
        );

        res.redirect('/productos');
    } catch (error) {
        console.log(error);
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(400).send('El sku ya esta registrado');
        }

        res.status(500).send('Error al registrar el producto');
    }
}

const mostrarEditar = async (req, res)=>{
    try {
        const producto = await productoModel.obtenerProductoPorId(req.params.id);
        if(!producto){
            return res.status(404).send('Producto no encontrado')
        }
        res.render('productos/editar', {
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar el producto');
        
    }
}

const editar = async (req, res) => {
    try {
        const {
            nombre,
            sku,
            descripcion,
            unidad_medida
        } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).send('El nombre es obligatorio');
        }

        if (!sku || !sku.trim()) {
            return res.status(400).send('El SKU es obligatorio');
        }

        const producto = await productoModel.obtenerProductoPorId(req.params.id);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        await productoModel.actualizarProducto(
            req.params.id,
            nombre.trim(),
            sku.trim(),
            descripcion,
            unidad_medida
        );

        res.redirect('/productos');

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('El SKU ya está registrado');
        }

        res.status(500).send('Error al actualizar producto');
    }
};

const eliminar = async (req, res) => {
    try {
        const producto = await productoModel.obtenerProductoPorId(req.params.id);

        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        await productoModel.desactivarProducto(req.params.id);

        res.redirect('/productos');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al desactivar producto');
    }
};

export default {
    listarProductos,
    registrarProducto,
    mostrarEditar,
    editar,
    eliminar
};