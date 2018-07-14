---
slug: "/2017-10-20-react-lifecycle-la-gi"
date: "2017-10-20"
title: "Giải thích React Lifecycle"
desc: "Tìm hiểu vòng đời luẩn quẩn của một component react, khi nào và sử dụng ra sao"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [constructor](#constructor-function Object() { [native code] }1)
- [componentWillMount](#componentwillmount)
- [componentDidMount](#componentdidmount)
- [componentWillReceiveProps](#componentwillreceiveprops)
- [shouldComponentUpdate](#shouldcomponentupdate)
- [componentWillUpdate](#componentwillupdate)
- [componentDidUpdate](#componentdidupdate)
- [componentWillUnmount](#componentwillunmount)
- [componentDidCatch](#componentdidcatch)

<!-- /TOC -->

![](https://cdn-images-1.medium.com/max/1600/1*u8hTumGAPQMYZIvfgQMfPA.jpeg)

Để thực sự trở thành một master React, việc hiểu lifecycle của component là bắt buộc, vòng đời của một component được tính từ lúc nó được chèn vào trong DOM (tức là không kể giai đoạn `componentWillMount` - có thể xem là giai đoạn thai nghén) đến lúc nó được remove ra khỏi DOM.

Các phương thức của lifecycle là một dạng `hook` (giống như khái niệm `hook` trong wordpress), cho phép người lập trình can thiệp vào quá trình cập nhập UI với những thay đổi của `state` hoặc `props`.

Những phương thức bắt đầu với `componentWill` tức là cái `hook` này được đặt trước những xử lý của React, còn bắt đầu với `componentDid` thì chạy sau khi thực hiện các đoạn code xử lý của React.

```jsx
componentEvent() {
    componentWill...(); // hook

    // React handle something
    
    componentDid...(); // hook
}

```

## constructor

Phương thức này sẽ được gọi khi component được khởi tạo, trước khi nó được *mount*

```jsx
class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
       clicks: 0
    };
  }
  handleClick() {
    this.setState({ 
      clicks: this.state.clicks + 1
    });
  }
  //...
}
```

## componentWillMount

Chạy sau `constructor` trước khi component mount vô DOM bằng hàm `render`

Lưu ý không nên gọi bất kỳ hàm nào có gọi `setState` trong `componentWillMount` vì chưa có DOM nào để tương tác.

## componentDidMount

Component đã hiện hình, là lúc mà ta gọi AJAX, thêm sự kiện có tương tác với DOM, gọi `setState` ở đây sẽ trigger sự kiện re-render.

```jsx
componetDidMount() {
  fetch('https://gitconnected.com')
    .then((res) => {
      this.setState({
        user: res.user
      });
    });
}
```

## componentWillReceiveProps

Chạy khi component nhận được `props` mới từ component cha. Thời điểm thích hợp để kiểm tra và reset lại `state` có phụ thuộc vào giá trị `props`

```jsx
componentWillReceiveProps(nextProps) {
  if (this.props.id !== nextProps.id) {
    this.setState({
      feedContent: []
    });
  }
}
```

## shouldComponentUpdate

Có phương thức này để cải thiện performance của React, vì đôi lúc có những sự thay đổi `state` hoặc `props` nếu không muốn cập nhập lại UI có thể cho hàm này return và `false` (mặc định là return `true`), khi return `false` các hàm `componentWillUpdate`, `render`, `componentDidUpdate` sẽ không được gọi.

```jsx
shouldComponentUpdate(nextProps, nextState) {
   return this.props.clicks !== nextProps.clicks;
}
```


## componentWillUpdate

Không có nhiều trường hợp sử dụng hook này, **KHÔNG** gọi `setState` ở đây, phần lớn các trường hợp điều có thể handle ở `componentWillReceiveProps`

## componentDidUpdate

Sau khi React cập nhập lại UI, hook này sẽ được gọi, nếu muốn chạy một animation gì đó cần tương tác với DOM thì đây chính là lúc thực thi

## componentWillUnmount

Có thể sử dụng để remove các listener đã được add cho DOM

```jsx
componentWillUnmount() {
  window.removeEventListener('resize', this.resizeEventHandler);
}
```

## componentDidCatch

Cái này mới được add vào từ React 16, nếu một component nào đó bị lỗi nó sẽ không chết nguyên cái app nữa mà sẽ quăn lỗi ở đây, sử dụng để hiển thị lỗi lên UI

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```