---
slug: "/2019-06-22-su-dung-refs-trong-react"
date: "2019-06-22"
title: "Cách sử dụng ref trong React"
desc: "Công dụng của ref là để truy cập đến DOM thật trong React, một vài tính huống sử dụng và dùng ref"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "hoc-thuat"]
---

<!-- TOC -->

- [Vấn đề của Refs](#V%E1%BA%A5n-%C4%91%E1%BB%81-c%E1%BB%A7a-Refs)
- [Lựa chọn giữa callback refs và `createRef`](#L%E1%BB%B1a-ch%E1%BB%8Dn-gi%E1%BB%AFa-callback-refs-v%C3%A0-createRef)
- [Truyền Ref từ cha xuống con](#Truy%E1%BB%81n-Ref-t%E1%BB%AB-cha-xu%E1%BB%91ng-con)
- [useRef hook](#useRef-hook)
- [Tổng kết lại](#T%E1%BB%95ng-k%E1%BA%BFt-l%E1%BA%A1i)

<!-- /TOC -->

Là viết tắt cho `reference` nếu bạn có thắc mắc, nó là cách mà React sẽ truy cập tới DOM (DOM thực, không phải DOM ảo). Có nhiều lý do mà chúng ta muốn truy cập tới DOM, thí dụ như set focus vào input, hay tính toán kích thước của một element khi render.

## Vấn đề của `ref`

Xử lý DOM là kỹ thuật căn bản mà mọi lập trình viên frontend điều biết, tuy nhiên khi làm theo hướng React, chúng ta sẽ ít gặp tình huống đụng đến DOM thật hơn.

Thời điểm hiện tại, chúng ta có đến tận 4 cách để dùng ref !!!!

![Thời điểm hiện tại, chúng ta có đến tận 4 cách để dùng refs ](https://www.rd.com/wp-content/uploads/2012/05/sourbaby-760x506.jpg)

- Dùng string (không được khuyến khích) (`<div ref="stringGiday" />`)
- Dùng callback ref (`<div ref={ref => {this.inputRef = ref }} />`)
- Dùng API `createRef`
- Dùng hook `useRef`

## Lựa chọn giữa callback ref và `createRef`

Sử dụng string cho ref đã được team React cho vào bảo tàng, câu hỏi còn lại là dùng callback ref hay `createRef` đây

> Câu trả lời ngắn gọn: dùng `createRef` là an toàn cho mọi trường hợp.

Lấy ví dụ cho tình huống phổ biến: tự động đặt set focus cho input

```js
class SimpleRef extends Component {
  constructor() {
    super();
    // 1 - Định nghĩa ref
    this.inputRef = React.createRef();
  }

  // 3 - gọi hàm focus trên ref
  onClick = () => this.inputRef.current.focus();

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <!-- 2 - gắn cái ref mới định nghĩa cho element -->
        <button onClick={this.onClick}>Click để focus</button>
      </>
    )
  }
}
```

Nếu sử dụng callback ref thì đây là cách làm

```js
class SimpleCallbackRef extends Component {
  onClick = () => this.inputRef.focus();

  render() {
    return (
      <>
        <input ref={ref => { this.inputRef = ref; }} />
        <button onClick={this.onClick}>Click để focus</button>
      </>
    )
  }
}
```

Có ý kiến thấy viết `ref => ` *nó hơi kỳ*, không minh bạch, cái ref này ở quỷ quái nào sinh ra?

Khai báo ref bằng inline function như ở trên, nó sẽ gọi 2 lần trong quá trình update: lần đầu tiên với giá trị `null`, lần thứ hai là khi có DOM element.

Bởi vì mỗi lần render là một inline function khác nhau, React sẽ phải xóa giá trị ref cũ rồi setup ref mới

Nghĩa là viết như sau sẽ bị bug, ref lúc đầu đang null nên không có gọi focus được

```js
<input ref={ref => ref.focus()} />
```

Chắc tới đây anh em đã thấy không còn muốn dùng callback ref.

Tuy nhiên không có nghĩa là callback ref không còn đất dụng võ, với `createRef` anh em luôn phải tạo-rồi-gán. Nếu tình huống chúng ta phải tạo một danh sách element động

Như ví dụ này, sẽ làm như thế này phải không

```js
class DynamicRefs extends Component {
    constructor() {
        super();
        this.state = {
          tasks: [
            { name: "Task 1", color: "red" },
            { name: "Task 2", color: "green" },
            { name: "Task 3", color: "yellow" },
            { name: "Task 4", color: "gray" }
          ]
        }
        this.refsArray = [];
    }

    render() {
        return (
            <>
                {this.state.tasks.map((task, i) => (
                    <div
                        key={i}
                        ref={ref => {
                            this.refArray[i] = ref;
                        }}
                    >
                        {task.name}
                    </div>
                ))}
            </>
        )
    }
}
```

## Truyền Ref từ cha xuống con

Với function component, xét đoạn code sau

```js
function CustomInput() {
    return <input />
}
```

Rồi chúng ta có 1 component khác, dùng ref cho cái `CustomInput`

```js
class SimpleRef extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    return (
      <CustomInput ref={this.textInput} />
    );
  }
}
```

Đoạn code trên hổng chạy được. Chúng ta cần dùng đến `forwardRef`

```js
// BẮT BUỘC phải là function component
const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} />
));


class SimpleRefForwarding extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  onClick = () => {
    this.inputRef.current.focus();
  }

  // lưu ý cách chúng ta gàn một ref vào custom component
  render() {
    return (
      <div>
        <CustomInput ref={this.inputRef} />
        <button onClick={this.onClick}>
          Click to Focus
        </button>
      </div>
    );
  }
}
```

## useRef hook

Nếu là function component, như đã biết, nếu chúng ta dùng `createRef`

```jsx
const FunctionComponentWithRef  = () => {
    const textInput = React.createRef();

    return (
        <>
            <input ref={textInput} />
            <button onClick={() => textInput.current.focus()}>
            Click to Focus
            </button>
        </>
    )
}
```

MỖi lần return là mỗi lần tạo ref mới, như vậy *không cool*, sử dụng hook `useRef` chúng ta sẽ có một cái ref xài đời này qua đời kia dù bao nhiều lần update, cho đến khi nó ra đi (Unmount)

```jsx
const FunctionComponentWithRef  = () => {
    const textInput = React.useRef(null);

    return (
        <>
            <input ref={textInput} />
            <button onClick={() => textInput.current.focus()}>
            Click to Focus
            </button>
        </>
    )
}
```

## Tổng kết lại

- Đừng xài ref nhiều quá
- Đừng bao giờ đụng vô string ref
- Dùng callback ref khi anh em đụng đến vấn đề tạo element động
- Nếu là class component, dùng `createRef` an toàn nhất
- Là function component, dùng `useRef` cho hợp xu thế
- Dùng `forwardRef` khi component cha cần truy cập đến component con

<a target="_blank" rel="noopener noreferrer" href="https://rafaelquintanilha.com/the-complete-guide-to-react-refs">The Complete Guide to React Refs</a>
