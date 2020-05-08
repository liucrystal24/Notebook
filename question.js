// this 
function foo1() {
  console.log(this.a);
}

function foo2() {
  return function () {
    console.log(this.a);
  }
  // return () => {
  //   console.log(this.a)
  // }
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
};
bar1(); // 1 this -> obj1
bar1.call(obj2) //1  this -> obj1

var bar2 = foo2.call(obj1);
// foo2 this -> obj1 ,但是里面的返回值未绑定 this -> obj1,this 在全局
// 如果箭头函数的话，返回值就绑定在 foo2上，和foo2一致
bar2(); // 12 /箭头函数 : 1
bar2.call(obj2) // 2 /箭头函数 : 1

