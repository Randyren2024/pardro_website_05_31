# 多语种子域名配置指南

本项目已配置为支持多语种子域名架构，从 `www.partdro.com` 扩展到 `en.partdro.com`、`es.partdro.com`、`ja.partdro.com` 等。

## 支持的语言和子域名

- `www.partdro.com` - 英语（默认）
- `es.partdro.com` - 西班牙语
- `ja.partdro.com` - 日语
- `de.partdro.com` - 德语
- `fr.partdro.com` - 法语
- `ru.partdro.com` - 俄语
- `th.partdro.com` - 泰语
- `uk.partdro.com` - 乌克兰语

## Cloudflare Pages 配置步骤

### 1. 自定义域名设置

在 Cloudflare Pages 控制台中，为你的项目添加以下自定义域名：

```
www.partdro.com
es.partdro.com
ja.partdro.com
de.partdro.com
fr.partdro.com
ru.partdro.com
th.partdro.com
uk.partdro.com
```

### 2. DNS 记录配置

在 Cloudflare DNS 管理中添加以下 CNAME 记录：

```
www    CNAME    your-project.pages.dev

es     CNAME    your-project.pages.dev
ja     CNAME    your-project.pages.dev
de     CNAME    your-project.pages.dev
fr     CNAME    your-project.pages.dev
ru     CNAME    your-project.pages.dev
th     CNAME    your-project.pages.dev
uk     CNAME    your-project.pages.dev
```

### 3. SSL/TLS 证书

Cloudflare 会自动为所有子域名生成 SSL 证书。确保：
- SSL/TLS 加密模式设置为 "Full" 或 "Full (strict)"
- "Always Use HTTPS" 已启用

## 代码实现说明

### 核心文件

1. **`src/utils/subdomain.ts`** - 子域名检测和语言切换逻辑
2. **`src/i18n/index.ts`** - 更新的国际化配置
3. **`src/main.ts`** - 应用启动时的语言检测
4. **`src/components/common/LanguageSelector.vue`** - 语言切换组件
5. **`public/_redirects`** - Cloudflare Pages 重定向规则

### 工作原理

1. **语言检测**：应用启动时检测当前子域名来确定语言
2. **语言切换**：用户切换语言时重定向到对应的子域名
3. **开发环境**：使用 URL 参数 `?lang=xx` 进行语言切换
4. **生产环境**：使用子域名进行语言切换

## 开发和测试

### 本地开发

```bash
npm run dev
```

在本地开发时，使用 URL 参数切换语言：
- `http://localhost:5173/?lang=en`
- `http://localhost:5173/?lang=es`
- `http://localhost:5173/?lang=ja`

### 本地测试子域名

如需在本地测试子域名功能，可以修改 hosts 文件：

```
127.0.0.1 www.partdro.local

127.0.0.1 es.partdro.local
127.0.0.1 ja.partdro.local
```

然后访问 `http://www.partdro.local:5173`

## 部署注意事项

1. **构建命令**：`npm run build`
2. **输出目录**：`dist`
3. **环境变量**：无需额外配置
4. **重定向规则**：已在 `public/_redirects` 中配置

## SEO 优化建议

1. **hreflang 标签**：在每个页面添加 hreflang 标签指向其他语言版本
2. **sitemap**：为每个语言创建单独的 sitemap
3. **robots.txt**：确保所有子域名都有正确的 robots.txt
4. **canonical URL**：设置正确的 canonical URL 避免重复内容

## 故障排除

### 常见问题

1. **子域名无法访问**
   - 检查 DNS 记录是否正确配置
   - 确认 Cloudflare Pages 中已添加自定义域名

2. **语言切换不工作**
   - 检查浏览器控制台是否有错误
   - 确认 `src/utils/subdomain.ts` 中的域名配置正确

3. **SSL 证书问题**
   - 等待 Cloudflare 自动生成证书（通常需要几分钟）
   - 检查 SSL/TLS 设置

### 调试工具

在浏览器控制台中运行以下代码来调试：

```javascript
// 检查当前检测到的语言
console.log('Current locale:', window.location.hostname.split('.')[0])

// 检查语言切换 URL 生成
import { generateLanguageUrl } from './src/utils/subdomain'
console.log('Spanish URL:', generateLanguageUrl('es', '/category/1'))
```