import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import ru from './locales/ru'
import ja from './locales/ja'
import de from './locales/de'
import fr from './locales/fr'
import th from './locales/th'

const getBrowserLanguage = () => {
  const browserLanguage = navigator.language.split('-')[0];
  const supportedLocales = ['en', 'es', 'ru', 'ja', 'de', 'fr', 'th'];
  if (supportedLocales.includes(browserLanguage)) {
    return browserLanguage;
  }
  return 'en'; // Fallback to English if browser language is not supported
};

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    ru,
    ja,
    de,
    fr,
    th
  }
})

export default i18n