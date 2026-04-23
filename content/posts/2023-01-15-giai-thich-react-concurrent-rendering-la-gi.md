---
slug: "2023-01-15-giai-thich-react-concurrent-rendering-la-gi"
date: "2023-01-15"
title: "Concurrent rendering trong React là gì?"
desc: "Bài viết này chúng ta sẽ cũng tìm hiểu React Concurrent, vấn đề nó giải quyết là gì và nó chạy như thế nào, ứng dụng thực tế"
tags: ["docker","hoc-thuat","beginner"]
---

<!-- TOC -->

- [Vấn đề](#vấn-đề)
- [Giải pháp](#giải-pháp)
- [API](#api)
    - [`useTransition`](#usetransition)
    - [`useDeferredValue`](#usedeferredvalue)
- [Tip](#tip)
- [Kết](#kết)

<!-- /TOC -->

## Vấn đề

Chúng ta sẽ lấy một UI như bên dưới làm ví dụ

![](https://i.imgur.com/CCrR9dm.png)


```jsx
import { useState } from "react";
import { list } from "./list";
import "./style.css";

export default function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="container">
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />

      <List filter={filter} />
    </div>
  );
}

const List = ({ filter }) => {
  const filteredList = list.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  sleep(100);

  return (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
};

const sleep = (ms) => {
  const start = performance.now();

  while (performance.now() - start < ms);
};
```

Hàm `sleep` để giả lập việc render một component tốn nhiều thời gian

![](https://blog-codeminer42.s3.sa-east-1.amazonaws.com/wp-content/uploads/2022/12/08194847/list-filtering.gif)

Render `<List />` tốn thời gian, toàn bộ UI sẽ bị *đóng băng* cho đến khi toàn bộ quá trình này kết thúc, trong thời gian đang render, khi user tiếp tục nhập vào input, chúng ta sẽ thấy nó không *phản ứng*

Quá trình render component trước đây của React luôn là một quá trình *tuần tự*, chạy tiếp sức, khi 1 component chạy xong đến đích của nó, nó sẽ truyền cờ cho component tiếp theo chạy

## Giải pháp

React 18 giới thiệu cơ chế **concurrent rendering** để giải quyết vấn đề trên, developer sẽ chủ động khai báo những component nào có thể sẽ không cần render, có thể bỏ qua một số lần render không cần thiết.

Như ở ví dụ trên, thay vì user vừa gõ vào một ký tự, `<List />` sẽ được render, `<List />` chỉ cần render ở lần cuối cùng (khá giống với `lodash.debounce`)

```jsx
export default function App() {
  const [filter, setFilter] = useState("");
  // ưu tiên thấp, không cần chạy liền
  const [delayedFilter, setDelayedFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  // cái này để kiểm tra giá trị khi chạy
  useDebug({ filter, delayedFilter });

  return (
    <div className="container">
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          startTransition(() => {
            setDelayedFilter(e.target.value);
          });
        }}
      />

      <List filter={delayedFilter} />
    </div>
  );
}

const List = memo(({ filter }) => {
  const filteredList = list.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  sleep(100);

  return (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
});
```

![](https://blog-codeminer42.s3.sa-east-1.amazonaws.com/wp-content/uploads/2022/12/08195131/concurrent-list-filtering.gif)

## API

Ở thời điểm viết bài này, React giới thiệu cho chúng ta 2 API hỗ trợ concurrent rendering là `useTransition` (hay `startTransition` nếu dùng độc lập) và `useDeferredValue`

### `useTransition`

Trong ví dụ ở trên, chúng ta đã *diện kiến* `useTransition`, hook này sẽ trả về cho chúng ta hàm `startTransition` và state `isPending`

```js
const [isPending, startTransition] = useTransition()
```

`startTransition` sẽ *đánh dấu* những công việc có thứ tự ưu tiên thấp trong việc render, ở trên là việc đặt lại giá trị state `delayFilter`

```js
startTranstion(() => {
	setDelayedFilter(e.target.value)
})
```

Một lưu ý quan trọng với callback truyền cho `startTransition(callback)` là nó phải là một sync function, nghĩa là sử dụng như bên dưới sẽ không cho kết quả như mong đợi

```js
❌
startTransition(() => {
  setTimeout(() => {
    setCount((count) => count + 1);
  }, 1000);
});
❌
startTransition(async () => {
  await asyncWork();
  setCount((count) => count + 1);
});
❌
startTransition(() => {
  asyncWork().then(() => {
    // Different call stack
    setCount((count) => count + 1);
  });
});
```

Chúng ta cần sửa lại thành

```js
setTimeout(() => {
  startTransition(() => {
    setCount((count) => count + 1);
  });
}, 1000);

await asyncWork();

startTransition(() => {
  setCount((count) => count + 1);
});

asyncWork().then(() => {
  startTransition(() => {
    setCount((count) => count + 1);
  });
});
```

Một lưu ý khác, chỉ dùng với `state`, không dùng được với `ref`

```jsx
❌
const delayedFilterRef = useRef(filter);

startTransition(() => {
  delayedFilterRef.current = e.target.value;
});
```

### `useDeferredValue`

Vẫn là bài toán ban đầu, chúng ta sẽ giải quyết nó bằng `useDeferredValue`

```jsx
export default function App() {
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferredValue(filter);

  useDebug({ filter, deferredFilter });

  return (
    <div className="container">
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />

      <List filter={deferredFilter} />
    </div>
  );
}

const List = memo(({ filter }) => {
  const filteredList = list.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  sleep(100);

  return (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
});
```

![](https://blog-codeminer42.s3.sa-east-1.amazonaws.com/wp-content/uploads/2022/12/08195534/deferred-values.gif)

Khác với `useTransition` chúng ta phải thêm `delayFilter` state và chủ động gán giá trị này, `useDeferredValue` sẽ làm dùm cho chúng ta công việc *cơ bắp* đó, chúng ta truyền vào cho `useDeferredValue` giá trị *"nếu có thay đổi, thì mày khoan hả làm gì cả"*

## Tip

Tip nhỏ nếu anh em nào muốn hiển thị `loading` khi `fetch` dữ liệu lần đầu, ở những lần tiếp theo chúng ta sẽ hiển thị dữ liệu cũ trong lúc đang chờ dữ liệu mới thay vì loading. Tới thời điểm hiện tại, chúng ta sẽ chưa đủ *đồ chơi* đề làm việc này

![](https://blog-codeminer42.s3.sa-east-1.amazonaws.com/wp-content/uploads/2022/12/08194847/list-filtering.gif)

Đây là lúc mang thêm `<Suspense />` vào

```jsx
export default function App() {
  const [page, setPage] = useState(1);
  const deferredPage = useDeferredValue(page);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setPage((page) => page - 1);
          }}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          Next Page
        </button>
        Page: {page}
      </div>

      <Suspense fallback="Loading...">
        <Component page={deferredPage} />
      </Suspense>
    </div>
  );
}

const Component = ({ page }) => {
  const data = suspenseFetchData(page);

  return (
    <>
      {data
        ? data.map((entry) => <div key={entry.id}>{entry.name}</div>)
        : "Loading ..."}
    </>
  );
};
```

![](https://blog-codeminer42.s3.sa-east-1.amazonaws.com/wp-content/uploads/2022/12/08195634/new-stale-while-revalidate-transitions.gif)

## Kết

Concurrent Rendering là một là một phương pháp mới để giải quyết những vấn đề *gặp hoài* với anh em làm Frontend, cân nhắc sử dụng nó để đem tới những trãi nghiệm sử dụng ứng dụng *mượt mà* cho người dùng nhé anh em.