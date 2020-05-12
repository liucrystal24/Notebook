# this & object prototypes

## 1. 关于 this

1. this 的绑定和函数声明的位置没有任何关系，只取决于函数的<font color='ffoo'>调用方式</font>。
2. 当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数<font color='ffoo'>在哪里被调用（调用栈）</font>、函数的调用方法、传入的参数等信息。this 就是记录的其中一个属性，会在函数执行的过程中用到。

## 2. this 全面解析

### 2.1 调用位置

调用栈：为了到达当前执行位置所调用的所有函数(函数调用链)。  
调用位置：函数在代码中被调用的位置，在正在执行的函数的前一个调用中。

```javascript
function baz() {
  // 当前调用栈是：全局 -> baz
  // 因此，当前调用位置是全局作用域
  console.log("baz");
  bar(); // <-- bar 的调用位置
}
function bar() {
  // 当前调用栈是 baz -> bar
  // 因此，当前调用位置在 baz 中
  console.log("bar");
  foo(); // <-- foo 的调用位置
}
function foo() {
  // 当前调用栈是 baz -> bar -> foo
  // 因此，当前调用位置在 bar 中
  console.log("foo");
}
baz(); // <-- baz 的调用位置
```

:point_right: chrome 中 打开 F12 控制台，在 Sources 中,通过打断点的方式，查看调用栈，然后找到栈中的<font color='red'>第二个元素</font>就是真正调用的位置。  
![callstack.png](https://raw.githubusercontent.com/liucrystal24/Notebook/master/you%20don't%20know%20JS/img/callstack.png)

### 2.2 绑定规则

&emsp;&emsp;绑定规则大致分为四种：1. 默认绑定 2. 隐式绑定 3. 显式绑定 4. new 绑定 。

1. 默认绑定  
    非严格模式: this -> 全局对象,严格模式: this -> undefined

   ```javascript
   function foo() {
     // 'use strict';
     var a = 5;
     console.log(this.a);
   }
   var a = 3;
   foo(); // 3
   ```

   :exclamation: Chrome 和 node 中的不同:

   ```js
   var count = 1;
   function foo() {
     console.log(this.count);
     this.count++;
   }
   foo.count = 0;
   foo(); // chrome : 1 , node : undefined
   // chrome : this -> window,此时 window.count = 1
   // node : 没有 window, 此时， this 绑定到 undefined
   console.log(foo.count); // chrome: 0 , node : 0
   console.log(count); // chrome : 2 , node : 1
   // chrome : window.count++ ,window.count = 2
   // node : 直接拿到第一行中: var count = 1
   ```

2. 隐式绑定  
   当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。  
   对象属性引用链中只有<font color='red'>最后一层</font>会影响调用位置。

   ```javascript
   function foo() {
     console.log(this.a);
   }
   var obj2 = {
     a: 2,
     foo: foo,
   };
   var obj1 = {
     a: 1,
     obj2: obj2,
   };
   obj2.foo(); // 2
   obj1.obj2.foo(); // 2
   ```

   :exclamation: 隐式丢失:  
    被隐式绑定的函数会丢失绑定对象，应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

   ```js
   function foo() {
     console.log(this.a);
   }
   var obj = {
     a: 2,
     foo: foo,
   };
   var bar = obj.foo; // 函数别名！
   var a = "oops, global"; // a 是全局对象的属性
   bar(); // "oops, global"
   // setTimeout 中也是同理
   setTimeout(obj.foo, 100); // "oops,global"
   ```

   :point_right: 虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

3. 显式绑定  
   第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。

   ```javascript
   function foo() {
     console.log(this.a);
   }
   var obj = {
     a: 6,
   };
   foo.call(obj); // 6
   ```

   :exclamation: 硬绑定:显式绑定的一个变种，可以解决丢失绑定问题。

   ```javascript
   function foo() {
     console.log(this.a);
   }
   var obj1 = {
     a: 1,
   };
   var obj2 = {
     a: 2,
   };
   var bar = function () {
     foo.call(obj1);
   };
   bar(); // 1
   // 硬绑定的 bar 不可能再修改它的 this，此处还在obj1上
   bar.call(obj2); //1
   ```

   :point_right: 应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值

   ```javascript
   function foo(addNum) {
     console.log(this.a, addNum);
     return this.a + addNum;
   }
   var obj = {
     a: 2,
   };
   function add2() {
     return foo.apply(obj, arguments);
   }
   var result = add2(3); // 2 3
   console.log(result); // 5
   ```

4. new 绑定  
   :exclamation: 在 JavaScript 中，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。它们只是被 new 操作符调用的<font color='red'>普通函数</font>而已。  
   :point_right: 使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

   1. 创建（或者说构造）一个全新的对象。
   2. 这个新对象会被执行 [[ 原型 ]] 连接。
   3. 这个新对象会<font color='red'>绑定到函数调用的 this</font>。
   4. :collision: 如果函数没有<font color=red>_返回其他对象_</font>，那么 new 表达式中的函数调用会自动返回这个新对象。

   :point_down: 返回值为简单的基本数据类型，而不是一个对象（包括基本类型的对象）的话，那么返回值仍然为新创建的对象。

   ```js
   function User(name) {
     this.name = name;

     // return;                              // 返回 this
     // return null;                         // 返回 this
     // return undefined;                    // 返回 this
     // return this;                         // 返回 this
     // return false;                        // 返回 this
     // return 'hello world';                // 返回 this
     // return 2;                            // 返回 this

     // return [];                            // 返回 新建的 []
     // return function(){};                  // 返回 新建的 function，抛弃 this
     // return new Boolean(false);           // 返回 新建的 boolean，抛弃 this
     // return new String('hello world');    // 返回 新建的 string，抛弃 this
     // return new Number(32);               // 返回新的 number，抛弃 this
   }
   var user = new User("chris");
   console.log(user);
   ```

### 2.3 优先级

结论: new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

### 2.4 绑定例外

1. 被忽略的 this  
    需要传入一个参数当作 this 的绑定对象。如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时可以传入 null。

   ```js
   function foo() {
     console.log(this.a);
   }
   var a = 2;
   foo.call(null); // 2
   ```

   :exclamation: 总是使用 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了 this（比如第三方库中的一个函数），那默认绑定规则会把 this 绑定到全局对象（在浏览器中这个对象是 window），这将导致不可预计的后果（比如修改全局对象）。显而易见，这种方式可能会导致许多难以分析和追踪的 bug。  
    :point_right: 传入一个特殊的对象，把 this 绑定到这个对象不会对你的程序产生任何副作用。

   ```js
   function foo(a, b) {
     console.log("a:" + a + ", b:" + b);
   }

   // Object.create(null) 和 {} 很像,但是并不会创建 Object.prototype 这个委托，所以它比 {}“更空”
   var ø = Object.create(null);

   // 把数组展开成参数
   foo.apply(ø, [2, 3]); // a:2, b:3
   ```

2. 间接引用
   ```js
   function foo() {
     console.log(this.a);
   }
   var a = 2;
   var o = { a: 3, foo: foo };
   var p = { a: 4 };
   o.foo(); // 3
   (p.foo = o.foo)(); // 2
   ```
   :point_right: 赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。  
   :point_right: 对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。此处，若 foo 中使用 'use strict' ，则绑定到 undefined

### 2.5 this 词法(ES6 箭头函数)

箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。
:exclamation: 箭头函数的绑定无法被修改。(new 也不行！)

```js
// 对比返回箭头函数、返回普通函数、普通函数
function foo1() {
  // 返回一个箭头函数
  return () => {
    //this 继承自 foo1()
    console.log(this.a);
  };
}
function foo2() {
  return function () {
    console.log(this.a);
  };
}
function foo3() {
  console.log(this.a);
}

var obj1 = {
  a: 1,
};
var obj2 = {
  a: 2,
};

var a = 12;

// foo1 this 绑定到全局,返回的函数继承了,且箭头函数绑定的不会再改变,全局 a = 12.
var bar1 = foo1();
bar1(); // 12
bar1.call(obj1); // 12
bar1.call(obj2); // 12

// foo1 this 绑定到 obj1,返回的函数继承了,且箭头函数绑定的不会再改变,obj 中 a = 1.
var bar11 = foo1.call(obj1);
bar11(); // 1
bar11.call(obj1); // 1
bar11.call(obj2); // 1

// 无论 bar2 = foo2.call(obj1) 还是 bar2 = foo2(), 返回的函数没有继承 this, 都绑定到全局，且遵循四个绑定规则进行改变.
var bar2 = foo2.call(obj1);
bar2(); // 12
bar2.call(obj1); // 1
bar2.call(obj2); // 2

// 硬绑定， bar3 已经绑定到 obj1 上,所以后面 bar3.call(obj2) ,this 仍然绑定到 obj1 上.
var bar3 = function () {
  foo3.call(obj1);
};
bar3(); //1
bar3.call(obj2); // 1
```

:point_right: 箭头函数最常用于回调函数中，例如事件处理器或者定时器

```js
function foo() {
  setTimeout(() => {
    // 这里的 this 在此法上继承自 foo()
    console.log(this.a);
  }, 100);
}
var obj = {
  a: 2,
};
foo.call(obj); // 2
```
