/*
 * @Author: ChrisLiu
 * @Date: 2020-10-11 23:56:41
 * @LastEditors: ChrisLiu
 * @LastEditTime: 2020-10-18 23:37:51
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

setTimeout(() => {
  console.log('1');
  async function async1() {
    console.log('2');
    await async2();
    console.log('3');
  }
  async function async2() {
    console.log('4');
  }

  process.nextTick(function () {
    console.log('5');
  })

  setTimeout(function () {
    console.log('6');
    process.nextTick(function () {
      console.log('7');
    })
    new Promise(function (resolve) {
      console.log('8');
      resolve();
    }).then(function () {
      console.log('9')
    })
  })

  async1();

  new Promise(function (resolve) {
    console.log('10');
    resolve();
  }).then(function () {
    console.log('11');
  });
  console.log('12');

}, 1000);