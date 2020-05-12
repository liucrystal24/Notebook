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

console.log("a" in myObject); // true
console.log("b" in myObject); // false
console.log(myObject.hasOwnProperty("a")); // true
console.log(myObject.hasOwnProperty("b")); // false