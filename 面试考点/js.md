# JS 常考点

## 1. ES 6 语法知道哪些，分别怎么用?

## 2. Promise、Promise.all、Promise.race 分别怎么用?

**Promise :**

```js
function fn() {
  return new Promise((resolve, reject) => {
    // 成功时调用
    resolve("data");
    // 失败时调用
    reject("error");
  });
}
fn().then(success, fail).then(success2, fail2);
```

**Promise.all :**

**promise1** 和 **promise2** 都成功才会调用 **success1**

```js
Promise.all([promise1, promise2]).then(success1, fail1);
```

## 3. 手写函数防抖和函数节流

## 4. 手写 AJAX

## 5. this

## 6. 闭包/立即执行函数是什么?

## 7. 什么是 JSONP，什么是 CORS，什么是跨域？

## 8. async/await 怎么用，如何捕获异常？

## 9. 如何实现深拷贝？

## 10. 如何用正则实现 trim()？

## 11. 不用 class 如何实现继承？用 class 又如何实现？

## 12. 如何实现数组去重？

## 13. == 相关问题

## 14. 手写一个 Promise
