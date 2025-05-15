// Datos de las fichas técnicas de los productos
const fichasTecnicas = {
    'cocodrilo-marron': {
        id: 'cocodrilo-marron',
        nombre: 'Bolso de piel de cocodrilo marrón',
        imagen: 'Bolsos/cocodrilo_marron.jpeg',
        precio: '299,99 €',
        material: 'Piel vegana imitación cocodrilo',
        dimensiones: '30 x 20 x 10 cm',
        peso: '0.8 kg',
        color: 'Marrón chocolate',
        acabado: 'Textura cocodrilo, mate',
        forro: 'Interior en tela de algodón orgánico',
        cremallera: 'Metálica dorada',
        asas: 'Doble asa corta y correa larga ajustable',
        bolsillos: '2 compartimentos principales, 1 bolsillo interior con cremallera, 2 bolsillos para móvil/tarjetas',
        cuidados: 'Limpiar con paño húmedo, mantener alejado de fuentes directas de calor',
        coleccion: 'Primavera/Verano 2025',
        fabricacion: 'Artesanal, hecho en España'
    },
    'leopardo-elegante': {
        id: 'leopardo-elegante',
        nombre: 'Bolso de piel de leopardo elegante',
        imagen: 'Bolsos/leopardo_elegante.jpeg',
        precio: '314,49 €',
        material: 'Piel vegana con estampado leopardo de alta definición',
        dimensiones: '35 x 25 x 12 cm',
        peso: '0.9 kg',
        color: 'Estampado leopardo sobre base beige',
        acabado: 'Semi-brillante con detalles en negro',
        forro: 'Interior en microfibra de calidad premium',
        cremallera: 'Metálica negra con detalles dorados',
        asas: 'Asas cortas con refuerzo y correa larga desmontable',
        bolsillos: '1 compartimento principal, 2 bolsillos interiores (1 con cremallera), bolsillo trasero con botón',
        cuidados: 'Evitar exposición prolongada al sol, limpiar con productos específicos para piel vegana',
        coleccion: 'Exclusivo Edición Limitada 2025',
        fabricacion: 'Producción artesanal en talleres españoles'
    }
};

// Función para mostrar la ficha técnica
function mostrarFichaTecnica(id, nombre, imagen) {
    // Obtenemos la información de la ficha técnica
    const ficha = fichasTecnicas[id];
    
    // Si no existe la ficha técnica, mostramos un mensaje de error
    if (!ficha) {
        alert('Ficha técnica no disponible para este producto');
        return;
    }
    
    // Construimos el HTML de la ficha técnica
    const contenidoFicha = `
        <div class="ficha-producto">
            <h2>${ficha.nombre}</h2>
            <div class="ficha-contenido">
                <div class="ficha-imagen">
                    <img src="${ficha.imagen}" alt="${ficha.nombre}">
                </div>
                <div class="ficha-detalles">
                    <table>
                        <tr>
                            <th>Referencia:</th>
                            <td>${ficha.id}</td>
                        </tr>
                        <tr>
                            <th>Precio:</th>
                            <td>${ficha.precio}</td>
                        </tr>
                        <tr>
                            <th>Material:</th>
                            <td>${ficha.material}</td>
                        </tr>
                        <tr>
                            <th>Dimensiones:</th>
                            <td>${ficha.dimensiones}</td>
                        </tr>
                        <tr>
                            <th>Peso:</th>
                            <td>${ficha.peso}</td>
                        </tr>
                        <tr>
                            <th>Color:</th>
                            <td>${ficha.color}</td>
                        </tr>
                        <tr>
                            <th>Acabado:</th>
                            <td>${ficha.acabado}</td>
                        </tr>
                        <tr>
                            <th>Forro:</th>
                            <td>${ficha.forro}</td>
                        </tr>
                        <tr>
                            <th>Cremallera:</th>
                            <td>${ficha.cremallera}</td>
                        </tr>
                        <tr>
                            <th>Asas:</th>
                            <td>${ficha.asas}</td>
                        </tr>
                        <tr>
                            <th>Compartimentos:</th>
                            <td>${ficha.bolsillos}</td>
                        </tr>
                        <tr>
                            <th>Cuidados:</th>
                            <td>${ficha.cuidados}</td>
                        </tr>
                        <tr>
                            <th>Colección:</th>
                            <td>${ficha.coleccion}</td>
                        </tr>
                        <tr>
                            <th>Fabricación:</th>
                            <td>${ficha.fabricacion}</td>
                        </tr>
                    </table>
                    <div class="ficha-botones">
                        <button onclick="AlCarrito('${ficha.nombre}', ${ficha.precio.replace(',', '.').replace(' €', '')})">Añadir al carrito</button>
                        <button id="volver-productos">Volver a productos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Actualizamos el contenido de la ficha técnica
    document.getElementById('contenido-ficha').innerHTML = contenidoFicha;
    
    // Mostramos la sección de ficha técnica
    const fichaTecnicaElement = document.getElementById('ficha-tecnica');
    fichaTecnicaElement.style.display = 'block';
    
    // Ocultamos el contenido principal
    document.getElementById('mainproductos').style.display = 'none';
    
    // Configuramos el evento para el botón de volver
    document.getElementById('volver-productos').addEventListener('click', cerrarFichaTecnica);
}

// Función para cerrar la ficha técnica
function cerrarFichaTecnica() {
    // Ocultamos la sección de ficha técnica
    document.getElementById('ficha-tecnica').style.display = 'none';
    
    // Mostramos el contenido principal
    document.getElementById('mainproductos').style.display = 'block';
}

// Inicializamos los eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configuramos el evento para el botón de cerrar
    document.getElementById('cerrar-ficha').addEventListener('click', cerrarFichaTecnica);
});