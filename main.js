/* =========================================================
   ARYAN YADAV PORTFOLIO
   main.js
========================================================= */


/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

const contactForm = document.querySelector(".contact-form");

const sections = document.querySelectorAll("section");


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent =
            isOpen ? "✕" : "☰";

    });

}


/* =========================================================
   3. CLOSE MOBILE MENU AFTER CLICK
========================================================= */

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.textContent = "☰";

    });

});


/* =========================================================
   4. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!navLinks || !menuToggle) {
        return;
    }

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        navLinks.classList.contains("active")
    ) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.textContent = "☰";

    }

});


/* =========================================================
   5. NAVBAR SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(".header");


function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.style.background =
            "rgba(8, 8, 8, 0.95)";

    } else {

        header.style.background =
            "rgba(8, 8, 8, 0.75)";

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* Run once on page load */

updateHeader();


/* =========================================================
   6. ACTIVE NAVIGATION LINK
========================================================= */

const navItems =
    document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   7. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".stat-card, " +
        ".skill-category, " +
        ".project-card, " +
        ".education-card, " +
        ".certificate-card, " +
        ".contact-text, " +
        ".contact-form"
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";

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


revealElements.forEach((element) => {

    revealObserver.observe(element);

});




/* =========================================================
   9. SMOOTH SCROLL FALLBACK
========================================================= */

navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                !targetId.startsWith("#")
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

        }
    );

});


/* =========================================================
   10. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHeader();

        updateActiveNavigation();

    }
);