---
slug: "/2018-08-05-react-native-core-component-text"
date: "2018-08-05"
title: "React Native Core Component - Text"
desc: ""
cover: ""
type: "series"
lesson: 1
chapter: 1
tags: ["react-native"]
---

Có thể hình dùng `<Text />` như thẻ `<span/>`, có điều là text trong react-native lúc nào cũng phải đưa chữ vào `<Text />` chứ ko được để nằm khơi khơi

```js
import React, { Component } from 'react'
import { AppRegistry, View, Text, StyleSheet } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello!</Text>
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
  text: {
    backgroundColor: 'whitesmoke',
    color: '#4A90E2',
    fontSize: 24,
    padding: 10,
  },
})

AppRegistry.registerComponent('App', () => App)

```
