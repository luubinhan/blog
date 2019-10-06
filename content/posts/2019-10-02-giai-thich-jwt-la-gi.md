---
slug: "/2019-10-02-giai-thich-jwt-la-gi"
date: "2019-10-02"
title: "Authentication bằng Token - Bài 2: Giới thiệu JWT"
desc: "Phần mềm ngày nay được phát triển theo hướng sử dụng token để làm authentication, để có thể tách chức năng này ra như một phần độc lập, cho phép phần mềm có thể scale ở mức cao nhất"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat"]
---

Trước khi đọc bài này, các bạn hãy đọc bài [Ví dụ thực tế để hiểu rõ hơn cách authentication bằng token](/2019-10-01-giai-thich-authentication-bang-token), để hiểu được cơ chế authentication bằng token, tiếng Việt mình có thể dịch ra là Xác thực tài khoản bằng một string đặc biệt (token là một dạng string được tạo ra theo một cơ chế đặc biệt *bí hiểm*)

## JWT là gì

> TOKEN = một dạng string được tạo ra theo một cơ chế

JWT chính là tên 1 cơ chế để tạo ra token (tức, có nhiều cơ chế khác nữa không chỉ riêng JWT)

JWT viết tắt của JSON Web Token

Cái cơ chế JWT này, nó đã nhét cái gì vào trong string, mời bạn đọc tiếp là rõ

## Cơ chế của JWT

Một request sử dụng JWT sẽ gửi kèm trong header

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o
```

Không cần quan tâm cái **Bearer**, nó là quy định thôi, cái cần quan tâm là đoạn hầm bà lằng phía sau nó

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o
```

Dòm kỹ một tí bạn sẽ thấy nó có 2 dấu `.`, tách cái string này ra làm 3 phần `header.payload.signature`

- **Header**: chứa kiểu dữ liệu, thuật toán mã hóa chữ ký
- **Payload**: một số thông tin như thời gian expire, thông tin user,... tùy thuộc server muốn đưa về cái gì.
- **Signature**: chữ ký điện tử, chứa thông tin để server có thể verify cái JWT này

Chữ ký sẽ được tạo ra ở server, có thể là như thế này (có nhiều cách khác)

```js
var signature = RS256Algorithm(encode64(header) + "." + encode64(payload) , secret);

// secret là một chìa khóa (như password ấy mà) chỉ có server mới biết
```

Còn cái JWT sẽ được cấp bằng thuật toán cao siêu nhất vũ trụ **nối chuỗi**

```js
var jwt = encode64(header) + "." + encode64(payload) + "." + signature;
```

![Authentication bằng Token - Bài 2: Giới thiệu JWT](https://blog.hasura.io/content/images/2019/08/Group.png)

Đọc tiếp

- [Authentication bằng Token - Bài 1: cơ chế authentication bằng token](/2019-10-01-giai-thich-authentication-bang-token)
- [Authentication bằng Token - Bài 2: Giới thiệu JWT](/2019-10-02-giai-thich-jwt-la-gi)
- [Authentication bằng Token - Bài 3: Hướng dẫn authentication với React](/2018-03-14-huong-dan-react-authentication-voi-jwt-redux)
- [Các kiểu tấn công để lấy thông tin user](/2018-03-14-huong-dan-react-authentication-voi-jwt-redux)