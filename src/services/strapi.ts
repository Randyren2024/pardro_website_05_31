import axios from 'axios'

// Strapi API 基础配置
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

const strapiApi = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 联系信息接口
export interface ContactInfo {
  id: number
  attributes: {
    company_name: string
    email: string
    phone?: string
    address?: string
    business_hours?: string
    social_media?: any
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
  }
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

// API 响应接口
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// 获取联系信息
export const getContactInfo = async (locale: string = 'en'): Promise<ContactInfo> => {
  try {
    const response = await strapiApi.get<StrapiResponse<ContactInfo>>('/contact-info', {
      params: {
        locale,
        populate: '*'
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching contact info:', error)
    throw error
  }
}

// 获取页面内容
export const getPageByType = async (pageType: string, locale: string = 'en'): Promise<Page | null> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Page[]>>('/pages', {
      params: {
        'filters[page_type][$eq]': pageType,
        locale,
        populate: '*'
      }
    })
    return response.data.data.length > 0 ? response.data.data[0] : null
  } catch (error) {
    console.error('Error fetching page:', error)
    throw error
  }
}

// 获取所有页面
export const getPages = async (locale: string = 'en'): Promise<Page[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Page[]>>('/pages', {
      params: {
        locale,
        populate: '*'
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching pages:', error)
    throw error
  }
}

export default strapiApi