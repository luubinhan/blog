---
slug: "/2018-08-07-react-native-core-component-scrollview"
date: "2018-08-07"
title: "React Native Core Component - ScrollView"
desc: ""
cover: ""
type: "series"
lesson: 1
chapter: 1
tags: ["react-native"]
---

Nếu không sử dụng `<ScrollView />`, nội dung vượt ngoài kích thước của thiết bị sẽ luôn bị ẩn đi, component này cũng chỉ phù hợp cho nội dung không nhiều, nều có nhiều nội dung bên trong thì nên sử dụng đến `<ListView/>` để có performance tốt hơn

```jsx
import React, { Component } from 'react'
import { AppRegistry, ScrollView, View, StyleSheet } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.boxLarge} />
        <ScrollView horizontal>
          <View style={styles.boxSmall} />
          <View style={styles.boxSmall} />
          <View style={styles.boxSmall} />
        </ScrollView>
        <View style={styles.boxLarge} />
        <View style={styles.boxSmall} />
        <View style={styles.boxLarge} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxSmall: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'skyblue',
  },
  boxLarge: {
    width: 300,
    height: 300,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'steelblue',
  },
})

AppRegistry.registerComponent('App', () => App)
```

Tác giả: @dvnabbott

[Link bài gốc](http://www.reactnativeexpress.com/image)