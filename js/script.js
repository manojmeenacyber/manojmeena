/* =========================================================
   MK GLOBAL NEXUS
   MANOJ MEENA
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   01. DOM READY
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
                mainNav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });


        /* Close menu when a navigation link is clicked */

        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove(
                        "active"
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


        /* Close menu when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mainNav.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    mainNav.classList.remove(
                        "active"
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

    }



    /* =====================================================
       02. ACTIVE NAVIGATION LINK
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navigationLinks =
        document.querySelectorAll(".main-nav a");


    navigationLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });



    /* =====================================================
       03. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".expertise-card, " +
            ".project-card, " +
            ".intelligence-grid article, " +
            ".mission-card, " +
            ".contact-item"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

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
                    "translateY(20px)";

                element.style.transition =
                    "opacity 0.6s ease, " +
                    "transform 0.6s ease";


                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       04. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formStatus =
        document.getElementById(
            "formStatus"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();


                const email =
                    document.getElementById(
                        "email"
                    )?.value.trim();


                const subject =
                    document.getElementById(
                        "subject"
                    )?.value.trim();


                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please complete all fields.";

                    }

                    return;

                }


                /* Basic email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please enter a valid email address.";

                    }

                    return;

                }


                /*
                    Static website:
                    Open user's email application
                    with a pre-filled message.
                */

                const destination =
                    "manojmeenacyber@gmail.com";


                const mailSubject =
                    encodeURIComponent(
                        subject
                    );


                const mailBody =
                    encodeURIComponent(

                        "Name: " +
                        name +
                        "\n\n" +

                        "Email: " +
                        email +
                        "\n\n" +

                        "Message:\n" +
                        message

                    );


                const mailtoURL =
                    "mailto:" +
                    destination +
                    "?subject=" +
                    mailSubject +
                    "&body=" +
                    mailBody;


                if (formStatus) {

                    formStatus.textContent =
                        "Opening your email application...";

                }


                window.location.href =
                    mailtoURL;

            }
        );

    }



    /* =====================================================
       05. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        function (element) {

            element.textContent =
                new Date().getFullYear();

        }
    );



    /* =====================================================
       06. IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    /*
                        Keep broken images from
                        destroying the layout.
                    */

                    image.style.opacity =
                        "0.25";

                    image.alt =
                        "Image unavailable";

                }
            );

        }
    );



    /* =====================================================
       07. ESC KEY
       Close mobile navigation
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mainNav
            ) {

                mainNav.classList.remove(
                    "active"
                );


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
       08. HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 20
                ) {

                    header.style.boxShadow =
                        "0 10px 40px rgba(0,0,0,0.18)";

                } else {

                    header.style.boxShadow =
                        "none";

                }

            },
            {
                passive: true
            }
        );

    }



    /* =====================================================
       09. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior: "smooth",
                                block: "start"
                            }
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       10. CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c MK GLOBAL NEXUS ",
        "background:#00d9ff;" +
        "color:#03111b;" +
        "font-weight:900;" +
        "padding:6px 12px;" +
        "border-radius:5px;"
    );


    console.log(
        "%c Manoj Meena | Cyber Intelligence & Technology ",
        "color:#00d9ff;" +
        "font-weight:700;"
    );


    console.log(
        "Professional website initialized."
    );

});
