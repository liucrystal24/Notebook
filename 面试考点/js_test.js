var nAdd;
var t = function () {
  var n = 99;
  nAdd = function () {
    n = n + 1;
  };
  var t2 = function () {
    console.log(n);
  };
  return t2;
};

let a1 = t(); // console.log(n)

let a2 = t();
a2();
nAdd(); // n+1
nAdd(); // n+1
a2();
let a3 = t();

// a1(); // 99
a2(); // 100
// a3(); // 99

class Animal {
  constructor(name) {
    this.name = name;
  }
  shout() {
    console.log("miao");
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
  move() {
    console.log("run");
  }
}

let tom = new Cat("tom", "yellow");

console.dir(tom);
tom.move();
