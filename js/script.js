// ====== MANOJ MEENA V2 — COMPLETE PREMIUM ======

document.addEventListener('DOMContentLoaded', function () {

    // ---------- DARK MODE TOGGLE ----------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (themeToggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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

    // ---------- STATS COUNTER ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target')) || 0;
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.floor(progress * target);
                    stat.textContent = value + (stat.getAttribute('data-suffix') || '');
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + (stat.getAttribute('data-suffix') || '');
                    }
                }
                requestAnimationFrame(updateCounter);
            });
        }
    }

    if (statNumbers.length) {
        window.addEventListener('scroll', animateStats);
        window.addEventListener('load', animateStats);
        setTimeout(animateStats, 500);
    }

    // ---------- SCROLL ANIMATIONS ----------
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ---------- PROJECT FILTERS ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length && projectItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                projectItems.forEach(item => {
                    if (filter === 'all' || item.dataset.status === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    }
                });
            });
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
            formResponse.textContent = '✅ Thank you, ' + name + '! Your message has been sent. I will get back to you soon.';
            contactForm.reset();

            setTimeout(() => {
                formResponse.className = '';
                formResponse.textContent = '';
            }, 5000);
        });
    }

    // ---------- SEARCH ----------
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            const query = this.value.toLowerCase().trim();
            const items = document.querySelectorAll('.search-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
    }

    // ---------- LANGUAGE TOGGLE ----------
    const langBtns = document.querySelectorAll('.lang-btn');
    if (langBtns.length) {
        langBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                langBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const lang = this.dataset.lang;
                document.querySelectorAll('[data-lang]').forEach(el => {
                    el.style.display = el.dataset.lang === lang ? 'block' : 'none';
                });
            });
        });
    }

    // ---------- WHATSAPP CLICK ----------
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            const phone = this.dataset.phone || '919999999999';
            const message = encodeURIComponent('Hello Manoj, I want to connect with you.');
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    }

    console.log('🚀 Manoj Meena V2 — Premium Website Loaded');
});
