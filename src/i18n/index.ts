import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import ru from './locales/ru'
import ja from './locales/ja'
import de from './locales/de'
import fr from './locales/fr'
import th from './locales/th'
import uk from './locales/uk.json'
import { getLocaleFromSubdomain, getSupportedLocales } from '../utils/subdomain'

const getBrowserLanguage = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || typeof navigator.language === 'undefined') {
    return 'en'; // Fallback to English if browser/navigator language is not available
  }
  const browserLanguage = navigator.language.split('-')[0];
  const supportedLocales = getSupportedLocales();
  if (supportedLocales.includes(browserLanguage as any)) {
    return browserLanguage;
  }
  return 'en'; // Fallback to English if browser language is not supported
};

// 优先使用子域名语言，其次是浏览器语言
const getInitialLocale = () => {
  if (typeof window === 'undefined') {
    // In a Worker environment, we can't safely access window.location or navigator.
    // getLocaleFromSubdomain() already returns 'en' when window is undefined.
    // For the main domain (partdro.com) or www.partdro.com, defaulting to 'en' is correct.
    return 'en';
  }

  const subdomainLocale = getLocaleFromSubdomain();
  // If a language is specified by subdomain (and it's not 'en'), or if it's explicitly www (which should be 'en'), or the main domain (which should be 'en')
  if (subdomainLocale !== 'en' || window.location.hostname.startsWith('www.') || window.location.hostname === 'partdro.com') {
    return subdomainLocale;
  }
  return getBrowserLanguage();
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    ru,
    ja,
    de,
    fr,
    th,
    uk
  }
})

export default i18n
