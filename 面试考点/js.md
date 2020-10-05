# JS 常考点

## 1. ES 6 语法知道哪些，分别怎么用?

:link: [ES6](https://fangyinghang.com/es-6-tutorials/)

- let
- const
- 箭头函数
- Promise
- 展开操作符
- 默认参数
- import
- export

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

```js
Promise.all([promise1, promise2]).then(success1, fail1);
```

:point_right: **promise1** 和 **promise2** 都成功才会调用 **success1**

**Promise.race :**

```js
Promise.race([promise1, promise2]).then(success1, fail1);
```

- **promise1** 和 **promise2** 只要有一个成功就会调用 **success1**；
- **promise1** 和 **promise2** 只要有一个失败就会调用 **fail1**；
- 总之，谁第一个成功或失败，就认为是 race 的成功或失败。

## 3. 手写函数节流和函数防抖

- ### 函数节流

  ```js
  // 节流（一段时间执行一次之后，就不执行第二次）
  function throttle(fn, delay) {
    let canuse = true;
    return function () {
      if (!canuse) {
        console.log("正在节流，不执行");
        return;
      }
      // 为了在 delay 秒内点击时，确保不执行
      canuse = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        canuse = true;
      }, delay);
    };
  }
  
  const throttled = throttle(() => console.log("hi"), 2000);
  throttled(); // 2s后打印 'hi'
  throttled(); // 直接打印 '正在节流，不执行'
  ```

- ### 函数防抖

  ```js
  // 防抖（一段时间会等，然后带着一起做了）
  function debounce(fn, delay) {
    let timerId = null;
    return function () {
      const context = this;
      if (timerId) {
        window.clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.apply(context, arguments);
        timerId = null;
      }, delay);
    };
  }
  const debounced = debounce(() => console.log("hi"));
  debounced();
  debounced();
  ```

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
