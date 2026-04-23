---
slug: "/2018-10-03-huong-dan-reactjs-table-du-lieu-lon"
date: "2018-10-03"
title: "Xử lý tập dữ liệu lớn trong React"
desc: "Tình huống: bạn có một table với rất nhiều dữ liệu đổ vào, nếu bạn thấy component đó render chậm trên màn hình, đó là lúc cần tái cấu trúc"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "performance"]
---

Chúng ta có component như sau


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

Khi mà `ParentComponent` nhận được `props.items`, trước hết nó sẽ đổ tất cả dữ liệu vào trong virtual DOM, sau đó kiểm tra xem phần nào của real DOM cần cập nhập, rồi cập nhập toàn bộ trong **một lần**. Đó là lý do chúng ta bị **delay**, nó tốn thời gian cho việc tạo ra một số lượng virtual DOM rất lớn trước khi update real DOM, giả dụ có hơn 40.000 dòng dữ liệu, nó đợi tạo 40.000 cái virtual DOM trước khi đẩy hết xuống real DOM.

Chúng ta muốn render `ParentComponent` sớm nhất có thể, và sau đó thêm các item từ từ. Chúng ta muốn hiển thị các item vừa có trong virtual DOM, rồi lại render tiếp. 

```jsx
constructor(props) {
  super(props);
  this.state = {
    items: this.props.items.slice(0, 1)
  }
}
render() {
  return (
    //...
    {this.state.items.map( item => 
      <ChildComponent {...item} />
    )}
  )
}
```

Giải pháp ở đây là đưa toàn bộ `item` vào trong `state`, sau đó `render()` theo `state.items`. Việc cần làm là update lại `state.items` và chèn thêm item một cách từ từ. Với cách này, hàm `render` sẽ gọi khá thường xuyên, nhưng được cái nó hiển thị liền

```js
recursive = () => {
  setTimeout(() => {
    let hasMore = this.state.items.length + 1 < this.props.items.length;
    this.setState((prev, props) => ({
      items: props.items.slice(0, prev.items.length + 1)
    }));
    if (hasMore) this.recursive();
  }, 0)
}
```

Hàm đệ quy trên nó sẽ chạy đến khi **length** bằng nhau. Trên mỗi lần lặp lại nó thêm một element vào mảng `state.items`. Dùng `setTimeout` để đưa thứ tự ưu tiên của nó xuống thấp nhất.

Nếu thắc mắc tại sao lại gọi hàm `setState()` bên trong một hàm đệ quy

- Buộc phải dùng `setState` nếu muốn update real DOM, `setState` nó có cách xử lý riêng khi chúng ta gọi nhiều lần
- Ví dụ trên đang thêm 1 item một lần gọi, tùy theo nhu cầu, số lượng item có thế nhiều hơn.
- `setTimeout` có thứ tự ưu tiên chạy cuối cùng, nên, nếu user tương tác với component đã được render, tương tác này sẽ được ưu tiên cao hơn việc render các item còn lại. User có thể bắt đầu tương tác với các item đã render mà không đợi nó show hết
- Nếu đã có sẵn toàn bộ các item thì ok, nếu phải đi `fetch`, dùng cách khác
- Nếu dùng HOC sẽ không hề làm side effect với cách này
- Bạn cứ test performance để kiểm tra thử nó làm nhanh hay chậm app để xác nhận

Gọi hàm đệ quy trong `componentDidMount`

```js
componentDidMount() {
  this.recursive();
}
```

**Ghi chú**

Cách này đã kiểm tra khi render khoảng 10 đến 1500 element, thời gian tốn khoảng 2 đến 3ms.

Nếu muốn tìm một giải pháp của người ta build sẵn thì dùng [react-virtualized](https://github.com/bvaughn/react-virtualized)

[Link bài viết gốc](https://itnext.io/handling-large-lists-and-tables-in-react-238397854625)
