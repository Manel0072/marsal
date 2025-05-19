// Carrusel de colecciones
document.addEventListener('DOMContentLoaded', function() {
    const collectionsSlider = document.querySelector('.collections-slider');
    const collectionsContainer = document.querySelector('.collections-container');
    const collectionSlides = document.querySelectorAll('.collection-slide');
    const collectionsIndicators = document.querySelectorAll('.collections-indicator');
    const prevBtn = document.querySelector('.collections-btn.prev');
    const nextBtn = document.querySelector('.collections-btn.next');
    
    if (!collectionsSlider) return;
    
    let currentCollectionSlide = 0;
    const totalCollectionSlides = collectionSlides.length;
    
    // Función para actualizar el carrusel de colecciones
    function updateCollectionsSlider() {
        // Remover clase active de todos los slides
        collectionSlides.forEach(slide => slide.classList.remove('active'));
        collectionsIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Añadir clase active al slide actual
        collectionSlides[currentCollectionSlide].classList.add('active');
        collectionsIndicators[currentCollectionSlide].classList.add('active');
        
        // Mover el contenedor
        const translateX = currentCollectionSlide * -100;
        collectionsContainer.style.transform = `translateX(${translateX}%)`;
    }
    
    // Función para ir al siguiente slide
    function nextCollectionSlide() {
        currentCollectionSlide = (currentCollectionSlide + 1) % totalCollectionSlides;
        updateCollectionsSlider();
    }
    
    // Función para ir al slide anterior
    function prevCollectionSlide() {
        currentCollectionSlide = (currentCollectionSlide - 1 + totalCollectionSlides) % totalCollectionSlides;
        updateCollectionsSlider();
    }
    
    // Event listeners para botones
    nextBtn.addEventListener('click', nextCollectionSlide);
    prevBtn.addEventListener('click', prevCollectionSlide);
    
    // Event listeners para indicadores
    collectionsIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentCollectionSlide = index;
            updateCollectionsSlider();
        });
    });
    
    // Auto-play del carrusel de colecciones (cada 5 segundos)
    let collectionsAutoPlay = setInterval(nextCollectionSlide, 5000);
    
    // Pausar auto-play al hacer hover
    collectionsSlider.addEventListener('mouseenter', () => {
        clearInterval(collectionsAutoPlay);
    });
    
    // Reanudar auto-play al quitar hover
    collectionsSlider.addEventListener('mouseleave', () => {
        collectionsAutoPlay = setInterval(nextCollectionSlide, 5000);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevCollectionSlide();
        } else if (e.key === 'ArrowRight') {
            nextCollectionSlide();
        }
    });
    
    // Soporte para touch/swipe en móviles
    let collectionsStartX = 0;
    let collectionsEndX = 0;
    
    collectionsSlider.addEventListener('touchstart', (e) => {
        collectionsStartX = e.touches[0].clientX;
    });
    
    collectionsSlider.addEventListener('touchend', (e) => {
        collectionsEndX = e.changedTouches[0].clientX;
        handleCollectionsSwipe();
    });
    
    function handleCollectionsSwipe() {
        const swipeThreshold = 50;
        const diff = collectionsStartX - collectionsEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextCollectionSlide();
            } else {
                prevCollectionSlide();
            }
        }
    }
});