---
slug: "/2018-08-04-react-native-core-component-view"
date: "2018-08-04"
title: "React Native Core Component - View"
desc: ""
cover: ""
type: "series"
lesson: 1
chapter: 1
tags: ["react-native"]
---

`<View/>` là một trong những component sử dụng nhiều nhất, nó giống như `<div />` của html, chủ yếu sử dụng để styling và layout các phần tử con.

Ví dụ bên dưới chúng ta sẽ có 2 `<View />`, một cái bao ở ngoài và cái ở giữa để vẽ ô vuông màu xanh

```jsx
import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'skyblue',
    borderWidth: 2,
    borderColor: 'steelblue',
    borderRadius: 20,
  },
})

AppRegistry.registerComponent('App', () => App)
```

Tác giả @dvnabbott

http://www.reactnativeexpress.com/

[Link bài gốc](http://www.reactnativeexpress.com/view)