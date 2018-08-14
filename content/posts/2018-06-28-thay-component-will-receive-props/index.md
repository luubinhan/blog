---
slug: "/2018-06-28-huong-dan-thay-component-will-receive-props"
date: "2018-06-28"
title: "Thay componentWillReceiveProps với getDerivedStateFromProps"
desc: "Từ bản release React 16.3, các phương thức lifecycle có thay chút ít, một số không còn được khuyến khích sử dụng và thay thế bằng một phương thức khác"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

Cụ thể `getDerivedStateFromProps` sẽ được dùng để thay cho `componentWillReceiveProps`, giờ nó cũng đã trở thành `UNSAFE_componentWillReceiveProps`

Hàm `getDerivedStateFromProps` là một phương thức `static` sẽ chạy khi component nhận được *props* và đã được khởi tạo. Bởi vì nó là một phương thức `static` nên không thể sử dụng `this` bên trong phương thức này hoặc truy cập tới các phương thức khác. Không giống với `componentWillReceiveProps` chúng ta không dùng được `this.setState`, nếu muốn cập nhập lại `state` nào đó ta trả về một object hoặc `null` nếu không muốn update state nào cả

Code sử dụng `componentWillReceiveProps` trước đây

```jsx
componentWillReceiveProps(nextProps){
  if(nextProps.someValue !== this.props.someValue){
    //Perform some operation
    this.setState({someState: someValue });
    this.classMethod();
  }
}
```

Giờ code lại bằng `getDerivedStateFromProps`

```jsx
// mục tiêu xử lý ở hàm này là những return giá trị state sẽ bị thay đổi khi prop thay đổi
static getDerivedStateFromProps(nextProps, prevState){
   if (nextProps.path !== prevState.path){
     return { path: nextProps.path };
  }
  else return null;
}

// ở đây chúng ta sẽ set state
componentDidUpdate(prevProps, prevState) {
  if (prevState.path !== this.state.path) {
    // Thục hiện update state
    this.setState({...})
    this.classMethod();
  }
}
```

Hàm `getDerivedStateFromProps` sẽ nhận vào 2 params `nextProps` và `prevState`. Chúng ta cần lưu giá trị của *props* `path` vào *state* là `path`, thực hiện kiểm tra ở đây nếu thấy khác nhau thì return lại object `{path: nextProps.path}`, khi đó ở `componentDidUpdate` giá trị của `prevState.path` sẽ khác với giá trị `this.state.path` ví `this.state.path` đã được set lại ở `getDerivedStateFromProps` trước đó

Cảm ơn bạn đã đọc hết bài viết

[Link bài viết của tác giả Amanshu Kataria](https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607)