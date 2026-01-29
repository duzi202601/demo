/**
 * CloudFlow - 统一交互系统
 * Version: 2.0
 * 协调一致的交互体验
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // === 配置常量 ===
    const CONFIG = {
        animationDelay: 100,
        scrollOffset: 80,
        observerThreshold: 0.1
    };

    // === 导航栏功能 ===
    const initNavigation = () => {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navActions = document.querySelector('.nav-actions');
        
        // 移动端菜单切换
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', !isActive);
                if (navActions) {
                    navActions.classList.toggle('active');
                }
            });
        }

        // 滚动时添加阴影效果
        const handleScroll = () => {
            if (header) {
                if (window.scrollY > 10) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // 初始检查
    };

    // === 平滑滚动 ===
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href.length <= 1) return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // 关闭移动端菜单
                    const navMenu = document.getElementById('navMenu');
                    const navToggle = document.getElementById('navToggle');
                    const navActions = document.querySelector('.nav-actions');
                    
                    if (navMenu?.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle?.classList.remove('active');
                        navActions?.classList.remove('active');
                    }
                }
            });
        });
    };

    // === 滚动动画 ===
    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll(
            '.feature-card, .pricing-card, .testimonial-card, .section-header'
        );

        if (animatedElements.length === 0) return;

        // 设置初始状态
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index % 3 * CONFIG.animationDelay}ms, transform 0.6s ease ${index % 3 * CONFIG.animationDelay}ms`;
        });

        // 创建观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.observerThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    };

    // === 数字计数动画 ===
    const initCounterAnimation = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;

        const animateCounter = (element, target, suffix = '') => {
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 使用缓动函数
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeOutQuart);
                
                element.textContent = current.toLocaleString() + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const matches = text.match(/^([\d,]+)(.*)$/);
                    
                    if (matches) {
                        const number = parseInt(matches[1].replace(/,/g, ''));
                        const suffix = matches[2] || '';
                        animateCounter(entry.target, number, suffix);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    };

    // === 按钮交互 ===
    const initButtonInteractions = () => {
        document.querySelectorAll('.btn').forEach(button => {
            // 涟漪效果
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // 演示页面的按钮点击处理
                if (href === '#') {
                    e.preventDefault();
                    
                    // 创建涟漪效果
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                    
                    // 显示提示
                    showNotification('感谢您的关注！这是一个演示页面。');
                }
            });
        });

        // 添加涟漪动画样式
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // === 通知提示 ===
    const showNotification = (message) => {
        // 移除现有通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span class="notification-icon">✓</span>
            <span class="notification-text">${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #1f2937;
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transition: transform 0.3s ease;
            font-size: 14px;
        `;

        document.body.appendChild(notification);

        // 动画显示
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // === 导航激活状态 ===
    const initActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    };

    // === 键盘可访问性 ===
    const initAccessibility = () => {
        // 为移动端菜单按钮添加键盘支持
        const navToggle = document.getElementById('navToggle');
        if (navToggle) {
            navToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navToggle.click();
                }
            });
        }

        // 焦点可见性
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // 添加焦点样式
        if (!document.getElementById('focus-styles')) {
            const style = document.createElement('style');
            style.id = 'focus-styles';
            style.textContent = `
                body.keyboard-navigation *:focus {
                    outline: 2px solid #6366f1;
                    outline-offset: 2px;
                }
                body:not(.keyboard-navigation) *:focus {
                    outline: none;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // === 初始化所有功能 ===
    const init = () => {
        initNavigation();
        initSmoothScroll();
        initScrollAnimations();
        initCounterAnimation();
        initButtonInteractions();
        initActiveNavigation();
        initAccessibility();
    };

    // 启动
    init();
});
