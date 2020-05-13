# Scope & Closures

## 1. 作用域是什么

作用域是一套规则，用于确定在何处以及如何查找变量（标识符）。

#### :star: LHS 查询: 找到变量的容器本身，并对其赋值( 目标 )

```js
var a = 2;
```

:point_right: JavaScript 引擎首先会在代码执行前对其进行编译，var a = 2 会被分解成两个独立的步骤:

1. var a ; 在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。

2. a = 2 ; 会查询（LHS 查询）变量 a 并对其进行赋值。

#### :star: RHS 查询: 获取变量的值( 源头 )

```js
console.log(a);
foo(2);
```

- LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要（也就是说它们没有找到所需的标识符），就会向上级作用域继续查找目标标识符，这样每次上升一级作用域（一层楼），最后抵达全局作用域（顶层），无论找到或没找到都将停止。

- 不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS 引用会导致自动隐式地创建一个**全局变量**（非严格模式下），该变量使用 LHS 引用的目标作为标识符，或者抛出 ReferenceError 异常（严格模式下）。

  ```js
  var a = 2;
  b = a;
  //LHS查询失败，自动创建一个全局变量b
  console.log(c);
  // Uncaught ReferenceError: c is not defined
  ```

## 2. 词法作用域

- 词法作用域意味着作用域是由书写代码时**函数声明的位置**来决定的。

- JavaScript 中有两个机制可以“欺骗”词法作用域：eval(..) 和 with。

1.  #### eval(...):

    :point_right: 对一段包含一个或多个声明的“代码”字符串进行演算，并借此来<font color=ff0000>修改已经存在的词法作用域</font>（在运行时）

    ```js
    function foo(str, a) {
      eval(str); // 欺骗！
      console.log(a, b);
    }
    var b = 2;
    foo("var b = 3;", 1); // 1, 3
    ```

2.  #### with:

    :point_right: 通过将一个对象的引用当作作用域来处理，将对象的属性当作作用域中的标识符来处理，从而<font color=ff0000>创建了一个新的词法作用域</font>（在运行时）

    ```js
    function foo(obj) {
      with (obj) {
        a = 2;
      }
    }
    var o1 = {
      a: 3,
    };
    var o2 = {
      b: 3,
    };
    foo(o1);
    console.log(o1.a); // 2
    foo(o2);
    console.log(o2.a); // undefined
    console.log(a); // 2  a被泄漏到全局作用域上了！
    ```

    :point_right: 尽管 with 块可以将一个对象处理为词法作用域，但是这个块内部正常的 var 声明并不会被限制在这个块的作用域中，而是被添加到 with 所处的函数作用域中。

    :point_right: 当我们传递 o1 给 with 时，with 所声明的作用域是 o1，而这个作用域中含有一个同 o1.a 属性相符的标识符。但当我们将 o2 作为作用域时，其中并没有 a 标识符，因此进行了正常的 LHS 标识符查找,a 声明成全局变量。

    :x: 这两个机制的副作用是引擎无法在编译时对作用域查找进行优化，不要使用它们。

## 3. 函数作用域和块作用域

#### :star: 函数作用域:

- 函数是 JavaScript 中最常见的作用域单元。本质上，声明在一个函数内部的变量或函数会在所处的作用域中“隐藏”起来，这是有意为之的良好软件的设计原则。

  ```javascript
  // 1. 隐藏函数，不污染全局
  function foo() {
    var b = 5;
    function bar() {
      console.log(b);
    }
  }
  bar(); // Uncaught ReferenceError: bar is not defined
  foo();
  console.log(b); // ReferenceError: b is not defined

  // 2.函数自执行
  var a = 2;
  (function foo1(global) {
    var a = 3;
    console.log(a); //3
    console.log(global.a); //2
  })(window); // 浏览器环境，将 window 作为形参 global 传入

  // 传入函数，和上面同义
  (function foo2() {
    def(window); // 浏览器环境
  })(function def(global) {
    var a = 3;
    console.log(a); //3
    console.log(global.a); //2
  });
  ```

#### :star: 块作用域:

- 函数不是唯一的作用域单元。块作用域指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块（通常指 { .. } 内部）。

  ```js
  // i 属于 (..), 也属于 {..}
  for (var i = 0; i < 3; i++) {
    console.log(i);
  }
  ```

- 从 ES3 开始，try/catch 结构在 catch 分句中具有块作用域。

  ```javascript
  try {
    undefined(); // 执行一个非法操作来强制制造一个异常
  } catch (err) {
    console.log(err); // 能够正常执行！
  }
  console.log(err); // ReferenceError: err is not defined
  ```

  :point_right: err 仅存在 catch 分句内部，当试图从别处引用它时会抛出错误。

- 在 ES6 中引入了 let 关键字，用来在任意代码块中声明变量。if(..) { let a = 2; } 会声明一个劫持了 if 的 { .. } 块的变量，并且将变量添加到这个块中。

  ```javascript
  var a = true;
  if (a) {
    var b = 1;
  }
  if (a) {
    let c = 2;
  }
  console.log(b); // 1
  console.log(c); // ReferenceError: c is not defined
  ```

  :point_right: 此处使用 var 声明变量时，它写在哪里都是一样的，因为它们最终都会属于外部作用域。但是 let 声明变量时，c 在 { } 块级作用域中，外部无法直接获取。

## 4. 提升 :sparkles::sparkles::sparkles:

#### :star: 提升: 包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理,这个过程就好像变量和函数声明从它们在代码中出现的位置被“移动”到了最上面。

```javascript
console.log(a); //undefined
var a = 2;
```

:point_down: 函数执行顺序:

```js
var a; // 定义声明是在编译阶段进行的
console.log(a);
a = 2; // 赋值声明会被留在原地等待执行阶段
```

- <font color=#ff0000>函数声明</font>会<font color=#ff0000>提升</font>，<font color=#ff0000>函数表达式</font>不会<font color=#ff0000>提升</font>。
  ```javascript
  foo(); // TypeError: foo is not a function
  bar(); // 我是函数声明，我会提升
  // 函数表达式
  var foo = function bar() {
    console.log("函数表达式");
  };
  // 函数声明
  function bar() {
    console.log("我是函数声明，我会提升");
  }
  ```
- 函数声明和变量声明都会被提升。函数会首先被提升，然后才是变量,后函数声明会覆盖前函数声明

  ```js
  console.log(foo); // function(){...}

  var foo = 5;

  function foo() {
    console.log(1);
  }

  function foo() {
    console.log(2);
  }
  console.log(foo); //5
  ```

  :point_down: 函数执行顺序:

  ```js
  function foo() {
    console.log(1);
  }
  function foo() {
    console.log(2);
  }
  // 重复的 var 声明会被忽略掉,所以忽略这个 var;
  // var foo;
  console.log(foo);
  foo = 5;
  console.log(foo);
  ```

## 5. 作用域闭包

> &emsp;&emsp;当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

```javascript
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

### 理解:

&emsp;&emsp;bar()显然可以被正常执行。但是在这个例子中，它在自己定义的<font color=ff0000>词法作用域以外的地方执行</font>。foo()执行后，通常 foo()的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收器用来释放不再使用的内存空间。由于 bar()所声明的位置，<font color=ff0000>它拥有涵盖 foo()内部作用域的闭包</font>，使得该作用域能够一直存活，以供 bar()在之后任何时间进行引用。bar()依然持有对该作用域的引用，而这个引用就叫作闭包。

#### 例 1:

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
// 希望每秒输出一次,分别为1~6
// 实际每秒输出一次,都是6
```

### 理解:

&emsp;&emsp;<font color=ff0000>延迟函数的回调会在循环结束时才执行</font>，尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个 i。我们需要更多的闭包作用域，特别是在循环的过程中每个迭代都需要一个闭包作用域。

#### 改进 1:

```javascript
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i; // 需要有自己的变量，用来在每个迭代中储存i的值
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
```

#### 改进 2:

let 将一个块转换成一个可以被关闭的作用域

```javascript
for (var i = 1; i <= 5; i++) {
  let j = i; // 闭包的块作用域
  setTimeout(function timer() {
    console.log(j);
  }, j * 1000);
}
```

#### 改进 3:

for 循环头部的 let 声明,变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

#### 例 2:

```javascript
function fun(n, x) {
  console.log(x); // 输出第二位
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}

/* --- undefined 0 0 0 --- */
var a = fun(0);
// fun(0,x) => 输出: console.log(undefined)
//          => return { fun:function(m){return fun(m,0)} }
a.fun(1);
// 调用 return 的 fun 并传递 m = 1 ,function(1)
// => return fun(1,0)
// => 输出: console.log(0) return 的值未被调用
a.fun(2);
// 同上,调用 return 的 fun 并传递 m = 2 ,function(2)
// => return fun(2,0)
// => 输出: console.log(0) return 的值未被调用
a.fun(3);
// 同上,调用 return 的 fun 并传递 m = 3 ,function(3)
// => return fun(3,0)
// => 输出: console.log(0) return 的值未被调用

/* --- undefined 0 1 2 --- */
var b = fun(0).fun(1).fun(2).fun(3);
// fun(0).fun(1) 同上过程 'var a = fun(0), a.fun(1)' 所以输出为 undefined 0
// => 上方 return的值未被调用，但是此处被调用, m=1 传递给 fun 的 n,则下个 n = 1
// xxx.fun(2)=> m=2, n=1, return fun(2,1)
// => 输出: console.log(1) m=2 传递给 fun 的 n,则下个 n = 2
// xxx.fun(3) => m=3 n=2, return fun(3,2)
// => 输出: console.log(2)

/* --- undefined 0 1 1 --- */
var c = fun(0).fun(1);
// fun(0).fun(1) 同上过程 'var a = fun(0), a.fun(1)' 所以输出为 undefined 0
c.fun(2);
// c.fun(2) 相当于上方 b 的 xxx.fun(2), return fun(2,1),输出1
c.fun(3);
// c.fun(2) 相当于上方 c 的 将参数传递为 3,return fun(3,1),因为输出第二位，所以还是输出1
```

> &emsp;&emsp;无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

### 理解:

```javascript
var nAdd;
var t = function () {
  var n = 99;
  // 将内部函数传递到所在的词法作用域以外
  nAdd = function () {
    n = n + 1;
  };
  var t2 = function () {
    console.log(n);
  };
  return t2;
};

let a1 = t();

let a2 = t();
// 闭包 nAdd() 跟着 a2走
nAdd();

let a3 = t();
// ? 为什么n+1 没有影响 a3,而是影响 a2 ?
// ! 因为 a3 是一个新的function

a1(); // 99
a2(); // 100
a3(); // 99
```

> &emsp;&emsp;模块模式需要具备两个必要条件。1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

```javascript
function Module() {
  let arr = [1, 2, 3];
  let task = " go shopping";
  function todo() {
    console.log("Let's" + task);
  }
  function atos() {
    console.log(arr.join(""));
  }
  return {
    todo: todo,
    atos: atos,
  };
}
let $ = Module();
$.todo(); // Let's go shopping
$.atos(); // 123
```

> &emsp;&emsp;<font color=ff0000>import :</font> 将一个模块中的一个或多个 API 导入到当前作用域中，并分别绑定在一个变量上。<font color=ff0000>module :</font> 将整个模块的 API 导入并绑定到一个变量上。<font color=ff0000>export :</font> 将当前模块的一个标识符（变量、函数）导出为公 共 API。这些操作可以在模块定义中根据需要使用任意多次。

bar.js :

```javascript
function hello(who) {
  return "Let me introduce: " + who;
}
export hello;
```

foo.js :

```javascript
// 仅从 "bar" 模块导入 hello()
import hello from "bar";
var hungry = "hippo";
function awesome() {
  console.log( hello( hungry ).toUpperCase() );
}
export awesome;
```

baz.js :

```javascript
// 导入完整的 "foo" 和 "bar" 模块
module foo from "foo";
module bar from "bar";
console.log( bar.hello( "rhino" ) ); // Let me introduce: rhino
foo.awesome(); // LET ME INTRODUCE: HIPPO
```

## 6. 动态作用域

> &emsp;&emsp;词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定的。词法作用域关注函数在何处<font color=ff0000>声明</font>，而动态作用域关注函数从何处<font color=ff0000>调用</font>。

### 理解:

```javascript
function foo() {
  console.log(a);
}
function bar() {
  var a = 3;
  foo();
}
var a = 2;
bar(); // 2
```

&emsp;&emsp; bar() 执行时,foo() 中没有 a,向上找,找到全局的 a,因为 JavaScript 并不具有动态作用域，而词法作用域关注函数在何处声明，所以找到了 " var = 2 ",如果关注在何处调用，则会找到 bar() 中的 " var a = 3"。

## 7. 块作用域的替代方案

```javascript
{
  let a = 2;
  console.log(a); // 2
}
console.log(a); // ReferenceError
```

Traceur,Google 维护的一个项目,用来将 ES6 代码转换成兼容 ES6 之前的环境:

```javascript
{
  try {
    throw undefined;
  } catch (a) {
    a = 2;
    console.log(a);
  }
}
console.log(a);
```

## 8. 词法 this

```javascript
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log(this.id);
  },
};
var id = "not awesome";
obj.cool(); // awesome
setTimeout(obj.cool, 100); // not awesome
```

输出 not awesome ,是因为 cool() 函数丢失了同 this 之间的绑定,普通处理，用 " var self = this ; "

```javascript
var obj = {
  count: 0,
  cool: function coolFn() {
    var self = this;
    if (self.count < 1) {
      setTimeout(function timer() {
        self.count++;
        console.log("awesome?");
      }, 100);
    }
  },
};
obj.cool(); // awesome?
```

> &emsp;&emsp;箭头函数在涉及 this 绑定时的行为和普通函数的行为完全不一致。它放弃了所有普通 this 绑定的规则，取而代之的是用当前的词法作用域覆盖了 this 本来的值。
> &emsp;&emsp;因此，这个代码片段中的箭头函数并非是以某种不可预测的方式同所属的 this 进行了解绑定，而只是“继承”了 cool() 函数的 this 绑定（因此调用它并不会出错）。↓

```javascript
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(() => {
        this.count++;
        console.log("awesome?");
      }, 100);
    }
  },
};
obj.cool(); //awesome?
```

其实更好的方法是使用 bind() :

```javascript
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(
        function timer() {
          this.count++;
          // this 是安全的,因为 bind(..)
          console.log("more awesome");
        }.bind(this),
        100
      ); // look, bind()!
    }
  },
};
obj.cool(); // more awesome
```
