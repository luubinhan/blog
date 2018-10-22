---
slug: "/2018-09-17-huong-dan-luu-token-o-dau"
date: "2018-09-17"
title: "So sánh localStorage, sessionStorage, cookie"
desc: "Sự khác nhau giữa 3 cách lưu thông tin xuống trình duyệt"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "security"]
---

<!-- TOC -->

- [Sự khác nhau giữa cookie - localStorage - sessionStorage](#sự-khác-nhau-giữa-cookie---localstorage---sessionstorage)
- [JSON Web Token](#json-web-token)
- [Giải pháp để sử dụng JWT an toàn?](#giải-pháp-để-sử-dụng-jwt-an-toàn)
- [Một số cân nhắc khi sử dụng cookie](#một-số-cân-nhắc-khi-sử-dụng-cookie)

<!-- /TOC -->

# Sự khác nhau giữa cookie - localStorage - sessionStorage

Trước hết, cùng phân biệt sự khác nhau giữa `cookie`, `localStorage`, `sessionStorage`

Cả 3 thằng điều là để lưu lại một ít thông tin trên trình duyệt để sử dụng sau này.

![](https://codepen.io/beaucarnes/pen/KmeRMx/image/large.png)

Khác biệt lớn nhất giữa 3 thằng là *nơi* chúng được lưu và việc có được gửi đi cùng request không.

Nếu đảm bảo được trình duyệt truy cập trang web, ứng dụng web hỗ trợ `localStorage` và `sessionStorage` thì gần như ai cũng thích xài 2 thằng `localStorage` và `sessionStorage` hơn.

Video giải thích
https://www.youtube.com/watch?v=AwicscsvGLg

# JSON Web Token

JSON Web token là một string có 3 phần được phân cách bằng dấu **.**, ví dụ `header.payload.signature`


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiw.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw


Đây là chuỗi đã mã hóa

![](https://techmaster.vn/fileman/Uploads/users/2504/toptal-blog-image-1426676395222.jpeg)

- **Header**: chứa kiểu dữ liệu, thuật toán mã hóa signature
- **Payload**: một số thông tin như thời gian expire, thông tin user,... tùy thuộc server muốn đưa về cái gì.
- **Signature** chứa thông tin để server có thể verify cái JWT này

Signature được tạo ra bằng cách sau ở phía server

```
var signature = RS256Algorithm(encode64(header) + "." + encode64(payload) , secret);
```

Còn cái JWT sẽ được tạo bằng

```
var jwt = encode64(header) + "." + encode64(payload) + "." + signature;
```

Về phía client để sử dụng JWT này, chèn vào header của request

```
Authorization: Bearer DoanJSONWebToken
```

Có thể thấy là việc tạo ra một token giả là vô cùng khó, vì có được cái signature khớp với phía server ko dễ, cái `secret` chỉ có server biết.

# Giải pháp để sử dụng JWT an toàn?

- `secret` phải thật mạnh
- Nếu có những thông tin nhạy cảm trong token, chúng ta cần encrypt cái token bằng JSON Web Encryption
- Không nên gửi đi token bằng HTTP, luôn dùng HTTPS nếu có gửi đi token
- Xác định thời gian expire của token chứ không để nó tồn tại vô thời hạn

# Một số cân nhắc khi sử dụng cookie

Trình duyệt cung cấp thêm một chỗ gọi là HttpOnly cookie, lúc này khi gọi lên server, ví dụ `POST /authenticate` nó sẽ trả về token bên trong header `Set-Cookie`, ví dụ như bên dưới


HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

Access-Control-Allow-Headers: Content-Type

Access-Control-Allow-Methods: GET,POST,PUT

Access-Control-Allow-Origin: https://www.bobank.com

Set-Cookie: session=15d38683-a98f-402d-a373-4f81a5549536; path=/; expires=Fri, 06 Nov 2015 08:30:15 GMT; httponly


Bên trong Set-Cookie bạn sẽ thấy có giá trị `httponly`. Khi gọi request network bình thường nó sẽ không có dùng đến cookie này, muốn có mình phải chỉ định thêm `credentials: include`

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

Vẫn còn thiếu! Khi browser mà gửi đi `XmlHtpRequests` với thông tin `credentials` thì API cũng phải có `Access-Control-Allow-Credentials` trong response. Ví dụ `GET /accounts` trả về từ server


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


Bài viết đầy đủ http://www.redotheweb.com/2015/11/09/api-security.html