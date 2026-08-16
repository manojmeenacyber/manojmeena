"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MANOJ MEENA — PERSONAL BRAND WEBSITE
       Main JavaScript
       ===================================================== */

    /* ================= MOBILE NAVIGATION ================= */

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {

        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open navigation menu");

        hamburger.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("active");

            hamburger.classList.toggle("active", isOpen);

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

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                hamburger.classList.remove("active");

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

        /* Close when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                !navLinks.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {

                navLinks.classList.remove("active");
                hamburger.classList.remove("active");

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

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    if (navLinks) {

        navLinks.querySelectorAll("a").forEach((link) => {

            const href = link.getAttribute("href");

            if (!href) return;

            const cleanHref =
                href.split("#")[0]
                    .split("?")[0]
                    .split("/")
                    .pop()
                    .toLowerCase() || "index.html";

            link.classList.remove("active");

            if (cleanHref === currentPath) {
                link.classList.add("active");
            }

        });

    }


    /* ================= CURRENT YEAR ================= */

    const currentYear =
        new Date().getFullYear();

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {

            element.textContent = currentYear;

        });


    /* ================= SMOOTH SCROLL ================= */

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

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".card, " +
            ".project-card, " +
            ".channel-card, " +
            ".contact-card, " +
            ".future-card, " +
            ".mission, " +
            ".expertise-card, " +
            ".roadmap-item"
        );

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.createElement("button");

    backToTop.type = "button";
    backToTop.id = "backToTop";
    backToTop.innerHTML = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(backToTop);


    const updateBackToTop =
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        };


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* ================= EXTERNAL LINKS ================= */

    document
        .querySelectorAll('a[href^="http"]')
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            try {

                const url =
                    new URL(href);

                if (
                    url.hostname !==
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
                    href
                );

            }

        });


    /* ================= IMAGE FALLBACK ================= */

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


    /* ================= KEYBOARD ESCAPE ================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navLinks &&
                hamburger
            ) {

                navLinks.classList.remove("active");
                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* ================= PAGE READY ================= */

    document.body.classList.add("page-loaded");


    /* ================= BRAND CONSOLE ================= */

    console.log(
        "%c MANOJ MEENA ",
        "color:#00d9ff;font-size:20px;font-weight:800;"
    );

    console.log(
        "%c Founder & CEO — MK Global Nexus ",
        "color:#ffffff;font-size:13px;font-weight:700;"
    );

    console.log(
        "%c Cyber Intelligence • Digital Investigations ",
        "color:#00d9ff;font-size:12px;"
    );

});
