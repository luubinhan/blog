---
slug: "/2018-04-04-danh-sach-doi-choi-voi-react-native"
date: "2018-04-04"
title: "Danh sách đồ chơi để bắt đầu với React Native"
desc: "Để bắt đầu và đào sâu vọc vạch với React Native, bạn sẽ cần đụng tới những món đồ chơi sau"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "react-native"]
---


## đồ chơi Development

### SDK

Chưa ai qua mặt được [Expo](https://expo.io/). Expo cho phép dựng app mà ko cần Android Studio hay Xcode.

Workflow để làm việc với Expo

1. Tạo project mới sử dụng [create-react-native-app](https://github.com/react-community/create-react-native-app)
2. Code, code và code...
3. Chạy thử bằng Expo app có thể tìm thấy trong app store, google play

Không cần kết nối điện thoại với máy tính, chỉ cần điện thoại kết nối cùng mạng với localhost đang chạy, điện thoại có cài Expo app, scan đoạn QR code trên command line là được.

Điều hạn chế của Expo là nó ko cho phép cài thêm một số package khác nữa ngoài những package đã được cài sẵn của Expo như Camera, Facebook, Map. Trường hợp cần những package này, sử dụng `react-native init`, lúc đó bạn phải handle mọi thứ, phức tạp hơn dùng Expo.

### Check code chuẩn

Nếu bị nghiện code cho chuẩn như lê duẩn, ESLint là người bạn đồng hành, mình hay sử dụng bộ style guide cấu hình sẵn của [Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript).

Nếu sử dụng ESLint thì mình nghĩ bạn nên dùng thêm một số plugin của VSCode hay Atom, một số plugin của Sublime text mình cài về thì chạy không như ý lắm.

### Debugging

Ứng dụng chạy trên desktop [Reactotron](https://infinite.red/reactotron) cho phép debug React và React Native với những tính năng như: inspecting, mofifying, subscribing, tracking HTTP, đo performance ứng dụng, track error...

## Boilerplate và UI Frameworks

[Snowflake](https://github.com/bartonhammond/snowflake) bao gồm cả Frontend đến Back-End code của ứng dụng, một lựa chọn tốt để bắt đầu dự án mới nhanh nhất.

React Native có sẵn một số components UI cơ bản, nếu muốn custome style thì chúng ta phải viết thêm CSS, còn không, nếu muốn nhiều hơn những component đã được viết sẵn, màu mè hoa lá hẹ hết rồi thì có thể dùng [NativeBase](https://nativebase.io/) tương đối kế thừa khái niệm của Bootstrap, hoặc React Native Kittens có một số components cũng hay ho.

## Thư viện và components

Làm navigation thì nghĩ ngày đến [React navigatio](https://reactnavigation.org/) của chính facebook luôn.

Quản lý state thì dùng [Mobx](http://mobx.js.org/) hoặc [Redux](http://redux.js.org/), redux thì thường cho những dữ liệu nhiều và lớn, năm 2018 chúng ta sẽ vẫn sử dụng Redux nhé, đừng tưởng là nó đã cũ và có cái khác thay thế.

[Animatable](https://github.com/oblador/react-native-animatable) rất có ích khi muốn làm animation cho layout hay mấy cái micro animation trên component.

Một số UI Components khác có thể tham khảo

<ul>
<a href="https://github.com/christopherdro/react-native-calendar" rel="external" target="_blank"><strong>react-native-calendar</strong></a></li>
<li>
<a href="https://github.com/xgfe/react-native-datepicker" target="_self"><strong>react-native-</strong></a><a href="https://github.com/xgfe/react-native-datepicker" target="_self"><strong>datepicker</strong></a></li>
<li>
<a href="https://github.com/oblador/react-native-progress" rel="external" target="_blank"><strong>react-native-progress</strong></a></li>
<li>
<a href="https://github.com/maxs15/react-native-spinkit" rel="external" target="_blank"><strong>react-native-spinkit</strong></a></li>
<li>
<a href="https://github.com/oblador/react-native-vector-icons" rel="external" target="_blank"><strong>Vector Icons</strong></a></li>
<li>
<a href="https://github.com/leecade/react-native-swiper" rel="external" target="_blank"><strong>react-native-swiper</strong></a></li>
<li>
<a href="https://github.com/skv-headless/react-native-scrollable-tab-view" rel="external" target="_blank"><strong>react-native-scrollable-tab-view</strong></a></li>
<li>
<a href="https://github.com/oblador/react-native-lightbox" rel="external" target="_blank"><strong>react-native-lightbox</strong></a></li>
<li>
<a href="https://github.com/airbnb/react-native-maps" rel="external" target="_blank"><strong>react-native-maps</strong></a></li>
<li>
<a href="https://github.com/sghiassy/react-native-sglistview" rel="external" target="_blank"><strong>SGListView</strong></a></li>
<li>
<a href="https://github.com/jaredpalmer/formik" rel="external" target="_blank"><strong>Formik</strong></a></li>
<li>
<a href="https://github.com/AlexanderZaytsev/react-native-i18n" rel="external" target="_blank"><strong>react-native-i18n</strong></a></li>
<li>
<a href="https://github.com/zo0r/react-native-push-notification" rel="external" target="_blank"><strong>react-native-push-notification</strong></a></li>
<li>
<strong><a href="https://community.algolia.com/react-instantsearch/" rel="external" target="_blank">InstantSearch</a></strong></li>
<li>
<a href="https://github.com/itinance/react-native-fs" rel="external" target="_blank"><strong>react-native-fs</strong></a></li>
<li>
<strong><a href="https://github.com/lwansbrough/react-native-camera" rel="external" target="_blank">react-native-camera</a></strong></li>
<li>
<strong><a href="https://github.com/react-native-community/react-native-video" rel="external" target="_blank">react-native-video</a></strong></li>
<li>
<strong><a href="https://github.com/andpor/react-native-sqlite-storage" rel="external" target="_blank">react-native-</a><a href="https://github.com/andpor/react-native-sqlite-storage" rel="external" target="_blank">sqlite</a><a href="https://github.com/andpor/react-native-sqlite-storage" rel="external" target="_blank">-storage</a></strong></li>
<li>
<a href="https://github.com/thewei/react-native-store" rel="external" target="_blank"><strong>react-native-store</strong></a></li>
<li>
<strong><a href="https://github.com/oney/react-native-webrtc" rel="external" target="_blank">react-native-</a><a href="https://github.com/oney/react-native-webrtc" rel="external" target="_blank">webrtc</a></strong></li>
</ul>


## Web Services

### Database

[Realm](https://realm.io/) real-time database chuyên cho mobile app, bào gồm các tính năng như two-way data sync, offline-first, data push.

Nếu Realm có quá nhiều tính năng ko dùng đến, thì có thể sử dụng [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) đi kèm React Native

### Analytics

[Fabric](https://get.fabric.io/) bộ công cụ tất cả trong một hoặc nếu thích Google Analytics thì có nhiều [thư viện khác](https://github.com/idehub/react-native-google-analytics-bridge) hổ trợ

### Push Notifications

Cái này thì ko có nhiều service lắm, nói cách khác [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (trước đây là Google Cloud Messaging) gần như thống trị, để sử dụng FCM chúng ta sẽ cần tới [react-native-fcm package](https://github.com/evollu/react-native-fcm)

### Code update

[CodePush](https://microsoft.github.io/code-push/) cho phép deploy code mới nhất trực tiếp đến device của user, nó giống như kho trung tâm, nơi chúng ta quăng hết HTML, CSS, Javascript, assets lên đó hết. Thông qua CodePush chúng ta không cần upload những thay đổi lên app store và đợi user chọn update ứng dụng. Sử dụng với đống [thư viện này](https://github.com/Microsoft/react-native-code-push) 
