---
slug: "/2018-07-09-huong-dan-optimize-toc-do-website-voi-chrome-devtools"
date: "2018-07-09"
title: "Nâng cao tốc độ website với Chrome DevTools"
desc: "Hướng dẫn sử dụng Chrome DevTools để phân tích và tối ưu hóa tốc độ website"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome", "performance"]
---

<!-- TOC -->

- [Bước 1: Kiểm tra trang web hiện tại (Audits)](#bước-1-kiểm-tra-trang-web-hiện-tại-audits)
  - [Xác định baseline](#xác-định-baseline)
  - [Đọc hiểu report](#đọc-hiểu-report)
- [Bước 2: Thử nghiệm](#bước-2-thử-nghiệm)
  - [Bật text compression](#bật-text-compression)
  - [Giảm kích thước ảnh](#giảm-kích-thước-ảnh)
  - [Bỏ hết những resource nào block việc render](#bỏ-hết-những-resource-nào-block-việc-render)
  - [Hạn chế tối đa các xử lý ở main threat](#hạn-chế-tối-đa-các-xử-lý-ở-main-threat)
- [Tổng kết](#tổng-kết)

<!-- /TOC -->

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

Tren cột **Size** sẽ có 2 giá trị. Giá trị ở trên là kích thước download, bên dưới là kích thước đã giải nén, nếu 2 giá trị này bằng nhau thì hiển nhiên là resource đó chưa compress trước khi gởi.

Xem giá trị của `content-encoding` trong HTTP header cũng sẽ biết được resource này đã compress chưa

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/headers.png)

Như file `bundle.js` chúng ta không thấy `content-encoding` trong Response Headers, nghĩa là file chưa compress, thường giá compress cho nó sẽ là `gzip`, `deflate`, hay `br`. Xem thêm về các [kiểu compress này](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding#Directives)

Giải thích đủ rồi giờ ta đi compress thôi. Mở trang ví dụ của tác giả ra

File `server.js`

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/server.png)

Thêm đoạn code sau vào `server.js`. Dùng `app.use(compression())` trước `app.use(express.static('build'))`

```js
const fs = require('fs');
const compression = require('compression');
app.use(compression());
app.use(express.static('build'));
```

Đợi Glitch deploy một tí. Quay lại trang demo và reload.

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/requests.png)

File `bundle.js` lúc này đã compress

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/gzip.png)

Chúng ta quay lại tab **Audits** để đánh giá kết quả, click **Perform an audit**, dùng các thiết đặt như trước, rồi chạy **Run Audit**

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/report2.png)

## Giảm kích thước ảnh

Nếu user đang xài điện thoại có kích thước màn hình chỉ 500px chiều ngang thì việc load một cái hình rộng 1500px là ko thông minh lắm.

Trên trang report, click **Properly size images** để xem những hình nào nên resize, ví dụ bên dưới có 4 hình có thể tối ưu

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/resize.png)

Tốt nhất

- Resize lại toàn bộ ảnh trong lúc build
- Tạo nhiều kích thước file khác nhau trong lúc build và sử dụng `srcset` của thẻ `img`, như vậy lúc hiển thị, trình duyệt sẽ đảm nhiệm chọn file nào để phù hợp với thiết bị đang xem. [Xem thêm](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#relative_sized_images)
- Sử dụng image CDN để tự động thay đổi kích thước của hình khi request
- Xem thêm [một số gợi ý này](https://images.guide/)

## Bỏ hết những resource nào block việc render

**render-blocking resource** là những file javascript hoặc CSS báo với trình duyệt rằng tụi tao file được load xong xui thì mày hả render nội dung trang web.

Trước tiên tìm xem những resource nào có thể được load mà ko cần chạy lúc page load.

1. Click **Eliminate render-blocking resources** để xem các resources, ví dụ ở đây là `lodash.js` và `jquery.js`
2. Ấn Control+Shift+P để mở Command Menu, gõ vào `Coverage` sau đó chọn `Show Coverage`

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/commandmenu.png)

Một tab mới Coverage sẽ mở ra

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/coverage.png)

3. Click **Reload**. Trong tab Coverage sẽ cung cấp thông tin tổng quát về việc các đoạn code trong `bundle.js`, `jquery.js`, `lodash.js` trong lúc page load thì nó sẽ được sử dụng bao nhiêu. Kết quả bên dưới cho thấy có 76% code jQuery và 30% của Lodash ko được sử dụng

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/coveragereport.png)

4. Click vào `jQuery`. DevTools sẽ mở ra tab Source Panel, những đoạn code nào chạy lúc page sẽ có màu xanh, màu đỏ là phần code không chạy

Để xem chuyện gì sẽ xảy ra nếu ta không load jQuery và Lodash

1. Mở tab Network
2. Ấn Control+Shift+P
3. Nhập `blocking` sau đó chọn `Show Request Blocking`

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/blocking.png)

4. Click `Add pattern` ![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/addpattern.png), nhập `/libs/*` sau đó `Enter` để confirm
5. Reload lại trang. File jQuery và Lodash sẽ được đánh dấu đỏ vì chúng ta ko load nó

Xem thử kết quả trên Audit khi chúng ta xóa hẳn 2 file này

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/report4.png)

## Hạn chế tối đa các xử lý ở main threat

Main threat là thời điểm mà trình duyệt xử lý trước tiên để hiển thị nội dung trang, chẳng hạn như parsing, executing HTML, CSS, Javascript.

Mục tiêu ta sẽ dùng **Performance** panel để analyze những xử lý gì đang xảy ra ở main threat, tìm cách để defer hoặc bỏ hẳn

1. Click **Performance** tab
2. Chọn **Capture Settings** ![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/capture.png)
3. Thiết đặt **Network** ở **Slow 3G** và **CPU** xuống 6x slowdown để giả lập trang web được load ở nơi mạng chậm rì và thiết bị cùi mía.
4. Click **Reload** ![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/reload.png)

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/performance.png)

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/overview.png)

Expand mục **User Timing**, dựa trên kết quả này để đánh giá, ở đây site Tony này đăng chạy React Development mode nên tiêu tốn khá nhiều thời gian

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/usertiming.png)

Expand mục **Main**, kéo xuống ở dưới cùng, do đang xử dụng framework nên những gì xảy ra ở trên thuộc về framework chúng ta sẽ không can thiệp gì được. Kết quả bên dưới cho thấy hàm `App` gọi khá nhiều lần đến `mineBitcoin`

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/mine.png)

Mở mục **Bottom-Up** để xem nhưng xử lý nào tiêu tốn nhiều thời gian nhất

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/bottomup.png)

Cột **Self Time** hiển thị bao nhiều thời gian cho việc thực thi function. Ví dụ trên cho thấy 57% thời gian tiêu tốn ở main threat là chon function `maineBitcoin`

Thay đổi một tí trong source code, chuyển qua mode production, xóa hàm mineBitcoin rồi chạy lại xem kết quả

![](https://developers.google.com/web/tools/chrome-devtools/speed/imgs/report6.png)

# Tổng kết

- Luôn bắt đầu với **Audit**, xác lập baseline trước khi thực hiện tối ưu
- Mỗi lần thay đổi một thứ thôi, sau đó chạy lại Audit để ghi nhận kết quả của thay đổi



[Link bài gốc](https://developers.google.com/web/tools/chrome-devtools/speed/get-started)

