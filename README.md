# 智能模拟效果 Demo (Smart Simulation Effect)

一个交互式的智能粒子模拟系统，展示具有智能行为的粒子效果。

An interactive smart particle simulation system demonstrating particles with intelligent behavior.

## 功能特点 (Features)

- 🎯 **智能吸引效果** - 粒子会被鼠标吸引，展示群体智能行为
- 🌌 **粒子连接网络** - 相邻粒子之间自动形成连接
- ⚡ **实时物理模拟** - 包含重力、摩擦、碰撞反弹
- 🎨 **多彩粒子效果** - 发光效果和渐变色彩
- 📱 **响应式设计** - 支持桌面和移动设备

## 使用方法 (Usage)

1. 直接在浏览器中打开 `index.html` 文件
2. Open the `index.html` file directly in your browser

### 操作说明 (Controls)

- **移动鼠标** - 与粒子互动 (Move mouse - interact with particles)
- **点击画布** - 添加新粒子 (Click canvas - add new particles)
- **切换重力** - 开启/关闭重力效果 (Toggle Gravity - enable/disable gravity)
- **切换吸引** - 开启/关闭鼠标吸引效果 (Toggle Attraction - enable/disable mouse attraction)
- **添加粒子** - 随机添加50个粒子 (Add Particles - add 50 random particles)
- **清除** - 清除所有粒子 (Clear - remove all particles)

## 技术实现 (Technical Implementation)

- 使用 Canvas API 进行高性能渲染
- 基于类的粒子系统架构
- 智能行为算法：鼠标引力场模拟
- 粒子生命周期管理
- 60 FPS 流畅动画

## 文件结构 (File Structure)

```
├── index.html      # 主页面
├── styles.css      # 样式文件
├── simulation.js   # 模拟核心逻辑
└── README.md       # 说明文档
```

## 许可证 (License)

MIT License
