let arr1 = new Array()
console.log(arr1)
console.log(typeof arr1)
console.log(arr1 instanceof Array)

var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
console.log(myArray) // [ 'foo', 42, 'bar', baz: 'baz' ]
console.log(myArray.length)// 3
console.log(myArray.baz)// "baz"


var myObject = {
  a: 2,
};
var state1 = Object.getOwnPropertyDescriptor(myObject, "a");
console.log(state1);

Object.defineProperty(myObject, 'a', { enumerable: false })

console.log(myObject);
console.log(myObject.a);

var obj1 = { a: 1, b: 2, c: 3 }


for (var i in obj1) {
  console.log(`${i}:${obj1[i]}`);
}

var myObject2 = {
  get a() {
    return 2
  }
}
Object.defineProperty(myObject2, 'b', {
  get: function () {
    return this.a * 2
  }
})
console.log(myObject2.a);
console.log(myObject2.b);

var obj2 = {
  get b() {
    return this._b_
  },
  set a(val) {
    this._b_ = val * 2;
  }
}
obj2.a = 10;
console.log(obj2.b);