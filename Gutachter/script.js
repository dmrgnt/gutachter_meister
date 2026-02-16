// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Kontaktformular (StaticForms oder Formspree)
// Ersetze 'https://api.staticforms.xyz/submit' mit deinem Form‑Endpoint
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitText = document.getElementById('submit-text');
    const loadingText = document.getElementById('loading-text');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Loading State
    submitText.style.display = 'none';
    loadingText.style.display = 'inline';
    submitBtn.disabled = true;
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('https://api.staticforms.xyz/submit', {
            method: 'POST',
            body: formData,
        });
        
        if (response.ok) {
            alert('Vielen Dank! Ihre Nachricht wurde versendet. Wir melden uns innerhalb von 24 Stunden.');
            e.target.reset();
        } else {
            alert('Fehler beim Versenden. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
        }
    } catch (error) {
        alert('Fehler beim Versenden. Bitte rufen Sie uns direkt an.');
    } finally {
        // Reset Button
        submitText.style.display = 'inline';
        loadingText.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Smooth Scroll für interne Links
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

// Intersection Observer für Animationen
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe alle animierbaren Elemente
document.querySelectorAll('.service-card, .about-text, .contact-form').forEach(el => {
    observer.observe(el);
});
