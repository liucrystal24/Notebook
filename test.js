var nAdd;
var t = function () {
  var n = 99;
  // 将内部函数传递到所在的词法作用域以外
  nAdd = function () {
    n = n + 1;
  };
  var t2 = function () {
    console.log(n);
  };
  return t2;
};

let a1 = t();

let a2 = t();
// a2() //99
nAdd();

let a3 = t();
// ? 为什么 n+1 只影响到 a2 
// ! 因为 a3 中申明一个新的 n, nAdd()只影响到a2
// ! 如果 a2() 在nAdd()前执行则输出 99

a1(); // 99
a2();// 100
a3(); // 99