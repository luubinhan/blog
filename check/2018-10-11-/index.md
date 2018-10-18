---
slug: "/2018-10-08-huong-dan-aria-va-su-dung-voi-ecommerce-site"
date: "2018-10-08"
title: "Tổng quát các vấn đề bạn cần quan tâm để bảo mật ứng dụng web"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Quản lý Session](#quản-lý-session)
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
    - [Ứng dụng trong Single Page Application](#ứng-dụng-trong-single-page-application)
- [Công cụ kiểm tra](#công-cụ-kiểm-tra)
  - [Content Security Policy (CSP)](#content-security-policy-csp)
  - [Cross-Origin Resource Sharing (CORS)](#cross-origin-resource-sharing-cors)

<!-- /TOC -->

# Quản lý Session

HTTP = stateless

- Tất cả request từ cùng 1 client không liên quan gì với nhau
- Server không có cách nào để lưu tạm giá trị state
HTTP hổ trợ gởi đi dữ liệu authentication
- Thông qua Header.Authorization
- Gởi thông tin kèm theo tất cả request
- Server không can thiệp gì trên từng session

## Session quản lý bởi server

Server toàn quyền kiểm soát session, kiểm tra tình trạng active, expire, invalid date, xóa session

Đại diện cho cách này là dùng Cookie

- Dữ liệu được truyền qua lại giữa server và client
- Hầu hết các trình duyệt đều hổ trợ, **khó**, nếu sử dụng bên ngoài trình duyệt (ứng dụng điện thoại chẳng hạn)
- Bị tấn công [CSRF](#csrf-cross-site-request-forgery)

Theo mặc định các request sẽ không nên gởi kèm thông tin xác thực tài khoản (ví dụ cookie), nếu cần gởi thêm thông tin này bằng thiết đặt `withCredentials` thủ công, phía server đồng thời cũng gởi lại trong response header giá trị `Access-Control-Allow-Credentials: true`

## Session quản lý ở client

Đưa toàn bộ thông tin session xuống phía client
Server không kiểm soát session nào đang active
Dữ liệu session được gởi đi trên mỗi request

Đại diện cho kiểu này là dùng Token (JWT đang là phổ biến nhất)

- Dữ liệu session được lưu xuống token, server gởi token này qua HTTP header hoặc body của response
- Ứng dụng tự quản lý chuyện gởi server token này
- Trên mỗi request gởi đi nó không tự chèn token vào, do đó nó không thể tấn công bằng [CSRF](#csrf-cross-site-request-forgery)
- Mồi ngon của tấn công [XSS](#cross-site-scripting-xss)

# Một số kiểu tấn công

## CSRF (Cross-Site Request Forgery)

Kiểu tấn công rất phổ biến, nếu thông tin session được gởi qua Cookie. Đại khái là nếu bạn đăng nhập vào facebook.com, sau đó truy cập vào trang web nào đó bị hack rồi, trang bị hack này sẽ gởi một trang có nội dung html mà ở bên trong đó nó dùng thẻ `<img />` để gởi một request thay đổi email lên trang facebook.com

![CSRF (Cross-Site Request Forgery)](https://i.imgur.com/sRrzge5.png)

### Cách ngăn chặn #1: Sử dụng HTML token

Dấu token bên trong HTML, cơ chế bảo mật **Same-Origin** sẽ ngăn chặn các trang khác trên trình duyệt lấy được token.

```html
<form action="submit.php">
  <input type='hidden' name='token' value='Some Data' />
</form>
```

Tuy nhiên cách này sẽ không thích hợp với SPA

### Cách ngăn chặn #2: Origin Header

Với những request như POST/PUT/DELETE, tự động add thêm token vào header

### Cách ngăn chặn #3: dùng transparent token

So sánh giá trị cookie với giá trị header

User gởi đi một request, nó nhận được 1 Session Cookie và 1 CSRF Token Cookie.

```
Set-Cookie: session=...
Set-Cookie: CSRF-Token=123
```

Khi ứng dụng gởi đi một request, javascript sẽ copy cookie và đưa vào header `X-CSRF-Token` chỉ javascript trên trang hiện tại mới truy xuất được thông tin này

```
Cookie: session=...
Cookie: CSRF-Token=123
X-CSRF-Token: 123
```

Server đơn giản là kiểm tra 2 giá trị Cookie: CSRF-Token và X-CSRF-Token có khớp không

## Cross-Site Scripting (XSS)

Hacker sẽ tìm cách để chạy javascript trên trang trình duyệt của user, khi user truy cập vào một trang đã bị nhiễm. Hacker sẽ dùng những cách sau

### Store XSS - lưu đoạn script đó lên trên server

![Cross-Site Scripting (XSS)](https://i.imgur.com/45lHKy2.jpg)

### Reflect XSS

![Reflect XSS](https://i.imgur.com/dbRVLC5.jpg)

## DOM-Based XSS

![Reflect XSS](https://i.imgur.com/29G28Ee.jpg)

Cách phổ biến để phòng chống

- Filter hết mấy đoạn html nguy hiểm (như < >, " ", &) trước khi lưu
- Dùng thư viện để escape context-sensitive trước khi output

### Ứng dụng trong Single Page Application


# Công cụ kiểm tra

## Content Security Policy (CSP)
## Cross-Origin Resource Sharing (CORS)

CORS là một cơ chế sử dụng HTTP header để báo với trình duyệt, ứng dụng chạy trên một tên miền này có quyền truy cập đến resource từ server khác, domain khác, port khác, protocol khác với chổ nó được host (gọi chung là Origin)

Ví dụ ứng dụng trên địa chỉ domain-a.com sử dụng `fetch()` đến domain-b.com/data.json

Mặc định trình duyệt ngăn chặn duyệt truy cập như vậy trừ khi được cho phép từ phía API, server. Theo nguyên tắc chung

- Response trả về từ GET thì có thể cho phép cross-origin
- PUT/DELETE luôn không cho phép cross-origin
- POST thì hạn chế trên từng field

Rất nhiều Server Side Framework hổ trợ cấu hình CORS, tìm hiểu cái bạn đang xài và nắm thật rõ nguyên tắc của nó.

[Getting Single Page Application Security Right by Philippe De Ryck](https://www.youtube.com/watch?v=UFPGOvDrTOk)