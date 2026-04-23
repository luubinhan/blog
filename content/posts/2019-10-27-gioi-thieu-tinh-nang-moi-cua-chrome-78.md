---
slug: "/2019-10-27-chrome-78-co-gi-moi"
date: "2019-10-27"
title: "Có gì mới trong DevTools của Chrome 78"
desc: "Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome"
cover: "https://i.imgur.com/bj1kcFp.png"
type: "post"
lesson: 0
chapter: 0
tags: ["chrome"]
---

<!-- TOC -->

- [Kết hợp Audit với các tính năng khác](#k%e1%ba%bft-h%e1%bb%a3p-audit-v%e1%bb%9bi-c%c3%a1c-t%c3%adnh-n%c4%83ng-kh%c3%a1c)
- [Công cụ debug Payment Handler](#c%c3%b4ng-c%e1%bb%a5-debug-payment-handler)
- [Lighthouse 5.2](#lighthouse-52)
- [Đứa nào chiếm Contentful Paint lớn nhất](#%c4%90%e1%bb%a9a-n%c3%a0o-chi%e1%ba%bfm-contentful-paint-l%e1%bb%9bn-nh%e1%ba%a5t)
- [Gửi issue của DevTools cho team Google](#g%e1%bb%adi-issue-c%e1%bb%a7a-devtools-cho-team-google)

<!-- /TOC -->

## Kết hợp Audit với các tính năng khác

Bên trong cửa sổ Audit, chúng ta có thể dùng kết hợp với các tính năng khác của DevTools như **Request blocking** (để chặn request đến một resource nào đó) và **Local Overrides** (cho phép dùng một file dưới local để thay cho file đang chạy thực tế)

Ví dụ, **Audits** cho kết quả 70 điểm hiệu năng, nó đề nghị chúng ta bỏ qua một sổ resource block lại quá trình render

![eliminating render-blocking resources](https://developers.google.com/web/updates/images/2019/09/score1.png)
Hình 1 - Nhận được 70 điểm hiệu năng

![](https://developers.google.com/web/updates/images/2019/09/renderblockingresources.png)
Hình 2 - Có 3 đoạn script đang ảnh hưởng đến render

Giờ trong cửa sổ Audit này, chúng ta mở cửa sổ **request blocking**

![Using the Request Blocking tab to block the problematic scripts.](https://developers.google.com/web/updates/images/2019/09/blocking.png)
Hình 3 - Sử dụng **Request blocking** để chặn, ko load các đoạn script là nguyên nhân của block render

![The Performance score improved to 97 after enabling request blocking.](https://developers.google.com/web/updates/images/2019/09/score2.png)
Hình 4 - Sau khi đã bỏ qua các đoạn script này, chúng ta nhận được kết quả điểm Audit là 97

Bạn có thể [tự làm lại để nhớ cho lâu]([https://devtools.glitch.me/wndt78/multiclient.html](https://devtools.glitch.me/wndt78/multiclient.html))

## Công cụ debug Payment Handler

Payment Handler là một một API mới của web để xử lý các thao tác liên quan đến *tiền trao, cháo múc*. Bạn có thể đọc thêm về [Payment Handler API ở đây](https://developers.google.com/web/updates/2018/06/payment-handler-api)

Trong phần **Background services** của cửa sổ **Application** sẽ có thêm công cụ để debug API này

1. Mở DevTools, vào tab **Application**
2. Chọn **Payment Handler** trong cột bên trái
3. Click **Record**. DevTools sẽ lưu lại các sự kiện của Payment Handler trong 3 ngày, ngay cả khi đã đóng DevTools

![Recording Payment Handler events.](https://developers.google.com/web/updates/images/2019/09/payment1.png)

4. Bật **Show events from other domains** nếu các sự kiện Payment xảy ra trên các tên miền khác (thường là vậy, chúng ta dùng dịch vụ của bên thứ 3 như Visa)
5. Khi có sự kiện Payment, từng dòng thông tin sẽ được lưu lại

![Viewing a Payment Handler event.](https://developers.google.com/web/updates/images/2019/09/payment2.png)

## Lighthouse 5.2

Audit sử dụng phiên bản [Lighthouse 5.2](https://github.com/GoogleChrome/lighthouse/releases/tag/v5.2.0) (thật ra được đưa vào từ Chrome 77, nhưng mấy bạn ở Google quên note lại cho bà con, giờ mới note lại)

Bổ sung *chẩn đoán* **Third-Party Usage** cho chúng ta dánh sách các file đang được request từ bên ngoài và đoạn code đó nó ảnh hưởng thế nào lên main thread khi trang được load

![A screenshot of the 'Third-Party Usage' audit in the Lighthouse report UI.](https://developers.google.com/web/updates/images/2019/09/thirdpartycode.png)

## Đứa nào chiếm Contentful Paint lớn nhất

Khi đánh giá hiệu năng của trang trong tab **Performance**, chổ **Timings** sẽ có một ô đánh dấu là LCP (Largest Contentful Paint), nó là thời gian render của element kích thước lớn nhất trên viewport

![The LCP marker in the Timings section.](https://developers.google.com/web/updates/images/2019/09/lcp.png)

Để biết nó là DOM nào
1. Click vào cái marker **LCP**
2. Chổ **Related Node** trong phần **Summary** bên dưới, click vào element đang có

![The Related Node section of the Summary tab.](https://developers.google.com/web/updates/images/2019/09/relatednode.png)

## Gửi issue của DevTools cho team Google

Nếu bạn phát hiện bất kỳ con bug nào của DevTools, hoặc yêu cầu một tính năng nào đó cần thiết cho DevTools, gửi ngay cho team này ở Google.

**Main Menu > Help > Report a DevTools issue**
![Main Menu > Help > Report a DevTools issue.](https://developers.google.com/web/updates/images/2019/09/reportissue.png)


**Video**

[https://www.youtube.com/watch?v=VNkctDLYP6o](https://www.youtube.com/watch?v=VNkctDLYP6o)
