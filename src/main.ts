import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { getLocaleFromSubdomain, getSupportedLocales } from './utils/subdomain'
import './style.css'
import 'ant-design-vue/dist/reset.css'

// 子域名语言检测和重定向逻辑
const currentLocale = getLocaleFromSubdomain()
const supportedLocales = getSupportedLocales()

// 检查URL参数中的语言设置（用于开发环境）
const urlParams = new URLSearchParams(window.location.search)
const langParam = urlParams.get('lang')

if (langParam && supportedLocales.includes(langParam as any)) {
  // 开发环境：使用URL参数
  i18n.global.locale.value = langParam as typeof supportedLocales[number]
  localStorage.setItem('language', langParam)
} else {
  // 生产环境：使用子域名检测的语言
  i18n.global.locale.value = currentLocale
  localStorage.setItem('language', currentLocale)
  
  // 如果用户访问了错误的子域名，可以选择重定向（可选）
  // 这里注释掉自动重定向，让用户手动切换
  /*
  const preferredLanguage = localStorage.getItem('language')
  if (preferredLanguage && preferredLanguage !== currentLocale && supportedLocales.includes(preferredLanguage as any)) {
    const newUrl = generateLanguageUrl(preferredLanguage as any, window.location.pathname)
    window.location.href = newUrl
  }
  */
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Antd)

app.mount('#app')