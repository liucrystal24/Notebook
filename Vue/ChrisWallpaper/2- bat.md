# 【ChrisWallpaper（二）】 全局配置

## 一、全局配置

**pages.json** 中进行全局配置，包括 **页面路由、小程序结构全局样式、底部栏 tabBar** 等。

### 页面路由格式

第一个位置的页面默认为小程序初始页面。

```json
{
  "pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/mine/index",
      "style": {
        // 导航栏显示文字
        "navigationBarTitleText": "我的"
      }
    }
  ]
}
```

### 小程序结构全局样式

```json
{
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#000"
  }
}
```

### tabBar 切换标签样式

底部标签切换路由地址、图标样式（是否选中样式）

```json
{
  "tabBar": {
    "color": "#8a8a8a",
    "selectedColor": "#d4237a",
    "backgroundColor": "#fff",
    "position": "bottom",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/home/index",
        "text": "首页",
        "iconPath": "./static/tabbar/home.png",
        "selectedIconPath": "./static/tabbar/home_selected.png"
      },
      {
        "pagePath": "pages/mine/index",
        "text": "我的",
        "iconPath": "./static/tabbar/user.png",
        "selectedIconPath": "./static/tabbar/user_selected.png"
      }
    ]
  }
}
```

## 二、样式引用

- 小程序的样式文件为 `.wxss` 文件，样式中没有 `*` 通配符
- 在所需模块中通过 `@import './style/base.wxss'` 引用
