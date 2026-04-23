---
slug: "/2019-03-12-su-khac-nhau-giua-function-component-va-class-component-trong-react"
date: "2019-03-12"
title: "Function Component khác Class component như thế nào trong React"
desc: "Ngày xưa khi chưa có hook, thì rất dễ để trả lời câu này, nhưng từ ngày hook được sử dụng, câu hỏi lại này lại được đặt ra, ủa vậy 2 thằng nó khác nhau ở điểm nào."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---



Có thể bạn cũng từng nghe nói, một trong 2 thằng đó performance tốt hơn. Xem thêm đánh giá từ [This benchmark is indeed flawed.](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f). Nói về performance thì phải xem cái code bên trong nó làm cái gì, chứ ko còn đơn thuần là function hay class nó sẽ performance cao hơn.

Như vậy, việc bạn chuyển hết các component đang viết sang function component, rồi kết hợp với hook để thay cho class component thực sự phải cân nhắc, vì nhiều khi tốn thời gian mà ko mang nhiều lợi ích lắm.

Xem xét một function component như thế này

```jsx
function ProfilePage({ user }) {
  const showMessage = () => {
    alert('Followed ' + user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

Ta có thể viết lại thành class component

```jsx
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

Để thấy sự khác nhau, chúng ta cũng xem một con bug rất hay xảy ra trong React.

Chạy thử [demo](https://codesandbox.io/s/pjqnl16lm7),  rồi làm theo các bước sau
1. Click vào một trong 2 nút follow
2. Chọn profile name khác với ban đầu, từ cái dropdown, đợi 3 giây để nó chạy
3. Đọc kết quả của alert

Nếu dùng `ProfilePage` function, nếu chọn Dan sau đó chuyển sang Sophie, nó sẽ hiện câu alert là `Followed Dan`
Nếu dùng `ProfilePage` class, ta sẽ được alert câu `Followed Sophie`

![Để thấy sự khác nhau, chúng ta cũng xem một con bug rất hay xảy ra trong React.](https://overreacted.io/bug-386a449110202d5140d67336a0ade5a0.gif)

Kết quả chạy của function component là đúng, sau khi chuyển sang người khác chúng ta đâu có gọi lại follow? Rõ ràng class component bị *bug*.

Xem xét hàm `showMessage` bên trong class component

```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };
```

Nó đọc giá trị từ `this.props.user`, tuy nhiên, thằng **this** là một một giá trị luôn luôn **mutable**, tức có thể thay đổi, không phải bất biến.

Nó là mục đích của sử dụng từ khóa `this` bên trong class chứ cũng ko hẳn là bug. React muốn lấy được giá trị mới nhất trong lúc render và trong các phương thức lifecycle

> Cho dễ nhớ, `this.props` luôn là giá trị mới nhất khi nó cần render 

Giờ nếu mà ko có sự tồn tại của function component, thì chúng ta giải quyết vấn đề này như thế nào ? Chúng ta sẽ lấy giá trị của `this.props` trước khi `setTimeout`

```jsx
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

Tuy nhiên đây cũng chưa phải là cách hoàn hảo để giải quyết triệt để con bug trên. Có thể sử dụng javascript closure để hoàn toàn xử trí vụ này, nhưng thật lòng mà nói, xài closure vô rất rối, khó lòng nhẩm được giá trị hiện tại.

Một cách khác được nhiều người sử dụng hơn là truy xuất trong hàm render, chúng ta đặt hết niềm tin vào giá trị của `prop` và `state` trong lúc render 

```jsx
class ProfilePage extends React.Component {
  render() {
    // lấy giá trị props
    const props = this.props;

    // lưu ý chúng ta đang trong hàm render
    // đây ko phải là một phương thức của class
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

Như vậy giá trị của `user` bên trong hàm `showMessage` nó sẽ luôn đồng nhất với lúc render.




<a target="_blank" rel="noopener noreferrer" href="https://overreacted.io/how-are-function-components-different-from-classes/">How Are Function Components Different from Classes?</a>