---
path: "/2018-02-27-dung-ui-voi-pure-function-va-ket-hop-nhieu-function-trong-react"
date: "2018-02-27T13:35:13.234Z"
title: "Dựng UI với pure function và kết hợp nhiều function trong React"
desc: "Khi tạo một React Component, nó có thể là một function, nhận vào tham số, thay vì trả về giá trị, function này trả về UI"
tags: ["react", "javascript"]
---

Khai báo component `ProfilePic`, `ProfileLink`, `Avatar` bằng cách bình thường

```js
const ProfilePic = React.createClass({
  render: function() {
    return (
      <img src={'https://photo.fb.com/' + this.props.username'} />
    )
  }
})
```

```js
const ProfileLink = React.createClass({
  render: function() {
   return (
      <a href={'https://www.fb.com/' + this.props.username}>
        {this.props.username}
      </a>
    )
  }
})
```

```js
const Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <ProfilePic username={this.props.username} />
        <ProfileLink username={this.props.username} />
      </div>
   )
  }
})
```

```html
<Avatar username="tylermcginnis" />
```

Từ React 0.14, trong trường hợp một compoment không có state, có thể viết lại bằng Stateless Function Component, cách gọi cho sang thôi, bản chất là một function nhận vào data và trả về một View

ProfilePic

```js
const ProfilePic = (props) => {
    return <img src={'https://photo.fb.com/' + props.username'} />
}
```

ProfileLink

```js
var ProfileLink = (props) => (
    <a href={'https://www.fb.com/' + props.username}>
      {props.username}
    </a>
)
```

Avatar

```js
const Avatar = (props) => {
  return (
    <div>
      <ProfilePic username={props.username} />
      <ProfileLink username={props.username} />
    </div>
  )
}
```

```html
<Avatar username="tylermcginnis" />
```


Khai khai báo component bằng function như vậy, phải đảm bảo nó là một pure function (same input = same return)