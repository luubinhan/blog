---
slug: "/2018-10-21-huong-dan-su-dung-local-storage"
date: "2018-10-21"
title: "Sử dụng localStorage trên website như thế nào"
desc: "Kiến thức căn bản sử dụng localStorage để lưu thông tin cần thiết xuống trình duyệt"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

# Vì sao chúng ta cần localStorage

Nói đến HTTP, nó là dạng kết nối *stateless*, nghĩa là khi đóng một ứng dụng web, lần truy cập sau mọi thứ bị reset lại như ban đầu.

**localStorag**e đơn giản là nó giúp dev chúng ta lưu lại một vài thông tin ở phía trình duyệt của user, để lần sau truy cập ta có thể truy xuất các thông tin này.

# Cookie không đủ xài

Cookie là một dạng file text lưu trên máy tính của user, link đến từng domain. Một vài giới hạn của cookie

Tất cả request đến domain, đều sẽ nhét cái cookie này vào trên `header`

Tối đa có 4KB dung lượng

# Sử dụng localStorage trên trình duyệt hỗ trợ HTML5

Cú pháp để set, get, delete giá trị của `localStorage`

```js
// set
localStorage.setItem(‘tentui’,’luubinhan’);

// get
Var tentui = localStorage.setItem(‘tentui’);
// -> luubinhan

// delete
localStorage.removeItem(‘tentui’);
```

# Làm việc trên object

Vì khi lưu chúng ta chỉ có thể đưa `string` vào trong `localStorage`, để đưa một object

![Làm việc trên object](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1c7f4cfb-16dc-40c8-9b56-644a1792a3c2/console-e1285930679229.png)

```js
Var user = {
	Name: ‘an’,
	Age: ‘18+’,
	Gender: ‘superman’
}
localStorage.setItem(‘user’, JSON.stringify(user));
Console.log(JSON.parse(localStorage.getItem(‘user’));
```

# Thông tin lưu xuống `localStorage`

- Để cache những dữ liệu lớn, tốn thời gian để load.

- Lưu lại trạng thái của giao diện user đã custom, có thể lưu cả một đoạn HTML xuống `localStorage`

Đọc thêm [Lưu token ở đâu?](/2018-09-17-huong-dan-luu-token-o-dau) để so sánh với `sessionStorage` và `cookie`

[Local Storage And How To Use It On Websites](https://www.smashingmagazine.com/2010/10/local-storage-and-how-to-use-it/)