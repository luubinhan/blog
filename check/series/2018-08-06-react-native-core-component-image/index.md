---
slug: "/2018-08-06-react-native-core-component-image"
date: "2018-08-06"
title: "React Native Core Component - Image"
desc: ""
cover: ""
type: "series"
lesson: 1
chapter: 1
tags: ["react-native"]
---

`<Image />` tương tự như thẻ `<img/>` của web, dùng `<Image />` cho hình ảnh bundle chung với app hoặc từ web

Để bundle hình chung lúc build app, dùng `require(duong-dan-hinh.jpg)`, `<Image />` tự biết chọn hình phù hợp cho từng thiết bị: hinh.jpg, hinh@2x.jpg, hinh@3x.jpg

Nếu hình đưa vào là một địa chỉ web, do không biết được kích thước của hình sau khi nó download xong, nó cũng sẽ không tự động hiện thị ra 100%, chúng ta phải chỉ định luôn kích thước bằng `style`, ví dụ `style={{width: 100, height: 100}}

```jsx
import React, { Component } from 'react'
import { AppRegistry, Image, StyleSheet } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={{uri: 'http://www.reactnativeexpress.com/logo.png'}}
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
})

AppRegistry.registerComponent('App', () => App)
```

Tác giả: @dvnabbott

[Link bài gốc](http://www.reactnativeexpress.com/image)