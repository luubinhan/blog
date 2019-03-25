---
slug: "/2018-11-04-gioi-thieu-react-memo-moi-trong-react16"
date: "2018-11-04"
title: "Giới thiệu React.memo"
desc: "Api mới của React 16.6"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

Functional Component, hoặc Class Component return `false` trong `shouldComponentUpdate`, component đó sẽ không bị re-render khi **tree** thay đổi, nó chỉ thay đổi khi `prop` truyền vào thay đổi

`React.memo()` hoạt động y chang như `React.PureComponent()`, nhưng nó là function component thay vì class như `PureComponent`.

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* chỉ render khi prop thay đổi */
});

// khai báo bằng arrow function
const MyComponent = React.memo(props => {
  return <div>my memoized component</div>;
});

// ngắn hơn nữa
const MyComponent = React.memo(props => (
  <div>implicit memoized component</div>
));
```

Vì `React.memo()` là HOC, chúng ta cũng có thể dùng như sau

```js
const RocketComponent = props => <div>my rocket component. {props.fuel}!</div>;

// một version chỉ render khi prop thay đổi
const MemoizedRocketComponent = React.memo(RocketComponent);
```

Tại sao đặt tên là `memo` nghe có vẻ chướng tai? **Memoization** là một kỹ thuật lập trình để optimize tốc độ, thực hiện bằng việc lưu kết quả của một function vào cache để nếu có gọi và truyền vào cùng input thì return cache thay vì thực thi các câu lệnh trong function.
