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
    threshold: 0.15, // El elemento debe estar 15% visible para que se anime
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target); // Deja de observar una vez animado
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
        e.preventDefault(); // Evita que la página salte hacia arriba al hacer clic
        
        const miEmail = "nataliarolonleal@gmail.com";
        
        // API moderna para copiar al portapapeles
        navigator.clipboard.writeText(miEmail).then(() => {
            // Guardamos el contenido original del botón
            const originalHTML = emailBtn.innerHTML;
            
            // Cambiamos el texto e icono para dar confirmación visual
            emailBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            emailBtn.style.color = 'var(--primary-pink)'; // Le da tu toque rosa de confirmación
            
            // Restauramos el botón después de 2 segundos
            setTimeout(() => {
                emailBtn.innerHTML = originalHTML;
                emailBtn.style.color = ''; // Devuelve el color original
            }, 2000);
            
        }).catch(err => {
            console.error('Error al copiar el correo: ', err);
            alert("No se pudo copiar el correo automáticamente.");
        });
    });
}