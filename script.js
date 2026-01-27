// 导航菜单切换功能
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // 切换导航菜单
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // 添加动画效果到菜单按钮
        this.classList.toggle('active');
    });

    // 点击菜单项后关闭菜单（移动端）
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 在移动设备上，点击链接后关闭菜单
            if (window.innerWidth < 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        // 如果窗口变大（桌面视图），移除移动菜单的active类
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // 表单提交处理（演示用）
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // 显示提交信息（实际项目中应该发送到服务器）
            alert(`感谢您的消息！\n\n姓名: ${name}\n邮箱: ${email}\n消息: ${message}\n\n这是一个演示，实际应用中会将数据发送到服务器。`);
            
            // 重置表单
            this.reset();
        });
    }

    // 平滑滚动增强
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只处理锚点链接
            if (href === '#' || href.length === 0) {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加滚动效果 - 导航栏阴影
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('header');

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // 图库项目点击效果
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            alert(`${title}\n${description}\n\n点击图库项目，可以在这里添加图片查看器或其他交互功能。`);
        });
    });

    // 检测触摸设备
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    // 如果是触摸设备，添加特定的类
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        console.log('检测到触摸设备');
    } else {
        document.body.classList.add('no-touch');
        console.log('检测到非触摸设备');
    }

    // 记录设备信息（用于调试）
    console.log('设备信息:');
    console.log('屏幕宽度:', window.innerWidth);
    console.log('屏幕高度:', window.innerHeight);
    console.log('设备像素比:', window.devicePixelRatio);
    console.log('用户代理:', navigator.userAgent);
});
