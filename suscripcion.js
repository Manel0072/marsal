// Script para gestionar el popup de suscripción
document.addEventListener('DOMContentLoaded', function() {
    // Crear el elemento modal
    const modalHTML = `
    <div id="subscription-modal" class="modal-overlay">
        <div class="modal-container">
            <button id="modal-close" class="modal-close" aria-label="Cerrar">&times;</button>
            <div class="modal-header">
                <img src="imagenes/logo_marsal.png" alt="Logo Marsal" class="modal-logo">
                <h2>¡Bienvenido/a a MARSAL!</h2>
            </div>
            <div class="modal-body">
                <p>Suscríbete a nuestra newsletter para recibir las últimas novedades y ofertas exclusivas.</p>
                <form id="modal-subscription-form" class="modal-form">
                    <input type="email" id="modal-email" placeholder="Introduce tu email" required>
                    <div class="checkbox-container">
                        <input type="checkbox" id="accept-cookies" name="accept-cookies" required>
                        <label for="accept-cookies">Acepto el uso de cookies necesarias para mejorar mi experiencia en el sitio web.</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="accept-marketing" name="accept-marketing">
                        <label for="accept-marketing">Deseo recibir correos electrónicos con ofertas y novedades de MARSAL.</label>
                    </div>
                    <button type="submit">Suscribirme</button>
                </form>
            </div>
            <div class="modal-footer">
                <p>Al suscribirte, aceptas nuestra <a href="#">Política de Privacidad</a> y <a href="#">Términos y Condiciones</a>.</p>
            </div>
        </div>
    </div>
    `;
    
    // Insertar el modal en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Elementos del DOM
    const modal = document.getElementById('subscription-modal');
    const closeButton = document.getElementById('modal-close');
    const subscriptionForm = document.getElementById('modal-subscription-form');
    
    // Comprobar si el usuario ya ha visto el modal (usando localStorage)
    const hasSeenModal = localStorage.getItem('hasSeenSubscriptionModal');
    
    // Si el usuario no ha visto el modal antes, mostrarlo después de un retraso
    if (!hasSeenModal) {
        setTimeout(() => {
            modal.classList.add('active');
        }, 2000); // Mostrar después de 2 segundos
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        // Marcar como visto en localStorage
        localStorage.setItem('hasSeenSubscriptionModal', 'true');
    }
    
    // Event listeners para cerrar el modal
    closeButton.addEventListener('click', closeModal);
    
    // Cerrar el modal al hacer clic fuera del contenedor
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Manejar envío del formulario
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('modal-email').value;
        const acceptCookies = document.getElementById('accept-cookies').checked;
        const acceptMarketing = document.getElementById('accept-marketing').checked;
        
        // Guardar preferencias en localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('acceptCookies', acceptCookies);
        localStorage.setItem('acceptMarketing', acceptMarketing);
        
        // Aquí se podría añadir código para enviar los datos a un servidor
        
        // Mostrar confirmación
        const modalContent = document.querySelector('.modal-body');
        modalContent.innerHTML = `
            <p style="color: #3A2F23; font-weight: bold;">¡Gracias por suscribirte!</p>
            <p>Tu email ${email} ha sido registrado correctamente.</p>
            <p>El popup se cerrará automáticamente en unos segundos...</p>
        `;
        
        // Cerrar el modal después de 3 segundos
        setTimeout(closeModal, 3000);
    });
});