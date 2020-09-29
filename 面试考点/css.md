# CSS 常考点

## 1. 两种盒模型?

- W3C 盒子模型

  width : content_width

  height : content_height

  ```css
  box-sizing: content-box;
  ```

- IE 盒子模型

  width : content_width + padding_width + border_width

  height : content_height + padding_height + border_height

  ```css
  box-sizing: border-box;
  ```

## 2. 如何垂直居中?

**HTML:**

```html
<div class="parent">
  <div class="child">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus harum
    optio perferendis, quo eveniet tenetur aspernatur blanditiis deleniti
    tempora maiores recusandae doloremque, ipsa autem cumque non voluptate quod
    rem possimus!
  </div>
</div>
```

### (1) parent 不定高：

上下加一个 padding 就可以把父元素撑起来

```css
.parent {
  border: 3px solid red;
  padding: 10px 0;
}
.child {
  border: 3px solid green;
}
```

### (2) parent 定高：

:star: 推荐程度递减

#### 1. flex;

align-items:center; 垂直居中
justify-content:center; 水平居中

```css
.parent {
  height: 600px;
  border: 3px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.child {
  border: 3px solid green;
  width: 300px;
}
```

#### 2. transform: translate(-50%,-50%)

child 不定宽高

```css
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 3. margin-top: -（50% child_height）px;

child 定高(垂直居中)，定宽(水平居中)

```css
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  height: 100px;
  margin-top: -50px;
}
```

#### 4. margin:auto;

child 定高(垂直居中)，定宽(水平居中)

```css
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  position: absolute;
  width: 300px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```

## 3. flex 怎么用，常用属性有哪些?

### (1) 父元素属性

- #### :star: justify-content : 子元素在主轴的对齐方式

  - `flex-start` ： 左对齐
  - `flex-end` ： 右对齐
  - `center` ： 居中对齐
  - `space-between` ： 两端对齐，项目之间间隔相同
  - `space-around` ： 项目两侧间隔相同，为两端距离的两倍

- #### :star: align-items : 子元素在交叉轴的对齐方式

  - `flex-start` ： 上对齐
  - `flex-end` ： 下对齐
  - `center` ： 居中对齐
  - `baseline` ： 第一行文字基线对齐
  - `stretch` ： 子元素未设置高度或 auto 时，元素占满整个容器

- #### align-content : 多根轴线（多行）的对齐方式

  :warning: 一般当 `flow-wrap : wrap` 时有效。

  - `stretch` ： 上对齐，换行时,中间留有间隙
  - `flex-start` ： 多行上对齐
  - `flex-end` ： 多行下对齐
  - `center` ： 多行居中
  - `space-between` ： 上下对齐，换行时，中间间隔相同
  - `space-around` ： 换行时，中间间隔相同，是上下间距的两倍

- #### flex-direction : 主轴的方向（子元素的排列方向）

  - `row` ： 横，左对齐
  - `row-reverse` ：横，右对齐
  - `column` ： 竖，上对齐
  - `column-reverse` ： 竖，下对齐

- #### :star: flex-wrap : 如果一条轴线排不下，如何换行

  - `wrap` ： 换行，第一行在上
  - `nowrap` ：不换行
  - `wrap-reserve` ： 换行，第一行在下

- #### :star: flex-flow : `< flex-directio >` || `< flex-wrap >`

  默认值为 `row nowrap`

### (2) 子元素属性

- #### order : 子元素排列顺序

  数值越小，排列越靠前，默认为 0

- #### align-self : 单个元素对齐方式

  有单个元素与其他元素不一样的对齐方式，可覆盖父元素的 `align-items` ，属性值与 `align-items` 一样

## 4. BFC 是什么?

> 块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

通俗的说，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素不会在布局上影响到外部元素。

### 触发 BFC 条件 ：

- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position ( absolute、fixed )
- 行内块元素：display ( inline-block、table-cells、flex )
- overflow 除了 visible 以外的值 ( hidden、auto、scroll )
- 弹性元素：display ( flex 或 inline-flex 元素的直接子元素 )

## 5. CSS 选择器优先级?

## 6. 如何清除浮动?
