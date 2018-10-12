---
slug: "/2018-10-08-huong-dan-aria-va-su-dung-voi-ecommerce-site"
date: "2018-10-08"
title: ""
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

# Session Management

HTTP = stateless
- Tất cả request từ cùng 1 client không liên quan gì với nhau
- Server không có cách nào để lưu tạm giá trị state
HTTP hổ trợ gởi đi dữ liệu authentication
- Thông qua Header.Authorization
- Gởi thông tin kèm theo tất cả request
- Server không can thiệp gì trên từng session

## Server-side session

Server toàn quyền kiểm soát session, kiểm tra tình trạng active, expire, invalid date, xóa session

## Client-side session

Đưa toàn bộ thông tin session xuống phía client
Server không kiểm soát session nào đang active
Dữ liệu session được gởi đi trên mỗi request

# Một số kiểu tấn công

## CSRF (Cross-Site Request Forgery)

Kiểu tấn công rất phổ biến, nếu thông tin session được gởi qua Cookie. Đại khái là nếu bạn đăng nhập vào facebook.com, sau đó truy cập vào trang web nào đó bị hack rồi, trang bị hack này sẽ gởi một trang có nội dung html mà ở bên trong đó nó dùng thẻ `<img />` để gởi một request thay đổi email lên trang facebook.com

![CSRF (Cross-Site Request Forgery)](https://i.imgur.com/sRrzge5.png)

Cách ngăn chặn #1: Sử dụng HTML token,

Dấu token bên trong HTML, cơ chế bảo mật **Same-Origin** sẽ ngăn chặn các trang khác trên trình duyệt lấy được token.

```html
<form action="submit.php">
  <input type='hidden' name='token' value='Some Data' />
</form>
```

Tuy nhiên cách này sẽ không thích hợp vơi SPA

Cách ngăn chặn #2: Origin Header

Với những request như POST/PUT/DELETE, tự động add thêm token vào header

Cách ngăn chặn #3: dùng transparent token

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


# Những điều cần làm

# Công cụ kiểm tra


## Content Security Policy (CSP)
## Cross-Origin Resource Sharing (CORS)