/* ===================================
   GIMNASIO WEB - JAVASCRIPT PRINCIPAL
   =================================== */

// Estado global de la aplicación
let APP_STATE = {
    sectionsExpanded: {},
    isLoading: false,
    isMobile: false,
    currentFilter: ''
};

// ===================================
// INICIALIZACIÓN
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        APP_STATE.isLoading = true;
        
        // Inicializar iconos
        await initializeIcons();
        
        // Detectar dispositivo móvil
        detectMobile();
        
        // Renderizar secciones
        renderSections();
        
        // Renderizar características
        renderFeatures();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Configurar responsive
        setupResponsive();
        
        // Animaciones iniciales
        setTimeout(playInitialAnimations, 100);
        
        APP_STATE.isLoading = false;
        
        console.log('✅ Aplicación inicializada correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar la aplicación:', error);
        showErrorMessage('Error al cargar la aplicación');
    }
}

// ===================================
// RENDERIZADO DE COMPONENTES
// ===================================

function renderSections() {
    const grid = document.getElementById('sections-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    Object.values(window.GYM_DATA.sections).forEach(section => {
        const sectionElement = createSectionCard(section);
        grid.appendChild(sectionElement);
    });
}

function createSectionCard(section) {
    const card = document.createElement('div');
    card.className = 'section-card';
    card.setAttribute('data-section', section.id);
    
    card.innerHTML = `
        <div class="section-header ${section.color}" onclick="toggleSection('${section.id}')">
            <div class="section-title">
                <i data-lucide="${section.icon}"></i>
                <span>${section.title}</span>
            </div>
            <i data-lucide="chevron-right" class="chevron" id="chevron-${section.id}"></i>
        </div>
        <div class="section-content" id="content-${section.id}">
            <ul>
                ${section.pages.map(page => `
                    <li>
                        <div class="bullet ${section.color}"></div>
                        ${page}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    return card;
}

function renderFeatures() {
    const grid = document.getElementById('features-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    window.GYM_DATA.features.forEach(feature => {
        const featureElement = createFeatureCard(feature);
        grid.appendChild(featureElement);
    });
}

function createFeatureCard(feature) {
    const card = document.createElement('div');
    card.className = 'feature-item';
    
    card.innerHTML = `
        <h3 class="${feature.colorClass}">${feature.title}</h3>
        <ul>
            ${feature.features.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    return card;
}

// ===================================
// FUNCIONES PRINCIPALES DE TOGGLE
// ===================================

function toggleSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (!content || !chevron) {
        console.error(`Elementos no encontrados para la sección: ${sectionId}`);
        return;
    }
    
    const isExpanded = APP_STATE.sectionsExpanded[sectionId];
    
    if (isExpanded) {
        closeSection(sectionId);
    } else {
        openSection(sectionId);
    }
    
    // Actualizar estado
    APP_STATE.sectionsExpanded[sectionId] = !isExpanded;
}

function openSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (content && chevron) {
        content.classList.add('active');
        chevron.classList.add('rotated');
        
        // Animación de scroll suave
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 150);
        
        // Trigger evento personalizado
        dispatchCustomEvent('sectionOpened', { sectionId });
    }
}

function closeSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (content && chevron) {
        content.classList.remove('active');
        chevron.classList.remove('rotated');
        
        // Trigger evento personalizado
        dispatchCustomEvent('sectionClosed', { sectionId });
    }
}

// ===================================
// FUNCIONES UTILITARIAS
// ===================================

function openAllSections() {
    Object.keys(window.GYM_DATA.sections).forEach(sectionId => {
        openSection(sectionId);
        APP_STATE.sectionsExpanded[sectionId] = true;
    });
}

function closeAllSections() {
    Object.keys(window.GYM_DATA.sections).forEach(sectionId => {
        closeSection(sectionId);
        APP_STATE.sectionsExpanded[sectionId] = false;
    });
}

function scrollToSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

// ===================================
// ANIMACIONES
// ===================================

function playInitialAnimations() {
    const cards = document.querySelectorAll('.section-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * window.GYM_DATA.animations.delays.stagger);
    });
    
    // Animar header
    const header = document.querySelector('.header');
    if (header) {
        header.classList.add('fade-in-up');
    }
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Resize listener
    window.addEventListener('resize', handleResize);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Custom events
    document.addEventListener('sectionOpened', handleSectionOpened);
    document.addEventListener('sectionClosed', handleSectionClosed);
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

function handleResize() {
    detectMobile();
    setupResponsive();
}

function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + O: Abrir todas las secciones
    if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
        event.preventDefault();
        openAllSections();
    }
    
    // Ctrl/Cmd + C: Cerrar todas las secciones
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault();
        closeAllSections();
    }
    
    // Escape: Cerrar todas las secciones
    if (event.key === 'Escape') {
        closeAllSections();
    }
}

function handleSectionOpened(event) {
    console.log(`Sección abierta: ${event.detail.sectionId}`);
}

function handleSectionClosed(event) {
    console.log(`Sección cerrada: ${event.detail.sectionId}`);
}

// ===================================
// RESPONSIVE Y MÓVIL
// ===================================

function detectMobile() {
    APP_STATE.isMobile = window.innerWidth <= window.GYM_DATA.breakpoints.tablet;
}

function setupResponsive() {
    const grid = document.querySelector('.grid');
    const featuresGrid = document.querySelector('.features-grid');
    
    if (APP_STATE.isMobile) {
        if (grid) {
            grid.style.gridTemplateColumns = '1fr';
        }
        if (featuresGrid) {
            featuresGrid.style.gridTemplateColumns = '1fr';
        }
    } else {
        if (grid) {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        }
        if (featuresGrid) {
            featuresGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        }
    }
}

// ===================================
// ICONOS Y FALLBACKS
// ===================================

async function initializeIcons() {
    return new Promise((resolve) => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            resolve();
        } else {
            // Usar iconos de fallback
            setTimeout(() => {
                useFallbackIcons();
                resolve();
            }, 1000);
        }
    });
}

function useFallbackIcons() {
    const icons = document.querySelectorAll('[data-lucide]');
    icons.forEach(icon => {
        const iconName = icon.getAttribute('data-lucide');
        const fallback = window.GYM_DATA.iconFallbacks[iconName] || '•';
        icon.textContent = fallback;
        icon.style.fontSize = '16px';
    });
}

// ===================================
// FILTRADO Y BÚSQUEDA
// ===================================

function filterSections(searchText) {
    APP_STATE.currentFilter = searchText.toLowerCase();
    const sections = document.querySelectorAll('.section-card');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title span').textContent.toLowerCase();
        const content = section.querySelector('.section-content').textContent.toLowerCase();
        
        const matches = title.includes(APP_STATE.currentFilter) || 
                       content.includes(APP_STATE.currentFilter) ||
                       APP_STATE.currentFilter === '';
        
        if (matches) {
            section.style.display = 'block';
            section.classList.remove('hidden');
        } else {
            section.style.display = 'none';
            section.classList.add('hidden');
        }
    });
    
    // Dispatch evento de filtrado
    dispatchCustomEvent('sectionsFiltered', { 
        filter: searchText, 
        visibleCount: document.querySelectorAll('.section-card:not(.hidden)').length 
    });
}

function clearFilter() {
    APP_STATE.currentFilter = '';
    const sections = document.querySelectorAll('.section-card');
    
    sections.forEach(section => {
        section.style.display = 'block';
        section.classList.remove('hidden');
    });
}

// ===================================
// GESTIÓN DE ESTADO
// ===================================

function getSectionsState() {
    return {
        expanded: { ...APP_STATE.sectionsExpanded },
        filter: APP_STATE.currentFilter,
        timestamp: Date.now()
    };
}

function restoreSectionsState(state) {
    if (!state || !state.expanded) return;
    
    // Restaurar secciones expandidas
    Object.keys(state.expanded).forEach(sectionId => {
        if (state.expanded[sectionId]) {
            openSection(sectionId);
        } else {
            closeSection(sectionId);
        }
        APP_STATE.sectionsExpanded[sectionId] = state.expanded[sectionId];
    });
    
    // Restaurar filtro si existe
    if (state.filter) {
        filterSections(state.filter);
    }
}

function saveStateToMemory() {
    const state = getSectionsState();
    window.APP_SAVED_STATE = state;
    return state;
}

function loadStateFromMemory() {
    if (window.APP_SAVED_STATE) {
        restoreSectionsState(window.APP_SAVED_STATE);
        return true;
    }
    return false;
}

// ===================================
// EVENTOS PERSONALIZADOS
// ===================================

function dispatchCustomEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { 
        detail,
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(event);
}

// ===================================
// UTILIDADES DE UI
// ===================================

function showMessage(message, type = 'info', duration = 3000) {
    const messageElement = createMessageElement(message, type);
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, duration);
}

function createMessageElement(message, type) {
    const element = document.createElement('div');
    element.className = `message message-${type}`;
    element.textContent = message;
    
    // Estilos inline para el mensaje
    element.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    return element;
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showLoadingState(element) {
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoadingState(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

// ===================================
// DEBUGGING Y DESARROLLO
// ===================================

function debugInfo() {
    console.group('🏋️ GIMNASIO WEB - DEBUG INFO');
    console.log('Estado de la aplicación:', APP_STATE);
    console.log('Datos de secciones:', window.GYM_DATA?.sections);
    console.log('Secciones expandidas:', APP_STATE.sectionsExpanded);
    console.log('Filtro actual:', APP_STATE.currentFilter);
    console.log('Es móvil:', APP_STATE.isMobile);
    console.log('Dimensiones de ventana:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('Scroll Y:', window.scrollY);
    console.groupEnd();
}

function performanceInfo() {
    console.group('📊 PERFORMANCE INFO');
    console.log('Tiempo de carga:', performance.now().toFixed(2), 'ms');
    console.log('Elementos en DOM:', document.querySelectorAll('*').length);
    console.log('Secciones renderizadas:', document.querySelectorAll('.section-card').length);
    console.log('Memoria usada:', navigator.memory ? `${(navigator.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` : 'No disponible');
    console.groupEnd();
}

// ===================================
// API GLOBAL PARA DESARROLLADORES
// ===================================

window.GymWebsite = {
    // Funciones principales
    toggleSection,
    openSection,
    closeSection,
    openAllSections,
    closeAllSections,
    
    // Filtrado
    filterSections,
    clearFilter,
    
    // Estado
    getSectionsState,
    restoreSectionsState,
    saveStateToMemory,
    loadStateFromMemory,
    
    // Utilidades
    scrollToSection,
    showMessage,
    showErrorMessage,
    showSuccessMessage,
    
    // Debug
    debugInfo,
    performanceInfo,
    
    // Estado actual
    get state() {
        return { ...APP_STATE };
    },
    
    // Datos
    get data() {
        return window.GYM_DATA;
    }
};

// ===================================
// INICIALIZACIÓN DE CARACTERÍSTICAS AVANZADAS
// ===================================

// Agregar estilos de animación dinámicamente
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .message {
            animation: slideInRight 0.3s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar características avanzadas cuando la app esté lista
setTimeout(() => {
    addDynamicStyles();
    
    // Cargar estado previo si existe
    loadStateFromMemory();
    
    // Info de desarrollo en consola
    console.log('🏋️ Gimnasio Web Structure cargado correctamente');
    console.log('💡 Usa GymWebsite.debugInfo() para información de debug');
    console.log('🔧 Usa GymWebsite.openAllSections() para abrir todas las secciones');
}, 500);

