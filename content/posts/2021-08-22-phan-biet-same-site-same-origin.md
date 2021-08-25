---
slug: "/2021-08-22-phan-biet-same-site-same-origin"
date: "2021-08-22"
title: "Phân biệt same-site và same-origin"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: [ "hoc-thuat", "web"]
---


## origin

![](https://web-dev.imgix.net/image/admin/PX5HrIMPlgcbzYac3FHV.png?auto=format&w=845)

> **origin** = scheme + host name + port

Ví dụ nếu có URL là: `https:///www.example.com:443/foo` thì *origin* của nó là `https://www.example.com:443`

Vậy **same-origin** tức là những url có cùng scheme, host name, port, ngược lại thì gọi là **cross-origin**

| Origin A                    | Origin B                          |                                                              |
| --------------------------- | --------------------------------- | ------------------------------------------------------------ |
| https://www.example.com:443 | https://**example.com**:443       | cross-origin: khác subdomain                                 |
|                             | https://**www.evil.com**:443      | cross-origin: khác domain                                    |
|                             | https://**login**.example.com:443 | cross-origin: khác subdomain                                 |
|                             | **http**://www.example.com:443    | cross-origin: khác scheme                                    |
|                             | https://www.example.com:**80**    | cross-origin: khác port                                      |
|                             | https://www.example.com           | same-origin:  ngầm hiểu cùng port 443 (port mặc định của web) |

## Site

![](https://web-dev.imgix.net/image/admin/oSRJzCJIr4OjGzUhcNDP.png?auto=format&w=845)

Top-level domains (TLDs) như `.com`, `.org` được liệt kê trong [trang này](https://www.iana.org/domains/root/db)

> **site** =TLD + phần ngay phía trước domain

Với ví dụ trên, thì site = `example.com`

Tuy nhiên với những tên miền kiểu `.com.vn`, `github.io`, cách xác định site này không còn đúng, nên người ta tạo thêm danh sách *effective TLDs (eTLDs)*, [xem chi tiết publicsuffix.org/list](https://publicsuffix.org/list/)

Ví dụ, URL `https://my-project.github.io` thì site = `my-project.github.io`

![](https://web-dev.imgix.net/image/admin/qmr35hpnIvpouOe9591g.png?auto=format&w=845)

Vậy **same-site** là những url có cùng site, ngược lại được gọi là **cross-site**

| URL A                       | URL B                             |                                     |
| --------------------------- | --------------------------------- | ----------------------------------- |
| https://www.example.com:443 | https://**www.evil.com**:443      | cross-site: khác domain             |
|                             | https://**login**.example.com:443 | same-site: khác subdomain không sao |
|                             | **http**://www.example.com:443    | same-site: khác scheme không sao    |
|                             | https://www.example.com:**80**    | same-site: khác port không sao      |
|                             | **https://www.example.com**       | same-site                           |

> Gần đây khái niệm same-site được mở rộng và bao gồm luôn scheme

Nếu tính luôn scheme, thì `http://example.com` và `https://example.com` là cross-site vì khác scheme

https://web.dev/same-site-same-origin/