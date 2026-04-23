---
slug: "2024-12-27-giai-thich-peer-dependencies"
date: "2024-12-27"
title: "Giải thích peerDependencies"
desc: "Cùng tìm hiểu công dụng của peerDependencies"
cover: ""
tags: ["hoc-thuat", "medium", "javascript"]
---

Trước tiên chúng ta cần hiểu vì sao peerDependencies lại tồn tại. Ví dụ chúng ta có thư viện `react-datapicker` để sử dụng thư viện này, chúng ta sẽ cần có react và react-dom, vì nó build bằng React! Tác giả của thư viện `react-datepicker` làm thế nào để báo với chúng ta là thư viện của họ cần dùng react nếu họ ko thích đặt tên có prefix là react? Họ khai báo nó bên trong `peerDependencies`

Câu hỏi là vì sao ko khai báo luôn trong `dependencies` mà là `peerDependencies`?

Khi khai báo trong `dependencies` thì version react sẽ phải chính xác là version đã khai báo. Và tác giả không `react-datepicker` không thể nào ép tất cả những người đang dùng thư viện phải dùng đúng version với `react-datepicker` được, không những gì người ta sẽ còn cài rất nhiều thư viện khác, không thể nào ép buộc chuyện thống nhất một version như vậy được.

Và nếu `react-datepicker` khai báo `dependencies` là version 16.9.0 và chúng ta thì đang dùng react 16.20.1 thì npm sẽ cài cả 2 version react luôn

Đây là một vấn đề rất phổ biến trong việc quản lý version một npm package, trong ví dụ trên chúng ta có 3 vấn đề sau

- React dependencies bị double size
- Hooks rule sẽ ‘chửi’ vào mặt chúng ta khi chúng sử dụng 2 version react
- react-datepicker có thể chỉ chạy được với một version nhất định nào đó, sử dụng một API nào đó chỉ có trong 16.9.0

Có một vấn đề quan trọng chúng ta cần đề cập trước khi đi đến hướng giải quyết là `react-datepicker` hoàn toàn chạy tốt với các version > 16.9.0, thậm chí là 17, 19

Giờ thì chúng ta nói đến `peerDependencies`. Khi chạy `npm install` nó ko cài đặt package khai báo bên trong `peerDependencies` , trong ví dụ là react, thư viện `react-datepicker` nó sẽ dùng đồ có sẵn trong `<project>/node_modules` , tức là package react với version mà chúng ta đã tự khai báo, chứ ko sử dụng trong `<project >/node_modules/react-datepicker/node_modules`

Và để an toàn nhất, người viết thư viện `date-picker` cũng thường sẽ khai báo dạng version như sau

```jsx
"peerDependencies" {
	"react": ">=16.8.0 || < 18",
	"react-dom": ">=16.8.0 || < 18"
}
```

Bằng cách trên, khi chung ta chạy `npm i` nó sẽ quăng ngay cảnh báo về việc không tương thích nếu có

Đứng về phía người viết library `react-datepicker` họ vẫn phải khai báo `react` và `react-dom` trong `devDependencies`

Nói một cách ngắn gọn nhất, `peerDependencies` chúng ta phải tự cài trong app, library nó ko tự cài