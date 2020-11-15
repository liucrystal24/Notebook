# 【ChrisWallpaper（三）】 首页 - 瀑布流滚动加载

## 一、引入分段器 SegmentedControl

由于我们首页分为 推荐、分类、热门 三个模块，因此引入 `uni-app` 的分段器组件

**安装：**

```bash
npm install @dcloudio/uni-ui
```

**引用：**

`script` 中：

```js
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: { uniSegmentedControl },
  data() {
    return {
      items: [{ title: "推荐" }, { title: "分类" }, { title: "专辑" }],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
```

`template` 中：

```vue
<template>
  <view>
    <uni-segmented-control
      :current="current"
      :values="items.map((v) => v.title)"
      @clickItem="onClickItem"
      style-type="text"
      active-color="#d4237e"
    ></uni-segmented-control>
    <view class="content">
      <view v-if="current === 0"> 推荐内容 </view>
      <view v-if="current === 1"> 分类内容 </view>
      <view v-if="current === 2"> 专辑内容 </view>
    </view>
  </view>
</template>
```

## 二、基于 Promise 封装 request

由于项目中需要多次请求接口，所以根据需求封装 request 请求：

```js
// ./utils/request.js
export default (params) => {
  // 开始加载时弹出加载中提示
  uni.showLoading({ title: "加载中" });
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(data) {
        resolve(data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        // 完成时隐藏"加载中"
        uni.hideLoading();
        console.log("completed");
      },
    });
  });
};
```

挂载到 Vue 的原型上：

```js
// main.js
import request from "./utils/request";
Vue.prototype.request = request;
```

调用：

```js
this.request({
  url: "xxx",
  data: {},
}).then((res) => {
  //... 处理 res
});
```

## 三、瀑布流滚动加载

![scroll](./img/scroll.gif)

### 原理

用 `< scroll-view >` 标签包裹需要滚动的元素，每次请求 n 张图片，当滑动到底部的时候，监听 `scrolltolower` 事件，再次请求，将新的 n 张图片添加到 图片数组中。

**template:**

```vue
<scroll-view
  @scrolltolower="handleToLower"
  scroll-y
  v-if="recommendList.length > 0"
>
  <view class="recommend_item" v-for="item in recommendList" :key="item.id"></view>
</scroll-view>
```

**script：**

```js
export default {
  data() {
    return {
      // 推荐列表
      recommendList: [],
      // 请求参数
      params: {
        // 每次请求的图片张数
        limit: 30,
        // 排序参数
        order: "hot",
        // 加载到第几张图
        skip: 0,
      },
      // 是够还有图片未加载
      hasMore: true,
    };
  },
  methods: {
    handleToLower: function () {
      // 如果还有图片，继续请求
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了……",
          icon: "none",
        });
      }
    },
    // 获取接口数据
    getList: function () {
      uni.showLoading({
        title: "加载中",
      });
      uni
        .request({
          url: "https://service.picasso.adesk.com/v3/homepage/vertical",
          data: this.params,
        })
        .then((data) => {
          let [err, res] = data;
          uni.hideLoading();
          if (err === null) {
            console.log(res.data);
            // 第一次发请求
            if (this.recommendList.length === 0) {
              // 头部推荐模块
              this.recommendList = res.data.res.homepage[1].items;
            }
            // 没有新数据时，弹窗提示
            if (res.data.res.vertical.length === 0) {
              this.hasMore = false;
              uni.showToast({
                title: "没有数据了",
                icon: "none",
              });
              return;
            }
            // 将新的数据加入到图片数组中
            this.recommendList = [
              ...this.recommendList,
              ...res.data.res.vertical,
            ];
          } else {
            console.log(err);
          }
        });
    },
  },
};
```

:warning: 此处不能使用 `OnReachBottom()` 钩子，因为 `onReachBottom()` 是全局滚动，此时我们的底部 tarBar 不滚动，所以使用 `scroll-view` 标签进行局部滚动。

**scroll-review 使用的注意事项：**

- 在滚动 `scroll-view` 时会阻止页面回弹，所以在 `scroll-view` 中滚动，是无法触发 `onPullDownRefresh`
- 若要使用下拉刷新，请使用页面的滚动，而不是 `scroll-view` ，这样也能通过点击顶部状态栏回到页面顶部
