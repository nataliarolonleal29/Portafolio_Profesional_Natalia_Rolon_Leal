// 1. Manejo de desplazamiento suave (smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Cerrar el menú móvil si se hace clic en un enlace
            const navMenu = document.getElementById('nav-menu');
            if(navMenu.classList.contains('active')){
                navMenu.classList.remove('active');
            }
        }
    });
});

// 2. Menú Hamburguesa para móviles
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 3. Animaciones al hacer Scroll (Fade-In Observer)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 4. Copiar Email al portapapeles
const emailBtn = document.getElementById('email-btn');

if (emailBtn) {
    emailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const miEmail = "nataliarolonleal@gmail.com";
        
        navigator.clipboard.writeText(miEmail).then(() => {
            const originalHTML = emailBtn.innerHTML;
            
            emailBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            emailBtn.style.color = 'var(--primary-pink)';
            
            setTimeout(() => {
                emailBtn.innerHTML = originalHTML;
                emailBtn.style.color = '';
            }, 2000);
            
        }).catch(err => {
            console.error('Error al copiar el correo: ', err);
            alert("No se pudo copiar el correo automáticamente.");
        });
    });
}

// 5. Traducción Dinámica Español / Inglés
const langBtn = document.getElementById('lang-btn');
let currentLang = 'es';

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';

        document.querySelectorAll('[data-es]').forEach(el => {
            if (currentLang === 'en') {
                el.innerHTML = el.getAttribute('data-en');
            } else {
                el.innerHTML = el.getAttribute('data-es');
            }
        });
    });
}