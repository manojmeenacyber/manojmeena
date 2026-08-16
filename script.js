/* =========================================================
   MANOJ MEENA — WEBSITE JAVASCRIPT
   MK GLOBAL NEXUS
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileNavigation();

    initActiveNavigation();

    initCurrentYear();

    initSmoothScrolling();

    initScrollReveal();

    initExternalLinks();

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", () => {

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

    });


    /* Close menu after clicking a link */

    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

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


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(".main-nav a");


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const linkPage =
            href.split("/")
                .pop()
                .toLowerCase();


        link.classList.remove("active");


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

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        new Date().getFullYear();


    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent = year;

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

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

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".card, .project-card, .contact-card, .media-card, .section-header"
        );


    if (!elements.length) {
        return;
    }


    /* Initial state */

    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    /* Intersection Observer */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    } else {

        /* Fallback */

        elements.forEach(element => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        });

    }

}


/* =========================================================
   EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    links.forEach(link => {

        const url =
            link.getAttribute("href");


        if (!url) {
            return;
        }


        /* Do not modify same-site links */

        if (
            url.includes(
                window.location.hostname
            )
        ) {
            return;
        }


        link.setAttribute(
            "target",
            "_blank"
        );


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function createBackToTopButton() {

    const button =
        document.createElement("button");


    button.type = "button";

    button.id = "backToTop";

    button.setAttribute(
        "aria-label",
        "Back to top"
    );


    button.innerHTML = "↑";


    Object.assign(
        button.style,
        {
            position: "fixed",
            right: "22px",
            bottom: "22px",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "1px solid rgba(0,217,255,.35)",
            background: "rgba(5,15,30,.9)",
            color: "#00d9ff",
            fontSize: "20px",
            fontWeight: "800",
            cursor: "pointer",
            zIndex: "999",
            display: "none",
            backdropFilter: "blur(10px)"
        }
    );


    document.body.appendChild(button);


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.style.display =
                    "block";

            } else {

                button.style.display =
                    "none";

            }

        },
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


createBackToTopButton();


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.background =
                    "#0a1728";

                image.style.minHeight =
                    "200px";

                image.alt =
                    "Image unavailable";

            }
        );

    });


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%c MANOJ MEENA ",
    "color:#00d9ff;font-size:20px;font-weight:800;"
);

console.log(
    "%c MK GLOBAL NEXUS ",
    "color:#ffffff;font-size:13px;font-weight:700;"
);

console.log(
    "%c Cyber Intelligence • Digital Investigation • AI • Technology ",
    "color:#8fa1b8;font-size:11px;"
);
