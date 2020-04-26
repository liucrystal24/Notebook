// 包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。
// 这个过程就好像变量和函数声明从它们在代码中出现的位置被“移动”到了最上面。这个过程就叫作提升。
a = 2;
var a;
console.log(a); //2

// =>
// var a;
// a = 2;
// console.log(a);
// var a = 2; => var a; a = 2; 
// 第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在原地等待执行阶段。

console.log(a); //undefined
var a = 2;

// =>
// var a;
// console.log(a);
// a = 2;

foo(); // TypeError: foo is not a function
//bar(); // ReferenceError: bar is not defined
// 如果它是一个函数声明而不是函数表达式，那么就会赋值,因为函数声明会提前，函数表达式不会提前
// 函数声明: function foo(){}/函数表达式: var foo = function()
var foo = function bar() {
  console.log(123);
};
// var foo;
// foo();
// bar();
// foo = function(){
//   console.log(123)
// }
// function bar(){
//   console.log(123)
// }