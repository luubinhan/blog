---
slug: "/2018-05-16-react-context-api-ke-thay-the-redux"
date: "2018-05-16"
title: "React Context API - có phải sẽ thay thế Redux"
desc: "Thử sử dụng React Context API để thay thể Redux cho State Management"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Context API là cái gì](#context-api-là-cái-gì)
- [Sử dụng React Context API như thế nào](#sử-dụng-react-context-api-như-thế-nào)
- [Khi nào thì nên sử dụng Context API](#khi-nào-thì-nên-sử-dụng-context-api)

<!-- /TOC -->

Bản React 16.3.0 được giới thiệu với khá nhiều khái niệm và tính năng mới của React, trong đó được nhiều quan tâm hơn cả là Context API. Chúng ta sẽ cùng tìm hiểu

- Context API là cái gì
- Thay thể Redux bằng Context API bằng cách nào
- Khi nào thì nên sử dụng Context API

## Context API là cái gì

Định nghĩa official từ React docs

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Khái niệm về Context thì không phải là mới, mà nó đã có từ trước, cũng tương tự như Redux, giúp chúng ta truyền dữ liệu từ trên xuống theo *đường tắt*, tức không theo một thứ tự từ 1->2->3->4.

Cái khác từ phiên bản React 16.3.0 có lẽ là ở chổ mọi thử được implement một cách rõ ràng hơn, dễ hình dung hơn, thay vì trước đây việc sử dụng Context API không được khuyến khích vì nó còn đang trong giai đoạn phát triển, chưa hoàn thiện nên để tránh sự cố có thể xảy ra, trên tài liệu chính thức của React luôn nói rõ không nên xài trong thời điểm đó.

## Sử dụng React Context API như thế nào

Sẽ bao gồm 3 bước

1. Khởi tạo giá trị ban đầu cho context api bằng `React.createContext`, hàm này trả về một object bao gồm là `Provider` và `Consumer`
2. Sử dụng `Provider` này trên component trên cùng, truyền vào giá trị qua prop `value`
3. Component `Consumer` có thể sử dụng ở bất cứ đâu bên dưới `Provider`, `Consumer` có thể get được giá trị của prop `value` của `Provider` thông qua prop `children`


```jsx
const DEFAULT_STATE = {
    allChar: Char,
    searchTerm: '',
}

export const ThemeContext = React.createContext(DEFAULT_STATE);

export default class Provider extends React.Component {
  state = DEFAULT_STATE;

  searchTermChanged = searchTerm => {
    this.setState({searchTerm});
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          ...this.state,
          searchTermChanged: this.searchTermChanged,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
```

Chúng ta tạo ra một component `Provider`, component này sẽ trả về context Provider, bên trong context Provider chúng ta đưa tất tật state của component vào trong trong prop `value` và các hàm sử lý state luôn. Sau đó chúng ta có thể dùng component `Provider` mới build này như một root component (component nằm trên cùng)

Chúng ta tạo thêm một component `Consumer`

```jsx
import React from 'react';
import {ThemeContext} from './Provider';

export default class Consumer extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <ThemeContext.Consumer>
        {({allChar, searchTerm, searchTermChanged}) => {
          const char = searchTerm
            ? allChar.filter(
                char =>
                  char.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
              )
            : allChar;

          return React.Children.map(children, child =>
            React.cloneElement(child, {
              char,
              searchTerm,
              searchTermChanged,
            })
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
```

Bên trong component `Comsumer` thực ra ta trả về context `Consumer` từ context đã tạo trước đó. Sau đó ta sử dụng cặp `React.Children.map` và `React.cloneElement` để đưa toàn bộ các state vào trong prop

Chúng ta sử dụng 2 component mới này để bọc lấy component `App` là xong

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Provider';
import Consumer from './Consumer';
import App from './App';

ReactDOM.render(
  <Provider>
    <Consumer>
      <App />
    </Consumer>
  </Provider>,
  document.getElementById('root')
);
```

## Khi nào thì nên sử dụng Context API

Mỗi app mỗi khác, tùy theo nhu cầu và **tình hình** của từng app, câu trả lời đúng nhất chắc là phải để thực nhiệm sử dụng trên nhiều dự án. Có thể nói là react context API implement đơn giản hơn nhiều so với Redux hay MobX. Theo cá nhân mình thấy Context API sẽ chưa thay thể được Redux, nếu bạn đã và đang sử dụng Redux và chưa có gì phàn nàn về nó thì cứ xài tiếp thôi.

Full Source Code: https://github.com/rajatgeekyants/superhero

Tác giả: Rajat S

Link bài gốc: https://blog.bitsrc.io/react-context-api-a-replacement-for-redux-6e20790492b3