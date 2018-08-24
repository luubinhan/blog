---
slug: "/2018-08-24-huong-dan-su-dung-refs-trong-react"
date: "2018-08-24"
title: "Cách sử dụng refs trong React"
desc: "Refs dùng để truy cập trực tiếp đến DOM trong React, nó sẽ rất hữu dụng ví dụ trong trường hợp chúng ta muốn thay đổi value của input mà ko muốn ử dụng props hoặc re-render lại toàn bộ component"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [Cách sử dụng Ref](#cách-sử-dụng-ref)
- [Lưu giá trị của ref](#lưu-giá-trị-của-ref)
- [Dùng string cho giá trị của ref](#dùng-string-cho-giá-trị-của-ref)
- [Đưa ref từ component này sang component khác](#đưa-ref-từ-component-này-sang-component-khác)

<!-- /TOC -->

# Cách sử dụng Ref

Trong bản React 16.3 chúng ta có thểm API là `createRef`

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.exampleRef = React.createRef()
  }
  render() {
    return (
      <div>
        <input type='text' ref={this.exampleRef} />
      </div>
    )
  }
}
```

Để truy cập đến `<input />` trong ví dụ trên

```jsx
console.log(this.exampleRef.current)
```

# Lưu giá trị của ref

Nếu không dùng `createRef` thì chúng ta cũng có thể lưu giá trị ref này bằng một hàm callback

```jsx
<input type='text' ref={element => this.input = element} />

console.log(this.input)
```

# Dùng string cho giá trị của ref

Cách sơ khai ban đầu, gán giá trị cho ref là một string

```jsx
<input type='text' ref='textInput' />

// đâu đó trong component
console.log(this.refs.textInput);
```

# Đưa ref từ component này sang component khác

Ref chỉ có thể access được trong chính component đang khai báo, nếu muốn truyền ref qua component khác, chúng ta dùng `React.forwardRef()`

```jsx
const Input = React.forwardRef((props, ref) => (
  <input type='text' ref={ref} />
));

// App component
constructor(props) {
  super(props)
  this.inputRef = React.createRef();
}
render() {
  return (
    <div>
      <Input ref={this.inputRef} />
    </div>
  )
}

// Trong App component

console.log(this.inputRef.current)
```