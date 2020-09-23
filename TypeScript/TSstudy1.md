# TypeScript

- [ ] :link: https://ts.xcatliu.com/advanced/
- [x] :link: https://www.bilibili.com/video/BV1qV41167VD (1-14)
- [ ] :link: https://www.tslang.cn/docs/home.html

? 类型访问 as / :
? 继承 extends / implements
? 继承 super / this

## 一、基础

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

## 二、进阶

## 1. 类型别名 / 字符串字面量类型

:books: 类型别名用来给一个类型起个新名字，常用于联合类型

```ts
type Name = string | number;
let chris: Name = "chris";
```

:books:字符串字面量类型用来约束取值只能是某 **几个字符串中的一个**

```ts
type Fruit = "apple" | "banana" | "orange";
let fruit1: Fruit = "apple";
let fruit1: Fruit = "peach"; // 报错，不能将类型“"peach"”分配给类型“Fruit”
```

:warning: 类型别名与字符串字面量类型都是使用 `type` 进行定义

## 2. 枚举

:books:枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
```

- ### 手动赋值

  :books: 未手动赋值的枚举项会接着上一个枚举项递增 **1** ,即使手动赋值的枚举项是小数或负数。

  ```ts
  enum Days {
    Sun = 7,
    Mon = 1,
    Tue,
    Wed,
    Thu = 4.5,
    Fri,
    Sat,
  }

  console.log(Days["Sun"] === 7); // true
  console.log(Days["Mon"] === 1); // true
  console.log(Days["Tue"] === 2); // true
  console.log(Days["Fri"]); // 5.5
  console.log(Days["Sat"]); // 6.5
  ```

- ### 常数项和计算所得项

  :books: 枚举项有两种类型：**常数项** 和 **计算所得项**。

  :warning: **如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**

  ```ts
  enum Color1 {
    Red,
    Green,
    Blue = "blue".length,
  }

  console.log(Color1); // { '0': 'Red', '1': 'Green', '4': 'Blue', Red: 0, Green: 1, Blue: 4 }

  enum Color2 {
    Red = "red".length,
    Green, // 报错，枚举成员必须具有初始化表达式。
    Blue,
  }
  ```

- ### 常数枚举

  :books: 常数枚举是使用 `const enum` 定义的枚举类型：

  :warning: 常数枚举与普通枚举的区别是，它会在**编译阶段被删除**，并且**不能包含计算成员**

  ```ts
  const enum Directions {
    Up,
    Down,
    Left,
    Right,
  }

  let directions = [
    Directions.Up,
    Directions.Down,
    Directions.Left,
    Directions.Right,
  ];
  ```

  :point_right: 编译结果:

  ```ts
  var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
  ```

- ### 外部枚举

  :books: 外部枚举是使用 `declare enum` 定义的枚举类型：

  :warning: `declare` 定义的类型只会用于编译时的检查，编译结果中会被删除

  ```ts
  declare enum Directions {
    Up,
    Down,
    Left,
    Right,
  }

  let directions = [
    Directions.Up,
    Directions.Down,
    Directions.Left,
    Directions.Right,
  ];
  ```

  :point_right: 编译结果:

  ```ts
  var directions = [
    Directions.Up,
    Directions.Down,
    Directions.Left,
    Directions.Right,
  ];
  ```

## 3. 类

### ES6 中类的用法

- #### 属性和方法

  :books: 使用 `class` 定义类，使用 `constructor` 定义构造函数。通过 `new` 生成新实例的时候，会自动调用构造函数。

  ```ts
  class Animal {
    public name;
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      return `My name is ${this.name}`;
    }
  }

  let a = new Animal("Jack");
  console.log(a.sayHi()); // My name is Jack
  ```

- #### 类的继承

  :books: 使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

  ```ts
  class Cat extends Animal {
    constructor(name) {
      super(name); // 调用父类的 constructor(name)
      console.log(this.name);
    }
    sayHi() {
      return "Meow, " + super.sayHi(); // 调用父类的 sayHi()
    }
  }

  let c = new Cat("Tom"); // Tom
  console.log(c.sayHi()); // Meow, My name is Tom
  ```

- #### 存取器

  :books: 使用 `getter` 和 `setter` 可以改变属性的赋值和读取行为

  ```ts
  class Animal {
    constructor(name) {
      this.name = name;
    }
    get name() {
      return "Jack";
    }
    set name(value) {
      console.log("setter: " + value);
    }
  }

  let a = new Animal("Kitty"); // setter: Kitty
  a.name = "Tom"; // setter: Tom
  console.log(a.name); // Jack
  ```

- #### 静态方法

  :books: 使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用:

  ```ts
  class Animal {
    static isAnimal(a) {
      return a instanceof Animal;
    }
    static say() {
      console.log("hi");
    }
  }

  let a = new Animal();
  console.log(Animal.isAnimal(a)); // true
  a.isAnimal(a); // 报错,isAnimal 是静态方法
  Animal.say(); // hi
  ```

### ES7 中类的用法

- #### 实例属性

  :books:ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义：

  ```ts
  class Animal {
    name = "Jack";

    constructor() {
      // ...
    }
  }

  let a = new Animal();
  console.log(a.name); // Jack
  ```

- #### 静态属性

  :books: ES7 提案中，可以使用 `static` 定义一个静态属性：

  ```ts
  class Animal {
    static num = 42;

    constructor() {
      // ...
    }
  }

  console.log(Animal.num); // 42
  ```

### TypeScript 中类的用法

- #### 访问修饰符( `public` / `private` / `protected` )

  :dart: **public** ：当类中的参数定义时，默认为 public 访问方式，public 可以在类的**内部、外部**调用，且**可以继承**。

  ```ts
  class Person {
    name: string = "chris";
    // 相当于 public name:string = "chris";
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
  /* ---- 类的外部调用 ---- */
  console.log(chris.name); // chris
  chris.sayHello(); // hello chris
  crystal.sayBye(); // bye chris
  ```

  :dart: **private** ：只能在类的**内部调用，不可以继承**。

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

  :dart: **protected** ：只能在类的**内部调用，可以继承**。

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

- #### 参数属性

  :books: `修饰符` 和 `readonly` 还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁:

  ```ts
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  ```

  :point_right: 较为繁琐，可以简化：

  ```ts
  class Person {
    public constructor(public name: string) {}
  }
  ```

- #### readonly

  :books: 只读属性关键字，只允许出现在 **属性声明** 或 **索引签名** 或 **构造函数**

  :warning: 如果 `readonly` 和其他访问 **修饰符** 同时存在的话，需要写在其 **后面**

  ```ts
  class Animal {
    public constructor(readonly name) {}
  }

  let a = new Animal("Jack");
  console.log(a.name); // Jack
  a.name = "Tom"; // 报错，name 只读
  ```

- #### 抽象类

  :books: `abstract` 用于定义 **抽象类** 和其中的 **抽象方法** 。

  :warning: 抽象类是不允许被实例化

  ```ts
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    public abstract sayHi();
  }

  let a = new Animal("Jack"); // 报错，不允许实例化
  ```

  :warning: 抽象类中的抽象方法 **不给出具体实现**，继承抽象类的 **子类** 必须 **实现抽象类中的抽象方法**

  ```ts
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    // 1. 抽象方法不给出具体实现
    public abstract sayHi();
  }

  class Cat extends Animal {
    // 2. 继承子类必须实现抽象中的抽象方法
    public sayHi() {
      console.log(`Meow, My name is ${this.name}`);
    }
  }

  let cat = new Cat("Tom");
  ```

## 4. 类与接口

- ### 类实现接口

  :books: 接口除了可以用于对「对象的形状（Shape）」进行描述，还可以对类的一部分行为进行**抽象**。

  :books: **实现（implements）** 是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口 **（interfaces）**，用 **implements** 关键字来实现。这个特性大大提高了面向对象的灵活性。

  :point_right: 举例：动物类中，猫有大叫的方法。人这个类也有大叫的方法，这时就可以把大叫这个方法提取出来，作为一个接口，猫和人都去实现它：

  ```ts
  interface Shout {
    shout();
  }
  class Cat extends Animal implements Shout {
    shout() {
      console.log("cat shout");
    }
  }
  class Person implements Shout {
    shout() {
      console.log("person shout");
    }
  }

  let cat: Cat = new Cat();
  let chris: Person = new Person();

  cat.shout(); // cat shout
  chris.shout(); // person shout
  ```

  :point_right: 一个类可以实现多个接口:

  ```ts
  interface Shout {
    shout();
  }

  interface Say {
    sayhi();
    saybye();
  }

  class Person implements Shout, Say {
    shout() {
      console.log("person shout");
    }
    sayhi() {
      console.log("person sayhi");
    }
    saybye() {
      console.log("person saybye");
    }
  }
  ```

- ### `class` , `type` , `interface` 用法区别

  :books: `type` , `interface` 在运行时是被消除的，但是 `class` 经过编译后仍然存在
  :books: `interface` 只能声明对象类型、函数类型，`type` 可以声明基本类型，联合类型，元组等类型

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

  :books: `interface` 可以声明合并，`type` 不行

  ```ts
  interface Point {
    x: number;
  }
  interface Point {
    y: number;
  }

  const point: Point = { x: 1, y: 2 };
  ```

  :books: `interface` ，`type` 可以互相继承，且都可以继承 `class`

  ```ts
  // interface 继承 type
  type PointX = { x: number };
  interface Point2d extends PointX {
    y: number;
  }

  // type 继承 interface
  interface PointX {
    x: number;
  }
  type Point2d = PointX & { y: number };

  // type / interface 继承 class
  class PointX {
    x: number;
  }
  type Point2d = PointX & { y: number };
  interface Point3d {
    y: number;
    z: number;
  }
  ```

## 5. 泛型

:books: 泛型：在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

- ### 格式

  :point_right: 函数名后添加了 `<T>` ，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>`：

  ```ts
  function createArray<T>(length: number, val: T): Array<T> {
    let array: T[] = [];
    for (i = 0; i < length; i++) {
      array[i] = val;
    }
    return array;
  }

  createArray<string>(3, "x"); // ['x','x','x']
  createArray(4, "y"); // ['y','y','y','y']
  ```

  :warning: 在调用的时候，可以指定它具体的类型为 string。也可以不手动指定，而让类型推论自动推算出来。

- ### 多个类型参数

  :point_right: 交换输入的元组：

  ```ts
  function swag<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
  }

  swag<number, string>([1, "2"]); // ["2" , 1]
  ```

- ### 泛型约束

  :books: 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，需要对泛型进行约束：

  ```ts
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }

  loggingIdentity(7); // 报错，7 不符合 Lengthwise 形状
  ```

  :warning: 使用 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。如果传入的 `arg` 不包含 `length`，那么在编译阶段就会报错。

- ### 泛型接口

  :warning: 在使用泛型接口的时候，需要定义泛型的类型

  ```ts
  interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
  }

  // 在使用泛型接口的时候，需要定义泛型的类型
  let createArray: CreateArrayFunc<any>;
  createArray = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  };

  createArray(3, "x"); // ['x', 'x', 'x']
  ```

- ### 泛型类

  :books: 与泛型接口类似，泛型也可以用于类的类型定义中：

  ```ts
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }

  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };
  ```

- ### 泛型参数的默认类型

  :books: 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用：

  ```ts
  function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  ```

## 6. 声明合并

:books: 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

- ### 函数合并

  :point_right: 之前说明的 **重载** 定义多个函数类型：

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

- ### 接口合并

  :point_right: 接口中的属性在合并时会简单的合并到一个接口中：

  ```ts
  interface Alarm {
    price: number;
  }
  interface Alarm {
    weight: number;
  }
  ```

  :point_right: 合并成:

  ```ts
  interface Alarm {
    price: number;
    weight: number;
  }
  ```

  :warning: 合并的 **属性的类型必须是唯一** 的

  ```ts
  interface Alarm {
    price: number;
  }
  interface Alarm {
    price: string; // 类型不一致，会报错
    weight: number;
  }
  ```

  :books: 接口中方法的合并，与函数的合并一样

  ```ts
  interface Alarm {
    price: number;
    alert(s: string): string;
  }
  interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
  }
  ```

  :point_right: 合并成:

  ```ts
  interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
  }
  ```

- ### 类的合并

  :books: 类的合并与接口的合并规则一致

## 7.声明文件

什么是声明文件

通常我们会把声明语句放到一个单独的文件中，这就是声明文件。
