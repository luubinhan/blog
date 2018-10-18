---
slug: "/2017-10-11-react-bind-pattern-5-cach-tham-chieu-this"
date: "2017-10-11"
title: "React Bind Pattern: 5 cách chỉ định tham chiếu this"
desc: "Để thay đổi ngữ cảnh của chữ this trong javascript, sử dụng ở đâu và như thế nào cho hợp lý nhất"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [Sử dụng `React.createClass`](#sử-dụng-reactcreateclass)
- [Bind trong lúc render](#bind-trong-lúc-render)
- [Sử dụng Arrow function](#sử-dụng-arrow-function)
- [Bind trong cunstructor](#bind-trong-cunstructor)
- [Sử  dụng `Arrow Function` trong thuộc tính của class](#sử--dụng-arrow-function-trong-thuộc-tính-của-class)

<!-- /TOC -->

# Sử dụng `React.createClass`

Nếu sử dụng `React.createClass` react tự động **bind toàn bộ** từ khóa `this`

```jsx
const Contacts = React.createClass({
  render() {
    return (
      <div onClick={this.handChange} />
    );
  }
});

```

Tuy nhiên từ khi ES6 có hỗ trợ `class`, React.createClass có thể bị tách ra các release trong tương lai.

# Bind trong lúc render

Nếu khai báo một component React bằng cách `extends React.Component`, `this` sẽ không được tự động bind như đã nói ở trên

```jsx
class Contacts extends React.Component{
  render() {
    return (
      <div onClick={this.handChange.bind(this)}/>
    );
  }
};
```

Cách này tuy là sạch sẽ gọn ràng dễ hiểu, tuy nhiên lại ảnh hưởng nhiều tới performance vì mỗi function sẽ *reallocated* lúc render. **Kinh nghiệm không bind bằng cách này**

# Sử dụng Arrow function

Tương tự như cách trên, sử dụng **arrow function** để không thay đổi giá trị của `this` lúc render

```jsx
class Contacts extends React.Component{
  render() {
    return (
      <div onClick={e => this.handChange} />
    );
  }
};
```

Cách này cũng không nên làm vì ảnh hương tới performance luôn

# Bind trong cunstructor

```jsx
constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
}
```

Đây là cách được khuyến cáo sử dụng, nếu thật sự quan tâm tới performance thì nên sử dụng cách này khi muốn bind từ khóa `this`.

# Sử  dụng `Arrow Function` trong thuộc tính của class

Muốn sử dụng cách này, phải bật tính năng *transform-class-properties* trong Babel, xem thêm package này tại http://babeljs.io/docs/plugins/transform-class-properties

```jsx
handleChange = () => {
  // call this function from render 
  // and this.whatever in here works fine.
};
```

Đây cũng là cách mà mình thường sử dụng nhất vì vừa sạch vừa tốt cho performance



