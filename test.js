function ins() {
  return this.name
}
function speak(params) {
  let greeting = "Hello , I'm " + ins.call(this);
  console.log(greeting)
}
let me = {
  name: 'chris'
}

ins.call(me);
speak.call(me);


//---------------------
// * var count = 1;
function test(params) {
  console.log(this.count)
  // ? 这里 this 如果指向 全局，为什么添加了 *,仍然显示undefined 
  // ! node中没有Window,而是global,结构不一样
  // ！在 Chrome 中 this.count 可以拿到全局值，指向 Window.count
  this.count++;
  // ? this指的是哪里
  // ? 全局
  // 如果这行不加，则执行时, ReferenceError: count is not defined
}
test.count = 0;
test() // undefined
// ? 添加*,如果指向全局，不是已经创建了吗，为什么还是undefined
// ! 同上 node 和 Chrome 环境不同
// test 中的 this 没有指向自己
// 应使用 test.call(test);
console.log(test.count) // 0 
console.log(count) // count: NaN
// ? this.count变成了全局

