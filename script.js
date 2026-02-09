/**
 * CloudFlow SaaS Landing Page - Main Script
 *
 * Handles navigation, scroll animations, and user interactions.
 */

(function () {
    'use strict';

    /**
     * Initialize mobile navigation toggle.
     */
    function initNavigation() {
        var navToggle = document.getElementById('navToggle');
        var navMenu = document.getElementById('navMenu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function () {
            var isActive = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isActive));

            var spans = navToggle.querySelectorAll('span');
            if (isActive) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMenu(navMenu, navToggle);
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu(navMenu, navToggle);
                navToggle.focus();
            }
        });
    }

    /**
     * Close the mobile navigation menu.
     * @param {HTMLElement} navMenu - The navigation menu element.
     * @param {HTMLElement} navToggle - The toggle button element.
     */
    function closeMenu(navMenu, navToggle) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        var spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    /**
     * Initialize smooth scrolling for anchor links.
     */
    function initSmoothScroll() {
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;

            var href = link.getAttribute('href');
            if (!href || href === '#' || href.length <= 1) return;

            var target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            var navMenu = document.getElementById('navMenu');
            var navToggle = document.getElementById('navToggle');
            if (navMenu && navToggle && navMenu.classList.contains('active')) {
                closeMenu(navMenu, navToggle);
            }
        });
    }

    /**
     * Initialize scroll-based fade-in animations using IntersectionObserver.
     */
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        // Respect reduced motion preferences
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
        );

        var elements = document.querySelectorAll(
            '.feature-card, .pricing-card, .testimonial-card'
        );
        elements.forEach(function (el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    /**
     * Initialize active navigation link highlighting on scroll.
     */
    function initActiveNavHighlight() {
        if (!('IntersectionObserver' in window)) return;

        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute('id');
                        navLinks.forEach(function (link) {
                            if (link.getAttribute('href') === '#' + id) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // Initialize all modules when the DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initSmoothScroll();
        initScrollAnimations();
        initActiveNavHighlight();
    });
})();
