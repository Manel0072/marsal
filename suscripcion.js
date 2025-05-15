// Script modificado para que el modal de suscripción se muestre UNA VEZ CADA VEZ que entras a la página web

document.addEventListener('DOMContentLoaded', function() {
  console.log('Script de suscripción cargado correctamente');

  // Comprobar si el script ya se ha ejecutado para evitar duplicados
  if (document.getElementById('subscription-modal')) {
    console.warn('El modal de suscripción ya existe en el DOM');
    return;
  }

  // Crear el elemento modal con estructura mejorada
  const modalHTML = `
    <div class="modal-overlay" id="subscription-modal">
      <div class="modal-container">
        <button class="modal-close" id="modal-close" aria-label="Cerrar">&times;</button>
        <div class="modal-header">
          <img src="logo.png" alt="Logo" class="modal-logo" />
          <h2>¡Suscríbete y recibe novedades!</h2>
        </div>
        <div class="modal-body">
          <p>Déjanos tu email y sé el primero en enterarte de nuestras ofertas y lanzamientos exclusivos.</p>
          <form id="modal-subscription-form" class="modal-form" autocomplete="off">
            <input type="email" id="modal-email" placeholder="Tu correo electrónico" required />
            <div class="checkbox-container">
              <input type="checkbox" id="accept-cookies" />
              <label for="accept-cookies">Acepto la política de privacidad y cookies</label>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" id="accept-marketing" />
              <label for="accept-marketing">Quiero recibir comunicaciones comerciales</label>
            </div>
            <button type="submit">Suscribirme</button>
          </form>
        </div>
        <div class="modal-footer">
          <span>Podrás darte de baja en cualquier momento.</span>
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

  // Comprobar si el usuario ya ha visto el modal en ESTA SESIÓN
  let hasSeenModal = false;
  try {
    hasSeenModal = sessionStorage.getItem('hasSeenSubscriptionModal') === 'true';
    console.log('Estado del modal en sessionStorage:', hasSeenModal ? 'Ya visto' : 'No visto');
  } catch (error) {
    console.error('Error al acceder a sessionStorage:', error);
  }

  // Variable para controlar si el modal está activo
  let isModalActive = false;

  // Si el usuario no ha visto el modal en esta sesión, mostrarlo después de un retraso
  if (!hasSeenModal) {
    console.log('Programando apertura del modal en 2 segundos...');
    setTimeout(() => {
      console.log('Ejecutando apertura del modal');
      openModal();
    }, 2000); // Mostrar después de 2 segundos
  }

  // Función para abrir el modal
  function openModal() {
    console.log('Abriendo modal');
    if (!isModalActive) {
      modal.classList.add('active');
      isModalActive = true;
      // Mejorar accesibilidad: enfoque al primer elemento interactivo
      setTimeout(() => {
        const emailInput = document.getElementById('modal-email');
        if (emailInput) emailInput.focus();
      }, 100);
      // Añadir listener para tecla ESC
      document.addEventListener('keydown', handleEscKey);
    }
  }

  // Función para cerrar el modal
  function closeModal() {
    console.log('Cerrando modal');
    if (isModalActive) {
      modal.classList.remove('active');
      isModalActive = false;
      // Eliminar listener para tecla ESC
      document.removeEventListener('keydown', handleEscKey);
      // Marcar como visto en sessionStorage con manejo de errores
      try {
        sessionStorage.setItem('hasSeenSubscriptionModal', 'true');
        console.log('Modal marcado como visto en sessionStorage');
      } catch (error) {
        console.error('Error al escribir en sessionStorage:', error);
      }
    }
  }

  // Función para manejar la tecla ESC
  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  // Event listeners para cerrar el modal
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
    console.log('Listener de cierre añadido al botón');
  }

  // Cerrar el modal al hacer clic fuera del contenedor
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Validar email con una función básica
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Manejar envío del formulario
  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Formulario enviado');
      const emailInput = document.getElementById('modal-email');
      const email = emailInput ? emailInput.value.trim() : '';
      // Validación adicional del email
      if (!isValidEmail(email)) {
        alert('Por favor, introduce un email válido');
        if (emailInput) emailInput.focus();
        return;
      }
      const acceptCookies = document.getElementById('accept-cookies')?.checked || false;
      const acceptMarketing = document.getElementById('accept-marketing')?.checked || false;
      // Guardar preferencias en localStorage con manejo de errores
      try {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('acceptCookies', acceptCookies);
        localStorage.setItem('acceptMarketing', acceptMarketing);
        console.log('Preferencias guardadas en localStorage');
      } catch (error) {
        console.error('Error al guardar preferencias:', error);
      }
      // Por ahora, solo mostrar confirmación
      showConfirmation(email);
    });
    console.log('Listener añadido al formulario');
  }

  // Función para mostrar confirmación
  function showConfirmation(email) {
    const modalContent = document.querySelector('.modal-body');
    if (modalContent) {
      modalContent.innerHTML = `
        <div style="text-align:center;">
          <h3>¡Gracias por suscribirte!</h3>
          <p>Hemos recibido tu email: <b>${email}</b></p>
        </div>
      `;
      // Añadir una clase para la animación de éxito
      modalContent.classList.add('success-animation');
      // Cerrar el modal después de 3 segundos
      setTimeout(closeModal, 3000);
    }
  }

  // Función para el manejo de accesibilidad: mantener el foco dentro del modal
  function handleTabKey(e) {
    if (!isModalActive) return;
    // Elementos focusables dentro del modal
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Solo Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  // Añadir evento para el manejo de la tecla Tab
  document.addEventListener('keydown', handleTabKey);

  // Opcional: Exponer API pública para controlar el modal desde fuera
  window.MARSAL = window.MARSAL || {};
  window.MARSAL.subscriptionModal = {
    open: openModal,
    close: closeModal,
    // Función para resetear el estado (útil para pruebas)
    reset: function() {
      try {
        sessionStorage.removeItem('hasSeenSubscriptionModal');
        console.log('Estado del modal reseteado. En la próxima carga de página aparecerá de nuevo.');
      } catch (error) {
        console.error('Error al resetear estado del modal:', error);
      }
    }
  };

  console.log('Para abrir el modal manualmente: window.MARSAL.subscriptionModal.open()');
  console.log('Para resetear el estado y que aparezca en la próxima visita: window.MARSAL.subscriptionModal.reset()');
});