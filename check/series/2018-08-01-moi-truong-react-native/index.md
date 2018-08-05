---
slug: "/2018-08-01-moi-truong-react-native"
date: "2018-08-01"
title: "Môi trường"
desc: ""
cover: ""
type: "series"
lesson: 1
chapter: 1
tags: ["react-native"]
---

Có 2 cách để bắt đầu làm việc với React Native: `create-react-native-app` và `react-native-cli`

# create-react-native-app

Với bộ command-line utility `create-react-native-app` rất thích hợp cho những người mới bắt đầu, nó sẽ khởi tạo một project react native, tạo một QR code, dùng Expo để scan mã QR này và xem ngay kết quả trên thiết bị thật.

Một trong những hạn chế của cái này là chúng ta chỉ viết được javascript, nếu muốn can thiệp sâu hơn bằng Obj-C/Swift, Java,... không được. Trường hợp đó ta phải gọi lệnh `eject`, nhớ là một khi đã `eject` thì ko reverse lại được, lúc này chúng ta có thể viết native module như sử dụng `react-native init`

# react-native-cli

Nếu muốn viết custom native module thì phải sử dụng `react-native-cli` khi khởi tạo project, có thể xem hướng dẫn trên [trang chính thức của Facebook](https://facebook.github.io/react-native/docs/getting-started.html)


Các phần sau trong series này sẽ sử dụng `create-react-native-app`


Tác giả @dvnabbott

http://www.reactnativeexpress.com/