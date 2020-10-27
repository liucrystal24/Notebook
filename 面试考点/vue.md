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

### 3. :star: Vuex

Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**，通过 `store.js` 统一管理状态

- 1.**state**（存储数据，computed : \$store.state.xx 调用）

- 2.**getter**（计算属性，computed : \$store.getters.xx 调用）

- 3.**mutation**（同步方法，methods : \$store.commit('xx') 调用）

- 4.**action**（可以包含异步方法，methods : \$store.dispatch('xx') 调用）

## 四、Vuex 你怎么用的？

Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**

通过 `store.js` 统一管理状态:

**vuex/store.js：**

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 1.state（存储数据，computed : $store.state.xx 调用）

// 2.getter（计算属性，computed : $store.getters.xx 调用）

// 3.mutation（同步方法，methods : $store.commit('xx') 调用）

// 4.action（可以包含异步方法，methods : $store.dispatch('xx') 调用）

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
```

### 1. State （store 的 存储数据）

通过 `$store.state.xx` 调用：

**vuex/store.js：**

```js
const state = {
  count: 1,
  age: 15,
};
```

**component.vue：**

```vue
<template>
  <div>
    <p>{{ $store.state.count }}</p>
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  name: "component1",
  store,
};
</script>
```

当一个组件需要获取多个状态时候，使用 **mapState** 辅助函数，使用 **computed** 获取数据：

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ age }}</p>
  </div>
</template>

<script>
import store from "@/vuex/store";
// 引入 mapState
import { mapState } from "vuex";
export default {
  computed(){
    // 获取 store.state
    ...mapState(["count","age"])
  }
  store,
};
</script>
```

### 2. Getter （store 的计算属性）

通过 `$store.state.xx` 调用：

**vuex/store.js：**

```js
const state = {
  count: 1,
  age: 15,
};

const getters = {
  countMoney: (state) => `¥: ${state.count}`,
  ageSui: (state) => `${state.age}岁`,
};
```

**component.vue：**

```vue
<template>
  <div>
    <p>{{ countGetter }}</p>
    <p>{{ ageGetter }}</p>
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  name: "component1",
  computed(){
    countGetter(){
      return this.$store.getters.countMoney;
    },
    ageGetter(){
      return this.$store.getters.ageSui;
    }
  }
  store,
};
</script>
```

**mapGetters** 辅助函数将 store 中的 getter 映射到局部计算属性：

```vue
<template>
  <div>
    <p>{{ countGetter }}</p>
    <p>{{ ageGetter }}</p>
  </div>
</template>

<script>
import store from "@/vuex/store";
// 引入 mapGetters
import { mapGetters } from "vuex";
export default {
  computed(){
    // 获取 store.getter
    ...mapGetters({ countGetter: "countMoney", ageGetter: "ageSui" }),
  }
  store,
};
</script>
```

### 3. Mutation （store 的方法（同步））

更改 Vuex 的 store 中的状态的 **唯一方法** 是提交 `mutation`，使用 `$store.commit（xx）` 调用

:warning: Mutation **必须是同步函数**

**vuex/store.js：**

```js
const state = {
  count: 1,
  age: 15,
};

const mutations = {
  add(state) {
    state.count++;
  },
  reduce(state, n) {
    state.count -= n;
  },
};
```

**component.vue：**

```vue
<template>
  <div>
    <p>{{ $store.state.count }}</p>
    <button @click="$store.commit('add')">add</button>
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  name: "component1",
  store,
};
</script>
```

**mapMutations** 辅助函数将组件中的 `methods` 映射为 `store.commit`:

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="reduce(10)">add</button>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState , mapGetters } from "vuex";
export default {
  computed(){
    ...mapState(["count"]),
  }
  methods:{
    ...mapMutations(["reduce"])
  }
  store,
};
</script>
```

### 4. Action（类似 Mutation，可以包含异步操作）

Action 通过 `$store.dispatch(xx)` 方法触发：

**vuex/store.js：**

```js
const mutations = {
  add(state) {
    state.count++;
  },
};

const actions = {
  actionAdd({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("add");
        resolve();
      }, 1000);
    });
  },

  actionHandle(context, n) {
    context.commit("add");
    setTimeout(() => {
      context.commit("reduce", n.amount);
    }, 3000);
  },
};
```

**component.vue：**

```vue
<template>
  <div>
    <p>{{ $store.state.count }}</p>
    <button @click="asyncAdd()">actionAdd</button>
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  name: "component1",
  methods:{
    asyncAdd(){
      this.$store.dispatch("actionAdd").then(() => {
        console.log("等待1s，count + 1");
      });
    }
  }
  store,
};
</script>
```

**mapMutations** 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用：

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="actionHandle({ amount: 5 })">add</button>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState , mapActions } from "vuex";
export default {
  computed(){
    ...mapState(["count"]),
  }
  methods:{
    ...mapMutations(["actionHandle"])
  }
  store,
};
</script>
```

## 五、Vue 数据响应式怎么做到的？

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，使用 `Object.defineProperty` 把这些 property 全部转为 `getter/setter`。

### 数组和对象的变化

由于 JavaScript 的限制，Vue 不能检测数组和对象的变化，因此需要使用 `Vue.set`

- 对象

  ```js
  Vue.set(vm.someObject, "b", 2);
  this.$set(this.someObject, "b", 2);
  ```

- 数组

  ```js
  Vue.set(vm.items, indexOfItem, newValue);
  this.$set(this.items, indexOfItem, newValue);
  ```

## 六、VueRouter 你怎么用的？

Vue Router 是 Vue.js 官方的路由管理器。

### 基础 api

- < router-link to='/foo' >Go to Foo< /router-link > ：路由跳转标签

- < router-view >< router-view > ：路由匹配的组件渲染出口

- this.\$router.push({ name: 'user', params: { userId: '123' }})：编程式路由跳转

- this.\$router.replace({ name: 'user', params: { userId: '123' }})：和 `router.push` 相似，不向 `history` 添加新纪录

- this.\$router.go(1) / this.\$router.go(-1)：前进 / 后退

### History 模式

`vue-router` 默认 `hash` 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载

当你使用 `history` 模式时，URL 就像正常的 url

:warning: 服务器需要配置 index.html ，服务器就不会在返回 404 错误页面 ，因为对所有路径都会返回 **index.html** ，路由需要设置：

```js
const router = new VueRouter({
  mode: "history",
  routes: [{ path: "*", component: NotFoundComponent }],
});
```

### 导航守卫

`vue-router` 提供的导航守卫主要用来通过 **跳转** 或 **取消** 的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

:warning: 参数或查询的改变并不会触发进入/离开的导航守卫!

- #### 全局前置守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
    // ...
})
```

**to: Route**: 即将要进入的目标 路由对象

**from: Route**: 当前导航正要离开的路由

**next: Function**: **一定要调用该方法** 来 resolve 这个钩子。执行效果依赖 next 方法的调用参数

- #### 全局后置钩子

和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身

```js
router.afterEach((to, from) => {
  // ...
});
```

- #### 路由独享的守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
});
```

- #### 组件内的守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
};
```

- #### 完整的导航解析流程

1、 失活的组件 `beforeRouteLeave` 守卫

2、 全局前置 `beforeEach` 守卫

3、 重用的组件 `beforeRouteUpdate` 守卫

4、 路由 `beforeEnter`

5、 解析异步路由组件

6、 激活的组件 `beforeRouteEnter` 守卫

7、 全局 `beforeResolve` 守卫

8、 全局后置 `afterEach` 钩子

9、 DOM 更新

### 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载：

```js
const Foo = () => import("./Foo.vue");

// 路由配置不需要改变
const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }],
});
```

- #### 组件按组分块

将某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 `命名 chunk`

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue");
const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue");
```
