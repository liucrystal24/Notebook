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

https://react.docschina.org/docs/react-component.html#constructor

### 挂载

- constructor()
- render()
- componentDidMount()
  请求数据

### 更新

- render()
- componentDidUpdate()

### 卸载

- componentWillUnmount()

## 三、React 如何实现组件间通信

## 四、shouldComponentUpdate 作用

## 五、虚拟 DOM 是什么

## 六、什么是高阶组件

## 七、React diff 原理

## 八、Redux 是什么

## 九、connect 原理
