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

- 原始数据类型

  :dart: 原始数据类型包括：**布尔值、数值、字符串、null、undefined** 以及 ES6 中的新类型 **Symbol**

  ```ts
  let isDone: boolean = false;
  let id: number = 1;
  let myName: string = "chris";
  ```

- 对象类型

  ```ts
  // 对象
  const student: {
    sname: string;
    sage: number;
  } = {
    sname: "chris",
    sage: 18,
  };

  // 数组
  const students: string[] = ["chris", "crystal"];

  // 类
  class Person {}
  const chris: Person = new Person();

  // 函数 (返回值为字符串)
  const startClass: () => string = () => {
    return "go to school";
  };
  // void 表示没有任何返回值的函数
  function sayHello(): void {
    console.log("hello");
  }
  ```

- 自定义类型

  ```ts
  interface device {
    ID: number;
    name: string;
  }

  const mobile: device = {
    ID: 1,
    name: "mobile1",
  };

  console.log(mobile); // { ID: 1, name: 'mobile1' }
  ```

### 2.1 函数参数和返回类型注解

- 普通形参

  ```ts
  function add(a: number, b: number): number {
    return a + b;
  }
  const resultAdd = add(1, 2);
  ```

- 对象形参

  ```ts
  function add({ a, b }: { a: number; b: number }): number {
    return a + b;
  }
  const resultAdd = add({ a: 1, b: 2 });
  ```

### 2.2 数组类型注解

- 直接注解

  ```ts
  const stringArr: string[] = ["1", "2", "3"];
  const numberArr: number[] = [1, 2, 3];
  const numberArr: (string | number)[] = [1, "2", 3];
  ```

- 类型别名

  ```ts
  // 这里用 type,class 都行，区别见后面
  type Student = { name: string; age: number };
  class Teacher {
    name: string;
    age: number;
  }
  const class1: Student[] = [
    { name: "chris", age: 18 },
    { name: "crystal", age: 20 },
  ];
  const class2: Teacher[] = [
    { name: "chris", age: 18 },
    { name: "crystal", age: 20 },
  ];
  ```

- 元组的使用和类的约束（具体定义数组每个位置的类型）
  ```ts
  const student: [string, number, string] = ["chris", 18, "basketball"];
  ```

## 3. interface 接口

```ts
interface Student {
  name: string;
  age: number;
  gender: string;
  // hobby 可有可无
  hobby?: string;
  // 可以添加其他任何类型的字段
  [propname: string]: any;
  say(): string;
}

const chris = {
  name: "chris",
  age: 15,
  gender: "male",
  hobby: "basketball",
  height: 183,
  say: () => {
    return "这就是我";
  },
};

const introduce: (params: Student) => void = (student) => {
  console.log("姓名: " + student.name);
  console.log("年龄: " + student.age);
  console.log("性别: " + student.gender);

  student.hobby && console.log("爱好: " + student.hobby);
  student.height && console.log("身高: " + student.height);
  console.log(student.say());
};

introduce(chris);
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
