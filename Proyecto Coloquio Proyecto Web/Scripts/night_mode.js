// script.js (Versión Inteligente para Múltiples Niveles)

// 1. Definir constantes clave
const toggleButton = document.getElementById('theme-toggle');
const storageKey = 'userTheme'; // Clave para localStorage
const lightModeCSSId = 'light-mode-style'; // ID único para el enlace CSS
// NOTA: lightModeCSSPath HA SIDO ELIMINADA DE AQUÍ

// Función para determinar la ruta CSS correcta basada en la URL actual
function getCorrectPath() {
    // Si la URL contiene '/productos/', asumimos que está en el 2º nivel de anidación.
    if (window.location.pathname.includes('/productos/')) {
        return '../../Estilos/light-mode.css';
    }
    // Para todas las demás páginas (index.html, nosotros.html, etc.), asumimos 1er nivel.
    return '../Estilos/light-mode.css';
}

// 2. Función para aplicar el tema (APLICAMOS LA RUTA DINÁMICA AQUÍ)
function applyTheme(theme) {
    let linkElement = document.getElementById(lightModeCSSId);
    
    // Obtener la ruta dinámica
    const currentPath = getCorrectPath(); 

    if (theme === 'light') {
        // Si no existe el enlace CSS, crearlo y añadirlo
        if (!linkElement) {
            linkElement = document.createElement('link');
            linkElement.id = lightModeCSSId;
            linkElement.rel = 'stylesheet';
            // ¡Usamos la ruta dinámica!
            linkElement.href = currentPath; 
            document.head.appendChild(linkElement);
        }
        if (toggleButton) {
            toggleButton.textContent = 'Cambiar a Modo Noche';
        }
    } else {
        // Si existe el enlace CSS (Modo Día), lo eliminamos para volver a Noche
        if (linkElement) {
            linkElement.remove();
        }
        if (toggleButton) {
            toggleButton.textContent = 'Cambiar a Modo Día';
        }
    }
}

// 3. Lógica de Carga Inicial (al cargar la página)
function loadInitialTheme() {
    // NOTA IMPORTANTE: Si usaste el fragmento de JavaScript en el <head> 
    // para evitar el parpadeo, esta función ya no es necesaria y deberías eliminarla
    // del DOMContentLoaded para evitar conflictos.

    let savedTheme = localStorage.getItem(storageKey);

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (prefersLight) {
            applyTheme('light');
        } 
    }
}

// 4. Manejador de Eventos (Al hacer clic en el botón)
function toggleTheme() {
    const isCurrentlyLight = !!document.getElementById(lightModeCSSId);
    
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    applyTheme(newTheme);

    localStorage.setItem(storageKey, newTheme);
}

// --- Ejecución ---
// Aseguramos que la carga inicial ocurra
document.addEventListener('DOMContentLoaded', loadInitialTheme);

// Asignamos el evento click
if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
}
