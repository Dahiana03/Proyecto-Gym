// ===================================
// ESTRUCTURA WEB GIMNASIO - JAVASCRIPT
// ===================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Función principal de inicialización
function initializeWebsite() {
    // Inicializar los iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Agregar event listeners
    setupEventListeners();
    
    // Configuración inicial
    setupInitialState();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listeners para las secciones expandibles
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            toggleSection(sectionId);
        });
    });
    
    // Event listener para scroll suave
    document.addEventListener('scroll', handleScroll);
    
    // Event listener para responsive
    window.addEventListener('resize', handleResize);
}

// Configuración inicial
function setupInitialState() {
    // Cerrar todas las secciones por defecto
    closeAllSections();
    
    // Configurar animaciones iniciales
    setupAnimations();
}

// ===================================
// FUNCIONES PRINCIPALES
// ===================================

// Función para alternar secciones
function toggleSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (!content || !chevron) {
        console.error(`Elementos no encontrados para la sección: ${sectionId}`);
        return;
    }
    
    if (content.classList.contains('active')) {
        // Cerrar sección
        closeSection(sectionId);
    } else {
        // Abrir sección
        openSection(sectionId);
    }
    
    // Animación suave
    animateToggle(content, chevron);
}

// Abrir una sección específica
function openSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (content && chevron) {
        content.classList.add('active');
        chevron.classList.add('rotated');
        
        // Scroll suave hacia la sección si está fuera de vista
        scrollToSection(sectionId);
    }
}

// Cerrar una sección específica
function closeSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (content && chevron) {
        content.classList.remove('active');
        chevron.classList.remove('rotated');
    }
}

// Cerrar todas las secciones
function closeAllSections() {
    const sections = ['home', 'memberships', 'services', 'store', 'facilities', 'nutrition', 'trainers', 'contact', 'about'];
    
    sections.forEach(sectionId => {
        closeSection(sectionId);
    });
}

// Abrir todas las secciones
function openAllSections() {
    const sections = ['home', 'memberships', 'services', 'store', 'facilities', 'nutrition', 'trainers', 'contact', 'about'];
    
    sections.forEach(sectionId => {
        openSection(sectionId);
    });
}

// ===================================
// FUNCIONES DE ANIMACIÓN
// ===================================

// Configurar animaciones
function setupAnimations() {
    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.section-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Animar el toggle de secciones
function animateToggle(content, chevron) {
    if (content.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        setTimeout(() => {
            content.style.maxHeight = 'none';
        }, 300);
    } else {
        content.style.maxHeight = '0';
    }
}

// ===================================
// FUNCIONES DE UTILIDAD
// ===================================

// Scroll suave hacia una sección
function scrollToSection(sectionId) {
    const section = document.getElementById(`content-${sectionId}`).closest('.section-card');
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

// Manejar el scroll
function handleScroll() {
    // Agregar clase cuando se hace scroll
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Manejar cambios de tamaño de ventana
function handleResize() {
    // Reajustar layouts en dispositivos móviles
    if (window.innerWidth < 768) {
        // Lógica específica para móvil
        handleMobileLayout();
    } else {
        // Lógica específica para desktop
        handleDesktopLayout();
    }
}

// Layout para móviles
function handleMobileLayout() {
    const grid = document.querySelector('.grid');
    if (grid) {
        grid.style.gridTemplateColumns = '1fr';
    }
}

// Layout para desktop
function handleDesktopLayout() {
    const grid = document.querySelector('.grid');
    if (grid) {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
    }
}

// ===================================
// FUNCIONES ADICIONALES
// ===================================

// Filtrar secciones por texto
function filterSections(searchText) {
    const sections = document.querySelectorAll('.section-card');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title span').textContent.toLowerCase();
        const content = section.querySelector('.section-content').textContent.toLowerCase();
        
        if (title.includes(searchText.toLowerCase()) || content.includes(searchText.toLowerCase())) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Obtener estado de todas las secciones
function getSectionsState() {
    const sections = ['home', 'memberships', 'services', 'store', 'facilities', 'nutrition', 'trainers', 'contact', 'about'];
    const state = {};
    
    sections.forEach(sectionId => {
        const content = document.getElementById(`content-${sectionId}`);
        state[sectionId] = content ? content.classList.contains('active') : false;
    });
    
    return state;
}

// Restaurar estado de las secciones
function restoreSectionsState(state) {
    Object.keys(state).forEach(sectionId => {
        if (state[sectionId]) {
            openSection(sectionId);
        } else {
            closeSection(sectionId);
        }
    });
}

// ===================================
// FUNCIONES DE DEBUGGING
// ===================================

// Función para debugging - mostrar información de la página
function debugInfo() {
    console.log('=== ESTRUCTURA WEB GIMNASIO - DEBUG ===');
    console.log('Estado de secciones:', getSectionsState());
    console.log('Ancho de ventana:', window.innerWidth);
    console.log('Alto de ventana:', window.innerHeight);
    console.log('Scroll Y:', window.scrollY);
    console.log('=====================================');
}

// ===================================
// EXPORTAR FUNCIONES PRINCIPALES
// ===================================

// Si estás usando módulos ES6, puedes exportar las funciones
// export { toggleSection, openSection, closeSection, openAllSections, closeAllSections, filterSections };

// Para uso global (sin módulos)
window.gymWebsite = {
    toggleSection: toggleSection,
    openSection: openSection,
    closeSection: closeSection,
    openAllSections: openAllSections,
    closeAllSections: closeAllSections,
    filterSections: filterSections,
    getSectionsState: getSectionsState,
    restoreSectionsState: restoreSectionsState,
    debugInfo: debugInfo
};

// ===================================
// INICIALIZACIÓN ALTERNATIVA
// ===================================

// Si Lucide no está disponible, usar iconos alternativos
function fallbackIcons() {
    const icons = document.querySelectorAll('[data-lucide]');
    icons.forEach(icon => {
        const iconName = icon.getAttribute('data-lucide');
        icon.textContent = getIconFallback(iconName);
    });
}

// Iconos de fallback en caso de que Lucide no cargue
function getIconFallback(iconName) {
    const iconMap = {
        'home': '🏠',
        'users': '👥',
        'heart': '❤️',
        'shopping-cart': '🛒',
        'dumbbell': '🏋️',
        'utensils-crossed': '🍽️',
        'user-check': '✅',
        'phone': '📞',
        'info': 'ℹ️',
        'chevron-right': '▶️',
        'chevron-down': '🔽'
    };
    
    return iconMap[iconName] || '•';
}

// Verificar si Lucide está cargado, si no, usar fallback
setTimeout(() => {
    if (typeof lucide === 'undefined') {
        console.warn('Lucide icons no disponibles, usando iconos de fallback');
        fallbackIcons();
    }
}, 1000);