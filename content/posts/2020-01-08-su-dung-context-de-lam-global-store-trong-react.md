---
slug: "/2020-01-08-su-dung-context-de-lam-global-store-trong-react"
date: "2020-01-08"
title: "Sử dụng useReducer và useContext để làm global state"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "react"]
---


Thông thường chúng ta sẽ dùng một *nhà kho* để chứa dữ liệu `state` như *Redux*, một component container bọc ở nút đầu tiên trong app,  các component con bên trong có thể truy xuất và cập nhập các dữ liệu một cách dễ dàng

Với  các API mới được React bổ sung là `useState`, `createContext`, `useContext` chúng ta có *thêm một lựa chọn* để làm *nhà kho* mà ko cần dùng đến Redux

Ví dụ chúng ta có 3 dữ liệu như bên dưới

```jsx
const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

const [sharing, setSharing] = React.useState([])
const [help, setHelp] = React.useState([])
const [pairing, setPairing] = React.useState(teamMembersNames)
```

Câu hỏi là làm sao chúng ta đưa dữ liệu vào *nhà kho*. Chúng ta sẽ dùng API `createContext` (tạo em cái kho)

Khi sử dụng `React.createContext` chúng ta sẽ nhận về 2 component là `Provider` (anh tung) và `Consumer` (em hứng). 

```jsx
// ./src/utils/store.js
export const StoreContext = React.createContext(null);

export default ({ children }) => {
// các em đã vào nhà kho
  const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState(teamMembersNames)

  const store = {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing],
  }

  return (
      <StoreContext.Provider value={store}>
          {children}
      </StoreContext.Provider>
  )
}
```

Để các component bên trong `<App/>` đều dùng được `<Consumer />`

```jsx
// ./index.js
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import StoreProvider from './utils/store'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)
```

Với bất kỳ component nào muốn sử dụng, để lấy được dữ liệu trong store, chúng ta sử dụng `useContext`

```jsx
import React from 'react'
import { StoreContext } from '../utils/store'

const SomeComponent = () => {
  // dữ liệu dùng chung
  const { sharing } = React.useContext(StoreContext)
}
```

Hoặc nếu thích dùng cách viết render props, có thể dùng luôn component `<Consumer/>`

```jsx
<StoreContext.Consumer>
  {store => <InputComponent store={store} />}
</StoreContext.Consumer>
```

## Ứng dụng làm `useAuth`

Một trong những ví dụ dễ thấy, phần dữ liệu nên đưa vào *nhà kho chung* là phần thông tin user đang đăng nhập

Chúng ta sẽ cần 3 phần
1. Khai báo một nhà kho bằng `createContext`
2. Bộ `reducer` làm nhiệm vụ cập nhập xử lý `state`
3. Một hook tùy biến `useAuth` cung cấp các API cần thiết để tương tác với *nhà kho chung* đã khai báo


1. **AuthProvider.js** Khai báo nhà kho (bản rút gọn)

```jsx
// AuthProvider.js 
import authReducer from "authReducer";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    // khởi tạo
    const [state, dispatch] = useReducer(authReducer, {
    })
    return (
        <AuthContext.Provider value={[state, dispatch]}>
        {children}
        </AuthContext.Provider>
    )
}
```

2. **authReducer.js** (bản rút gọn)

```js
// authReducer.js
function authReducer(state, action) {
 switch (action.type) {
     case "login":
         const { authResult, user } = action;
         const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
         localStorage.setItem("expires_at", JSON.stringify(expiresAt));
         localStorage.setItem("user", JSON.stringify(user));
         return { user, expiresAt };
    case "logout":
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user");
        return { user: {}, expiresAt: null };
    default:
        return state;
 }
}
```

3.  Một hook tùy biến **`useAuth`**

```js
// useAuth.js
import { AuthProvider } from "AuthProvider";

export const useAuth = () => {
    const { state, dispatch } = userContext(AuthContext);
    const login = () => {
        // làm gì đó ở đây
    }
    const logout = () => {
        // làm gì đó ở đây
        dispatch({ type: "logout" })
    }
    // ...  còn một số thức khác
    const isAuthenticated = () => {
        return state.expiresAt && new Date().getTime() < state.expiresAt;
    };
    // ...  còn một số thức khác
    return {
        isAuthenticated,
        user: state.user,
        userId: state.user ? state.user : null;
        login,
        logout,
        handleAuthentication
    }
}
```

Với cách làm này, bất kỳ component nào sử dụng `useAuth` đều sẽ truy xuất đến một kho dữ liệu *chung*

```jsx
import useAuth from "useAuth"

const MyCom = () => {
    const {/* quá trời thứ linh tinh trả về */} = useAuth();
    //...
}
```

[useReducer + useContext for easy global state without libraries](https://swizec.com/blog/usereducer-usecontext-for-easy-global-state-without-libraries/swizec/9182)

[Using useContext and useState hooks as a store](https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm)

