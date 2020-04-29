// 无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。
let nAdd;
let t = function () {
  let n = 99;
  nAdd = function () {
    n = n + 1;
  }
  let t2 = function () {
    console.log(n)
  }
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

