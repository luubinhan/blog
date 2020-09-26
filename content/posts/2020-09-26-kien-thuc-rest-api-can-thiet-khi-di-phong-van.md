---
slug: "2020-09-26-kien-thuc-rest-api-can-thiet-khi-di-phong-van"
date: 2020-09-26
title: "Kiến thức căn bản REST API cho FE developer"
desc: "2020 REST API vẫn đang là chuẩn mực giao tiếp của API trên nền web (chiếm 69% so với các API khác), như vậy đã đủ thuyết phục các bạn nắm thật rõ kiến thức REST API chưa?"
cover_image: 
tags: ["dam-dao"]
canonical_url: false
hide: true
---

Để cho dễ hiểu chúng ta đi qua một số thuật ngữ trước

- **Resource** (tài nguyên) có thể hình dung nôm na nó là một *cái gì đó đó* ở phía server nắm dữ, có  thể là một dữ liệu trong database, một file html, css, js, svg,...
- **Web Service**: nhiều cách định nghĩa, có thể hiểu *bình dân*, nếu internet là một cái chợ, dữ liệu là những gì có thể buôn bán trao đổi, thì web service là những gì có thể đem ra chợ trao đổi buôn bán
- **URI**: viết tắt của *Uniform Resource Identifier*, một một resource trong kiến trúc REST sẽ xác định bằng một và chỉ một URI. Theo định dạng như sau
  `<protocol>://<service-name>/<ResourceType>/<ResourceID>`

## Phân biệt giữa REST và RESTFUL

REST ám chỉ **kiểu kiến trúc** để xây dựng các ứng dụng có thể truy cập thông qua mạng của ông chú viettel, vnpt, fpt,...

REST chỉ là *một trong nhiều kiểu kiến trúc* trên nền web, ngoài ra còn có [SOAP](https://en.wikipedia.org/wiki/SOAP), và một số kiểu khác.

*RESTful* ám chỉ một **web service** hiện thực cái kiến trúc REST

## Những phương thức HTTP được hổ trợ trong REST

- `GET`: dùng để yêu cầu một resource qua URL. Không nên chứa `body`, có thể được cache phía client hoặc server
- `POST`: gửi thông tin lên một *service* nào đấy để xử lý, thường trả về một resource mới hoặc resource đã bị thay đổi
- `PUT`: cập nhập resource tại một URL
- `DELETE`: xóa resource tại một URL
- `OPTIONS`: Xác định hổ trợ cái gì
- `HEAD`: trả về các thông tin meta

## Sự khác nhau giữa AJAX và REST

| AJAX                                                         | REST                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Gửi một object `XMLHttpRequest` lên server. JS sẽ nhận lấy kết quả trả về và làm gì đó thật *vi diệu* trên trang hiện tại | Bao gồm nhiều thứ hơn: cấu trúc URL, pattern cho request/response  xung quanh việc truy xuất đến các resource |
| Ám chỉ một công nghệ để cập nhập UI mà không cần reload thần thánh | Kiến trúc phần mềm và phương pháp để user có thể có được dữ liệu từ phía server |
| Loại bỏ tương tác giữa người sử dụng và server               | Yêu cầu tương tác giữa người sử dụng và server               |

## Điểm mấu chốt cần nhớ trong REST

**Stateless**: nghĩa là server không quản lý state và session data

## Điểm khác nhau giữa `PUT` và `POST`

`PUT` dùng để **xử lý** một resource tại một URI cụ thể **đã tồn tại trước đó**, nếu chưa có tạo mới, đã có thì ghi đè. Ko phụ thuộc số lần gửi, số lượng resource sẽ không đổi sau khi gọi `PUT`

 `POST` **gửi dữ liệu** đến một URI, resource tại URI đó sẽ xử lý dữ liệu được gởi. Việc gửi lên càng nhiều, đồng nghĩa với việc số lượng resource phía server cũng tăng theo



