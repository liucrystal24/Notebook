# 一、Dock 栏 macOS 动效原理及实现

:dart: [项目地址](https://liucrystal24.github.io/macos-desk)，欢迎 watch :eyes: 和 star :star:
:book: [项目预览](https://liucrystal24.github.io/macos-desk)，点击即可查看

- ### 效果图

  ![docker](../gif/docker.gif)

- ### Dock 动效原理

  监听鼠标的 `mousemove` 事件，当鼠标滑过 dock 栏图标时，图标的宽度动态变化，图标动态宽度的计算公式为：

  **dock 栏图标动态宽度 = dock 栏图标原本宽度 \* 放大系数 \* （ 1 - 鼠标到图标中心的距离 / dock 栏长度）**

- ### Dock 动效实现

  #### 1. dock 栏结构

  将需要图片名存入数组，并在 div 中遍历，同时通过使用 useRef 钩子给这个 div 绑定一个 ref，便于后续操作。

  ```tsx
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "Chrome.png",
    "PrefApp.png",
    "Terminal.png",
    "Calculator.png",
    "Drawing.png",
  ]);
  const dockerRef = useRef<HTMLDivElement>(null);
  const [defaultWidth] = useState(76);

  <footer id="AppFooter">
    <div ref={dockerRef} style={{ height: defaultWidth }} id="Docker">
      {dockList.map((item, index) => {
        return (
          <div
            style={
              {
                backgroundImage: "url(" + require("../../img/" + item) + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              } as CSSProperties
            }
            key={index + item}
          />
        );
      })}
    </div>
  </footer>;
  ```

  #### 2. 鼠标事件监听

  - ##### dock 栏结构示意图

  ![footer 结构示意图](../img/footer.png)

  - ##### mousemove 事件

    根据动效原理，监听 mousemove 事件

    ```tsx
    const mouseMove = useCallback(
      ({ clientX, clientY }) => {
        if (!dockerRef.current) {
          return;
        }
        const imgList = dockerRef.current.childNodes;
        for (let i = 0; i < imgList.length; i++) {
          const img = imgList[i] as HTMLDivElement;
          // x:点击处距离图标中心的横向距离
          const x = img.offsetLeft + img.offsetWidth / 2 - clientX;
          // y:点击处距离图标中心的纵向距离
          const y =
            img.offsetTop +
            img.offsetHeight / 2 +
            getDockerOffset(dockerRef.current, "top") -
            clientY;
          let scaleImg =
            1 - Math.sqrt(x * x + y * y) / (imgList.length * defaultWidth);
          if (scaleImg < 0.5) {
            scaleImg = 0.5;
          }
          // dock 栏图标动态宽度 = dock 栏图标原本宽度 * 放大系数 * （ 1 - 鼠标到图标中心的距离 / dock 栏长度）
          img.style.width = img.style.height =
            defaultWidth * scaleNum * scaleImg + "px";
        }
      },
      [getDockerOffset, defaultWidth, scaleNum]
    );
    ```

  - ##### getDockerOffset

    获取对象到 body 边缘（ 左 / 顶 ）的距离

    ```tsx
    const getDockerOffset = useCallback(
      (el: HTMLElement, offsetStyle: "top" | "left"): number => {
        const getOffset = offsetStyle === "top" ? el.offsetTop : el.offsetLeft;
        if (el.offsetParent === null) {
          return getOffset;
        }
        return (
          getOffset +
          getDockerOffset(el.offsetParent as HTMLElement, offsetStyle)
        );
      },
      []
    );
    ```

  - ##### mouseleave 事件

    鼠标离开 dock 时，图标还原

    ```tsx
    const mouseLeave = useCallback(() => {
      if (!dockerRef.current) {
        return;
      }
      console.log("leave");
      const imgList = dockerRef.current.childNodes;
      for (let i = 0; i < imgList.length; i++) {
        const img = imgList[i] as HTMLDivElement;
        img.style.width = img.style.height = defaultWidth + "px";
      }
    }, [defaultWidth]);
    ```

  - ##### 初始化图标

    ```tsx
    useEffect(() => {
      mouseLeave();
    }, [mouseLeave]);
    ```

  - ##### 给 dock 绑定事件监听

    ```tsx
    useEffect(() => {
      if (!dockerRef.current) {
        return;
      }
      const docker: HTMLDivElement = dockerRef.current;
      docker.addEventListener("mousemove", mouseMove);
      docker.addEventListener("mouseleave", mouseLeave);
      return () => {
        docker.removeEventListener("mousemove", mouseMove);
        docker.removeEventListener("mouseleave", mouseLeave);
      };
    }, [mouseMove, mouseLeave]);
    ```
