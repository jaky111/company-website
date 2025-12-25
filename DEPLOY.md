# 部署指南 - 将您的企业网站发布到互联网

本文档将手把手教您如何将这个企业网站部署到互联网上,让全世界都能访问。

## 📋 部署前准备

在开始部署之前,您需要注册以下账号(全部免费):

1. **GitHub 账号** - 用于存储代码
   - 访问: https://github.com
   - 点击 "Sign up" 注册账号
   
2. **Vercel 账号** - 用于部署网站
   - 访问: https://vercel.com
   - 点击 "Sign Up" 并选择 "Continue with GitHub" (用 GitHub 账号登录)
   
3. **Supabase 账号** - 用于数据库服务
   - 访问: https://supabase.com
   - 点击 "Start your project" 并用 GitHub 账号登录

---

## 🚀 第一步: 将代码推送到 GitHub

### 1.1 初始化 Git 仓库

在项目根目录打开终端(命令行),依次执行以下命令:

\`\`\`bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 创建第一次提交
git commit -m "Initial commit: Enterprise website"
\`\`\`

### 1.2 在 GitHub 创建远程仓库

1. 登录 GitHub (https://github.com)
2. 点击右上角的 "+" 号,选择 "New repository"
3. 填写仓库信息:
   - **Repository name**: `company-website` (或您喜欢的名字)
   - **Description**: "企业官网"
   - **Public/Private**: 选择 Public (公开) 或 Private (私有)
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 1.3 关联并推送代码

GitHub 会显示一些命令,复制并在终端执行:

\`\`\`bash
# 添加远程仓库地址 (替换成您自己的仓库地址)
git remote add origin https://github.com/您的用户名/company-website.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
\`\`\`

✅ 完成后,刷新 GitHub 页面,您应该能看到所有代码文件。

---

## 🗄️ 第二步: 设置 Supabase 数据库

### 2.1 创建项目

1. 登录 Supabase (https://supabase.com)
2. 点击 "New project"
3. 填写项目信息:
   - **Name**: `company-website-db`
   - **Database Password**: 设置一个强密码(请记住!)
   - **Region**: 选择 "Northeast Asia (Tokyo)" (离中国最近)
4. 点击 "Create new project"
5. 等待 1-2 分钟,数据库创建完成

### 2.2 获取数据库连接字符串

1. 在项目页面,点击左侧菜单的 "Project Settings" (设置图标)
2. 点击 "Database"
3. 找到 "Connection string" 部分
4. 选择 "**Transaction**" 模式 (这很重要!)
5. 复制 "Connection string" 中的 URL
6. 将 URL 中的 `[YOUR-PASSWORD]` 替换成您刚才设置的数据库密码

**示例:**
\`\`\`
原始: postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
替换后: postgresql://postgres:您的密码@db.xxx.supabase.co:5432/postgres
\`\`\`

⚠️ **重要**: 请保存这个完整的连接字符串,稍后会用到!

### 2.3 运行数据库迁移

在本地终端执行:

\`\`\`bash
# 设置数据库 URL (临时,仅用于迁移)
# Windows PowerShell:
$env:DATABASE_URL="您刚才复制的完整连接字符串"

# 运行 Prisma 迁移
npx prisma migrate deploy

# 运行种子数据
npx prisma db seed
\`\`\`

✅ 完成后,您的 Supabase 数据库已经包含所有表和初始数据。

---

## 🌐 第三步: 在 Vercel 部署网站

### 3.1 导入项目

1. 登录 Vercel (https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 找到您的 GitHub 仓库 `company-website`,点击 "Import"

### 3.2 配置环境变量

在 "Configure Project" 页面:

1. 展开 "Environment Variables" (环境变量) 部分
2. 添加以下环境变量:

| Key (键) | Value (值) | 说明 |
|---------|-----------|------|
| \`DATABASE_URL\` | 您的 Supabase 连接字符串 | 数据库连接地址 |
| \`NEXTAUTH_URL\` | \`https://您的域名.vercel.app\` | 部署后会自动生成,先留空 |
| \`NEXTAUTH_SECRET\` | 您的 .env 文件中的值 | 认证密钥 |

**如何添加:**
- 在 "Key" 输入框输入键名(如 \`DATABASE_URL\`)
- 在 "Value" 输入框粘贴对应的值
- 点击 "Add" 按钮
- 重复以上步骤添加所有环境变量

### 3.3 部署

1. 确认所有环境变量已添加
2. 点击 "Deploy" 按钮
3. 等待 2-3 分钟,Vercel 会自动构建和部署您的网站

### 3.4 更新 NEXTAUTH_URL

1. 部署完成后,Vercel 会显示您的网站地址,例如: \`https://company-website-xxx.vercel.app\`
2. 复制这个地址
3. 在 Vercel 项目页面,点击 "Settings" → "Environment Variables"
4. 找到 \`NEXTAUTH_URL\`,点击编辑
5. 将值更新为您的完整网站地址
6. 点击 "Save"
7. 在 "Deployments" 页面,点击最新部署右侧的 "..." → "Redeploy"

✅ 完成!您的网站现在已经在线了!

---

## 🎉 访问您的网站

打开浏览器,访问 Vercel 提供的网址,您应该能看到:

- **前台网站**: \`https://您的域名.vercel.app\`
  - 首页、产品中心、新闻动态、关于我们、联系我们
  
- **后台管理**: \`https://您的域名.vercel.app/admin\`
  - 用户名: \`admin\`
  - 密码: \`admin123\`

---

## 🔧 常见问题

### Q1: 部署后访问网站出现 500 错误?
**A**: 检查环境变量是否正确设置,特别是 \`DATABASE_URL\` 必须使用 **Transaction** 模式的连接字符串。

### Q2: 登录后台时提示认证错误?
**A**: 确保 \`NEXTAUTH_URL\` 设置为您的完整网站地址,并且已经重新部署。

### Q3: 数据库连接失败?
**A**: 
1. 确认 Supabase 数据库已创建成功
2. 确认连接字符串中的密码已正确替换
3. 确认使用的是 **Transaction** 模式,不是 Session 模式

### Q4: 如何更新网站内容?
**A**: 
1. 在本地修改代码
2. 执行 \`git add .\` → \`git commit -m "更新说明"\` → \`git push\`
3. Vercel 会自动检测到更新并重新部署

---

## 📝 重要提示

1. **保护您的密码**: 不要将 \`.env\` 文件推送到 GitHub
2. **修改默认密码**: 部署后,请立即在后台修改管理员密码
3. **备份数据**: 定期在 Supabase 后台导出数据库备份
4. **自定义域名**: 在 Vercel 项目设置中可以绑定您自己的域名

---

## 🆘 需要帮助?

如果遇到问题:
1. 查看 Vercel 部署日志 (Deployments → 点击具体部署 → 查看 "Build Logs")
2. 查看 Supabase 数据库日志 (Database → Logs)
3. 检查浏览器控制台错误信息 (F12 → Console)

祝您部署顺利! 🎊
