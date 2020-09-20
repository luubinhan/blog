---
slug: "/2018-04-16-huong-dan-react-native-bat-dau-voi-expo"
date: "2018-04-16"
title: "Giới thiệu Expo, nhập môn React Native"
desc: "Để bắt đầu với React Native, cách nhanh nhất không cần cài Android Studio, Xcode có ngay môi trường để chạy test React Native thì Expo chính là cái bạn cần"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "react-native"]
---

<!-- TOC -->

- [Expo là cái gì](#expo-l%C3%A0-c%C3%A1i-g%C3%AC)
- [Hạn chế của Expo](#h%E1%BA%A1n-ch%E1%BA%BF-c%E1%BB%A7a-expo)
- [App sẽ viết](#app-s%E1%BA%BD-vi%E1%BA%BFt)
- [Cài Expo](#c%C3%A0i-expo)
- [Tạo một dự án Expo mới](#t%E1%BA%A1o-m%E1%BB%99t-d%E1%BB%B1-%C3%A1n-expo-m%E1%BB%9Bi)
- [Chạy code ví dụ](#ch%E1%BA%A1y-code-v%C3%AD-d%E1%BB%A5)

<!-- /TOC -->

## Expo là cái gì

Expo là một framework để đẩy nhanh việc viết app React Native. Giống như Laravel hay Symphony cho PHP, Ruby on Rail của Ruby. Đồng thời cung cấp một công cụ để chạy thử và debug.

## Hạn chế của Expo

Trước khi nghiên cứu tiếp, một vài vấn đề quan trọng sau cần biết

1. **Expo chỉ hỗ trợ những API mà Expo SDK hỗ trợ**, có nghĩa là, nếu ứng dụng đang viết cần tương tác với Bluetooh, vốn không được hỗ trợ bởi Expo SDK thì bạn phải viết code React Native thuần luôn, hoặc tự viết thêm native code sử dụng thư viện [ExpoKit](https://docs.expo.io/versions/latest/expokit/expokit).
2. **Sử dụng Expo là chết dính với bộ toolset của nó**. Một số đồ chơi sẽ không chạy được với Expo, trong trường hợp cần xài tới, phải `eject` cái app ra khỏi Expo, mà khi đã `eject` thì sẽ ko thể có `inject` ngược lại.
3. **Ứng dụng Expo chỉ build online**. Expo cung cấp một công cụ command-line là *Exp*, cho phép việc build lên Expo Server, một khi hoàn tất, một URL để download **.apk** hoặc **ipa**, [Bài hướng dẫn](https://docs.expo.io/versions/latest/distribution/building-standalone-apps)

Mặc dù nghe có vẻ khá hạn chế, nhưng thực sự Expo rất mạnh, rất nhiều thứ hỗ trợ sẵn cho Android và iOS. Có nghĩa là nếu app đang viết không có gì quá đặc biệt, quá "đỉnh của đỉnh" thì việc sử dụng Expo sẽ mang tới rất nhiều lợi ích.


## App sẽ viết

Làm cái game kiểu tìm cặp

![Giới thiệu Expo, nhập môn React Native](https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/memory-game-default.png)

Và đây là mặt kia của thẻ

![Giới thiệu Expo, nhập môn React Native](https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/memory-game-done.png)

Sau khi tìm ra được hết các cặp, user nhấn reset để chơi lại

## Cài Expo

Không giống với việc viết React Native thuần, chúng ta phải cài và cấu hình Android Studio, Xcode và một số thứ linh tinh khác, tất cả những gì để bắt đầu với Expo là

*Dạo này nó có thêm cái service Snack để làm online khá ngon.*

1. Cài Node.js, viết React thì phải có rồi
2. Cài Expo Client trên thiết bị iOS hoặc Android, cái này để preview app. Lên App Store, Google Play tải về
3. Cài bộ CLI tool của Expo, để mà khởi chạy một dự án Expo mới, chạy build,... dễ lắm như sau

```shell
npm install expo --global

// init một project mới
expo init luckyluu-project
cd luckyluu-project
expo start
```

## Tạo một dự án Expo mới

Một khi hoàn tất 3 thứ công việc đơn giản trên, giờ chúng ta tạo một app mới

```shell
exp init MemoryGame

// trỏ vô thư mục mới tạo
cd MemoryGame

// Let ruuuuuuun
exp start
```

Nếu sử dụng Expo XDE thì có thể tạo và chạy Expo app qua giao diện, <a href="https://github.com/expo/xde/releases" target="_blank" rel="noopener noreferrer">tải ở đây nè</a>. Sau khi chạy xong thì trên màn hình command-line sẽ có đoạn QR code

![Giới thiệu Expo, nhập môn React Native](https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/run-dev-server.png)

Rút điện thoại ra, mở app Expo lên, quét đoạn QR code này và xong. Sẽ thấy màn hình mặc định của ứng dụng, mỗi lần bấm `Ctrl + S` là nó sẽ tự động load lại.

Với bạn nào đang xài Iphone, gần đây Expo phải xóa cái quét mã QR ra khỏi app vì bị Apple chửi bới, trên bộ công cụ debug mới (lúc chạy expo start nó sẽ mở lên trình duyệt), bạn chỉ cần chọn gửi link qua email

## Chạy code ví dụ

Toàn bộ code ví dụ có thể <a href="https://github.com/tutsplus/easier-react-native-development-with-expo" target="_blank" rel="noopener noreferrer">download ở đây</a>, bạn có thể down về chạy thử. Mình không phân tích toàn bộ code vì mình chỉ tập trung giới thiệu về Expo, mình mặc định các bạn đã biết React, React Native căn bản nhé.


<a href="https://code.tutsplus.com/tutorials/easier-react-native-development-with-expo--cms-30546" target="_blank" rel="noopener noreferrer">Wern Ancheta</a>