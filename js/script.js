/* =========================================================
   MANOJ MEENA — PERSONAL WEBSITE V2
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            /* Change hamburger icon */

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        });


        /* Close menu after clicking a link */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!mainNav || !menuToggle) {
                return;
            }


            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                mainNav.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim() || "";


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim() || "";


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim() || "";


                /* -----------------------------------------
                   Validation
                ----------------------------------------- */

                if (!name) {

                    showFormMessage(
                        "Please enter your name."
                    );

                    return;

                }


                if (!email) {

                    showFormMessage(
                        "Please enter your email address."
                    );

                    return;

                }


                if (!isValidEmail(email)) {

                    showFormMessage(
                        "Please enter a valid email address."
                    );

                    return;

                }


                if (!message) {

                    showFormMessage(
                        "Please enter your message."
                    );

                    return;

                }


                /* -----------------------------------------
                   Prepare email
                ----------------------------------------- */

                const subject =
                    encodeURIComponent(
                        "Website enquiry from " + name
                    );


                const body =
                    encodeURIComponent(

                        "Hello Manoj Meena,\n\n" +

                        "Name: " +
                        name +
                        "\n" +

                        "Email: " +
                        email +
                        "\n\n" +

                        "Message:\n" +
                        message +
                        "\n\n" +

                        "Sent from Manoj Meena official website."

                    );


                const mailtoLink =
                    "mailto:manojmeenacyber@gmail.com" +
                    "?subject=" +
                    subject +
                    "&body=" +
                    body;


                showFormMessage(
                    "Opening your email application..."
                );


                /* -----------------------------------------
                   Open email client
                ----------------------------------------- */

                window.location.href =
                    mailtoLink;


                /* -----------------------------------------
                   Reset form
                ----------------------------------------- */

                setTimeout(
                    function () {

                        contactForm.reset();

                    },
                    1000
                );

            }
        );

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }


    /* =====================================================
       FORM STATUS MESSAGE
    ===================================================== */

    function showFormMessage(message) {

        if (!formStatus) {
            return;
        }


        formStatus.textContent =
            message;


        formStatus.style.opacity =
            "1";


        setTimeout(
            function () {

                formStatus.style.opacity =
                    "0";

            },
            6000
        );

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 30) {

                    header.style.boxShadow =
                        "0 10px 35px rgba(0,0,0,0.25)";

                } else {

                    header.style.boxShadow =
                        "none";

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a[href^='#']"
        );


    if (
        sections.length &&
        navigationLinks.length
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                navigationLinks
                                    .forEach(
                                        function (link) {

                                            link.classList
                                                .remove(
                                                    "active"
                                                );

                                        }
                                    );


                                const activeLink =
                                    document.querySelector(
                                        '.main-nav a[href="#' +
                                        entry.target.id +
                                        '"]'
                                    );


                                if (activeLink) {

                                    activeLink.classList
                                        .add(
                                            "active"
                                        );

                                }

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );


        sections.forEach(
            function (section) {

                observer.observe(section);

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".expertise-card, " +
            ".project-card, " +
            ".intelligence-grid article, " +
            ".media-card, " +
            ".mission-card"
        );


    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(18px)";

                element.style.transition =
                    "opacity 0.6s ease, transform 0.6s ease";


                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        function (element) {

            element.textContent =
                currentYear;

        }
    );


    /* =====================================================
       ESCAPE KEY — CLOSE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                if (mainNav) {

                    mainNav.classList.remove(
                        "open"
                    );

                }


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%cMANOJ MEENA",
        "font-size:22px;font-weight:bold;color:#c8a45d;"
    );

    console.log(
        "%cMK GLOBAL NEXUS",
        "font-size:14px;color:#ffffff;"
    );

    console.log(
        "%cCyber Intelligence • Digital Investigations • AI & Cyber Security",
        "font-size:12px;color:#9da4ad;"
    );

});
