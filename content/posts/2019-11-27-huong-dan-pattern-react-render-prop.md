---
slug: "/2019-11-27-huong-dan-pattern-react-render-prop"
date: "2019-11-27"
title: "Cách viết React render props"
desc: "Một trong những pattern để chúng ta có thể sử dụng lại logic"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "react"]
---

Có 2 điều quan trọng cần nói trước khi bắt đầu. Một là, chúng ta đang nói đến một **cách làm** (pattern) trong lập trình, ko phải đặc sản của React. Thứ 2, đây không phải là kiến thức bắt buộc để viết một ứng dụng React. Bạn có thể không cần đọc bài này, vẫn có thể vỗ ngực xưng tên là một React developer và viết React như thường. Còn nếu bạn tò mò muốn biết thêm món *đồ chơi* thì đọc tiếp.

Những lập trình viên mới vào nghề cũng biết đến câu thần chú "D.R.Y" (đừng tự lập lại chính mình). Câu thần chú rất đáng để trong tâm niệm. Cái cách làm Render Props này cũng là để đạt được cái gọi là DRY, giống như Higher-Order-Components.

Trước khi xem đến giải pháp, chúng ta cần biết vấn đề cần giải quyết là gì. Ví dụ chúng ta muốn làm lại cái dashboard như bên dưới

![](https://tylermcginnis.com/images/posts/react-fundamentals/tool-tips.gif)

Bạn sẽ cần hiển thị một đống cái kiểu tooltip khác nhau khi một element được hover lên

Có vài cách để tiếp cận vấn đề này, một là bạn kiểm tra một component cụ thể nào đó có đang hover không, rồi hiển thị hoặc ẩn tooltip. Có 3 component bạn cần kiểm tra, bạn đưa hàm kiểm tra vào cả 3 component `Info`, `TrendChart`, `DailyChart`

Component Info

```jsx
class Info extends React.Component {
  render() {
    return (
      <svg
        className="Icon-svg Icon--hoverable-svg"
        height={this.props.height}
        viewBox="0 0 16 16" width="16">
          <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    )
  }
}
```

Chúng ta sẽ sử dụng `onMouseOver` và `onMouseOut`, dùng thêm state `hovering` để chúng ta có thể kêu nó `re-render` khi cần thiết

```jsx
class Info extends React.Component {
  state = { hovering: false }
  mouseOver = () => this.setState({ hovering: true })
  mouseOut = () => this.setState({ hovering: false })
  render() {
    return (
      <>
        {this.state.hovering === true
          ? <Tooltip id={this.props.id} />
          : null}
        <svg
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          className="Icon-svg Icon--hoverable-svg"
          height={this.props.height}
          viewBox="0 0 16 16" width="16">
            <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      </>
    )
  }
}
```

Giờ chúng ta cần *copy* tính năng này cho 2 component còn lại. Việc *copy* này vi phạm nghiêm trọng câu thần chú DRY. Chúng ta phải làm sao để sử dụng lại những logic giống nhau mà ko phải copy-paste

Trong hầu hết các trường hợp khi chúng ta dựng một component trong React, kết quả output cuối cùng là một cái UI gì đó

```js
View = fn(state)
```

Tuy nhiên chỉ là hầu hết, chứ ko phải toàn bộ, có nhưng component như là *wrapper* của một component khác, nó chỉ mang nhiệm vụ quản lý logic.

```jsx
class Users extends React.Component {
  state = {
    users: null
  }
  componentDidMount() {
    getUsers()
      .then((users) => {
        this.setState({ users })
      })
  }
  render() {
    <Grid data={this.state.users} />
  }
}
```

Như component `Users` ở trên, không chịu trách nhiệm quản lý UI, chuyện đó là việc của `Grid`

Trong React, chúng ta có thể truyền function vào như prop cho component

```jsx
function User (props) {
  const id = props.id(true) // vuilaptrinh.com
}

<User id={(isAuthed) => isAuthed === true ? 'vuilaptrinh.com' : null} />
```

Với ý tưởng này, chúng ta giải quyết vấn đề trên như thế nào?

Trước tiên chúng ta tạo ra một component *wrapper* chịu trách nhiệm quản lý logic của hover

```jsx
class Hover extends React.Component {
  state = { hovering: false }
  mouseOver = () => this.setState({ hovering: true })
  mouseOut = () => this.setState({ hovering: false })
  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>

      </div>
    )
  }
}
```

Câu hỏi tiếp theo, component `Hover` thì render cái gì. Vận dụng ý tưởng truyền prop là một function, chúng ta cho `Hover` nhận vào một prop function có tên `render`, chúng ta sẽ nhét vào trong cái function `render` giá trị `hovering`

```jsx
<Hover render={(hovering) =>
  <div>
    Is hovering? {hovering === true ? 'Yes' : 'No'}
  <div>
} />
```

Việc còn lại là cập nhập lại component `Hover`

```jsx
class Hover extends React.Component {
  state = { hovering: false }
  mouseOver = () => this.setState({ hovering: true })
  mouseOut = () => this.setState({ hovering: false })
  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.render(this.state.hovering)}
      </div>
    )
  }
}
```

Vấn đề đã được giải quyết. Bất kể khi nào cần dùng logic `hover` chúng ta sẽ gọi lại component `Hover`. Cách làm này được gọi với cái tên đúng như những gì đã diễn ra (truyền prop render là một function) **Render Props**

Một cách viết khác không dùng prop tên `render`, xài luôn prop tên `children` có sẵn, chúng ta sẽ viết một cách gọn hơn

```jsx
function User (props) {
  return (
    <div>
      {props.children()}
    </div>
  )
}

<User>
  {() => This is props.children}
</User>
```

So với cách làm của Higher-Order-Component, Render Props sẽ không vướng phải vấn đề đụng tên props, không mất quyền kiểm soát vào *tay* component được wrap lại, và wrapper hell.

[https://tylermcginnis.com/react-render-props/](https://tylermcginnis.com/react-render-props/)

