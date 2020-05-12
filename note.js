// 3.3.10 存在性
var myObject = {
  a: 2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false

// in 会检查对象及其[[Prototype]]原型链,hasOwnProperty(..) 只会检查是否存在对象中

// 1. 枚举

var myObject = {};
Object.defineProperty(
  myObject,
  "a",
  // 让 a 像普通属性一样可以枚举
  { enumerable: true, value: 2 }
);
Object.defineProperty(
  myObject,
  "b",
  // 让 b 不可枚举
  { enumerable: false, value: 3 }
);
myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty("b"); // true
// .......
for (var k in myObject) {
  console.log(k, myObject[k]);
}
// "a" 2
console.log(myObject) // { a: 2 }

// propertyIsEnumerable() 只检查给定对象
myObject.propertyIsEnumerable("a"); // true, 
myObject.propertyIsEnumerable("b"); // false

// Object.keys()/getOwnPropertyNames 只检查对象
// keys 可枚举/getOwnPropertyNames 所有属性
Object.keys(myObject); // ["a"]
Object.getOwnPropertyNames(myObject); // ["a", "b"]

// 3.4遍历

// 数组
// forEach(..) 会遍历数组中的所有值并忽略回调函数的返回值
let arr1 = [1, 2, 3, 4]

arr1.forEach((val, index) => {
  console.log(val) // 1 2 3 4
})

// ES6 for...of...
for (var item of arr1) {
  console.log(item); //1 2 3 4
}

// ES6 for...in...
for (index in arr1) {
  console.log(`${index} : ${arr1[index]}`)
} // // 0:1 1:2 2:3 3:4

// 对象
let obj1 = {
  a: 1,
  b: 2,
  c: 3
}

// 1.for...in...
for (index in obj1) {
  console.log(`${index} : ${obj1[index]}`)
}// a:1 b:2 c:3

// Object.keys(obj) 返回数组，可枚举属性名
Object.keys(obj1).forEach((key) => {
  console.log(key + ':' + obj1[key]);
})// a:1 b:2 c:3
// 或者 Object.values(obj)
console.log(Object.values(obj1)); // [1,2,3]

// Object.getOwnPropertyNames(obj) , 所有属性名
Object.getOwnPropertyNames(obj1).forEach((key) => {
  console.log(key + ':' + obj1[key]);
});// a:1 b:2 c:3
