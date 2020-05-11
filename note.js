// 3.1语法:
// 1.声明: var myobj = {key :value}
// 2.构造: var myobj = new Object(); myobj.key = value;

// 3.2六种主要类型('语言类型')：  前五种不是对象，是简单基本类型 ( typeof 判断 )
// string | number | boolean | null | undefined | object

// 对象子类型，通常被称为内置对象( 9种 ) ( instanceof 判断 ,typeof 结果都是 object,无法更具体 )
// String | Number | Boolean | Object | Function | Arrary | Date | RegExp | Error 

// ! "I am a string" 不是一个对象，它只是一个字面量。如果要在这个字面量上执行一些操作，比如获取长度、访问其中某个字符等，那需要将其转换为 String 对象，在必要时语言会自动把字符串字面量转换成一个 String 对象 => new String("I am a string")

var strPrimitive = "I am a string";
console.log(strPrimitive.length); // 13

// 3.3 内容
// 存储在对象容器内部的是这些属性的名称，它们就像指针（从技术角度来说就是引用）一样，指向这些值真正的存储位置。
var myObject = {
  a: 2
};
myObject.a; // 2 属性访问
myObject["a"]; // 2 键访问

// 3.3.1 可计算属性名(ES6)
var prefix = "foo";
var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world"
};
myObject["foobar"]; // hello
myObject["foobaz"]; // world

// 3.3.2 属性与方法
// 如果访问的对象属性是一个函数，也叫作属性访问，因为函数永远不会“属于”一个对象。
var myObject = {
  foo: function () {
    console.log("foo");
  }
};
var someFoo = myObject.foo;
someFoo; // function foo(){..}
myObject.foo; // function foo(){..}

// 3.3.3 数组
// 数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性,数组的长度没有改变，但是不建议这么做
var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
console.log(myArray) // [ 'foo', 42, 'bar', baz: 'baz' ]
console.log(myArray.length)// 3
console.log(myArray.baz)// "baz"

// 3.3.4 复制对象
// 深复制
var newObj = JSON.parse(JSON.stringify(someObj));
// 浅复制
// ES6 Object.assign(...) 第一个参数:目标对象;第二个参数:源对象
//遍历一个或多个源对象的所有可枚举（enumerable，参见下面的代码）的自有键（owned key，很快会介绍）并把它们复制（使用 = 操作符赋值）到目标对象，最后返回目标对象
var newObj = Object.assign({}, myObject)


// 3.3.5 属性描述符
var myObject = {
  a: 2
};
var state1 = Object.getOwnPropertyDescriptor(myObject, "a");
// 属性 a 的属性描述符，除了 value ,还有 writable（可写）、enumerable（可枚举）和 configurable（可配置）
console.log(state1); // { value: 2, writable: true, enumerable: true, configurable: true }

// 定义属性描述符, Object.defineProperty(obj,key,{...})
var myObject = {}
Object.defineProperty(myObject, "age", {
  value: 18,
  writable: true,
  configurable: true,
  enumerable: true,
})

// 若 writable:false
// 因为不可写
myObject.a = 20;
console.log(myObject.a); //18

// 若 configurable: false
// 因为不可配置，所以不能删除，也不能重新 defineProperty,但是可以把 writable 由 true -> false,不能 false -> true
delete myObject.a;
console.log(myObject.a); //18

//若 enumerable: false ,a不参与遍历，但是可以直接获取
console.log(myObject); // {} a不显示
console.log(myObject.a) // 18

// 3.3.6 不变性
// 所有的方法创建的都是浅不变形，也就是说，它们只会影响目标对象和它的直接属性。如果目标对象引用了其他对象（数组、对象、函数，等），其他对象的内容不受影响，仍然是可变的,需要采取以下方法让其不可变

// 1.对象常量
var myObject = {};
Object.defineProperty(myObject, "FAVORITE_NUMBER", {
  value: 42,
  writable: false,
  configurable: false
});

// 2. 禁止扩展
// 禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(..)
var myObject = {
  a: 2
};
Object.preventExtensions(myObject);
myObject.b = 3;
myObject.b; // undefined

// 3. 密封
//Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用
//Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。
//所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）。

//4. 冻结
// Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用
// Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们
// 的值。
// 这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意
// 直接属性的修改（不过就像我们之前说过的，这个对象引用的其他对象是不受影响的）。
// 你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用 Object.freeze(..)，
// 然后遍历它引用的所有对象并在这些对象上调用 Object.freeze(..)。但是一定要小心，因
// 为这样做有可能会在无意中冻结其他（共享）对象。


// 对象默认的 [[Put]] 和 [[Get]] 操作分别可以控制属性值的设置和获取。
// 3.3.7 [[Get]] 
var myObject = {
  a: 2
};
myObject.a; // 2
myObject.b; // undefined
// 对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性，如果找到就会返回这个属性的值。如果没有找到名称相同的属性,会遍历可能存在的 [[Prototype]] 链，也就是原型链，如果无论如何都没有找到名称相同的属性，那 [[Get]] 操作会返回值 undefined

// 3.3.8 [[Put]]
// 如果已经存在这个属性，[[Put]] 算法大致会检查下面这些内容。
// 1. 属性是否是访问描述符（参见 3.3.9 节）？如果是并且存在 setter 就调用 setter。
// 2. 属性的数据描述符中 writable 是否是 false ？如果是，在非严格模式下静默失败，在严格模式下抛出 TypeError 异常。
// 3. 如果都不是，将该值设置为属性的值。如果对象中不存在这个属性，[[Put]] 操作会更加复杂。我们会在第 5 章讨论 [[Prototype]]  时详细进行介绍。

// 3.3.9 Getter和Setter
// getter 和 setter (都是隐藏函数)，部分改写默认操作，只能应用到单个属性上
// 当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描述符”相对），忽略writable 和 value 属性，关心set,get, configurabel ,enumerable
// 
var myObject = {
  // 给 a 定义一个 getter
  get a() {
    return 2
  }
}
Object.defineProperty(myObject, 'b', { //描述符
  // 给 b 定义一个 getter
  get: function () {
    return this.a * 2
  },
  // 确保 b 会出现在对象的属性列表中
  enumerable: true
})
// 由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛出错误。
myObject.a = 3;
myObject.a; // 2
myObject.b; // 4

// 通常来说 getter 和 setter 是成对出现的
var myObject = {
  // 给 a 定义一个 getter
  get a() {
    return this._a_;
  },
  // 给 a 定义一个 setter
  set a(val) {
    this._a_ = val * 2;
  }
};
myObject.a = 2;
myObject.a; // 4


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


