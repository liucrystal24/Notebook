// this词法，箭头函数 ES6
// 箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。

function foo1() {
  // 返回一个箭头函数
  return () => {
    //this 继承自 foo1()
    console.log(this.a)
  }
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
};

var a = 12;

// bar1 继承全局的 a,a = 12
var bar1 = foo1();
bar1(); // 12
bar1.call(obj1); // 12
bar1.call(obj2); // 12

// bar11 继承 obj1 的 a,a=1
var bar11 = foo1.call(obj1)
bar11(); // 1
bar11.call(obj1); // 1
bar11.call(obj2); // 1

// 在哪里运行，就是哪里的a
// var bar2 = foo2() 无论bar2 等于哪种，结果都一样
var bar2 = foo2.call(obj1);
bar2(); // 12
bar2.call(obj1); // 1
bar2.call(obj2); // 2


function foo() {
  setTimeout(() => { // 这里的 this 在此法上继承自 foo()
    console.log('-------')
    console.log(this.a);
  }, 100);
}
var obj = {
  a: 2
};
var a = 3;
{
  let a = 4;
  foo.call(obj);
}

