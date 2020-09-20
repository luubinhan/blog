---
slug: "/2018-03-02-huong-dan-gioi-thieu-higher-order-component-trong-react"
date: "2018-03-02"
title: "Giới thiệu Higher-Order Component trong React"
desc: "Higher-Order Component (HOC) là kỹ thuật mà các bạn lập trình viên Việt Nam rất thích khi nhắc đến React, riêng mình thì không"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [Tổng quan](#tổng-quan)
- [Higher-Order Function](#higher-order-function)
- [Higher-Order Component](#higher-order-component)

<!-- /TOC -->

HOC nghe khá trừu tượng và cao siêu, một cái tên sang chảnh cho một cách làm trong React, nó cũng có cái hạn chế và ưu điểm riêng, tuy nhiên thích thì học thôi.

## Ôn lại Currying function

Để đọc hiểu bài này dĩ nhiên cần nắm cơ bản ES6, hiểu cà-ri function là thế nào (Currying Functional Programming)

Cà-ri function là cách viết tách một function nhận một đốn...ggggg arguments, tách function đó ra thành nhiều function con, mỗi function nhận 1 argument. Ví dụ

```js
// một hàm sum thông thường
const sum = (a, b) => a + b;

// cà-ri function
const curriedSum = function(a) {
    return function(b) {
        return (a + b)
    }
}

// viết hàm cà-ri bằng arrow function
const curriedSum = a => b => a + b

//gọi hàm cà-ri
curriedSum(4)(5)
```

Một số cách viết khác của ES6 tìm lại mấy bài cũ của mình [đã chia sẻ](/2016-11-15-chuong-1-es6-can-ban).

## Higher-Order Function

Cái này không mới, trước đây trong javascript vẫn thường viết kiểu truyền một callback function (*vì trong javascript function được xem là object nên làm được chuyện này*), hay 1 function **trả về một kết quả trả về** của function khác.

```js
const calculator = (inputFunction) => (...args) => {
    const resultValue = inputFunction(...args);
    console.log(resultValue);
    return resultValue;
}

const add = (...all) => {
    return all.reduce((a, b) => a + b, 0);
}

const multiply = (...all) => {
    return all.reduce((a,b) => a*b, 1)
}
```

Ta có thể sử dụng hàm `calculator` như sau

```js
calculator(mutiply)(2,4);
// => 8

calculator(add)(3,6,9,12,15,18);
// => 63
```

Các hàm như `add`, `multiply` chấp nhận số lượng input không giới hạn, hàm `calculator` sử dụng như một container, làm cha thiên hạ, sai hết đứa này tới đưa khác làm việc, **extend** thêm một số xử lý trước khi gọi hàm `add`, `multiply`

# Higher-Order Component

Một higher-order component là một **một function** nhận vào một `component` như một argument và trả về "phiên bản mở rộng" của component đó.

```jsx
(InputComponent) => {
    return ExtendedComponent
}

// hoặc
InputComponent => ExtendedComponent
```

`ExtendedComponent` là một component container, nó trả về `InputComponent` với một số extend

![Giới thiệu Higher-Order Components trong React](https://cms-assets.tutsplus.com/uploads/users/1795/posts/30094/image/Introduction-To-Higher-Order-Components-in-React-Overview.jpg)

```jsx
const withGreyBg = WrappedComponent => class NewComponent extends Component {
    const bgStyle = {
        backgroundColor: 'grey',
    }

    render() {
        return (
            <div className='wrapper' style={bgStyle}>
                <WrappedComponent {...this.props} />
            </div>
        )
    }
}

const SmallCardWithGreyBg = withGreyBg(SmallCard);
const BigCardWithGreyBg = withGreyBg(BigCard);
const HugeCardWithGreyBg = withGreyBg(HugeCard);

class CardsDemo extends Component {
    render() {
        <SmallCardWithGreyBg {...this.props} />
        <BigCardWithGreyBg {...this.props} />
        <HugeCardWithGreyBg {...this.props />
    }
}
```

![Giới thiệu Higher-Order Components trong React](https://cms-assets.tutsplus.com/uploads/users/1795/posts/30094/image/Introduction-To-Higher-Order-Components-in-React-An-Example-HOC.jpg)

## Nhược điểm

- Trong một số [trường hợp](https://stackoverflow.com/questions/41084313/what-are-the-downsides-of-repeating-react-higher-order-components) sẽ làm ảnh hưởng đến hiệu năng, đến mức [Andrew Clark](https://www.youtube.com/watch?v=zD_judE-bXk) phải build hẳn một thư viện để giải quyết vấn đề này
- Rõ ràng sẽ thấy HOC ko **minh bạch** trong việc đã **extend** những phần nào cho thằng con
- Nếu một component được bọc trong nhiều HOC cùng lúc, có thể sẽ *vô tình dẫm đạp* qua lại
- Debug cũng không dễ gì vì đang sử dụng arrow function, phải tung thêm chiêu `displayName`
