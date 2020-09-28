# CSS 常考点

## 1. 两种盒模型?

- W3C 盒子模型

  width：content_width

  height：content_height

  ```css
  box-sizing: content-box;
  ```

- IE 盒子模型

  width：content_width + padding_width + border_width

  height：content_height + padding_height + border_height

  ```css
  box-sizing: border-box;
  ```

## 2. 如何垂直居中?

### :dart: parent 定高：

**html:**

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

#### 1. transform: translate(-50%,-50%)

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

#### 2. margin-top: -（50% child_height）px;

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

#### 3. margin:auto;

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

#### 4. display:flex; align-items:center;

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

## 3. flex 怎么用，常用属性有哪些?

## 4. BFC 是什么?

## 5. CSS 选择器优先级?

## 6. 如何清除浮动?
