## 一、节流防抖

节流

```js
function throttle(fn, delay) {
  let canuse = true;

  return function () {
    if (!canuse) return;

    canuse = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canuse = true;
    }, delay);
  };
}

let throttled = throttle(() => {
  console.log(1);
}, 2000);
throttled();
throttled();
setTimeout(() => {
  throttled();
}, 500);
```

```js
// 防抖
function debounce(fn, delay) {
  let timerId = null;

  return function () {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, arguments);
      timerId = null;
    }, delay);
  };
}
```

## 二、apply、call 区别与性能对比

- apply(this,[a,b])
- call(this,a,b)

call 性能略好，少了 CreateListFromArrayList 步骤

## 三、yield 和 yield\* 区别

两者都是返回 iterator 的一个元素

yield 返回值当成一整个元素

yield\* 返回值是一个 iterator，会依次返回这个 iterator 中的每个元素

迭代器用 .next() 查看，也可以使用 for..of.. 遍历

```js
function* g1() {
  yield 2;
  yield 3;
}
function* g2() {
  yield 1;
  yield g1();
  yield* g1();
  yield [4, 5];
  yield* [6, 7];
}

// next
let iterator = g2();
console.log(iterator.next()); //{value:1,done:false}
console.log(iterator.next()); //{value:{},done:false}
console.log(iterator.next()); //{value:2,done:false}
console.log(iterator.next()); //{value:3,done:false}
console.log(iterator.next()); //{value:[4,5],done:false}
console.log(iterator.next()); //{value:6,done:false}
console.log(iterator.next()); //{value:7,done:false}
console.log(iterator.next()); //{value:undefined,done:true}

// 遍历
for (const v of g2()) {
  console.log(v);
}

/** 
1
{}
2
3
[ 4, 5 ]
6
7
*/
```

## 四、回流和重绘

### 回流

当 render tree （DOM tree + css 渲染）中的一部分因为元素的 **尺寸，布局，隐藏** 等改变而需要 **重新构建**。这就称为回流(reflow)。

每个页面至少需要一次回流，就是在页面第一次加载的时候。

完成回流后，浏览器重新绘制受影响大部分到屏幕中，这个是重绘。

### 重绘

当 render tree 中的一些元素需要更新属性，而这些属性**只是影响元素的外观，风格，而不会影响布局的**，比如 background-color。则就叫称为重绘。

### 区别

回流 必定引起 重绘。反之不一定。比如只改变颜色，就只发生重绘。回流成本比重绘高

## ES7

- 幂运算 3 \*\* 2 //9
- Array.prototype.includes(target,startIndex) 返回 boolen

## Proxy 代替 Object.definePrototype

## Vnode

https://juejin.cn/post/6844903494835683342

## webpack 热更新

局部更新

https://segmentfault.com/a/1190000020310371
