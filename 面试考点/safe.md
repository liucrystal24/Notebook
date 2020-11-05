# 安全

## 1、XSS

### 什么是 XSS （ Cross-Site Scripting ）

用户提交恶意内容，显示在另一个用户的网页上，对用户的网页随意篡改。

用户 A 提交评论「 `< script >console.log(document.cookie)< /script >` 」，用户 B 来访问网站，这段脚本在 B 的浏览器直接执行，用户 A 的脚本就可以任意操作 B 的 cookie。

### 造成 XSS 的要点

1. 用户可以提交恶意内容

2. 提交的内容可以显示在另一个用户的页面上

3. 这些内容**未经过滤**，直接运行在另一个用户的页面上

### 如何预防

通过过滤，将可疑的符号 `<` 符号变成 `&lt;` （HTML 实体）

## 2、什么是 CSRF？如何预防？

https://zhuanlan.zhihu.com/p/22521378
