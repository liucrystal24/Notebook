// function mixin(sourceObj, targetObj) {
//   for (var key in sourceObj) {
//     // 只会在不存在的情况下复制
//     if (!(key in targetObj)) {
//       targetObj[key] = sourceObj[key];
//     }
//   }
//   return targetObj;
// }
// var Vehicle = {
//   engines: 1,
//   ignition: function () {
//     console.log("Turning on my engine.");
//   },
//   drive: function () {
//     this.ignition();
//     console.log("Steering and moving forward!");
//   }
// };
// var Car = mixin(Vehicle, {
//   wheels: 4,
//   drive: function () {
//     Vehicle.drive.call(this);
//     console.log(
//       "Rolling on all " + this.wheels + " wheels!"
//     );
//   }
// });

// console.log(Car.drive());


