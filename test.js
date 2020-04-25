(function foo() {
  var a = 3;
  console.log(a); // 3
}) // 加括号，外部调不到 foo()报错

// var a = 2;
// (function foo2(global) {
//   var a = 3;
//   console.log(a);
//   console.log(global.a)
// })(window); // 浏览器环境

// (function foo2() {
//   def(window);
// })(function def(global) {
//   var a = 3;
//   console.log(a);
//   console.log(global.a)
// }) 

for (var i = 0; i < 3; i++) {
  console.log(i)
}


console.log(bar) // undefined

var a = 3;
// if 的 {} 中使用 var 声明变量，变量会声明在全局作用域,用let 声明不会
//{
//  var a = 5;
//}
// console.log(a) //5 如果是let,则是undefined

if (a === 3) {
  var bar = 35;
  // console.log(bar);
}
console.log(bar) //35

//但是使用 let 进行的声明不会在块作用域中进行提升。声明的代码被运行之前，声明并不“存在”。
// {
//   console.log(bar); // ReferenceError!
//   let bar = 2;
// }
