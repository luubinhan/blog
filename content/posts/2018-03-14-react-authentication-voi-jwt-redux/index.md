---
slug: "/2018-03-14-huong-dan-react-authentication-voi-jwt-redux"
date: "2018-03-14"
title: "Authentication với JWT"
desc: "Giới thiệu JSON Web Tokens (JWT) và cách hiện thực"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "security"]
---

<!-- TOC -->

- [JWT là gì](#jwt-là-gì)
- [JWT vận hành thế nào](#jwt-vận-hành-thế-nào)
- [Authentication sử dụng kết hợp với Redux](#authentication-sử-dụng-kết-hợp-với-redux)

<!-- /TOC -->

# JWT là gì

JWT là một đoạn string dạng JSON đã được mã hóa và truyền qua header để làm nhiệm vụ authenticate. Bên cạnh secret key, cục JWT còn chứa một số thông tin khác được hash kèm trong JSON.

# JWT vận hành thế nào

Khi user đăng nhập thành công, server sẽ trả về một cục JWT, chúng ta lưu cục này lại trong `localStorage` để sử dụng về sau. Khi muốn thực hiện một request nào đó, chẳng hạn gọi đến API để lấy dữ liệu, mà cần xác thực đã đăng nhập, ta gởi cái token này kèm trong header của request. Server kiểm tra token này và thực thi yêu cầu nếu kiểm tra thấy hợp lệ.

Nội dung của header thường sẽ là

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsI 
```

Hình minh họa sau mô tả cách chạy của quá trình này

![](https://cms-assets.tutsplus.com/uploads/users/1885/posts/30460/image/jwt-diagram.png)

# Authentication sử dụng kết hợp với Redux

Tạo Redux Store, ở đây chúng ta sẽ cần sử dụng tới middleware, để mỗi khi có một request đến API, thằng middleware này sẽ chèn thêm vào header đoạn authentication. Setup redux store với middleware

```js
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import quotesApp from './reducers'
import api from './middleware/api'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(quotesApp)

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

Component App chúng ta sẽ hiện thực nó như sau

```jsx
// containers/App.js

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Quotes from '../components/Quotes'

class App extends Component {
  render() {
    const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <div className='container'>
          <Quotes
            onQuoteClick={() => dispatch(fetchQuote())}
            onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
            isAuthenticated={isAuthenticated}
            quote={quote}
            isSecretQuote={isSecretQuote}
          />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  quote: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isSecretQuote: PropTypes.bool.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { quotes, auth } = state
  const { quote, authenticated } = quotes
  const { isAuthenticated, errorMessage } = auth

  return {
    quote,
    isSecretQuote: authenticated,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
```

Action để gọi login

```js
// actions.js

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3001/sessions/create', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          localStorage.setItem('id_token', user.access_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

```

Ở đây chúng ta cũng đã lưu token này lại nếu user đăng nhập thành công xuống `localStorage`, đồng thời chúng ta cũng dispatch cái action `receivedLogin`, việc lưu token này có thể lưu nó ở chỗ nào đó khác, tuy nhiên không được lưu nó trong `reducer`, vì nó có thể gây ra side effect.

Còn việc logout user cũng tương tự, ta chỉ việc set `isAuthenticated = false` và xóa token này đi

```js
// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}
```

reducer sẽ như sau

```js
import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

// The quotes reducer
function quotes(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

// We combine the reducers here so that they
// can be left split apart above
const quotesApp = combineReducers({
  auth,
  quotes
})

export default quotesApp
```

Quay lại với API middleware, như đã nói trên, giờ mỗi khi send đi một request, trong middleware chúng ta sẽ chèn thêm giá trị JWT này vào header

```js
// middleware/api.js

const BASE_URL = 'http://localhost:3001/api/'

function callApi(endpoint, authenticated) {

  let token = localStorage.getItem('access_token') || null
  let config = {}

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    }
    else {
      throw "No token saved!"
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }

      return text
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated } = callAPI

  const [ requestType, successType, errorType ] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}
```


```js

// actions.js

// The middleware to call the API for quotes
import { CALL_API } from './middleware/api'

...

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

// Uses the API middlware to get a quote
export function fetchQuote() {
  return {
    [CALL_API]: {
      endpoint: 'random-quote',
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}

// Same API middlware is used to get a
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchSecretQuote() {
  return {
    [CALL_API]: {
      endpoint: 'protected/random-quote',
      authenticated: true,
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}

...

Đoạn code trên có sử dụng cú pháp [computed property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)

`quotes` reducer sẽ handle cái action trên

```jsx
// reducers.js

...

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from './actions'

...

// The quotes reducer
function quotes(state = {
    isFetching: false,
    quote: '',
    authenticated: false
  }, action) {
  switch (action.type) {
    case QUOTE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case QUOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        quote: action.response,
        authenticated: action.authenticated || false
      })
    case QUOTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

...
```