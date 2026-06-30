// ================================
// FUNCIONALIDADES JAVASCRIPT
// ================================

// ========== MENU HAMBURGUESA ==========
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            hamburger.style.position = 'relative';
        });
    }

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            }
        });
    });
});

// ========== ANIMACIONES AL SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar tarjetas
document.querySelectorAll('.feature-card, .servicio-card, .paquete-card, .adicional-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ========== VALIDACIÓN DE FORMULARIO ==========
const formulario = document.getElementById('formularioContacto');

if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpiar mensajes previos
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error');
        });

        // Validar campos
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const empresa = document.getElementById('empresa');
        const servicio = document.getElementById('servicio');
        const mensaje = document.getElementById('mensaje');

        let isValid = true;

        // Validar nombre
        if (nombre.value.trim().length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        }

        // Validar email
        if (!validarEmail(email.value)) {
            mostrarError('email', 'Por favor ingresa un email válido');
            isValid = false;
        }

        // Validar teléfono
        if (telefono.value.trim().length < 10) {
            mostrarError('telefono', 'Por favor ingresa un teléfono válido');
            isValid = false;
        }

        // Validar empresa
        if (empresa.value.trim().length < 3) {
            mostrarError('empresa', 'Por favor ingresa el nombre de tu empresa');
            isValid = false;
        }

        // Validar servicio
        if (servicio.value === '') {
            mostrarError('servicio', 'Por favor selecciona un servicio');
            isValid = false;
        }

        // Validar mensaje
        if (mensaje.value.trim().length < 10) {
            mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }

        if (isValid) {
            enviarFormulario(nombre.value, email.value, telefono.value, empresa.value, servicio.value, mensaje.value);
        }
    });
}

function mostrarError(fieldId, mensaje) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById('error' + fieldId.charAt(0).toUpperCase() + fieldId.slice(1));
    
    field.parentElement.classList.add('error');
    if (errorElement) {
        errorElement.textContent = mensaje;
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function enviarFormulario(nombre, email, telefono, empresa, servicio, mensaje) {
    const formMessage = document.getElementById('formMessage');
    
    // Simular envío (en producción, esto iría a un backend)
    formMessage.textContent = 'Enviando cotización...';
    formMessage.style.color = '#00d4ff';
    
    // Crear el mensaje para WhatsApp
    const mensajeWhatsApp = `Hola FSG, soy ${nombre} de ${empresa}. Me interesa cotizar el servicio de ${servicio}. Mi teléfono es: ${telefono}. ${mensaje}`;
    
    // Esperar 1.5 segundos para simular envío
    setTimeout(() => {
        formMessage.classList.add('success');
        formMessage.textContent = '¡Cotización enviada exitosamente! Nos pondremos en contacto pronto.';
        
        // Limpiar formulario
        formulario.reset();
        
        // Redirigir a WhatsApp después de 2 segundos
        setTimeout(() => {
            const urlWhatsApp = `https://wa.me/7531397682?text=${encodeURIComponent(mensajeWhatsApp)}`;
            window.open(urlWhatsApp, '_blank');
        }, 2000);
    }, 1500);
}

// ========== EFECTO PARALLAX ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
    }
});

// ========== ANIMACIÓN DE NÚMEROS CONTADOR ==========
const contadorOptions = {
    threshold: 0.5
};

const contadorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const numero = stat.textContent;
                animarNumero(stat, numero);
            });
            contadorObserver.unobserve(entry.target);
        }
    });
}, contadorOptions);

const nosotrosSection = document.querySelector('.nosotros-stats');
if (nosotrosSection) {
    contadorObserver.observe(nosotrosSection);
}

function animarNumero(element, valorFinal) {
    let contador = 0;
    const incremento = parseInt(valorFinal) / 30;
    const intervalo = setInterval(() => {
        contador += incremento;
        if (contador >= parseInt(valorFinal)) {
            element.textContent = valorFinal;
            clearInterval(intervalo);
        } else {
            element.textContent = Math.floor(contador);
        }
    }, 30);
}

// ========== SMOOTH SCROLL MEJORADO ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== EFECTO RIPPLE EN BOTONES ==========
document.querySelectorAll('.btn, .feature-card, .servicio-card').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Estilos para el ripple
const style = document.createElement('style');
style.textContent = `
    .feature-card, .servicio-card, .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== DETECCIÓN DE NAVEGADOR Y OPTIMIZACIONES ==========
function detectarNavegador() {
    const ua = navigator.userAgent;
    
    if (/mobile|android|iphone|ipad|ipod/i.test(ua)) {
        document.body.classList.add('mobile');
        // Reducir animaciones en móvil para mejor performance
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationDuration = '2s';
        });
    }
}

detectarNavegador();

// ========== LAZY LOADING PARA IMÁGENES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== SERVICE WORKER PARA PWA ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Descomentar si se implementa service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ========== TRACKING Y ANALYTICS (Opcional) ==========
function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Rastrear clics en botones de contacto
document.querySelectorAll('a[href*="wa.me"], a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        const tipo = link.href.includes('wa.me') ? 'WhatsApp' : 'Teléfono';
        trackEvent('contact_click', { tipo: tipo });
    });
});

// ========== MEJORA DE PERFORMANCE ==========
// Defer non-critical CSS
const style_defer = document.createElement('link');
style_defer.rel = 'stylesheet';
style_defer.href = 'styles.css';
document.head.appendChild(style_defer);

// Preload de fuentes
const linkFonts = document.createElement('link');
linkFonts.rel = 'preconnect';
linkFonts.href = 'https://cdnjs.cloudflare.com';
document.head.appendChild(linkFonts);

// ========== INICIALIZACIÓN ==========
console.log('%c╔═══════════════════════════════════════════╗', 'color: #d4af37; font-weight: bold;');
console.log('%c║ FSG - Fuerza Mayor Privada de Seguridad  ║', 'color: #d4af37; font-weight: bold;');
console.log('%c║         Página Cargada Exitosamente      ║', 'color: #00d4ff; font-weight: bold;');
console.log('%c╚═══════════════════════════════════════════╝', 'color: #d4af37; font-weight: bold;');

// Mensaje en consola para desarrolladores
console.log('%c¿Preguntas? Contacta a: fsg.seguridad.mx@gmail.com', 'color: #d4af37; font-size: 14px;');