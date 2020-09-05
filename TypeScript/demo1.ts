/*
 * @Author: ChrisLiu
 * @Date: 2020-09-03 21:44:26
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-09-05 23:27:30
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
//   constructor(private _age: number) {}
//   get age() {
//     return this._age + 3;
//   }
//   set age(age: number) {
//     this._age = age;
//   }
// }
// const chris = new Student(28);
// chris.age = 15;
// console.log(chris.age);

class Student {
  static sayHello() {
    console.log("hello");
  }
}
Student.sayHello();
