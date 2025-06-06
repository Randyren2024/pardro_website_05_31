import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import ja from './locales/ja'
import de from './locales/de'
import fr from './locales/fr'
import th from './locales/th.ts'
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
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    // In a Worker environment, we can't safely access window.location or navigator.
    // getLocaleFromSubdomain() already returns 'en' when window is undefined.
    // For the main domain (partdro.com) or www.partdro.com, defaulting to 'en' is correct.
    return 'en';
  }

  const subdomainLocale = getLocaleFromSubdomain();
  // If a language is specified by subdomain (and it's not 'en'), or if it's explicitly www (which should be 'en'), or the main domain (which should be 'en')
  if (subdomainLocale !== 'en' || (typeof window !== 'undefined' && typeof window.location !== 'undefined' && (window.location.hostname.startsWith('www.') || window.location.hostname === 'partdro.com'))) {
    return subdomainLocale;
  }
  return getBrowserLanguage();
}

const messages = {
  en,
  es,
  ja,
  de,
  fr,
  th
}

export const supportedLocales: Record<string, string> = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
  de: 'Deutsch',
  fr: 'Français',
  th: 'ไทย'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n
