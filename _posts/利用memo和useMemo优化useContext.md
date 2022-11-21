---
title: React中利用memo和useMemo优化useContext值的渲染
slug: using memo and useMemo to optimize useContext in React
date: 2022-08-25
tags: 
  - React
  - React Hooks
category: Tec
---

## useContext 的重新渲染问题

在React中如果使用`useContext`hooks，context中的每个value更新时都会触发内部子组件的重新渲染，即使有的组件并没有依赖更新的数据。如下面的代码所示：在该例子中，`AppContext`提供了两个value: `count`和`price`，两个子组件`CountChild`和`PriceChild`分别独立依赖每个value。但是单独更新任意一个value，都会触发两个子组件的重新渲染。

而期望的结果是：当count刚更新时，只有`CountChild`重新渲染，price值同理。

```jsx
import React, {
  createContext,
  useContext,
  memo,
  useState,
  useMemo,
} from 'react';

let renderIndex = 0;
const AppContext = createContext({});

const CountChild = ({ count }) => {
  console.log('count child render');

  return (
    <div style={{ width: '100px', height: '100px', border: '1px solid black' }}>
      child count: {count}
    </div>
  );
};

const PriceChild = () => {
  console.log('price child render');
  const { price } = useContext(AppContext);

  return (
    <div style={{ width: '100px', height: '100px', border: '1px solid black' }}>
      child price: {price}
    </div>
  );
};

function App() {
  renderIndex++;
  console.log(`renderIndex: ${renderIndex}`);

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(1);
  return (
    <AppContext.Provider value={{ count, price }}>
      <div className="App">
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          add count
        </button>

        <button
          onClick={() => {
            setPrice(price + 1);
          }}
        >
          add price
        </button>

        <div>count: {count}</div>
        <div>price: {price}</div>

        <CountChild />
        <PriceChild />
      </div>
    </AppContext.Provider>
  );
}

export default App;
```

## 解决方案

https://github.com/facebook/react/issues/15156

在React的该issue中，官方提供了三种解决方案：

1. 分割context: （官方推荐）

在上例中，即将`AppContext`分割成`CountContext`和`PriceContext`提供给相应子组件使用。该方案较简单，不再赘述。

2. 利用`memo`api

将子组件成两部分，给内部的组件传入一个指定的props，外部组件仍然会渲染，但是内部组件不会，因此也不会产生太大开销。

```jsx
const CountChild = memo(({ count }) => {
  console.log('count child render');

  return (
    <div style={{ width: '100px', height: '100px', border: '1px solid black' }}>
      child count: {count}
    </div>
  );
});

const MemoCountChild = () => {
  const { count } = useContext(AppContext);
  return <CountChild count={count} />;
};
```

3. 利用`useMemo` hooks

一个组件内部使用`useMemo`，并指定它的依赖，组件仍会被重新执行，但是如果依赖的值没有更新的话，子组件并不会重新渲染。

```jsx
const MemoPriceChild = () => {
  const { price } = useContext(AppContext);

  return useMemo(() => {
    console.log('price child render');
    return (
      <div
        style={{ width: '100px', height: '100px', border: '1px solid black' }}
      >
        child price: {price}
      </div>
    );
  }, [price]);
};
```

## Full Code

<iframe src="https://stackblitz.com/edit/react-h3dmvb?embed=1&file=src/App.js" width="100%" height="400px"></iframe>


