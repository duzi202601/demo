/**
 * Example usage of the i18n module
 * i18n 模块使用示例
 * 
 * Run: node example.js
 */

const I18n = require('./i18n.js');
const en = require('./locales/en.json');
const zh = require('./locales/zh.json');

// Create i18n instance with English as default
// 创建 i18n 实例，默认语言为英文
const i18n = new I18n('en');

// Load both locale data
// 加载两种语言数据
i18n.loadLocale('en', en);
i18n.loadLocale('zh', zh);

console.log('=== Multi-language Demo | 多语言演示 ===\n');

// English translations | 英文翻译
console.log('--- English ---');
console.log('App name:', i18n.t('app.name'));
console.log('Welcome:', i18n.t('common.welcome'));
console.log('Greeting:', i18n.t('messages.greeting', { name: 'User' }));
console.log('');

// Switch to Chinese | 切换到中文
i18n.setLocale('zh');

// Chinese translations | 中文翻译
console.log('--- 中文 ---');
console.log('应用名称:', i18n.t('app.name'));
console.log('欢迎:', i18n.t('common.welcome'));
console.log('问候:', i18n.t('messages.greeting', { name: '用户' }));
console.log('');

// Show supported locales | 显示支持的语言
console.log('Supported locales | 支持的语言:', i18n.getSupportedLocales().join(', '));
console.log('Current locale | 当前语言:', i18n.getLocale());
