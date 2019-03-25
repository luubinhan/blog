---
slug: "/2018-10-31-gioi-thieu-react-lazy"
date: "2018-10-31"
title: "Sử dụng React.lazy ra làm sao?"
desc: "Api mới của React 16.6"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

React 16.6 giới thiệu api mới, <a href="https://reactjs.org/docs/code-splitting.html#reactlazy" target="_blank" rel="noopener noreferrer">React.lazy</a>, function này sẽ cho phép chúng ta render 1 component được import kiểu [lazy load](/blog/2018-10-07-huong-dan-lazy-load-component-react)

Như trước đây chúng ta thường phải tự viết phần kiểm tra khi nào nên load, kết hợp với `componentDidUpdate`. Chúng ta không cần làm những công việc như vậy nữa, với api mới này

```jsx
const LazyComponent = React.lazy(() => import('./Component'));
```

Wrap component này lại bên trong `Suspense`, trả fallback khi ko load được

```jsx
<Suspense fallback={<div>Loading Component...</div>}>
  <LazyComponent />
</Suspense>
```

Sử dụng `React.lazy` để làm ví dụ sau


<a href="http://vigneshm.com/react-lazy-example/" target="_blank" rel="noopener noreferrer">Demo</a>


<a href="https://github.com/vigzmv/react-lazy-example" target="_blank" rel="noopener noreferrer">Source Github</a>

Phần code sử dụng `React.lazy` không có gì cao siêu, thay vì import bình thường, chúng ta *import* bằng `React.lazy`.

```jsx
const User = React.lazy(() => import('./User'));

//...

<React.Suspense fallback={<div>Loading Component...</div>}>
  {user && <User user={user} />}
  {loading ? (
    <div>Loading User...</div>
  ) : (
    !user && <button onClick={this.loadUser}>Press Me!</button>
  )}
</React.Suspense>
```

Chưa tìm được tài liệu chính thức về `React.Suspense`, mình chỉ giải thích nhanh

Suspense là một tính năng mới của React, có thể hiểu nó như là một **Placeholder** component, mà theo định nghĩa chính xác đầy đủ nhất

> Suspense allows you to defer rendering part of your application tree until some condition is met (for example, data from an endpoint or a resource is loaded).

Tạm dịch: Suspense cho phép chúng ta defer render (render không đồng thời) một phần của **tree** đến khi thõa điều kiện ( thí dụ load xong data và resource )

<a href="https://codesandbox.io/s/8nq4w3jj39" target="_blank" rel="noopener noreferrer">Demo Suspense</a>


<a href="https://dev.to/vigzmv/reactlazy-what-and-how-to-use-in-your-app-p9a" target="_blank" rel="noopener noreferrer">React.lazy, What and how to use in your app</a>
