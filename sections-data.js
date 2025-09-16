/* ===================================
   DATOS DE SECCIONES - GIMNASIO WEB
   =================================== */

// Configuración de secciones principales

const SECTIONS_DATA = {
    home: {
        id: 'home',
        title: "Inicio",
        icon: "home",
        color: "bg-blue",
        pages: [
            "Hero con video del gimnasio",
            "Membresías destacadas",
            "Servicios principales", 
            "Productos más vendidos",
            "Testimonios de clientes",
            "Call-to-action para registro"
        ]
    },
    memberships: {
        id: 'memberships',
        title: "Membresías",
        icon: "users",
        color: "bg-green",
        pages: [
            "Planes y precios",
            "Comparativa de membresías",
            "Beneficios incluidos",
            "Registro online",
            "Área de miembros (login)"
        ]
    },
    services: {
        id: 'services',
        title: "Servicios",
        icon: "heart",
        color: "bg-purple",
        pages: [
            "Fisioterapia - Reserva de citas",
            "Nutrición - Planes personalizados",
            "Coach Personal - Entrenadores",
            "Evaluación física",
            "Clases grupales"
        ]
    },
    store: {
        id: 'store',
        title: "Tienda Online",
        icon: "shopping-cart",
        color: "bg-orange",
        pages: [
            "Suplementos por categoría",
            "Ropa deportiva (hombre/mujer)",
            "Accesorios de entrenamiento",
            "Carrito de compras",
            "Proceso de pago",
            "Cuenta del usuario",
            "Historial de pedidos"
        ]
    },
    facilities: {
        id: 'facilities',
        title: "Instalaciones",
        icon: "dumbbell",
        color: "bg-red",
        pages: [
            "Tour virtual 360°",
            "Galería de fotos",
            "Equipamiento disponible",
            "Horarios de funcionamiento",
            "Medidas de seguridad"
        ]
    },
    nutrition: {
        id: 'nutrition',
        title: "Nutrición",
        icon: "utensils-crossed",
        color: "bg-teal",
        pages: [
            "Consultas nutricionales",
            "Planes alimentarios",
            "Recetas saludables",
            "Calculadora de macros",
            "Blog de nutrición"
        ]
    },
    trainers: {
        id: 'trainers',
        title: "Entrenadores",
        icon: "user-check",
        color: "bg-indigo",
        pages: [
            "Perfiles de entrenadores",
            "Especialidades",
            "Reserva de sesiones",
            "Testimonios",
            "Certificaciones"
        ]
    },
    contact: {
        id: 'contact',
        title: "Contacto",
        icon: "phone",
        color: "bg-gray",
        pages: [
            "Información de contacto",
            "Ubicación y mapa",
            "Formulario de contacto",
            "Horarios de atención",
            "Redes sociales"
        ]
    },
    about: {
        id: 'about',
        title: "Nosotros",
        icon: "info",
        color: "bg-yellow",
        pages: [
            "Historia del gimnasio",
            "Misión y visión",
            "Equipo directivo",
            "Certificaciones",
            "Política de privacidad",
            "Términos y condiciones"
        ]
    }
};

// Características del sistema
const FEATURES_DATA = [
    {
        title: "💳 Ecommerce",
        colorClass: "text-green",
        features: [
            "Catálogo de productos con filtros",
            "Carrito persistente",
            "Múltiples métodos de pago",
            "Sistema de inventario"
        ]
    },
    {
        title: "📅 Reservas",
        colorClass: "text-blue",
        features: [
            "Calendario para citas",
            "Reserva de clases grupales",
            "Notificaciones automáticas",
            "Cancelaciones online"
        ]
    },
    {
        title: "👥 Gestión de Miembros",
        colorClass: "text-purple",
        features: [
            "Portal del miembro",
            "Seguimiento de progreso",
            "Renovaciones automáticas",
            "Comunicación directa"
        ]
    },
    {
        title: "📱 Experiencia Móvil",
        colorClass: "text-orange",
        features: [
            "Diseño responsive",
            "App móvil complementaria",
            "Pagos móviles",
            "Notificaciones push"
        ]
    }
];

// Configuración de iconos de fallback
const ICON_FALLBACKS = {
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

// Configuración de colores
const COLOR_SCHEMES = {
    primary: {
        blue: '#3b82f6',
        green: '#10b981',
        purple: '#8b5cf6',
        orange: '#f59e0b'
    },
    secondary: {
        red: '#ef4444',
        teal: '#14b8a6',
        indigo: '#6366f1',
        gray: '#6b7280',
        yellow: '#eab308'
    }
};

// Configuración de animaciones
const ANIMATION_CONFIG = {
    duration: {
        fast: 200,
        normal: 300,
        slow: 500
    },
    easing: {
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out'
    },
    delays: {
        stagger: 100,
        card: 50
    }
};

// Configuración responsive
const BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1200
};

// Mensajes del sistema
const MESSAGES = {
    loading: 'Cargando contenido...',
    error: 'Error al cargar el contenido',
    noResults: 'No se encontraron resultados',
    success: 'Operación completada exitosamente'
};

// Exportar datos para uso global
if (typeof window !== 'undefined') {
    window.GYM_DATA = {
        sections: SECTIONS_DATA,
        features: FEATURES_DATA,
        iconFallbacks: ICON_FALLBACKS,
        colors: COLOR_SCHEMES,
        animations: ANIMATION_CONFIG,
        breakpoints: BREAKPOINTS,
        messages: MESSAGES
    };
}

// Exportar para módulos ES6 si es necesario
// export { SECTIONS_DATA, FEATURES_DATA, ICON_FALLBACKS, COLOR_SCHEMES, ANIMATION_CONFIG, BREAKPOINTS, MESSAGES };


