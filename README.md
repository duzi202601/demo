# CloudFlow - SaaS服务落地页

现代化的SaaS服务落地页演示项目，采用纯HTML/CSS/JavaScript构建。

## 功能特性

- 📱 响应式设计 — 完美支持桌面端与移动端
- ♿ 无障碍优化 — ARIA标签、键盘导航、屏幕阅读器支持
- 🎨 现代化UI — CSS自定义属性、渐变背景、卡片式布局
- ⚡ 性能优化 — IntersectionObserver懒加载动画、事件委托
- 🎯 SEO友好 — 语义化HTML、meta标签优化
- 🌙 无障碍动效 — 尊重用户的 `prefers-reduced-motion` 设置

## 页面内容

| 区域 | 说明 |
|------|------|
| 导航栏 | 品牌标识、主导航链接、移动端汉堡菜单 |
| Hero区域 | 核心价值主张与关键统计数据 |
| 功能展示 | 6个核心功能介绍卡片 |
| 价格方案 | 基础版/专业版/企业版三档定价 |
| 客户评价 | 用户推荐引用 |
| 行动号召 | 免费试用引导区 |
| 页脚 | 产品、公司、支持链接 |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/duzi202601/demo.git
cd demo

# 启动本地服务器
python3 -m http.server 8080

# 在浏览器中访问
open http://localhost:8080
```

## 文件结构

```
demo/
├── index.html      # 主页面 (语义化HTML5)
├── styles.css      # 样式 (CSS自定义属性 + 响应式)
├── script.js       # 交互逻辑 (IIFE模式 + IntersectionObserver)
└── README.md       # 项目文档
```

## 技术栈

- **HTML5** — 语义化标签、ARIA属性
- **CSS3** — 自定义属性、Flexbox、Grid、clamp()响应式排版
- **JavaScript** — 原生ES5+、IntersectionObserver、事件委托

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT
