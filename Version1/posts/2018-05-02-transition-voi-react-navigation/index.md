---
path: "/2018-05-02-transition-voi-react-navigation"
date: "2018-05-02T13:35:13.234Z"
title: "Transition trong React Native với React Navigation"
desc: "Hướng dẫn làm transition trong React Native với react navigation"
tags: ["javascript", "react", "react-native"]
---


Chúng ta sẽ build những màn hình đầu tiên khi mới vào app: on-boarding screen, mấy cái màn hình kiểu chào hỏi khi mới vừa cài app xong, mở app lên, giới thiệu đôi ba nét rồi kêu người ta sign in/sign up.

Chúng ta sẽ setup 2 screen, `Screen1`, `Screen2`, nhét 2 screens này vào trong `StackNavigator` component

```jsx
import React, {Component} from 'react';
import {Text, View, Button, Image, StyleSheet } from 'react-native';
import {StackNavigator} from 'react-navigation';

const LogoImage = (props) => (
    <Image source={{uri: 'https://picsum.photos/100/100?image=56'}} style={props.style} />
)

class Screen1 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <LogoImage style={styles.largeLogo} />
                <Text style={styles.paragraph}>
                    Welcome!
                </Text>
                <Button title='Next' onPress={() => this.props.navigation.navigate('Screen2')} />
            </View>
        )
    }
}

class Screen2 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <LogoImage style={styles.smallLogo}/>
                <Text style={styles.paragraph}>
                  <Text style={{fontWeight:'normal'}}>
                    Now you should have a basic understanding of how this app works. 
                    Please sign up and take part in this fantastic user experience!
                  </Text>
                </Text>  
                <Text style={styles.paragraph}>
                    This is the last page of the onboarding.
                </Text>  
                <Button title="Back" onPress={() => this.props.navigation.goBack()} />
            </View>
        )
    }
}

const Navigator = StackNavigator({
    screen1: {screen: Screen1},
    screen2: {screen: Screen2},
});

export default class App extends Component {
    render() {
        return (
            <Navigator />
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
  },
  largeLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  smallLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  paragraph: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
```

## Thêm transition

Chúng ta sẽ sử dụng thêm một thư viện `react-navigation-fluid-transitions` để thêm transition khi chuyển từ `Screen1` qua `Screen2`, logo ở `Screen1` sẽ nhỏ dần nhỏ dần thành logo ở `Screen2`.

```
npm i react-navigation-fluid-transitions --save
```

Thay vì sử dụng `StackNavigator`, ta chuyển sang dùng `FluidNavigator` của thư viện mới

```jsx
import { FluidNavigator, Transition } from react-navigation-fluid-transitions’;

const Navigator = FluidNavigator({
 screen1: {screen: Screen1},
 screen2: {screen: Screen2}
});
```

Ở đây chúng ta muốn cái Logo sẽ *biến hình* nên bọc nó vào `Transition` với cùng một giá trị *prop* `shared`

```jsx
<Transition shared='logo'>
  <LogoImage style={styles.largeLogo}/>
</Transition>

<Transition shared='logo'>
  <LogoImage style={styles.smallLogo}/>
</Transition>
```

Kết quả có được

![](https://cdn-images-1.medium.com/max/800/1*Pg-22BI0Z_vG1mMxe9Scjg.gif)

Nếu để ý ta sẽ thấy phần text sẽ không có áp dụng transition lên nên nó đơn giản là ẩn/hiện khi chuyển qua lại giữa 2 màn hình, chúng ta sẽ thêm transition luôn cho phần text này bằng component `Transition`

```jsx
<Transition appear='horizontal'>
  <Text style={styles.paragraph}>
    Welcome!
  </Text>
</Transition>
```

![](https://cdn-images-1.medium.com/max/800/1*Da1RpwEKtsKL4fwp0oZ8Iw.gif)

Thư viện React Navigation Fluid Transition hổ trợ sẵn một số transition có thể dùng mì-ăn-liền như `appear` ở trên, một số hiệu ứng có sẵn khác, đọc thêm tại [document ở đây](https://github.com/fram-x/FluidTransitions/blob/develop/README.md)

Tác Giả: Christian Falch
Link Bài Gốc: https://medium.com/@christian.falch/fluid-transitions-with-react-navigation-a049d2f71494