---
slug: "2022-04-30-setup-cloudfront-cho-und-dung"
date: "2022-04-30"
title: "Setup CloudFront cho ứng dụng"
desc: ""
tags: ["aws", "beginner"]
---

<!-- TOC -->

- [Cấu hình DNS](#cấu-hình-dns)
- [Cấu hình CloudFront distribution](#cấu-hình-cloudfront-distribution)

<!-- /TOC -->

Chúng ta sẽ cùng cấu hình để đưa toàn bộ ứng dụng lên CloudFront, với những dữ liệu không nên cache như *data*, *auth*,... sẽ được *proxy* (chuyển tiếp) đến server.

## Cấu hình DNS

Mục tiêu cuối cùng của chúng ta là đưa toàn bộ ứng dụng lên CloudFront. Tức là khi user truy cập vào domain, họ sẽ load ứng dụng từ CloudFront chứ không phải từ server. Trước tiên chúng ta phải vào *Route 53* để thay đổi lại DNS

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645834717715_image.png?resize=1024%2C280&ssl=1)

Chọn **Hosted Zone**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645994751238_image.png?w=821&ssl=1)

Click vào **Create Hosted zone** và nhập vào domain

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645908142161_image.png?resize=1024%2C237&ssl=1)

Chúng ta đang nói với AWS hãy quản lý domain này cho tôi, AWS đưa cho chúng ta giá trị NS (name server) mà nó sẽ *route traffic* đến. Chúng ta sẽ cần đến chỗ quản lý domain, tùy thuộc vào nơi chúng ta đăng ký domain, giao diện quản lý có thể khác nhau, chúng ta cập nhập lại giá trị *NS* này cho domain

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645835018979_image.png?w=762&ssl=1)

Trước khi thay đổi, nhớ lưu lại backup giá trị NS gốc

## Cấu hình CloudFront distribution

Chúng ta sẽ điền vào phần *origin domain*, đừng nhập giá trị **top-level domain** như `your-app.com`, nó sẽ là giá trị sub domain, như `your-app.herokuapp.com` (nếu được host trên herokuapp.com)

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645841894888_image.png?resize=1024%2C292&ssl=1)

Nếu có ý định dùng `HTTPs` thì nhớ thay đổi phân **Protocol**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645934723593_image.png?resize=1024%2C817&ssl=1)

Phần dưới đây cực kỳ quan trọng, nếu ứng dụng của chúng ta có authen, ghi dữ liệu, nói chung những phương thức khác ngoài `GET`, thì nhớ chọn lại **Allowed HTTP methods**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645841986703_image.png?w=730&ssl=1)

Chúng ta cũng cần thực hiện một vài thay đổi trên **Cache key and origin requests**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645842121040_image.png?resize=1024%2C763&ssl=1)

**Cache policy** chúng ta cho phép giá trị TTL minimum là 0, như vậy với giá trị non-caching header được gửi lên sẽ có hiệu lực

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645842200731_image.png?resize=1024%2C857&ssl=1)

**Origin request policy**, để đảm bảo cookie và query string khi đến CloudFront sẽ được gửi xuống server (không serve từ CDN)

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645842297987_image.png?resize=1024%2C686&ssl=1)
**Response headers policy**, chúng ta chọn **CORS With Preflight**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645842362649_image.png?resize=1024%2C684&ssl=1)

Chúng ta vẫn phải chứng minh với AWS là chúng ta là chủ sở hữu của domain, trước hết chúng ta yêu cầu một SSL certificate

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645932319102_image.png?resize=1024%2C862&ssl=1)

Chọn **Request certificate**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645845081306_image.png?resize=1024%2C360&ssl=1)
![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645845178014_image.png?resize=1024%2C553&ssl=1)

Cung cấp tên miền, chọn kiểu validate bằng *DNS*

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645932453934_image.png?resize=882%2C1024&ssl=1)

Chọn **Request**, chọn vào Certificate ID vừa được tạo ra

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645932554825_image.png?resize=1024%2C211&ssl=1)
![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645932616235_image.png?resize=1024%2C227&ssl=1)

Để xác minh domain chính chủ, chúng ta cần đưa giá trị CNAME này vào trong Route 53

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645932927217_image.png?resize=1024%2C462&ssl=1)

Chúng ta tạo một dòng CNAME với giá trị trong certificate ở trên

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645932742028_image.png?resize=1024%2C637&ssl=1)

Sau khi xác minh xong AWS sẽ cập nhập status trên domain

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645933155607_image.png?resize=1024%2C202&ssl=1)
![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645933066086_image.png?resize=1024%2C156&ssl=1)

Xong, giờ quay lại màn hình CloudFront distribution, trong mục **SSL certificate** chọn vào certificate chúng ta đã tạo

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645933691496_image.png?resize=1024%2C727&ssl=1)
![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645933782796_image.png?resize=1024%2C440&ssl=1)

Việc còn lại là báo với Route 53 để nó route domain vào CloudFront, vào Route 53 tạo thêm một dòng DNS
Chọn **A record type**, đánh dấu dòng này là một **alias** và map alias này đến CloudFront. Bên trong mục **Route traffic to** chúng ta sẽ có tùy chọn **Alias to CloudFront distribution**

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/04/s_9EC4D5B81B6CD9C28657A6DEAF8D3C9C2A6DFB1D0DE42C8A4034DB1807C8212F_1645933944994_image.png?resize=1024%2C538&ssl=1)

OK, xong rồi đó.

Để báo với CloudFront đừng cache những request cụ thể nào, chúng ta gửi trong header `Cache-Control: no-cache`. Ví dụ sử dụng Express middleware

```js
app.use("/graphql", (req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});
app.use(
  "/graphql",
  expressGraphql({
    schema: executableSchema,
    graphiql: true,
    rootValue: root
  })
); 
```

- [Setting Up CloudFront to Host Your Web App](https://css-tricks.com/setting-up-cloudfront-to-host-your-web-app/)
