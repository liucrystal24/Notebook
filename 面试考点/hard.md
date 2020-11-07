# 刁钻题

## 一、map

```js
[1, 2, 3].map(parseInt); // [1,NaN,NaN]
```

相当于执行：

```js
parseInt("1", 0); // 1：  0 相当于没传值
parseInt("2", 1); // NaN：1 相当于1进制的 2，没有
parseInt("3", 2); // NaN：2 相当于2进制的 3，没有
```

## 二、对象地址改变

```js
var a = { name: "a" };
a.x = a = {};
console.log(a.x); // undefined
```

`var a = { name : "a" }` 中假设 `a` 的地址是 A

`a = {}` 中，改变 `a` 的地址为 B

`a.x = ...` 中， `a` 的地址为 A

`console.log(a.x)` 中打印 `a` 的地址为 B，因为赋值时，赋值的是 A 位置的 `a`, B 位置的 `a` 没有 x，所有结果为 `undefined`

## 三、(a ==1 && a== 2 && a==3) 可能为 true 吗？

### 利用 == 会调用 valueOf() 的特性

```js
var a = {
  value: 1,
  valueOf() {
    return this.value++;
  },
};
a == 1 && a == 2 && a == 3; // true
```

### 利用 a 会读取 window.a 的特性

```js
var value = 1;
Object.defineProperty(window, "a", {
  get() {
    return value++;
  },
});
a == 1 && a == 2 && a == 3; // true
// 或者
a === 1 && a === 2 && a === 3; // true
```
