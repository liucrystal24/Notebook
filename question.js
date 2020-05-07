function foo1() {
  console.log(this.a);
}

function foo2() {
  return function () {
    console.log(this.a);
  }
}

var obj1 = {
  a: 1
};
var obj2 = {
  a: 2
}

var a = 12;

var bar1 = function () {
  foo1.call(obj1);
}; // 此时尚未执行 ？区别
bar1(); // 1 this -> obj1
bar1.call(obj2) //1  this -> obj1
// ??硬绑定 锁死?? 先执行 foo1.call(obj1)
// 再看一遍硬绑定
// call定义看一下

var bar2 = foo2.call(obj1); // call(?) ?是什么都一样，不影响结果, this消失??
// 此时已经执行 ？区别
// bar2 是 function
bar2(); // 12
bar2.call(obj2) // 2

