// ===== MENU MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menu al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ===== FORMULARIO COTIZACION EMAILJS =====

emailjs.init("WWQv87faFmuqx5lwO");

const form = document.getElementById('cotizacion-form');

form.addEventListener('submit', function(e) {

    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    emailjs.sendForm(
        'service_jirwvmd',
        'template_uv80ep6',
        this
    )

    .then(() => {

        alert('¡Cotización enviada correctamente!');

        form.reset();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

    })

    .catch((error) => {

        console.log('ERROR EMAILJS:', error);

        alert('Hubo un error al enviar la cotización.');

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

    });

});
// ===== SMOOTH SCROLL PARA ANCLAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--blanco)';
        header.style.backdropFilter = 'none';
    }
});

// ===== ANIMACIONES SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

/* ===== SLIDER HERO ===== */

const heroImages = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.png"
];

let currentImage = 0;

const heroSlider = document.getElementById("hero-slider");

setInterval(() => {

    heroSlider.style.opacity = 0;

    setTimeout(() => {

        currentImage++;

        if (currentImage >= heroImages.length) {
            currentImage = 0;
        }

        heroSlider.src = heroImages[currentImage];

        heroSlider.style.opacity = 1;

    }, 400);

}, 5000);

// Observar elementos
document.querySelectorAll('.servicio-card, .info-card, .cotizacion-form').forEach(el => {
    observer.observe(el);
});

// ===== COUNTER ANIMACION (Stats Hero) =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (target === 98 ? '%' : '') + (target === 500 ? '+' : '') + (target === 24 ? 'hs' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 98 ? '%' : '') + (target === 500 ? '+' : '') + (target === 24 ? 'hs' : '');
            }
        };
        
        updateCounter();
    });
}

// Activar counters al entrar en viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

statsObserver.observe(document.querySelector('.hero-stats'));

// ===== VALIDACION FORMULARIO AVANZADA =====
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = 'var(--gris-claro2)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--azul-principal)';
    });
});

