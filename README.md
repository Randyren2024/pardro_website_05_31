# Partdro 网站项目

## 🚀 技术栈
- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite 5
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **多语言支持**: Vue I18n
- **UI组件库**: Ant Design Vue
- **类型系统**: TypeScript

## ✨ 功能特性
- 响应式电商界面
- 多语言支持（英语、中文、日语等8种语言）
- 产品分类浏览与搜索
- 购物车与结算功能
- 用户账户管理
- 产品对比功能
- 深色/浅色主题切换

## 🛠️ 开发指南

### 环境要求
- Node.js v18+
- npm v9+

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 本地预览生产版本
```bash
npm run preview
```

## 📂 项目结构
```
pardro_website_05_31/
├── public/              # 静态资源
│   ├── _redirects       # SPA路由回退配置
│   └── vite.svg
├── src/
│   ├── assets/          # 项目资源文件
│   ├── components/      # 可复用组件
│   │   ├── common/      # 通用组件(语言选择/主题切换)
│   │   ├── layout/      # 布局组件(页头/页脚)
│   │   └── product/     # 产品相关组件
│   ├── data/            # 静态数据(产品/分类/语言)
│   ├── i18n/            # 多语言配置
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理
│   ├── types/           # TypeScript类型定义
│   ├── views/           # 页面视图组件
│   ├── App.vue          # 根组件
│   └── main.ts          # 应用入口
├── .gitignore           # Git忽略规则
├── index.html           # 主HTML文件
├── package.json         # 项目配置
├── README.md            # 项目文档
├── tsconfig.json        # TypeScript配置
└── vite.config.ts       # Vite配置
```

## ☁️ Cloudflare Pages 部署指南

### 前置要求
- Cloudflare 账号
- 已连接 GitHub 仓库

### 部署步骤
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择 "Pages" → "Create a project"
3. 选择你的 GitHub 仓库
4. 配置构建设置:
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
5. 点击 "Save and Deploy"

### SPA路由配置
项目已包含 `public/_redirects` 文件处理路由回退:
```
/*  /index.html  200
```

### 环境变量配置
在项目设置 → "Environment variables" 添加环境变量:
- 格式: `VITE_APP_VAR_NAME=value`
- 在代码中使用: `import.meta.env.VITE_APP_VAR_NAME`

### 自定义域名
1. 在 "Custom domains" 添加域名
2. 按照提示配置 DNS 记录

### 部署前验证
1. 本地构建测试:
   ```bash
   npm run build
   ```
2. 检查 `dist` 目录:
   - 确保包含 `index.html` 和资源文件
   - 验证静态资源路径正确
3. 本地预览:
   ```bash
   npm run preview
   ```

> **PowerShell用户注意**  
> 在PowerShell中请使用以下命令替代连续执行：
> ```powershell
> npm run build
> if ($?) { npm run preview }
> ```

## 🤝 贡献指南
1. 创建新分支: `git checkout -b feature/your-feature`
2. 提交更改: `git commit -m "描述你的更改"`
3. 推送分支: `git push origin feature/your-feature`
4. 创建 Pull Request
5. 通过代码审查后合并到主分支

---

> 项目状态: 已配置SPA路由回退，可直接部署到Cloudflare Pages  
> 部署路径: 根路径  
> 最后更新: 2025-05-31