# vue 项目部署在阿里云

## 1. vue

打包前端项目，打包好的项目在 `dist` 目录下：

```js
npm run build
```

:point_right: ​补充和 api 端口不一样时的 vue 设置

## 2. 阿里云（windows server 2018R）

### 1. 添加安全组 端口号（阿里云后台管理）

:point_right: ​添加截图

### 2. 添加入站规则 TCP 端口号 （server）

:point_right: ​添加截图

## 3. nginx

### 1. nginx 配置

:point_right: ​`nginx.con`:

```
添加配置项
```

### 2. nginx 启动

:point_right: ​添加启动:

```shell
-c
```
