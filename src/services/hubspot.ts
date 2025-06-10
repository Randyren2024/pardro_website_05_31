import axios from 'axios'

// HubSpot API 配置
const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID
const HUBSPOT_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID
const HUBSPOT_ACCESS_TOKEN = import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN

// 联系表单数据接口
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message: string
  subject?: string
}

// HubSpot 表单提交接口
export interface HubSpotFormSubmission {
  fields: Array<{
    name: string
    value: string
  }>
  context: {
    hutk?: string
    pageUri: string
    pageName: string
  }
}

// 提交表单到 HubSpot
export const submitContactForm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // 方法1: 使用 HubSpot Forms API (推荐)
    if (HUBSPOT_PORTAL_ID && HUBSPOT_FORM_ID) {
      const hubspotData: HubSpotFormSubmission = {
        fields: [
          { name: 'firstname', value: formData.firstName },
          { name: 'lastname', value: formData.lastName },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone || '' },
          { name: 'company', value: formData.company || '' },
          { name: 'message', value: formData.message },
          { name: 'subject', value: formData.subject || 'Contact Form Submission' }
        ],
        context: {
          pageUri: window.location.href,
          pageName: 'Contact Us'
        }
      }

      const response = await axios.post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        hubspotData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      return response.status === 200
    }

    // 方法2: 使用 HubSpot Contacts API (需要访问令牌)
    if (HUBSPOT_ACCESS_TOKEN) {
      const contactData = {
        properties: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          hs_lead_status: 'NEW'
        }
      }

      const response = await axios.post(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        contactData,
        {
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.status === 201
    }

    throw new Error('HubSpot configuration is missing')
  } catch (error) {
    console.error('Error submitting form to HubSpot:', error)
    throw error
  }
}

// 创建 HubSpot 联系人
export const createHubSpotContact = async (contactData: ContactFormData): Promise<any> => {
  try {
    if (!HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HubSpot access token is required')
    }

    const response = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        properties: {
          firstname: contactData.firstName,
          lastname: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          message: contactData.message,
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating HubSpot contact:', error)
    throw error
  }
}

// 获取或创建联系人
export const getOrCreateContact = async (email: string, contactData: ContactFormData): Promise<any> => {
  try {
    if (!HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HubSpot access token is required')
    }

    // 首先尝试通过邮箱查找现有联系人
    try {
      const searchResponse = await axios.post(
        'https://api.hubapi.com/crm/v3/objects/contacts/search',
        {
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (searchResponse.data.results.length > 0) {
        // 联系人已存在，更新信息
        const contactId = searchResponse.data.results[0].id
        const updateResponse = await axios.patch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
          {
            properties: {
              firstname: contactData.firstName,
              lastname: contactData.lastName,
              phone: contactData.phone,
              company: contactData.company,
              message: contactData.message,
              lastmodifieddate: new Date().toISOString()
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        )
        return updateResponse.data
      }
    } catch (searchError) {
      console.log('Contact not found, creating new one')
    }

    // 联系人不存在，创建新的
    return await createHubSpotContact(contactData)
  } catch (error) {
    console.error('Error in getOrCreateContact:', error)
    throw error
  }
}

export default {
  submitContactForm,
  createHubSpotContact,
  getOrCreateContact
}