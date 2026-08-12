
// ====== JS/SCRIPT.JS ======

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ====== PROJECT FILTERS ======
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length && projectItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                projectItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const status = item.dataset.status;
                        if (status === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // ====== CONTACT FORM ======
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formResponse.style.display = 'block';
                formResponse.style.background = '#fde8e8';
                formResponse.style.color = '#c0392b';
                formResponse.textContent = 'Please fill in all required fields.';
                return;
            }

            // Simulate form submission
            formResponse.style.display = 'block';
            formResponse.style.background = '#e8f5e9';
            formResponse.style.color = '#2e7d32';
            formResponse.textContent = '✅ Thank you, ' + name + '! Your message has been sent. I will get back to you soon.';

            // Reset form
            contactForm.reset();

            // Hide response after 5 seconds
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 5000);
        });
    }

    // ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ====== ACTIVE NAV LINK HIGHLIGHT ======
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLink = document.querySelectorAll('.nav-links a');
    navLink.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
