//server.js

//Importar módulos necesarios 
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

//Generar instancia para construir servidor web
const app = express();

//generar constante que determina el puerto a usar
const PORT = process.env.PORT || 3000;

//Importar funciones a utilizar del archivo canciones
const { mostrarPaginaCanciones, agregarCancion,
    eliminarCancionPorId, actualizarCancion,
    mostrarPaginaIndex, recibirActualizacion } = require('./canciones');

// Configurar el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuración de middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

//Usar carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Para obtener información de los procesos en el servidor
//const morgan = require('morgan');

// Configurar el uso de Morgan en la aplicación
//app.use(morgan('dev'));

// Ruta por defecto
app.get('/', mostrarPaginaIndex);

// Ruta para mostrar el listado de canciones con Bootstrap
app.get('/canciones', mostrarPaginaCanciones);

// POST /canciones: Agrega una nueva canción al repertorio
app.post('/canciones', agregarCancion);

// Ruta DELETE para eliminar una canción por su ID
app.delete('/canciones/:id', eliminarCancionPorId);

// Ruta para mostrar el formulario de actualización
app.get('/canciones/:id/editar', recibirActualizacion);

// Ruta PUT para Actualizar por ID
//app.put('/canciones/:id', actualizarCancion);
app.put('/canciones/:id', actualizarCancion);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
