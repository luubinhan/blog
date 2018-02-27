---
path: "/2018-02-22-nhap-mon-react-native"
date: "2018-02-22T13:35:13.234Z"
title: "Nhập môn React Native"
desc: "Hướng dẫn căn bản để tập tành làm React Native, dành cho các bạn sử dụng windows - như mình"
tags: ["react", "javascript", "react-native"]
---

## Chuẩn bị

1. Tải và [cài đặt JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) 
2. [Node](https://nodejs.org/en/), cái này chắc ai cũng cài rồi
3. Bộ [Android Studio](https://developer.android.com/studio/index.html) để giả lập android
4. **Quan trọng**, phải đặt biến Environment của windows: Windows → Search → System → Advanced System Settings → Environment variables → New

```
JAVA_HOME: C:\path\to\JavaSDK
ANDROID_HOME: C:\path\to\AndroidSDK
```

![](https://cdn-images-1.medium.com/max/1600/1*ZdcVDt8iingkWqTORt8IoQ.png)

## Khởi chạy Android Phone ảo

- Mở Android Studio lên
- Tạo mội project mới
- Tạo một thiết bị ảo mới: Manage AVD -> Create
- Khởi động thiết bị ảo này


## Cài đặt React Native

Mở command line ra, cài react native

```
npm install -g react-native-cli
```

Init một project mới

```
react-native init AwesomeProject
```

CD đến thư mục AwesomeProject rồi chạy nào 

```
react-native run-android
```

![](https://cdn-images-1.medium.com/max/1600/1*-IrPLjs7x-PeRp4fWdQV9A.png)