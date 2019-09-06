---
slug: "/2019-09-06-gioi-thieu-can-ban-ve-cors"
date: "2019-08-06"
title: "Làm quen khái niệm CORS của Web"
desc: "Bài này khá căn bản và cần thiết cho bạn nào chưa biết gì về CORS, nghe ai đó nói về từ khóa ghê gớm này mà ko biết nó là gì, không để cập đến vấn đề setup làm sao để chạy CORS trên server - vì mình ko biết code phía server đâu"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Access-Control-Allow-Origin](#access-control-allow-origin)
- [Các kiểu request CORS](#các-kiểu-request-cors)
  - [Request đơn thuần như `GET`, `POST`, `HEAD`](#request-đơn-thuần-như-get-post-head)
  - [Preflight request](#preflight-request)

<!-- /TOC -->

Cross-Origin Resource Sharing (CORS) là một cơ chế sử dụng thông tin trên HTTP header để báo với trình duyệt, cho phép ứng dụng web chạy từ *nhà* này, có quyền truy xuất resource từ 1 **nhà** khác (2 thằng gọi là khác nhà khi khác tên miền, khác port, khác giao thức http và https)

Ví dụ một request cross-origin: nhà bạn ở http://domain-a.com dùng javascript gửi request bên nhà http://api.domain-b.com/data.json

Vì lý do bảo mật, trình duyệt sẽ không cho thực hiện các request cross-origin như vậy. Nghĩa là các ứng dụng web gọi API chỉ có thể sử dụng resource từ cùng *nhà* (same-origin policy là từ chuẩn, nếu bạn cần research thêm), trừ khi response từ *nhà* khác đó cho phép gọi CORS (bằng cách thêm một số thông tin trên header)

Các request có thể dùng CORS

- Gửi một network request bằng `fetch`
- Web font, hoặc load `@font-face` trong CSS
- WebGL texture
- Image, video

Khi config thành công trên server, server sẽ trả thêm một số thông tin trên header để trình duyệt biết và cấp phép chạy

## Access-Control-Allow-Origin

Chỉ định các tên miền nào được phép truy cập,  ví dụ để cho phép tất cả tên miền có thể gọi tới

```json
Access-Control-Allow-Origin: *
```

Cho phép 1 tên miền cụ thể

```json
Access-Control-Allow-Origin: https://example.com
```

## Các kiểu request CORS

Có 2 kiểu CORS request: các request *đơn thuần*, và các request **preflight**, 2 cái này sẽ do trình duyệt xác định sử dụng cái nào, là một developer chúng ta cũng thật sự không cần quan tâm.

### Request đơn thuần như `GET`, `POST`, `HEAD`

Các request được trình duyệt xếp loại *đơn thuần* là
GET, POST, HEAD
Sử dụng [CORS safe -listed header](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)
Khi sử dụng `Content-Type`, chỉ các giá trị sau là được cho phép `application/x-www-form-urlencoded`, `multipart/form-data`,  `text/plain`
Không có các listener nào được đăng ký trên `XMLHttpRequestUpload`
Không sử dụng [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

### Preflight request

Đơn giản là ngược lại các trường hợp ở trên thì sẽ là dạng preflight, trình duyệt sẽ gửi đi một request ở phương thức `options` để xác định server có hỗ trợ ko trước khi thực sự gửi đi request chính.

Đối với loại preflight request, ngoài việc chuyển phương thức sang `options`, nó sẽ set thêm một số thuộc tính trên header

`Access-Control-Request-Method`:  phương thức GET hay POST nên được sử dụng
`Access-Control-Request-Headers`: kiểu header muốn sử dụng
`Origin`: nơi gửi request

Ví dụ

```json
# Request
curl -i -X OPTIONS localhost:3001/api/ping \
-H 'Access-Control-Request-Method: GET' \
-H 'Access-Control-Request-Headers: Content-Type, Accept' \
-H 'Origin: http://localhost:3000'
```

Chúng ta có thể tạm dịch nó ra ngôn ngữ tự nhiên là “Tao muốn thực hiện một request dạng GET với `content-type` và `Accept` header từ địa chỉ localhost:3000 có được ko?”

Kết quả trả về từ server sẽ cho phép trình duyệt tiến hành tiếp, hay dừng lại ở đó. Response từ server sẽ như thế này

```json
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Vary: Access-Control-Request-Headers
Access-Control-Allow-Headers: Content-Type, Accept
Content-Length: 0
Date: Fri, 05 Apr 2019 11:41:08 GMT
Connection: keep-alive
```


<a target="_blank" rel="noopener noreferrer" href="https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/
">📜 CORS Tutorial: A Guide to Cross-Origin Resource Sharing</a>
