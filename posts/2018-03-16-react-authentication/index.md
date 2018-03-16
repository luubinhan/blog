---
path: "/2018-03-16-react-authentication"
date: "2018-03-16T13:35:13.234Z"
title: "Sync extensions của VSCode"
desc: "Implement authentication 2 factor sử dụng React, React Router, Amazone Cognito"
tags: ["javascript", "react"]
---

Trong demo chúng ta sẽ sử dụng

- Create React App
- Glamor
- React Router
- Amazon Cognito để authentication
- AWS amplify để tương tác với AWS Services


## Setup

Khởi tạo project và các thư viện sẽ sử dụng

```
create-react-app react-auth
cd react-auth

npm i react-router-dom glamor --save
```

Cài AWSMobile CLI

```
npm i -g awsmobile-cli
```

Khởi tạo config AWS IAM

```
awsmobile configure
awsmobile init
```

Nó sẽ tạo project Mobile Hub và file aws-exports.js trong thư mục src. Tiếp theo, thêm user-signin và deploy các config mới

```
awsmobile user-signin enable
awsmobile push
```

`awsmobile user-signin enable` sex bật Amazon Congito trong project với các thiết đặt mặc định, bao gồm 2 factor authentication với SMS (sẽ thêm TOTP sau). Nếu muôn can thiệp các thiệt đặt, vào trực tiếp [Amazon Cognito](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fcognito%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fcognito&forceMobileApp=0) để chỉnh

# Màn hình đăng ký

![](https://cdn-images-1.medium.com/max/800/1*U_Oa4dWFeIqJ9TPJFx9lmQ.jpeg)

Để tương tác với Amazon Cognito, chúng ta sẽ sử các hàm trong class `Auth` từ thư viện `aws-amplify`:

`signUp` - tạo user mới

```js
signUp(username: string, password: string, attributes?: object)
```

`confirmSignUp` - để xác nhận đăng ký thành công

```js
confirmSignUp(username: string, authenticationCode: string)
```

`signIn` - đăng nhập

```js
signIn(username: string, password: string)
```

`confirmSignIn` - xác nhận đăng nhập

```js
confirmSignIn(user: object, authenticationCode: string)
```

Trong file root của project, thường là `index.js` 

```js
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