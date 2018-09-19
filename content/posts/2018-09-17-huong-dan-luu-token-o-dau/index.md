---
slug: "/2018-09-17-huong-dan-luu-token-o-dau"
date: "2018-09-17"
title: "Lưu token ở đâu?"
desc: "Một ngày đẹp trời mình tự hỏi, nếu token là một string được lưu ở localStorage, liệu có an toàn không khi việc copy đoạn token này từ trình duyệt là vô cùng đơn giản? Liệu lưu trữ cái token ở đâu sẽ hợp lý?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

# Sự khác nhau giữa cookie - localStorage - sessionStorage

Trước hết, cùng phân biệt sự khác nhau giữa `cookie`, `localStorage`, `sessionStorage`

Cả 3 thằng điều là để lưu lại một ít thông tin trên trình duyệt để sử dụng sau này.

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

Khác biệt lớn nhất giữa 3 thằng là *nơi* chúng được lưu và việc có được gởi đi cùng request không.

Nếu đảm bảo được trình duyệt truy cập trang web, ứng dụng web hổ trợ `localStorage` và `sessionStorage` thì gần như ai cũng thích xài 2 thằng `localStorage` và `sessionStorage` hơn.

Video giải thích
https://www.youtube.com/watch?v=AwicscsvGLg

Mình từng nghĩ việc lưu ở đâu cho an toàn, thật ra việc lưu ở đâu phía client không ảnh hưởng nhiều đến việc gởi đi bằng cách nào. Tại sao? Thử tìm hiểu kiểu token đang được sử dụng phổ biến hiện này JSON Web token.

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

Có thể thấy là việc tạo ra một token giả là vô cùng khó, vì có được cái signature khớp với phía server ko dễ, cái `secret` chỉ có server biết.

# Giải pháp để sử dụng JWT an toàn?

- `secret` phải thật mạnh
- Nếu có những thông tin nhạy cảm trong token, chúng ta cần encrypt cái token bằng JSON Web Encryption
- Không nên gởi đi token bằng HTTP, luôn dùng HTTPS nếu có gởi đi token
- Xác định thời gian expire của token chứ không để nó tồn tại vô thời hạn

Chúng ta nghe rất nhiều bàn luận xung quanh session cookie và access token. Mình đã từng lẫn lộn các khái niệm này. **Session cookie** là một đoạn thông tin của user lưu ở **cookie** trình duyệt, sẽ được gởi kèm teo request lên server, `cookie` là nơi chứa cái *session cookie*, **cookie** cũng có thể chứa được **access token**

Như vậy, để an toàn đừng dùng cookie của http, dùng cookie của **https**, đừng lưu access token trong `localStorage`, nó có thể được sử dụng để tấng công XSS

Nếu không muốn javascript được đụng vô cookie, trình duyệt cung cấp thêm một chổ gọi là HttpOnly cookie, ủa vậy sao nhét vào trong cookie này? Lúc này khi gọi lên server, ví dụ `POST /authenticate` nó sẽ trả về token bên trong header `Set-Cookie`, ví dụ như bên dưới

```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Origin: https://www.bobank.com
Set-Cookie: session=15d38683-a98f-402d-a373-4f81a5549536; path=/; expires=Fri, 06 Nov 2015 08:30:15 GMT; httponly
```

Bên trong Set-Cookie bạn sẽ thấy có giá trị `httponly`, nó sẽ khiến javascript ở client không thể nào lấy được thông tin này. Khi gọi AJAX bình thường nó sẽ không có dùng đến cookie này, muốn có mình phải chỉ định thêm `credentials: include`

```js
/**
 * @return {Promise}
 */
function getAccounts() {
    return fetch('https://api.bobank.com/accounts', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },
        credentials: 'include' // <= Thay đổi ở đây
    }).then(function(response) {
        return response.json();
    })
}
```

Nếu không sử dụng `fetch` mà dùng `XmlHttpRequest`, thì thuộc này có tên là `withCredentials`

```js
function getAccounts() {
  return new Promise(function(fulfill, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://api.bobank.com/accounts', true); // force XMLHttpRequest2
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.setRequestHeader('Accept', 'application/json');
    req.withCredentials = true; // đưa cookies vào nhé
    req.onload = function()  {
        // lưu token rồi redirect
        let json;
        try {
          json = JSON.parse(req.responseText);
        } catch (error) {
          return reject(error);
        }
        resolve(json);
    };
    req.onerror = reject;
  });
}
```

Vẫn còn thiếu! Khi browser mà gởi đi `XmlHtpRequests` với thông tin `credentials` thì API cũng phải có `Access-Control-Allow-Credentials` trong response. Ví dụ `GET /accounts` trả về từ server

```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Origin: https://www.bobank.com
Set-Cookie: session=15d38683-a98f-402d-a373-4f81a5549536; path=/; expires=Fri, 06 Nov 2015 09:30:15 GMT; httponly
[
  { id: 456346436, ... }
]
```

Bài viết đầy đủ http://www.redotheweb.com/2015/11/09/api-security.html