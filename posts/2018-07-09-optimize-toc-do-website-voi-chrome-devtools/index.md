---
path: "/2018-07-09-optimize-toc-do-website-voi-chrome-devtools"
date: "2018-07-09T13:35:13.234Z"
title: "Nâng cao tốc độ website với Chrome DevTools"
desc: "Hướng dẫn sử dụng Chrome DevTools để phân tích và tối ưu hóa tốc độ website"
tags: ["website"]
---

# Bước 1: Kiểm tra trang web hiện tại (Audits)

Bước đầu tiên này có 2 công dụng chính

1. Làm thước đo cho các thay đổi đã áp dụng
2. Gợi ý những thay đổi nào thực sự ảnh hưởng nhiều tới tốc độ

Trong bài này tác giả sẽ sử dụng trang https://glitch.com/edit/#!/tony?path=server.js:1:0 để làm demo

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/editor.png)

## Xác định baseline

Mở Chrome DevTools, chuyển qua tab **Audits**, nó có thể bị ẩn sau nút **More Panels**, có hình cái hải đăng

![Thiết đặt chính cho baseline](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/audits.png)

Thiết đặt như hình trên, sau đó click **Run Audits**, đợi nó chạy một tí sẽ có 1 cái report performance của site

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/report.png)

Nếu thấy bất kỳ lỗi nào trên report, thử chạy trong 1 tab ẩn danh mới

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/error.png)

## Đọc hiểu report

Cái số ở trên cùng là thang điểm tổng hợp, càng cao càng tốt

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/overall.png)

Ở mục **Metrics** cho kết quả các cách đánh giá, ví dụ như **First Contentful Paint** cho biết thời gian khi màn hình bắt đầu xuất hiện nội dung cho user, một milestone quan trọng để làm hài lòng user, **First CPU Idle** là thời điểm mà user có thể tương tác với site như click hay input gì đó, lúc này CPU của user đã có có thể xử lý yêu cầu

Hover lên mỗi metric để hiển thị phần description của nó, và click **Learn More** để đọc document.

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/fmp.png)

Bên dưới Metric là một số hình screenshoot trên từng thời gian khác nhau

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/screenshots.png)

**Opportunities** sẽ đưa ra những tips để improve page load

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/opportunities.png)

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/compression.png)

**Diagnostics** cung cấp thêm thông tin các nhân tố tác động lên tốc độ load

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/diagnostics.png)

**Passed Audits** là những điều trang hiện tại làm tốt

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/passed.png)

# Bước 2: Thử nghiệm

Trong mục **Oppourtunities** của audit report cung cấp gợi ý để improve performance, chúng ta sẽ làm theo những gợi ý này

## Bật text compression

Top trong những điều có thể làm để improve, reduce, compress kích thước của file xuống trước khi send, giống như chúng ta zip file lại trước khi quăng vô email

Check cái file dạng text này trong tab **Network**

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/network.png)

Click **use large request rows** ![](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/large-resource-rows-button.png) để hiển thị nhiều thông tin hơn.

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/largerows.png)

Tren cột **Size** sẽ có 2 giá trị. Giá trị ở trên là kích thước

[Link bài gốc](https://developers.google.com/web/tools/chrome-devtools/speed/get-started)

