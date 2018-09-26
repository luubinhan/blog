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

- [Expo là cái gì](#expo-là-cái-gì)
- [Hạn chế của Expo](#hạn-chế-của-expo)
- [App sẽ viết](#app-sẽ-viết)
- [Cài Expo](#cài-expo)
  - [Tạo một dự án Expo mới](#tạo-một-dự-án-expo-mới)
  - [Ví dụ](#ví-dụ)

<!-- /TOC -->

## Expo là cái gì

Expo là một framework để đẩy nhanh việc viết app React Native. Giống như Laravel hay Symphony cho PHP, Ruby on Rail của Ruby. Đồng thời cung cấp một công cụ để chạy thử và debug.

## Hạn chế của Expo

Trước khi nghiên cứu tiếp, một vài vấn đề quan trọng sau cần biết


1. **Expo không hổ trợ code chạy nền**, ví dụ như việc tracking vị trí thiết bị.
2. **Expo chỉ hổ trợ những API mà Expo SDK hổ trợ**, có nghĩa là, nếu ứng dụng đang viết cần tương tác với Bluetooh, vốn không được hổ trợ bởi Expo SDK thì bạn phải viết code React Native thuần luôn, hoặc tự viết thêm native code sử dụng thư viện [ExpoKit](https://docs.expo.io/versions/latest/expokit/expokit).
3. **Sử dụng Expo là chết dính với bộ toolset của nó**. Một số đồ chơi sẽ không chạy được với Expo, trong trường hợp cần xài tới, phải `eject` cái app ra khỏi Expo, mà khi đã `eject` thì sẽ ko thể có `inject` ngược lại.
4. **Ứng dụng Expo chỉ build online**. Expo cung cấp một công cụ command-line là *Exp*, cho phép việc build lên Expo Server, một khi hoàn tất, một URL để download **.apk** hoặc **ipa**, [Bài hướng dẫn](https://docs.expo.io/versions/latest/distribution/building-standalone-apps)

Mặc dù nghe có vẻ khá hạn chế, nhưng thực sự Expo rất mạnh, rất nhiều thứ hổ trợ sẵn cho Androi và iOS. Có nghĩa là nếu app đang viết không có gì quá đặc biệt, quá "đỉnh của đỉnh" thì việc sử dụng Expo sẽ mang tới rất nhiều lợi ích.


## App sẽ viết

Làm cái game kiểu tìm cập *đóa*

![](https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/memory-game-default.png)

Và đây là mặt kia của thẻ

![](https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/memory-game-done.png)

Sau khi tìm ra được hết các cặp, user nhấn reset để chơi lại

## Cài Expo

Không giống với việc viết React Native thuần, chúng ta phải cài và cấu hình Android Studio, Xcode và một số thứ linh tinh khác, tất cả những gì để bắt đầu với Expo là

*Dạo này nó có thêm cái service Snack để làm online khá ngon.*

1. Cài Node.js, viết React thì phải có rồi
2. Cài Expo Client trên thiết bị iOS hoặc Android, cái này để preview app. Lên App Store, Google Play tải về
3. Cài bộ CLI tool của Expo, để mà khởi chạy một dự án Expo mới, chạy build,... dễ lắm như sau

```powershell
npm install expo --global

// init một project mới
expo init luckyluu-project
cd luckyluu-project
expo start
```

### Tạo một dự án Expo mới

Một khi hoàn tất 3 thứ công việc đơn giản trên, giờ chúng ta tạo một app mới

```powershell
exp init MemoryGame

// trỏ vô thư mục mới tạo
cd MemoryGame

// Let ruuuuuuun
exp start
```

Nếu sử dụng Expo XDE thì có thể tạo và chạy Expo app qua giao diện, tải [ở đây nè](https://github.com/expo/xde/releases). Sau khi chạy xong thì trên màn hình command-line sẽ có đoạn QR code

![](https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/run-dev-server.png)

Rút điện thoại ra, mở app Expo lên, quét đoạn QR code này và xong. Sẽ thấy màn hình mặc định của ứng dụng, mỗi lần bấm `Control + S` là nó sẽ tự động load lại.

Với bạn nào đang xài Iphone, gần đây Expo phải mở cái quét mã QR ra khỏi app vì bị Apple chửi bới, trên bộ cung cụ debug mới (lúc chạy expo start nó sẽ mở lên trình duyệt), bạn chỉ cần chọn gởi link qua email

### Ví dụ

Toàn bộ code ví dụ có thể download [ở đây](https://github.com/tutsplus/easier-react-native-development-with-expo), bạn có thể down về chạy thử. Mình không phân tích toàn bộ code vì mình chỉ tập trung giới thiệu về Expo, mình mặc định các bạn đã biết React, React Native căn bản nhé.

Tác giả: Wern Ancheta
Link bài gốc: https://code.tutsplus.com/tutorials/easier-react-native-development-with-expo--cms-30546