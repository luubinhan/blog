---
slug: "/2018-10-07-huong-dan-lazy-load-component-react"
date: "2018-10-07"
title: "Hướng dẫn lazy load component trong React"
desc: "Sự là hôm rồi đi phỏng vấn, được hỏi câu này mà mình đó giờ chưa làm nên không biết, nay có thời gian rảnh rỗi tìm hiểu, chia sẻ lại cho các bạn chưa biết."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "performance"]
---

<!-- TOC -->

- [Vấn đề](#vấn-đề)
- [Giải pháp](#giải-pháp)
- [Code ví dụ](#code-ví-dụ)
- [Lazy load react-router](#lazy-load-react-router)
- [Tổng kết](#tổng-kết)

<!-- /TOC -->


# Vấn đề

Bạn viết code, chạy thử trên localhost, yeah mọi thứ super nhanh

![Hướng dẫn lazy load component trong React](https://pm1.narvii.com/6456/c88c177b7cee6af26086088dfcfa09cf401b676e_hq.jpg)

Nhưng khi chạy trên production thì mọi thứ sẽ trở nên như thế này

![Hướng dẫn lazy load component trong React](https://vetstreet-brightspot.s3.amazonaws.com/32/b9e550dfd411e1a02d005056ad4734/file/tortoise-137584694-lc080612.jpg)

Sẽ có rất nhiều giải pháp để xử lý vấn đề này.

Tại sao chúng ta phải load một component mà user chưa sử dụng đến, thậm chí có khi trong suốt quá trình làm việc, user sẽ không đụng đến một số màn hình?

# Giải pháp

Nếu bạn làm web nhiều thì chắc có nghe đến lazy load image, để giảm bớt số lượng request gởi đi và dữ liệu trả về cho lần load đầu tiên. Trong React cũng có khái niệm tương tự như vậy.

Tất cả những việc đó thực hiện được là nhờ sự thần thánh của **webpack**

Thông thường chúng ta import component như sau

```jsx
import ScreenComponent from './ScreenComponent';
```

Vậy đã bao giờ bạn thử

```jsx
import('./ScreenComponent');
```

Vâng, nó sẽ trả về 1 **Promise**!

Nếu import như thế, Webpack sẽ split file build ra và thực hiện việc load chỉ khi được gọi

# Code ví dụ

![Hướng dẫn lazy load component trong React](https://i.imgur.com/5zJ4s8b.png)

```jsx
import React, { Component } from 'react';
import Todo from './Todo';

constructor(props) {
    super(props);
    this.state = {
      value: '',
      todos: []
    }
}
// ...
render() {
    return (
      <div className="App">
        <header className="App-header">
          Add todo
        </header>
        <input value={this.state.value} onChange={this.changeValue} />
        <button onClick={this.submitValue}>Add</button>
        <hr />
        <Todo todos={this.state.todos} />
      </div>
    );
}
```

Nếu ở màn hình này, user chưa có gì trong `state.todos`, chúng ta không thực sự cần `import Todo from './Todo';`, chỉ khi user nhấn add để thêm một item vào trong `state.todos` chúng ta mới cần load component `<Todo />`

Thêm `state.LLTodo` để kiểm tra việc load component todo chưa, chúng ta đưa việc load này vào `componentDidUpdate()`

```jsx
import React, { Component } from 'react';
//import Todo from './Todo'; // bỏ component import ở đây

constructor(props) {
    super(props);
    this.state = {
      value: '',
      todos: [],
      LLTodo: null
    }
}
componentDidUpdate(prevProps, prevState) {
    if (!this.state.LLTodo) {
      this.lazyLoadTodo();
    }
}
lazyLoadTodo = () => {
    const lazyLoad = import('./Todo');
    debugger; // để xem nó trả về gì
}
```

![Hướng dẫn lazy load component trong React](https://i.imgur.com/EQHSNyp.png)

Nó đã trả về cho chúng ta một Promise, sửa lại hàm này thành async

```jsx
lazyLoadTodo = async () => {
    const {default: Todo} = await import('./Todo');
    this.setState({LLTodo: Todo});
}
```

Chúng ta kiểm tra việc render này theo `state.LLTodo`

```jsx
render() {
    const {LLTodo, todos} = this.state;
    const lazyLoadTodo = LLTodo ? <LLTodo todos={todos} /> : null;
    return (
      <div className="App">
        <header className="App-header">
          Add todo
        </header>
        <input value={this.state.value} onChange={this.changeValue} />
        <button onClick={this.submitValue}>Add</button>
        <hr />
        {lazyLoadTodo}
      </div>
    );
}
```

Để thực sự thấy được kết quả, chúng ta có thể build, hoặc trên mở tab network, khi nhập giá trị vào trong input, một file `[tên].chunk.js` sẽ được load thêm vào.

![Hướng dẫn lazy load component trong React](https://i.imgur.com/h9LyiS9.png)

File 1.chunk.js được load khi component được update

![Hướng dẫn lazy load component trong React](https://i.imgur.com/8v6S8QR.png)

Mở file này ra để check xem sau

![Hướng dẫn lazy load component trong React](https://i.imgur.com/Y9lytUD.png)

Đúng là file component của chúng ta được được tách ra :D

# Lazy load react-router

Giờ xem xét phần chúng ta setup cho cái route, đại khái nó sẽ như thế này

```jsx
import Home from './Home'
import Blog from './Blog'

<Switch>
    <Route exact path="/" component={HomeComponent} />
    <Route path="/blog" component={BlogComponent} />
</Switch>
```

Áp dụng lazy load component với *route*, ở đây mình viết thêm một hàm `asyncComponent`, nó sẽ nhận vào hàm `import('path/to/file')` và return về component đó.

```jsx
import React, {Component} from 'react';

export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    static Component = null;
    state = { 
      // chổ này hơi tricky, trỏ về chính nó
      Component: AsyncComponent.Component 
    };

    componentDidMount(prevProps, prevState) {
      // không re-load nếu đã có rồi
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component })
        })
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  }
  return AsyncComponent;
}
```

Hàm `asyncComponent()` này chúng ta sẽ truyền vào cho nó function là `getComponent()` (chính là hàm import)

Chỉnh lại cách chúng ta import component cho từng route

```jsx
// Dynamically imported components
const Home = asyncComponent(() =>
  import('./Home').then(module => module.default)
)

const Blog = asyncComponent(() =>
  import('./Blog').then(module => module.default)
)

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/blog" component={Blog} />
</Switch>
```

![Hướng dẫn lazy load component trong React](https://i.imgur.com/PN8f7w9.png)

# Tổng kết

Việc lazy load component không quá khó, không cần thêm bất kỳ thư viện, config gì cả nếu bạn đang init project bằng `create-react-app`, nhưng nó sẽ là giải pháp phải làm khi file bundle của bạn đã quá lớn và ngày càng lớn hơn.

Chúc các bạn có một ngày Happy Interview!
