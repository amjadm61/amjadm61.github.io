document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Mobile Menu Toggle
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const bars = hamburger.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
                bars[1].style.opacity = "0";
                bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => { bar.style.transform = "none"; bar.style.opacity = "1"; });
            });
        });
    }

    // ==========================================================================
    // 2. Scroll Reveal Animation
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 3. Smooth Scrolling
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // ==========================================================================
    // 4. Animated Counters
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
});

// ==========================================================================
// 5. Active Navigation State (Scroll Spy)
// ==========================================================================
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const headerOff = 120; // Offset for fixed header + breathing room

    // Check if we're at the bottom of the page
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        current = 'contact'; // Force contact active at bottom
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - headerOff)) {
                current = section.getAttribute('id');
            }
        });
    }

    navLi.forEach(a => {
        a.classList.remove('active');
        if (current && a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

    // ==========================================================================
    // 6. Logo Typewriter Effect
    // ==========================================================================
    const logoText = "AMJAD";
    const logoElement = document.querySelector('.typing-logo');
    const cursorElement = document.querySelector('.cursor');
    let logoIndex = 0;
    let isDeleting = false;
    let typeSpeed = 200;

    function typeLogo() {
        if (!logoElement) return;

        const currentText = logoText.substring(0, logoIndex);
        logoElement.textContent = currentText;

        // Dynamic typing speed
        typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && logoIndex < logoText.length) {
            // Typing
            logoIndex++;
            setTimeout(typeLogo, typeSpeed);
        } else if (isDeleting && logoIndex > 0) {
            // Deleting
            logoIndex--;
            setTimeout(typeLogo, typeSpeed);
        } else {
            // Pause at end or start
            isDeleting = !isDeleting;
            // Pause longer when word is full
            const pauseTime = !isDeleting ? 500 : 3000; 
            setTimeout(typeLogo, pauseTime);
        }
    }

    // Start typing
    typeLogo();
