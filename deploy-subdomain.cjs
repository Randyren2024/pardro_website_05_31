#!/usr/bin/env node

/**
 * 多语种子域名部署辅助脚本
 * 用于验证配置和生成部署信息
 */

const fs = require('fs')
const path = require('path')

// 支持的语言配置
const SUPPORTED_LOCALES = {
  en: { name: 'English', subdomain: 'www' },
  es: { name: 'Español', subdomain: 'es' },
  ja: { name: '日本語', subdomain: 'ja' },
  de: { name: 'Deutsch', subdomain: 'de' },
  fr: { name: 'Français', subdomain: 'fr' },
  ru: { name: 'Русский', subdomain: 'ru' },
  th: { name: 'ไทย', subdomain: 'th' }
}

const DOMAIN = 'partdro.com'

function checkFiles() {
  console.log('🔍 检查必要文件...')
  
  const requiredFiles = [
    'src/utils/subdomain.ts',
    'src/i18n/index.ts',
    'public/_redirects',
    'package.json'
  ]
  
  const missingFiles = requiredFiles.filter(file => {
    const exists = fs.existsSync(path.join(__dirname, file))
    if (!exists) {
      console.log(`❌ 缺少文件: ${file}`)
    } else {
      console.log(`✅ 文件存在: ${file}`)
    }
    return !exists
  })
  
  return missingFiles.length === 0
}

function generateDNSRecords() {
  console.log('\n📋 DNS 记录配置:')
  console.log('在 Cloudflare DNS 中添加以下 CNAME 记录:\n')
  
  Object.entries(SUPPORTED_LOCALES).forEach(([code, config]) => {
    const subdomain = config.subdomain === 'www' ? 'www' : code
    console.log(`${subdomain.padEnd(4)} CNAME your-project.pages.dev`)
  })
}

function generateCustomDomains() {
  console.log('\n🌐 Cloudflare Pages 自定义域名:')
  console.log('在 Cloudflare Pages 控制台中添加以下自定义域名:\n')
  
  Object.entries(SUPPORTED_LOCALES).forEach(([code, config]) => {
    const subdomain = config.subdomain === 'www' ? 'www' : code
    console.log(`${subdomain}.${DOMAIN}`)
  })
}

function generateTestURLs() {
  console.log('\n🧪 测试 URL:')
  console.log('部署完成后，测试以下 URL:\n')
  
  Object.entries(SUPPORTED_LOCALES).forEach(([code, config]) => {
    const subdomain = config.subdomain === 'www' ? 'www' : code
    console.log(`https://${subdomain}.${DOMAIN} - ${config.name}`)
  })
}

function checkRedirectsFile() {
  console.log('\n🔄 检查重定向规则...')
  
  try {
    const redirectsContent = fs.readFileSync(path.join(__dirname, 'public/_redirects'), 'utf8')
    
    // 检查是否包含所有必要的子域名规则
    const hasAllSubdomains = Object.keys(SUPPORTED_LOCALES).every(code => {
      const subdomain = code === 'en' ? 'en' : code
      return redirectsContent.includes(`${subdomain}.${DOMAIN}`)
    })
    
    if (hasAllSubdomains) {
      console.log('✅ _redirects 文件配置正确')
    } else {
      console.log('⚠️  _redirects 文件可能缺少某些子域名配置')
    }
    
  } catch (error) {
    console.log('❌ 无法读取 _redirects 文件')
  }
}

function main() {
  console.log('🚀 多语种子域名部署检查\n')
  
  const filesOK = checkFiles()
  
  if (!filesOK) {
    console.log('\n❌ 请先修复缺少的文件，然后重新运行此脚本')
    process.exit(1)
  }
  
  checkRedirectsFile()
  generateDNSRecords()
  generateCustomDomains()
  generateTestURLs()
  
  console.log('\n📝 部署步骤:')
  console.log('1. 运行 npm run build 构建项目')
  console.log('2. 在 Cloudflare Pages 中添加上述自定义域名')
  console.log('3. 在 Cloudflare DNS 中添加上述 CNAME 记录')
  console.log('4. 等待 SSL 证书生成（通常需要几分钟）')
  console.log('5. 测试所有子域名 URL')
  
  console.log('\n✨ 配置完成后，用户可以通过不同的子域名访问不同语言版本的网站！')
}

if (require.main === module) {
  main()
}

module.exports = {
  SUPPORTED_LOCALES,
  DOMAIN,
  checkFiles,
  generateDNSRecords,
  generateCustomDomains,
  generateTestURLs
}