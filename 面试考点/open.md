# 开放问题

## 一、你遇到最难的问题是怎样解决的？

`eventLoop` 举例

### 1、遇到问题 ，网上搜索，解决基本

分为 **node** ，**浏览器** 两种方式

### 2、发现之前的解决方案存在 bug，继续查询资料（ 官方文档，github issue ）

发现同一种代码，运行结果不同，发现 Eventloop 启动需要时间，应放在 setTimeout 中执行，保证 Eventloop 已经成功启动

### 3、解决并 github 分享

:link: [EventLoop 总结](https://github.com/liucrystal24/Notebook/blob/master/%E9%9D%A2%E8%AF%95%E8%80%83%E7%82%B9/Eventloop.md)

## 二、你在团队的突出贡献是什么？

每周组织前端分享，了解最新前端技术

## 三、最近在关注什么新技术？

react hook，并做了一个 Demo :link: [macos-desk](https://github.com/liucrystal24/macos-desk)

## 四、有没有看什么源码，有什么记忆深刻的地方或收获？

**underscore.js** 是一个 JavaScript 工具库，它提供了一整套函数式编程的实用功能，比如数组有 `map` 方法，但是对象没有,使用如下：

```js
let arr1 = [1, 4, 9];
arr1.map(Math.sqrt); // [1,2,3]

// 用 undersore 来实现：
_.map({ a: 1, b: 2, c: 3 }, (v, k) => k + "=" + v); // ['a=1', 'b=2', 'c=3']
```

### 源码分析

https://github.com/webproblem/Blog/issues/13
