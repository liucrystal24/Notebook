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

- Token 保存在 Session 中。假如 Token 保存在 Cookie 中，用户浏览器开了很多页面。在一些页面 Token 被使用消耗掉后新的 Token 会被重新种入，但那些老的 Tab 页面对应的 HTML 里还是老 Token。这会让用户觉得为啥几分钟前打开的页面不能正常提交？

- 尽量少用 GET。假如攻击者在我们的网站上传了一张图片，用户在加载图片的时候实际上是向攻击者的服务器发送了请求，这个请求会带有 referer 表示当前图片所在的页面的 url。 而如果使用 GET 方式接口的话这个 URL 就形如： https://xxxx.com/gift?giftId=aabbcc&_csrf_token=xxxxx ，那相当于攻击者就获取了\_csrf_token，短时间内可以使用这个 token 来操作其他 GET 接口。
