// 小结的最后一点
var count = 1;
function test() {
  console.log(this.count)
  this.count++;
}
test.count = 0;
test() // chrome : 1 , node : undefined
// chrome : this -> window,此时 window.count = 1
// node : 没有 window, 此时， this 绑定到 undefined
console.log(test.count) // chrome: 0 , node : 0
console.log(count) // chrome : 2 , node : 1
// chrome : window.count++ ,window.count = 2
// node : 直接拿到第一行中: var count = 1