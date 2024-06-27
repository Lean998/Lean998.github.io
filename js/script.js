document.addEventListener("DOMContentLoaded", () => {
    let servicios = [];
    let serviciosSeleccionados = [];
    fetch("../../json/precios.json")
    .then((response) => response.json())
    .then((data) => {
        servicios = data;
        mostrarServicios(data);
        inicializarFiltros();
    })
    .catch((error) => console.error("Error:", error));

    function mostrarServicios(data) {
    const serviciosElements = document.querySelectorAll(".servicio");
    serviciosElements.forEach((servicio) => {
        const categoria = servicio.dataset.categoria;
        const listaItems = servicio.querySelector(".lista-items");
        listaItems.innerHTML = "";

        data[categoria].forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        li.dataset.nombre = item.nombre;
        li.dataset.precio = item.precio;
        li.dataset.genero = item.genero.join(",");
        li.addEventListener("click", agregarServicio);
        listaItems.appendChild(li);
        });
    });
    }

    function inicializarFiltros() {
    const filtros = document.querySelectorAll(".filtro-btn");
    filtros.forEach((filtro) => {
        filtro.addEventListener("click", () => {
        const genero = filtro.dataset.filtro;
        filtrarServicios(genero);
        });
    });
    }

    function filtrarServicios(genero) {
    const serviciosFiltrados = {};
    Object.keys(servicios).forEach((categoria) => {
        serviciosFiltrados[categoria] = servicios[categoria].filter(
        (item) => genero === "todos" || item.genero.includes(genero)
        );
    });
    mostrarServicios(serviciosFiltrados);
    }

    function agregarServicio(e) {
    const servicio = {
        nombre: e.target.dataset.nombre,
        precio: parseInt(e.target.dataset.precio),
    };
    serviciosSeleccionados.push(servicio);
    actualizarResumen();
    }

    function actualizarResumen() {
    const listaServicios = document.getElementById("servicios-seleccionados");
    listaServicios.innerHTML = "";
    let total = 0;

    serviciosSeleccionados.forEach((servicio, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${servicio.nombre}</span>
            <span>$${servicio.precio.toFixed(2)}</span>
        `;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.addEventListener("click", () => eliminarServicio(index));
        li.appendChild(btnEliminar);
        listaServicios.appendChild(li);
        total += servicio.precio;
    });

    document.getElementById("total-precio").textContent = total.toFixed(2);
    }

    function eliminarServicio(index) {
    serviciosSeleccionados.splice(index, 1);
    actualizarResumen();
    }
    

    // Carrusel
    const fotos = document.querySelectorAll(".foto-carrusel");
    let currentIndex = 0;

    function cambiarFoto() {
    fotos[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % fotos.length;
    fotos[currentIndex].classList.add("active");
    }

    fotos[currentIndex].classList.add("active");
    setInterval(cambiarFoto, 3000);
});


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var btn = document.getElementById("contenedor-btn-top");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function irTop(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 

}

function comprobarDatosReserva() {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
    .forEach(function(form) {
        form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            
            var telefono = document.getElementById('inputPhone').value;
            var nombre = document.getElementById('inputUsername').value;
            
            var telefonoSpan = document.getElementById('telefonoSpanReserva');
            var nombreSpan = document.getElementById('nombreSpanReserva');

            nombreSpan.textContent = nombre;
            telefonoSpan.textContent = '"'+telefono+'"';

            var modalElement = document.getElementById('modalConfReserva');
            var modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
            form.reset();
            form.classList.remove('was-validated');
        }
        form.classList.add('was-validated');
        }, false);
    });
};

function comprobarDatosContacto (){
    var forms = document.getElementsByClassName('needs-validation');
                Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            event.preventDefault();  
                            var email = document.getElementById('inputEmail').value;
                            var nombre = document.getElementById('inputNombre').value;
                            var nombreSpan = document.getElementById('nombreSpan');
                            var emailSpan = document.getElementById('emailSpan');
                            nombreSpan.textContent = nombre;
                            emailSpan.textContent = '"' + email + '"';
        
                            var modalElement = document.getElementById('modalConfContacto');
                            var modalInstance = new bootstrap.Modal(modalElement);
                            modalInstance.show();
                            form.reset();
                            form.classList.remove('was-validated');
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
}