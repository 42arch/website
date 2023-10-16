---
title: chrome浏览器中css backdrop-filter 属性无效
date: 2023-04-08
---

当在嵌套元素即外层元素和内层元素同时使用`backdrop-filter`属性时，内层元素属性不起作用，没有出现模糊效果。

```css
.out {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.inner {
  /* not work */
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

原因：这是 chrome 浏览器的一个 bug。
解决方式：使用**伪元素**的方式解决：

```css
.out {
  position: relative;
}

.out::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.inner {
  /* works */
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

[参考](https://stackoverflow.com/questions/60997948/backdrop-filter-not-working-for-nested-elements-in-chrome)
