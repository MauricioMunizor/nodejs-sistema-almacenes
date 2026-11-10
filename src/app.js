import express from 'express';
import pool from './config/database.js';
import almacenRoutes from './routes/almacen.routes.js';
import productoRoutes from './routes/producto.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';

const app = express();


app.set('view engine', 'ejs');
app.set('views', './src/views')
//Middlewares
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
//Archivos estaticos
app.use(express.static('public'));

//Ruta principal
app.use('/almacenes/', almacenRoutes);
app.use('/productos', productoRoutes);
app.use('/almacenes', inventarioRoutes);

app.get('/', (req, res)=>{
    res.send('Sistema funcionando')

})


//Inicio de servidor
const PORT = 3000;

app.listen(PORT, async ()=>{
    console.log('servidor escuchando en http://localhost:3000');
    try {
        const connection = await pool.getConnection();
        console.log('Conexion con MySQL exitosa');
        connection.release();
        
    } catch (error) {
        console.error('Error al conectar con MySQL:', error.message);
    }
})