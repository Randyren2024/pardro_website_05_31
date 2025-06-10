# Strapi Content Types 需求文档

## 项目概述

本文档定义了 Partdro 电商网站的 Strapi Content Types 架构，支持多语言内容管理。项目主要销售无人机、人形机器人和四足机器人，需要支持 6 种语言（英语、西班牙语、日语、德语、法语、泰语）。

## 实施阶段规划

### 第一阶段：基础页面（优先级：高）
- About Us 页面
- Contact Us 页面
- 验证 Railway 部署流程

### 第二阶段：产品页面（优先级：中）
- Product Landing Page
- 产品详情页增强

### 第三阶段：内容管理（优先级：中）
- Blog 系统
- 新闻/文章管理

### 第四阶段：法律页面（优先级：低）
- Terms & Services
- Privacy Policy

## Content Types 设计

### 1. Page（通用页面）- 第一阶段

**用途**: About Us, Contact Us 等静态页面

**字段结构**:
```json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": "通用页面内容管理"
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
    "content": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "seo_title": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "seo_description": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "featured_image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "page_type": {
      "type": "enumeration",
      "enum": ["about-us", "contact-us", "terms", "privacy", "other"],
      "default": "other",
      "required": true
    }
  }
}
```

### 2. Contact Info（联系信息）- 第一阶段

**用途**: Contact Us 页面的联系信息管理

**字段结构**:
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

### 3. Product（产品）- 第二阶段

**用途**: 扩展现有产品数据，支持 Landing Page

**字段结构**:
```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product",
    "description": "产品信息管理"
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
    "name": {
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
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "short_description": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "price": {
      "type": "decimal",
      "required": true
    },
    "category": {
      "type": "enumeration",
      "enum": ["drones", "humanoid-robots", "quadruped-robots"],
      "required": true
    },
    "features": {
      "type": "json",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "specifications": {
      "type": "json",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "images": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images"]
    },
    "is_featured": {
      "type": "boolean",
      "default": false
    },
    "is_new": {
      "type": "boolean",
      "default": false
    },
    "stock_quantity": {
      "type": "integer",
      "default": 0
    },
    "brand": {
      "type": "string"
    },
    "rating": {
      "type": "decimal",
      "min": 0,
      "max": 5
    },
    "review_count": {
      "type": "integer",
      "default": 0
    }
  }
}
```

### 4. Blog（博客）- 第三阶段

**用途**: 新闻、文章、技术博客管理

**字段结构**:
```json
{
  "kind": "collectionType",
  "collectionName": "blogs",
  "info": {
    "singularName": "blog",
    "pluralName": "blogs",
    "displayName": "Blog",
    "description": "博客文章管理"
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
    "content": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "excerpt": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "featured_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "category": {
      "type": "enumeration",
      "enum": ["news", "technology", "product-updates", "industry"],
      "required": true
    },
    "tags": {
      "type": "json"
    },
    "author": {
      "type": "string",
      "required": true
    },
    "published_date": {
      "type": "datetime",
      "required": true
    },
    "is_featured": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### 5. Legal Document（法律文档）- 第四阶段

**用途**: Terms & Services, Privacy Policy

**字段结构**:
```json
{
  "kind": "collectionType",
  "collectionName": "legal_documents",
  "info": {
    "singularName": "legal-document",
    "pluralName": "legal-documents",
    "displayName": "Legal Document",
    "description": "法律文档管理"
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
    "document_type": {
      "type": "enumeration",
      "enum": ["terms-of-service", "privacy-policy", "cookie-policy", "other"],
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "version": {
      "type": "string",
      "required": true
    },
    "effective_date": {
      "type": "date",
      "required": true
    },
    "last_updated": {
      "type": "datetime",
      "required": true
    }
  }
}
```

## API 端点规划

### 第一阶段 API

1. **Pages API**
   - `GET /api/pages` - 获取所有页面
   - `GET /api/pages?filters[page_type][$eq]=about-us` - 获取 About Us 页面
   - `GET /api/pages?filters[page_type][$eq]=contact-us` - 获取 Contact Us 页面

2. **Contact Info API**
   - `GET /api/contact-info` - 获取联系信息

### 多语言支持

所有 API 请求都支持 `locale` 参数：
- `GET /api/pages?locale=en`
- `GET /api/pages?locale=es`
- `GET /api/pages?locale=ja`
- `GET /api/pages?locale=de`
- `GET /api/pages?locale=fr`
- `GET /api/pages?locale=th`

## 前端集成计划

### 第一阶段：About Us 页面

1. 创建 `src/services/strapi.ts` - Strapi API 客户端
2. 创建 `src/views/AboutView.vue` - About Us 页面组件
3. 更新路由配置
4. 集成多语言支持

### 第一阶段：Contact Us 页面

1. 创建 `src/views/ContactView.vue` - Contact Us 页面组件
2. 集成联系信息 API
3. 添加联系表单（可选）

## 部署流程

### Railway CLI 工作流程

1. **环境准备**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **连接项目**
   ```bash
   railway link [project-id]
   ```

3. **创建 Content Types**
   - 在本地创建 `src/api/page/content-types/page/schema.json`
   - 在本地创建 `src/api/contact-info/content-types/contact-info/schema.json`
   - 创建对应的 controllers, services, routes

4. **部署到 Railway**
   ```bash
   railway up
   ```

5. **验证部署**
   - 检查 Strapi Admin 面板
   - 测试 API 端点
   - 验证多语言功能

## 技术要求

### Strapi 插件

1. **@strapi/plugin-i18n** - 国际化支持
2. **@strapi/plugin-users-permissions** - 用户权限管理
3. **@strapi/plugin-upload** - 文件上传

### 数据库

- PostgreSQL（Railway 提供）
- 支持多语言内容存储
- 自动备份和恢复

### 安全考虑

1. API 权限配置
2. CORS 设置
3. 环境变量管理
4. 数据验证和清理

## 测试计划

### 第一阶段测试

1. **API 测试**
   - 测试所有语言版本的 API 响应
   - 验证数据结构和字段完整性
   - 测试错误处理

2. **前端集成测试**
   - 测试页面加载和渲染
   - 验证多语言切换
   - 测试响应式设计

3. **部署测试**
   - 验证 Railway 部署流程
   - 测试生产环境 API
   - 检查性能和加载速度

## 后续扩展

### 可能的功能扩展

1. **用户评论系统**
2. **产品比较功能**
3. **搜索和过滤增强**
4. **邮件订阅管理**
5. **多媒体内容管理**
6. **SEO 优化工具**

### 性能优化

1. **CDN 集成**
2. **图片优化**
3. **缓存策略**
4. **API 响应优化**

---

## 实施时间表

- **第一阶段（1-2周）**: About Us + Contact Us + Railway 部署验证
- **第二阶段（1-2周）**: Product Landing Page
- **第三阶段（2-3周）**: Blog 系统
- **第四阶段（1周）**: Terms & Services + Privacy Policy

总预计时间：5-8周

---

*本文档将根据实施过程中的反馈和需求变化进行更新。*