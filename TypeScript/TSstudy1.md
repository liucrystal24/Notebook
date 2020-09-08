# TypeScript

- [ ] :link: https://ts.xcatliu.com/advanced/
- [x] :link: https://www.bilibili.com/video/BV1qV41167VD (1-14)
- [ ] :link: https://www.tslang.cn/docs/home.html

? 类型访问 as / :
? 继承 extends / implements
? 继承 super / this

## 1. Hello TypeScript

- 安装

  ```bash
  npm install typescript -g
  npm install ts-node -g
  ```

- 编辑

  ```ts
  function welcome(person: string) {
    console.log("hello " + person);
  }
  let user1 = "chris";
  welcome(user1); // hello chris

  let user2 = [1, 2, 3];
  welcome(user2); // 报错，user2 的类型应为 string
  ```

- 运行

  ```bash
  ts-node demo1.ts
  ```

  :point_right: `ts-node` 可以直接运行 `.ts`（实现原理还是先编译成 `.js`，然后运行 js 文件）,省略了 `$ tsc demo.ts`

  :warning: **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 `JavaScript` 文件一样，不会对类型进行检查。

## 2. 数据类型

- ### 原始数据类型

  :books: 原始数据类型包括：**布尔值、数值、字符串、null、undefined** 以及 ES6 中的新类型 **Symbol**

  ```ts
  let isDone: boolean = false;
  let id: number = 1;
  let myName: string = "chris";
  // null 和 undefined
  let u: undefined = undefined;
  let n: null = null;
  // void 表示没有任何返回值的函数
  function sayHello(): void {
    console.log("hello");
  }
  ```

  :question: **void** 和 **null、undefined**区别：

  `undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量，而 `void` 类型的变量不能赋值给 `number` 类型的变量

  ```ts
  // 1. 不会报错
  let num: number = undefined;
  // 2. 不会报错
  let u: undefined;
  let num: number = u;
  // 3. 报错
  let u: void;
  let num: number = u;
  ```

- ### 任意类型

  :books: 一个普通类型，在赋值过程中是不允许改变类型的,但是 **any** 类型可以

  ```ts
  let myFavoriteNumber: string = "seven";
  myFavoriteNumber = 7; // 报错

  let myFavoriteNumber: any = "seven";
  myFavoriteNumber = 7; // 允许
  ```

  :warning: 变量如果在声明的时候，未指定其类型，且**未赋值**，那么它会被识别为 **any** 类型，如果声明时**赋值**，TS 会进行类型推断：

  ```ts
  // 1. 未指定类型，未赋值
  let something;
  // 等价于 let something: any
  something = "seven";
  something = 7;

  // 2. 未指定类型，已赋值
  let something = "seven";
  // 等价于 let something: string = 'seven'
  something = 7; // 报错，因为类型推断为 string
  ```

- ### 联合类型

  :books: 联合类型（Union Types）表示取值可以为多种类型中的一种

  :warning: 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里**共有的属性或方法**

  ```ts
  let myNumber: string | number;
  function getLength(something: string | number): number {
    return something.length; // 报错，number 没有 length
  }
  function getString(something: string | number): string {
    return something.toString(); // √
  }
  ```

- ### 对象类型 - interface 接口

  :books: interface 用来定义对象的类型，除了可用于对类的一部分行为进行抽象以外，也常用于对「**对象的形状（Shape）**」进行描述。

  - :warning: 变量的属性与必须接口一致（ **chris** 的 **形状** 必须和 **Student** 一致 ），**多 / 少** 属性都会报错。

  ```ts
  interface Student {
    name: string;
    age: number;
  }

  let chris = {
    name: "chris",
    age: 18,
  };
  ```

  - #### 可选属性

  ```ts
  interface Student {
    name: string;
    age?: number;
  }

  let chris = {
    name: "chris",
  };
  ```

  - #### 任意属性

  ```ts
  interface Student {
    name: string;
    [propname: string]: string;
  }

  let chris = {
    name: "chris",
    gender: "male",
  };
  ```

  :warning: 一旦定义了任意属性，那么 **确定属性** 和 **可选属性** 的类型都必须是它的类型的 **子集**，如果出现冲突，应对 **任意属性** 定义 **联合类型**。

  ```ts
  interface Student {
    name: string;
    age: number;
    [propname: string]: string; // 报错，因为age是number类型，不属于string的子集
    // [propname: string]: string | number;
  }
  ```

  - #### 只读属性

  ```ts
  interface Person {
    readonly id: number;
    name: string;
  }

  let chris = {
    id: 24,
    name: "chris",
  };
  chris.id = 5; // 报错，只读属性初始化后不能再赋值
  ```

- ### 数组类型

  - #### 「类型 + 方括号」表示法

  ```ts
  const stringArr: string[] = ["1", "2", "3"];
  const numberArr: (string | number)[] = [1, "2", 3];
  ```

  - #### 数组泛型

  ```ts
  let fibonacci: Array<number> = [1, 1, 2, 3, 5];
  ```

  - #### 类型别名

  ```ts
  interface Student {
    name: string;
    age: number;
  }

  const class1: Student[] = [
    { name: "chris", age: 18 },
    { name: "crystal", age: 20 },
  ];
  ```

  - #### 元组的使用和类的约束

  :books: 具体定义数组每个位置的类型

  :warning: 当添加越界的元素时，它的类型会被限制为元组中每个类型的 **联合类型**

  ```ts
  let student: [string, number, string] = ["chris", 18, "basketball"];

  student.push("crystal"); // 满足 string | number
  student.push(20); // 满足 string | number
  student.push(true); // 报错，不满足联合类型
  ```

- ### 函数类型

  - #### 函数声明 / 函数表达式

  :warning: TS 中的 `=>` 和 ES6 的 `=>` 不是一个意义，在 **TypeScript** 的类型定义中，`=>` 用来表示函数的定义，左边是 **输入类型** ，需要用括号括起来，右边是 **输出类型** 。

  ```ts
  // 函数声明
  function add(a: number, b: number): number {
    return a + b;
  }

  // 函数表达式
  let add: (a: number, b: number) => number = (
    a: number,
    b: number
  ): number => {
    return a + b;
  };
  ```

  - #### 接口定义函数形状

  ```ts
  interface Student {
    (name: string, age: string): string;
  }

  let sayHello: Student = (name: string, age: string): string => {
    return `hello,I'm ${name},I'm ${age}.`;
  };
  ```

  - #### 可选参数

  :warning: 可选参数后面不允许再出现必需参数

  ```ts
  let sayHello: Student = (
    name: string,
    age: string,
    hobby?: string
  ): string => {
    return `hello,I'm ${name},I'm ${age},I like ${hobby}`;
  };
  ```

  - #### 对象参数

  :warning: 对象参数要单独类型定义，不能在对象内类型定义。

  ```ts
  function add({ a, b }: { a: number; b: number }): number {
    return a + b;
  }
  const resultAdd = add({ a: 1, b: 2 });
  ```

  - #### 重载

  :books: 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

  :point_right: 多次定义 `reverse`，前两次是函数定义，最后一次是函数实现，TypeScript 会 **优先从最前面的函数定义开始匹配** ，所以多个函数定义如果有包含关系，需要优先 **把精确的定义写在前面** 。

  ```ts
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string {
    if (typeof x === "number") {
      return Number(x.toString().split("").reverse().join(""));
    } else if (typeof x === "string") {
      return x.split("").reverse().join("");
    }
  }
  ```

## 3. 类型断言

:books: **类型断言**：用来手动指定一个值的类型

- ### 语法

```ts
值 as 类型；
```

:warning: 不推荐使用 `<类型>值` 的用法，在 React 的 tsx 语法中表示一个 `ReactNode`，在 ts 中可以能表达一个泛型，有歧义。

- ### 使用场景

1. #### 将一个联合类型断言为其中一个类型

   :books: ts 只能访问联合类型的所有类型中**共有的属性或方法**,当我们不确定类型时，访问其中一个类型的属性或方法时，需要使用类型断言：

   ```ts
   interface Cat {
     name: string;
     run(): void;
   }
   interface Fish {
     name: string;
     swim(): void;
   }

   function getName(animal: Cat | Fish) {
     // type of animal.swim 会报错，swim 不属于 Cat,Fish 共有的方法
     if (typeof (animal as Fish).swim === "function") {
       return true;
     }
     return false;
   }
   ```

2. #### 将一个父类断言为更加具体的子类

   :books: ts 当类之间有继承关系时，可以使用类型断言：

   ```ts
   interface Cat extends Animal {
     run(): void;
   }
   interface Fish extends Animal {
     swim(): void;
   }

   function getSkill(animal: Animal) {
     // type of animal.swim 会报错，swim 不属于 Cat,Fish 共有的方法
     if (typeof (animal as Cat).run === "function") {
       return true;
     }
     return false;
   }
   ```

3. #### 将任何一个类型断言为 any

   :books: 我们可以将某对象临时断言为 any 类型，因为在 any 类型的变量上，访问任何属性都是允许的

   ```ts
   window.foo = 1; // 报错。window 上没有 foo
   (window as any).foo = 1;
   ```

   :warning: 将一个变量断言为 any 有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。

4. #### 将 any 断言为一个具体的类型

   :books: 在日常的开发中，我们不可避免的需要处理 any 类型的变量，我们可以通过类型断言及时的把 any 断言为精确的类型，使我们的代码拥有更高的可维护性

   ```ts
   // getCacheData 本来是返回值是 any
   function getCacheData(key: string): any {
     return (window as any).cache[key];
   }

   interface Cat {
     name: string;
     run(): void;
   }
   // 调用完 getCacheData 之后，将它断言为 Cat 类型，后续对 tom 的访问时就有了代码补全
   const tom = getCacheData("tom") as Cat;
   tom.run();
   ```

- ### 类型断言的限制

  :books: 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A

  ```ts
  interface Animal {
    name: string;
  }
  interface Cat {
    name: string;
    run(): void;
  }

  let tom: Cat = {
    name: "Tom",
    run: () => {
      console.log("run");
    },
  };
  let animal: Animal = tom;
  ```

  :point_right: `Cat` 包含了 `Animal` 中的所有属性，等价于 `Cat extends Animal`

  ```ts
  interface Animal {
    name: string;
  }
  interface Cat extends Animal {
    run(): void;
  }
  ```

  :point_right: 就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量, `Cat` 类型的 tom 可以赋值给 `Animal` 类型的 animal，即 `Animal` 兼容 `Cat`

  :dart: 上述的四种类型断言的使用场景都符合互相兼容

- ### 类型断言比较

  - #### 类型断言 vs 类型转换

  ```ts
  function toBoolean(something: any): boolean {
    return something as boolean;
  }
  toBoolean(1); // 1
  ```

  :warning: 类型断言只会影响 TypeScript 编译时的类型，**类型断言语句在编译结果中会被删除**,所以它不会真的影响到变量的类型，若要进行类型转换，需要直接调用类型转换的方法：

  ```ts
  function toBoolean(something: any): boolean {
    return Boolean(something);
  }

  toBoolean(1); // true
  ```

  - #### 类型断言 vs 类型声明

  类型断言 ( A as B ) 条件： `A` 兼容 `B`，或 `B` 兼容 `A`

  类型声明 ( A = B ) 条件： `A` 兼容(包含) `B`

  ```ts
  interface Animal {
    name: string;
  }
  interface Cat {
    name: string;
    run(): void;
  }

  const animal: Animal = {
    name: "tom",
  };

  let tom = animal as Cat; // Cat、Animal 互相兼容，可以使用 as
  let tom: Cat = animal; // 报错：animal 中没有 run(),Cat 不兼容 Animal
  ```

## 4. class 类

```ts
class Person {
  content = "你好";
  sayHello() {
    return this.content;
  }
}

// 继承
class Teacher extends Person {
  // 重写
  sayHello() {
    // super 调用父类的方法
    return super.sayHello() + "!";
  }

  sayWeather() {
    return "今天天气不错";
  }
}

const crystal = new Teacher();

console.log(crystal.sayHello()); // 你好!
console.log(crystal.sayWeather()); // 今天天气不错;
```

### 4.1 类的访问方式( `public` / `private` / `protected` )

- `public`

  当类中的参数定义时，默认为 public 访问方式，public 可以在类的**内部、外部**调用，且**可以继承**。

  ```ts
  class Person {
    /* ---- 类的内部 ---- */
    // public name:string = "chris";
    name: string = "chris";
    sayHello() {
      console.log("hello " + this.name);
    }
    /* ---------------- */
  }
  const chris = new Person();
  class Teacher extends Person {
    sayBye() {
      console.log("bye " + this.name);
    }
  }
  const crystal = new Teacher();
  /* ---- 类的外部调用 ---- */
  console.log(chris.name); // chris
  chris.sayHello(); // hello chris
  crystal.sayBye(); // bye chris
  ```

- `private`

  private 只能在类的**内部调用，不可以继承**。

  ```ts
  class Person {
    private name: string = "chris";
    sayHello() {
      console.log("hello " + this.name);
    }
  }
  const chris = new Person();
  class Teacher extends Person {
    sayBye() {
      console.log("bye " + this.name);
    }
  }
  const crystal = new Teacher();
  console.log(chris.name); // 报错，不可以在类的外部调用
  chris.sayHello(); // hello chris
  crystal.sayBye(); // 报错，不可以继承
  ```

- `protected`

  protected 只能在类的**内部调用，可以继承**。

  ```ts
  class Person {
    protected name: string = "chris";
    sayHello() {
      console.log("hello " + this.name);
    }
  }
  const chris = new Person();
  class Teacher extends Person {
    sayBye() {
      console.log("bye " + this.name);
    }
  }
  const crystal = new Teacher();
  console.log(chris.name); // 报错，不可以在类的外部调用
  chris.sayHello(); // hello chris
  crystal.sayBye(); // bye chris
  ```

### 4.2 类的构造函数

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

:point_right: 较为繁琐，可以简化：
:warning: constructor 中的注解一定要添加类的访问方式，如 `public`

```ts
class Person {
  constructor(public name: string) {}
}
```

:warning: 只要继承的子类中有构造函数，constructor 中一定要添加 `super()`

```ts
class Teacher extends Person {
  constructor(public age: number) {
    super("chris");
  }
}

const chris = new Teacher(18);
console.log(chris.name); // chris
console.log(chris.age); // 18
```

### 4.3 类的 Getter , Setter , static

- Getter / Setter

  :point_right: 结合类的访问方式 `private`，可以实现在类的外部访问不到 `_age`，只能通过 **age()** 方法访问到处理过的 `_age`

  ```ts
  class Student {
    constructor(private _age: number) {}
    get age() {
      return this._age + 3;
    }
    set age(age: number) {
      this._age = age;
    }
  }
  const chris = new Student(25);
  console.log(chris.age); // 28
  chris.age = 15;
  console.log(chris.age); // 18
  ```

  :warning: 如果不希望方法改动 `_age`，防止误操作，可以将 `_age` 定义为只读

  ```ts
  class Student {
    constructor(private readonly _age: number) {}
    get age() {
      return this._age + 3;
    }
    set age(age: number) {
      this._age = age; // 报错，_age 不能被修改
    }
  }
  ```

- static (静态类)

  :point_right: 静态类 `static`，可以不用实例化，就能调用里面的方法

  ```ts
  class Student {
    static sayHello() {
      console.log("hello");
    }
  }
  Student.sayHello();
  ```

### 4.4 抽象类

:point_right: 抽象类中申明一个方法（抽象），子类继承时，可以根据情况，在这个方法里有自己的业务逻辑，不冲突

```ts
abstract class Person {
  abstract skill();
}

class Student extends Person {
  skill() {
    console.log("学习");
  }
}

class Teacher extends Person {
  skill() {
    console.log("教育");
  }
}

class Police extends Person {
  skill() {
    console.log("正义");
  }
}
```

## tips

### :books: `class` , `type` , `interface` 用法区别

- `type` , `interface` 在运行时是被消除的，但是 `class` 经过编译后仍然存在
- `interface` 只能声明对象类型、函数类型，`type` 可以声明基本类型，联合类型，元组等类型

  ```ts
  // 基本
  type Name = string;

  // 对象
  type PartialPointX = { x: number };
  type PartialPointY = { y: number };

  // 联合
  type PartialPoint = PartialPointX | PartialPointY;

  // 元组
  type Data = [number, string];
  ```

- `interface` 可以声明合并，`type` 不行

  ```ts
  interface Point {
    x: number;
  }
  interface Point {
    y: number;
  }

  const point: Point = { x: 1, y: 2 };
  ```

- `interface` ，`type` 可以互相继承

  ```ts
  // interface 继承 interface
  interface PartialPointX {
    x: number;
  }
  interface Point extends PartialPointX {
    y: number;
  }

  // type 继承 interface
  type PartialPointX = { x: number };
  type Point = PartialPointX & { y: number };

  // interface 继承 type
  type PartialPointX = { x: number };
  interface Point extends PartialPointX {
    y: number;
  }

  // type 继承 type
  interface PartialPointX {
    x: number;
  }
  type Point = PartialPointX & { y: number };
  ```
