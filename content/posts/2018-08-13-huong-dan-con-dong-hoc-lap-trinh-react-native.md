---
slug: "/2018-08-13-huong-dan-con-dong-hoc-lap-trinh-react-native"
date: "2018-08-13"
title: "Con đường để trở thành React Native developer ( phiên bản 2018)"
desc: "Tiếp theo bài trước mình sẽ dịch thêm một bài để các bạn bắt đầu học lập trình React Native"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript", "react-native"]
---

Nếu bạn đã thông thạo hết React, thì không có lý do vì bạn dưừng lại ở React JS mà không tiến lên React Native.

# Setup môi trường

[React Native Environment setup (iOS and Android) ](https://habiletechnologies.com/blog/getting-started-react-native-complete-setup-guide/)

# Tuts Bắt đầu với React native

[React Native Tutorial: Building iOS and Android apps with Javascript](https://www.raywenderlich.com/165140/react-native-tutorial-building-ios-android-apps-javascript)


[Shoutem Tutorial on React Native: Build your first Mobile app](https://school.shoutem.com/lectures/build-react-native-mobile-app-tutorial/)


[React Native Cheat Sheet ](https://rationalappdev.com/react-native-cheat-sheet/)

# Navigation trong React Native bằng React Navigation

[Getting started with React Navigation ](https://hackernoon.com/getting-started-with-react-navigation-the-navigation-solution-for-react-native-ea3f4bd786a4)

[Using React Navigation](https://www.reactnative.guide/10-navigation/10.1-using-react-navigation.html)

# Debug

Đơn giản nhất để debug là dùng [React native debugger](https://github.com/jhen0409/react-native-debugger)

Đọc thêm cách sử dụng

- [Debug your React Native application like a God ](https://medium.com/research-engineering-at-simply-technologies/react-native-debugging-like-a-god-9610ac2ffd12)
- [Debugging React and Redux with React Native Debugger](https://blog.reactnativecoach.com/debugging-react-native-and-redux-with-react-native-debugger-62f6ceef3033)
- [Tài liệu chính thức](https://github.com/infinitered/reactotron)
- [Video nếu thấy đọc chưa hiểu lắm](https://www.youtube.com/watch?v=tPBRfxswDjA)

# Xây dựng một số ứng dụng React Native đơn giản

[Build a simple Currency convertor in React Native for iOS](https://learn.handlebarlabs.com/p/react-native-basics-build-a-currency-converter)


[Build a dictionary app in React Native for Android](https://code.tutsplus.com/tutorials/creating-a-dictionary-app-using-react-native-for-android--cms-24969)

# Cải thiện performance

2 điều cần nhớ khi bắt đầu cải thiện performance với React Native

-  **Bridge optimize**: ở giữa javascript threat và native threat của ứng dụng React native sẽ có một cái **Bridge** ở giữa để chuyển đổi giữa 2 threat này. Phần lớn workload nặng nhất là ở đây, những animation chạy trên single threat của javascript sẽ rất tốn kém. Nếu muốn nghiên cứu sâu hơn về kiến trúc của React Native, ngâm cứu bài https://tadeuzagallo.com/blog/react-native-bridge/

- **Quản lý view phức tạp** nếu app chỉ có một vài view thì chả có gì phải cải thiện. Nếu với nhiều view phức tạp, navigation lung tung, chuyện để ý tới performance là bất buộc.

Một tài liệu để đọc

[Dive into React Native performance](https://facebook.github.io/react-native/docs/performance.html#common-sources-of-performance-problems)


[how to optimize the performance of your React Native app](https://www.youtube.com/watch?v=9VqVv_sVgv0)

[React Native performance issues](https://www.simform.com/react-native-app-performance/)

# Test

[Testing in React Native using Jest and Detox](https://pillow.codes/testing-in-react-native-jest-detox-d7b3b79a166a)


[Appium + React Native Quickstart](https://chase-seibert.github.io/blog/2017/01/06/appium-react-native-quickstart.html)

[Testing React Native Apps with Appium](https://www.skcript.com/svr/testing-react-native-apps-with-appium-the-ultimate-guide/)


[Link bài viết gốc tác giả Rakshit Sora](https://alligator.io/react/roadmap-react-native-developer/)