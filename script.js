"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MANOJ MEENA — PERSONAL BRAND WEBSITE
       Global JavaScript
    ===================================================== */


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle") ||
        document.querySelector(".hamburger");

    const mainNav =
        document.querySelector(".main-nav") ||
        document.querySelector(".nav-links");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const opened =
                mainNav.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                opened
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(opened)
            );

            menuToggle.setAttribute(
                "aria-label",
                opened
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        /* Close after clicking a navigation link */

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });


        /* Close when clicking outside */

        document.addEventListener("click", event => {

            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a, .nav-links a"
        );


    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();


        link.classList.remove("active");


        if (
            linkPage === currentPath ||
            (
                currentPath === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent =
                currentYear;

        });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

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


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .expertise-card,
            .presence-card,
            .future-card,
            .project-card,
            .channel-card,
            .contact-card,
            .mission,
            .identity-grid,
            .nexus-box,
            .roadmap-item,
            .future-cta
            `
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(24px)";

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    let backTop =
        document.getElementById("backToTop");


    if (!backTop) {

        backTop =
            document.createElement("button");

        backTop.type = "button";

        backTop.id = "backToTop";

        backTop.innerHTML =
            '<i class="fas fa-arrow-up"></i>';

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
                    "rgba(4,12,25,.94)",
                color: "#00d9ff",
                fontSize: "16px",
                cursor: "pointer",
                zIndex: "9999",
                display: "none",
                placeItems: "center",
                backdropFilter: "blur(12px)",
                boxShadow:
                    "0 10px 30px rgba(0,0,0,.35)"
            }
        );


        document.body.appendChild(backTop);

    }


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                backTop.style.display =
                    "grid";

            } else {

                backTop.style.display =
                    "none";

            }

        },
        {
            passive: true
        }
    );


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
        .querySelectorAll('a[href^="http"]')
        .forEach(link => {

            const url =
                link.getAttribute("href");

            if (!url) {
                return;
            }


            try {

                const linkURL =
                    new URL(
                        url,
                        window.location.href
                    );


                if (
                    linkURL.hostname !==
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
                    "Invalid external URL:",
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

                    image.classList.add(
                        "image-error"
                    );

                    image.alt =
                        "Image unavailable";

                }
            );

        });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    if (navbar) {

        const updateNavbar =
            () => {

                if (
                    window.scrollY > 30
                ) {

                    navbar.classList.add(
                        "scrolled"
                    );

                } else {

                    navbar.classList.remove(
                        "scrolled"
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

    }


    /* =====================================================
       HERO PARALLAX — VERY LIGHT
    ===================================================== */

    const heroProfile =
        document.querySelector(
            ".hero-profile"
        );


    if (
        heroProfile &&
        window.matchMedia(
            "(min-width: 901px)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (scroll < 700) {

                    heroProfile.style.transform =
                        `translateY(${scroll * 0.04}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       ACCESSIBILITY — KEYBOARD MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mainNav &&
                menuToggle
            ) {

                mainNav.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.focus();

            }

        }
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
        "%c Cyber Intelligence • Digital Investigations ",
        "color:#7dd3fc;font-size:12px;"
    );

});
