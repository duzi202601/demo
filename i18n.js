/**
 * i18n - Internationalization Module
 * 多语言国际化模块
 * 
 * Supports: Chinese (zh), English (en)
 * 支持语言: 中文 (zh), 英文 (en)
 */

class I18n {
  constructor(defaultLocale = 'en') {
    this.currentLocale = defaultLocale;
    this.locales = {};
    this.supportedLocales = ['en', 'zh'];
  }

  /**
   * Load locale data
   * 加载语言数据
   * @param {string} locale - Locale code (e.g., 'en', 'zh')
   * @param {object} data - Locale data object
   */
  loadLocale(locale, data) {
    if (!this.supportedLocales.includes(locale)) {
      console.warn(`Locale '${locale}' is not in the supported list. Adding anyway.`);
      this.supportedLocales.push(locale);
    }
    this.locales[locale] = data;
  }

  /**
   * Set current locale
   * 设置当前语言
   * @param {string} locale - Locale code
   * @returns {boolean} - Whether the locale was set successfully
   */
  setLocale(locale) {
    if (this.locales[locale]) {
      this.currentLocale = locale;
      return true;
    }
    console.error(`Locale '${locale}' not loaded. Please load it first.`);
    return false;
  }

  /**
   * Get current locale
   * 获取当前语言
   * @returns {string} - Current locale code
   */
  getLocale() {
    return this.currentLocale;
  }

  /**
   * Get supported locales
   * 获取支持的语言列表
   * @returns {string[]} - Array of supported locale codes (copy)
   */
  getSupportedLocales() {
    return [...this.supportedLocales];
  }

  /**
   * Translate a key
   * 翻译指定的键
   * @param {string} key - Translation key (e.g., 'common.hello')
   * @param {object} params - Parameters for interpolation
   * @returns {string} - Translated string
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.locales[this.currentLocale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key '${key}' not found for locale '${this.currentLocale}'`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Handle parameter interpolation (e.g., {name} -> actual value)
    // 处理参数插值
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }

  /**
   * Check if a translation key exists and points to a string value
   * 检查翻译键是否存在且指向字符串值
   * @param {string} key - Translation key
   * @returns {boolean}
   */
  has(key) {
    const keys = key.split('.');
    let value = this.locales[this.currentLocale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return false;
      }
    }
    return typeof value === 'string';
  }
}

// Export for different module systems
// 导出模块（支持不同的模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}

if (typeof window !== 'undefined') {
  window.I18n = I18n;
}
