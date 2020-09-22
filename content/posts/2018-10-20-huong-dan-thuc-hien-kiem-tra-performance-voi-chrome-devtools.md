---
slug: "/2018-10-20-huong-dan-thuc-hien-kiem-tra-performance-voi-chrome-devtools"
date: "2018-10-20"
title: "Hướng dẫn kiểm tra performace với Chrome DevTools"
desc: "Học cách sử dụng tab Network Chrome DevTools để biết tại sao một trang load chậm, hướng dẫn từng bước một."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome", "performance"]
---

<!-- TOC -->

- [Bước 1: Cài đặt DevTools](#bước-1-cài-đặt-devtools)
- [Bước 2: Giả lập mobile](#bước-2-giả-lập-mobile)
- [Bước 3: Đánh giá kết quả](#bước-3-đánh-giá-kết-quả)
  - [Tìm các đoạn script block render](#tìm-các-đoạn-script-block-render)
  - [Tìm các request lớn](#tìm-các-request-lớn)
- [Xác nhận lại các thay đổi đã fix](#xác-nhận-lại-các-thay-đổi-đã-fix)
- [Đọc thêm](#đọc-thêm)

<!-- /TOC -->

# Bước 1: Cài đặt DevTools

Giả sử bạn nhận được phàn nàn từ user là trang nào đó trên site load quá chậm. Bạn cần check theo các bước

1. Mở <a targe="_blank" href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html">trang này</a> trong cửa sổ private mới

2. Ấn tổ hợp phím `Ctrl + Shift + I` để mở DevTools

3. Click tab **Network**

![Figure 1. The Chrome DevTools Network panel, opened next to the slow page that you're going to diagnose.](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/get-started-network-panel.png)

4. Click nút **Capture Screenshots** ![Capture Screenshots](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/capture-screenshots.png), nó chuyển sang xanh, để capture screenshot trong suốt quá trình trang được load

# Bước 2: Giả lập mobile

Sử dụng web trên máy tính thì ít có vấn đề, vì tốc độ mạng ngày nay được cải thiện nhiều, nếu máy tính mà vẫn chậm thì bạn xem lại nhé, giả lập xem trải nghiệm trên mobile thế nào

1. Check vào ô **Disable Cache** để quá trình kiểm tra chính xác hơn

2. Từ dropdown menu đang có giá trị **No throttling** chọn xuống **Regular 2G**. DevTools sẽ giả lập tốc độ mạng xuống 2G

![Figure 2. The Chrome DevTools Network panel, set up to emulate a mobile user's experience. Screenshots, cache disabling, and throttling are outlined in blue, from left to right, respectively.](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/get-started-setup.svg)

# Bước 3: Đánh giá kết quả

Tìm xem đâu là nguyên nhân làm chậm page load bằng cách reload lại trang và xem xét kết quả.

## Tìm các đoạn script block render

Khi trình duyệt gặp tag `<script>`, nó sau pause việc render, thực thi đoạn script ngay lập tức. 
1. Tìm các đoạn script không thật sự cần chạy ngay lập tức, đánh dấu async hoặc defer
Ấn tổ hợp `Ctrl + R` để load lại trang.

![Figure 3. The Chrome DevTools Network panel, after reloading the page.](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/get-started-post-load.png)

2. Để ý giá trị của `DOMContentLoaded` trong tab **Summary**, phía dưới tab Network. Bạn sẽ thấy 4 giây.

3. Click file `main.js` để xem, nó mở ra một tab mới show chi tiết hơn

4. Click vào tab **Preview** để xem source code. Đoạn script này đợi 4000ms, đánh dấu nó là async và chuyển xuống dưới `<body>`

![Figure 4. Viewing the source code for main.js in the Preview pane.](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/get-started-preview.png)

Đọc thêm [Parser-blocking vs. async Javascript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript) để tìm hiểu thêm về script block render

## Tìm các request lớn

Trong source ví dụ, bạn thấy cái logo sẽ load rất chậm, mặc dù nó không hề block render

1. Mở lại tab Network
2. Double click lên hình screenshot
3. Click mũi tên để di chuyển qua lại giữa các screenshot. Bên dưới screenshot là thời gian nó được chụp
4. Hover lên Waterfall cho request logo-1024.png. Phần lớn thời gian tiêu tốn cho việc download hình này.

![Figure 5. The waterfall for logo-1024px.png.](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/get-started-waterfall.png)

# Xác nhận lại các thay đổi đã fix

Chúng ta đã thực hiện 2 thay đổi

- Chuyển `<script>` xuống dưới body, đánh dấu thành async
- Đổi logo sang SVG

Giờ chúng ta chạy test lại một lần nữa để xem nó cải thiện được phần nào chưa

1. Mở [trang đã sữa](https://googlechrome.github.io/devtools-samples/network/gs/v2.html) trên tab private mới
2. Setup DevTools tương tự như lúc trước
3. Reload lại trang

![Figure 6. A recording of the page's load, after applying the fixes. The page used to take about 10 seconds to appear visually complete. Now it only takes about 1 second.](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/get-started-post-fix.png)

# Đọc thêm

- [Critical rendering path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
- [Network issue guide](https://developers.google.com/web/tools/chrome-devtools/network-performance/issues)
- [Network Panel Reference](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference)


[https://developers.google.com/web/tools/chrome-devtools/network-performance/](https://developers.google.com/web/tools/chrome-devtools/network-performance/)