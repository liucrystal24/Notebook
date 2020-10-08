# JS 常考点

## 1. ES 6 语法知道哪些，分别怎么用?

:link: [ES6](https://fangyinghang.com/es-6-tutorials/)

- ### let

  `let` 不会声明提前，在变量初始化前访问该变量会导致 `ReferenceError`。该变量处在一个自块顶部到初始化处理的“暂存死区”中

  ```js
  function do_something() {
    console.log(bar); // undefined
    console.log(foo); // ReferenceError
    var bar = 1;
    let foo = 2;
  }
  ```

  `let` 不会在全局声明时（在最顶部的范围）创建 window 对象的属性

  ```js
  var a = "global";
  let a = "global";
  console.log(this.x); // "global"
  console.log(this.y); // undefined
  ```

  用在块级作用域中时, `let` 将变量的作用域限制在块内, 而 `var` 声明的变量的作用域是在函数内

  ```js
  var a = 1;
  var b = 2;

  if (a === 1) {
    var a = 11; // the scope is global
    let b = 22; // the scope is inside the if-block

    console.log(a); // 11
    console.log(b); // 22
  }

  console.log(a); // 11
  console.log(b); // 2
  ```

- ### const

  `const` 不仅拥有 `let` 的特性，还拥有其他特性。

  `const` 声明创建一个值的只读引用。不能和它所在作用域内的其他变量或函数拥有相同的名称。

  ```js
  const MY_NUM = 7;
  MY_NUM = 10; // 报错， 不能重新赋值常量

  const MY_OBJ = { key: "val" };
  const MY_OBJ = { key: "val2" }; // 报错，不能重写对象
  MY_OBJ.key = "val3"; // 可以修改，对象属性并不在保护的范围内

  const MY_ARR = [1, 2];
  const MY_ARR = [1, 2, 3]; // 报错，不能重写数组
  MY_ARR.push(3); // 可以向数组填充数据
  ```

- ### 箭头函数

  箭头函数表达式的语法比函数表达式更简洁，并且没有自己的 `this`，`arguments`，`super` 或 `new.target`

  箭头函数表达式更适用于那些本来需要 **匿名函数** 的地方，并且它 **不能用作构造函数**

  ### 语法

  ```js
  (param1, param2, …, paramN) => expression
  // 相当于：(param1, param2, …, paramN) =>{ return expression; }

  // 当只有一个参数时，圆括号是可选的：
  (singleParam) => { statements }
  singleParam => { statements }

  // 没有参数的函数应该写成一对圆括号。
  () => { statements }

  // 加括号的函数体返回对象字面量表达式：
  params => ({foo: bar})

  //箭头函数在参数和箭头之间不能换行。
  var func = ()
            => 1;

  // 空的箭头函数返回 undefined
  let empty = () => {};

  ```

  ### 更简洁的写法

  ```js
  var elements = ["Hydrogen", "Helium", "Lithium", "Beryllium"];
  // 普通写法
  elements.map(function (element) {
    return element.length;
  });
  // 箭头函数写法
  elements.map((element) => element.length);
  ```

  ### 没有单独的 this

  箭头函数不会创建自己的 this,它只会从自己的 **作用域链的上一层继承** this。

  ```js
  function Person() {
    this.age = 0;

    setInterval(() => {
      this.age++; // |this| 正确地指向 p 实例
    }, 1000);
  }
  var p = new Person();
  ```

  ### 不绑定 arguments

  箭头函数不绑定 Arguments 对象

  ```js
  var foo = function () {
    console.log(arguments[0]);
  };
  foo(1); // 1

  var arr = () => {
    console.log(arguments[0]);
  };
  arr(1); // ReferenceError: arguments is not defined
  ```

  在大多数情况下，使用剩余参数是相较使用 arguments 对象的更好选择。

  ```js
  function foo(arg1, arg2) {
    var f = (...args) => args[1];
    return f(arg1, arg2);
  }
  foo(1, 2); //2
  ```

  ### 使用 new 操作符

  箭头函数不能用作构造器，和 new 一起用会抛出错误。

  ```js
  var Foo = () => {};
  var foo = new Foo(); // TypeError: Foo is not a constructor
  ```

  ### 箭头函数的闭包

  ```js
  // 标准闭包
  function A() {
    var a = 1;
    return function () {
      return ++a;
    };
  }
  var v = A();
  v();
  v();
  ```

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

```js
var request = new XMLHttpRequest();
request.open("GET", "/a/b/c?name=ff", true);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText);
  }
};
request.send();
```

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
