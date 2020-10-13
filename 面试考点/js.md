# JS 常考点

## 1. ES 6 语法知道哪些，分别怎么用?

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

- ### Promise

  Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值

  ```js
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });

  promise1.then((value) => {
    console.log(value);
  });

  // 3秒后打印 foo
  ```

- ### 展开操作符

  在函数调用/数组构造时, 将数组表达式或者 `string` 在语法层面展开;

  在构造字面量对象时, 将对象表达式按 `key-value` 的方式展开

  ### 等价于 apply 的方式

  ```js
  function sum(x, y, z) {
    return x + y + z;
  }

  const numbers = [1, 2, 3];

  console.log(sum(...numbers)); // 6

  console.log(sum.apply(null, numbers)); // 6
  ```

  ### 数组拷贝(copy)

  ```js
  var arr = [1, 2, 3];
  var arr2 = [...arr]; // like arr.slice()
  arr2.push(4);

  // arr2 此时变成 [1, 2, 3, 4]
  // arr 不受影响
  ```

  :warning: 展开语法和 `Object.assign()` 行为一致, 执行的都是 **浅拷贝** (只遍历一层)

  ### 连接多个数组

  ```js
  var arr1 = [0, 1, 2];
  var arr2 = [3, 4, 5];
  var arr3 = [...arr1, ...arr2];
  ```

  ### 构造字面量对象时使用展开语法

  **浅拷贝** 和 **对象合并** , 可以使用更简短的展开语法。而不必再使用 `Object.assign()` 方式

  ```js
  var obj1 = { foo: "bar", x: 42 };
  var obj2 = { foo: "baz", y: 13 };

  var clonedObj = { ...obj1 };
  // 克隆后的对象: { foo: "bar", x: 42 }

  var mergedObj = { ...obj1, ...obj2 };
  // 合并后的对象: { foo: "baz", x: 42, y: 13 }
  ```

- ### 默认参数

  JavaScript 中函数的参数默认是 `undefined`。然而，在某些情况下可能需要设置一个不同的默认值。这是默认参数可以帮助的地方。

  ```js
  function multiply(a, b = 1) {
    return a * b;
  }

  console.log(multiply(5, 2)); // 10

  console.log(multiply(5)); // 5
  ```

- 解构赋值

  解构赋值语法是一种 `Javascript 表达式`可以将**属性 / 值**从 **对象 / 数组** 中取出,赋值给其他变量

  ### 解构数组

  ```js
  let a, b, rest;

  [a, b, ...rest] = [10, 20, 30, 40, 50];

  console.log(a, b, rest); // 10 20 [30,40,50]
  ```

  ### 解构对象

  ```js
  var o = { p: 42, q: true };
  var { p, q } = o;

  console.log(p); // 42
  console.log(q); // true
  ```

  ### 交换变量

  ```js
  var a = 1;
  var b = 3;

  [a, b] = [b, a];
  console.log(a); // 3
  console.log(b); // 1
  ```

## 2. Promise、Promise.all、Promise.race 分别怎么用?

- ### Promise :

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

- ### Promise.all :

  ```js
  Promise.all([promise1, promise2]).then(success1, fail1);
  ```

  :point_right: **promise1** 和 **promise2** 都成功才会调用 **success1**

- ### Promise.race :

  ```js
  Promise.race([promise1, promise2]).then(success1, fail1);
  ```

  :point_right: **promise1** , **promise2** 中第一个成功或失败，就认为结果成功或失败。

## 3. 手写函数节流和函数防抖

- ### 函数节流 （控制频率）

  连续触发事件但是在 n 秒中只执行一次函数

  ```js
  function throttle(fn, delay) {
    let canuse = true;
    return function () {
      if (!canuse) {
        // 为了方便理解，这里打印，实际不需要，可以直接 return;
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

- ### 函数防抖 （控制次数）

  触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

  - 延迟执行

  ```js
  function debounce(fn, delay) {
    let timerId = null;
    return function () {
      if (timerId) clearTimeout(timerId);

      timerId = setTimeout(() => {
        fn.apply(this, arguments);
        timerId = null;
      }, delay);
    };
  }

  const debounced = debounce(() => console.log("hi"), 1000);
  debounced(); // 不打印
  debounced(); // 1秒后打印 hi
  ```

  - 立即执行

  ```js
  function debounce(fn, delay) {
    let timerId = null;
    return function () {
      if (timerId) clearTimeout(timerId);

      let callNow = !timerId;

      timerId = setTimeout(() => {
        timerId = null;
      }, delay);

      if (callNow) fn.apply(this, arguments);
    };
  }

  const debounced = debounce(() => console.log("hi"), 1000);
  debounced(); // 立即打印 hi
  debounced(); // 不打印（ 需要在 1s后执行才打印 ）
  ```

## 4. 手写 AJAX

```js
const request = new XMLHttpRequest();
request.open("GET", "a/b/c?id=1", true);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText);
  }
};
// post 方法需要在 send() 中传参
request.send();
```

## 5. this

- fn()
  this => **window / global**

- obj.fn()
  this => **obj**

- fn.call(xx) / fn.apply(xx) / fn.bind(xx)
  this => **xx**

- new Fn()
  this => **新的对象**

- fn = () => {}
  this => **外面的 this**

## 6. 闭包/立即执行函数是什么?

- ### 闭包

  当函数可以 **记住并访问所在的词法作用域时**，就产生了闭包，即使函数是在 **当前词法作用域之外执行**

  ```js
  function foo() {
    var a = 2;
    function bar() {
      console.log(a);
    }
    return bar;
  }
  var baz = foo();
  baz(); //2
  ```

  - `bar( )` 在自己定义的 **词法作用域以外的地方执行**

  - 由于 `bar( )` 所声明的位置，它拥有涵盖 `foo( )` 内部作用域的闭包，使得该作用域能够一直存活，以供 `bar( )` 在之后任何时间进行引用

  - `bar( )` 依然持有对该作用域的引用，而这个引用就叫作闭包

  ### 经典问题

  希望每秒输出一次,分别为 1~5，实际每秒输出一次,都是 6

  ```js
  for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  }
  ```

  :point_right: **延迟函数的回调会在循环结束时才执行** ，尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被 **封闭在一个共享的全局作用域中** ，因此实际上只有一个 i。我们需要更多的闭包作用域，特别是在循环的过程中**每个迭代都需要一个闭包作用域**

  改进 1：

  ```js
  for (var i = 1; i <= 5; i++) {
    (function () {
      var j = i; // 需要有自己的变量，用来在每个迭代中储存i的值
      setTimeout(function timer() {
        console.log(j);
      }, j * 1000);
    })();
  }
  ```

  改进 2：

  :point_right: for 循环头部的 **let** 声明 , 变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量

  ```js
  for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  }
  ```

- ### 立刻执行函数

  概念：声明一个匿名函数，马上调用这个匿名函数

  作用：创建一个独立的作用域，避免「变量污染」

## 7. 什么是 JSONP，什么是 CORS，什么是跨域？

- ### JSONP ( JSON with padding )

  ### 原理

  利用 < script > 标签 **没有跨域限制** , 达到与第三方通讯。

  ### 实现

  1.本站脚本创建一个 < script > 元素，地址指向第三方的 API 网址，API **提供一个回调函数 ( 给前端接收数据 )**

  2.浏览器调动 **callback 函数** ，并传递解析后 **json 对象** 作为参数。本站脚本可在 callback 函数里处理所传入的数据

  ### 简单封装 JSONP

  ```js
  function jsonp(setting) {
    setting.data = setting.data || {};
    setting.key = setting.key || "callback";
    setting.callback = setting.callback || function () {};
    setting.data[setting.key] = "__onGetData__";

    window.__onGetData__ = function (data) {
      setting.callback(data);
    };

    var script = document.createElement("script");
    var query = [];
    for (var key in setting.data) {
      query.push(key + "=" + encodeURIComponent(setting.data[key]));
    }
    script.src = setting.url + "?" + query.join("&");
    document.head.appendChild(script);
    document.head.removeChild(script);
  }

  jsonp({
    url: "http://photo.sina.cn/aj/index",
    key: "jsoncallback",
    data: {
      page: 1,
      cate: "recommend",
    },
    callback: function (ret) {
      console.log(ret);
    },
  });
  ```

- ### CORS

  跨源资源共享 (CORS) 是一种机制，该机制使用附加的 HTTP 头来告诉浏览器，准许运行在一个源上的 Web 应用访问位于另一不同源选定的资源。

## 8. async/await 怎么用，如何捕获异常？

> 一个异步函数由 `async` 关键字定义，`async` 和 `await` 关键字可以使得对有等待时间的（异步），以 Promise 为基础的函数的定义更加简洁优雅，减少特意配置对于 promise 的链式调用。

`async 函数` 返回的是 **Promise 对象** , `async / await` 是 Promise 的语法糖。用 `try/catch` 捕获异常，**try** 对应 **resolve** ，**catch** 对应 **reject**

### 定义一个返回 Promise 的 foo

```js
function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let n = parseInt(Math.random() * 5 + 1, 10);
      if (n <= 3) {
        resolve("小：" + n);
      } else {
        reject("大：" + n);
      }
    }, 2000);
  });
}
```

### Promise 链式处理

```js
foo().then(
  (data) => {
    console.log("success " + data);
  },
  (error) => {
    console.log("fail " + error);
  }
);
```

### async / await 函数处理

```js
async function bar() {
  let result = await foo();
  try {
    console.log("success " + result);
  } catch (error) {
    console.log("fail " + error);
  }
}
bar();
```

## 9. 如何实现深拷贝？

:books: https://juejin.im/post/6844903929705136141 + video

### 要点

- 递归
- 判断类型
- 检查环（ 循环引用 ）
- 需要忽略原型

## 10. 如何用正则实现 trim()？

:books: https://www.bilibili.com/video/BV1ef4y1U7V4?from=search&seid=3176001865319661104

```js
function trim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}
```

## 11. 不用 class 如何实现继承？用 class 又如何实现？

### 不用 class

? 查一下

```js

```

### class 实现继承

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  shout() {
    console.log("miao");
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
  move() {
    console.log("run");
  }
}

let tom = new Cat("tom", "yellow");
```

## 12. 如何实现数组去重？

## 13. == 相关问题

## 14. 手写一个 Promise
