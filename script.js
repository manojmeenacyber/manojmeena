"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE NAVIGATION
       ===================================================== */

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                navLinks.classList.toggle("active");

            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            hamburger.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close menu after clicking a link */

        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("active");

                    hamburger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    hamburger.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                });

            });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                !navLinks.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {

                navLinks.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                hamburger.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        /* Close mobile menu when pressing Escape */

        document.addEventListener("keydown", (event) => {

            if (event.key !== "Escape") {
                return;
            }

            navLinks.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

            hamburger.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    }


    /* =====================================================
       02. ACTIVE NAVIGATION
       ===================================================== */

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const currentPage =
        currentPath === ""
            ? "index.html"
            : currentPath;


    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }


            /*
             * Ignore external URLs and hash links.
             */

            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("#") ||
                href.startsWith("mailto:")
            ) {
                return;
            }


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();


            link.classList.remove("active");


            if (
                linkPage === currentPage ||
                (
                    currentPage === "index.html" &&
                    linkPage === ""
                )
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       03. CURRENT YEAR
       ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {

            element.textContent =
                currentYear;

        });


    /* =====================================================
       04. SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbar =
                    document.querySelector(".navbar");


                const offset =
                    navbar
                        ? navbar.offsetHeight + 15
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       05. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .future-card, .card, .project-card, .contact-card, .channel-card, .mission"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        /*
         * Only apply the hidden state when
         * IntersectionObserver is available.
         */

        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-hidden"
            );

        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.remove(
                            "reveal-hidden"
                        );


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.10,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /*
         * Fallback for older browsers.
         */

        revealElements.forEach((element) => {

            element.classList.remove(
                "reveal-hidden"
            );

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       06. BACK TO TOP
       ===================================================== */

    let backToTop =
        document.getElementById("backToTop");


    if (!backToTop) {

        backToTop =
            document.createElement("button");

        backToTop.type =
            "button";

        backToTop.id =
            "backToTop";

        backToTop.innerHTML =
            "↑";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(
            backToTop
        );

    }


    const updateBackToTop =
        () => {

            if (
                window.scrollY > 500
            ) {

                backToTop.style.display =
                    "grid";

            } else {

                backToTop.style.display =
                    "none";

            }

        };


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    updateBackToTop();


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       07. EXTERNAL LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href^="http"]')
        .forEach((link) => {

            const href =
                link.getAttribute("href");


            if (!href) {
                return;
            }


            /*
             * Open external links safely.
             */

            try {

                const linkUrl =
                    new URL(
                        href,
                        window.location.href
                    );


                if (
                    linkUrl.hostname !==
                    window.location.hostname
                ) {

                    link.setAttribute(
                        "target",
                        "_blank"
                    );

                    link.setAttribute(
                        "rel",
                        "noopener noreferrer"
                    );

                }

            } catch (error) {

                /*
                 * Ignore malformed URLs.
                 */

            }

        });


    /* =====================================================
       08. IMAGE ERROR HANDLING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                    image.setAttribute(
                        "alt",
                        "Image unavailable"
                    );

                }
            );

        });


    /* =====================================================
       09. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    const updateNavbar =
        () => {

            if (!navbar) {
                return;
            }


            if (window.scrollY > 20) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =====================================================
       10. PREVENT EMPTY # LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       11. PAGE LOAD
       ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );


    /* =====================================================
       12. CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c MANOJ MEENA ",
        [
            "color:#00d9ff",
            "font-size:20px",
            "font-weight:900",
            "letter-spacing:2px"
        ].join(";")
    );


    console.log(
        "%c MK GLOBAL NEXUS ",
        [
            "color:#ffffff",
            "font-size:13px",
            "font-weight:800",
            "letter-spacing:1px"
        ].join(";")
    );


    console.log(
        "%c Cyber Intelligence • Digital Investigations ",
        [
            "color:#8fa8bf",
            "font-size:11px"
        ].join(";")
    );

});
