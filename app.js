/**
 * 现代化 Demo 应用 - JavaScript 主文件
 * 
 * 本文件包含应用的所有交互逻辑
 * 使用纯 JavaScript，无外部依赖
 * 采用模块化设计和最佳实践
 */

// 立即执行函数，避免全局命名空间污染
(function() {
    'use strict';

    /* ==========================================
       工具函数模块
       ========================================== */

    const Utils = {
        /**
         * 查询 DOM 元素
         * @param {string} selector - CSS 选择器
         * @param {Element} parent - 父元素（可选）
         * @returns {Element|null}
         */
        qs: (selector, parent = document) => parent.querySelector(selector),

        /**
         * 查询所有匹配的 DOM 元素
         * @param {string} selector - CSS 选择器
         * @param {Element} parent - 父元素（可选）
         * @returns {NodeList}
         */
        qsa: (selector, parent = document) => parent.querySelectorAll(selector),

        /**
         * 添加事件监听器（支持事件委托）
         * @param {Element} element - 目标元素
         * @param {string} event - 事件类型
         * @param {Function} handler - 事件处理函数
         * @param {string} selector - 委托选择器（可选）
         */
        on: (element, event, handler, selector) => {
            if (selector) {
                element.addEventListener(event, (e) => {
                    if (e.target.matches(selector)) {
                        handler.call(e.target, e);
                    }
                });
            } else {
                element.addEventListener(event, handler);
            }
        },

        /**
         * 创建 DOM 元素
         * @param {string} tag - 标签名
         * @param {Object} attrs - 属性对象（可选）
         * @param {string} content - 文本内容（可选）
         * @returns {Element}
         */
        createElement: (tag, attrs = {}, content = '') => {
            const element = document.createElement(tag);
            Object.keys(attrs).forEach(key => {
                if (key === 'className') {
                    element.className = attrs[key];
                } else {
                    element.setAttribute(key, attrs[key]);
                }
            });
            if (content) {
                element.textContent = content;
            }
            return element;
        },

        /**
         * 防抖函数
         * @param {Function} func - 要防抖的函数
         * @param {number} delay - 延迟时间（毫秒）
         * @returns {Function}
         */
        debounce: (func, delay = 300) => {
            let timeoutId;
            return function(...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        },

        /**
         * 节流函数
         * @param {Function} func - 要节流的函数
         * @param {number} limit - 限制时间（毫秒）
         * @returns {Function}
         */
        throttle: (func, limit = 300) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    /* ==========================================
       导航栏模块
       ========================================== */

    const Navigation = {
        init() {
            this.navToggle = Utils.qs('.nav-toggle');
            this.navMenu = Utils.qs('.nav-menu');
            this.navLinks = Utils.qsa('.nav-link');

            this.bindEvents();
        },

        bindEvents() {
            // 切换移动端菜单
            if (this.navToggle) {
                Utils.on(this.navToggle, 'click', () => this.toggleMenu());
            }

            // 导航链接点击
            this.navLinks.forEach(link => {
                Utils.on(link, 'click', (e) => this.handleNavClick(e));
            });

            // 滚动时更新活动链接
            Utils.on(window, 'scroll', Utils.throttle(() => this.updateActiveLink(), 100));
        },

        toggleMenu() {
            this.navMenu.classList.toggle('active');
        },

        handleNavClick(e) {
            const href = e.target.getAttribute('href');
            
            // 如果是锚点链接
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = Utils.qs(href);
                
                if (target) {
                    // 平滑滚动到目标
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // 关闭移动端菜单
                    this.navMenu.classList.remove('active');
                    
                    // 更新活动状态
                    this.setActiveLink(e.target);
                }
            }
        },

        setActiveLink(activeLink) {
            this.navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        },

        updateActiveLink() {
            const sections = Utils.qsa('.section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    const correspondingLink = Utils.qs(`.nav-link[href="#${id}"]`);
                    if (correspondingLink) {
                        this.setActiveLink(correspondingLink);
                    }
                }
            });
        }
    };

    /* ==========================================
       计数器模块
       ========================================== */

    const Counter = {
        init() {
            this.value = 0;
            this.counterDisplay = Utils.qs('#counter-value');
            this.incrementBtn = Utils.qs('#increment-btn');
            this.decrementBtn = Utils.qs('#decrement-btn');
            this.resetBtn = Utils.qs('#reset-btn');

            this.bindEvents();
            this.render();
        },

        bindEvents() {
            if (this.incrementBtn) {
                Utils.on(this.incrementBtn, 'click', () => this.increment());
            }
            if (this.decrementBtn) {
                Utils.on(this.decrementBtn, 'click', () => this.decrement());
            }
            if (this.resetBtn) {
                Utils.on(this.resetBtn, 'click', () => this.reset());
            }
        },

        increment() {
            this.value++;
            this.render();
            this.animate();
        },

        decrement() {
            this.value--;
            this.render();
            this.animate();
        },

        reset() {
            this.value = 0;
            this.render();
            this.animate();
        },

        render() {
            if (this.counterDisplay) {
                this.counterDisplay.textContent = this.value;
            }
        },

        animate() {
            if (this.counterDisplay) {
                this.counterDisplay.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.counterDisplay.style.transform = 'scale(1)';
                }, 200);
            }
        }
    };

    /* ==========================================
       待办事项模块
       ========================================== */

    const TodoList = {
        init() {
            this.todos = this.loadFromStorage();
            this.todoForm = Utils.qs('#todo-form');
            this.todoInput = Utils.qs('#todo-input');
            this.todoList = Utils.qs('#todo-list');
            this.totalTasks = Utils.qs('#total-tasks');
            this.completedTasks = Utils.qs('#completed-tasks');

            this.bindEvents();
            this.render();
        },

        bindEvents() {
            if (this.todoForm) {
                Utils.on(this.todoForm, 'submit', (e) => this.handleSubmit(e));
            }
            if (this.todoList) {
                Utils.on(this.todoList, 'change', (e) => this.handleToggle(e), '.todo-checkbox');
                Utils.on(this.todoList, 'click', (e) => this.handleDelete(e), '.todo-delete');
            }
        },

        handleSubmit(e) {
            e.preventDefault();
            const text = this.todoInput.value.trim();
            
            if (text) {
                this.addTodo(text);
                this.todoInput.value = '';
                this.todoInput.focus();
            }
        },

        handleToggle(e) {
            const id = parseInt(e.target.dataset.id);
            this.toggleTodo(id);
        },

        handleDelete(e) {
            const id = parseInt(e.target.dataset.id);
            this.deleteTodo(id);
        },

        addTodo(text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false
            };
            
            this.todos.push(todo);
            this.saveToStorage();
            this.render();
        },

        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                this.saveToStorage();
                this.render();
            }
        },

        deleteTodo(id) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
        },

        render() {
            if (!this.todoList) return;

            // 清空列表
            this.todoList.innerHTML = '';

            // 渲染每个待办事项
            this.todos.forEach(todo => {
                const li = Utils.createElement('li', { className: `todo-item ${todo.completed ? 'completed' : ''}` });
                
                const content = Utils.createElement('div', { className: 'todo-content' });
                
                const checkbox = Utils.createElement('input', {
                    type: 'checkbox',
                    className: 'todo-checkbox',
                    'data-id': todo.id
                });
                checkbox.checked = todo.completed;
                
                const text = Utils.createElement('span', { className: 'todo-text' }, todo.text);
                
                const deleteBtn = Utils.createElement('button', {
                    className: 'todo-delete',
                    'data-id': todo.id
                }, '删除');
                
                content.appendChild(checkbox);
                content.appendChild(text);
                li.appendChild(content);
                li.appendChild(deleteBtn);
                
                this.todoList.appendChild(li);
            });

            // 更新统计信息
            this.updateStats();

            // 添加淡入动画
            this.todoList.classList.add('fade-in');
        },

        updateStats() {
            const total = this.todos.length;
            const completed = this.todos.filter(t => t.completed).length;

            if (this.totalTasks) {
                this.totalTasks.textContent = total;
            }
            if (this.completedTasks) {
                this.completedTasks.textContent = completed;
            }
        },

        saveToStorage() {
            try {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            } catch (e) {
                console.error('无法保存到本地存储:', e);
            }
        },

        loadFromStorage() {
            try {
                const stored = localStorage.getItem('todos');
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.error('无法从本地存储加载:', e);
                return [];
            }
        }
    };

    /* ==========================================
       动态数据加载模块
       ========================================== */

    const DataLoader = {
        init() {
            this.loadBtn = Utils.qs('#load-data-btn');
            this.dataContainer = Utils.qs('#data-container');
            
            this.bindEvents();
        },

        bindEvents() {
            if (this.loadBtn) {
                Utils.on(this.loadBtn, 'click', () => this.loadData());
            }
        },

        async loadData() {
            if (!this.dataContainer) return;

            // 显示加载状态
            this.dataContainer.innerHTML = '<div class="loading">加载中...</div>';
            this.loadBtn.disabled = true;

            try {
                // 模拟异步数据加载（实际应用中可以是 API 调用）
                const data = await this.fetchMockData();
                
                // 延迟以展示加载效果
                await this.delay(1000);
                
                this.renderData(data);
            } catch (error) {
                this.dataContainer.innerHTML = `<div class="loading">加载失败: ${error.message}</div>`;
            } finally {
                this.loadBtn.disabled = false;
            }
        },

        async fetchMockData() {
            // 模拟 API 调用
            return new Promise((resolve) => {
                const mockData = [
                    { id: 1, title: '优化的代码结构', description: '模块化设计，易于维护' },
                    { id: 2, title: '响应式布局', description: '适配各种设备屏幕' },
                    { id: 3, title: '性能优化', description: '快速加载和渲染' },
                    { id: 4, title: '现代化技术', description: '使用最新的 Web 标准' },
                    { id: 5, title: '良好的用户体验', description: '流畅的交互和动画' }
                ];
                resolve(mockData);
            });
        },

        renderData(data) {
            this.dataContainer.innerHTML = '';
            
            data.forEach((item, index) => {
                const itemDiv = Utils.createElement('div', { className: 'data-item' });
                const title = Utils.createElement('h4', {}, item.title);
                const description = Utils.createElement('p', {}, item.description);
                
                itemDiv.appendChild(title);
                itemDiv.appendChild(description);
                
                // 延迟添加元素以创建动画效果
                setTimeout(() => {
                    itemDiv.classList.add('fade-in');
                    this.dataContainer.appendChild(itemDiv);
                }, index * 100);
            });
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };

    /* ==========================================
       回到顶部按钮模块
       ========================================== */

    const BackToTop = {
        init() {
            this.button = Utils.qs('#back-to-top');
            
            this.bindEvents();
        },

        bindEvents() {
            if (this.button) {
                Utils.on(window, 'scroll', Utils.throttle(() => this.toggleVisibility(), 100));
                Utils.on(this.button, 'click', () => this.scrollToTop());
            }
        },

        toggleVisibility() {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    /* ==========================================
       开始使用按钮
       ========================================== */

    const GetStarted = {
        init() {
            this.button = Utils.qs('#get-started-btn');
            
            this.bindEvents();
        },

        bindEvents() {
            if (this.button) {
                Utils.on(this.button, 'click', () => this.handleClick());
            }
        },

        handleClick() {
            const demoSection = Utils.qs('#demo');
            if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    /* ==========================================
       应用初始化
       ========================================== */

    const App = {
        init() {
            console.log('🚀 应用初始化中...');

            // 初始化所有模块
            Navigation.init();
            Counter.init();
            TodoList.init();
            DataLoader.init();
            BackToTop.init();
            GetStarted.init();

            // 添加全局错误处理
            this.setupErrorHandling();

            console.log('✅ 应用初始化完成！');
        },

        setupErrorHandling() {
            window.addEventListener('error', (e) => {
                console.error('全局错误:', e.error);
            });

            window.addEventListener('unhandledrejection', (e) => {
                console.error('未处理的 Promise 拒绝:', e.reason);
            });
        }
    };

    /* ==========================================
       DOM 加载完成后启动应用
       ========================================== */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }

})();
