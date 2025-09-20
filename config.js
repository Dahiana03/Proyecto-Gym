/* ===================================
   CONFIGURACIÓN GENERAL - GIMNASIO WEB
   =================================== */

// ===================================
// CONFIGURACIÓN PRINCIPAL
// ===================================

const APP_CONFIG = {
    // Información de la aplicación
    app: {
        name: 'Gimnasio Web Structure',
        version: '1.0.0',
        author: 'Claude AI',
        description: 'Estructura web completa para gimnasio con tienda online'
    },

    // URLs y endpoints (para futuro uso)
    api: {
        baseUrl: 'https://api.tugimnasio.com',
        version: 'v1',
        endpoints: {
            auth: '/auth',
            members: '/members',
            products: '/products',
            bookings: '/bookings',
            payments: '/payments'
        }
    },

    // Configuración de la interfaz
    ui: {
        theme: 'default',
        language: 'es',
        currency: 'COP',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h'
    },

    // Configuración de animaciones
    animations: {
        enabled: true,
        duration: {
            fast: 150,
            normal: 300,
            slow: 500,
            verySlow: 1000
        },
        easing: {
            default: 'ease',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        },
        delays: {
            stagger: 100,
            card: 50,
            element: 25
        }
    },

    // Configuración responsive
    breakpoints: {
        xs: 0,
        sm: 480,
        md: 768,
        lg: 1024,
        xl: 1200,
        xxl: 1400
    },

    // Configuración de colores
    colors: {
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a'
        },
        success: {
            500: '#10b981',
            600: '#059669'
        },
        warning: {
            500: '#f59e0b',
            600: '#d97706'
        },
        error: {
            500: '#ef4444',
            600: '#dc2626'
        },
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827'
        }
    }
};

// ===================================
// CONFIGURACIÓN DE SECCIONES
// ===================================

const SECTIONS_CONFIG = {
    // Configuración de comportamiento de secciones
    behavior: {
        autoClose: false,          // Cerrar otras secciones al abrir una
        persistState: true,        // Recordar estado de secciones
        animateOnOpen: true,       // Animar al abrir
        scrollOnOpen: true,        // Hacer scroll al abrir
        highlightOnHover: true     // Resaltar al hacer hover
    },

    // Límites y restricciones
    limits: {
        maxOpenSections: 0,        // 0 = sin límite
        minOpenSections: 0         // Mínimo de secciones abiertas
    },

    // Configuración de filtros
    filters: {
        caseSensitive: false,
        fuzzySearch: true,
        searchDelay: 300
    }
};

// ===================================
// CONFIGURACIÓN DE CARACTERÍSTICAS
// ===================================

const FEATURES_CONFIG = {
    // Funcionalidades habilitadas
    enabled: {
        darkMode: false,
        animations: true,
        sounds: false,
        notifications: false,
        analytics: false,
        search: true,
        export: false,
        print: false
    },

    // Configuración de búsqueda
    search: {
        placeholder: 'Buscar secciones...',
        minCharacters: 2,
        maxResults: 50,
        highlightResults: true
    },

    // Configuración de exportación
    export: {
        formats: ['json', 'pdf', 'html'],
        includeData: true,
        includeImages: false
    }
};

// ===================================
// CONFIGURACIÓN DE MENSAJES
// ===================================

const MESSAGES_CONFIG = {
    // Mensajes del sistema
    system: {
        loading: 'Cargando contenido...',
        error: 'Ha ocurrido un error',
        success: 'Operación completada exitosamente',
        warning: 'Atención requerida',
        info: 'Información',
        noResults: 'No se encontraron resultados',
        networkError: 'Error de conexión',
        serverError: 'Error del servidor'
    },

    // Mensajes específicos de secciones
    sections: {
        opened: 'Sección abierta',
        closed: 'Sección cerrada',
        allOpened: 'Todas las secciones abiertas',
        allClosed: 'Todas las secciones cerradas',
        filtered: 'Secciones filtradas'
    },

    // Mensajes de validación
    validation: {
        required: 'Este campo es obligatorio',
        invalidEmail: 'Email inválido',
        invalidPhone: 'Teléfono inválido',
        tooShort: 'Muy corto',
        tooLong: 'Muy largo'
    }
};

// ===================================
// CONFIGURACIÓN DE DESARROLLO
// ===================================

const DEV_CONFIG = {
    // Configuración de debugging
    debug: {
        enabled: false,
        level: 'info', // 'error', 'warn', 'info', 'debug'
        showPerformance: false,
        showEvents: false,
        logToConsole: true
    },

    // Configuración de testing
    testing: {
        enabled: false,
        mockData: false,
        showTestIds: false
    },

    // Configuración de herramientas de desarrollo
    tools: {
        showGrid: false,
        showBoundaries: false,
        enableKeyboardShortcuts: true,
        showTooltips: false
    }
};

// ===================================
// CONFIGURACIÓN DE ACCESIBILIDAD
// ===================================

const ACCESSIBILITY_CONFIG = {
    // Configuración ARIA
    aria: {
        announcements: true,
        liveRegion: true,
        describedBy: true,
        labelledBy: true
    },

    // Configuración de teclado
    keyboard: {
        enableShortcuts: true,
        trapFocus: true,
        skipLinks: true,
        shortcuts: {
            openAll: 'Ctrl+O',
            closeAll: 'Ctrl+C',
            search: 'Ctrl+F',
            help: 'F1',
            escape: 'Escape'
        }
    },

    // Configuración de contraste
    contrast: {
        checkContrast: true,
        minRatio: 4.5,
        enhanceOnRequest: true
    },

    // Configuración de movimiento
    motion: {
        respectPreferences: true,
        reducedMotionFallback: true,
        allowOverride: true
    }
};

// ===================================
// CONFIGURACIÓN DE PERFORMANCE
// ===================================

const PERFORMANCE_CONFIG = {
    // Configuración de carga lazy
    lazyLoading: {
        enabled: true,
        threshold: 0.1,
        rootMargin: '50px'
    },

    // Configuración de cache
    cache: {
        enabled: true,
        duration: 3600000, // 1 hora en ms
        maxSize: 100,
        strategy: 'memory'
    },

    // Configuración de optimización
    optimization: {
        debounceResize: 250,
        throttleScroll: 16,
        batchDOMUpdates: true,
        virtualScrolling: false
    },

    // Límites de performance
    limits: {
        maxAnimationDuration: 1000,
        maxElementsToAnimate: 50,
        maxConcurrentRequests: 5
    }
};

// ===================================
// CONFIGURACIÓN DE INTEGRACIÓN
// ===================================

const INTEGRATION_CONFIG = {
    // APIs externas
    external: {
        googleAnalytics: {
            enabled: false,
            trackingId: ''
        },
        googleMaps: {
            enabled: false,
            apiKey: ''
        },
        payment: {
            enabled: false,
            provider: 'stripe',
            publicKey: ''
        }
    },

    // Servicios de terceros
    services: {
        emailService: {
            enabled: false,
            provider: 'emailjs',
            serviceId: '',
            templateId: ''
        },
        chatbot: {
            enabled: false,
            provider: 'custom'
        }
    }
};

// ===================================
// CONFIGURACIÓN DE DATOS MOCK
// ===================================

const MOCK_DATA_CONFIG = {
    // Configuración de datos de prueba
    enabled: false,
    
    // Datos de usuario mock
    mockUser: {
        id: 1,
        name: 'Usuario Demo',
        email: 'demo@gimnasio.com',
        membershipType: 'premium',
        joinDate: '2024-01-01'
    },

    // Datos de productos mock
    mockProducts: [
        {
            id: 1,
            name: 'Proteína Whey',
            category: 'suplementos',
            price: 89900,
            inStock: true
        },
        {
            id: 2,
            name: 'Camiseta Deportiva',
            category: 'ropa',
            price: 45000,
            inStock: true
        }
    ],

    // Horarios mock
    mockSchedule: {
        opening: '05:00',
        closing: '22:00',
        days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    }
};

// ===================================
// CONFIGURACIÓN DE LOCALIZACIÓN
// ===================================

const LOCALIZATION_CONFIG = {
    // Idiomas soportados
    supportedLanguages: ['es', 'en'],
    defaultLanguage: 'es',
    fallbackLanguage: 'es',

    // Configuración regional
    region: {
        country: 'CO',
        timezone: 'America/Bogota',
        currency: 'COP',
        phoneFormat: '+57 XXX XXX XXXX'
    },

    // Formatos de fecha y hora
    formats: {
        date: {
            short: 'DD/MM/YYYY',
            long: 'DD de MMMM de YYYY',
            time: 'HH:mm',
            datetime: 'DD/MM/YYYY HH:mm'
        }
    }
};

// ===================================
// CONFIGURACIÓN DE VALIDACIÓN
// ===================================

const VALIDATION_CONFIG = {
    // Reglas de validación
    rules: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[(]?[\d\s\-\(\)]{10,}$/,
        name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    },

    // Mensajes de error personalizados
    messages: {
        required: 'Este campo es obligatorio',
        email: 'Ingrese un email válido',
        phone: 'Ingrese un teléfono válido',
        name: 'Ingrese un nombre válido',
        password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
    },

    // Configuración de validación en tiempo real
    realTime: {
        enabled: true,
        delay: 500,
        showSuccess: true,
        showErrors: true
    }
};

// ===================================
// UTILIDADES DE CONFIGURACIÓN
// ===================================

const ConfigUtils = {
    // Obtener configuración anidada
    get(path, defaultValue = null) {
        const keys = path.split('.');
        let current = window.GYM_CONFIG;

        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }

        return current;
    },

    // Establecer configuración anidada
    set(path, value) {
        const keys = path.split('.');
        let current = window.GYM_CONFIG;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;
    },

    // Obtener breakpoint actual
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        const breakpoints = this.get('app.breakpoints', {});

        if (width >= breakpoints.xxl) return 'xxl';
        if (width >= breakpoints.xl) return 'xl';
        if (width >= breakpoints.lg) return 'lg';
        if (width >= breakpoints.md) return 'md';
        if (width >= breakpoints.sm) return 'sm';
        return 'xs';
    },

    // Verificar si una característica está habilitada
    isFeatureEnabled(feature) {
        return this.get(`features.enabled.${feature}`, false);
    },

    // Obtener color del tema
    getColor(colorPath) {
        return this.get(`colors.${colorPath}`, '#000000');
    },

    // Obtener duración de animación
    getAnimationDuration(type = 'normal') {
        return this.get(`animations.duration.${type}`, 300);
    }
};

// ===================================
// COMBINACIÓN DE TODAS LAS CONFIGURACIONES
// ===================================

const COMBINED_CONFIG = {
    app: APP_CONFIG,
    sections: SECTIONS_CONFIG,
    features: FEATURES_CONFIG,
    messages: MESSAGES_CONFIG,
    dev: DEV_CONFIG,
    accessibility: ACCESSIBILITY_CONFIG,
    performance: PERFORMANCE_CONFIG,
    integration: INTEGRATION_CONFIG,
    mockData: MOCK_DATA_CONFIG,
    localization: LOCALIZATION_CONFIG,
    validation: VALIDATION_CONFIG,
    utils: ConfigUtils
};

// ===================================
// EXPORTAR CONFIGURACIÓN
// ===================================

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.GYM_CONFIG = COMBINED_CONFIG;
    
    // También exponer utilidades directamente
    window.ConfigUtils = ConfigUtils;
}

// Para módulos ES6
// export { APP_CONFIG, SECTIONS_CONFIG, FEATURES_CONFIG, MESSAGES_CONFIG, DEV_CONFIG, ACCESSIBILITY_CONFIG, PERFORMANCE_CONFIG, INTEGRATION_CONFIG, MOCK_DATA_CONFIG, LOCALIZATION_CONFIG, VALIDATION_CONFIG, ConfigUtils };

// ===================================
// LOG DE CONFIGURACIÓN CARGADA
// ===================================

console.log('⚙️ Configuración del Gimnasio Web cargada');
console.log(`📱 Breakpoint actual: ${ConfigUtils.getCurrentBreakpoint()}`);
console.log(`🎨 Tema: ${APP_CONFIG.ui.theme}`);
console.log(`🌍 Idioma: ${APP_CONFIG.ui.language}`);

if (DEV_CONFIG.debug.enabled) {
    console.group('🔧 Configuración Debug');
    console.log('Configuración completa:', COMBINED_CONFIG);
    console.groupEnd();
}