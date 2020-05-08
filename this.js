// 3.显式绑定 87
// 它们的第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时指定这个 this。因为你可以直接指定 this 的绑定对象，因此我们称之为显式绑定。
function test() {
  console.log(this.a)
}

var obj = {
  a: 6,
  // test: test,
}
test.call(obj)

//----------------//
function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 1
};
var obj2 = {
  a: 2
}
var bar = function () {
  foo.call(obj1);
};
bar(); // 1
// 硬绑定的 bar 不可能再修改它的 this，此处还在obj1上
bar.call(obj2) //1

function conthis(el) {
  console.log(el, this.id)
};
var obj3 = {
  id: "chris"
};
let arr1 = [1, 2, 3];
arr1.forEach(conthis, obj3)

// 4. new 绑定
// 在 JavaScript 中，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。

// 使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
// 1. 创建（或者说构造）一个全新的对象。
// 2. 这个新对象会被执行 [[ 原型 ]] 连接。
// 3. 这个新对象会绑定到函数调用的 this。
// 4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

let Student = function () {
  this.sname = ''
  this.sage = ''
  this.sgender = ''
  this.sclass = ''
}
let xiaoming = new Student()
xiaoming.sname = 'xiaoming'
console.log(xiaoming)

// 绑定顺序 显 > 隐

// new > 隐 , new 生效，否则 bar.a = 2
var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4

// new > 显 > 隐 > 默认

// 总结

//1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
var bar = new foo()
//2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。
var bar = foo.call(obj2)
//3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
var bar = obj1.foo()
//4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。
var bar = foo()

// 例外
// 1.需要传入一个参数当作 this 的绑定对象。如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时 null 可能是一个不错的选择，就像代码所示的那样。

function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}
// 把数组“展开”成参数
foo.apply(null, [2, 3]); // a:2, b:3

// ES6
foo(...[2, 3])

// 然而，总是使用 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了this（比如第三方库中的一个函数），那默认绑定规则会把 this 绑定到全局对象（在浏览器中这个对象是 window），这将导致不可预计的后果（比如修改全局对象）。显而易见，这种方式可能会导致许多难以分析和追踪的 bug。

// 更安全的this,传入一个特殊的对象，把 this 绑定到这个对象不会对你的程序产生任何副作用。
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}
// Object.create(null) 和 {} 很 像， 但 是 并 不 会 创 建 Object.prototype 这个委托，所以它比 {}“更空”
var ø = Object.create(null);

// 把数组展开成参数
foo.apply(ø, [2, 3]); // a:2, b:3

// 2.间接引用
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
// 赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。
//注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则this 会被绑定到全局对象。此处，若foo中使用 'use strict' ，则绑定到undefined

// 3. 软绑定 ??源码没看，意思懂了 P98


// 小结
//如果要判断一个运行中函数的this绑定，就需要找到这个函数的直接调用位置。找到之后 就可以顺序应用下面这四条规则来判断this的绑定对象。 
// 1. 由 new 调用？绑定到新创建的对象。 
// 2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。 //3. 由上下文对象调用？绑定到那个上下文对象。
// 4. 默认：在严格模式下绑定到 undefined，否则绑定到全局对象。 

// 一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略this绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。 ES6中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定this，具体来说，箭头函数会继承外层函数调用的this绑定（无论this绑定到什么）。这 其实和 ES6 之前代码中的 self = this 机制一样。


