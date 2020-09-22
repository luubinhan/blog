---
slug: "/2018-03-06-huong-dan-redux-van-hanh-nhu-the-nao-kem-vi-du"
date: "2018-03-06"
title: "Redux vận hành như thế nào"
desc: "Actions, reducers, action creators, middleware, pure functions, immutability,... những ngoại ngữ làm rối bất kỳ ai nếu chưa biết redux"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript", "redux"]
---

<!-- TOC -->

- [Chỉ sử dụng State của React](#Ch%E1%BB%89-s%E1%BB%AD-d%E1%BB%A5ng-State-c%E1%BB%A7a-React)
- [Thêm Redux](#Th%C3%AAm-Redux)
- [Action](#Action)
- [Không bao giờ được phép thay đổi State trực tiếp](#Kh%C3%B4ng-bao-gi%E1%BB%9D-%C4%91%C6%B0%E1%BB%A3c-ph%C3%A9p-thay-%C4%91%E1%BB%95i-State-tr%E1%BB%B1c-ti%E1%BA%BFp)
- [Action từ đâu mà có](#Action-t%E1%BB%AB-%C4%91%C3%A2u-m%C3%A0-c%C3%B3)

<!-- /TOC -->

Nếu chưa biết tại sao lại sinh ra thằng Redux này, có thể xem ở tuts trước của mình.

## Chỉ sử dụng State của React

Component sẽ build

![Redux vận hành như thế nào](https://daveceddia.com/images/counter-plain.png)

```jsx
import React from 'react';

class Counter extends React.Component {
  state = { count: 0 }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.state.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default Counter;
```

Giải thích ngắn gọn cho dễ theo dõi

- Giá trị `count` được lưu trong *state* của component `Counter`
- Khi user click '+', hàm `increment` sẽ tăng giá trị `count` lên
- Khi state bị thay đổi, React sẽ render lại `Counter` và những component bên trong của nó, giá trị mới sẽ hiển thị

## Thêm Redux


Như đã đề cập trong tuts trước, Redux lưu *state* lại trong 1 cái **store**, tranh lẫn lộn, **store** là nơi lưu **state**, và **state** dữ liệu.

Cài redux và react-redux package

```
npm install redux react-redux --save
```

Tại sao phải 2 cái package?, cái redux chỉ cho ta cái **store**, để lấy được cái *state* ra, sử dụng hàm `connect` trong `react-redux`, vì redux không phải chỉ làm việc chung được với React thôi không, nó có thể chơi với Vue, Angular không chừng.

Bỏ state đi

```jsx
import React from 'react';

class Counter extends React.Component {
  increment = () => {
  }

  decrement = () => {
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default Counter;
```

`connect` nó với store thôi

```jsx
import { connect } from 'react-redux';
// ...
// Viết thêm hàm này
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// Thay cái
// export default Counter;

// bằng
export default connect(mapStateToProps)(Counter);
```

Ok vậy là xong phần connect component với các state ở trong *store*, chúng ta cần khai báo Store!

Bọc toàn bộ cái `App` bên trong component `Provider` của *react-redux* để tất cả component bên trong `App` có thể sử dụng hàm `connect` để gọi đến *store*

```jsx
import { Provider } from 'react-redux';

...

const App = () => (
  <Provider>
    <Counter/>
  </Provider>
);
```

Chưa xong, chúng ta phải setup cái store để đưa vào cho Provider

```jsx
import { createStore } from 'redux';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);
```

Vẫn chưa đủ, thật sự Redux không được thông minh như chúng ta tưởng tượng, lúc đầu mình đã nghĩ rằng khi create store như vậy nó sẽ cho mình những giá trị default bên trong store. Nhưng không chúng ta phải làm tay tất cả. Chúng ta phải cung cấp cho nó 1 hàm gọi là `reducer`, cái hàm `reducer` này phải *return* về một giá trị cho state, luôn phải return state nhé. Bên trong `reducer` ta sẽ xào nấu state theo yêu cầu, nó sẽ nhận state hiện tại và trả về state mới.

```jsx
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  return state;
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);
```

## Action

Action là gì, nó đóng vai trò như thế nào và nó đến từ đâu? Làm thế nào mà ta đổi giá trị `counter`?

`action` là 1 JS object nó sẽ cho biết bạn đang muốn `order` món nào, như tờ giấy ghi `order` trong nhà hàng ấy mà, nó sẽ chưa thông tin 'món' bạn order, đầu bếp `reducer` sẽ dựa vào đó mà xào nấu ra 'món' bạn order


```js
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}
```

Reducer sẽ căn cứ vào `action.type` để thực hiện thay đổi và trả về state mới, nên nhớ chúng ta phải LUÔN LUÔN trả về state trong `reducer`, nếu có hay không có thay đổi cũng phải trả về *state*

## Không bao giờ được phép thay đổi State trực tiếp

State là một immutable object, tuyệt đối **KHÔNG** thay đổi state như sau

```js
function brokenReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      // BẬY: đừng thay giá trị bằng kiểu này
      state.count++;
      return state;

    case 'DECREMENT':
      // BẬY: đừng thay giá trị bằng kiểu này
      state.count--;
      return state;

    default:
      return state;
  }
}
```

Làm như vậy cũng cấm tuyệt đối nhé: 

- `state.foo = 7`
- `state.items.push(newItem)`
- `delete state.something`

## Action từ đâu mà có

Action không tự sinh ra, nó được `dispatch` ra từ hàm `dispatch`. Hàm `dispatch` thì đặc biệt là nó không được import, mình có thể gọi `store.dispatch(someAction)`, nhưng cái store này thì nó năm ở trong 1 file thôi, Vậy hàm `dispatch` này làm sao có đây?

Thật ra lúc chúng ta gọi `connect` thì hàm `connect` cũng đã *map* cái hàm `dispatch` vào trong props của component luôn.

```jsx
import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);
```