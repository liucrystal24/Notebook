# React Hook

## 1. hook 简介

- ### 动机

  Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问题似曾相识。

  #### 1.在组件之间复用状态逻辑很难

  React 没有提供将可复用性行为“附加”到组件的途径，由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。React 需要为共享状态逻辑提供更好的原生途径。

  可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑。** 这使得在组件间或社区内共享 Hook 变得更便捷。

  #### 2.复杂组件变得难以理解

  我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。

  为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

## 2. hook 概览

#### :star: Hook 是一些可以让你在函数组件里 “钩入” React state 及生命周期等特性的函数。

#### :star: 通过使用 Hook，你可以把组件内相关的副作用组织在一起，而不要把它们拆分到不同的生命周期函数里

- ### State Hook

  ```js
  import React, { useState } from "react";

  function Example() {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  ```

  - 在函数组件里调用 `useState`，给组件添加一个内部的 `state`，React 会在重复渲染时保留这个 `state`。
  - `useState` 返回一对值：当前状态和一个可以更新它的函数。可以在事件处理函数中调用这个函数。
  - `useState` 唯一的参数就是初始的 `state`，初始的 `state` 只有在第一次渲染才会用到。
  - 可以声明多个 `useState` ：

  ```js
  function ExampleWithManyStates() {
    // 声明多个 state 变量！
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState("banana");
    const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
    // ...
  }
  ```

- ### Effect Hook

  ```js
  import React, { useState, useEffect } from "react";

  function Example() {
    const [count, setCount] = useState(0);

    // 相当于 componentDidMount 和 componentDidUpdate:
    useEffect(() => {
      // 使用浏览器的 API 更新页面标题
      document.title = `You clicked ${count} times`;
    });

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  ```

  - `useEffect`，给函数组件增加了操作副作用的能力 ( 数据获取、订阅或者手动修改过 DOM )。和 `class` 组件中的 `componentDidMount` 、 `componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途。
  - React 会在每次渲染后调用 `useEffect` 函数，包括第一次渲染的时候。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。
  - `useEffect`可以通过返回一个函数来指定如何“清除”副作用：

  ```js
  import React, { useState, useEffect } from "react";

  function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    useEffect(() => {
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(
          props.friend.id,
          handleStatusChange
        );
      };
    });

    if (isOnline === null) {
      return "Loading...";
    }
    return isOnline ? "Online" : "Offline";
  }
  ```

  - React 会在组件销毁时取消对 ChatAPI 的订阅，然后在后续渲染时重新执行副作用函数。（如果传给 ChatAPI 的 props.friend.id 没有变化，你也可以告诉 React 跳过重新订阅。）
  - 可以声明多个 `useEffect` :

  ```js
  function FriendStatusWithCounter(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(
          props.friend.id,
          handleStatusChange
        );
      };
    });

    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    // ...
  }
  ```

## 3. hook 使用规则

#### Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在 **函数最外层** 调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件** 和 **自定义 Hook** 中调用 Hook。不要在其他 JavaScript 函数中调用。

## 4. 自定义 Hook

##### 自定义 Hook：`useFriendStatus` 来订阅好友在线状态,将 friendID 作为参数，返回好友是否在线：

```js
import React, { useState, useEffect } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

##### 在两个组件中使用:

```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

```js
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}
```

- Hook 是一种 **复用状态逻辑** 的方式，它不复用 `state` 本身。事实上 Hook 的每次调用都有一个完全独立的 state ，因此你可以在单个组件中多次调用同一个自定义 Hook。
