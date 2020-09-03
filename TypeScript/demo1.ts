const arr1 = [1, { a: 1 }, 3];
type student = { name: string; age: number };
class teacher {
  name: string;
  age: number;
}
const class1: student[] = [
  { name: "chris", age: 18 },
  { name: "crystal", age: 20 },
];
const class2: teacher[] = [
  { name: "chris", age: 18 },
  { name: "crystal", age: 20 },
];

console.log(class1, class2);
