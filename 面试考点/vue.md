# Vue

## 一、watch / computed / methods 区别

- computed 有缓存，页面重新渲染，如果数值不变化，不需要再次执行函数 ； watch / methods 没有缓存，会重新执行函数

- computed ：计算值，淡出计算值 ；watch ：观察动作，还可以执行别的操作，如上报数据

## 二、Vue 有哪些生命周期钩子函数？分别有什么用？

### 1. beforeCreate

创建前。此阶段为实例初始化之后，this 指向创建的实例，此时的数据观察事件机制都未形成，不能获得 DOM 节点

`data` ，`computed` ，`watch` ，`methods` 上的方法和数据均不能访问

可以在这加个 `loading` 事件

### 2. created

创建后。此阶段为实例已经创建，完成数据（data、props、computed）的初始化导入依赖项

可访问 `data` ，`computed` ，`watch` ，`methods` 上的方法和数据

初始化完成时的事件写在这里，异步请求也适宜在这里调用（请求不宜过多，避免白屏时间太长）

可以在这里结束 `loading` 事件，还做一些初始化，实现函数自执行

未挂载 DOM，若在此阶段进行 DOM 操作一定要放在 Vue.nextTick()的回调函数中

### 3. beforeMount

挂载前。虽然得不到具体的 DOM 元素，但 vue 挂载的根节点已经创建，下面 vue 对 DOM 的操作将围绕这个根元素继续进行

beforeMount 这个阶段是过渡性的，一般一个项目只能用到一两次

### 4. mounted

挂载完成。创建 `vm.$el`，和双向绑定

完成挂载 DOM 和渲染，可在 mounted 钩子函数中对挂载的 DOM 进行操作

可在这发起后端请求，拿回数据，配合路由钩子做一些事情

### 5. beforeUpdate

数据更新前。数据驱动 DOM。

在数据更新后虽然没有立即更新数据，但是 DOM 中的数据会改变，这是 vue 双向数据绑定的作用。

### 6. updated

数据更新后。完成虚拟 DOM 的重新渲染和打补丁。

组件 DOM 已完成更新，可执行依赖的 DOM 操作。

注意：不要在此函数中操作数据（修改属性），会陷入死循环。

### 7. beforeDestroy

销毁前。可做一些删除提示，如：您确定删除 xx 吗？

### 8. destroyed

销毁后，当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁。

## 三、Vue 如何实现组件间通信

### 1. 父子组件 （ 父传子：props / 子传父：this.$emit & this.$on ）

- **父传子**
  父：

  ```html
  <mycomponent :dataname="fatherdata" />
  ```

  ```js
  import mycomponent from "son.vue";

  export default {
    name: "App",
    components: { mycomponent },
    data() {
      return {
        fatherdata: "123",
      };
    },
  };
  ```

  子：

  ```html
  <p>{{ dataname }}</p>
  ```

  ```js
  export default {
    name: "mycomponent",
    props: { dataname: String },
  };
  ```

- **子传父**

  子：

  ```js
  export default {
    mounted() {
      this.$emit("handleSon", this.sondata);
    },
    data() {
      return {
        sondata: "123",
      };
    },
  };
  ```

  父：

  ```html
  <mycomponent @handleSon="fatherfn" />
  ```

  ```js
  export default {
    methods: {
      fatherfn(data) {
        console.log(data);
      },
    },
  };
  ```

### 2. 任意组件 （ Eventbus / this.bus.$emit & this.bus.$on ）

利用 `eventbus`，创建一个全局 **Vue 的实例**，让各个组件共用同一个事件机制

main.js：

```js
Vue.prototype.bus = new Vue();
```

接收数据组件：

```js
export default {
  created() {
    this.bus.$on("handlebro", (data) => {
      console.log(data); // 123
    });
  },
};
```

传数据组件：

```js
export default {
  data(){
    return{
      bromsg:'123'
    }
  }
  mounted() {
    this.bus.$emit("handlebro", this.bromsg);
  },
};
```

### 3. Vuex

## 四、Vue 数据响应式怎么做到的？

## 五、Vue.set 是做什么用的？

## 六、Vuex 你怎么用的？

## 七、VueRouter 你怎么用的？

## 八、路由守卫是什么？
