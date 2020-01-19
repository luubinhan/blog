---
slug: "/2020-01-10-huong-dan-viet-lambda-function-voi-netlify"
date: "2020-01-10"
title: "Viết và Deploy một Lambda Function trên Netlify"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["netlify","thu-thuat"]
---


## Lambda function là gì?

Giải thích về Serverless bạn đọc bài trước có đăng

Nếu bạn chỉ có một trang blog như thế này, viết bằng Gatsby, không có backend làm sao bạn có thể có được tính năng cho phép user đăng ký nhận bản tin? Ví dụ dùng dịch vụ của MailChimp đi.

Chúng ta ko thể đưa API key vào trang frontend được, hiển nhiên quá mà! Ai cũng có thể lấy được cái key này thì sao.

Chúng ta phải thông qua một bên ở giữa, là Lambda function trên Netlify, chúng ta đưa key này cho Netlify, nó sẽ có trách nhiệm bảo mật key này và truyền thông tin tới MailChimp

Chữ Lambda được **phát minh** đầu tiên bởi Amazon AWS, sau này Netlify cũng dùng luôn tên này, nó là kiểu các *hàm trung gian*, giúp chúng ta giao tiếp với phía server (vì đây là dạng serverless, chúng ta dùng dịch vụ của nó cung cấp, giống như vua chúa, nếu muốn giao tiếp với anh thì chú cứ thông qua thái dám, họ sẽ truyền tin tới cho anh)

Cứ dùng trang mặc định của Gatsby

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540301648/sv9k9cv1zdtr4ebqpr09.png)


Tạo một thư mục bên trong source code, nó sẽ chứa toàn bộ các hàm sẽ giao tiếp với Lambda. Thư mục này đặt đâu cũng được, cứ đặt vào dưới thư mục gốc tên `functions`

> Mỗi file chỉ chứa 1 function


test.js

```js
exports.handler = function(event, context, callback) {
}
```

Mỗi function sẽ nhận 3 parameter 
- `event`: chứa post data, header
- `context`: function này được call ở đâu, thông tin user hiện tại
- `callback`: hàm callback thôi, hàm này nhận param đâu tiền là error nếu có lỗi

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540301809/exdwztr8lfepei1x88ux.png)

## Chạy các function Lambda ở local

Cần cài `netlify-lambda` để chạy test dưới local 

```js
npm install netlify-lambda
```

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540301932/y8uyqgcmxa8i9sczpljo.png)

```powershell
netlify-lambda serve <functions_directory>
```

`<functions_directory>` là thư mục chứa mấy function chúng ta viết


Thêm đoạn *shortcut* vào trong package.json để chạy lệnh này

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540302074/xnpujx0smgs1ftul0hr2.png)

Bước cuối cùng cần làm, tạo file config để báo với Netlify, đây không phải là thư mục chứa source code của chúng ta, đây là thư mục sau khi build. Tạo file `Netlify.toml` trong thư mục gốc

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540302243/gzlbxxtidpi0lukcxmmy.png)

Sau khi build, file bên trong `functions` sẽ được đưa vào thư mục tên `lambda`

Chạy lại đoạn script *shortcut* hồi nãy khai báo `npm run start:lambda`, bên dưới hình này đoạn chạy bị lỗi là khi chưa tạo file `Netlify.toml`, chúng ta bắt buộc phải tạo file này trước khi chạy

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540302301/vyr4hwlxacgkhvkvhzdn.png)

Mở Postman lên gọi test thử

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540302549/jblo4vceh9ylxxipnct8.png)

Function đầu tiên đã chạy thành công!!!

Chúng ta truyền thêm một object `{ "name" : "James" }`, và muốn nhận được một JSON object thay vì là một `string`. Muốn vậy trong phần body chúng ta phải gọi `JSON.stringify`

```js
callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Thanks for visiting " + name })
});

// nếu không nhận được name= james

callback(new Error("You're not James"));
```


![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540303047/s7lrt4qmn8svganfbd6s.png)


Test trên Postman

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540303082/gmlkczsp2hhlasrrko2d.png)

Trường hợp phát sinh lỗi

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540303092/y1uu9ipfgy0rq6p3mtwr.png)


## Deploy lên Netlify

Nãy giờ chúng ta đang chạy các Lambda function ở dưới local bằng lệnh `serve`,  để đưa lên Netlify, chúng ta cần `build` source code trước khi đẩy lên Netlify

Chúng ta phải setup chạy 2 script, một để build Gatsby, sau đó build mấy functions lambda

```json
"props": "npm run build; npm run build:lambda"
```

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540315111/hv7omcr0angknnup175q.png)

Lưu ý: do đang dùng gatsby, nên cần 2 lệnh này, nếu bạn dùng một thằng khác, thì lệnh sẽ khác, tuy cách setup

Phải cập nhập lại **Netlify.toml**, chúng ta sẽ báo với Netlify: "Ê, khi nào tao chạy xong `prop`, thì mày deploy nhe"

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540315122/lytjmmofmjjgixzxycwo.png)

Sau khi commit lên Github, Netlify sẽ bắt đầu trigger deploy, vào trang chính của Netlify, trong tab **Deployment**, bạn có theo dõi xem nó đang deploy tới đâu rồi

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540315158/kulpc3u2tqftgxijpr6c.png)

Sau khi deploy thành công, bạn có thể chuyển qua tab **Function**, các function nào đã có sẽ được liệt kê ở đây

![Viết và Deploy một Lambda Function trên Netlify](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1540315181/nblkoi0l6shvdvvybtje.png)

Cơ bản là thế thôi, các bạn có thể làm *"mọi thứ"* với function mình viết (miễn là nó có cho), như gửi email, lưu dữ liệu xuống DB, gọi một API

[https://scotch.io/tutorials/build-and-deploy-a-serverless-function-to-netlify](https://scotch.io/tutorials/build-and-deploy-a-serverless-function-to-netlify)


