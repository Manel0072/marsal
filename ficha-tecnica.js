// Función para mostrar la ficha técnica
function mostrarFichaTecnica(id, nombre, imagenSrc) {
    // Obtener el elemento de la ficha técnica
    const fichaTecnica = document.getElementById('ficha-tecnica');
    const contenidoFicha = document.getElementById('contenido-ficha');
    
    // Datos del producto según su ID
    let datos = obtenerDatosProducto(id);
    
    // Crear contenido HTML para la ficha técnica
    let contenidoHTML = `
        <div class="ficha-producto">
            <div class="ficha-header">
                <div class="ficha-imagen">
                    <img src="${imagenSrc}" alt="${nombre}">
                </div>
                <div class="ficha-info-basica">
                    <h2 class="ficha-titulo">${nombre}</h2>
                    <p class="ficha-precio">${datos.precio} €</p>
                    <p class="ficha-descripcion">${datos.descripcion}</p>
                    <button class="ficha-boton" onclick="AlCarrito('${nombre}', ${datos.precio})">Añadir al carrito</button>
                </div>
            </div>
            
            <div class="ficha-detalles">
                <div class="ficha-seccion">
                    <h3>Características</h3>
                    <ul class="ficha-caracteristicas">
                        <li><span>Material:</span> ${datos.material}</li>
                        <li><span>Dimensiones:</span> ${datos.dimensiones}</li>
                        <li><span>Color:</span> ${datos.color}</li>
                        <li><span>Peso:</span> ${datos.peso}</li>
                        <li><span>Referencia:</span> ${datos.referencia}</li>
                    </ul>
                </div>
                
                <div class="ficha-seccion">
                    <h3>Detalles adicionales</h3>
                    <ul class="ficha-caracteristicas">
                        <li><span>Tipo de cierre:</span> ${datos.cierre}</li>
                        <li><span>Interior:</span> ${datos.interior}</li>
                        <li><span>Bolsillos:</span> ${datos.bolsillos}</li>
                        <li><span>Correa:</span> ${datos.correa}</li>
                    </ul>
                </div>
            </div>
            
            <div class="ficha-cuidados">
                <h3>Cuidados del producto</h3>
                <ul>
                    <li>Limpiar con un paño húmedo sin productos químicos agresivos.</li>
                    <li>Almacenar en un lugar seco y a temperatura ambiente.</li>
                    <li>Evitar la exposición prolongada al sol para preservar el color.</li>
                    <li>Para manchas difíciles, acudir a un servicio profesional de limpieza.</li>
                </ul>
            </div>
        </div>
    `;
    
    // Insertar el contenido en la ficha técnica
    contenidoFicha.innerHTML = contenidoHTML;
    
    // Mostrar la ficha técnica
    fichaTecnica.style.display = 'flex';
    
    // Bloquear el scroll del body cuando la ficha está abierta
    document.body.style.overflow = 'hidden';
}

// Función para obtener los datos de un producto según su ID
function obtenerDatosProducto(id) {
    // Base de datos de productos
    const productos = {
        'cocodrilo-marron': {
            precio: 299.99,
            descripcion: 'Elegante bolso de piel vegana con textura de cocodrilo en tono marrón. Un complemento perfecto para cualquier ocasión formal o casual, combinando sofisticación y funcionalidad.',
            material: 'Piel vegana premium con textura de cocodrilo',
            dimensiones: '30cm x 20cm x 10cm',
            color: 'Marrón',
            peso: '0.8 kg',
            referencia: 'COCO-M-01',
            cierre: 'Cremallera y solapa magnética',
            interior: 'Forro textil en color beige',
            bolsillos: '2 compartimentos principales, 1 bolsillo con cremallera y 2 bolsillos abiertos',
            correa: 'Ajustable y desmontable de 120cm'
        },
        'leopardo-elegante': {
            precio: 314.49,
            descripcion: 'Sofisticado bolso de piel vegana con estampado de leopardo. Diseño elegante y atemporal con acabados de alta calidad, ideal para eventos especiales.',
            material: 'Piel vegana de alta calidad con estampado de leopardo',
            dimensiones: '35cm x 25cm x 12cm',
            color: 'Estampado leopardo sobre base beige',
            peso: '0.9 kg',
            referencia: 'LEOP-E-03',
            cierre: 'Broche giratorio dorado',
            interior: 'Forro de seda sintética en negro',
            bolsillos: '1 compartimento principal, 2 bolsillos con cremallera y 3 bolsillos abiertos',
            correa: 'Cadena dorada de 100cm'
        },
        // Puedes añadir más productos aquí siguiendo el mismo formato
    };
    
    // Si el producto no existe, devolver datos genéricos
    if (!productos[id]) {
        return {
            precio: 299.99,
            descripcion: 'Bolso MARSAL de alta calidad con diseño exclusivo.',
            material: 'Piel vegana premium',
            dimensiones: '30cm x 20cm x 10cm',
            color: 'Ver imagen',
            peso: '0.8 kg',
            referencia: 'MARSAL-' + id,
            cierre: 'Cremallera',
            interior: 'Forro textil',
            bolsillos: 'Múltiples compartimentos',
            correa: 'Ajustable'
        };
    }
    
    return productos[id];
}

// Función para cerrar la ficha técnica
function cerrarFichaTecnica() {
    const fichaTecnica = document.getElementById('ficha-tecnica');
    fichaTecnica.style.display = 'none';
    
    // Restaurar el scroll del body
    document.body.style.overflow = 'auto';
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asignar evento al botón de cerrar
    const cerrarBtn = document.getElementById('cerrar-ficha');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', cerrarFichaTecnica);
    }
    
    // También cerrar al hacer clic fuera del contenido
    const fichaTecnica = document.getElementById('ficha-tecnica');
    if (fichaTecnica) {
        fichaTecnica.addEventListener('click', function(e) {
            // Si el clic fue directamente en el fondo (no en el contenido)
            if (e.target === fichaTecnica) {
                cerrarFichaTecnica();
            }
        });
    }
    
    // Evitar que se cierre al hacer clic dentro del contenido
    const contenidoFicha = document.getElementById('contenido-ficha');
    if (contenidoFicha) {
        contenidoFicha.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});