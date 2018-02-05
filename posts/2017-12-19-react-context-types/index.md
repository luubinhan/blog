---
path: "/2017-12-19-react-context-types"
date: "2017-12-19T13:35:13.234Z"
title: "React Context Types"
desc: "Khi bắt đầu học React, thường chúng ta chỉ quan tâm tới prop và state, nhưng lại không để ý đến context"
tags: ["react", "javascript"]
---

Khi build một component chúng ta thường khai báo `props` và `state` cho nó, nó trực quan dễ kiểm soát. Trong một số trường hợp đặc biệt, nếu muốn truyền dữ liệu từ trên xuống dưới mà không cần phải đi truyền tuần tự từng component một, có thể sử dụng `context`

## Tại sao không nên sử dụng `context`

Trong tương lai không xa `context` sẽ được gỡ bỏ khỏi React, trên thực tế cho thấy việc sử dụng `context` khiến việc maintain ứng dụng rất vất vả vì không biết được giá trị context từ đâu mà có. Khuyến cáo sử dụng Redux hoặc Mobx để quản lý state cho các component

## Sử dụng sao

Ví dụ có 3 component: OngNoi, Cha, Con

```js
class Con extends React.Component {
  render() {
    return (
      <div style={{background: this.props.color}}>
        {this.props.children}
      </div>
    );
  }
}

class Cha extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Con color={this.props.color}>Delete</Con>
      </div>
    );
  }
}

class OngNoi extends React.Component {
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) =>
      <Cha text={message.text} color={color} />
    );
    return <div>{children}</div>;
  }
}
```

Props *color* được truyền từ OngNoi > Cha > Con, nếu sử dụng context có thể truyền thẳng từ OngNoi > Con

```js

class Con extends React.Component {
  render() {
    return (
      <div style={{background: this.context.color}}>
        {this.props.children}
      </div>
    );
  }
}

Con.contextTypes = {
  color: PropTypes.string
};

class Cha extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Con>Delete</Con>
      </div>
    );
  }
}

class OngNoi extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Cha text={message.text} />
    );
    return <div>{children}</div>;
  }
}

OngNoi.childContextTypes = {
  color: PropTypes.string
};
```

Bằng cách thêm kai báo cho component OngNoi `childContextTypes` và hàm `getChildContext`, thằng *Con* sẽ có thể truy cập đến *color* bằng `contextTypes`

## Ứng dụng

Trong React Router 4, component *Router* có khai báo context này, nến khi truyền các prop cho component *Router*, các component Route và Link bên trong có thể truy cập đến prop của Router

## Lifecycle Methods

Khi có xuất hiện khai báo `contextTypes` trong component, các phương thức sau sẽ tiếp nhận thêm tham số `context`

- constructor(props, context)
- componentWillReceiveProps(nextProps, nextContext)
- shouldComponentUpdate(nextProps, nextState, nextContext)
- componentWillUpdate(nextProps, nextState, nextContext)