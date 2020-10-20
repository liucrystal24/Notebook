# http

## 一、HTTP 状态码知道哪些？分别什么意思？

### 1xx 继续

100 继续

### 2xx 成功

200 请求成功
201 已创建
204 无内容

### 3xx 重定向，需要进一步操作

301 永久重定向
302 临时重定向
304 没有修改

### 4xx 客户端出错

400 请求语法错误
401 权限出错，需要登录
403 不允许访问
404 没有找到网页
405 方法不被允许
414 请求过长

### 5xx 服务端出错

500 服务器内部错误
502 网关，代理服务器错误

## 二、HTTP 缓存有哪几种？

- **ETag**：通过对比浏览器和服务器资源的特征值（如 MD5）来决定是否要发送文件内容，如果一样就只发送 304（not modified）

- **Expires**：是设置过期时间（绝对时间），但是如果用户的本地时间错乱了，可能会有问题

- **CacheControl**：max-age=3600 是设置过期时长（相对时间），跟本地时间无关。

## 三、GET 和 POST 的区别

- GET 一般用于获取资源，POST 用于提交资源
- GET 参数通过 Url 传递，POST 放在 Request body 中，相对安全
- GET 参数数据类型只接受 ASCII 字符，而 POST 没有限制
- GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有
- GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留
- GET 在浏览器回退时是无害的，而 POST 会再次提交请求

## 四、Cookie / LocalStorage / SessionStorage / Session

- ### Cookie / LocalStorage

  - Cookie 会被发送到服务器，LocalStorage 不会

  - Cookie 一般最大 4k，LocalStorage 可以用 5Mb 甚至 10Mb

- ### LocalStorage / SessionStorage

  - LocalStorage 一般不会自动过期（除非用户手动清除），SessionStorage 在回话结束时过期（如关闭浏览器）

- ### Cookie / Session

  - Cookie 存在浏览器的文件里，Session 存在服务器的文件里

  - Session 是基于 Cookie 实现的，具体做法就是把 SessionID 存在 Cookie 里
