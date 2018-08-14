---
slug: "/2018-08-07-huong-dan-su-dung-firebase-realtime-voi-react-native"
date: "2018-08-07"
title: "Sử dụng Firebase Realtime với React Native"
desc: "Những tính năng của Firebase có thể đáp ứng nhu cầu của ứng dụng nhỏ, đơn giản, không cần đến server."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react-native"]
---

<!-- TOC -->

- [Setup](#setup)
- [Ghi dữ liệu](#ghi-dữ-liệu)
- [Đọc dữ liệu](#đọc-dữ-liệu)
- [Cập nhập database](#cập-nhập-database)
- [Xóa dữ liệu](#xóa-dữ-liệu)

<!-- /TOC -->

# Setup

Trước khi đọc bài này bạn nên đọc trước bài [Bắt đầu với Firebase](http://www.androidgig.com/getting-started-with-firebase-android/) để biết những tính năng có trong Firebase

Bài này chúng ta sẽ bàn về cách sử dụng Firebase realtime với React Native. Trước khi bắt đầu ta cần tạo một project trên [Firebase Console](https://console.firebase.google.com/)

![Sử dụng Firebase Realtime Database Với React Native](https://cdn-images-1.medium.com/max/1600/1*lPogJSrLiNKRjIGwrUBalA.png)

Sau khi nhập tên project, khu vực, chúng ta đến màn hình welcome
![Sử dụng Firebase Realtime Database Với React Native](https://cdn-images-1.medium.com/max/1600/1*YqSdnt-L5BN8CxEId8jWuA.png)

Chọn **Add Firebase to your web app**, copy mấy thông tin này lại lưu ở đâu để dành dùng sau này

![Sử dụng Firebase Realtime Database Với React Native](https://cdn-images-1.medium.com/max/1600/1*VUN6hQdArAdLy2yZ44msTA.jpeg)

Cài firebase thôi

```
npm install firebase --save
```

Khởi tạo firebase object để bắt đầu sử dụng, trong file `app.js` hoặc `index.js`

```jsx
const config = {
    databaseURL: "<database-url>",
    projectId: "<project-id>",
};
firebase.initializeApp(config);
```

Khả năng cao là sẽ gặp lỗi sau **Firebase app named ‘[DEFAULT]’ already exists (app/duplicate-app)**

![Sử dụng Firebase Realtime Database Với React Native](https://cdn-images-1.medium.com/max/1600/1*qHXMIrUPR0lhWXdm3M5BWg.png)

Để fix lỗi này, chỉ cần kiểm tra xem có bao nhiêu instance đang sử dụng `firebase.apps`

```jsx
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
```

Vậy là chúng ta có thể bắt đầu sử dụng Firebase realtime, hay bắt đầu với một thao tác đọc/ghi dữ liệu đơn giản

# Ghi dữ liệu

```jsx
writeUserData(email, fname, lname) {
  firebase.database().ref('Users/').set({
    email,
    fname,
    lname
  }).then((data) => {
    console.log('data', data);
  }).catch((error) => {
    console.log('error', error);
  });
}
```

Kết quả khi thành công

![Sử dụng Firebase Realtime Database Với React Native](https://cdn-images-1.medium.com/max/1600/1*Vc2fHUmnfNPcLsYAQ5pPeg.png)

Để push vào một array

```jsx
writeUserData(email,fname,lname){
    firebase.database().ref('UsersList/').push({
        email,
        fname,
        lname
    }).then((data) => {
        console.log('data ' , data)
    }).catch((error) => {
        console.log('error ' , error)
    })
}
```
![Sử dụng Firebase Realtime Database Với React Native](https://cdn-images-1.medium.com/max/1600/1*kCplR2waJQe5m7-G-AEuKg.png)

# Đọc dữ liệu

```jsx
readUserData() {
  firebase.database().ref('Users/').once('value', function (snapshot) {
    console.log(snapshot.val());
  });
}
```

Nếu muốn lấy data khi có 1 thay đổi xảy ra, ta dùng hàm `on`

```jsx
readUserData() {
    firebase.database().ref('Users/').on('value', function (snapshot) {
        console.log(snapshot.val())
    });
}
```

# Cập nhập database

Nếu muốn cập nhập data của một object, tạo một reference tới nó và sử dụng hàm `update()` với dữ liệu muốn thay đổi

```jsx
updateSingleData(email) {
  firebase.database().ref('Users/').update({
    email,
  });
}
```

# Xóa dữ liệu

Dùng hàm `remove()` hoặc là `set`, `update` giá trị về `null`, nó sẽ tự động xóa

```jsx
deleteData() {
  firebase.database().ref('Users/').remove();
}
```

[Link bài gốc](https://medium.com/mindorks/firebase-realtime-database-with-react-native-5f357c6ee13b)