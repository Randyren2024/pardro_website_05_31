import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'
import 'ant-design-vue/dist/reset.css'

// Check for language parameter in URL
const urlParams = new URLSearchParams(window.location.search)
const langParam = urlParams.get('lang')
const supportedLocales = ['en', 'es', 'ru', 'ja', 'de', 'fr', 'th'] as const
if (langParam && supportedLocales.includes(langParam as any)) {
  i18n.global.locale.value = langParam as typeof supportedLocales[number]
  localStorage.setItem('language', langParam)
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Antd)

app.mount('#app')