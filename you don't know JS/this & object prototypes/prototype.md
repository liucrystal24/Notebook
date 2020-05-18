# 原型对象 & 原型链继承

## 1. 原型链定义

:star: 每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链**。它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

:star: 在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个**链接**，之后通过上溯原型链，在构造器中找到这些属性和方法。

## 2. 原型链初理解

:star: 在 javascript 中，函数可以有属性。 每个函数都有一个特殊的属性叫作原型（prototype）。

```js
function doSomething() {}
console.log(doSomething.prototype);

// 打印结果:
{
  constructor: ƒ doSomething(),
  __proto__: {
    constructor: ƒ Object(),
    hasOwnProperty: ƒ hasOwnProperty(),
    isPrototypeOf: ƒ isPrototypeOf(),
    propertyIsEnumerable: ƒ propertyIsEnumerable(),
    toLocaleString: ƒ toLocaleString(),
    toString: ƒ toString(),
    valueOf: ƒ valueOf()
  }
}
```

:point_down: 添加一些属性到 doSomething 的原型上面:

```js
function doSomething() {}
doSomething.prototype.foo = "bar";
console.log(doSomething.prototype);

// 打印结果:
{
  // 添加了 foo
  foo: "bar",
  constructor: ƒ doSomething(),
  __proto__: {
    constructor: ƒ Object(),
    hasOwnProperty: ƒ hasOwnProperty(),
    isPrototypeOf: ƒ isPrototypeOf(),
    propertyIsEnumerable: ƒ propertyIsEnumerable(),
    toLocaleString: ƒ toLocaleString(),
    toString: ƒ toString(),
    valueOf: ƒ valueOf()
  }
}
```

:point_down: 使用 new 运算符来在现在的这个原型基础之上，创建一个 doSomething 的实例。

```js
function doSomething() {}
doSomething.prototype.foo = "bar";
var doNewthing = new doSomething()
doNewthing.prop = "new prop";
console.log(doNewthing);

// 打印结果:
{
  prop: "new prop",
  __proto__: {
    foo: "bar",
    constructor: ƒ doSomething(),
    __proto__: {
      constructor: ƒ Object(),
      hasOwnProperty: ƒ hasOwnProperty(),
      isPrototypeOf: ƒ isPrototypeOf(),
      propertyIsEnumerable: ƒ propertyIsEnumerable(),
      toLocaleString: ƒ toLocaleString(),
      toString: ƒ toString(),
      valueOf: ƒ valueOf()
    }
  }
}
```

:point_down: 查看 doSomething 和 doNewthing 的一些属性来理解:

```js
function doSomething() {}
doSomething.prototype.foo = "bar";
var doNewthing = new doSomething();
doNewthing.prop = "new value";
console.log(doNewthing.prop); // new value
console.log(doNewthing.foo); // bar
console.log(doSomething.prop); // undefined
console.log(doSomething.foo); // undefined
console.log(doSomething.prototype.prop); // undefined
console.log(doSomething.prototype.foo); // bar
```

:star: 如果查找 doNewthing.a , 原型链查找过程:
:point_right: 1. doNewthing
:point_right: 2. doNewthing.\_\_proto\_\_( doSomething.prototype )
:point_right: 3. doNewthing.\_\_proto\_\_.\_\_proto\_\_( window.Object.prototype )
:point_right: 4. doNewthing.\_\_proto\_\_.\_\_proto\_\_.\_\_proto\_\_( null )

## 3. 原型对象

- 每个对象拥有一个原型对象( [[ Prototype ]] )，可以通过 Object.getPrototypeOf(obj) / obj.\_\_proto\_\_(已被弃用) 来访问。
  对象以其原型为模板、从原型继承方法和属性。
- 继承的属性和方法是定义在 prototype 上。
