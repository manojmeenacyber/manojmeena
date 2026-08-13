// ====== MANOJ MEENA — COMPLETE SCRIPT ======

document.addEventListener('DOMContentLoaded', function () {

    // ---------- DARK MODE TOGGLE ----------
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);

        // Toggle
        themeToggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
        });
    }

    function updateIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
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

    console.log('✅ Manoj Meena Website Loaded');
});
