var arr1 = [1, 2];

[a, b] = arr1;

[b, a] = [a, b];

console.log(a, b);

var elements = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

elements.map(({ length: lengthFooBArX }) => {
  console.log(lengthFooBArX);
}); // [8, 6, 7, 9]

var arr = function () {
  console.log(arguments[0]);
};

arr();

function A() {
  var a = 1;
  return function () {
    return ++a;
  };
}
var v = A();
console.log(v());
console.log(v());
