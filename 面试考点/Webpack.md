# Webpack

## 一、有哪些常见 loader 和 plugin ？

### loader

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- style-loader ：将 css 添加到 DOM 的内联样式标签 style 里
- css-loader ：加载 CSS，支持模块化、压缩、文件导入等特性
- postcss-loader ：用 postcss 处理 css
- sass-loader ：除了 sass
- less-loader ：处理 less
- bable-loader ：用 bable 来转换 ES6 到 ES5
- image-loader：加载并且压缩图片文件

### plugin

- define-plugin：定义环境变量
- commons-chunk-plugin：提取公共代码
- uglifyjs-webpack-plugin：通过 UglifyES 压缩 ES6 代码

## 二、loader 和 plugin 的区别是什么？

### loader

- loader 是加载器，让 webpack 拥有了加载和解析非 JavaScript 文件的能力
- Loader 在 `module.rules` 中配置，类型为数组，每一项都是一个 对象，里面描述了对于什么类型的文件（test），使用什么加载（loader）和使用的参数（options）

### plugin

- plugin 是插件，扩展 webpack 的功能，让 webpack 具有更多的灵活性。在合适的时机通过 Webpack 提供的 API 改变输出结果
- Plugin 在 `plugins` 中单独配置。 类型为数组，每一项是一个 plugin 的实例，参数都通过构造函数传入

## 三、如何按需加载代码？

通过 `import( ).then( )` 语句来控制加载时机，import() 返回一个 Promise 对象

## 四、如何利用 webpack 来优化前端性能？

1、压缩代码。使用 `UglifyJSPlugin` 压缩 JS，`cssnano` 压缩 css

2、CDN 加速。构建过程中，将引用的静态资源路径修改为 CDN 上的对应路径。利用 webpack 对于 `output` 参数和各 loader 的 `publicPath `参数来修改资源路径

3、提供公共代码。使用 `CommonsChunkPlugin` 提取

## 五、如何提高 webpack 的构建速度？

- `CommonsChunkPlugin` ：提取公共代码
- `DllPlugin`：第三方库预编译，只打包第一次，以后每次只打包自己的代码，`DllReferencePlugin`：将预编译的模块加载进来
- `happypack`：多线程加速编译

## 六、webpack 的构建流程是什么?

1、初始化参数

2、开始编译：初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译

3、确定入口：根据配置中的 entry 找出所有的入口文件

4、编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，递归执行

5、完成模块编译

6、输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表

7、输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
