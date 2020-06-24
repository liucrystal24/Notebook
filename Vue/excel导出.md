# Vue 导出 json 数据到 Excel 电子表格

## 一、安装依赖包

```bash
npm install file-saver --save
npm install xlsx --save
npm install script-loader --save-dev
```

## 二、下载两个需要的 js 文件

:link:[点击下载 Export2Excel.js & Blob.js](http://xiazai.jb51.net/201708/yuanma/Export2Exce_jb51.rar)

## 三、webpack 配置

:dart: webpack.base.conf.js: resolve/alias

```js
// 路径为 步骤二中两个 js 文件的路径 src/vendor
'vendor': path.resolve(__dirname, '../src/vendor'),
```

## 四、 .vue 文件中使用

- ### 转成 json 需要格式

```js
  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
  }
```

- ### 生成 excel,建立下载

```js
  export2Excel() {
    require.ensure([], () => {
      const { export_json_to_excel } = require("../vendor/Export2Excel");
      // 表头展示标题名数组
      const tHeader = this.tHeader;
      // 表头标题名对应的字段名数组
      const filterVal = this.filterVal;
      // 数据数组
      const list = this.listData;
      // 生成的 excel 文件名
      const filename = this.filename;
      // 转化为需要的json格式
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, filename);
    });
  },
```
