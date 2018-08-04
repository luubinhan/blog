---
path: "/2018-06-17-24-tip-de-lam-viec-react-native"
date: "2018-06-17T13:35:13.234Z"
title: "24 tip làm việc với React Native"
desc: ""
tags: ["react", "javascript"]
---

# Debug

## breakpoint

Khi làm việc với IDE như Visual Studio hay Webstorm mà nó khùng khùng không dừng lại ở chổ bạn chỉ định breakpoint, cứ gõ trực tiếp câu lệnh `debugger` vào vị trí đó trong code

## Attach to packager

Khi dùng `console.log` trong lúc dev,  những thông tin log ra sẽ nằm trong console của browser. Có thể thấy thông đó ngay trong IDE nếu sử dụng bộ tools `react-native-tool` của VSCode. Mở tab debug của VSCode và chạy lệnh `Attach to packager` và reload lại app, yêu cầu đóng trình duyệt Chrome, chỉ 1 trong 2 được sử dụng.

## Atom

Bởi vì thằng Atom vốn là trình duyệt nên mở react debug tools ngay trên Atom luôn không cần cài thêm gì cả

## Inspect bridge

Chúng ta điều có một cầu nối (brige) giữa native và js, React Native sử dụng nó để trao đổi qua lại xem có nên update UI và làm một số thứ khác không. Để inspect cái bridge này, thêm đoạn sau vào trong `index.js`

```js
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';
const spyFunction = (msg) => {
  console.log(msg);
}
MessageQueue.spy(spyFunction)
```

Sau đó bên trong console sẽ thấy rất nhiều thông báo kiểu như

```js
Object {type: 0, module: "JSTimers", method: "callTimers", args: Array(1)}
```