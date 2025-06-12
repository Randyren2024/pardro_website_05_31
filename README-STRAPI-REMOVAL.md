# Strapi CMS 功能移除说明

## 概述

本项目已移除与 Strapi CMS 的集成功能，改为使用静态配置文件。这一变更简化了项目部署流程，消除了对外部 CMS 的依赖，同时保持了原有的功能。

## 变更内容

1. **移除的内容**：
   - `src/services/strapi.ts` 服务文件
   - Strapi 后端子模块 (`strapi-backend`)
   - `.env` 中的 Strapi 相关配置 (`VITE_STRAPI_URL`)

2. **新增的内容**：
   - `src/config/contactInfo.ts` - 静态联系信息配置文件

3. **修改的内容**：
   - `src/views/ContactView.vue` - 更新为使用静态配置
   - `.gitmodules` - 移除 Strapi 子模块引用

## 静态配置使用说明

### 联系信息

联系信息现在存储在 `src/config/contactInfo.ts` 文件中。如需修改联系信息，请直接编辑此文件中的 `defaultContactInfo` 和 `localizedContactInfo` 对象。

```typescript
// 示例：修改默认联系信息
const defaultContactInfo: ContactInfo = {
  id: 1,
  attributes: {
    company_name: 'Your Company Name',
    email: 'your.email@example.com',
    // 其他字段...
  }
}
```

### 多语言支持

静态配置保留了多语言支持功能。每种语言的联系信息存储在 `localizedContactInfo` 对象中：

```typescript
const localizedContactInfo: Record<string, ContactInfo> = {
  en: defaultContactInfo,
  es: { /* 西班牙语配置 */ },
  // 其他语言...
}
```

## 页面内容

原先从 Strapi 获取的页面内容功能已被简化。如需添加静态页面内容，请修改 `src/config/contactInfo.ts` 文件中的 `getPageByType` 和 `getPages` 函数。

## 注意事项

1. 此变更不影响 HubSpot 表单集成功能，联系表单仍然可以正常工作。
2. 如需恢复 Strapi 集成，请参考项目历史版本。
3. 静态配置适合内容变更不频繁的场景，如需频繁更新内容，可考虑其他 CMS 解决方案。