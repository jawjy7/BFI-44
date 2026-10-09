# BFI-44 Profile Studio

一个可部署、可分享链接的 BFI-44 人格报告工具。每位使用者打开同一个公开网址即可开始填写；“Condividi report”会生成带有 `#share=...` 的链接，答案和分析保存在 URL 片段中，不会发送到服务器。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 发布成可分享网址

将此项目导入 Vercel、Netlify 或其他支持 Next.js 的托管服务，部署后把公开地址发给别人即可。项目不需要数据库、后端或 AI API；本地保存使用浏览器 `localStorage`，分享使用 URL 的 hash 片段。

## 检查

```bash
npm test
npm run build
```
