# 垃圾回收机制

## 1、怎样认定为垃圾

没有被引用的就是垃圾；有引用的，如果只是几个对象之间的环引用，也是垃圾（没有被 **全局变量** 引用连接）

## 2、垃圾算法

**标记-清除算法**：从 全局变量 开始标记，逐层向下找引用，标记保留，其他删除

**计数-清除算法**：创建引用就加 1，不引用就减 1，减到 0 时就垃圾回收

## 3、DOM-线程特例

```js
var div1 = document.getElementById("div1");
div1.onclick = function () {
  console.log(1);
};
```

1、div 虽然在页面上没有，但是还在内存里，所以 onclick 方法 没有被回收

```js
div1.remove();
console.log(div1.onclick); // function(){}
```

2、div 变量虽然等于 null，但是 DOM 上仍然未被删除，还有可能其他变量引用它，仍可以查到 onclick 方法

```js
div1 = null;
var div2 = document.getElementById("div1");
console.log(div2.onclick); // function(){}
```

3、div 彻底删除，垃圾回收，ie 里有 bug，需要添加 `div1.onclick = null`;

```js
div1.remove();
div1 = null;
```
