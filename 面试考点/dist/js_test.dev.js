"use strict";

/*
 * @Author: ChrisLiu
 * @Date: 2020-10-11 23:56:41
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-10-19 22:30:06
 * @Description: file content
 */
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   shout() {
//     console.log("miao");
//   }
// }
// class Cat extends Animal {
//   constructor(name, color) {
//     super(name);
//     this.color = color;
//   }
//   move() {
//     console.log("run");
//   }
// }
// let tom = new Cat("tom", "yellow");
// console.dir(tom);
// tom.move();
// function Animal(name, color) {
//   this.name = name;
//   this.color = color;
// }
// Animal.prototype.say = function () {
//   console.log("hi");
// };
// function Cat(name, color, age) {
//   // 若不指定，this 会指向 windows
//   Animal.call(this, arguments);
//   this.age = age;
// }
// // 让子类 Cat 的显式原型成为父类 Animal 的实例对象, 同时将构造器(校正)指向子类构造函数本身
// Cat.prototype = new Animal();
// Cat.prototype.constructor = Cat;
// let tom = new Cat("tom", "yellow", "18");
// tom.say(); // hi
// // let arr = [1, 2, 3, 3, 5, 7, 9, 2, 6, 5, 4, 6, 8, 1, 5, 7, 9, 5];
// let arr = [
//   { x: 1 },
//   { x: 2 },
//   { x: 3 },
//   { y: 1 },
//   { y: 2 },
//   { y: 3 },
//   { x: 1 },
// ];
// function arrcheck(array) {
//   let result = [];
//   let arrHash = {};
//   let index = 0;
//   array.forEach((element) => {
//     if (arrHash[element] === void 0) {
//       arrHash[element] = index;
//       result.push(element);
//       index += 1;
//     }
//   });
//   return result;
// }
// console.log(arrcheck(arr));
// // let arr1 = [...new Set(arr)];
// // console.log(arr1);
// setTimeout(() => console.log("fn1"), 0);
// setImmediate(() => console.log("fn2"));
// setTimeout(() => {
//   setImmediate(() => {
//     console.log("SI1");
//     setTimeout(() => {
//       console.log("ST1");
//     }, 0);
//   });
//   setTimeout(() => {
//     console.log("ST2");
//     setImmediate(() => {
//       console.log("SI2");
//     });
//   }, 0);
// }, 1000)
// setTimeout(() => {
//   setTimeout(() => {
//     console.log("f1");
//     process.nextTick(() => {
//       console.log("f2");
//     });
//   }, 0);
//   setImmediate(() => {
//     console.log("f3");
//   });
//   process.nextTick(() => {
//     console.log("f4");
//   });
// }, 1000);
// setTimeout(() => {
//   console.log('start');
//   setTimeout(() => {          // callback1
//     console.log(111);
//     setTimeout(() => {        // callback2
//       console.log(222);
//     }, 0);
//     setImmediate(() => {      // callback3
//       console.log(333);
//     })
//     process.nextTick(() => {  // callback4
//       console.log(444);
//     })
//   }, 0);
//   setImmediate(() => {        // callback5
//     console.log(555);
//     process.nextTick(() => {  // callback6
//       console.log(666);
//     })
//   })
//   setTimeout(() => {          // callback7
//     console.log(777);
//     process.nextTick(() => {  // callback8
//       console.log(888);
//     })
//   }, 0);
//   process.nextTick(() => {    // callback9
//     console.log(999);
//   })
//   console.log('end');
// }, 1000);
// setTimeout(() => {
//   setTimeout(() => {
//     console.log("f1");
//     process.nextTick(() => {
//       console.log("f2");
//     });
//     setTimeout(() => {
//       console.log("stst");
//     }, 0);
//   }, 0);
//   process.nextTick(() => {
//     console.log("test1");
//   });
//   setTimeout(() => {
//     console.log("f11");
//     process.nextTick(() => {
//       console.log("f22");
//     });
//   }, 0);
//   process.nextTick(() => {
//     console.log("test2");
//   });
//   setImmediate(() => {
//     console.log("f3");
//     process.nextTick(() => {
//       console.log("s31");
//     });
//     setImmediate(() => {
//       console.log("f33");
//       process.nextTick(() => {
//         console.log("s331");
//       });
//     });
//   });
//   process.nextTick(() => {
//     console.log("f4");
//   });
// }, 1000);
// setTimeout(() => {
//   console.log(1);
//   setTimeout(() => {
//     console.log(2);
//     Promise.resolve().then(() => {
//       console.log(3);
//     });
//   });
//   new Promise((resolve, reject) => {
//     console.log(4);
//     resolve(5);
//   }).then((data) => {
//     console.log(data);
//     Promise.resolve()
//       .then(() => {
//         console.log(6);
//       })
//       .then(() => {
//         console.log(7);
//         setTimeout(() => {
//           console.log(8);
//         }, 0);
//       });
//   });
//   setTimeout(() => {
//     console.log(9);
//   });
//   console.log(10);
// }, 1000);
setTimeout(function () {
  new Promise(function (resolve, reject) {
    console.log(1);
    resolve();
  }).then(function () {
    console.log(2);
  }).then(function () {
    console.log(6);
  });
}, 1000);