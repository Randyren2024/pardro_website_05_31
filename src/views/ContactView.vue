<template>
  <div class="contact-view">
    <!-- 页面标题部分 -->
    <div class="hero-section">
      <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold text-center mb-8">{{ t('contact.title') }}</h1>
        <p class="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 联系信息部分 -->
        <div class="contact-info">
          <h2 class="text-2xl font-semibold mb-6">{{ t('contact.info.title') }}</h2>
          
          <div v-if="loading" class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          </div>

          <div v-else-if="contactInfo" class="space-y-6">
            <!-- 公司名称 -->
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('contact.info.company') }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ contactInfo.attributes.company_name }}</p>
              </div>
            </div>

            <!-- 邮箱 -->
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('contact.info.email') }}</h3>
                <a :href="`mailto:${contactInfo.attributes.email}`" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {{ contactInfo.attributes.email }}
                </a>
              </div>
            </div>

            <!-- 电话 -->
            <div v-if="contactInfo.attributes.phone" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('contact.info.phone') }}</h3>
                <a :href="`tel:${contactInfo.attributes.phone}`" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {{ contactInfo.attributes.phone }}
                </a>
              </div>
            </div>

            <!-- 地址 -->
            <div v-if="contactInfo.attributes.address" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('contact.info.address') }}</h3>
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ contactInfo.attributes.address }}</p>
              </div>
            </div>

            <!-- 营业时间 -->
            <div v-if="contactInfo.attributes.business_hours" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('contact.info.hours') }}</h3>
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ contactInfo.attributes.business_hours }}</p>
              </div>
            </div>

            <!-- 社交媒体 -->
            <div v-if="contactInfo.attributes.social_media" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('contact.info.social') }}</h3>
                <div class="flex space-x-4 mt-2">
                  <a v-for="(url, platform) in contactInfo.attributes.social_media" 
                     :key="platform" 
                     :href="url" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 capitalize">
                    {{ platform }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="error" class="text-red-600 dark:text-red-400">
            {{ t('contact.error.loadInfo') }}
          </div>
        </div>

        <!-- 联系表单部分 -->
        <div class="contact-form">
          <h2 class="text-2xl font-semibold mb-6">{{ t('contact.form.title') }}</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 名字 -->
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('contact.form.firstName') }} *
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  :placeholder="t('contact.form.firstNamePlaceholder')"
                />
              </div>

              <!-- 姓氏 -->
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('contact.form.lastName') }} *
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  :placeholder="t('contact.form.lastNamePlaceholder')"
                />
              </div>
            </div>

            <!-- 邮箱 -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.email') }} *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('contact.form.emailPlaceholder')"
              />
            </div>

            <!-- 电话 -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.phone') }}
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('contact.form.phonePlaceholder')"
              />
            </div>

            <!-- 公司 -->
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.company') }}
              </label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('contact.form.companyPlaceholder')"
              />
            </div>

            <!-- 主题 -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.subject') }}
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('contact.form.subjectPlaceholder')"
              />
            </div>

            <!-- 消息 -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.message') }} *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('contact.form.messagePlaceholder')"
              ></textarea>
            </div>

            <!-- 提交按钮 -->
            <div>
              <button
                type="submit"
                :disabled="submitting"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="submitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ t('contact.form.submitting') }}
                </span>
                <span v-else>{{ t('contact.form.submit') }}</span>
              </button>
            </div>
          </form>

          <!-- 成功消息 -->
          <div v-if="submitSuccess" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {{ t('contact.form.success') }}
          </div>

          <!-- 错误消息 -->
          <div v-if="submitError" class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {{ t('contact.form.error') }}: {{ submitError }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getContactInfo, type ContactInfo } from '../services/strapi'
import { submitContactForm, type ContactFormData } from '../services/hubspot'

const { t, locale } = useI18n()

// 联系信息状态
const contactInfo = ref<ContactInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// 表单状态
const form = ref<ContactFormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  subject: ''
})

const submitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref<string | null>(null)

// 加载联系信息
const loadContactInfo = async () => {
  try {
    loading.value = true
    error.value = null
    contactInfo.value = await getContactInfo(locale.value)
  } catch (err) {
    console.error('Failed to load contact info:', err)
    error.value = 'Failed to load contact information'
  } finally {
    loading.value = false
  }
}

// 提交表单
const submitForm = async () => {
  try {
    submitting.value = true
    submitError.value = null
    submitSuccess.value = false

    // 验证必填字段
    if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.message) {
      throw new Error('Please fill in all required fields')
    }

    // 提交到 HubSpot
    await submitContactForm(form.value)
    
    // 成功后重置表单
    submitSuccess.value = true
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      subject: ''
    }

    // 3秒后隐藏成功消息
    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)

  } catch (err: any) {
    console.error('Failed to submit form:', err)
    submitError.value = err.message || 'Failed to submit form'
  } finally {
    submitting.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadContactInfo()
})
</script>

<style scoped>
.contact-view {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.contact-info h3 {
  margin-bottom: 0.25rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-section p {
    font-size: 1rem;
  }
}
</style>