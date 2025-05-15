// legal-modal.js
document.addEventListener('DOMContentLoaded', function() {
  // Abrir el modal
  document.getElementById('openLegalModal').onclick = function() {
    document.getElementById('legalModal').style.display = "block";
    document.body.style.overflow = "hidden"; // Evita scroll de fondo
  };
  // Cerrar al pulsar la X
  document.getElementById('closeLegalModal').onclick = function() {
    document.getElementById('legalModal').style.display = "none";
    document.body.style.overflow = "";
  };
  // Cerrar al hacer clic fuera del contenido
  window.onclick = function(event) {
    var modal = document.getElementById('legalModal');
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  };
  // Cerrar con Escape
  document.addEventListener('keydown', function(event) {
    var modal = document.getElementById('legalModal');
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
