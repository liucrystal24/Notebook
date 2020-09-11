/*
 * @Author: ChrisLiu
 * @Date: 2020-09-03 21:44:26
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-09-12 00:13:58
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
