// ====== MANOJ MEENA V2 — OPTIMIZED ======

document.addEventListener('DOMContentLoaded', function () {

    // ---------- DARK MODE ----------
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);

        themeToggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
        });
    }

    function updateIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    navbar.classList.toggle('scrolled', window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
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

    // ---------- STATS COUNTER (Optimized) ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated || !statNumbers.length) return;
        
        const section = document.querySelector('.stats-section');
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target')) || 0;
                const suffix = stat.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = Math.ceil(target / 40);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + suffix;
                }, 30);
            });
        }
    }

    // Use Intersection Observer for stats
    if (statNumbers.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) statsObserver.observe(statsSection);
    }

    // ---------- SCROLL ANIMATIONS (Optimized) ----------
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');
    
    if (animateElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
        
        animateElements.forEach(el => observer.observe(el));
    }

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
                    } else {
                        item.style.display = 'none';
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
            formResponse.textContent = '✅ Thank you, ' + name + '! Your message has been sent.';
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
        let searchTimeout;
        searchInput.addEventListener('keyup', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.toLowerCase().trim();
                document.querySelectorAll('.search-item').forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
                });
            }, 200);
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

    console.log('✅ Manoj Meena — Website Loaded Successfully');
});
