"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE NAVIGATION ================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const opened =
                mainNav.classList.toggle("active");

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

        mainNav.querySelectorAll("a")
            .forEach(link => {

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


    /* ================= ACTIVE NAVIGATION ================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document
        .querySelectorAll(".main-nav a")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const page =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();

            link.classList.remove("active");

            if (
                page === currentPage ||
                (
                    currentPage === "" &&
                    page === "index.html"
                )
            ) {
                link.classList.add("active");
            }
        });


    /* ================= CURRENT YEAR ================= */

    const year =
        new Date().getFullYear();

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent = year;
        });


    /* ================= SMOOTH SCROLL ================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#") return;

                const target =
                    document.querySelector(id);

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

                        if (!entry.isIntersecting)
                            return;

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(20px)";

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";
        });
    }


    /* ================= BACK TO TOP ================= */

    const backTop =
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
            backdropFilter: "blur(10px)"
        }
    );

    document.body.appendChild(backTop);


    window.addEventListener(
        "scroll",
        () => {

            backTop.style.display =
                window.scrollY > 500
                    ? "grid"
                    : "none";

            backTop.style.placeItems =
                "center";
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


    /* ================= EXTERNAL LINKS ================= */

    document
        .querySelectorAll('a[href^="http"]')
        .forEach(link => {

            const url =
                link.getAttribute("href");

            if (!url) return;

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


    /* ================= IMAGE ERROR ================= */

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
                        "Image unavailable";
                }
            );
        });


    /* ================= CONSOLE ================= */

    console.log(
        "%c MANOJ MEENA ",
        "color:#00d9ff;font-size:20px;font-weight:800;"
    );

    console.log(
        "%c MK GLOBAL NEXUS ",
        "color:#ffffff;font-size:13px;font-weight:700;"
    );

});
