# this & object prototypes -- object

## 3. 对象

### 3.1 语法

```javascript
// 1.声明
var myobj = { key: value };
// 2.构造
var myobj = new Object();
myobj.key = value;
```

### 3.2 类型 :sparkles::sparkles::sparkles:

#### :star: 6 种主要类型('语言类型'):

string | number | boolean | null | undefined | object | symbol(ES2015)

:point_right: 前五种(简单基本类型)不是对象,用 typeof 判断.

```js
let str1 = "123";
console.log(typeof str1); // string
```

#### :star: 9 种对象子类型(内置对象)

String | Number | Boolean | Object | Function | Array | Date | RegExp | Error

:point_right: 用 obj instanceof \*\* 判断,如果用 typeof 判断则都是 object.

```js
let arr1 = [];
console.log(typeof arr1); // object
console.log(arr1 instanceof Array); // true
```

:point_right: "I am a string" 不是一个对象，如果对这个字符串进行操作，比如获取长度，JS 会自动转换成对象 => new String("I am a string").

### 3.3 内容

#### 3.3.1 数据描述符( 属性描述符 )

```js
var myObject = {
  a: 2,
};
var state = Object.getOwnPropertyDescriptor(myObject, "a");
console.log(state);
// {
//   value: 2,
//   writable: true,      可写性
//   enumerable: true,    可枚举性
//   configurable: true   可配置性
// }

// 定义属性描述符, Object.defineProperty(obj,key,{...})
var myObject = {};
Object.defineProperty(myObject, "age", {
  value: 18,
  writable: true,
  configurable: true,
  enumerable: true,
});
```

1. **writable**
   如果 writable:false;
   ```js
   myObject.a = 20;
   console.log(myObject.a); //18
   ```
2. **configurable**
   如果 configurable:false;
   ```js
   delete myObject.a;
   console.log(myObject.a); // 18
   ```
   ​:point_right:​ 因为不可配置，所以不能删除，也不能重新 defineProperty,但是可以把 writable 由 true -> false,不能 false -> true.
3. **enumerable**
   如果 enumerable:false,属性不参与遍历，但是可以直接获取
   ```js
   console.log(myObject); // {} a 不显示
   console.log(myObject.a); // 18
   ```

#### 3.3.2 不可变性( 属性 )

1. 对象常量 (writable,configurable -> false)
   ```js
   var myObject = {};
   Object.defineProperty(myObject, "FAVORITE_NUMBER", {
     value: 42,
     writable: false,
     configurable: false,
   });
   ```
2. 禁止扩展新属性，保留旧属性(Object.preventExtensions(..))
   ```js
   var myObject = {
     a: 2,
   };
   Object.preventExtensions(myObject);
   myObject.b = 3;
   myObject.b; // undefined
   ```
3. 密封( Object.seal(..) )
   :point_right: 在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性(但可以修改属性的值)。

4. 冻结( Object.freeze(..) )
   :point_right: 在一个现有对象上调用 Object.seal(..) 并把所有现有属性标记为 writable:false。冻结之后不能修改属性的值。(直接属性受影响，引用的其他对象不受影响)

#### 3.3.3 [[ Get ]]

:star: 对象就是键 / 值对的集合。可以通过 .propName 或者 ["propName"] 语法来获取属性值。

:star: 访问属性时，引擎实际上会调用内部的默认 [[ Get ]] 操作,在设置属性值时是 [[ Put ]]，[[ Get ]] 操作会检查对象本身是否包含这个属性，如果没找到的话还会查找 [[ Prototype ]]链。

```js
var myObject = {
  a: 2,
};
myObject.a; // 2
myObject.b; // undefined
```

内置 [[ Get ]] 在对象中查找同名属性 :

- :point_right: 找到: 返回属性值。
- :point_right: 没找到: 遍历可能存在的 [[ Prototype ]] 链(原型链)。
  - :point_right:找到：返回属性值。
  - :point_right:没找到：返回 undefined。

#### 3.3.4 [[ Put ]]

如果已经存在这个属性，[[ Put ]] 算法大致会检查下面这些内容:

1. 属性是否是 **访问描述符**(参见 3.3.5)? 如果是并且存在 setter 就调用 setter。
2. 属性的数据描述符中 writable 是否是 false ？如果是，在非严格模式下静默失败，在严格模式下抛出 TypeError 异常。
3. 如果都不是，将该值设置为属性的值。如果对象中不存在这个属性，[[ Put ]] 操作会更加复杂。对 [[Prototype ]] 进行修改。

#### 3.3.5 Getter 和 Setter

:star: getter 和 setter (都是隐藏函数)，部分改写默认操作，只能应用到单个属性上。

:star: 当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为 **“访问描述符”** （和“数据描述符”相对），忽略 writable 和 value 属性，关心 set, get, configurabel, enumerable

```js
var myObject = {
  // 给 a 定义一个 getter
  get a() {
    return 2;
  },
};
Object.defineProperty(myObject, "b", {
  //描述符
  // 给 b 定义一个 getter
  get: function () {
    return this.a * 2;
  },
  // 确保 b 会出现在对象的属性列表中
  enumerable: true,
});
// 由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛出错误。
myObject.a = 3;
myObject.a; // 2
myObject.b; // 4
```

:point_right: 通常来说 getter 和 setter 是成对出现的。

```js
var myObject = {
  // 给 a 定义一个 getter
  get a() {
    return this._a_;
  },
  // 给 a 定义一个 setter
  set a(val) {
    this._a_ = val * 2;
  },
};
myObject.a = 2;
myObject.a; // 4
```

#### 3.3.6 存在性

```js
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
```

1. in 和 hasOwnProperty() 不可枚举不影响检查对象
   :point_right: in : 检查对象及其[[ Prototype ]]原型链
   :point_right: hasOwnProperty(..) : 检查对象

   ```js
   console.log("a" in myObject); // true
   console.log("b" in myObject); // true
   console.log(myObject.hasOwnProperty("a")); // true
   console.log(myObject.hasOwnProperty("b")); // true
   ```

2. Object.keys() 和 Object.getOwnPropertyNames(返回数组)
   :point_right: Object.keys() : 检查对象可枚举
   :point_right: Object.getOwnPropertyNames : 检查对象所有属性

   ```js
   console.log(Object.keys(myObject)); // ["a"]
   console.log(Object.getOwnPropertyNames(myObject)); // ["a", "b"]
   ```

#### 3.3.7 遍历 :sparkles::sparkles::sparkles:

- 对象遍历

  ```js
  let obj1 = {
    a: "111",
    b: "222",
    c: "333",
  };
  ```

  1. for ..in..

  ```js
  for (var index in obj1) {
    console.log(`${index}:${obj1[index]}`);
  }
  ```

  2. Object.keys(..) / Object.values(..) -> 可枚举属性

  ```js
  Object.keys(obj1).forEach((key) => {
    console.log(`${key} : ${obj1[key]}`);
  });

  console.log(Object.values(obj1)); // ["111","222","333"] 返回数组
  ```

  3. Object.getOwnPropertyName(..) -> 所有属性

- 数组遍历

  ```js
  let arr1 = [1, 2, 3, 4];
  ```

  1. forEach

  ```js
  obj1.forEach((val, index) => {
    console.log(val);
  });
  ```

  2. for..of..

  ```js
  for (item of arr1) {
    console.log(item);
  }
  ```

  3. for..in..

  ```js
  for (index in arr1) {
    console.log(item[index]);
  }
  ```

## 4. 混合对象 "类"

## 5. 原型

## 6. 行为委托

## 7. ES 中的 Class
