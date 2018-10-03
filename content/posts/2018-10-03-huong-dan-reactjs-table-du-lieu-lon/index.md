---
slug: "/2018-10-03-huong-dan-reactjs-table-du-lieu-lon"
date: "2018-10-03"
title: "Xử lý tập dữ liệu lớn trong React"
desc: "Tình huống: bạn có một table với rất nhiều dữ liệu đổ vào, nếu bạn thấy component đó render chậm trên màn hình, đó là lúc cần tái cấu trúc"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

```jsx
class ParentComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item =>
          <ChildComponent {...item} />
        )}
      </div>
    )
  }
}
```

Khi mà `ParentComponent` nhận được `props.items`, trước hết nó sẽ thêm tất  vào trong virtual DOM, sau đó kiểm tra xem phần nào của real DOM cần tái cấu trúc, rồi update toàn bộ trong một lần. Đó là lý do chúng ta bị **delay**, nó tốn thời gian cho việc kiểm tra phần nào cần tái cấu trúc khi dữ liệu lớn trước khi thức hiện update một phát tất cả luôn.

Chúng ta muốn là hiển thị các item đã được load trong virtual DOM, trong khi đang đợi load những thằng khác. Như vậy chúng ta phải render `ParentComponent` sớm nhất có thể, và sau đó thêm các item theo từng bước một.

```jsx
constructor(props) {
  super(props);
  this.state = {
    items: this.props.items.slice(0, 1)
  }
}
```


