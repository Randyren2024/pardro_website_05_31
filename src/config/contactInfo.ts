// 静态联系信息配置

// 联系信息接口
export interface ContactInfo {
  id: number
  attributes: {
    company_name: string
    email: string
    phone?: string
    address?: string
    business_hours?: string
    social_media?: Record<string, string>
    locale: string
  }
}

// 默认联系信息（英文）
const defaultContactInfo: ContactInfo = {
  id: 1,
  attributes: {
    company_name: 'Pardro Technology',
    email: 'contact@pardro.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Avenue\nSilicon Valley, CA 94043\nUnited States',
    business_hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
    social_media: {
      twitter: 'https://twitter.com/pardrotech',
      facebook: 'https://facebook.com/pardrotech',
      linkedin: 'https://linkedin.com/company/pardrotech',
      instagram: 'https://instagram.com/pardrotech'
    },
    locale: 'en'
  }
}

// 本地化联系信息
const localizedContactInfo: Record<string, ContactInfo> = {
  // 英文
  en: defaultContactInfo,
  
  // 西班牙语
  es: {
    ...defaultContactInfo,
    attributes: {
      ...defaultContactInfo.attributes,
      locale: 'es'
    }
  },
  
  // 日语
  ja: {
    ...defaultContactInfo,
    attributes: {
      ...defaultContactInfo.attributes,
      locale: 'ja'
    }
  },
  
  // 德语
  de: {
    ...defaultContactInfo,
    attributes: {
      ...defaultContactInfo.attributes,
      locale: 'de'
    }
  },
  
  // 法语
  fr: {
    ...defaultContactInfo,
    attributes: {
      ...defaultContactInfo.attributes,
      locale: 'fr'
    }
  },
  
  // 泰语
  th: {
    ...defaultContactInfo,
    attributes: {
      ...defaultContactInfo.attributes,
      locale: 'th'
    }
  }
}

// 获取联系信息
export const getContactInfo = (locale: string = 'en'): ContactInfo => {
  return localizedContactInfo[locale] || defaultContactInfo
}

// 页面内容接口
export interface Page {
  id: number
  attributes: {
    title: string
    slug: string
    content?: string
    seo_title?: string
    seo_description?: string
    featured_image?: any
    page_type: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
  }
}

// 获取页面内容（静态实现）
export const getPageByType = (pageType: string, locale: string = 'en'): Page | null => {
  // 这里可以添加静态页面内容
  // 目前返回null，因为没有实际页面数据
  return null
}

// 获取所有页面（静态实现）
export const getPages = (locale: string = 'en'): Page[] => {
  // 这里可以添加静态页面内容列表
  // 目前返回空数组，因为没有实际页面数据
  return []
}