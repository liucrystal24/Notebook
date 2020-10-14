# Event loop ( 事件循环 )

:books: https://xiedaimala.com/tasks/eca23d4a-5c2a-4f4a-865b-9789130a4813/video_tutorials/cb67bdb1-9f3d-4232-aa50-cd293bb8a7d9

40:38

类似 ajax 的异步请求 是 node.js 完成以后，再传给 js 的， node.js 完成的这一部分 遵循 Event loop 规则

是一个 抽象的概念

## 过程

1. :star: **timers**
2. I/O callback
3. idle , prepare
4. :star: **poll** ( 停留一段时间 )
5. :star: **check**
6. close callback
