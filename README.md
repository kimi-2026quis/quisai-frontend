# QuisAI 服装电商数据分析平台

## 项目介绍

QuisAI 是一个专业的服装电商数据分析平台，提供以下功能：

- 📰 时尚新闻监控
- 📊 单品数据分析
- 🔬 面料情报
- 🛍️ 款式推荐
- 📊 竞品监控
- ⭐ 个人收藏与追踪

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 框架**: React 18
- **样式方案**: Tailwind CSS
- **类型系统**: TypeScript
- **数据获取**: 自定义爬虫服务（可替换）
- **AI 分析**: Coze 工作流

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
COZE_API_TOKEN=你的Coze API Token
COZE_APP_ID=你的Coze App ID
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 部署到 Coze Dev

### 1. 打包项目

```bash
# 在项目根目录执行
cd /workspace/projects/workspace
zip -r quisai-frontend.zip quisai-frontend/
```

### 2. 在 Coze Dev 中创建项目

1. 打开 [www.coze.cn](https://www.coze.cn)
2. 登录账号
3. 点击「新建项目」→「上传 ZIP 包」
4. 上传 `quisai-frontend.zip`
5. 框架选择：Next.js
6. Node 版本：v18.x 或 v20.x
7. 点击部署

### 3. 配置环境变量

在 Coze Dev 项目设置中添加：

```
COZE_API_TOKEN=pat_jm351A6D8Z3bSoq4yDFpXHkZTdTxlIWzJzjPQ3jILVTQIYCCaH4sfG3qdclaf8Sg
COZE_APP_ID=1182224705275
```

### 4. 访问预览

部署完成后，点击生成的预览链接即可访问网站。

## 爬虫服务架构

本项目采用可替换的爬虫服务架构：

### 核心接口

```typescript
interface ScraperService {
  searchNews(keyword: string, category?: string): Promise<NewsItem[]>
  analyzeProduct(...): Promise<ProductAnalysis>
  searchFabric(...): Promise<FabricItem[]>
  getStyleRecommendations(...): Promise<StyleRecommendation[]>
  monitorCompetitor(...): Promise<CompetitorData>
}
```

### 默认实现

项目包含基于 Coze API 的默认实现，位于 `src/lib/scraper-service.ts`。

### 替换爬虫服务

1. 创建新的爬虫服务实现类
2. 实现所有 `ScraperService` 接口方法
3. 在 `src/lib/scraper-service.ts` 中替换默认实现

示例：

```typescript
// 创建自定义爬虫服务
class CustomScraperService implements ScraperService {
  // 实现所有接口方法
}

// 在 scraper-service.ts 中替换
export const scraperService = new CustomScraperService()
```

## 项目结构

```
quisai-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   ├── news/
│   │   │   ├── analysis/
│   │   │   ├── fabric/
│   │   │   └── recommend/
│   │   ├── layout.tsx         # 全局布局
│   │   ├── page.tsx           # 首页
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── layout/            # 布局组件
│   │   ├── home/              # 首页组件
│   │   └── common/            # 通用组件
│   └── lib/                   # 工具库
│       └── scraper-service.ts # 爬虫服务
├── public/                     # 静态资源
├── package.json
├── next.config.js             # Next.js 配置
├── tailwind.config.js         # Tailwind CSS 配置
└── tsconfig.json              # TypeScript 配置
```

## API 接口

### 新闻搜索
```
GET /api/news/search?keyword={keyword}&category={category}
```

### 产品分析
```
GET /api/analysis/search?keyword={keyword}&categoryLevel1={categoryLevel1}&categoryLevel2={categoryLevel2}&platforms={platforms}&timeRange={timeRange}
```

### 面料搜索
```
GET /api/fabric/search?material={material}&searchSources={sources}&minPrice={min}&maxPrice={max}
```

### 款式推荐
```
GET /api/recommend/search?category={category}&minPrice={min}&maxPrice={max}&season={season}
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开发注意事项

1. **环境变量**: 确保 `.env` 文件配置正确
2. **API Token**: Coze API Token 需要有足够的权限
3. **爬虫服务**: 默认使用 Coze API，可根据需要替换
4. **数据格式**: 所有 API 返回的数据格式应符合 TypeScript 接口定义

## 常见问题

### Q: 如何更换爬虫服务？

A: 在 `src/lib/scraper-service.ts` 中替换 `scraperService` 实例即可。

### Q: Coze API 调用失败怎么办？

A: 检查 API Token 和 App ID 是否正确，确保有足够的权限。

### Q: 如何添加新的数据源？

A: 实现新的爬虫服务类，替换默认实现即可。

## 许可证

MIT License

## 联系方式

- 项目地址: https://github.com/your-repo/quisai-frontend
- 问题反馈: https://github.com/your-repo/quisai-frontend/issues