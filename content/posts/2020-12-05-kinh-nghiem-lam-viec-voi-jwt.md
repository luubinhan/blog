---
slug: "2020-12-05-kinh-nghiem-lam-viec-voi-jwt"
date: "2020-12-05"
title: "Ghi chú về JWT"
desc: "JWT đã không còn mới lạ ở năm 2020, tóm tắt một những vấn đề chính cần quan tâm khi làm việc với JWT"
tags: ["hoc-thuat", "web", "javascript"]
canonical_url: false
---

<!-- TOC -->

- [Cơ bản, cần nắm](#cơ-bản-cần-nắm)
- [Phía Backend](#phía-backend)
- [Phía client dùng SPA](#phía-client-dùng-spa)
    - [So sánh định danh bằng Session và Token](#so-sánh-định-danh-bằng-session-và-token)
    - [Vấn đề với XSS và CSRF khi dùng JWT](#vấn-đề-với-xss-và-csrf-khi-dùng-jwt)
    - [Có cần HTTPS với JWT?](#có-cần-https-với-jwt)
    - [Khi nào không nên dùng JWT](#khi-nào-không-nên-dùng-jwt)
    - [Thư viện ngon](#thư-viện-ngon)

<!-- /TOC -->

## Cơ bản, cần nắm

JWT có thể nhớ nôm na là một JSON đã **encrypt** => gọi là *token*, chứa thông tin giúp backend có thể định danh bạn là ai, bạn có quyền gì

[![img](https://res.cloudinary.com/practicaldev/image/fetch/s--Lmyom2tH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropbox.com/s_1048F41B3AC814B927887FF3C86602B940107555916A37D85A0BACB9135A34EA_1606545347515_jwt.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Lmyom2tH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropbox.com/s_1048F41B3AC814B927887FF3C86602B940107555916A37D85A0BACB9135A34EA_1606545347515_jwt.png)

Nguyên nhân ra đời của JWT là để giải quyết bài toán **định danh** trong *microservice*

## Phía Backend

Ở phía Backend có 2 vấn đề chính cần quan tâm

1. Tạo như thế nào
2. Validate ra làm sao

Việc tạo, sử dụng những thư viện có sẵn ([jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) nếu bạn đang dùng Node.js), Ưchỉ cần quan tâm những giá trị *đã*  hoặc *muốn* nhét thêm trong JSON

Một trường tối quan trong trong JSON là `expiresIn`, cho phép token sẽ expire sau bao lâu.

Việc validate, thì dùng thư viện nào tạo token, nó sẽ có luôn phương thức để kiểm tra token đó có hợp lệ không.

## Phía client dùng SPA

### So sánh định danh bằng Session và Token

Giống nhau

1. Chức năng như nhau, để định danh
2. Sau khi định danh ở Backend, nó trả về token cho client
3. Gửi kèm token trên khi muốn dùng một service ở phía backend

Khác nhau

- Session thì dữ liệu và trạng thái đăng nhập của user được lưu ở bộ nhớ phía server. Không phù hợp với RESTful APIs, mỗi service đều phải `stateless`, anh là ai, anh từ đâu tới đều phải đưa chứng minh nhân dân chứ chúng tôi không ai rảnh đầu ngồi nhớ mặt hết những ai ra vào service.
- Session sẽ lưu thông tin về user ở **cookie** của trình duyệt, vấn đề là các service có thể khác domain, trình duyệt không biết và sẽ không đưa thông tin cookie cho các domain khác

### Vấn đề với XSS và CSRF khi dùng JWT

Hết sức thận trọng khi xử lý JWT trong code, token là mồi ngon cho XSS và CSRF

Tuyệt đối không dùng local storage để lưu JWT trên phía frontend. Localstorage có thể được truy xuất bằng JS cùng domain, attacker có thể dùng điểm này để inject thêm mã để lấy local storage. (XSS)

Vì cookie được gửi trên tất cả *request*, attacker có thể lợi dụng điểm này để gửi một link yêu cầu đổi password (CSRF)

Nếu không còn lựa chọn nào khác, lưu trong bộ nhớ, lưu ý sẽ mất khi user refresh.

Cookie thật ra không phải là không dùng được, nhưng dùng thì phải kiểm tra

- Dùng `httpOnly` để cookie không thể được truy cập thông qua JS
- Dùng `SameSite` để hạn chế  cấp phát cookie đi các domain chỉ định. Nếu phải đưa qua nhiều domain khác nhau, dùng *Lax*, nó cho phép gọi truyền cookie khác domain nếu là `GET`

Nếu muốn 100% an toàn tuyệt đối, phải trả một cái giá không rẻ, như tắt cross-domain request.

Nếu sử dụng `axios`, và backend tạo cookie đúng chuẩn, để axios lo phần đó cho an toàn, không cần lo việc xử lý token, cookie một cách thủ công, thiếu chuyên nghiệp.

```js
axios.defaults.withCredentials = true;
```

[Code tham khảo](https://github.com/deleteman/sample-jwt-auth-vue)

### Có cần HTTPS với JWT?

HTTPS có đảm bảo an toàn tuyệt đối cho site, là yêu cầu bắt buộc khi sử dụng JWT?

100% bảo mật là con số chưa ai dám nhận, hay nói toẹt ra là không thể. Sẽ luôn có đâu đó một con người tài giỏi, thông minh hơn bạn, họ sẽ tìm được cách tấn công phù hợp. May mắn thay những người xuất chúng như vậy họ cũng có đạo đức cao và không rảnh để làm những việc quá tầm thường. Đừng có lên mạng mà "Anh đố chú hack được site anh!"

HTTPS là cơ chế **encrypt** thông tin đi-về giữa client và server, đảm bảo không có người ngoài nào có thể dòm ngó và đọc được bạn đang gửi gì, nhưng nếu nó đã chui được vào nhà bạn rồi thì thành thật mà nói HTTPS cũng không phải là cánh cửa chỉ có bạn mở được.

### Khi nào không nên dùng JWT

Nếu bạn đang muốn sử dụng một stateful backend, JWT là thừa thãi không cần thiết.

JWT sinh ra và phù hợp nhất với stateless API

### Thư viện ngon

Vue: [vuejs-jwt](https://www.npmjs.com/package/vuejs-jwt)

React: [react-jwt](https://www.npmjs.com/package/react-jwt)

Angular: [angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)



Ghi chú từ bài viết [JWT Authentication Best Practices](https://dev.to/deleteman123/jwt-authentication-best-practices-3lf9)
