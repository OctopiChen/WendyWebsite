document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add some delay/smoothness to outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effect
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--gold-color)';
        });
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial manual setup for animation classes if AOS isn't used or as fallback
    // Since we didn't include AOS library script, we'll write a simple custom one
    const animatedElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .section-title, .about-content');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        // Add delay based on index or manually set data-delay
        const delay = el.getAttribute('data-aos-delay') || 0;
        el.style.transitionDelay = `${delay}ms`;

        observer.observe(el);
    });

    // Helper for custom intersection observation logic
    const handleScrollAnimation = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const scrollObserver = new IntersectionObserver(handleScrollAnimation, observerOptions);
    animatedElements.forEach(el => scrollObserver.observe(el));

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 51, 102, 0.98)';
            navbar.style.padding = '1rem 2rem';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(0, 51, 102, 0.95)';
            navbar.style.padding = '1.5rem 2rem';
            navbar.style.boxShadow = 'none';
        }
    });

    // Typing Effect for Hero Title (Simple version)
    const title = document.querySelector('.hero-text h1');
    const text = title.textContent;
    title.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            title.classList.add('highlight-glow'); // Add specific glow after typing
        }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // Image Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');

    // Select images inside project placeholders
    const projectImages = document.querySelectorAll('.project-img-placeholder img');

    projectImages.forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            // Disable body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal
    const span = document.getElementsByClassName('close-modal')[0];

    span.onclick = function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scroll
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

});
