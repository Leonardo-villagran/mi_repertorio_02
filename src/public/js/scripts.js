function eliminarCancion(id) {
    // Enviar una solicitud DELETE al servidor
    const respuesta = confirm('¿Estás seguro de querer eliminar esta canción?');
    if (respuesta) {
        fetch(`/canciones/${id}`, { method: 'DELETE' })
            .then(function (response) {
                // Verificar si la respuesta fue exitosa
                if (response.ok) {
                    // Actualizar la página después de eliminar la canción
                    location.reload();
                } else {
                    console.error('Error al eliminar la canción');
                }
            })
            .catch(function (error) {
                console.error('Error al eliminar la canción:', error);
            });
    }
    else {
        console.log('No se eliminó la canción');
    }
}

/*function guardarCambios(id) {
    const tituloElement = document.getElementById(`titulo_${id}`);
    const artistaElement = document.getElementById(`artista_${id}`);
    const tonoElement = document.getElementById(`tono_${id}`);

    const nuevoTitulo = tituloElement.textContent.trim();
    const nuevoArtista = artistaElement.textContent.trim();
    const nuevoTono = tonoElement.textContent.trim();

    if (nuevoTitulo === '' || nuevoArtista === '' || nuevoTono === '') {
        alert('Por favor, complete todos los campos.');
        location.reload();
        return; // Detiene la ejecución del código
    }

    const respuesta = confirm(`¿Está seguro qué desea cambiar título: ${nuevoTitulo}, artista: ${nuevoArtista} y tono: ${nuevoTono}`);

    if (respuesta) {
        // Realizar la solicitud PUT al servidor para actualizar la canción
        fetch(`/canciones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo: nuevoTitulo, artista: nuevoArtista, tono: nuevoTono })
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Canción de id: ${id} actualizada: Título - ${nuevoTitulo}, Artista - ${nuevoArtista}`);
                } else {
                    console.error(`Error al actualizar la canción ${id}`);
                }
            })
            .catch(error => {
                console.error('Error en la solicitud PUT', error);
            });
    }
    else {
        location.reload();
    }
}*/

function validarCampos() {
    
    const titulo = document.getElementById("titulo").value.trim();
    const artista = document.getElementById("artista").value.trim();
    const tono = document.getElementById("tono").value.trim();

    if (!titulo || !artista || !tono) {
        alert("No se deben dejar campos vacíos");
        location.reload();
    }

}