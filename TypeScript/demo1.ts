/*
 * @Author: ChrisLiu
 * @Date: 2020-09-03 21:44:26
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-09-13 23:39:17
 * @Description: file content
 */
// const arr1 = [1, { a: 1 }, 3];
// type student = { name: string; age: number };
// class teacher {
//   name: string;
//   age: number;
// }
// const class1: student[] = [
//   { name: "chris", age: 18 },
//   { name: "crystal", age: 20 },
// ];
// const class2: teacher[] = [
//   { name: "chris", age: 18 },
//   { name: "crystal", age: 20 },
// ];

// console.log(class1, class2);

// interface Student {
//   name: string;
//   age: number;
//   gender: string;
//   hobby?: string;
//   // [propname: string]: any;
//   say(): string;
// }

// const chris = {
//   name: "chris",
//   age: 15,
//   gender: "male",
//   // hobby: "basketball",
//   height: 183,
//   say: () => {
//     return "这就是我";
//   },
// };

// const introduce: (params: Student) => void = (student) => {
//   console.log("姓名: " + student.name);
//   console.log("年龄: " + student.age);
//   console.log("性别: " + student.gender);
//   student.hobby && console.log("爱好: " + student.hobby);
//   console.log(student.say());
//   // student.height && console.log("身高: " + student.height);
// };
// function introduce(params: Student): void {
//   console.log("姓名: " + params.name);
//   console.log("年龄: " + params.age);
//   console.log("性别: " + params.gender);
//   console.log("爱好: " + params.hobby);
// }
// introduce(chris);

// class Person {
//   content = "你好";
//   sayHello() {
//     return this.content;
//   }
// }

// // 继承
// class Teacher extends Person {
//   // 重写
//   sayHello() {
//     // super 调用父类的方法
//     return super.sayHello() + "!";
//   }

//   sayWeather() {
//     return "今天天气不错";
//   }
// }

// const crystal = new Teacher();

// console.log(crystal.sayHello()); // 你好!
// console.log(crystal.sayWeather()); // 今天天气不错;

// class Person {
//   protected name: string = "chris";
//   sayHello() {
//     console.log("hello " + this.name);
//   }
// }
// const chris = new Person();
// class Teacher extends Person {
//   sayBye() {
//     console.log("bye " + this.name);
//   }
// }
// const crystal = new Teacher();
// console.log(chris.name); // 报错，不可以在类的外部调用
// chris.sayHello(); // hello chris
// crystal.sayBye(); // bye chris

// class Person {
//   constructor(public name: string) {}
// }

// class Person {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// class Teacher extends Person {
//   constructor(public age: number) {
//     super("chris");
//   }
// }

// const chris = new Teacher(18);
// console.log(chris.name);
// console.log(chris.age);

// class Student {
//   constructor(private _age: number) {}
//   get age() {
//     return this._age + 3;
//   }
//   set age(age: number) {
//     this._age = age;
//   }
// }
// const chris = new Student(25);
// console.log(chris.age); // 28
// chris.age = 15;
// console.log(chris.age); // 18

// class Student {
//   constructor(public readonly _age: number) {}
//   get age() {
//     return this._age + 3;
//   }
//   set age(age: number) {
//     this._age = age;
//   }
// }
// const chris = new Student(28);
// chris.age = 15;
// console.log(chris._age);

// class Student {
//   static sayHello() {
//     console.log("hello");
//   }
// }
// Student.sayHello();

// abstract class Person {
//   abstract skill();
// }

// class Student extends Person {
//   skill() {
//     console.log("学习");
//   }
// }

// class Teacher extends Person {
//   skill() {
//     console.log("教育");
//   }
// }

// class Police extends Person {
//   skill() {
//     console.log("正义");
//   }
// }

// function welcome(person: string) {
//   console.log("hello " + person);
// }
// let user = "chris";
// welcome(user); // hello chris

// let something = "seven";
// // 等价于 let something: string = 'seven'
// something = 7; // 报错，因为类型推断为 string

// let myNumber: string;
// console.log(myNumber.length);

// interface NumberArray {
//   [index: number]: number;
// }
// // let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// // console.log(fibonacci);

// type Student = { [name: number]: string };
// const class1: Student = ["1", "2"];

// let fibonacci: Array<number | string> = [1, 1, 2, 3, 5];

// const student: [string, number, string] = ["chris", 18, "basketball"];

// student.push("crystal");
// student.push(20);
// console.log(student);
// // student.push(true);

// function buildName(firstName: string = "Tom", lastName: string) {
//   return firstName + " " + lastName;
// }
// let tomcat = buildName("Tom", "Cat");
// let cat = buildName(undefined, "Cat");
// console.log(tomcat, cat);

// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//   if (typeof x === "number") {
//     return Number(x.toString().split("").reverse().join(""));
//   } else if (typeof x === "string") {
//     return x.split("").reverse().join("");
//   }
// }

// let add: (a: number, b: number) => number = (a: number, b: number): number => {
//   return a + b;
// };

// interface Student {
//   (name: string, age: string): string;
// }

// let sayHello: Student = (name: string, age: string): string => {
//   return `hello,I'm ${name},I'm ${age}`;
// };

// console.log(sayHello("chris", "18"));

// function add1({ a, b }: { a: number; b: number }): number {
//   return a + b;
// }
// const resultAdd = add1({ a: 1, b: 2 });

// -----
// interface Person {
//   name: string;
//   // age: number;
// }

// interface Student {
//   name: string;
//   age: number;
// }

// let Crystal: Student = { name: "chris", age: 156 };

// // let Tony: Person = { name: "chris", age: 156 };
// let Nancy: Person = { name: "chris", age: 156 } as Student;
// let Chris: Person = Crystal;

// console.log(Chris);
// interface Animal {
//   name: string;
// }
// interface Cat extends Animal {
//   run(): void;
// }
// interface Fish extends Animal {
//   swim(): void;
// }

// function getSkill(animal: Animal) {
//   // type of animal.swim 会报错，swim 不属于 Cat,Fish 共有的方法
//   if (typeof (animal as Cat).run === "function") {
//     return true;
//   }
//   return false;
// }

// let nancy: Cat = {
//   name: "nancy",
//   run() {
//     console.log(1);
//   },
// };
// console.log(getSkill(nancy));

// interface Student {
//   name: string;
//   age: object;
//   hobbt?: string;
// }
// interface Age {
//   age1: number;
//   age2: number;
// }
// let tom: Student = { name: "tom", age: { age1: 1, age2: 2 } };
// function getCacheData<T>(foo: Student, key: string): T {
//   return foo[key];
// }

// const tomAge = getCacheData<Student>(tom, "age");
// // console.log(tomAge);

// enum Days {
//   Sun = 7,
//   Mon = 1,
//   Tue,
//   Wed,
//   Thu = 4.5,
//   Fri,
//   Sat,
// }

// console.log(Days["Sun"] === 7); // true
// console.log(Days["Mon"] === 1); // true
// console.log(Days["Tue"] === 2); // true
// console.log(Days["Fri"]); // 5.5
// console.log(Days["Sat"]); // 6.5

// enum Color1 {
//   Red,
//   Green,
//   Blue = "blue".length,
// }
// console.log(Color1);

// /* enum Color2 {
//   Red = "red".length,
//   Green, // 枚举成员必须具有初始化表达式。
//   Blue,
// } */

// type Name = string | number;
// let chris: Name = "chris";
// console.log(chris);

// type Fruit = "apple" | "banana" | "orange";
// let fruit1: Fruit = "apple";
// let fruit2: Fruit = "peach"; // 报错，不能将类型“"peach"”分配给类型“Fruit”

// class Animal {
//   static isAnimal(a) {
//     return a instanceof Animal;
//   }
//   static say() {
//     console.log("hi");
//   }
// }

// let a = new Animal();
// console.log(Animal.isAnimal(a)); // true
// // a.isAnimal(a); // 报错: a.isAnimal is not a function
// Animal.say(); // hi

// class Animal {
//   public constructor(readonly name) {}
// }

// let a = new Animal("Jack");
// console.log(a.name); // Jack
// a.name = "Tom";

// class Person {
//   _name: string = "chris";
//   get name() {
//     // console.log(this._name);
//     return this._name;
//   }
//   set name(name: string) {
//     this._name = name;
//   }
// }

// let chris = new Person();
// console.log(chris.name);
// chris.name = "tom";
// console.log(chris.name);

// interface Parent1 {
//   inter: number;
// }

// type Parent2 = {
//   ty: number;
// };

// class Parent3 {
//   cla: number;
// }

// // 1. i-c

// interface Sonic extends Parent3 {
//   sonic: number;
// }
// let soni: Sonic = { cla: 3, sonic: 5 };
// // 2. c-i xx
// // class Sonci extends Parent1 {
// //   sonci: number;
// // }
// // 3. t-c
// type Sontc = Parent3 & { sontc: number };
// let sontc: Sontc = { cla: 3, sontc: 5 };

// 4. c-t xx

// class Sonct extends Parent2 {
//   sonct: number;
// }

// let sonct: Sonct = {
//   ty: 3,
//   sconct: 5,
// };

interface Shout {
  shout();
}
class Cat implements Shout {
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

cat.shout();
chris.shout();

// class Student {
//   hi() {
//     console.log("hi");
//   }
// }

// let xiaoming: Student = new Student();
// console.log(xiaoming.hi());

// function swag<T, U>(tuple: [T, U]): [U, T] {
//   return [tuple[1], tuple[0]];
// }

// let result = swag<number, number>([1, 2]); // [2,1]
// console.log(result);

// function copyFields<T extends U, U>(target: T, source: U): T {
//   for (let id in source) {
//     target[id] = (<T>source)[id];
//   }
//   return target;
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// console.log(copyFields(x, { b: 10, d: 20 }));
