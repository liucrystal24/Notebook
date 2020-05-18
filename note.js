// 面向对象特点: 1.实例化 2.继承 3.多态

// 4.3 类的继承

// 4.3.1 多态
// 多态并不表示子类和父类有关联，子类得到的只是父类的一份副本。类的继承其实就是复制。

// 4.3.2 多重继承
// 它本身并不提供“多重继承”功能，但是用其他方法实现了(h)

// 4.4 混入
// 在继承或者实例化时，JavaScript 的对象机制并不会自动执行复制行为。简单来说，JavaScript 中只有对象，并不存在可以被实例化的“类”。一个对象并不会被复制到其他对象，它们会被关联起来
// 4.4.1 显示混入

function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }
  return targetObj;
}
var Vehicle = {
  engines: 1,
  ignition: function () {
    console.log("Turning on my engine.");
  },
  drive: function () {
    this.ignition();
    console.log("Steering and moving forward!");
  }
};
var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function () {
    Vehicle.drive.call(this); // 显式多态
    console.log(
      "Rolling on all " + this.wheels + " wheels!"
    );
  }
});

console.log(Car.drive());
// --> 我们处理的已经不再是类了，因为在 JavaScript 中不存在类，Vehicle 和 Car 都是对象，供我们分别进行复制和粘贴。
// --> 从技术角度来说，函数实际上没有被复制，复制的是函数引用。所以，Car 中的属性 ignition 只是从 Vehicle 中复制过来的对于 ignition() 函数的引用。
// --> 但是在 JavaScript 中（由于屏蔽）使用显式伪多态会在所有需要使用（伪）多态引用的地方创建一个函数关联，这会极大地增加维护成本。此外，由于显式伪多态可以模拟多重继承，所以它会进一步增加代码的复杂度和维护难度。使用伪多态通常会导致代码变得更加复杂、难以阅读并且难以维护，因此应当尽量避免使用显式伪多态，因为这样做往往得不偿失。


// 4.4.2 隐式混入
var Something = {
  cool: function () {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  }
};
Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1
var Another = {
  cool: function () {
    // 隐式把 Something 混入 Another
    Something.cool.call(this);
  }
};
Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1（count 不是共享状态）

// 通过在构造函数调用或者方法调用中使用 Something.cool.call( this )，我们实际上“借用”了函数 Something.cool() 并在 Another 的上下文中调用了它（通过 this 绑定；参加第 2 章）。最终的结果是 Something.cool() 中的赋值操作都会应用在 Another 对象上而不是Something 对象上。因此，我们把 Something 的行为“混入”到了 Another 中。


// 虽然这类技术利用了 this 的重新绑定功能，但是 Something.cool.call( this ) 仍然无法
// 变成相对（而且更灵活的）引用，所以使用时千万要小心。通常来说，尽量避免使用这样
// 的结构，以保证代码的整洁和可维护性。

// 类是一种设计模式。许多语言提供了对于面向类软件设计的原生语法。JavaScript 也有类
// 似的语法，但是和其他语言中的类完全不同。
// 类意味着复制。
// 传统的类被实例化时，它的行为会被复制到实例中。类被继承时，行为也会被复制到子类
// 中。
// 多态（在继承链的不同层次名称相同但是功能不同的函数）看起来似乎是从子类引用父
// 类，但是本质上引用的其实是复制的结果。
// JavaScript 并不会（像类那样）自动创建对象的副本。
// 混入模式（无论显式还是隐式）可以用来模拟类的复制行为，但是通常会产生丑陋并且脆
// 弱的语法，比如显式伪多态（OtherObj.methodName.call(this, ...)），这会让代码更加难
// 懂并且难以维护。
// 此外，显式混入实际上无法完全模拟类的复制行为，因为对象（和函数！别忘了函数也
// 是对象）只能复制引用，无法复制被引用的对象或者函数本身。忽视这一点会导致许多
// 问题。
// 总地来说，在 JavaScript 中模拟类是得不偿失的，虽然能解决当前的问题，但是可能会埋
// 下更多的隐患。

//Polymorphism 多态多意为「许多」，态意为「形态」。不同类可以定义相同的方法或属性。

// class https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes





// 原型

var myObject = {
  a: 2
};
myObject.a; // 2

// 如果 a 存在，就调用[[ Get ]],如果不存在，就使用对象的[[ Prototype ]] 链

var anotherObject = {
  a: 2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject);
myObject.a; // 2

// var newObj = Object.create(..), 创建一个对象 newObj,并把这个对象的prototype关联到 ..

// 因此，当你通过各种语法进行属性查找时都会查找 [[Prototype]] 链，直到找到属性或者查找完整条原型链。

// 5.1.1 Object.prototype
// 所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype

// 5.1.2 属性设置和屏蔽

myObject.foo = "bar";

// 1. myObject :有 -> 在 myObject 直接赋值
// 1.1 myObject :有 -> [[Prototype]] :有 ->  myObject 中 foo 屏蔽 原型链中所有 foo, myObject.foo 总会选择原型链最底层
// 2. myObject :无 / [[Prototype]] :无 -> 在myObject 直接赋值
// 3. myObject :无 / [[Prototype]] :有
// 3.1 [[Prototype]] 中有 foo 的普通数据访问属性,且 writable : true -> 在 myObject 中添加 foo,并且是屏蔽属性
// 3.2 [[Prototype]] 中有 foo , writable : false -> 严格模式报错，非严格模式被忽略
// 3.3 [[Prototype]] 中有 foo,并且是一个setter,则调用 setter, foo 不会添加到 myObject , 也不会重新定义 foo
// 总结: 
// 1. 原型链中 foo 可访问 & writable:true -> 新对象中添加 foo ，数据屏蔽
// 2. 原型链中 foo writable :false -> 被忽略
// 3. 原型链中 foo setter -> 调用 setter ,foo 不会添加到 新对象.

// !!! 如果希望2,3达到1 的效果,使用 Object.defineProperty(..) 代替 ' = ' 则不会受到影响。

// 5.2.1 “类”函数
// 所有的函数默认都会拥有一个名为 prototype 的公有并且不可枚举（参见第 3 章）的属性，它会指向另一个对象.

function Foo() {
  // ...
}
Foo.prototype; // { } 这个对象通常被称为 Foo 的原型，因为我们通过名为 Foo.prototype 的属性引用来访问它。

// new Foo() 这个函数调用实际上并没有直接创建关联，这个关联只是一个意外的副作用。new Foo() 只是间接完成了我们的目标：一个关联到其他对象的新对象。

// 原型继承
// 加一张图片

// 5.2.2 “构造函数”

function Foo() {
  // ...
}
var a = new Foo();

console.log(a instanceof Object) // true
console.log(a instanceof Function) // false
// 函数不是构造函数，但是当且仅当使用 new 时，函数调用会变成“构造函数调用”。

// 5.2.3 技术

function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function () {
  return this.name;
};
var a = new Foo("a");
var b = new Foo("b");
console.log(a.myName()); // "a"
console.log(b.myName()); // "b"
// a,b 没有把 Foo.prototype 复制到两个对象
// 而是 a,b 的prototype 关联到了 Foo.prototype , 当 a和 b 中无法找到 myName 时，它会( 通过委托 )在 Foo.prototype 上找到。


// 5.3 （原型）继承
// 原型继承图片

// 它不仅展示出对象（实例）a1 到 Foo.prototype 的委托关系，还展示出
// Bar.prototype 到 Foo.prototype 的委托关系，而后者和类继承很相似，只有箭头的方向不
// 同。图中由下到上的箭头表明这是委托关联，不是复制操作。


function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function () {
  return this.name;
};
function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}
// 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.myLabel = function () {
  return this.label;
};

var a = new Bar("a", "obj a");
a.myName(); // "a"
a.myLabel(); // "obj a"

function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function () {
  return this.name;
};
function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}
// √ 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.myLabel = function () {
  return this.label;
};

var a = new Bar("a", "obj a");
console.log(a.myName()); // "a"
console.log(a.myLabel()); // "obj a"

// xxx 错误
// 1. Bar.prototype = Foo.prototype;
// -> Bar.prototype 直接引用 Foo.prototype 对象
// 此当你执行类似 Bar.prototype.myLabel = ... 的赋值语句时会直接修改 Foo.prototype 对象本身


// 2.Bar.prototype = new Foo();
// -> 它使用了 Foo(..) 的“构造函数调用”，如果函数 Foo 有一些副作用（比如写日志、修改状态、注册到其他对象、给 this 添加数据属性，等等）的话，就会影响到 Bar() 的“后代”，后果不堪设想。

// √√√ 正确
// 3. Object.setPrototypeOf( Bar.prototype, Foo.prototype );
// -> ES6 开始可以直接修改现有的 Bar.prototype

// 检查“类”关系
// 1. instanceof
function Foo() {
  // ...
}
Foo.prototype.blah = 123;
var a = new Foo();

a instanceof Foo // true;
// instanceof : a 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象
// ! 只能处理对象（a）和函数（带 .prototype 引用的 Foo）之间的关系。如
// 果你想判断两个对象（比如 a 和 b）之间是否通过 [[Prototype]] 链关联，只用 instanceof 无法实现。

// 2. isPrototypeOf()

Foo.prototype.isPrototypeOf(a); // true
// a.isPrototypeOf(b): a 是否出现在 b 的 [[Prototype]] 链中

// 访问内部 [[Prototype]] 属性 :
a.__proto__ == Foo.prototype; //true;

// .__proto__ 更像一个 getter/setter
Object.defineProperty(Object.prototype, "__proto__", {
  get: function () {
    return Object.getPrototypeOf(this);
  },
  set: function (o) {
    Object.setPrototypeOf(this, o);
    return o;
  }
});


//如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在 [[Prototype]] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的 [[Prototype]]，以此类推。这一系列对象的链接被称为“原型链。


// 访问描述 : getter , setter
// 数据( 属性 )描述 : value, configurabel, enumerable , writable


// 总结
// 1. 如果要访问对象中并不存在的一个属性，[[Get]] 操作（参见第 3 章）就会查找对象内部[[Prototype]] 关联的对象。这个关联关系实际上定义了一条“原型链”（有点像嵌套的作用域链），在查找属性时会对它进行遍历。
// 2. 所有普通对象都有内置的 Object.prototype，指向原型链的顶端（比如说全局作用域），如果在原型链中找不到指定的属性就会停止。toString()、valueOf() 和其他一些通用的功能都存在于 Object.prototype 对象上，因此语言中所有的对象都可以使用它们。
// 3. 使用 new 调用函数时会把新对象的 .prototype 属性关联到“其他对象”。带 new 的函数调用通常被称为“构造函数调用”，尽管它们实际上和传统面向类语言中的类构造函数不一样。
// 4. 虽然这些 JavaScript 机制和传统面向类语言中的“类初始化”和“类继承”很相似，但是 JavaScript 中的机制有一个核心区别，那就是不会进行复制，对象之间是通过内部的[[Prototype]] 链关联的。
// 5. 相比之下，“委托”是一个更合适的术语，因为对象之间的关系不是复制而是委托。

// 原型链和继承: MDN

// https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain



// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto

Object.getPrototypeOf(new Foobar()) === Foobar.prototype
// 对象的原型、构造函数的prototype属性
// 每个实例上都有的属性,构造函数的属性



// obj.__proto__(Object.getPrototypeOf(obj)) 上一层
// obj.prototype 本层



// 每个实例都有一个 constructor（构造函数）属性，该属性指向对象本身。
f.constructor === Foo // true


// https://juejin.im/post/5d629d7b5188252501776d3e#heading-14