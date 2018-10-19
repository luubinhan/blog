---
slug: "/2018-03-16-huong-dan-react-authentication-phan-1"
date: "2018-03-16"
title: "React Authentication với Amazon Cognito - Phần 1"
desc: "Implement authentication 2 factor sử dụng React, React Router, Amazon Cognito"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Setup](#setup)
- [Màn hình đăng ký](#màn-hình-đăng-ký)
- [Sign In](#sign-in)

<!-- /TOC -->

Trong demo chúng ta sẽ sử dụng

- Create React App
- Glamor
- React Router
- Amazon Cognito để authentication
- AWS amplify để tương tác với AWS Services


# Setup

Khởi tạo project và các thư viện sẽ sử dụng

```shell
create-react-app react-auth
cd react-auth

npm i react-router-dom glamor --save
```

Cài AWSMobile CLI

```shell
npm i -g awsmobile-cli
```

Khởi tạo config AWS IAM

```shell
awsmobile configure
awsmobile init
```

Nó sẽ tạo project Mobile Hub và file aws-exports.js trong thư mục src. Tiếp theo, thêm user-signin và deploy các config mới

```shell
awsmobile user-signin enable
awsmobile push
```

`awsmobile user-signin enable` sẽ bật Amazon Congito trong project với các thiết đặt mặc định, bao gồm 2 factor authentication với SMS (sẽ thêm TOTP sau). Nếu muôn can thiệp các thiệt đặt, vào trực tiếp [Amazon Cognito](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fcognito%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fcognito&forceMobileApp=0) để chỉnh

# Màn hình đăng ký

![](https://cdn-images-1.medium.com/max/800/1*U_Oa4dWFeIqJ9TPJFx9lmQ.jpeg)

Để tương tác với Amazon Cognito, chúng ta sẽ sử các hàm trong class `Auth` từ thư viện `aws-amplify`:

`signUp` - tạo user mới

```typescript
signUp(username: string, password: string, attributes?: object)
```

`confirmSignUp` - để xác nhận đăng ký thành công

```typescript
confirmSignUp(username: string, authenticationCode: string)
```

`signIn` - đăng nhập

```typescript
signIn(username: string, password: string)
```

`confirmSignIn` - xác nhận đăng nhập

```typescript
confirmSignIn(user: object, authenticationCode: string)
```

Trong file root của project, thường là `index.js` 

```jsx
// một số import khác
// 
import config from './aws-exports'
import Amplify from 'aws-amplify'

Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();
```

Screen `SignUp.js`

```jsx
import React from 'react'
import { css } from 'glamor'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: ''
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <h2>SignUp</h2>
      </div>
    )
  }
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}
```

Flow sẽ như thế này, sau khi user cung cấp các thông tin trong form signup, chúng ta gọi đến phương thức `signUp`, user sẽ nhận được một mã code để verify quá SMS, user điền mã code này vào form verify, chúng ta verify cái mã code này bằng phương thức 'confirmSignUp'

![](https://cdn-images-1.medium.com/max/1000/1*Z1sFmf-KG7iiHG_-VMieQw.jpeg)

```jsx
import React from 'react'
import { css } from 'glamor'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: ''
  }
  onChange = (key, value) => {
    this.setState({ [key]: value })
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <h2>Sign Up</h2>
        <input
          {...css(styles.input)}
          placeholder='Username'
          onChange={evt => this.onChange('username', evt.target.value)}
        />
        <input
          {...css(styles.input)}
          placeholder='Password'
          type='password'
          onChange={evt => this.onChange('password', evt.target.value)}
        />
        <input
          {...css(styles.input)}
          placeholder='Email'
          onChange={evt => this.onChange('email', evt.target.value)}
        />
        <input
          {...css(styles.input)}
          placeholder='Phone Number'
          onChange={evt => this.onChange('phone_number', evt.target.value)}
        />
        <div {...css(styles.button)}>
          <span>Sign Up</span>
        </div>
        
        <input
          {...css(styles.input)}
          placeholder='Authentication Code'
          onChange={evt => this.onChange('authCode', evt.target.value)}
        />
        <div {...css(styles.button)}>
          <span>Confirm Sign Up</span>
        </div>
        
      </div>
    )
  }
}

let styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: '170px',
    padding: '10px 0px',
    backgroundColor: '#ddd',
    cursor: 'pointer',
    borderRadius: '3px',
    ':hover': {
      backgroundColor: '#ededed'
    }
  },
  input: {
    height: 40,
    marginBottom: '10px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid #4CAF50',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, .3)'
    }
  }
}

export default SignUp
```

Xong cái UI, giờ ta sử dụng 2 phương thức class `Auth`


```jsx
// previous imports omitted

  import { Auth } from 'aws-amplify'

  // previously shown code omitted
  signUp = () => {
    const { username, password, email, phone_number } = this.state
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number
      }
    })
    .then(() => console.log('successful sign up!'))
    .catch(err => console.log('error signing up: ', err))
  }
  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.username, this.state.authCode)
    .then(console.log('successful confirm sign up!'))
    .catch(err => console.log('error confirming signing up: ', err))
  }
  render() {
    // 
    // here we need to update the buttons to attach class methods to onClick event
    <div {...css(styles.button)} onClick={this.signUp}>
      <span>Sign Up</span>
    </div>

    <input
      {...css(styles.input)}
      placeholder='Authentication Code'
      onChange={evt => this.onChange('authCode', evt.target.value)}
    />
    <div {...css(styles.button)} onClick={this.confirmSignUp}>
      <span>Confirm Sign Up</span>
    </div>
  }
```

Cuối cùng import và sử dụng component trong `App.js`

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SignUp from './SignUp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SignUp />
      </div>
    );
  }
}

export default App;
```

Các thông tin của user sẽ được lại trong 'Manage your User Pools', vào Amazon Coginito dashboard, chọn ứng dụng đã setup, chọn mục 'Users and Settings'

![](https://cdn-images-1.medium.com/max/1000/1*XQfNfYhaGlkD0wxEPtr8bQ.jpeg)

# Sign In

Sign in thì cũng tương tự như signup, chúng ta sử dụng `Auth.signIn(username, password)`, trả về object nếu thành công, sau đó nó sẽ gửi SMS tới user với code xác nhận lần nữa, verify bằng `confirmSignIn`

```jsx
signIn() {
  Auth.signIn(this.state.username, this.state.password)
    .then(user => this.setState({ user }))
    .catch(err => console.log('error signing in! :', err))
}
confirmSignIn() {
  Auth.confirmSignIn(this.state.user, this.state.authCode)
    .then(userData => {
      console.log('userdata: ', userData)
    })
    .catch(err => console.log('error confirming sign in!: ', err))
}
```

User data nằm trong cục dữ liệu trả về sau khi gọi hàm `confirmSignIn`

![](https://cdn-images-1.medium.com/max/800/1*yBT-_MdRPCIj5KN3PnyFmw.png)

Có rất nhiều cách để lấy thông tin user đang đăng nhập, có thể dùng `Auth.currentAuthenticatedUser()` là dễ nhất, toàn bộ API có thể tham khảo [ở đây](https://aws.github.io/aws-amplify/api/classes/authclass.html)

Kết thúc phần 1 ở đây, phần 2 tiếp tục với Routing và TOTP để có thể làm Google Authenticator.

-----
Bài dịch từ tác giả Nader Dabit trên HackerNoon