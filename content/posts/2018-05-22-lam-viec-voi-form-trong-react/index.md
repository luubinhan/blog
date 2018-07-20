---
slug: "/2018-05-22-lam-viec-voi-form-trong-react"
date: "2018-05-22"
title: "Làm việc với Form trong React"
desc: "Xử lý form trong React, căn bản nhất"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [controlled component vs. uncontrolled component](#controlled-component-vs-uncontrolled-component)
- [Dựng Form](#dựng-form)

<!-- /TOC -->

![][https://process.filestackapi.com/cache=expiry:max/resize=width:700/compress/GLrbSyTSyGrIccNEhIDF]

## controlled component vs. uncontrolled component

Không giống các element DOM, element FORM sẽ làm việc hơi khác trong React. Data của form sẽ được xử lý bởi component, không phải bởi DOM, thông thường chúng ta sử dụng controlled component, data của form sẽ được đưa vô component `state` như hình bên dưới

![](https://process.filestackapi.com/cache=expiry:max/Qb7pi8kTzenybAUcijaB)

Data từ `dump components` sẽ được gởi vô hàm callback, nơi chúng ta lưu lại các thay đổi

Nếu sử dụng uncontrolled component, tương tự như HTML form truyền thống, dữ liệu sẽ nằm trong DOM, không nằm trong component state, các component `<input />` hay `<textarea/>` sẽ tự quản lý state của nó và tự động thay đổi khi user nhập dữ liệu, nếu cần dữ liệu này, chúng ta query tới DOM đó để lấy giá trị bằng `ref`

```jsx
class UncontrolledComponentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => { this.input = input }} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Đa số các trường hợp mình thường sử dụng controlled component để làm form, nhìn vào trực quan hơn và mình có thể validate được dữ liệu lúc nhập vào luôn.


## Dựng Form

Sẽ có khá nhiều thư viện có sẵn để làm việc với form, nhưng với cá nhân mình, mình vẫn thích tự build hơn vì nếu mình muốn thêm validate đặc biệt hay tùy biến behavior của nó cũng đơn giản hơn, đồng thời giúp chúng ta nắm rõ hơn về React Form luôn.

```jsx
import React, {Component} from 'react';  

/* Import Components */
import CheckBox from '../components/CheckBox';  
import Input from '../components/Input';  
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        email: '',
        age: '',
        gender: '',
        expertise: '',
        about: ''

      },

      genderOptions: ['Male', 'Female', 'Others'],
      skillOptions: ['Programming', 'Development', 'Design', 'Testing']

    }
  }

  /* This life cycle hook gets executed when the component mounts */

  handleFormSubmit = (e) => {
    // Form submission logic
  }
  handleClearForm = (e) => {
    // Logic for resetting the form
  }
  changeValue = (e) => {
    //update state
  }
  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>

        <Input onChange={this.changeValue} /> {/* Name of the user */}
        <Input onChange={this.changeValue} /> {/* Input for Age */} 
        <Select onChange={this.changeValue} /> {/* Gender Selection */}
        <CheckBox onChange={this.changeValue} /> {/* List of Skills (eg. Programmer, developer) */}
        <TextArea onChange={this.changeValue} /> {/* About you */}
        <Button onClick={this.handleFormSubmit}>
            Submit
        </Button>
        <Button onClick={this.handleClearForm}>
            Reset
        </Button>
      </form>
    );
  }
}

export default FormContainer;
```

Mình sẽ không đi sâu vào các component `Input`, `Select`, `Checkbox`, `TextArea`, các bạn có thể sử dụng một UI library React bất kỳ, hoặc tự build nếu thích, đa phần các library này sẽ cho phép sử dụng cả 2 kiểu controlled/uncontrolled

Hàm `handleClearForm` sẽ reset toàn bộ state

```jsx
handleClearForm = (e) => {
  e.preventDefault();
  this.setState({ 
    newUser: {
      name: '',
      age: '',
      gender: '',
      skills: [],
      about: ''
    },
  })
}
```


Bên trong hàm `handleFormSubmit` ta có thể lấy giá trị của form và thực hiện một xử lý như `dispatch` ra một action

```jsx
handleFormSubmit = (e) => {
    e.preventDefault();
    let userData = this.state.newUser;

    // nếu connect FormContainer vào Redux, ta có thể dùng dispatch ở đây
    this.props.dispatch(someFunction(userData))
}   
```

Bài này tác giả chưa đề cập những vấn đề sâu hơn như validate, bài sau mình sẽ bổ sung thêm.


[Link bài gốc](https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y)

Tác giả: Manjunath