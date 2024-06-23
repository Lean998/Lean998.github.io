document.addEventListener('DOMContentLoaded', () =>{
    const serviciosContainer = document.getElementById('serviciosContainer');
    const filtroServicio = document.getElementById('filtroServicio');
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroPrecio = document.getElementById('filtroPrecio');

    fetch('https://github.com/Lean998/TMP_DWEB/blob/main/json/precios.json')
    .then(response => response.json())
    .then(servicios =>{
        mostrarServicios(servicios);

        filtroServicio.addEventListener('change', () => aplicarFiltros(servicios));
        filtroTipo.addEventListener('change', () => aplicarFiltros(servicios));
        filtroPrecio.addEventListener('change', () => aplicarFiltros(servicios));
    })
    .catch(error => console.log(error));
    
    function mostrarServicios(servicios){
        serviciosContainer.innerHTML = "";
        servicios.forEach(servicio =>{
            const servicioHTML = `
                <div class="servicio">
                    <h2>${servicio.nombre}</h2>
                    <p><strong>Precio:</strong> ${formatoPrecio(servicio.precio)}</p>
                    <p><strong>Categoría:</strong> ${servicio.categoria}</p>
                    <p><strong>Tipo:</strong> ${servicio.tipo}</p>
                </div>
            `;
            serviciosContainer.innerHTML += servicioHTML;
        });
    }

    function aplicarFiltros(servicios) {
        const filtroServicioValor = filtroServicio.value;
        const filtroPrecioValor = filtroPrecio.value;
        const filtroTipoValor = filtroTipo.value;
    
        const serviciosFiltrados = servicios.filter(servicio => {
            const pasaFiltroServicio = filtroServicioValor === 'todos' || servicio.categoria === filtroServicioValor;
            const pasaFiltroPrecio = filtrarPorPrecio(servicio.precio, filtroPrecioValor);
            const pasaFiltroTipo = filtroTipoValor === 'todos' || servicio.tipo === filtroTipoValor; 
            return pasaFiltroPrecio && pasaFiltroServicio && pasaFiltroTipo;
        });
    
        mostrarServicios(serviciosFiltrados);
    }


    function filtrarPorPrecio(precio, filtroPrecio){
        switch(filtroPrecio){
            case 'todos':
                return true;
            break;
            case 'menos':
                return precio < 15000;
            break;
            case 'entre':
                return precio >= 10000 && precio <= 30000;
            break;
            case 'mas':
                return precio > 30000;
            break;
            default:
                return false;    
        }
    }

    // Función auxiliar para formatear el precio
    function formatoPrecio(precio) {
        return `$ ${precio.toFixed(2)}`;
    }
});