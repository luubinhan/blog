---
slug: "/2019-02-19-huong-dan-thiet-ke-login-de-dung"
date: "2019-02-19"
title: "Login form tưởng dễ mà ko dễ"
desc: "Review một vài pattern thiết kế login form hay dùng hiện nay"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui"]
---

Bây giờ, người ta hay dùng 1Password, Lastpass, Chrome password manager để tự điền login. Là một website creator *chuyên nghiệp*, chúng ta phải để ý và làm sao đó để user có được trãi nghiệm tốt nhất từ trang đơn giản nhất Login

> Login form: đơn giản nhất có thể, dễ đoán, làm việc tốt với các công cụ quản lý password


## Đặt login form trong modal

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/Screenshot-2019-02-13-22.41.20-1-700x364.png)

Vấn đề của kiểu này

- **Số lượng bước hơi nhiều**. 1- click nút login -> 2. Chọn vào login (nếu form có cả 2 login và sign up) -> 3- điền thông tin rồi submit. Không hiệu quả, nếu một trang hẳn hoi, user có thể truy cập từ trang search, share link, mở ngày password manager
- Không có link cũng khá phiền toái cho các bạn làm support, phải chỉ step-by-step tới login, thay vì quăng luôn cái link sẽ nhanh hơn. Các trình quản lý password cũng ko chạy được một số tính năng, như cái lasspast nếu là popup nó sẽ ko tự động mở trang gọi đăng nhập trực tiếp được.

## Ẩn hết cho gọn ràng

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/ooijScreenshot-2019-02-13-14.54.08-700x606.png)

Cái trang Delta này, lúc đầu ẩn đi cái `Last Name`, sau khi nhập xong user name nó mới kêu nhập thêm last name (thằng này hiếm thấy, nhưng nếu là trang register thì thấy nhiều hơn), chắc là muốn dẹp cho gọn bớt giao diện. Ẩn field như vậy thì trình quản lý password chào thua, nó ko điền tự động được.

## Link vi diệu

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/Screenshot-2019-02-14-09.00.01-700x444.png)

Cái này có thể thấy trên Slack, nhưng thôi lấy trang Notion để ví dụ đi. Nó gửi cái **login code** qua email, user như vậy ko cần nhớ thêm password nào khác ngoài email. Tuy nhiên, vấn đề là

- Một cách nghiêm túc, giải pháp quá nực cười. 1. Nhập email vào. 2. Mở cửa sổ mới, tab mới, thậm chí điện thoại để check mail (khả năng là bạn tiện thể lướt qua luôn mấy cái email khác). 3. Copy cái code trong email. 4. Mở lại trang login để dán code. Holy shit
- Hoàn toàn ko làm việc được với các trình quản lý password. Các bạn ngoài chuyện thiết kế cho nó consistence với ecosystem của bạn, phải biết có những cái bạn cũng phải consistence với thế giới internet chứ.
- Nếu bạn bạn nghĩ mình thông mình hơn toàn bộ user thì bạn chỉ có thể chơi một mình. Đọc lại cuốn Create a from for stupid people nhé.

## Tách trang login thành nhiều trang

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/shopify-1-1-700x700.png)

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/shopify-2-700x700.png)

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/shopify-3-700x689.png)


Cũng như google, họ ko muốn đập vào mặt user quá nhiều thông tin một lúc, tuy nhiên thông tin ở đây thật sự có nhiều tới mức phải tách ra chưa? User phải click 2 bước mới login được.

## Một vài thiết kế form, đơn giản là nó kinh điển và ko có gì để chê

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/Screenshot-2019-02-14-09.43.43-700x767.png)

![Login form tưởng dễ mà ko dễ](http://www.bradfrost.com/wp-content/uploads/2019/02/Screenshot-2019-02-14-09.44.04-700x901.png)


<a target="_blank" rel="noopener noreferrer" href="http://bradfrost.com/blog/post/dont-get-clever-with-login-forms/">don’t get clever with login forms</a>
