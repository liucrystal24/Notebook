/*
 * @Author: ChrisLiu
 * @Date: 2020-09-03 21:44:26
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-09-08 23:41:47
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
var Crystal = { name: "chris", age: 156 };
// let Tony: Person = { name: "chris", age: 156 };
var Nancy = { name: "chris", age: 156 };
var Chris = Crystal;
console.log(Chris);
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
