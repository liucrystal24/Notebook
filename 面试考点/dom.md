# DOM

## 一.事件委托

定义：事件委托就是利用事件冒泡机制，指定一个事件处理程序，来管理某一类型的所有事件

优势：减少 dom 操作来优化页面的运行性能，节约内存

### 例题

如果需要给 `li` 都绑定一个点击事件，打印出元素内容，dom 结构如下：

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
</ul>
```

JS:

```js
document.getElementById("list").onclick = function (e) {
  if (e.target.nodeName.toLocaleLowerCase() === "li") {
    console.log(e.target.innerHTML);
  }
};
```

封装：

```js
function delegate(element, selector, eventType, fn) {
  element.addEventListener(eventType, (e) => {
    let el = e.target;
    if (el.matches(selector)) {
      fn();
    }
  });
}
```

但是如果 dom 结构中 li 内有其他标签，则会出现问题，dom 结构如下：

```html
<ul id="list">
  <li><span>item 1</span></li>
  <li><span>item 2</span></li>
  <li><span>item 3</span></li>
  <li><span>item 4</span></li>
</ul>
```

则需要判断点击 span 后，遍历 span 的**祖先元素看其中有没有 ul 里面的 li**：

封装：

```js
function delegate(element, selector, eventType, fn) {
  element.addEventListener(eventType, (e) => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (el === selector) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e);
  });
}
```

## 二.用 mouse 事件写一个可拖拽的 div

```js
// 控制是否可以移动
let isMove = false;
// 记录点击位置和拖拽物体的边距
let dis = [];

document.getElementById("moveDiv").addEventListener("mousedown", (e) => {
  isMove = true;
  dis = [e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop];
});

document.addEventListener("mouseup", () => {
  isMove = false;
});

// 绑定在 document 上，防止快速移动，导致物体跟丢
document.addEventListener("mousemove", (e) => {
  if (isMove) {
    let el = document.getElementById("moveDiv");

    let x = e.clientX;
    let y = e.clientY;

    el.style.left = x - dis[0] + "px";
    el.style.top = y - dis[0] + "px";
  }
});
```
