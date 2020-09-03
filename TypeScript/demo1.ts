/*
 * @Author: ChrisLiu
 * @Date: 2020-09-03 21:44:26
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-09-03 23:59:00
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

interface Student {
  name: string;
  age: number;
  gender: string;
  hobby?: string;
  // [propname: string]: any;
  say(): string;
}

const chris = {
  name: "chris",
  age: 15,
  gender: "male",
  // hobby: "basketball",
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
  console.log(student.say());
  // student.height && console.log("身高: " + student.height);
};
// function introduce(params: Student): void {
//   console.log("姓名: " + params.name);
//   console.log("年龄: " + params.age);
//   console.log("性别: " + params.gender);
//   console.log("爱好: " + params.hobby);
// }
introduce(chris);

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
