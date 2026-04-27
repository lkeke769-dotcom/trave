# 个人旅游网站 - GitHub Pages 部署指南

## 项目简介

这是一个功能完整、视觉吸引力强的个人旅游网站，包含以下核心模块：

### 功能特点

✅ **旅行博客** - 支持图文混排、分类标签和搜索功能
✅ **旅行相册** - 支持图片轮播、全屏查看和相册分类
✅ **旅行攻略** - 包含详细介绍、实用信息和地图位置
✅ **关于博主** - 个人介绍页面，包含统计数据和技能展示
✅ **联系表单** - 带有表单验证的联系方式
✅ **响应式设计** - 完美适配桌面端、平板和移动设备
✅ **性能优化** - 图片懒加载、SEO 友好的 URL 结构
✅ **交互体验** - 平滑滚动、滚动监听、动画效果

## 部署到 GitHub Pages

### 方法一：使用 GitHub 网页界面（推荐新手）

1. **创建 GitHub 仓库**
   - 登录 GitHub
   - 点击右上角 "+" → "New repository"
   - 仓库名填写：`trave`（或其他你喜欢的名字）
   - 选择 Public（公开）
   - 点击 "Create repository"

2. **上传文件**
   - 在仓库页面，点击 "uploading an existing file"
   - 将本项目所有文件拖拽上传
   - 点击 "Commit changes"

3. **启用 GitHub Pages**
   - 进入仓库 "Settings" 设置
   - 左侧菜单找到 "Pages"
   - 在 "Source" 下选择 "main" 分支
   - 点击 "Save"
   - 等待 1-2 分钟，你的网站将发布到：`https://yourusername.github.io/trave/`

### 方法二：使用 Git 命令行

```bash
# 1. 初始化 Git 仓库
cd trave
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "初始提交：个人旅游网站"

# 4. 添加远程仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/trave.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main

# 6. 启用 GitHub Pages
# - 在 GitHub 仓库页面 → Settings → Pages
# - Source 选择 "main" 分支 → Save
```

### 方法三：使用 GitHub CLI

```bash
# 1. 安装 GitHub CLI: https://cli.github.com/

# 2. 登录 GitHub
gh auth login

# 3. 创建仓库并推送
cd trave
git init
git add .
git commit -m "初始提交"
gh repo create trave --public --source=. --remote=origin --push

# 4. 启用 GitHub Pages（需要手动在 Settings 中设置）
```

## 自定义配置

### 修改网站标题和描述

编辑 `index.html` 文件头部：

```html
<title>你的网站标题</title>
<meta name="description" content="你的网站描述">
<meta name="author" content="你的名字">
```

### 修改博主信息

编辑 `#about` 部分：
- 姓名、个人介绍
- 统计数据（国家数、城市数等）
- 社交媒体链接

### 修改联系方式

编辑 `#contact` 部分：
- 邮箱地址
- 微信号
- 当前位置

### 替换图片

当前使用 picsum.photos 作为占位图片，你可以：

1. **使用自己的图片**
   - 创建 `images/` 文件夹
   - 将图片放入文件夹
   - 修改 HTML 中的 `src` 路径

2. **使用其他图床**
   - Unsplash: `https://source.unsplash.com/`
   - Pexels: `https://www.pexels.com/`

### 添加新的博客文章

在 `#blog` 部分复制以下代码块并修改内容：

```html
<article class="blog-card" data-category="asia">
    <div class="blog-card__image">
        <img src="图片路径" alt="文章标题" loading="lazy">
        <span class="blog-card__category">分类</span>
    </div>
    <div class="blog-card__content">
        <div class="blog-card__meta">
            <time class="blog-card__date">日期</time>
            <span class="blog-card__read-time">阅读时间</span>
        </div>
        <h3 class="blog-card__title">标题</h3>
        <p class="blog-card__excerpt">摘要</p>
        <a href="#" class="blog-card__link">阅读全文</a>
    </div>
</article>
```

### 添加新的相册图片

在 `#gallery` 部分复制以下代码块：

```html
<div class="gallery__item" data-album="nature">
    <img src="图片路径" alt="图片描述" loading="lazy">
    <div class="gallery__item-overlay">
        <button class="gallery__item-btn" aria-label="全屏查看">
            <!-- SVG 图标 -->
        </button>
    </div>
</div>
```

### 添加新的目的地

在 `#destinations` 部分复制目的地卡片并修改内容。

### 修改颜色主题

编辑 `css/style.css` 文件顶部的 CSS 变量：

```css
:root {
  --primary: #2563eb;        /* 主题色 */
  --secondary: #f59e0b;      /* 辅助色 */
  --accent: #10b981;         /* 强调色 */
  /* ... 更多颜色变量 */
}
```

### SEO 优化

1. 编辑 `sitemap.xml`，将 `yourusername` 替换为你的 GitHub 用户名
2. 编辑 `robots.txt`，同样替换用户名
3. 在 Google Search Console 中添加你的网站

## 本地预览

```bash
# 使用 Python 内置服务器
python -m http.server 8080

# 然后在浏览器中访问
http://localhost:8080
```

## 文件结构

```
trave/
├── index.html          # 主页
├── 404.html            # 404 错误页面
├── sitemap.xml         # 网站地图
├── robots.txt          # 爬虫配置
├── .nojekyll           # 禁用 Jekyll 处理
├── css/
│   ├── style.css       # 主样式表
│   └── responsive.css  # 响应式样式
└── js/
    └── main.js         # 主 JavaScript
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 在 GitHub 上提交 Issue
- 发送邮件至：your-email@example.com

---

享受你的旅行博客之旅！✈️🌍📸
