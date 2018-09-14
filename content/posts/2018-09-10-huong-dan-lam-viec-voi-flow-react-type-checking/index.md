---
slug: "/2018-09-10-huong-dan-lam-viec-voi-flow-react-type-checking"
date: "2018-09-10"
title: "Tại sao sử dụng Flow, và sử dụng Flow như thế nào trong React"
desc: "Tại sao chúng ta cần type checking trong javascript, tại sao Flow lại là lựa chọn của nhiều developer hiện nay"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [Static vs Dynamic Typing](#static-vs-dynamic-typing)
- [Tại sao chọn Flow](#tại-sao-chọn-flow)
- [Setup Flow với React](#setup-flow-với-react)
- [Define type check cho Prop và State của cho React Component](#define-type-check-cho-prop-và-state-của-cho-react-component)

<!-- /TOC -->

# Static vs Dynamic Typing

Để bắt đầu chúng ta phải hiểu cách javascript handle type

Một cách ngắn gọn nhất ngôn ngữ statically-typed thì type của biến có thể xác định lúc **compile** (trước khi chạy), ngôn ngữ dynamically-typed thì chỉ biết được type của biến lúc **runttime**

Như vậy với ngôn ngữ dạng statically-typed, lỗi sẽ được báo ngay khi build hoặc trên editor khi chúng ta sử dụng type không đúng. Nhưng với những ngôn ngữ kiểu dynamically-typed như Javascript nó sẽ khác chút. Xem xét đoạn code sau

```js
var myObject = {
  prop1: 'Some text here'
}
console.log(myObject.prop1());
```

`prop1` được định nghĩ là một **string** nhưng chúng ta lại gọi `myObject.prop1()` như một **function**. Nếu chúng ta chạy đoạn code này chúng ta sẽ nhận được lỗi trên trình duyệt

```powershell
TypeError: myObject.prop1 is not a function
```

Những trường hợp **quên mất** kiểu của biến như vậy rất dễ gặp trong lúc code. Việc sử dụng static type check sẽ giúp phát hiện lỗi sớm hơn, mà phát hiện lỗi sớm hơn thì sẽ tốt hơn, right?

Trong javascript chúng ta cũng có thể thay đổi type của biến như vầy

```js
var myNumber = 20;
console.log(typeof myNumber); // number
myNumber = true;
console.log(typeof myNumber); // boolean
```

Để ngăn chặn những người khác hoặc chỉnh bản thân làm những chuyện sằn bậy như vậy, chúng ta phải đặt ràng buộc về type cho những biến này

# Tại sao chọn Flow

Để đặt ràng buộc type trong Javascript hay React chúng có những 3 tên tuổi nổi bật Typescript, PropTypes, Flow.

Flow là thư viện của Facebook, hỗ trợ tốt nhất cho React, đứng trên góc độ của người làm sell, nếu nói chúng ta sử dụng Flow từ Facebook sẽ ngon hơn, Typescript là superset của javascript, việc dùng Typescript cũng thay đổi khá nhiều thứ khác trong project, mình cảm thấy nó tiêu tốn khá nhiều thời gian hơn trong lúc dev, PropTpyes đã ko còn được quan tâm nhiều như trước nữa từ sau khi có Flow

Còn theo như phát biểu từ những người tạo ra Flow (những developer trong Facebook)

"Chúng tôi built Flow vì thấy TypeScript đang đi không theo hướng mà công động mong đợi. Ví dụ, TypeScript cố tính không muốn đi theo hướng tập trung vào vấn đề type checking như một type system, không cung cấp việc generate ra document cho API với type đã định nghĩa. Nếu bạn muốn TypeScript làm cái gì bạn cũng phải bảo nó hết, ko hoàn toàn tự động. Mặc dù từ TypeScript 2.0 họ bắt đầu để ý chuyện này, tuy nhiên còn phải rất lâu mới bắt kịp Flow nhé"

# Setup Flow với React

Theo hướng dẫn trên tài liệu chính thức https://flow.org/en/docs/react/

Nếu khởi tạo project bằng Create-React-App thì chỉ việc instal Flow và tạo file `.flowconfig`

```powershell
npm i flow-bin --save-dev
```

Bên trong file package.json, add thêm đoạn script để chạy flow

```json
"scripts": {
  "flow": "flow"
}
```

Để init file `.flowconfig`

```powershell
npm run flow init
```

Sau khi chạy lệnh này xong chúng ta sẽ có file `.flowconfig` với nội dung sau

```
[ignore]
[include]
[libs]
[lints]
[options]
[strict]
```

Để thêm type check của từng component

```jsx
//@flow
import React, {Component} from 'react';

class App extends Component<Props> {
  render() {
    return (
      <div className='app'></div>
    )
  }
}
```

Nếu dùng cách viết thêm `//@flow` vào mỗi file như vậy hơi chuối, chúng ta thay đổi config một chút trong file `.flowconfig`

```
[ignore] // file nào ko check bỏ vào đây
.*/node_modules/.* // bỏ qua file trong thư mục node_modules
.*/src/registerServiceWWorker\.js
.*/src/index\.js
.*\.test\.js

[options]
all=true // check tất cả file, gồm cả node_modules
```

# Define type check cho Prop và State của cho React Component

```jsx
import * as React from 'react';

type Props = {
  strType: string,
  numberType?: number
}

class App extends React.Component<Props> {
  render() {
    const {strType, numberType} = this.props;
    return (
      <div className='app'>
        <div>String {strType}</div>
        <div>Number {numberType}</div>
      </div>
    )
  }
}
```

[Link bài gốc](https://www.lullabot.com/articles/flow-for-static-type-checking-javascript)