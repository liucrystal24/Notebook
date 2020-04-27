# JS you don't know (上)

### 1. 作用域和闭包

#### 1.1 作用域是什么

> &emsp;&emsp;作用域是一套规则，用于确定在何处以及如何查找变量（标识符）。如果查找的目的是对变量进行赋值，那么就会使用 LHS 查询；如果目的是获取变量的值，就会使用 RHS 查询。赋值操作符会导致 LHS 查询。＝操作符或调用函数时传入参数的操作都会导致关联作用域的赋值操作。  
> &emsp;&emsp;JavaScript 引擎首先会在代码执行前对其进行编译，在这个过程中，像 var a = 2 这样的声明会被分解成两个独立的步骤:  
> &emsp;&emsp;1.首先，var a 在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。  
> &emsp;&emsp;2.接下来，a = 2 会查询（LHS 查询）变量 a 并对其进行赋值。

#### 理解:

1.  #### LHS:找到变量的容器本身，并对其赋值(目标)

```javascript
var a = 2;
```

2.  #### RHS:获取变量的值（源头）

```javascript
console.log(a);
foo(2);
```

> &emsp;&emsp;LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要（也就是说它们没有找到所需的标识符），就会向上级作用域继续查找目标标识符，这样每次上升一级作用域（一层楼），最后抵达全局作用域（顶层），无论找到或没找到都将停止。  
> &emsp;&emsp;不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS 引用会导致自动隐式地创建一个全局变量（非严格模式下），该变量使用 LHS 引用的目标作为标识符，或者抛出 ReferenceError 异常（严格模式下）。

#### 理解:

1.  #### LHS:

```javascript
var a = 2;
b = a; //LHS查询失败，自动创建一个全局变量b
```

2.  #### RHS:

```javascript
console.log(b);
// Uncaught ReferenceError: b is not defined
```

#### 1.2 词法作用域

> &emsp;&emsp;词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。编译的词法分析阶段基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它们进行查找。  
> &emsp;&emsp;JavaScript 中有两个机制可以“欺骗”词法作用域：eval(..) 和 with。前者可以对一段包含一个或多个声明的“代码”字符串进行演算，并借此来<font color='red'>修改已经存在的词法作用域</font>（在运行时）。后者本质上是通过将一个对象的引用当作作用域来处理，将对象的属性当作作用域中的标识符来处理，从而<font color="red">创建了一个新的词法作用域</font>（同样是在运行时）。

#### 理解:

1.  #### eval(...):

```javascript
function foo(str, a) {
  eval(str); // 欺骗！
  console.log(a, b);
}
var b = 2;
foo("var b = 3;", 1); // 1, 3
```

2.  #### with:

```javascript
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

&emsp;&emsp;尽管 with 块可以将一个对象处理为词法作用域，但是这个块内部正常的 var 声明并不会被限制在这个块的作用域中，而是被添加到 with 所处的函数作用域中。  
&emsp;&emsp;当我们传递 o1 给 with 时，with 所声明的作用域是 o1，而这个作用域中含有一个同 o1.a 属性相符的标识符。但当我们将 o2 作为作用域时，其中并没有 a 标识符，因此进行了正常的 LHS 标识符查找

> &emsp;&emsp;\*这两个机制的副作用是引擎无法在编译时对作用域查找进行优化，因为引擎只能谨慎地认为这样的优化是无效的。使用这其中任何一个机制都将导致代码运行变慢。不要使用它们。

#### 1.3 函数作用域和块作用域

> &emsp;&emsp;函数是 JavaScript 中最常见的作用域单元。本质上，声明在一个函数内部的变量或函数会在所处的作用域中“隐藏”起来，这是有意为之的良好软件的设计原则。

#### 理解:

```javascript
// 1. 隐藏函数，不污染全局
function foo() {
  var b = 5;
  function bar() {
    console.log(b);
  }
}
bar(); // Uncaught ReferenceError: bar is not defined
console.log(b); // ReferenceError: b is not defined

// 2.函数自执行
var a = 2;
(function foo1(global) {
  var a = 3;
  console.log(a); //3
  console.log(global.a); //2
})(window); // 浏览器环境

(function foo2() {
  def(window); // 浏览器环境
})(function def(global) {
  var a = 3;
  console.log(a); //3
  console.log(global.a); //2
});
```

> &emsp;&emsp;从 ES3 开始，try/catch 结构在 catch 分句中具有块作用域。

#### 理解:

```javascript
try {
  undefined(); // 执行一个非法操作来强制制造一个异常
} catch (err) {
  console.log(err); // 能够正常执行！
}
console.log(err); // ReferenceError: err is not defined
```

&emsp;&emsp;err 仅存在 catch 分句内部，当试图从别处引用它时会抛出错误。

> &emsp;&emsp;但函数不是唯一的作用域单元。块作用域指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块（通常指 { .. } 内部）。  
> &emsp;&emsp;在 ES6 中引入了 let 关键字（var 关键字的表亲），用来在任意代码块中声明变量。if(..) { let a = 2; } 会声明一个劫持了 if 的 { .. } 块的变量，并且将变量添加到这个块中。

#### 理解:

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

&emsp;&emsp;当使用 var 声明变量时，它写在哪里都是一样的，因为它们最终都会属于外部作用域。但是 let 声明变量时，c 在 { } 块级作用域中，外部无法直接获取。

#### 1.4 提升

> &emsp;&emsp;包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。这个过程就好像变量和函数声明从它们在代码中出现的位置被“移动”到了最上面。这个过程就叫作提升。

#### 理解:

```javascript
console.log(a); //undefined
var a = 2;
// ↓↓ js执行顺序 ↓↓
var a; // 定义声明是在编译阶段进行的
console.log(a);
a = 2; // 赋值声明会被留在原地等待执行阶段
```

> &emsp;&emsp;1.函数声明会提升，函数表达式不会提升。2.函数声明和变量声明都会被提升。函数会首先被提升，然后才是变量。

#### 理解: 1.

```javascript
foo(); // TypeError: foo is not a function ，因为 var foo; 提前了,未命名为函数
bar(); // 函数声明
var foo = function bar() {
  console.log("函数表达式");
};
function bar() {
  console.log("函数声明");
}
```

#### 理解: 2.

```javascript
foo(); //2
var foo;
function foo() {
  console.log(1);
}
function foo() {
  console.log(2);
}
//函数优先,尽管var在先，但是函数声明在前,var foo;被忽略，因为是重复声明,但是函数声明可以覆盖;
// ↓↓ js执行顺序 ↓↓
function foo() {
  console.log(1);
}
function foo() {
  console.log(2);
}
foo();
```

#### 1.5 作用域闭包

#### 1.6 动态作用域

#### 1.7 块作用域的替代方案

#### 1.8 this 词法

### 2. this 和对象原型

#### 2.1 关于 this

#### 2.2 this 全面解析

#### 2.3 对象

#### 2.4 混合对象 "类"

#### 2.5 原型

#### 2.6 行为委托

#### 2.7 ES 中的 Class

```

```
