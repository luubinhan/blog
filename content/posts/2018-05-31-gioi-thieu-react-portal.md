---
slug: "/2018-05-31-huong-dan-gioi-thieu-react-portal"
date: "2018-05-31"
title: "Giới thiệu React Portal"
desc: "Tìm hiểu về Portals, bản hỗ trợ chính thức của react-dom"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Vấn đề Portal giải quyết](#vấn-đề-portal-giải-quyết)
- [Cú pháp](#cú-pháp)
- [Sử dụng](#sử-dụng)

<!-- /TOC -->

Gọi là bản hỗ trợ chính thức vì trước bản React 16 thì không có support, chúng ta phải dùng các thư viện bổ sung. Giờ thì nó official rồi nhé.

## Vấn đề Portal giải quyết

Thông thường khi chúng ta có component cha là A, bên trong đó render component con là B, thì thằng B này sẽ luôn bị bọc lại bên trong A

```html
<div class="component-c"></div>
<div class="component-a">
    <div class="component-b">
    </div>
</div>
```

Giờ nếu ta muốn khi viết thì vẫn viết component B bên trong component A, nhưng kết quả html ta có được thì component B lại nằm trong component C. Đó là lúc chúng ta cần đến Portal, ta sẽ bọc component B bằng hàm `createPortal`, để khi `render` B thì nó lại `render` ở C.

## Cú pháp

```jsx
import ReactDOM from 'react-dom';

ReactDOM.createPortal(child, container);
```

Trong đó

- `ReactDOM.createPortal` là hàm của `react-dom`
- child là thằng B, thằng con đi lông nhông không thèm ở nhà với cha nó
- container là nhà thằng hàng xóm, nơi thằng con B hoang đàng sẽ ở ké.

## Sử dụng

Để sử dụng Portal, chúng ta tạo ra một component mới, độc lập với B, rồi đẩy thằng B hay bất kỳ đứa nào muốn có cuộc sống du mục thành child component của component mới tạo này, đặt tên là `MyPortal` nha.

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class MyPortal extends Component {
  render() {
    // tìm coi có đứa nào chịu chứa chấp nó không
    const haveTarget = document.getElementById(this.props.target);
    // không nơi chứa chấp thì ta ko render luôn
    return haveTarget ? ReactDOM.createPortal(
      this.props.children,
      haveTarget
    ) : null
  }
}
MyPortal.propTypes = {
  // là id của html element ta sẽ append cái đứa con hoang đàng vô
  target: PropTypes.string.isRequired,
}

export default MyPortal;
```

Component A sẽ viết như thế này

```jsx
...
return (
    <div className="component-a">
        Hello An.Luu
        <MyPortal target='targetForB'>
            <div className="component-b">
                Em là B!
            </div>
        </MyPortal>
    </div>
)
...

// trong đó, id có thể nằm ở bất kỳ component nào đó khác, thậm chí window khác luôn mới ghê

// ví dụ component C
...
return (
    <div className="component-c">
        Em là C!
        <div id="targetForB" />
    <div>
)
...

```


Đọc thêm 
- https://reactjs.org/docs/portals.html 
- https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202