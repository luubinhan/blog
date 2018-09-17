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

# Web Storage (local storage / session storage)

Trong đa số các trường hợp, lưu JWT trong local storage của trình duyệt sẽ hoạt động tốt.

Sau khi đăng nhập thành công, chúng ta sẽ nhận được một Access Token JWT, ở phía client lưu nó xuống `localStorage` hoặc `sessionStorage`, mình chắc không cần giải thích sự khác nhau của 2 thằng này

**Nhược điểm của dùng Web Storage**

- Không giống cookies, local storage chỉ có thể truy cập từ một domain cụ thể và không thể truy cập từ domain khác, kể cả sub-domain
- Web storage có thể được truy cập bằng javascript, có thể bị lợi dụng để tấn công cross-site scripting (XSS)
- Lập trình viên phải luôn đảm bảo gởi đi JWT bằng HTTPS, không bao giờ được dùng HTTP

# Cookies

Chúng ta cũng có thể lưu JWT bằng cookie

Vòng đời có một cookie có thể tùy biến theo chúng ta lựa chọn

- Cookie sẽ bị xóa sau khi đóng trình duyệt (session cookie)
- Kiểm tra ở phía server, có thể thêm expiration data hoặc theo trình duyệt
- Có thể không bị xóa sau khi đóng trình duyệt, chỉ có expiration date
- Cookie có thể truy cập bằng javascript ở client, hoặc code server. Nếu thay đổi giá trị `httpOnly` chỉ có server mới được truy cập.

**Nhược điểm của dùng Cookie**

- Kích thước lớn nhất của cookie là 4kb, nếu muốn thêm một số thông tin vào trong token thì sẽ không được.
- Có thể bị dùng để tấn công bằng cross-site request forgery (CSRF hay XSRF). Có thể chặn một phần CSRF nếu kiểm tra HTTP `Referer` và `Origin`
- Khi hiện thực cho ứng dụng cần truy cập cross-domain