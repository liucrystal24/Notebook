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
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.shout = function () {
        console.log("cat shout");
    };
    return Cat;
}());
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.shout = function () {
        console.log("person shout");
    };
    return Person;
}());
var cat = new Cat();
var chris = new Person();
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
