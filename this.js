function baz() {
  // 当前调用栈是：baz
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

// 码设置一个断点,运行代码时，调试器会在那个位置暂停，同时会展示当前位置的函数调用列表，这就是你的调用栈。因此，如果你想要分析 this 的绑定，使用开发者工具得到调用栈，然后找到栈中第二个元素，这就是真正的调用位置。

// 1. 默认绑定
function test() {
  var a = 5;
  console.log(this.a)
}
var a = 3;
test() // 3
// test 在全局调用，所以 this 指的是全局的 a = 3
// foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

// 2.隐式绑定
obj.foo()
// 3.显式绑定 87
// ? apply 和 call 定义、区别
// !它们的第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时指定这个 this。因为你可以直接指定 this 的绑定对象，因此我们称之为显式绑定。
// !从 this 绑定的角度来说，call(..) 和 apply(..) 是一样的，它们的区别体现在其他的参数上
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
  a: 2
};
var obj2 = {
  a: 3
}
var bar = function () {
  foo.call(obj1);
};
bar(); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call(obj2) //2

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
