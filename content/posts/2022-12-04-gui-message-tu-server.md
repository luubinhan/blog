---
slug: "2022-12-04-gui-message-tu-server"
date: "2022-12-04"
title: "Gửi message từ server nhưng không dùng WebSocket"
desc: "Tìm hiểu API của JS để gửi và nhận message từ server"
tags: ["javascript","hoc-thuat"]
---

Nếu cần gửi một message từ server đến client, thay vì phía client gửi request tới server, Javascript có một cơ chế đã được hỗ trợ từ rất lâu, là dùng `EventSource`,  nó còn có trước khi có `WebSocket`. Tất nhiên nó cũng những hạn chế nhất định so với WebSocket. Cụ thể

| WebSocket  | EventSource |
|--|--|
| Hai chiều | Một chiều từ server |
| Binary và text | Chỉ text |
| WebSocket Protocal | HTTP |

`EventSource` là một lựa chọn phù hợp cho những trường hợp đơn giản, chưa cần dùng đến đao to búa lớn như `WebSocket`. Ví dụ giá vàng, giá xăng cần cập nhập, những dữ liệu mà chỉ cần đi một chiều từ server -> client. `EventSource` còn hỗ trợ *auto-reconnect* cũng rất tiện (WebSocket phải chạy bằng *cơm*)

## Nhận message

Để nhận một message, chúng ta cần tạo một instance `new EventSource(url)`, trình duyệt tự quản lý thiết lập kết nối đến `url` và lắng nghe các event gửi đến.

Server sẽ trả về status 200 và header `Content-Type: text/event-stream`, message được gửi đến sẽ theo định dạng cố định

```bash
data: Message 1

data: Message 2

data: Message 3
data: dòng 2 của Message 3
```

Nội dung sẽ nằm sau từ khóa `data:`, các message sẽ được tách biệt bằng 2 dấu xuống dòng `\n\n`, nếu chỉ có một dấu `\n` có nghĩa là message này gồm 2 dòng.

Trong thực tế, không nên tách message ra 2 dòng và luôn gửi message theo một dòng duy nhất

```json
data:  {"user":"John","message":"First line_\n_ Second line"}
```

Để đọc message này

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
};

// hoặc eventSource.addEventListener('message', ...)
```

## Cross-origin request

Tương tự như `fetch`, chúng ta có thể lắng nghe trên một message cross-origin

```js
let source = new EventSource("https://another-site.com/events");
```

Để gửi thêm thông tin `credential`

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

## Reconnect

Như đã nói, `EventSource` tự động reconnect nếu bị đứt connection giữa chừng, server cũng có thể thông báo nên chờ bao lâu trước khi thử lại bằng `retry:`

```bash
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

Nếu server không muốn trình duyệt tự động reconnect, server có thể trả status 204, hoặc ở phía client chúng ta *cưỡng chế* luôn `eventSource.close()`

## Message Id

Để giải quyết vấn đề mất message giữa chừng do lỗi connect và không biết được message nào đã nhận và chưa, mỗi message có thể có thêm field `id` để dễ xác định

```bash
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

## Connection Status

Bên trong object `EventSource` sẽ có property `readyState`, nó chứa *status* của connection

- EventSource.CONNECTING = 0
- EventSource.OPEN = 1
- EventSource.CLOSED = 2

## Event type

Có 3 loại event có thể được gửi về từ `EventSource`

- `message`: khi có message gửi về
- `open`: khi connection đã open
- `error`: lỗi không thể connect đến server

Server cũng có thể gửi thêm các kiểu event tự định nghĩa khác ngoài các event có sẵn

```bash
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

Để lắng nghe những custom event như vậy

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

https://javascript.info/