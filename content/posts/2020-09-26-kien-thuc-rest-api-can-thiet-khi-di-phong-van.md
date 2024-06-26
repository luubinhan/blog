---
slug: "2020-09-26-kien-thuc-rest-api-can-thiet-khi-di-phong-van"
date: "2020-09-26"
title: "Kiến thức căn bản REST API cho FE developer"
desc: "2020 REST API vẫn đang là chuẩn mực giao tiếp của API trên nền web (chiếm 69% so với các API khác), như vậy đã đủ thuyết phục các bạn nắm thật rõ kiến thức REST API chưa?"
tags: ["hoc-thuat"]
canonical_url: false
hide: true
---

<!-- TOC -->

- [Phân biệt giữa API và Web Service](#phân-biệt-giữa-api-và-web-service)
- [Phân biệt giữa REST và RESTFUL](#phân-biệt-giữa-rest-và-restful)
- [Những phương thức HTTP được hổ trợ trong REST](#những-phương-thức-http-được-hổ-trợ-trong-rest)
- [Sự khác nhau giữa AJAX và REST](#sự-khác-nhau-giữa-ajax-và-rest)
- [Điểm mấu chốt cần nhớ trong REST](#điểm-mấu-chốt-cần-nhớ-trong-rest)
- [Điểm khác nhau giữa `PUT` và `POST`](#điểm-khác-nhau-giữa-put-và-post)
- [Mục tiêu của phương thức OPTIONS trong RESTful web service](#mục-tiêu-của-phương-thức-options-trong-restful-web-service)
- [Limit của payload trong phước thức POST](#limit-của-payload-trong-phước-thức-post)

<!-- /TOC -->

Để cho dễ hiểu chúng ta đi qua một số thuật ngữ trước

- **Resource** (tài nguyên) có thể hình dung nôm na nó là một _cái gì đó đó_ ở phía server nắm dữ, có thể là một dữ liệu trong database, một file html, css, js, svg,...
- **Web Service**: nhiều cách định nghĩa, có thể hiểu _bình dân_, nếu internet là một cái chợ, dữ liệu là những gì có thể buôn bán trao đổi, thì web service là những gì có thể đem ra chợ trao đổi buôn bán
- **URI**: viết tắt của _Uniform Resource Identifier_, một một resource trong kiến trúc REST sẽ xác định bằng một và chỉ một URI. Theo định dạng như sau

```bash
<protocol>://<service-name>/<ResourceType>/<ResourceID>
```

## Phân biệt giữa API và Web Service

- Tất cả web service đều là API, nhưng không phải tất cả API đều là web service
- Web service sử dụng 3 kiểu sau: SOAP, REST, XML-RPC, trong khi API có nhiều cách hơn

## Phân biệt giữa REST và RESTFUL

REST ám chỉ **kiểu kiến trúc** để xây dựng các ứng dụng có thể truy cập thông qua mạng của ông chú viettel, vnpt, fpt,...

REST chỉ là _một trong nhiều kiểu kiến trúc_ trên nền web, ngoài ra còn có [SOAP](https://en.wikipedia.org/wiki/SOAP), và một số kiểu khác.

_RESTful_ ám chỉ một **web service** hiện thực cái kiến trúc REST

## Những phương thức HTTP được hổ trợ trong REST

- `GET`: dùng để yêu cầu một resource qua URL. Không nên chứa `body`, có thể được cache phía client hoặc server
- `POST`: gửi thông tin lên một _service_ nào đấy để xử lý, thường trả về một resource mới hoặc resource đã bị thay đổi
- `PUT`: cập nhập resource tại một URL
- `DELETE`: xóa resource tại một URL
- `OPTIONS`: Xác định hổ trợ cái gì
- `HEAD`: trả về các thông tin meta

## Sự khác nhau giữa AJAX và REST

| AJAX                                                                                                                      | REST                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Gửi một object `XMLHttpRequest` lên server. JS sẽ nhận lấy kết quả trả về và làm gì đó thật _vi diệu_ trên trang hiện tại | Bao gồm nhiều thứ hơn: cấu trúc URL, pattern cho request/response xung quanh việc truy xuất đến các resource |
| Ám chỉ một công nghệ để cập nhập UI mà không cần reload thần thánh                                                        | Kiến trúc phần mềm và phương pháp để user có thể có được dữ liệu từ phía server                              |
| Loại bỏ tương tác giữa người sử dụng và server                                                                            | Yêu cầu tương tác giữa người sử dụng và server                                                               |

## Điểm mấu chốt cần nhớ trong REST

**Stateless**: nghĩa là server không quản lý state và session data

## Điểm khác nhau giữa `PUT` và `POST`

- `PUT` dùng để **xử lý** một resource tại một URI cụ thể **đã tồn tại trước đó**, nếu chưa có tạo mới, đã có thì ghi đè. Ko phụ thuộc số lần gửi, số lượng resource sẽ không đổi sau khi gọi `PUT`

- `POST` **gửi dữ liệu** đến một URI, resource tại URI đó sẽ xử lý dữ liệu được gởi. Việc gửi lên càng nhiều, đồng nghĩa với việc số lượng resource phía server cũng tăng theo

## Mục tiêu của phương thức OPTIONS trong RESTful web service

Phương thức này dùng để liệt kê tất cả các thao tác mà web service hổ trợ. Tạo một request readonly đến server

## Limit của payload trong phước thức POST

Nếu <GET> gửi dữ liệu thông qua URL, nó ko được vượt quá chiều dài tối đa cho phép của URL. <POST> lại không có limit, có thể gửi lên bao nhiều tùy thích, trong thực tế sử dụng thì không nên gửi payload quá lớn, vì sẽ tốn rất nhiều thời gian xử lý.