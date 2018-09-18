---
slug: "/2018-09-17-huong-dan-luu-token-o-dau"
date: "2018-09-17"
title: "Lưu token ở đâu?"
desc: "Với ứng dụng xác thực bằng token, hướng dẫn này sẽ giải thích việc lưu token ở đâu cho an toàn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Để lựa chọn lưu token ở đâu, mình cũng phân biệt sự khác nhau giữa `cookie`, `localStorage`, `sessionStorage`

Cả 3 thằng điều là để lưu lại một ít thông tin trên trình duyệt để sử dụng sau này.

# Sự khác nhau giữa

<table class="table table-striped">
  <thead class="thead-inverse">
    <tr>
      <th></th>
      <th>Cookies</th>
      <th>localStorage</th>
      <th>sessionStorage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Dung lượng tối đa</th>
      <td>4kb</td>
      <td>10mb</td>
      <td>5mb</td>
    </tr>
    <tr>
      <th scope="row">Trình duyệt</th>
      <td>HTML4 / HTML 5</td>
      <td>HTML 5</td>
      <td>HTML 5</td>
    </tr>
    <tr>
      <th scope="row">Truy cập từ</th>
      <td>Bất kỳ cửa số trình duyệt nào</td>
      <td>Bất kỳ cửa số trình duyệt nào</td>
      <td>Cùng một tab</td>
    </tr>
    <tr>
      <th scope="row">Hết hạn</th>
      <td>Set tay</td>
      <td>Không bao giờ</td>
      <td>Khi đống Tab</td>
    </tr>
    <tr>
      <th scope="row">Chổ lưu</th>
      <td>Browser và server</td>
      <td>Browser thôi</td>
      <td>Browser thôi</td>
    </tr>
    <tr>
      <th scope="row">Gởi đi cùng request</th>
      <td>Có</td>
      <td>Không</td>
      <td>Không</td>
    </tr>
  </tbody>
</table>

Phần quan trọng nhất để phân biệt giữa 3 thằng là nơi chúng được lưu và việc có được gởi đi cùng request không.

Nếu đảm bảo được trình duyệt truy cập trang web, ứng dụng web hổ trợ `localStorage` và `sessionStorage` thì gần như ai cũng thích xài 2 thằng localStorage và sessionStorage hơn.

Video giải thích
https://www.youtube.com/watch?v=AwicscsvGLg

# JSON Web Token

JSON Web token là một string có 3 phần được phân cách bằng dấu **.**, ví dụ `header.payload.signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw
```

Đây là chuỗi đã mã hóa

![](https://techmaster.vn/fileman/Uploads/users/2504/toptal-blog-image-1426676395222.jpeg)

- Header: chứa kiểu dữ liệu, thuật toán mã hóa signature
- Payload: một số thông tin như thời gian expire, thông tin user,... tùy thuộc server muốn đưa về cái gì.
- Signature chứa thông tin để server có thể verify cái JWT này

Signature được tạo ra bằng cách sau ở phía server

```php
var signature = RS256Algorithm(encode64(header) + "." + encode64(payload) , secret);
```

Còn cái JWT sẽ được tạo bằng

```php
var jwt = encode64(header) + "." + encode64(payload) + "." + signature;
```

Về phía client để sử dụng JWT này, chèn vào header của request

```js
Authorization: Bearer DoanJSONWebToken
```

Có thể thấy là việc tạo ra một token giả là vô cùng khó, vì có được cái signature khớp với phía server ko dễ, cái `secret` chỉ có server biết