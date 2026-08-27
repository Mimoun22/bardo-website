// ========================================
// BARDO - Production Agency Website
// JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-item, .service-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });

    // Navigation scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const isHero = this.getAttribute('href') === '#hero';
                const offset = isHero ? 0 : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const animateElements = document.querySelectorAll('[data-animate]');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // Contact form - sends email via FormSubmit
    const contactForm = document.getElementById('contactForm');
    const formBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = formBtn.textContent;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        formBtn.textContent = 'Sending...';
        formBtn.disabled = true;

        try {
            const res = await fetch('https://formsubmit.co/ajax/bardosproduction637@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                formBtn.textContent = 'Message Sent!';
                formBtn.style.background = '#2d5016';
                contactForm.reset();
            } else {
                throw new Error('Send failed');
            }
        } catch (err) {
            formBtn.textContent = 'Failed - Try Again';
            formBtn.style.background = '#8a1a2b';
        }

        setTimeout(() => {
            formBtn.textContent = originalBtnText;
            formBtn.style.background = '';
            formBtn.disabled = false;
        }, 4000);
    });

    // Parallax effect on hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Counter animation for section numbers
    const sectionNumbers = document.querySelectorAll('.section-number');
    sectionNumbers.forEach(num => {
        const text = num.textContent;
        num.style.opacity = '0';
        
        const numObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    num.style.opacity = '1';
                    num.style.transition = 'opacity 0.5s';
                    numObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numObserver.observe(num);
    });

    // Preloader
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});