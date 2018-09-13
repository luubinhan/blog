---
slug: "/2018-09-12-huong-dan-build-notify-system-voi-react-redux"
date: "2018-09-12"
title: "Làm toast notification system trong React/Redux"
desc: "Có lẽ ko có ứng dụng web nào lại ko cần thông báo đến user kết quả của một thao tác nào đó, xây một notification system để sử dụng là hết sức cần thiết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

# Actions & Reducer

Bắt đầu với *reducer*, mặc định là một mảng rỗng, toàn bộ nội dung thông báo sẽ add vào mảng này

```js
// scr/reducers/toast.js

export default function toasts(state = [], action) {
  const {payload, type} = action;

  switch (type) {
    default:
      return state;
  }
}
```

Đừng quên thêm vào trong `combineReducers` nhé

```js
// src/reducers/index.js

import { combineReducers } from "redux";
import toasts from "./toasts";

export default combineReducers({
  toasts
});
```

Chúng ta sẽ cần 1 function `createToast` nhận vào options và trả về một object với id tự động tăng khi gọi, có sẵn một số default options sẽ merge với giá trị options truyền vào

```js
// src/factories/createToast.js
let id = 0;

const defaultOptions = {
  color: '#6796e6'
}

export default function createToast(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++
  }
}
```

Chúng ta sẽ cần thêm 1 action để tạo một toast notification trong store, 1 action để remove khỏi store

```js
// src/constants/index.js
export const ADD_TOAST = "ADD_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";
```

```js
// src/actions/index.js
import createToast from "../factories/createToast";
import { ADD_TOAST, REMOVE_TOAST } from "../constants";

export function addToast(options = {}) {
  return {
    payload: creatToast(options),
    type: ADD_TOAST
  };
}

export function removeToast(id) {
  return {
    payload: id,
    type: REMOVE_TOAST
  }
}
```

Giờ đến nhiệm vụ của reducer là phải xử lý khi 2 action trên

```js
// src/reducers/toasts.js

import { ADD_TOAST, REMOVE_TOAST } from "../constants";
export default function toasts(state = [], action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_TOAST:
      return [payload, ...state];

    case REMOVE_TOAST:
      return state.filter(toast => toast.id !== payload);

    default:
      return state;
  }
}
```

Xong việc xử lý trong Redux, giờ đến cái Component

# Components

```jsx
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Toast from "./Toast";
import { removeToast } from "../actions";

const Toast = ({ actions, toasts }) => {
  const {removeToast} = actions;
  return (
    <ul className='toasts'>
      {toasts.map(toast => {
        const {id} = toast;
        return (
          <Toast {...toast} key={id} onDismissClick={() => removeToast(id)} />
        )
      })
      }
    </ul>
  );
};

Toasts.propTypes = {
  actions: PropTypes.shape({
    removeToast: PropTypes.func.isRequired
  }).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeToast }, dispatch)
});

const mapStateToProps = state => ({
  toasts: state.toasts
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
```

Ở component `Toasts` này chúng ta render tất cả notification có trong **store**, đưa vào function xử lý nút close trêe mỗi component.

Đến Component `Toast`

```jsx
// src/components/Toast.jsx

import PropTypes from "prop-types";
import React, { Component } from "react";

class Toast extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <li style={{ backgroundColor: this.props.color }}>
        <p>
          {this.props.text}
        </p>
        <button onClick={this.props.onDismissClick}></button>
      </li>
    )
  }
}

Toast.propTypes = {
  color: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Toast;
```

Ở đây chúng ta không muốn component này update gì cả, nên ở `shouldComponentUpdate` chúng ta `return false`

[Link bài gốc](https://www.natterly.com/blog/toast-notification-system-in-a-react-redux-application);
