---
slug: "2021-01-15-rest-faq-hoi-nhanh-dap-gon-ve-rest"
date: "2021-01-15"
title: "Hỏi nhanh đáp gọn về REST"
desc: "Chuyên mục hỏi nhanh - đáp gọn, nếu bạn chưa biết gì về REST"
tags: ["webpack", "beginner", "medium", "hard"]
canonical_url: false
---

*Một vài đặc tính chính của REST?*

- REST là dạng stateless, server sẽ không có thông tin *status* (nói cách khác là không lưu giữ session)
- Web service chủ yếu dùng POST để thao tác, REST dùng `GET` để truy xuất đến resource

*Các thành phần chính của một http response*

- Status / Response Code
- HTTP Version
- Response header
- Response body

*Các thành phần chính của một http request*

- Method (`GET`, `POST`, `PUT`, `DELETE`)
- URI
- HTTP Version
- Request Header
- Request Body

*Stateless là gì?*

Theo định nghĩa của RESTful, server không lưu trữ bất kỳ thông tin gì về client state, nguyên tắc này gọi là **Stateless**. Phía client gửi thông tin cần thiết trên mỗi request

*Stateless có gì hay?*

Scale khả năng đáp ứng của API lên cho hàng triệu concurrent user bằng cách deploy lên nhiều server  khác nhau. Bất kỳ server nào cũng có thể handle một request từ client vì tất cả thông tin cần thiết điều được gửi từ phía client.

Đơn giản hóa API nhờ vào việc gở bỏ việc đồng bộ logic của *state*

Dễ cache hơn. Phía server có thể quyết định cache hay không một kết quả HTTP request dựa vào thông tin của một request, những request trước đó không ảnh hưởng đến khả năng *cache* của request hiện tại.

*Vài cái status code phổ biến?*

- 201 created
- 204 No content
- 400 Bad request
- 403 Forbidden
- 404 Not found
- 405 Method not allowed
- 409 Conflict
- 500 internal server error

*Cái gì cache được, cái gì không?*

- `GET` cache được
- `POST` mặc định là không, nhưng có thể dùng **expires header** hoặc **cache-control header** nếu muốn bật cache
- `PUT/DELETE` không

*Khác nhau giữa AJAX và REST?*

AJAX là một **kỹ thuật thực hiện phía client** để cập nhập giao diện, trong khi REST là **một kiểu kiến trúc** để truyền và xử lý HTTP Request.

*Keep-Alive là gì và lợi ích của nó?*

Mặc định một HTTP connection sẽ tự đống sau khi request đã complete, nghĩa là phía server sẽ close TCP connection sau khi đã gửi đi response. Để giữ connection này cho nhiều request, dùng thuộc tính `keep-alive` trên header

Ví dụ

```
Message Trace:
-------------------------------------------
~$ curl -I https://www.domain.com/file.html
HTTP/1.1 200 OK
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8
Date: Thu, 15 Jan 2015 16:45:29 GMT
Content-Length: 1845
Keep-Alive: timeout=10, max=20
Server: Apache/2.4.9 (Unix) PHP/5.6.2
-------------------------------------------
```

Lợi ích

- **Giảm tải việc sử dụng CPU**, mỗi lần thiết lập một TCP connection sẽ cần tiêu hao CPU và bộ nhớ.
- **Cải thiện tốc độ trang web**: đáp ứng nhiều file sử dụng cùng một connection cho phép giảm tải và nâng cao tốc độ của ứng dụng
- **HTTPS**: muốn dùng keep-alive bắt buộc phải là HTTPS, cũng có thể xem là một ưu điểm cho vấn đề bảo mật


