"use strict";

/*
=========================================================
MANOJ MEENA — OFFICIAL PERSONAL WEBSITE
FINAL JAVASCRIPT
MK GLOBAL NEXUS
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENT REFERENCES
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    const navLinks =
        document.querySelector(".nav-links") ||
        document.querySelector(".main-nav");

    const hamburger =
        document.getElementById("hamburger") ||
        document.querySelector(".hamburger") ||
        document.querySelector(".menu-toggle");


    /* =====================================================
       02. MOBILE NAVIGATION
    ===================================================== */

    if (hamburger && navLinks) {

        const setMenuState = (open) => {

            navLinks.classList.toggle("active", open);

            /*
             * Support both navigation systems:
             * active / open
             */
            navLinks.classList.toggle("open", open);

            hamburger.setAttribute(
                "aria-expanded",
                String(open)
            );

            hamburger.setAttribute(
                "aria-label",
                open
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            /*
             * Accessibility
             */
            hamburger.setAttribute(
                "aria-controls",
                navLinks.id || "main-navigation"
            );

        };


        /*
         * Give navigation an ID if it does not already have one.
         */
        if (!navLinks.id) {
            navLinks.id = "main-navigation";
        }


        /*
         * Open / close menu
         */
        hamburger.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                const isOpen =
                    navLinks.classList.contains("active") ||
                    navLinks.classList.contains("open");

                setMenuState(!isOpen);

            }
        );


        /*
         * Close after navigation link click
         */
        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        setMenuState(false);

                    }
                );

            });


        /*
         * Close when clicking outside
         */
        document.addEventListener(
            "click",
            (event) => {

                const clickedInsideMenu =
                    navLinks.contains(event.target);

                const clickedButton =
                    hamburger.contains(event.target);

                if (
                    !clickedInsideMenu &&
                    !clickedButton
                ) {

                    setMenuState(false);

                }

            }
        );


        /*
         * Close with Escape
         */
        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key !== "Escape") {
                    return;
                }

                setMenuState(false);

            }
        );


        /*
         * Close menu when resizing to desktop
         */
        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 900) {

                    setMenuState(false);

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       03. ACTIVE NAVIGATION
    ===================================================== */

    const normalizePage = (value) => {

        if (!value) {
            return "index.html";
        }

        let page = value
            .split("?")[0]
            .split("#")[0]
            .split("/")
            .pop()
            .toLowerCase();

        if (!page) {
            page = "index.html";
        }

        return page;

    };


    const currentPage =
        normalizePage(
            window.location.pathname
        );


    /*
     * Support both:
     *
     * .nav-links a
     * .main-nav a
     */
    document
        .querySelectorAll(
            ".nav-links a, .main-nav a"
        )
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }


            /*
             * Ignore external URLs
             */
            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("//") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("#") ||
                href.startsWith("javascript:")
            ) {

                return;

            }


            const linkPage =
                normalizePage(href);


            link.classList.remove(
                "active"
            );


            if (
                linkPage === currentPage ||
                (
                    currentPage === "index.html" &&
                    (
                        linkPage === "" ||
                        linkPage === "index"
                    )
                )
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


    /* =====================================================
       04. CURRENT YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach((element) => {

            element.textContent =
                currentYear;

        });


    /* =====================================================
       05. SMOOTH INTERNAL SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    let target = null;


                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        15;


                    window.scrollTo({

                        top:
                            Math.max(
                                0,
                                targetPosition
                            ),

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       06. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            [
                ".reveal",
                ".future-card",
                ".card",
                ".project-card",
                ".contact-card",
                ".channel-card",
                ".mission",
                ".roadmap-item"
            ].join(", ")
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {


        /*
         * IMPORTANT:
         *
         * Add .reveal first.
         * The CSS already defines:
         *
         * .reveal.reveal-hidden
         * .reveal.visible
         *
         * This prevents cards from remaining hidden.
         */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                element.classList.add(
                    "reveal-hidden"
                );

            }
        );


        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const element =
                                entry.target;


                            element.classList.remove(
                                "reveal-hidden"
                            );


                            element.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
         * Fallback
         */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                element.classList.remove(
                    "reveal-hidden"
                );

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       07. BACK TO TOP
    ===================================================== */

    let backToTop =
        document.getElementById(
            "backToTop"
        );


    /*
     * Create button automatically
     * if HTML does not contain one.
     */

    if (!backToTop) {

        backToTop =
            document.createElement(
                "button"
            );

        backToTop.type =
            "button";

        backToTop.id =
            "backToTop";

        backToTop.innerHTML =
            '<i class="fas fa-arrow-up" aria-hidden="true"></i>';

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
                window.scrollY > 450
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
       08. EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        )
        .forEach((link) => {

            const href =
                link.getAttribute("href");


            if (!href) {
                return;
            }


            try {

                const linkUrl =
                    new URL(
                        href,
                        window.location.href
                    );


                /*
                 * Only modify genuinely external links.
                 */

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
                 * Invalid URL:
                 * leave untouched.
                 */

            }

        });


    /* =====================================================
       09. IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    /*
                     * Prevent infinite error loop
                     */
                    if (
                        image.dataset.errorHandled ===
                        "true"
                    ) {
                        return;
                    }


                    image.dataset.errorHandled =
                        "true";


                    image.classList.add(
                        "image-error"
                    );


                    image.setAttribute(
                        "alt",
                        "Image unavailable"
                    );

                },
                {
                    once: true
                }
            );

        });


    /* =====================================================
       10. NAVBAR SCROLL EFFECT
    ===================================================== */

    const updateNavbar =
        () => {

            if (!navbar) {
                return;
            }


            if (
                window.scrollY > 20
            ) {

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
       11. PREVENT EMPTY # LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       12. KEYBOARD ACCESSIBILITY
    ===================================================== */

    document
        .querySelectorAll(
            "a, button, input, textarea, select"
        )
        .forEach((element) => {

            element.addEventListener(
                "keydown",
                (event) => {

                    /*
                     * Enter / Space behaviour
                     * is normally handled natively.
                     *
                     * This block intentionally does
                     * not override native behaviour.
                     */

                    if (
                        event.key === "Tab"
                    ) {

                        element.classList.add(
                            "keyboard-focus"
                        );

                    }

                }
            );

        });


    /* =====================================================
       13. PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );


    document.body.classList.add(
        "page-ready"
    );


    /* =====================================================
       14. CONSOLE BRANDING
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
