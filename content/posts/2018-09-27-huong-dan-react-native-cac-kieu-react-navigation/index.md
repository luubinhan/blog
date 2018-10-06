---
slug: "/2018-09-27-huong-dan-react-native-cac-kieu-react-navigation"
date: "2018-09-27"
title: "Điểm qua các kiểu navigator của thư viện react-navigation"
desc: "Chúng ta cùng liệt kê qua các dạng navigator, khi nào, dùng ở đâu là hợp lý"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react-native"]
---

<!-- TOC -->

- [Stack](#stack)
- [Switch](#switch)
- [Drawer](#drawer)
- [Bottom Tab](#bottom-tab)
- [Material Top Tab](#material-top-tab)

<!-- /TOC -->

Có rất nhiều thư viện khác nhau để làm navigation với React native, mình khuyến khích các bạn dùng **react-navigation** của Facebook phát triển cho React Native, nói chung cái gì đã có bản official của chính người sáng lập thì mình cứ đè nó ra xài

# Stack

![Điểm qua các kiểu navigator của thư viện react-navigation](https://i.stack.imgur.com/25MyO.jpg)

Khi mở một màn hình mới, nó sẽ sếp chồng lên trên màn hình trước đó. Kiếu sếp bánh tráng.

Theo mặc định, màn hình mới chạy từ cạnh phải -> qua trái màn hình trong iOS, mờ -> đến rõ dần từ dưới lên trong android

API

```jsx
createStackNavigator(RouteConfigs, StackNavigatorConfig)
```

Ví dụ

```jsx
const StackScreens = createStackNavigator(
  {
    Main: { screen: Main },
    Login: { screen: Login }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);
```

# Switch

Với Swtich Navigator chỉ hiển thị 1 màn hình, không có `goBack()`, phù hợp nhất với flow Authentication, flow này thường sẽ là

- User mở ứng dụng
- Ứng dụng load dữ liệu authentication (nếu có) trong `AsyncStorage`
- Sau khi load, hiển thị trang chính hoặc màn hình đăng nhập
- Sau khi user sign out, hiển thị màn hình đăng nhập

API

```jsx
createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);
```

Ví dụ

```jsx
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import {HomeScreen, SignInScreen, OtherScreen, AuthLoadingScreen} from './screens';

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
```

Tham khảo thêm [cách implement Authentication Flow](https://reactnavigation.org/docs/en/auth-flow.html)

# Drawer

Kiểu menu trượt từ bên trái thấy trong Android

![Điểm qua các kiểu navigator của thư viện react-navigation](https://github.com/xke/SimpleReactDrawerNavigationExample/raw/master/SimpleReactDrawerNavigationExample.gif)

API

```js
createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);
```

Ví dụ

1. `TouchableMenuIcon` là component luôn hiển thị ở gốc trái của ứng dụng
2. Chạm vào icon, `SideMenu` component được hiển thị, style tùy thích
3. `RootStack` là một Stack Navigator chứa các màn hình chính của ứng dụng
4. `MyDrawerNavigator` tạo ra từ `createDrawerNavigator()`, sẽ đảm nhiệm việc show side menu, để ý cái `props` **contentComponent**

```jsx
import React, { Component } from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import {RootStackScreen1, RootStackScreen2, RootStackScreen3} from './screens';


// 1) `TouchableMenuIcon` là component luôn hiển thị ở gốc trái của ứng dụng

class TouchableMenuIcon extends Component {

  toggleDrawer=()=>{    
    this.props.navigationProps.toggleDrawer();
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
          <Image
            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}
            style={{ width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// 2) Chạm vào icon, `SideMenu` component được hiển thị, style tùy thích

class SideMenu extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'column', marginTop:30, justifyContent: 'space-around'}}>
         <Button
              title="Screen 1"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen1');
                this.props.navigation.closeDrawer();

              }}
          />
          <Button
              title="Screen 2"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen2');
                this.props.navigation.closeDrawer();

              }}
            />
          <Button
              title="Screen 3"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen3');
                this.props.navigation.closeDrawer();

              }}
            />
        </View>
      </View>
    );
  }
}

// 3) `RootStack` là một Stack Navigator chứa các màn hình chính của ứng dụng
const RootStack = createStackNavigator(
  {
    RootStackScreen1: RootStackScreen1,
    RootStackScreen2: RootStackScreen2,
    RootStackScreen3: RootStackScreen3
  },
  {
    initialRouteName: 'RootStackScreen1',  
    navigationOptions: ({ navigation }) => ({
      title: "Root Stack", 
      headerLeft: <TouchableMenuIcon navigationProps={ navigation }/>
    })
  }
);



// 4) `MyDrawerNavigator` tạo ra từ `createDrawerNavigator()`, sẽ đảm nhiệm việc show side menu, để ý cái `props` **contentComponent**

export default MyDrawerNavigator = createDrawerNavigator(  
  {
    RootStack: RootStack,
  },
  {
    contentComponent: SideMenu
  }
);
```

# Bottom Tab

Kiểu tab bar nằm ở dưới màn hình, các màn hình sẽ không được render cho đến khi user focus

![Điểm qua các kiểu navigator của thư viện react-navigation](https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-1.gif)

API

```js
createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);
```

# Material Top Tab

Hoạt động tương tự như Bottom Tab, chỉ là menu tab đặt ở phía dưới màn hình

![Điểm qua các kiểu navigator của thư viện react-navigation](https://i.stack.imgur.com/tGJ0l.png)

API

```js
createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
```

Ví dụ lấy từ https://reactnavigation.org/docs/