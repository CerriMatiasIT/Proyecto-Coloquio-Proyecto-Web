/**
 * CONTACTO.JS
 * Gestiona el envío del formulario de contacto, muestra el modal de confirmación 
 * personalizado y maneja la redirección a la página de inicio.
 */

// --- 1. Definición de Elementos del DOM ---
const contactForm = document.getElementById('contacto-form');
const successModal = document.getElementById('success-modal');
const modalRedirectBtn = document.getElementById('modal-redirect-btn');

// NOTA: Ruta de redirección estática. Como contacto.html está en Maqueta/,
// y asumimos que index.html también lo está, la ruta simple funciona.
const REDIRECT_PATH = 'index.html'; 

// --- 2. Funciones de Interfaz (Modal y Redirección) ---

/**
 * Muestra el modal de confirmación de envío.
 */
function showSuccessModal() {
    if (successModal) {
        successModal.style.display = 'block';
        // Agregamos una clase para un posible efecto de animación (opcional)
        // successModal.classList.add('is-visible'); 
    }
}

/**
 * Redirige al usuario a la página de inicio.
 */
function handleRedirect() {
    window.location.href = REDIRECT_PATH;
}


// --- 3. Manejador de Eventos (Formulario) ---

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // Previene el envío por defecto para que JavaScript lo controle.
        event.preventDefault();

        // ----------------------------------------------------
        // ** (Aquí iría la LÓGICA DE VALIDACIÓN AVANZADA y AJAX) **
        // ----------------------------------------------------

        // Simulamos un envío exitoso para demostrar la funcionalidad del modal
        console.log('Formulario interceptado. Mostrando modal de éxito.');
        
        // 1. Mostrar el modal personalizado al usuario
        showSuccessModal();

        // 2. Opcional: Limpiar los campos del formulario
        contactForm.reset(); 
    });
}


// --- 4. Manejadores de Eventos del Modal ---

// Escucha el clic en el botón 'Aceptar y Continuar' del modal.
if (modalRedirectBtn) {
    modalRedirectBtn.addEventListener('click', handleRedirect);
}

// Escucha el clic en el fondo oscuro del modal (overlay) para cerrar y redirigir.
if (successModal) {
    successModal.addEventListener('click', function(event) {
        // Verifica si el clic ocurrió directamente sobre el fondo del modal (no el contenido)
        if (event.target === successModal) {
            handleRedirect();
        }
    });
}