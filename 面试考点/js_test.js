var arr1 = [1, 2];

[a, b] = arr1;

[b, a] = [a, b];

console.log(a, b);

var elements = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

elements.map(({ length: lengthFooBArX }) => {console.log(lengthFooBArX)}); // [8, 6, 7, 9]
