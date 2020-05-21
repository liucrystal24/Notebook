// object
// 2. 第 6 章会介绍本例对象的文字形式中声明函数的语法，这是 ES6 增加的一种简易函数声明语法。
// 3.3.2 章讨论 [[Prototype]] put
// 深浅复制

// var newObj = JSON.parse(JSON.stringify(someObj));
// 遍历一个或多个源对象的所有可枚举（enumerable，参见下面的代码）的自有键（owned key，很快会介绍）并把它们复制（使用 = 操作符赋值）到目标对象，最后返回目标对象

// var newObj = Object.assign({}, myObject)

// 5.1 Proxy