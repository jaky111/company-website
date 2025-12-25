# **企业官网技术实施方案 (Technical Design Document)**

| 文档版本 | 修改日期 | 状态 | 关联PRD版本 |
| :---- | :---- | :---- | :---- |
| V1.0 | 2023-10-27 | 初始版本 | V1.0 |

## **1\. 技术选型 (Tech Stack)**

基于 PRD 中对 **SEO (搜索引擎优化)**、**响应式适配** 以及 **后台管理** 的强烈需求，推荐采用以下技术栈：

### **1.1 前端 (客户端 & 管理端)**

* **核心框架**: **Next.js 14+ (App Router)**  
  * *选型理由*: Next.js 提供主要的服务端渲染 (SSR) 和静态生成 (SSG) 能力，这对企业官网的 SEO 至关重要。同时 App Router 提供了更好的路由管理。  
* **开发语言**: **TypeScript**  
  * *选型理由*: 强类型约束，利于维护和减少运行时错误。  
* **UI 框架**: **Tailwind CSS** \+ **Shadcn/UI** (或 Ant Design)  
  * *选型理由*: Tailwind 能够极快地实现响应式布局；Shadcn/UI 提供高质量的无头组件，方便定制企业风格。  
* **状态管理**: Zustand (轻量级) 或 React Context。

### **1.2 后端 (API 服务)**

* **方案 A (Next.js 全栈 \- 推荐)**: 直接使用 Next.js 的 Route Handlers (/app/api) 处理后端逻辑。  
  * *优势*: 统一部署，维护成本低，适合中型企业官网。  
* **方案 B (独立后端)**: Node.js (NestJS) 或 Python (FastAPI)。  
  * *备注*: 除非业务极其复杂，否则本期项目推荐 **方案 A**。

### **1.3 数据库 & ORM**

* **数据库**: **PostgreSQL** (推荐) 或 MySQL。  
* **ORM**: **Prisma**。  
  * *选型理由*: 定义 Schema 清晰，自动生成类型定义，与 TypeScript 配合完美。

### **1.4 部署与基础设施**

* **容器化**: Docker (可选)。  
* **图片存储**: 阿里云 OSS / AWS S3 / MinIO (避免直接存入服务器文件系统)。

## **2\. 数据库设计 (Database Schema)**

基于 Prisma Schema Language 描述。

### **2.1 用户表 (User) \- 管理员**

model User {  
  id        String   @id @default(cuid())  
  username  String   @unique  
  password  String   // 加密存储  
  role      String   @default("ADMIN") // ADMIN, EDITOR  
  createdAt DateTime @default(now())  
  updatedAt DateTime @updatedAt  
}

### **2.2 产品表 (Product)**

model Product {  
  id          String   @id @default(cuid())  
  title       String  
  slug        String   @unique // URL友好名，如 product-a  
  summary     String   @db.Text // 简述  
  description String   @db.Text // 富文本详情  
  coverImage  String   // 缩略图URL  
  images      String\[\] // 图册 JSON 数组  
  categoryId  String  
  category    Category @relation(fields: \[categoryId\], references: \[id\])  
  isFeatured  Boolean  @default(false) // 是否首页推荐  
  pdfUrl      String?  // 产品手册下载链接  
  createdAt   DateTime @default(now())  
  updatedAt   DateTime @updatedAt  
}

model Category {  
  id       String    @id @default(cuid())  
  name     String  
  products Product\[\]  
}

### **2.3 新闻/文章表 (Post)**

model Post {  
  id        String   @id @default(cuid())  
  title     String  
  type      String   // 'COMPANY' | 'INDUSTRY'  
  content   String   @db.Text  
  author    String  
  views     Int      @default(0)  
  published Boolean  @default(true)  
  createdAt DateTime @default(now())  
}

### **2.4 留言/线索表 (Inquiry)**

model Inquiry {  
  id          String   @id @default(cuid())  
  name        String  
  phone       String  
  company     String?  
  description String?  @db.Text  
  status      String   @default("PENDING") // PENDING, PROCESSED  
  createdAt   DateTime @default(now())  
}

## **3\. 核心 API 接口定义**

### **3.1 公共接口 (Public)**

* GET /api/products: 获取产品列表（支持 ?category= 和 ?search= 参数）。  
* GET /api/products/:slug: 获取特定产品详情。  
* GET /api/posts: 获取新闻列表。  
* POST /api/inquiry: 提交留言表单（需包含简单的验证码逻辑或 Rate Limit）。

### **3.2 管理端接口 (Admin \- 需鉴权)**

* POST /api/auth/login: 管理员登录 (JWT)。  
* POST /api/upload: 文件上传接口 (返回 OSS URL)。  
* POST /api/products: 新增产品。  
* PATCH /api/products/:id: 更新产品。  
* DELETE /api/products/:id: 删除产品。  
* *(新闻管理接口同理)*

## **4\. 前端页面路由结构 (Next.js App Router)**

app/  
├── (site)                \# 官网前台布局组  
│   ├── page.tsx          \# 首页  
│   ├── about/            \# 关于我们  
│   ├── products/  
│   │   ├── page.tsx      \# 产品列表  
│   │   └── \[slug\]/       \# 产品详情页  
│   ├── news/             \# 新闻中心  
│   └── contact/          \# 联系我们  
├── (admin)               \# 后台管理布局组 (独立Layout，含侧边栏)  
│   ├── admin/  
│   │   ├── dashboard/    \# 数据概览  
│   │   ├── products/     \# 产品管理 CRUD  
│   │   ├── posts/        \# 文章管理 CRUD  
│   │   └── inquiries/    \# 留言查看  
├── api/                  \# 后端 API 路由  
└── layout.tsx            \# 全局 Root Layout

## **5\. 开发规范与注意事项**

1. **响应式断点**:  
   * Mobile: \< 640px  
   * Tablet: 640px \- 1024px  
   * Desktop: \> 1024px  
   * 开发时优先使用 Tailwind 前缀 (e.g., md:flex, lg:w-1/2)。  
2. **SEO 最佳实践**:  
   * 每个 page.tsx 必须导出 generateMetadata 函数，根据内容动态生成 Title 和 Description。  
   * 图片组件必须使用 Next.js 的 \<Image /\> 并填写 alt 属性。  
3. **安全性**:  
   * 留言接口必须在后端做字段长度和格式校验（Zod Schema）。  
   * 后台路由需通过 Middleware 进行 Session 拦截保护。