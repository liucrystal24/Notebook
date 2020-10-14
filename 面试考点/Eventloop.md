# Event loop ( 事件循环 )

:books: https://xiedaimala.com/tasks/eca23d4a-5c2a-4f4a-865b-9789130a4813/video_tutorials/cb67bdb1-9f3d-4232-aa50-cd293bb8a7d9

类似 `ajax` 的异步请求是 `node.js` 完成以后，再传给 js 的。`node.js` 完成的这一部分遵循 `Event loop` 规则。

## 事件循环过程

1. :star: **timers** ( 处理 **setTimeout** 等 )
2. I/O callback
3. idle , prepare
4. :star: **poll** ( 停留事件，准备处理 )
5. :star: **check** ( 处理 **setImmediate** 等)
6. close callback
7. （再回到 **timers** ）

我们主要需要专注 **timers、poll、check** 三个阶段。

### 1、setTimout() 和 setImmediate()

根据时事件循环过程，如下代码应该是什么输出顺序呢？

```js
setTimeout(() => {
  console.log("f1");
}, 0);
setImmediate(() => {
  console.log("f2");
});
```

#### 执行顺序

1、将 `"f1"` 放入 `timers` 队列中，等待执行（虽然 `delay` 为 0，但是仍然只是放入队列，不立刻执行）

2、进入 `poll` 阶段进行等待

3、将 `"f2"` 放入 `check` 队列中

4、由于 `setImmediate` 为立刻执行，所以直接进入 `check` 阶段，先输出 `"f2"`

5、回到 `timers` 阶段，输出 `"f1"`

#### 不定因素

实际在 `node.js` 中执行时，发现有时候先输出 `"f1"`，有时候先输出 `"f2"`。

由于 `node.js` 运行 `Event loop` 机制时的步骤：

1、 **开启 `Event loop`**

2、 **执行 js 代码**

如果 `Event loop` 开启的比较快，则按照如上的顺序执行，但是如果 `Event loop` 开启的比较慢，开启的时候，`"f1"` 已经提前放入队列了，则直接先输出 `"f1"`，然后在输出 `"f2"`。

所以为了确保执行顺序唯一，最好 **1s 后执行所需要运行的 js 代码** ，确保 `Event loop` 启动完毕，则执行顺序唯一。

```js
setTimeout(() => {
  setTimeout(() => {
    console.log("f1");
  }, 0);
  setImmediate(() => {
    console.log("f2");
  });
}, 1000);
```

我们再看一个复杂一点的例子：

```js
setImmediate(() => {
  console.log("SI1");
  setTimeout(() => {
    console.log("ST1");
  }, 0);
});

setTimeout(() => {
  console.log("ST2");
  setImmediate(() => {
    console.log("SI2");
  });
}, 0);
```

遇到复杂的例子，我们应该根据执行顺序 **画图** 解决:

![Eventloop1.2](./img/Eventloop/Eventloop1.2.png)

### 执行顺序

**一、poll 阶段：**

1、 等待

**二、check 阶段：**

`check` 队列 : [ ]
`timers` 队列 : [ ]

1、 将 `f1` 放入 `check` 队列

2、 将 `f3` 放入 `timers` 队列，不执行（ 因为此时在 `check` 阶段 ）

3、 执行 `f1`，打印 `"SI1"`

4、 将 `f2` 放入 `timers` 队列，不执行（ 因为此时在 `check` 阶段 ）

`check` 队列 : [ ~~`f1`~~ ]
`timers` 队列 : [ `f3` , `f2` ]

**三、timers 阶段：**

1、 先执行 `f3`，打印 `"ST2"`

2、 将 `f4` 放入 `check` 队列，不执行（ 因为此时在 `timers` 阶段 ）

3、 再执行 `f2`，打印 `"ST1"`

`check` 队列 : [ ~~`f1`~~ , `f4` ]
`timers` 队列 : [ ~~`f3`~~ , ~~`f2`~~ ]

**四、poll 阶段：**

1、发现 `check` 队列里有 `f4` 需要执行

**五、check 阶段：**

1、 执行 `f4`，打印 `"SI2"`

`check` 队列 : [ ~~`f1`~~ , ~~`f4`~~ ]
`timers` 队列 : [ ~~`f3`~~ , ~~`f2`~~ ]

### 2、process.nextTick()

`process.nextTick()` 不属于 `Event loop` 的某一个阶段，是紧跟着当前阶段执行的。
