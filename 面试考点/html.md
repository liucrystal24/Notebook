# HTML 常考点

## 1. 你是如何理解 HTML 语义化的？

- 举例法

  HTML 语义化就是使用正确的标签（总结）段落就写 p 标签，标题就写 h1 标签，文章就写 article 标签，视频就写 video 标签，等等。

- 阐述法

  以前的后台开发人员使用 table 布局，后来美工人员使用 div+css 布局，现在专业的前端会使用正确的标签进行页面开发。

## 2. meta viewport 是做什么用的，怎么写？

**viewport** 是用户网页的可视区域(视区)

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
/>
```

- width：控制 `viewport` 的大小，可以指定的一个值，如 600，或设备宽度 `device-width`
- height：和 `width` 相对应，指定高度
- initial-scale：初始缩放比例
- maximum-scale：允许用户缩放到的最大比例
- minimum-scale：允许用户缩放到的最小比例
- user-scalable：用户是否可以手动缩放

## 3. 你用过哪些 HTML 5 标签？

- 绘图 **canvas**
- 媒体 **video 、 radio 、 source**
- 结构 **article 、footer 、 header 、 nav 、 section 、 main**
- 表单 **datalist 、 progress 、 meter 、 output**

### canvas

代表位图区域

```html
<canvas id="canvas" width="300" height="300">
  抱歉，您的浏览器不支持canvas元素
</canvas>
```

画一个矩形：

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
```

### source

为 **< video >** 或 **< audio >** 这类媒体元素指定媒体源，允许规定可替换的视频/音频文件供浏览器根据它对媒体类型或者编解码器的支持进行选择

```html
<audio controls>
  <source src="/i/horse.ogg" type="audio/ogg" />
  <source src="/i/horse.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

### video

代表一段视频 及其视频文件和字幕，并提供了播放视频的用户界面

```html
<video
  controls="controls"
  width="400"
  autoplay="autoplay"
  height="300"
  loop="loop"
>
  <source src="./test.mp4" type="video/mp4" />
  Sorry, your browser doesn't support embedded videos.
</video>
```

### audio

代表一段声音 ，或音频流

```html
<audio controls src="./test.mp3">
  Your browser does not support the
  <code>audio</code> element.
</audio>
```

### datalist

下拉菜单选项。`input` 的 `list` 和 `datalist` 的 `id` 对应。

```html
<input id="myCar" list="cars" />
<datalist id="cars">
  <option value="BMW"></option>
  <option value="Ford"></option>
  <option value="Volvo"></option>
</datalist>
```

### meter

显示已知范围的标量值或者分数值。 **low、high** 定义后，超过数值会变色。

```html
<meter value="60" min="0" max="100" low="20" high="80"></meter>
```

### progress

显示一项任务的完成进度。

```html
<progress id="file" max="100" value="70"></progress>
```

### output

表示计算或用户操作的结果。

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" name="b" value="50" /> +
  <input type="number" name="a" value="10" /> =
  <output name="result"></output>
</form>
```

## 4. H5 是什么? 和 HTML5 区别？

H5 广义上理解为 **移动端营销页面**。

HTML5 是一种规范，一种标准。
