import { createI18n } from 'vue-i18n'
import zh from './zh.js'
import en from './en.js'

const messages = {
  zh,
  en
}

const i18n = createI18n({
  legacy: false, // 使用组合式API
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages
})

export default i18n