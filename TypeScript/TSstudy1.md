# TypeScript

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

## 3. 函数参数和返回类型注解

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
