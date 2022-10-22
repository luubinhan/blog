---
slug: "/2018-11-18-mot-so-van-de-can-quan-tam-de-bao-mat-web"
date: "2018-11-18"
title: "Bảo mật web - Một số kiểu tấn công"
desc: "Tổng quát các vấn đề bạn cần quan tâm để bảo mật ứng dụng web"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Cách quản lý Session hiện tại](#cách-quản-lý-session-hiện-tại)
  - [Session quản lý bởi server](#session-quản-lý-bởi-server)
  - [Session quản lý ở client](#session-quản-lý-ở-client)
- [Một số kiểu tấn công](#một-số-kiểu-tấn-công)
  - [CSRF (Cross-Site Request Forgery)](#csrf-cross-site-request-forgery)
    - [Cách ngăn chặn #1: Sử dụng HTML token](#cách-ngăn-chặn-1-sử-dụng-html-token)
    - [Cách ngăn chặn #2: Origin Header](#cách-ngăn-chặn-2-origin-header)
    - [Cách ngăn chặn #3: dùng transparent token](#cách-ngăn-chặn-3-dùng-transparent-token)
  - [Cross-Site Scripting (XSS)](#cross-site-scripting-xss)
    - [Store XSS - lưu đoạn script đó lên trên server](#store-xss---lưu-đoạn-script-đó-lên-trên-server)
    - [Reflect XSS](#reflect-xss)
    - [DOM-Based XSS](#dom-based-xss)
- [Công cụ kiểm tra](#công-cụ-kiểm-tra)

<!-- /TOC -->

## Cách quản lý Session hiện tại

HTTP = stateless

- Tất cả request từ cùng 1 client không liên quan gì với nhau
- Server không có cách nào để lưu tạm giá trị state
HTTP hỗ trợ gửi đi dữ liệu authentication
- Thông qua **Header.Authorization**
- Gửi thông tin kèm theo tất cả request
- Server không can thiệp gì trên từng session

### Session quản lý bởi server

Server toàn quyền kiểm soát session, kiểm tra tình trạng active, expire, invalid date, xóa session

Đại diện cho cách này là dùng Cookie

- Dữ liệu được truyền qua lại giữa server và client
- Hầu hết các trình duyệt đều hỗ trợ, **khó**, nếu sử dụng bên ngoài trình duyệt (ứng dụng điện thoại chẳng hạn)
- Bị tấn công [CSRF](#csrf-cross-site-request-forgery)

Theo mặc định các request sẽ không nên gửi kèm thông tin xác thực tài khoản (ví dụ cookie), nếu cần gửi thêm thông tin này bằng thiết đặt `withCredentials` thủ công, phía server đồng thời cũng gửi lại trong response header giá trị `Access-Control-Allow-Credentials: true`

### Session quản lý ở client

Đưa toàn bộ thông tin session xuống phía client
Server không kiểm soát session nào đang active
Dữ liệu session được gửi đi trên mỗi request

Đại diện cho kiểu này là dùng Token (JWT đang là phổ biến nhất)

- Dữ liệu session được lưu xuống token, server gửi token này qua HTTP header hoặc body của response
- Ứng dụng tự quản lý chuyện gửi server token này
- Trên mỗi request gửi đi nó không tự chèn token vào, do đó nó không thể tấn công bằng [CSRF](#csrf-cross-site-request-forgery)
- Mồi ngon của tấn công [XSS](#cross-site-scripting-xss)

## Một số kiểu tấn công

### CSRF (Cross-Site Request Forgery)

Kiểu tấn công rất phổ biến, nếu thông tin session được gửi qua Cookie. Đại khái là nếu bạn đăng nhập vào facebook.com, sau đó truy cập vào trang web nào đó bị hack rồi, trang bị hack này sẽ gửi một trang có nội dung html bên trong đó nó dùng một thẻ nào đó (như `<img />`, `<iframe/>`, `<link/>`, `<bgsound/>`, `<background />`) để gửi một request thay đổi email lên trang facebook.com

```html
<iframe height="0" width="0" src="facebook.com/api/1/destroy">
<link ref="stylesheet" href="facebook.com/api/1/destroy" type="text/css"/>
<bgsound src="facebook.com/api/1/destroy"/>
<background src="facebook.com/api/1/destroy"/>
<img height="0" width="0" src="facebook.com/api/1/destroy"/>
```

![CSRF (Cross-Site Request Forgery)](https://i.imgur.com/sRrzge5.png)

#### Cách ngăn chặn #1: Sử dụng HTML token

Dấu token bên trong HTML, ví dụ như nhét nó trong form, server khi nhận được sẽ kiểm tra lại để chắc chắn là token này hợp lệ 

```html
<form action="submit.php">
  <input type='hidden' name='CSRFToken' value='OWY4NmQwODE4ODRjN2Q2NTlhMmZlYWEwYzU1YWQwMTVhM2JmNGYxYjJiMGI4MjJjZDE1ZDZMGYwMGEwOA==' />
</form>
```

Tuy nhiên cách này sẽ không thích hợp với SPA, vì yêu cầu phía server phải quản lý session của từng user đang login

#### Cách ngăn chặn #2: Origin Header

Với những request như POST/PUT/DELETE, tự động thêm Origin Header để xác thực yêu cầu

![Cách ngăn chặn #2: Origin Header](https://i.stack.imgur.com/ymk6L.png)

![Cách ngăn chặn #2: Origin Header](https://i.imgur.com/wXzd41T.jpg)

#### Cách ngăn chặn #3: dùng transparent token

So sánh giá trị cookie với giá trị header

User gửi đi một request, nó nhận được 1 Session Cookie và 1 CSRF Token Cookie.

```
Set-Cookie: session=...
Set-Cookie: CSRF-Token=123
```

Khi ứng dụng gửi đi một request, javascript sẽ copy cookie và đưa vào header `X-CSRF-Token` chỉ javascript trên trang hiện tại mới truy xuất được thông tin này

```
Cookie: session=...
Cookie: CSRF-Token=123
X-CSRF-Token: 123
```

Server đơn giản là kiểm tra 2 giá trị `Cookie: CSRF-Token` và `X-CSRF-Token` có khớp không

### Cross-Site Scripting (XSS)

Hacker sẽ tìm cách để chạy javascript trên trang trình duyệt của user, khi user truy cập vào một trang đã bị hack. Hacker sẽ dùng những cách sau

#### Store XSS - lưu đoạn script đó lên trên server

![Cross-Site Scripting (XSS)](https://i.imgur.com/45lHKy2.jpg)

#### Reflect XSS

![Reflect XSS](https://i.imgur.com/dbRVLC5.jpg)

#### DOM-Based XSS

![Reflect XSS](https://i.imgur.com/29G28Ee.jpg)

Cách phổ biến để phòng chống

- Filter hết mấy đoạn html nguy hiểm (như < >, " ", &) trước khi lưu
- Dùng thư viện để escape context-sensitive trước khi output

## Công cụ kiểm tra

Một số trang online để check

https://securityheaders.com/

https://sitecheck.sucuri.net/

https://www.ssllabs.com/ssltest/

https://quttera.com/

https://detectify.com/

https://app.webinspector.com/

https://app.upguard.com/webscan


<a href="https://www.youtube.com/watch?v=UFPGOvDrTOk" target="_blank" rel="noopener noreferrer">Getting Single Page Application Security Right by Philippe De Ryck</a>