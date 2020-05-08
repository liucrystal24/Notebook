# this & object prototypes (this 和 对象原型)

## 1. 关于 this

&emsp;&emsp;1. this的绑定和函数声明的位置没有任何关系，只取决于函数的<font color='ffoo'>调用方式</font>。  
&emsp;&emsp;2. 当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数<font color='ffoo'>在哪里被调用（调用栈）</font>、函数的调用方法、传入的参数等信息。this 就是记录的其中一个属性，会在函数执行的过程中用到。


## 2. this 全面解析

### 2.1 调用位置

调用栈：为了到达当前执行位置所调用的所有函数(函数调用链)。  
调用位置：函数在代码中被调用的位置，在正在执行的函数的前一个调用中。

### 理解:

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
:point_right: chrome 中 打开 F12 控制台，在 Sources 中,通过打断点的方式，查看调用栈，然后找到栈中的第二个元素就是真正调用的位置。  
![Image text](https://raw.githubusercontent.com/)
## 3. 对象

## 4. 混合对象 "类"

## 5. 原型

## 6. 行为委托

## 7. ES 中的 Class