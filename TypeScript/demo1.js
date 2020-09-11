/*
 * @Author: ChrisLiu
 * @Date: 2020-09-03 21:44:26
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-09-12 00:11:30
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent3 = /** @class */ (function () {
    function Parent3() {
    }
    return Parent3;
}());
var soni = { cla: 3, sonic: 5 };
var sontc = { cla: 3, sontc: 5 };
// 4. c-t xx
// class Sonct extends Parent2 {
//   sonct: number;
// }
// let sonct: Sonct = {
//   ty: 3,
//   sconct: 5,
// };
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.shout = function () {
        console.log("cat shout");
    };
    return Cat;
}(Animal));
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.shout = function () {
        console.log("person shout");
    };
    return Person;
}());
var cat = { shout: function () { } };
var chris;
// console.log(cat.shout());
// console.log(chris);
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.hi = function () {
        console.log("hi");
    };
    return Student;
}());
var xiaoming = new Student();
console.log(xiaoming.hi());
