// 子域名语言检测工具
export const getSupportedLocales = () => ['en', 'es', 'ja', 'de', 'fr', 'th'] as const

export type SupportedLocale = ReturnType<typeof getSupportedLocales>[number]

// 从子域名获取语言
export const getLocaleFromSubdomain = (): SupportedLocale => {
  if (typeof window === 'undefined') return 'en'
  
  const hostname = window.location.hostname
  const subdomain = hostname.split('.')[0]
  const supportedLocales = getSupportedLocales()
  
  // 检查子域名是否是支持的语言
  if (supportedLocales.includes(subdomain as SupportedLocale)) {
    return subdomain as SupportedLocale
  }
  
  // 如果是www或主域名，返回英语
  if (subdomain === 'www' || hostname === 'partdro.com') {
    return 'en'
  }
  
  // 开发环境默认返回英语
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    return 'en'
  }
  
  return 'en'
}

// 生成语言切换URL
export const generateLanguageUrl = (locale: SupportedLocale, currentPath: string = '/') => {
  if (typeof window === 'undefined') return currentPath
  
  const hostname = window.location.hostname
  const protocol = window.location.protocol
  const port = window.location.port
  
  // 开发环境处理
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    const baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}`
    return `${baseUrl}${currentPath}?lang=${locale}`
  }
  
  // 生产环境子域名处理
  const baseDomain = hostname.includes('partdro.com') ? 'partdro.com' : hostname
  const newHostname = locale === 'en' ? `www.${baseDomain}` : `${locale}.${baseDomain}`
  
  return `${protocol}//${newHostname}${currentPath}`
}

// 检查当前是否在正确的子域名
export const isCorrectSubdomain = (expectedLocale: SupportedLocale): boolean => {
  const currentLocale = getLocaleFromSubdomain()
  return currentLocale === expectedLocale
}