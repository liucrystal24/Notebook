// 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。
// 第一个例子在作用域内执行了，第二个return在外执行
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); //2

// 无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
// 每秒一次的频率输出五次6
// i*1000 中 i 为 1~6, ？？和for 作用域一样？？
// console.log(i) i=6; i 为 for 循环完
// 延迟函数的回调会在循环结束时才执行
// 尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i。
// 我们需要更多的闭包作用域，特别是在循环的过程中每个迭代都需要一个闭包作用域。
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
// 改进
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}

//let 将一个块转换成一个可以被关闭的作用域
for (var i = 1; i <= 5; i++) {
  let j = i; // 闭包的块作用域！
  setTimeout(function timer() {
    console.log(j);
  }, j * 1000);
}
// 最终 for循环头部的let声明,变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}

var another = [1, 2, 3];
console.log(another.join('!'));

// 模块模式需要具备两个必要条件。1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
// 2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

//import可以将一个模块中的一个或多个API导入到当前作用域中，并分别绑定在一个变量 上（在我们的例子里是 hello）。module 会将整个模块的 API 导入并绑定到一个变量上（在 我们的例子里是foo和bar）。export会将当前模块的一个标识符（变量、函数）导出为公 共API。这些操作可以在模块定义中根据需要使用任意多次。