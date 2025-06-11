# 产品落地页 Strapi Content Type 设计与部署指南

## 概述

本文档详细说明如何在 Strapi 中设计和部署产品落地页（Product Landing Page）Content Type，以支持灵活的产品展示页面。该设计基于模块化组件架构，支持多语言和动态内容布局。

## 核心设计理念

### 1. 模块化组件架构
- 使用 Dynamic Zone 实现灵活的页面布局
- 可重用的组件设计，便于维护和扩展
- 支持不同产品类型的个性化展示需求

### 2. 图片资源管理
- 通过 Strapi Media Library 统一管理所有图片资源
- 支持多格式图片上传（JPEG、PNG、WebP等）
- 自动生成不同尺寸的响应式图片
- 图片 SEO 优化（alt 标签、文件名等）

### 3. 多语言支持
- 基于 Strapi i18n 插件实现
- 支持内容本地化和 URL 国际化
- 独立的语言版本管理

## Content Type 设计

### Product Landing Page Content Type

```json
{
  "kind": "collectionType",
  "collectionName": "product_landing_pages",
  "info": {
    "singularName": "product-landing-page",
    "pluralName": "product-landing-pages",
    "displayName": "Product Landing Page",
    "description": "专门用于产品落地页的内容类型"
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
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "product": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::product.product"
    },
    "brand": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "tags": {
      "type": "enumeration",
      "enum": ["new", "hot", "featured", "bestseller", "limited"],
      "multiple": true
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images"]
    },
    "content": {
      "type": "dynamiczone",
      "components": [
        "landing.hero-section",
        "landing.feature-list",
        "landing.specifications-table",
        "landing.image-gallery",
        "landing.testimonials",
        "landing.faq-section",
        "landing.cta-section",
        "landing.related-products"
      ]
    },
    "seo": {
      "type": "component",
      "component": "shared.seo",
      "required": false
    }
  }
}
```

## 组件设计

### 1. Hero Section 组件

```json
{
  "collectionName": "components_landing_hero_sections",
  "info": {
    "displayName": "Hero Section",
    "description": "产品落地页头部英雄区块"
  },
  "attributes": {
    "headline": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "subheadline": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "backgroundImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "ctaButton": {
      "type": "component",
      "component": "shared.button"
    }
  }
}
```

### 2. Feature List 组件

```json
{
  "collectionName": "components_landing_feature_lists",
  "info": {
    "displayName": "Feature List",
    "description": "产品特性列表"
  },
  "attributes": {
    "title": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "features": {
      "type": "component",
      "repeatable": true,
      "component": "landing.feature-item"
    }
  }
}
```

### 3. Feature Item 组件

```json
{
  "collectionName": "components_landing_feature_items",
  "info": {
    "displayName": "Feature Item",
    "description": "单个产品特性项目"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "description": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "icon": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    }
  }
}
```

### 4. Image Gallery 组件

```json
{
  "collectionName": "components_landing_image_galleries",
  "info": {
    "displayName": "Image Gallery",
    "description": "产品图片画廊组件"
  },
  "attributes": {
    "title": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "images": {
      "type": "media",
      "multiple": true,
      "required": true,
      "allowedTypes": ["images"]
    },
    "layout": {
      "type": "enumeration",
      "enum": ["grid", "carousel", "masonry"],
      "default": "grid"
    }
  }
}
```

### 5. Specifications Table 组件

```json
{
  "collectionName": "components_landing_specifications_tables",
  "info": {
    "displayName": "Specifications Table",
    "description": "产品规格参数表格"
  },
  "attributes": {
    "title": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "specifications": {
      "type": "component",
      "repeatable": true,
      "component": "shared.key-value-pair"
    }
  }
}
```

### 6. Testimonials 组件

```json
{
  "collectionName": "components_landing_testimonials",
  "info": {
    "displayName": "Testimonials",
    "description": "客户评价组件"
  },
  "attributes": {
    "title": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "testimonials": {
      "type": "component",
      "repeatable": true,
      "component": "shared.testimonial"
    }
  }
}
```

## Strapi 部署与集成

### 1. 环境准备

#### 系统要求
- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器
- 数据库（PostgreSQL、MySQL 或 SQLite）
- 至少 1GB RAM

#### 安装依赖
```bash
# 进入 Strapi 后端目录
cd strapi-backend

# 安装依赖
npm install

# 安装 i18n 插件（如果未安装）
npm install @strapi/plugin-i18n
```

### 2. Content Type 部署步骤

#### 步骤 1：创建共享组件

1. 在 Strapi 管理面板中，导航到 "Content-Type Builder"
2. 创建以下共享组件：
   - `shared.button`
   - `shared.key-value-pair`
   - `shared.testimonial`
   - `shared.seo`

#### 步骤 2：创建 Landing 组件

按照上述 JSON 配置，依次创建：
- `landing.hero-section`
- `landing.feature-list`
- `landing.feature-item`
- `landing.image-gallery`
- `landing.specifications-table`
- `landing.testimonials`
- `landing.faq-section`
- `landing.cta-section`
- `landing.related-products`

#### 步骤 3：创建 Product Landing Page Content Type

1. 在 Content-Type Builder 中创建新的 Collection Type
2. 按照上述 JSON 配置添加所有字段
3. 配置关联关系和多语言设置
4. 保存并重启 Strapi

### 3. Media Library 配置

#### 上传设置
```javascript
// config/plugins.js
module.exports = {
  upload: {
    config: {
      sizeLimit: 10 * 1024 * 1024, // 10MB
      formats: ['jpeg', 'jpg', 'png', 'webp', 'svg'],
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      }
    }
  }
};
```

#### 图片优化
```javascript
// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 4. 多语言配置

#### 启用 i18n 插件
```javascript
// config/plugins.js
module.exports = {
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'zh',
      locales: ['zh', 'en', 'es', 'ru', 'ja', 'de', 'fr', 'th']
    }
  }
};
```

### 5. API 端点配置

#### 自定义路由
```javascript
// src/api/product-landing-page/routes/product-landing-page.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/product-landing-pages',
      handler: 'product-landing-page.find',
      config: {
        populate: {
          product: true,
          featuredImage: true,
          gallery: true,
          content: {
            populate: '*'
          },
          seo: true
        }
      }
    },
    {
      method: 'GET',
      path: '/product-landing-pages/:slug',
      handler: 'product-landing-page.findBySlug',
      config: {
        populate: {
          product: true,
          featuredImage: true,
          gallery: true,
          content: {
            populate: '*'
          },
          seo: true
        }
      }
    }
  ]
};
```

#### 自定义控制器
```javascript
// src/api/product-landing-page/controllers/product-landing-page.js
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-landing-page.product-landing-page', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    
    const entity = await strapi.entityService.findMany('api::product-landing-page.product-landing-page', {
      filters: { slug },
      locale,
      populate: {
        product: true,
        featuredImage: true,
        gallery: true,
        content: {
          populate: '*'
        },
        seo: true
      }
    });
    
    if (!entity || entity.length === 0) {
      return ctx.notFound('Product landing page not found');
    }
    
    return this.transformResponse(entity[0]);
  }
}));
```

### 6. 前端集成

#### API 调用示例
```typescript
// 获取产品落地页数据
export async function getProductLandingPage(slug: string, locale: string = 'zh') {
  const response = await fetch(
    `${STRAPI_URL}/api/product-landing-pages/${slug}?locale=${locale}&populate=*`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch product landing page');
  }
  
  return response.json();
}

// 获取所有产品落地页
export async function getProductLandingPages(locale: string = 'zh') {
  const response = await fetch(
    `${STRAPI_URL}/api/product-landing-pages?locale=${locale}&populate=*`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch product landing pages');
  }
  
  return response.json();
}
```

#### 组件渲染示例
```tsx
// ProductLandingPage.tsx
import React from 'react';
import { HeroSection } from './components/HeroSection';
import { FeatureList } from './components/FeatureList';
import { ImageGallery } from './components/ImageGallery';
import { SpecificationsTable } from './components/SpecificationsTable';

interface ProductLandingPageProps {
  data: any;
}

export const ProductLandingPage: React.FC<ProductLandingPageProps> = ({ data }) => {
  const { title, brand, tags, featuredImage, gallery, content } = data.attributes;
  
  const renderComponent = (component: any) => {
    switch (component.__component) {
      case 'landing.hero-section':
        return <HeroSection key={component.id} data={component} />;
      case 'landing.feature-list':
        return <FeatureList key={component.id} data={component} />;
      case 'landing.image-gallery':
        return <ImageGallery key={component.id} data={component} />;
      case 'landing.specifications-table':
        return <SpecificationsTable key={component.id} data={component} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="product-landing-page">
      <header>
        <h1>{title}</h1>
        <p className="brand">{brand}</p>
        {tags && (
          <div className="tags">
            {tags.map((tag: string) => (
              <span key={tag} className={`tag tag-${tag}`}>{tag}</span>
            ))}
          </div>
        )}
      </header>
      
      {featuredImage && (
        <img 
          src={`${STRAPI_URL}${featuredImage.data.attributes.url}`}
          alt={featuredImage.data.attributes.alternativeText || title}
          className="featured-image"
        />
      )}
      
      <main>
        {content.map(renderComponent)}
      </main>
    </div>
  );
};
```

## 部署最佳实践

### 1. 生产环境配置

#### 环境变量
```bash
# .env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

# 数据库配置
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=false

# 文件上传配置
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

#### 数据库配置
```javascript
// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        key: env('DATABASE_SSL_KEY', undefined),
        cert: env('DATABASE_SSL_CERT', undefined),
        ca: env('DATABASE_SSL_CA', undefined),
        capath: env('DATABASE_SSL_CAPATH', undefined),
        cipher: env('DATABASE_SSL_CIPHER', undefined),
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
      },
      schema: env('DATABASE_SCHEMA', 'public'),
    },
    debug: false,
  },
});
```

### 2. 性能优化

#### 缓存配置
```javascript
// config/plugins.js
module.exports = {
  'rest-cache': {
    enabled: true,
    config: {
      provider: {
        name: 'memory',
        options: {
          max: 32767,
          maxAge: 3600000, // 1 hour
        },
      },
      strategy: {
        contentTypes: [
          'api::product-landing-page.product-landing-page',
        ],
      },
    },
  },
};
```

### 3. 安全配置

#### CORS 设置
```javascript
// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'https://your-frontend-domain.com']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 数据迁移策略

### 1. 从现有 Product 数据迁移

```javascript
// scripts/migrate-products.js
const strapi = require('@strapi/strapi');

async function migrateProducts() {
  const app = await strapi().load();
  
  try {
    // 获取所有产品
    const products = await strapi.entityService.findMany('api::product.product', {
      populate: ['images', 'category']
    });
    
    for (const product of products) {
      // 创建对应的产品落地页
      await strapi.entityService.create('api::product-landing-page.product-landing-page', {
        data: {
          title: product.name,
          slug: product.slug,
          product: product.id,
          brand: product.brand || 'Unknown',
          tags: product.featured ? ['featured'] : [],
          featuredImage: product.images?.[0]?.id,
          gallery: product.images?.slice(1).map(img => img.id),
          content: [
            {
              __component: 'landing.hero-section',
              headline: product.name,
              subheadline: product.shortDescription
            },
            {
              __component: 'landing.feature-list',
              title: 'Key Features',
              features: product.features?.map(feature => ({
                __component: 'landing.feature-item',
                title: feature.name,
                description: feature.description
              })) || []
            }
          ],
          publishedAt: new Date()
        }
      });
    }
    
    console.log(`Migrated ${products.length} products to landing pages`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await app.destroy();
  }
}

migrateProducts();
```

### 2. 运行迁移

```bash
# 在 Strapi 项目根目录下运行
node scripts/migrate-products.js
```

## 总结

本指南提供了完整的产品落地页 Strapi Content Type 设计和部署方案，主要特点包括：

1. **模块化设计**：使用 Dynamic Zone 和可重用组件
2. **图片管理**：通过 Media Library 统一管理，支持响应式图片
3. **多语言支持**：基于 i18n 插件的完整国际化方案
4. **性能优化**：缓存策略和数据库优化
5. **安全配置**：CORS、CSP 等安全措施
6. **部署友好**：环境变量配置和生产环境优化

通过这个设计，可以灵活地创建各种类型的产品落地页，同时保持内容管理的便利性和系统的可扩展性。