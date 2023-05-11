//canciones.js

//Importar módulos necesarios 
const fs = require('fs');
const path = require('path');

//acceso a ruta del json
const jsonFilePath = path.join(__dirname, 'public', 'data', 'repertorio.json');

//Mostrar la página index.ejs
function mostrarPaginaIndex(req, res) {
    res.render('index');
}

// Función para generar la página HTML con el listado de canciones
function mostrarPaginaCanciones(req, res) {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }
        const canciones = JSON.parse(data);
        // Ordenar el arreglo de objetos por el campo 'id'
        canciones.sort((a, b) => a.id - b.id);
        res.render('canciones', { canciones });
    });
}

function agregarCancion(req, res) {
    const { titulo, artista, tono } = req.body;

    // Verificar si alguno de los campos está vacío después de hacer trim
    if (!titulo.trim() || !artista.trim() || !tono.trim()) {
        const mensajeError = 'Por favor, complete todos los campos.';
        console.log(mensajeError)
        // Redireccionar a la página de canciones
        return res.redirect('/canciones');
    }

    // Leer el archivo jsonFilePath
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        const canciones = JSON.parse(data);
        canciones.sort((a, b) => a.id - b.id);
        let id = 1; // Valor por defecto para el ID si el JSON está vacío

        if (canciones.length > 0) {
            // Obtener el último ID y sumar uno para el nuevo ID
            const ultimoId = canciones[canciones.length - 1].id;
            id = Number(ultimoId) + 1;
        }

        // Agregar la nueva canción al repertorio
        canciones.push({ id, titulo, artista, tono });
        // Guardar el archivo actualizado
        fs.writeFile(jsonFilePath, JSON.stringify(canciones, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error interno del servidor');
            }

            // Redireccionar a la página de canciones
            res.redirect('/canciones');
        });
    });
}

function eliminarCancionPorId(req, res) {
    const id = req.params.id;
    // Lee el contenido actual del archivo jsonFilePath
    let canciones = JSON.parse(fs.readFileSync(jsonFilePath));

    // Convertir el ID a cadena de texto
    const idStr = id.toString();

    // Busca la canción con el ID proporcionado en el repertorio
    const index = canciones.findIndex(cancion => cancion.id.toString() === idStr);

    if (index !== -1) {
        // Elimina la canción del repertorio
        console.log('Eliminar cancion: ', canciones[index]);

        canciones.splice(index, 1);
        canciones.sort((a, b) => a.id - b.id);
        // Guarda el repertorio actualizado en el archivo jsonFilePath
        fs.writeFileSync(jsonFilePath, JSON.stringify(canciones, null, 2));
    }
    res.sendStatus(204); // Enviar una respuesta sin contenido (204 No Content)
}
function recibirActualizacion(req, res) {

    // Leer el archivo JSON y encontrar la canción correspondiente
    const data = fs.readFileSync(jsonFilePath);
    const canciones = JSON.parse(data);
    const cancion = canciones.find(c => c.id === Number(req.params.id));

    // Renderizar el formulario con los datos de la canción
    res.render('formulario', {
        titulo: 'Actualizar Canción',
        tituloBoton: 'Actualizar',
        id: cancion.id,
        tituloInput: cancion.titulo,
        artistaInput: cancion.artista,
        tonoInput: cancion.tono
    });
}

function actualizarCancion(req, res) {
    // Leer el archivo JSON y encontrar la canción correspondiente
    const { id } = req.params;
    const data = fs.readFileSync(jsonFilePath);
    const canciones = JSON.parse(data);
    const cancion = canciones.find(c => c.id === Number(id));

    // Actualizar los datos de la canción con los valores del formulario
    cancion.titulo = req.body.titulo;
    cancion.artista = req.body.artista;
    cancion.tono = req.body.tono;

    console.log('Realizar actualización de la canción: ',cancion);

    // Agregar la nueva canción al repertorio
    // Escribir la lista de canciones actualizada en el archivo JSON
    canciones.sort((a, b) => a.id - b.id);
    fs.writeFileSync(jsonFilePath, JSON.stringify(canciones, null, 2));

    // Redirigir al usuario a la página que muestra la lista de canciones actualizada
    res.redirect('/canciones');
}


module.exports = {
    mostrarPaginaCanciones, agregarCancion,
    eliminarCancionPorId, actualizarCancion,
    mostrarPaginaIndex, recibirActualizacion
};
