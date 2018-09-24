---
slug: "/2017-10-20-react-lifecycle-la-gi"
date: "2017-10-20"
title: "Giải thích React Component Lifecycle"
desc: "Tìm hiểu vòng đời của một Component React, khi nào và sử dụng ra sao"
category: "react"
cover: "https://cdn-images-1.medium.com/max/1800/0*OoDfQ7pzAqg6yETH."
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [render()](#render)
- [constructor(props)](#constructorprops)
- [componentDidMount()](#componentdidmount)
- [componentDidUpdate(prevProps, prevState, snapshot)](#componentdidupdateprevprops-prevstate-snapshot)
- [componentWillUnmount](#componentwillunmount)
- [shouldComponentUpdate(nextProps, nextState)](#shouldcomponentupdatenextprops-nextstate)
- [static getDerivedStateFromProps(props, state)](#static-getderivedstatefrompropsprops-state)
- [getSnapshotBeforeUpdate(prevProps, prevState)](#getsnapshotbeforeupdateprevprops-prevstate)
- [componentDidCatch(error, info)](#componentdidcatcherror-info)

<!-- /TOC -->

![React Component Lifecycle](https://cdn-images-1.medium.com/max/1800/0*OoDfQ7pzAqg6yETH.)

Để thực sự trở thành một master React, việc hiểu lifecycle của component là bắt buộc.

Các phương thức của lifecycle là một dạng `hook` (giống như khái niệm `hook` trong wordpress)

Có thể group các phương thức lifecycle ra 3 nhóm, ứng với 4 giai đoạn của component: **Mouting**, **Updating**, **Unmounting**, **Error Handling**

**Mouting**

Nó sẽ theo thứ tự sau

1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

**Updating**

Các phương thức này sẽ được gọi khi có sự thay đổi của `state` hoặc `props`

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

**Unmounting**

Phương thức được gọi trước khi remove component khỏi DOM

1. componentWillUnmount()

**Error Handling**

Bất kể lỗi ở đâu trong component, nó sẽ gọi đến phương thức này

1. componentDidCatch()



# render()

Đây là phương thức bắt buộc duy nhất khi tạo ra một component, bắt buộc trả về một trong những giá trị

- React element
- Arrays and fragments
- Portals
- String and numbers
- Booleans or null

> Hàm nãy sẽ không được gọi nếu `shouldComponentUpdate()` return false

# constructor(props)

Phương thức khởi tạo một component, nếu không khởi tạo `state`, bind các phương thức, thì ko cần khai báo phương thức này.

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

> Đừng chuyển props sang state! Xử lý logic sẽ hết sức rắc rối về sau

Đừng làm thế này nhé

```jsx
constructor(props) {
 super(props);
 // DON'T DO THIS
 this.state = { color: props.color };
}
```

# componentDidMount()

Component đã hiện hình, là lúc mà ta gọi AJAX

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

Có thể gọi `setState()` ở dòng đầu tiên của phương thức `componentDidMount()`, hàm `render()` sẽ được gọi lại một lần nữa, nhưng nó chi xảy ra trước khi trình duyệt update DOM, render chắc chắn sẽ gọi 2 lần, user có thể không nhận ra sự thay đổi này, tuy nhiên đây là nguyên nhân cho vấn đề với performance. Nhưng cần thiết trong trường hợp như modal hay tooltip chúng ta cần tính toán vị trí của DOM trước khi render

# componentDidUpdate(prevProps, prevState, snapshot)

Ngay sau khi component được cập nhập, hook này sẽ được gọi. Không gọi trong lần render đầu. Đây cũng có thể là nơi để tạo một network request khi chúng ta so sánh `prop` hiện tại với `prop` ở thời điểm trước đó

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  // Trường hợp thường dùng (đừng quên kiểm tra so sánh props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Nếu muốn gọi `setState` ở đây, phải đưa nó trong câu điều kiện, nếu không sẽ bị lặp vô tận

Nếu có implement phương thức `getSnapshotBeforeUpdate()`, giá trị return của `getSnapshotBeforeUpdate()` sẽ được đưa vào `snapshot`, nếu không thì là `undefined`

Hàm này cũng không được gọi nếu `shouldComponentUpdate()` return false


# componentWillUnmount

Có thể sử dụng để remove các listener, các hàm setInterval, cancel network request

```jsx
componentWillUnmount() {
  window.removeEventListener('resize', this.resizeEventHandler);
}
```

# shouldComponentUpdate(nextProps, nextState)

Có phương thức này để cải thiện performance của React, vì đôi lúc thay đổi `state` hoặc `props` ta không muốn cập nhập lại UI, chỉ cần cho hàm này return `false` (mặc định là return `true`), khi return `false` thì `render`, `componentDidUpdate` sẽ không được gọi.

```jsx
shouldComponentUpdate(nextProps, nextState) {
   return this.props.clicks !== nextProps.clicks;
}
```

# static getDerivedStateFromProps(props, state)

Được gọi trước khi xuống `render`, có thể return một object để update state, hoặc `null`

Rất hiếm khi sử dụng, chỉ khi giá trị của `state` phụ thuộc vào `prop`

Nên hạn chế sử dụng hàm này, vì làm logic hiển thị của component rất ư khó hiểu, hãy nghĩ đến những cách implement đơn giản hơn bằng những lifecycle khác.

# getSnapshotBeforeUpdate(prevProps, prevState)

Gọi ngay trước khi render xuống DOM, cho phép lấy một số thông tin của DOM (ví dụ vị trí thanh scroll), các giá trị return từ hàm này sẽ đưa cho `componentDidUpdate()`

# componentDidCatch(error, info)

Nếu một component nào đó bị lỗi nó sẽ không chết nguyên cái app nữa mà sẽ quăn lỗi ở đây, sử dụng để hiển thị lỗi lên UI

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


[Tài liệu đầy đủ chính thức của React Lifecycle](https://reactjs.org/docs/react-component.html)