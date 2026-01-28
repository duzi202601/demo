# Demo

A demonstration project with multi-language support (Chinese/English).

一个支持多语言（中文/英文）的演示项目。

## Features | 功能特性

- 🌐 Multi-language support (Chinese & English) | 多语言支持（中文和英文）
- 📝 Easy to extend with new languages | 易于扩展新语言
- 🔄 Dynamic language switching | 动态语言切换
- 📦 Works in both Node.js and Browser | 支持 Node.js 和浏览器环境

## Project Structure | 项目结构

```
demo/
├── locales/
│   ├── en.json    # English translations | 英文翻译
│   └── zh.json    # Chinese translations | 中文翻译
├── i18n.js        # i18n utility module | 国际化工具模块
├── example.js     # Usage example | 使用示例
└── README.md      # Documentation | 文档
```

## Usage | 使用方法

### Node.js

```javascript
const I18n = require('./i18n.js');
const en = require('./locales/en.json');
const zh = require('./locales/zh.json');

// Create i18n instance | 创建 i18n 实例
const i18n = new I18n('en');

// Load locale data | 加载语言数据
i18n.loadLocale('en', en);
i18n.loadLocale('zh', zh);

// Translate | 翻译
console.log(i18n.t('common.hello'));  // Output: Hello

// Switch to Chinese | 切换到中文
i18n.setLocale('zh');
console.log(i18n.t('common.hello'));  // Output: 你好

// With parameters | 带参数
console.log(i18n.t('messages.greeting', { name: 'World' }));  // Output: 你好，World！
```

### Browser

```html
<script src="i18n.js"></script>
<script>
  const i18n = new I18n('en');
  
  // Load locale data and wait for completion before use
  // 加载语言数据并等待完成后再使用
  async function initI18n() {
    const [enData, zhData] = await Promise.all([
      fetch('locales/en.json').then(res => res.json()),
      fetch('locales/zh.json').then(res => res.json())
    ]);
    
    i18n.loadLocale('en', enData);
    i18n.loadLocale('zh', zhData);
    
    // Now safe to use translations | 现在可以安全使用翻译了
    console.log(i18n.t('common.hello'));
  }
  
  initI18n();
</script>
```

## API Reference | API 参考

| Method | Description | 描述 |
|--------|-------------|------|
| `loadLocale(locale, data)` | Load locale data | 加载语言数据 |
| `setLocale(locale)` | Set current locale | 设置当前语言 |
| `getLocale()` | Get current locale | 获取当前语言 |
| `getSupportedLocales()` | Get supported locales list | 获取支持的语言列表 |
| `t(key, params)` | Translate a key | 翻译指定的键 |
| `has(key)` | Check if key exists | 检查翻译键是否存在 |

## Adding New Languages | 添加新语言

1. Create a new JSON file in the `locales/` directory (e.g., `locales/ja.json` for Japanese)
2. Follow the same structure as `en.json` or `zh.json`
3. Load the new locale using `i18n.loadLocale('ja', jaData)`

---

1. 在 `locales/` 目录下创建新的 JSON 文件（例如：`locales/ja.json` 用于日语）
2. 遵循与 `en.json` 或 `zh.json` 相同的结构
3. 使用 `i18n.loadLocale('ja', jaData)` 加载新语言

## License | 许可证

MIT
