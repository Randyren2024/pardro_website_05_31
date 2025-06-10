# Strapi Content Types for AboutView.vue

本文档说明了为 AboutView.vue 页面创建的 Strapi 内容类型结构。

## 创建的内容类型

### 1. Company Info (单例类型)
**路径**: `src/api/company-info/content-types/company-info/schema.json`

用于存储公司基本信息、使命愿景、技术介绍等相对固定的内容。

**字段**:
- `title`: 公司标题
- `description`: 公司描述
- `overview_image`: 概览图片
- `stats`: 公司统计数据组件
- `mission`: 使命组件
- `vision`: 愿景组件
- `technology`: 技术信息组件

### 2. Company Values (集合类型)
**路径**: `src/api/company-value/content-types/company-value/schema.json`

管理企业价值观，支持动态增删改。

**字段**:
- `title`: 价值观名称
- `description`: 价值观描述
- `icon_component`: 图标组件名
- `icon_svg`: SVG图标代码
- `order`: 排序号
- `is_active`: 是否启用

### 3. Team Members (集合类型)
**路径**: `src/api/team-member/content-types/team-member/schema.json`

管理团队成员信息，支持排序和状态控制。

**字段**:
- `name`: 姓名
- `position`: 职位
- `bio`: 个人简介
- `profile_image`: 头像图片
- `key`: 唯一标识
- `order`: 显示顺序
- `is_active`: 是否显示

### 4. Page (集合类型)
**路径**: `src/api/page/content-types/page/schema.json`

管理网站页面的基本信息和SEO设置。

**字段**:
- `title`: 页面标题
- `slug`: 页面路径
- `content`: 页面内容
- `seo_title`: SEO标题
- `seo_description`: SEO描述
- `featured_image`: 特色图片
- `page_type`: 页面类型
- `page_sections`: 页面区块配置
- `hero_background`: 英雄区块背景
- `is_published`: 是否发布

### 5. Contact Info (单例类型)
**路径**: `src/api/contact-info/content-types/contact-info/schema.json`

管理联系信息和行动号召内容。

**字段**:
- `company_name`: 公司名称
- `address`: 地址
- `phone`: 电话
- `email`: 邮箱
- `website`: 网站
- `social_media`: 社交媒体
- `cta_title`: 行动号召标题
- `cta_description`: 行动号召描述
- `cta_button_text`: 按钮文字
- `cta_link`: 链接地址
- `business_hours`: 营业时间

## 组件 (Components)

### 1. Company Stats
**路径**: `src/components/company/stats.json`

公司统计数据组件。

### 2. Mission Vision
**路径**: `src/components/company/mission-vision.json`

使命或愿景声明组件。

### 3. Technology
**路径**: `src/components/company/technology.json`

技术和创新信息组件。

## 多语言支持

所有内容类型都启用了 i18n 插件，支持中文 (zh) 和英文 (en) 两种语言。

## 部署步骤

1. 确保已安装 Railway CLI
2. 在项目根目录运行 `railway link` 连接到 Railway 项目
3. 运行 `railway run npm install` 安装依赖
4. 运行 `railway run npm run develop` 启动开发服务器
5. 访问 `/admin` 端点创建管理员用户
6. 在管理面板中配置内容类型和添加内容

## API 使用

### 获取公司信息
```
GET /api/company-info?populate=*
```

### 获取公司价值观
```
GET /api/company-values?populate=*&sort=order:asc&filters[is_active][$eq]=true
```

### 获取团队成员
```
GET /api/team-members?populate=*&sort=order:asc&filters[is_active][$eq]=true
```

### 获取关于页面
```
GET /api/pages?populate=*&filters[slug][$eq]=about
```

### 获取联系信息
```
GET /api/contact-info?populate=*
```

## 注意事项

1. 首次部署后需要在 Strapi 管理面板中手动创建内容
2. 确保图片上传功能正常工作
3. 多语言内容需要分别创建中文和英文版本
4. 建议在生产环境中配置适当的权限和角色