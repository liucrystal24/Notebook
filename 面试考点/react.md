# React

## 一、受控组件 / 非受控组件 区别

```html
<!-- 受控组件 -->
<FInput value="{x}" onChange="{fn}" />
<!-- 非受控组件 -->
<FInput defaultValue="{x}" ref="{input}" />
```

- 受控组件的状态由开发者维护，可控 `value`、`onChange`

- 非受控组件的状态由组件自身维护，只给定了 `默认值`

## 二、React 生命周期函数？

![lifecycle.png](./img/react/react_lifecycle.png)

### 挂载

挂载阶段，也可以理解为组件的初始化阶段，就是将我们的组件插入到 DOM 中，只会发生一次

- **constructor()**

  ```js
  constructor(props) {
    // 必须执行 super(),否则无法拿到构造函数里拿到this对象
    super(props);
    // 不要在这里调用 this.setState()
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  ```

  - 初始化 `state` 对象

  - 给自定义方法绑定 `this`

- **render()**

  检查 `this.props` 和 `this.state` 的变化并返回以下几种类型：

  - 原生的 DOM，如 div
  - React 组件
  - Fragment（片段）
  - Portals（插槽）
  - 字符串和数字，被渲染成 text 节点
  - Boolean 和 null，不会渲染任何东西

- **componentDidMount()**
  - 在组件挂载后（插入 DOM 树中）立即调用，通过网络请求获取数据在此阶段

请求数据

### 更新

更新阶段，当组件的 props 改变了，或组件内部调用了 setState 或者 forceUpdate 发生，会发生多次

- **render()**
- **componentDidUpdate()**

  ```js
  /**
    snapshot 是 getSnapshotBeforeUpdate(preProps.preState) 返回的
    getSnapshotBeforeUpdate() 必须配合 componentDidUpdate() 使用
    如果没有定义 getSnapshotBeforeUpdate()，则 snapshot wei null
  */
  componentDidUpdate(prevProps, prevState, snapshot);
  ```

  - 在更新后会被立即调用，首次渲染不会执行此方法

### 卸载

- **componentWillUnmount()**

  - 在组件卸载及销毁之前直接调用

  - 我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的 DOM 元素等垃圾清理工作

## 三、React 如何实现组件间通信

父子靠 props 传函数
爷孙可以穿两次 props
任意组件用 Redux（也可以自己写一个 eventBus）

## 四、shouldComponentUpdate 作用

用于在没有必要更新 UI 的时候返回 false，以提高渲染性能
http://taobaofed.org/blog/2016/08/12/optimized-react-components/

## 五、虚拟 DOM 是什么

## 六、什么是高阶组件

## 七、React diff 原理

## 八、Redux 是什么

## 九、connect 原理
