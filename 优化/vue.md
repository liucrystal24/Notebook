# Vue 优化

## 一、优化首页的加载速度

### 分析原因

因为它是一个单页应用，需要将所有需要的资源都下载到浏览器端并解析

### 解决办法

- 代码拆分。code split、动态 import
- CDN 加载资源（ externals ）
- 减少 http 请求
- 开启服务器 Gzip 压缩，JS、CSS 文件压缩合并
- 使用 ssr 减少前端跑 js 的时间，逻辑放服务端处理把完整的页面返回
- 多页面 + 单页面组合，需要修改 webpack 的 entry
- 增加 lodaing、骨架屏
