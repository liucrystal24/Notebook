# TypeScript

:link: https://ts.xcatliu.com/advanced/
:link: https://www.bilibili.com/video/BV1qV41167VD
:link: https://www.tslang.cn/docs/home.html

? as :
? extends implements

## 1. 准备

- 安装

  ```bash
  npm install typescript -g
  npm install ts-node -g
  ```

- 编辑

  ```ts
  function welcome() {
    let hello: string = "hello world";
    console.log(hello);
  }

  welcome();
  ```

- 运行

  ```bash
  ts-node demo1.ts
  ```

  :point_right: 输出 ：hello world

## 2. 静态类型

- 基础静态类型

  ```ts
  // id 可以继承 number 的方法，如 toFixed
  const id: number = 1;
  ```

- 对象静态类型

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
  // void 指 没有返回值
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
  type student = { name: string; age: number };
  class teacher {
    name: string;
    age: number;
  }
  const class1: student[] = [
    { name: "chris", age: 18 },
    { name: "crystal", age: 20 },
  ];
  const class2: teacher[] = [
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
