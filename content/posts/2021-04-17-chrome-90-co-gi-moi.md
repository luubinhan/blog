---
slug: "2021-04-17-chrome-90-co-gi-moi"
date: "2021-04-17"
title: "Một vài thay đổi đáng chú ý của Chrome 90"
desc: "Một vài thay đổi đáng chú ý trong DevTools của Chrome 90 sắp tới"
tags: ["chrome"]
canonical_url: false
---

## Công cụ debug CSS Flexbox xịn xò hơn

![Công cụ debug CSS Flexbox xịn xò hơn](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/hbg2toNQJqIWB30Mo2xt.png?auto=format&w=846)

Giờ nếu có một HTML element có dạng `display: flex` hoặc `display: inline-flex`, bạn sẽ thấy một cái nút bé bé `flex` trên cái **Element panel**

Bên dưới **Style panel**, sẽ có thêm một icon nhỏ kế bên `display: flex`, click vào đó sẽ mở ra một menu để lựa chọn như trên hình.

Trong **Layout Panel** sẽ có thêm một khu vực cho **Flexbox** liệt kê tất cả các element đang có dạng hiển thị *flex*

## Đo performance bằng Core Web Vitals

[Core web vitals](https://web.dev/vitals/) là một bộ hướng dẫn do google khởi xướng để đánh giá thế nào là một trang web xịn xò.

`Ctrl + Shift + P` để mở Command menu trong DevTools, tìm mục **Show Rendering**, click vào checkbox **Core Web Vitals**

Một ô màu đen nho nhỏ sẽ xuất hiện chứa các thông tin quan trọng sau:

- [Largest Contentful Paint (LCP)](https://web.dev/lcp/): đo thời gian load. Trong khoản **2.5 giây** cho lần load đầu tiên là ngon.
- [First Input Delay (FID)](https://web.dev/fid/): thời điểm có thể *tương tác*. FID vào **dưới 100 mili giây**.
- [Cumulative Layout Shift (CLS)](https://web.dev/cls/): độ ổn định của UI, ví dụ như việc bạn load quá nhiều font khác nhau sẽ tác động tới con số này. CLS **dưới 0.1**.

![Đo performance bằng Core Web Vitals](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/95Iw3l9ePIopJuApx65h.png?auto=format&w=846)

## Tab Issue

![Tab Issue](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/vg2AGCiq8IWkXU7MoHR9.png?auto=format&w=846)

Số issue có trên trang được move lên trên cùng của **Console Panel** để nhắc nhở chúng ta ngày này quá tháng nọ.

Bổ sung  [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity/overview/), lại nhắc nhẹ chúng ta về chất lượng của ứng dụng

![Trusted web activity](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/FSoAR540YOC6B86Cl7l7.png?auto=format&w=846)

[Xem thêm video này của Andre để hiểu thêm](https://youtu.be/QJlbMfW3jPc)

## Định dạng lại chuỗi trong console

Chuỗi trong console sẽ được định dạng theo chuẩn JS string literal, nó sẽ **escape** ký tự `"`

![Định dạng lại chuỗi trong console](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/4OPajz8MHz5lPMhPpzg5.png?auto=format&w=846)

## Trust token panel trong Application

Bên trong tab **Application**, có thêm mục mới **Trust Tokens**

**Trust Token** là một API mới giúp chống gian lận, phân biệt người thật với bot, [tìm hiểu thêm](https://web.dev/trust-tokens/)

![New Trust Tokens pane](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/j5idcrmLOWTIcd6vG0q9.png?auto=format)

## Ngưng support `fn.displayName`

![Example usage of displayName](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/oXk5CGKAAPyJIQeecS0I.png?auto=format)

Trước đây Chrome vẫn cho phép sử dụng `fn.displayName` để có dễ trace lỗi lúc debug. Giờ sẽ được thay thế bằng `fn.name`



[Xem toàn bộ các thay đổi khác](https://developer.chrome.com/blog/new-in-devtools-90)