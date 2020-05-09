// 4

function fn() {
  this.user = '剃了胡子"';
  return {};
}
var a = new fn();
console.log(a.user); // undefined 因为 return {}, 如果没有 return 是 tlhz

// 5

function fn() {
  this.user = '剃了胡子"';
  return function () {};
}
var a = new fn();
console.log(a.user); // undefined 因为 return {}, 如果没有 return 是 tlhz

// 6

function fn() {
  this.user = '剃了胡子"';
  return 1;
}
var a = new fn();
console.log(a.user); //  tlhz ???

// 7
function fn() {
  this.user = '剃了胡子"';
  return undefined;
}
var a = new fn();
console.log(a.user); // tlhz ???

// 8
function fn() {
  this.user = '剃了胡子"';
  return null;
}
var a = new fn();
console.log(a.user); // tlhz ???
