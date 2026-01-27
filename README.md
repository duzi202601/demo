# Demo Application - HTML + JavaScript

一个现代化的、完全使用纯 HTML、CSS 和 JavaScript 构建的演示应用。

## 🌟 特性

- ✅ **纯原生技术**：无框架、无依赖，仅使用 HTML、CSS 和 JavaScript
- 🎨 **现代化设计**：简洁美观的用户界面，支持深色模式友好的配色
- 📱 **响应式布局**：完美适配桌面、平板和移动设备
- ⚡ **高性能**：优化的代码结构，快速加载和渲染
- 🔧 **模块化架构**：清晰的代码组织，易于维护和扩展
- 💾 **数据持久化**：使用 localStorage 保存待办事项
- ♿ **无障碍访问**：支持 ARIA 属性和键盘导航

## 🚀 快速开始

### 方法 1：直接打开
直接在浏览器中打开 `index.html` 文件即可。

### 方法 2：使用本地服务器
```bash
# 使用 Python
python -m http.server 8080

# 使用 Node.js
npx http-server -p 8080

# 然后访问 http://localhost:8080
```

## 📦 项目结构

```
demo/
├── index.html      # 主 HTML 文件
├── styles.css      # 样式表
├── app.js          # JavaScript 应用逻辑
└── README.md       # 项目文档
```

## 🎯 功能展示

### 1. 计数器
- 递增/递减计数
- 重置功能
- 动画过渡效果

### 2. 待办事项列表
- 添加新任务
- 标记任务完成
- 删除任务
- 实时统计
- 本地存储持久化

### 3. 动态数据加载
- 模拟异步数据获取
- 加载状态显示
- 渐进式渲染动画

### 4. 导航系统
- 平滑滚动
- 活动链接高亮
- 移动端汉堡菜单
- 回到顶部按钮

## 💻 技术栈

- **HTML5**：语义化标签，无障碍访问
- **CSS3**：Flexbox、Grid、CSS Variables、动画
- **JavaScript ES6+**：模块化、箭头函数、Promise、async/await

## 🏗️ 代码特点

### HTML
- 语义化标签（header, nav, main, section, footer）
- ARIA 标签支持无障碍访问
- SEO 友好的 meta 标签

### CSS
- CSS 变量实现主题色统一管理
- Flexbox 和 Grid 实现响应式布局
- 移动优先的设计理念
- 流畅的过渡动画
- 打印样式优化

### JavaScript
- IIFE 模式避免全局命名空间污染
- 模块化设计，职责分离
- 工具函数封装（防抖、节流）
- 事件委托优化性能
- 错误处理机制
- 详细的中文注释

## 📱 浏览器兼容性

支持所有现代浏览器：
- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Opera (最新版本)

## 🔒 安全性

- ✅ 通过 CodeQL 安全扫描
- ✅ 无已知安全漏洞
- ✅ 无外部依赖
- ✅ 安全的 DOM 操作

## 📄 许可证

本项目为演示用途，可自由使用和修改。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题或建议，请创建 Issue。
