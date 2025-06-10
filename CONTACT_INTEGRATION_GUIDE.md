# Contact Us 页面集成指南

本指南详细说明如何配置和使用 Contact Us 页面，包括 Strapi Contact Info 单一类型和 HubSpot 表单集成。

## 功能概述

Contact Us 页面提供以下功能：

1. **动态联系信息显示**：从 Strapi 后端获取联系信息
2. **多语言支持**：支持 6 种语言的联系信息
3. **联系表单**：用户可以提交询问
4. **HubSpot 集成**：表单数据自动提交到 HubSpot CRM
5. **响应式设计**：适配桌面端和移动端

## 1. Strapi Contact Info 配置

### 1.1 创建 Contact Info 单一类型

在 Strapi 后端创建 Contact Info 单一类型，包含以下字段：

```json
{
  "kind": "singleType",
  "collectionName": "contact_info",
  "info": {
    "singularName": "contact-info",
    "pluralName": "contact-infos",
    "displayName": "Contact Info",
    "description": "联系信息管理"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "company_name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "phone": {
      "type": "string"
    },
    "address": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "business_hours": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "social_media": {
      "type": "json",
      "required": false
    }
  }
}
```

### 1.2 配置字段说明

- **company_name**: 公司名称（必填）
- **email**: 联系邮箱（必填）
- **phone**: 联系电话（可选）
- **address**: 公司地址（可选，支持多语言）
- **business_hours**: 营业时间（可选，支持多语言）
- **social_media**: 社交媒体链接（JSON格式）

### 1.3 社交媒体字段格式

```json
{
  "facebook": "https://facebook.com/yourcompany",
  "twitter": "https://twitter.com/yourcompany",
  "linkedin": "https://linkedin.com/company/yourcompany",
  "instagram": "https://instagram.com/yourcompany"
}
```

### 1.4 API 权限配置

确保在 Strapi 中为 Contact Info 配置正确的 API 权限：

1. 进入 Settings > Users & Permissions Plugin > Roles > Public
2. 找到 Contact-info 部分
3. 勾选 `find` 权限
4. 保存设置

## 2. HubSpot 集成配置

### 2.1 获取 HubSpot 凭据

#### 方法 1：使用 HubSpot Forms API（推荐）

1. **获取 Portal ID**：
   - 登录 HubSpot 账户
   - 进入 Settings > Account Setup > Account Defaults
   - 复制 Hub ID（Portal ID）

2. **创建表单并获取 Form ID**：
   - 进入 Marketing > Lead Capture > Forms
   - 创建新表单或选择现有表单
   - 在表单设置中找到 Form ID

#### 方法 2：使用 HubSpot Contacts API（高级功能）

1. **创建私有应用**：
   - 进入 Settings > Integrations > Private Apps
   - 点击 "Create a private app"
   - 配置应用权限，至少需要 `crm.objects.contacts.write` 权限
   - 生成访问令牌

### 2.2 环境变量配置

复制 `.env.example` 文件为 `.env`，并填入你的 HubSpot 凭据：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# Strapi Backend Configuration
VITE_STRAPI_URL=http://localhost:1337

# HubSpot Integration Configuration
VITE_HUBSPOT_PORTAL_ID=your_actual_portal_id
VITE_HUBSPOT_FORM_ID=your_actual_form_id
VITE_HUBSPOT_ACCESS_TOKEN=your_actual_access_token
```

### 2.3 HubSpot 表单字段映射

表单数据会映射到以下 HubSpot 字段：

- `firstName` → `firstname`
- `lastName` → `lastname`
- `email` → `email`
- `phone` → `phone`
- `company` → `company`
- `message` → `message`
- `subject` → `subject`

## 3. 部署和测试

### 3.1 本地开发测试

1. **启动 Strapi 后端**：
   ```bash
   cd strapi-backend
   npm run develop
   ```

2. **配置 Contact Info 数据**：
   - 访问 http://localhost:1337/admin
   - 进入 Content Manager > Contact Info
   - 为每种语言添加联系信息

3. **启动前端开发服务器**：
   ```bash
   npm run dev
   ```

4. **测试页面**：
   - 访问 http://localhost:5173/contact
   - 验证联系信息显示
   - 测试表单提交功能

### 3.2 生产环境部署

1. **更新环境变量**：
   - 将 `VITE_STRAPI_URL` 设置为生产环境的 Strapi URL
   - 确保 HubSpot 凭据正确

2. **构建项目**：
   ```bash
   npm run build
   ```

3. **部署到 Cloudflare Pages**：
   - 推送代码到 Git 仓库
   - 在 Cloudflare Pages 中配置环境变量
   - 触发部署

## 4. 故障排除

### 4.1 常见问题

**问题 1：联系信息无法加载**
- 检查 Strapi 服务是否运行
- 验证 API 权限配置
- 检查网络连接和 CORS 设置

**问题 2：表单提交失败**
- 验证 HubSpot 凭据是否正确
- 检查 HubSpot 表单是否存在
- 查看浏览器控制台错误信息

**问题 3：多语言内容不显示**
- 确保在 Strapi 中为每种语言都添加了内容
- 检查 i18n 插件配置

### 4.2 调试技巧

1. **查看网络请求**：
   - 打开浏览器开发者工具
   - 查看 Network 标签页
   - 检查 API 请求和响应

2. **查看控制台日志**：
   - 检查浏览器控制台的错误信息
   - 查看服务端日志

3. **测试 API 端点**：
   ```bash
   # 测试 Strapi Contact Info API
   curl "http://localhost:1337/api/contact-info?locale=en&populate=*"
   
   # 测试 HubSpot Forms API
   curl -X POST "https://api.hsforms.com/submissions/v3/integration/submit/YOUR_PORTAL_ID/YOUR_FORM_ID" \
     -H "Content-Type: application/json" \
     -d '{"fields":[{"name":"email","value":"test@example.com"}]}'
   ```

## 5. 扩展功能

### 5.1 添加更多联系方式

可以在 Strapi Contact Info 中添加更多字段：
- WhatsApp 号码
- Skype ID
- 微信号
- 其他即时通讯方式

### 5.2 表单验证增强

可以添加更多表单验证：
- 电话号码格式验证
- 邮箱格式验证
- 消息长度限制
- 防垃圾邮件验证

### 5.3 集成其他 CRM 系统

除了 HubSpot，还可以集成：
- Salesforce
- Pipedrive
- Zoho CRM
- 自定义 CRM 系统

## 6. 安全注意事项

1. **环境变量安全**：
   - 不要将 `.env` 文件提交到版本控制
   - 在生产环境中使用安全的环境变量管理

2. **API 权限控制**：
   - 只开放必要的 API 权限
   - 定期审查和更新权限设置

3. **表单安全**：
   - 实施速率限制
   - 添加 CAPTCHA 验证
   - 过滤恶意内容

## 7. 性能优化

1. **缓存策略**：
   - 缓存联系信息数据
   - 使用 CDN 加速静态资源

2. **懒加载**：
   - 延迟加载非关键组件
   - 优化图片加载

3. **代码分割**：
   - 按路由分割代码
   - 优化打包体积

---

通过以上配置，你的 Contact Us 页面将具备完整的联系信息展示和表单提交功能，并能够与 Strapi 后端和 HubSpot CRM 无缝集成。