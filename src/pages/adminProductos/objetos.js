let publicaciones = [];

const objetosMuestra = [
    {
        name: 'Body Damon',
        img: '../public/img/Body-Damon.jpg',
        description: 'Conjunto de encaje negro',
        price: '$799.99'
    },
    {
        name: 'Set Ángel',
        img: '../public/img/Set-Angel.jpg',
        description: 'Conjunto de encaje blanco',
        price: '$799.99'
    },
    {
        name: 'Body Carmina',
        img: '../public/img/Body-Carmina.jpg',
        description: 'Conjunto de encaje negro',
        price: '$799.99'
    },
    {
        name: 'Set Catalina',
        img: '../public/img/Set-Catalina.jpg',
        description: 'Conjunto de encaje negro',
        price: '$799.99'
    },
    {
        name: 'Set Cordelia',
        img: '../public/img/Set-Cordelia.jpg',
        description: 'Conjunto de encaje negro',
        price: '$799.99'
    },
    {
        name: 'Bustier Ale',
        img: '../public/img/Bustier-Ale.jpg',
        description: 'Conjunto de color',
        price: '$799.99'
    },
    {
        name: 'Set Vedette',
        img: '../public/img/Set-Vedette.jpg',
        description: 'Conjunto de encaje blanco',
        price: '$799.99'
    },
    {
        name: 'Set Daniela',
        img: '../public/img/Set-Daniela.jpg',
        description: 'Conjunto de colores',
        price: '$799.99'
    },
    {
        name: 'Set Florentina',
        img: '../public/img/Set-Florentina.jpg',
        description: 'Conjunto con estampado de negro',
        price: '$799.99'
    },
    {
        name: 'Set Susan',
        img: '../public/img/Set-Susan.jpg',
        description: 'Conjunto de encaje melón',
        price: '$799.99'
    },
];

function guardarEnLocalStorage() {
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

function cargarDesdeLocalStorage() {
    const publicacionesGuardadas = localStorage.getItem('publicaciones');
    if (publicacionesGuardadas) {
        publicaciones = JSON.parse(publicacionesGuardadas);
    } else {
        publicaciones = objetosMuestra;
        guardarEnLocalStorage();
    }
}

function mostrarPublicaciones() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    publicaciones.forEach((publicacion, index) => {
        const publicacionDiv = document.createElement('div');
        publicacionDiv.classList.add('publicacion');
        publicacionDiv.innerHTML = `
            <img src="${publicacion.img}" alt="${publicacion.name}">
            <h4>${publicacion.name}</h4>
            <p>${publicacion.description}</p>
            <p>${publicacion.price}</p>
            <br>
            <button onclick="borrarPublicacion(${index})">Borrar</button>
            <button onclick="mostrarFormularioEditar(${index})">Modificar</button>
        `;
        contenedor.appendChild(publicacionDiv);
    });
}

function agregarNuevaPublicacion() {
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('imagen').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;

    if (nombre && imagen && descripcion && precio) {
        agregarPublicacion({ name: nombre, img: imagen, description: descripcion, price: precio });
        mostrarPublicaciones();
        limpiarFormulario();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function agregarPublicacion(publicacion) {
    publicaciones.push(publicacion);
    guardarEnLocalStorage();
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
}

function borrarPublicacion(index) {
    if (index >= 0 && index < publicaciones.length) {
        publicaciones.splice(index, 1);
        guardarEnLocalStorage();
        mostrarPublicaciones();
    } else {
        console.log('Índice fuera de rango');
    }
}

function mostrarFormularioEditar(index) {
    const publicacion = publicaciones[index];
    const formularioDiv = document.createElement('div');
    formularioDiv.classList.add('formulario-editar');
    formularioDiv.innerHTML = `
        <h3>Modificar Publicación</h3>
        <form onsubmit="event.preventDefault(); modificarYActualizar(${index})">
            <input type="text" id="edit-nombre-${index}" value="${publicacion.name}" placeholder="Nombre del producto">
            <input type="text" id="edit-imagen-${index}" value="${publicacion.img}" placeholder="URL de la imagen">
            <input type="text" id="edit-descripcion-${index}" value="${publicacion.description}" placeholder="Descripción del producto">
            <input type="text" id="edit-precio-${index}" value="${publicacion.price}" placeholder="Precio del producto">
            <button type="submit">Guardar Cambios</button>
            <button type="button" onclick="mostrarPublicaciones()">Cancelar</button>
        </form>
    `;
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    contenedor.appendChild(formularioDiv);
}

function modificarYActualizar(index) {
    const nuevoNombre = document.getElementById(`edit-nombre-${index}`).value;
    const nuevaImagen = document.getElementById(`edit-imagen-${index}`).value;
    const nuevaDescripcion = document.getElementById(`edit-descripcion-${index}`).value;
    const nuevoPrecio = document.getElementById(`edit-precio-${index}`).value;

    if (nuevoNombre && nuevaImagen && nuevaDescripcion && nuevoPrecio) {
        modificarPublicacion(index, { name: nuevoNombre, img: nuevaImagen, description: nuevaDescripcion, price: nuevoPrecio });
        mostrarPublicaciones();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function borrarTodaLista() {
    publicaciones = [];
    localStorage.removeItem('publicaciones');
}

function modificarPublicacion(index, nuevaPublicacion) {
    publicaciones[index] = nuevaPublicacion;
    guardarEnLocalStorage();
}

cargarDesdeLocalStorage();
console.log('Publicaciones cargadas:', publicaciones);
mostrarPublicaciones();
