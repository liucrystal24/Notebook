# this & object prototypes

## 3. 对象

### 2.1 调用位置

调用栈：为了到达当前执行位置所调用的所有函数(函数调用链)。  
调用位置：函数在代码中被调用的位置，在正在执行的函数的前一个调用中。

```javascript
function baz() {
  // 当前调用栈是：全局 -> baz
  // 因此，当前调用位置是全局作用域
  console.log("baz");
  bar(); // <-- bar 的调用位置
}
function bar() {
  // 当前调用栈是 baz -> bar
  // 因此，当前调用位置在 baz 中
  console.log("bar");
  foo(); // <-- foo 的调用位置
}
function foo() {
  // 当前调用栈是 baz -> bar -> foo
  // 因此，当前调用位置在 bar 中
  console.log("foo");
}
baz(); // <-- baz 的调用位置
```

:point_right: chrome 中 打开 F12 控制台，在 Sources 中,通过打断点的方式，查看调用栈，然后找到栈中的<font color='red'>第二个元素</font>就是真正调用的位置。  
![callstack.png](https://raw.githubusercontent.com/liucrystal24/Notebook/master/you%20don't%20know%20JS/img/callstack.png)

## 4. 混合对象 "类"

## 5. 原型

## 6. 行为委托

## 7. ES 中的 Class
