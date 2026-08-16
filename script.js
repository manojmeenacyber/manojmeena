"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        const closeMenu = () => {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        };


        const toggleMenu = () => {

            const isOpen =
                mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        };


        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleMenu();
            }
        );


        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();
                    }
                );
            });


        document.addEventListener(
            "click",
            event => {

                if (
                    mainNav.classList.contains("active") &&
                    !mainNav.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    closeMenu();
                }
            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 700) {
                    closeMenu();
                }
            }
        );
    }



    /* =====================================================
       ACTIVE NAVIGATION
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
        .querySelectorAll(".main-nav a")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;


            /*
             * Ignore external URLs
             */

            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:")
            ) {
                return;
            }


            const page =
                href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();


            link.classList.remove("active");


            if (page === currentPage) {

                link.classList.add("active");
            }

        });



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        new Date().getFullYear();


    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent = year;
        });



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute("href");


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(id);


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".card, .project-card, .contact-card, .mission"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        /*
                         * IMPORTANT:
                         * Directly reveal the element.
                         * This prevents the invisible-card bug.
                         */

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.10
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.opacity = "0";

                element.style.transform =
                    "translateY(20px)";


                element.style.transition =
                    `opacity .65s ease ${index * 40}ms,
                     transform .65s ease ${index * 40}ms`;


                observer.observe(element);
            }
        );


    } else {

        /*
         * Fallback for older browsers
         */

        revealElements.forEach(element => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        });

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    let backTop =
        document.getElementById("backToTop");


    /*
     * Prevent duplicate button
     * if script is loaded more than once.
     */

    if (!backTop) {

        backTop =
            document.createElement("button");


        backTop.type = "button";

        backTop.id = "backToTop";

        backTop.innerHTML = "↑";


        backTop.setAttribute(
            "aria-label",
            "Back to top"
        );


        Object.assign(
            backTop.style,
            {
                position: "fixed",

                right: "22px",

                bottom: "22px",

                width: "46px",

                height: "46px",

                borderRadius: "50%",

                border:
                    "1px solid rgba(0,217,255,.35)",

                background:
                    "rgba(5,15,30,.92)",

                color: "#00d9ff",

                fontSize: "20px",

                fontWeight: "800",

                cursor: "pointer",

                zIndex: "9999",

                display: "none",

                placeItems: "center",

                backdropFilter:
                    "blur(10px)",

                WebkitBackdropFilter:
                    "blur(10px)"
            }
        );


        document.body.appendChild(
            backTop
        );

    }



    const updateBackTop =
        () => {

            if (!backTop) return;


            backTop.style.display =
                window.scrollY > 500
                    ? "grid"
                    : "none";
        };


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    updateBackTop();


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        )
        .forEach(link => {

            const url =
                link.getAttribute("href");


            if (!url) return;


            try {

                const linkUrl =
                    new URL(
                        url,
                        window.location.href
                    );


                /*
                 * Open only genuinely external
                 * domains in a new tab.
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

                console.warn(
                    "Invalid URL:",
                    url
                );

            }

        });



    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "#0a1728";


                    image.style.minHeight =
                        "200px";


                    image.alt =
                        image.alt ||
                        "Image unavailable";

                }
            );

        });



    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC closes mobile navigation
             */

            if (
                event.key === "Escape" &&
                mainNav &&
                mainNav.classList.contains("active")
            ) {

                mainNav.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        }
    );



    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );



    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c MANOJ MEENA ",
        "color:#00d9ff;font-size:20px;font-weight:800;"
    );


    console.log(
        "%c MK GLOBAL NEXUS ",
        "color:#ffffff;font-size:13px;font-weight:700;"
    );


    console.log(
        "%c Cyber Intelligence • Digital Investigation • AI ",
        "color:#96a4b9;font-size:11px;"
    );

});
