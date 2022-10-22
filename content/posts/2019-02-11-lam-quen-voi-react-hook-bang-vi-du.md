---
slug: "/2019-02-11-lam-quen-voi-react-hook-bang-vi-du"
date: "2019-02-11"
title: "Làm quen với React Hook bằng ví dụ"
desc: "Chúng ta cùng bắt đầu học sử dụng React Hook, nó giải quyết vấn đề gì, sử dụng nó ra sao"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

<!-- TOC -->

- [State trong React](#state-trong-react)
- [Sử dụng React Hook](#sử-dụng-react-hook)

<!-- /TOC -->

Mấy tháng trước thiên hạ rần rần với React hook khi nó còn đang ở bản proposal (show hàng cho các anh lập trình viên, nếu thích thì họ phát triển tiếp), bây giờ khi [React chính thức công bố trên trang chủ](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) rồi, chúng ta cùng làm quen với React hook cũng ko có gì muộn.

## State trong React

Khi khai báo một component trong React bằng `class` (stateful component), không dùng function để khai báo (stateless component), thì trong component đó chúng ta có `state`


```jsx
class StatefulComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'An Luu'
        }
    }

    render() {
        return (
            <div>
                Hello {this.state.name}
            </div>
        )
    }
}

const StatelessComponent = ({ name }) => {
    return (
        <div>
            Hello {name}
        </div>
    )
}
```

Vấn đề của hàm `setState` là nó chỉ có khi chúng ta khai báo component bằng class, nó là hàm `async` - nghĩa là nếu chúng ta gọi `setState` nhiều lần, component được render lại với số lần gọi `setState`.

Nguyên nhân chính đẻ ra cái hook chính là việc ko thể `setState` trong function component (ủa vậy tại sao đẻ ra khái niệm function component chi, stateless component chi?)

## Sử dụng React Hook

Trước tiên muốn dùng React Hook, phải đảm bảo version React đang dùng thấp nhất là 16.8.0

Hàm quan trọng cần nhớ là `useState`

```jsx
import React, {useState} from 'react';
```

Hàm `useState` nhận tham số initial state, sau đó sẽ **trả về một mảng** 2 phần tử, phần tử đầu tiên là state hiện tại, thứ 2 là hàm để update state (`setState` đó mà)


```jsx
const [state, setState] = useState(false);
```

Sử dụng trên component thực tế đi nhỉ


```jsx
import React, { useState } from 'react';

const Form = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        type="text"
        onChange={e => setValue(e.target.value)}
        placeholder="Add a todo"
      />
    </form>
  );
};

const StatelessComponent = () => {
    const [todos, setTodos] = useState([]);
    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    }
    const deleteTodo = index => {
        const newTodos = [..todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }
    return (
        <div>
            <Form addTodo={addTodo} />
            <div>
                {todos.map((todo, index) => (
                        <div key={index} onClick={() => deleteTodo(index)}>
                            <span>{text}</span>
                        </div>
                ))}
            </div>
        </div>
    )
}
```

![Làm quen với React Hook bằng ví dụ thực tế](https://cdn.hashnode.com/res/hashnode/image/upload/v1549453648271/wSbUZbet_.gif)


<a target="_blank" rel="noopener noreferrer" href="https://hashnode.com/post/write-your-first-react-hook-cjrt8lfci00aw18s1z8v9s06n
">Write your first React Hook!</a>