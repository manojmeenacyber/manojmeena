// ====== MANOJ MEENA — SCRIPT (FIXED) ======

document.addEventListener('DOMContentLoaded', function () {

    // ---------- DARK MODE TOGGLE ----------
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);

        // Toggle on click
        themeToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
            
            console.log('Theme changed to:', newTheme); // Debug
        });
    }

    function updateIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                icon.style.color = '#f1c40f';
            } else {
                icon.className = 'fas fa-moon';
                icon.style.color = '#ffffff';
            }
        }
    }

    // ---------- HAMBURGER ----------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- NAVBAR SCROLL ----------
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ---------- BACK TO TOP ----------
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('show', window.scrollY > 400);
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- WHATSAPP ----------
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const phone = this.dataset.phone || '919999999999';
            const message = encodeURIComponent('Hello Manoj, I want to connect with you.');
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    }

    // ---------- CONTACT FORM ----------
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                formResponse.className = 'form-error';
                formResponse.textContent = '⚠️ Please fill in all required fields.';
                return;
            }

            formResponse.className = 'form-success';
            formResponse.textContent = '✅ Thank you, ' + name + '! Your message has been sent.';
            contactForm.reset();

            setTimeout(() => {
                formResponse.className = '';
                formResponse.textContent = '';
            }, 5000);
        });
    }

    console.log('✅ Manoj Meena Website Loaded Successfully');
});
