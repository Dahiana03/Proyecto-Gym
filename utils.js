/* ===================================
   UTILIDADES GENERALES - GIMNASIO WEB
   =================================== */

// ===================================
// UTILIDADES DE DOM
// ===================================

const DOMUtils = {
    // Crear elemento con atributos y contenido
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (content && typeof content === 'string') {
            element.textContent = content;
        } else if (content && content.nodeType) {
            element.appendChild(content);
        }
        
        return element;
    },

    // Encontrar elemento por selector con manejo de errores
    findElement(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.error(`Error al buscar elemento: ${selector}`, error);
            return null;
        }
    },

    // Encontrar múltiples elementos
    findElements(selector, context = document) {
        try {
            return Array.from(context.querySelectorAll(selector));
        } catch (error) {
            console.error(`Error al buscar elementos: ${selector}`, error);
            return [];
        }
    },

    // Verificar si un elemento está visible
    isVisible(element) {
        if (!element) return false;
        
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0';
    },

    // Obtener dimensiones del elemento
    getElementBounds(element) {
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom
        };
    }
};

// ===================================
// UTILIDADES DE ANIMACIÓN
// ===================================

const AnimationUtils = {
    // Animar elemento con CSS
    animate(element, keyframes, options = {}) {
        if (!element || !element.animate) return null;
        
        const defaultOptions = {
            duration: 300,
            easing: 'ease',
            fill: 'both'
        };
        
        return element.animate(keyframes, { ...defaultOptions, ...options });
    },

    // Fade in
    fadeIn(element, duration = 300) {
        return this.animate(element, [
            { opacity: 0 },
            { opacity: 1 }
        ], { duration });
    },

    // Fade out
    fadeOut(element, duration = 300) {
        return this.animate(element, [
            { opacity: 1 },
            { opacity: 0 }
        ], { duration });
    },

    // Slide down
    slideDown(element, duration = 300) {
        const height = element.scrollHeight;
        return this.animate(element, [
            { height: '0px', overflow: 'hidden' },
            { height: `${height}px`, overflow: 'hidden' }
        ], { duration });
    },

    // Slide up
    slideUp(element, duration = 300) {
        return this.animate(element, [
            { height: `${element.scrollHeight}px`, overflow: 'hidden' },
            { height: '0px', overflow: 'hidden' }
        ], { duration });
    },

    // Bounce effect
    bounce(element, duration = 600) {
        return this.animate(element, [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-10px)', offset: 0.5 },
            { transform: 'translateY(0)' }
        ], { duration });
    }
};

// ===================================
// UTILIDADES DE EVENTOS
// ===================================

const EventUtils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Agregar evento con cleanup automático
    addEvent(element, event, handler, options = {}) {
        if (!element || !event || !handler) return null;
        
        element.addEventListener(event, handler, options);
        
        // Retornar función de cleanup
        return () => {
            element.removeEventListener(event, handler, options);
        };
    },

    // Delegar eventos
    delegate(parent, selector, event, handler) {
        return this.addEvent(parent, event, (e) => {
            if (e.target.matches(selector)) {
                handler(e);
            }
        });
    }
};

// ===================================
// UTILIDADES DE VALIDACIÓN
// ===================================

const ValidationUtils = {
    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validar teléfono
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    },

    // Validar que no esté vacío
    isNotEmpty(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    // Validar longitud mínima
    hasMinLength(value, minLength) {
        return value && value.length >= minLength;
    },

    // Validar rango numérico
    isInRange(value, min, max) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    }
};

// ===================================
// UTILIDADES DE FORMATO
// ===================================

const FormatUtils = {
    // Formatear moneda
    formatCurrency(amount, currency = 'COP') {
        try {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: currency
            }).format(amount);
        } catch (error) {
            return `$${amount.toLocaleString()}`;
        }
    },

    // Formatear fecha
    formatDate(date, options = {}) {
        try {
            const defaultOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            
            return new Intl.DateTimeFormat('es-CO', { 
                ...defaultOptions, 
                ...options 
            }).format(new Date(date));
        } catch (error) {
            return date.toString();
        }
    },

    // Truncar texto
    truncateText(text, maxLength, suffix = '...') {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + suffix;
    },

    // Capitalizar primera letra
    capitalize(text) {
        if (!text) return text;
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    // Formatear número de teléfono
    formatPhone(phone) {
        if (!phone) return phone;
        
        // Formato colombiano: +57 (XXX) XXX-XXXX
        const cleaned = phone.replace(/\D/g, '');
        
        if (cleaned.length === 10) {
            return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
        } else if (cleaned.length === 12 && cleaned.startsWith('57')) {
            return `+57 (${cleaned.substring(2, 5)}) ${cleaned.substring(5, 8)}-${cleaned.substring(8)}`;
        }
        
        return phone;
    }
};

// ===================================
// UTILIDADES DE ALMACENAMIENTO
// ===================================

const StorageUtils = {
    // Variables en memoria para simular almacenamiento
    memoryStorage: {},

    // Guardar en memoria
    setItem(key, value) {
        try {
            this.memoryStorage[key] = JSON.stringify(value);
            return true;
        } catch (error) {
            console.error('Error al guardar en memoria:', error);
            return false;
        }
    },

    // Obtener de memoria
    getItem(key) {
        try {
            const value = this.memoryStorage[key];
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error al leer de memoria:', error);
            return null;
        }
    },

    // Remover de memoria
    removeItem(key) {
        delete this.memoryStorage[key];
    },

    // Limpiar memoria
    clear() {
        this.memoryStorage = {};
    },

    // Obtener todas las keys
    keys() {
        return Object.keys(this.memoryStorage);
    }
};

// ===================================
// UTILIDADES DE RED
// ===================================

const NetworkUtils = {
    // Hacer petición HTTP
    async request(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Network request failed:', error);
            throw error;
        }
    },

    // GET request
    async get(url, headers = {}) {
        return this.request(url, { 
            method: 'GET', 
            headers 
        });
    },

    // POST request
    async post(url, data, headers = {}) {
        return this.request(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
    },

    // Verificar conexión a internet
    isOnline() {
        return navigator.onLine;
    }
};

// ===================================
// UTILIDADES DE DISPOSITIVO
// ===================================

const DeviceUtils = {
    // Detectar tipo de dispositivo
    getDeviceType() {
        const width = window.innerWidth;
        
        if (width < 480) return 'mobile';
        if (width < 768) return 'tablet';
        if (width < 1024) return 'laptop';
        return 'desktop';
    },

    // Detectar si es móvil
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth < 768;
    },

    // Detectar si es táctil
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Obtener información del navegador
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        
        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';
        
        return {
            browser,
            userAgent: ua,
            language: navigator.language,
            platform: navigator.platform
        };
    }
};

// ===================================
// UTILIDADES DE RENDIMIENTO
// ===================================

const PerformanceUtils = {
    // Medir tiempo de ejecución
    measureTime(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`⏱️ ${name} tomó ${(end - start).toFixed(2)}ms`);
        return result;
    },

    // Debounce para resize
    debouncedResize: null,
    
    initResizeHandler(callback, delay = 250) {
        this.debouncedResize = EventUtils.debounce(callback, delay);
        window.addEventListener('resize', this.debouncedResize);
    },

    // Cleanup del resize handler
    cleanupResizeHandler() {
        if (this.debouncedResize) {
            window.removeEventListener('resize', this.debouncedResize);
        }
    }
};

// ===================================
// EXPORTAR UTILIDADES
// ===================================

// Hacer disponibles globalmente
if (typeof window !== 'undefined') {
    window.GymUtils = {
        DOM: DOMUtils,
        Animation: AnimationUtils,
        Event: EventUtils,
        Validation: ValidationUtils,
        Format: FormatUtils,
        Storage: StorageUtils,
        Network: NetworkUtils,
        Device: DeviceUtils,
        Performance: PerformanceUtils
    };
}

// Para módulos ES6
// export { DOMUtils, AnimationUtils, EventUtils, ValidationUtils, FormatUtils, StorageUtils, NetworkUtils, DeviceUtils, PerformanceUtils };