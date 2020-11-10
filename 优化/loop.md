# 数组遍历方式以及性能对比

JS 的循环在日常的代码中随处可见，ES6 中也增加了 `map` ，`forEach` 等循环的方法，代码看上去 “优雅” 了，平时工作中也都使用了新的语法，但是实际上性能上是否有提升呢？这篇做个实验记录一下

先定义一个数组：

```js
let arr = [];
for (let i = 0; i < 10000000; i++) {
  arr.push(i);
}
```

将需要遍历函数执行 20 次，查看运行的总时间，比较时间长短

```js
let avg20 = function (cb) {
  console.time();
  for (let i = 0; i < 20; i++) {
    cb();
  }
  console.timeEnd();
};
```

## for (let i = 0; i < arr.length; i++){...}

:alarm_clock: **default: 65.107ms**

```js
avg20(function () {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
  }
});
```

## for (let i in arr){...}

:alarm_clock: **default: 6671.574ms**

```js
avg20(function () {
  for (let i in arr) {
    let item = arr[i];
  }
});
```

## for (let v of arr){...}

:alarm_clock: **default: 478.142ms**

```js
avg20(function () {
  for (let v of arr) {
    let item = v;
  }
});
```

## arr.forEach((v,i)=>{...})

:alarm_clock: **default: 2805.929ms**

```js
avg20(function () {
  arr.forEach((v, i) => {
    let item = v;
  });
});
```

## arr.map((v,i)=>{...})

:alarm_clock: **default: 4128.191ms**

```js
avg20(function () {
  arr.map((v, i) => {
    let item = v;
  });
});
```

## 结论

**for 循环** < **for (..of..)** < **forEach** < **map** < **for (.. in ..)**

虽然新语法优雅，但是经典的 `for 循环` 却仍是耗时最短的
