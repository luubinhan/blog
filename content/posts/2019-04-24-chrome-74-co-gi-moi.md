---
slug: "/2019-04-24-chrome-74-co-gi-moi"
date: "2019-04-24"
title: "Có gì mới trong DevTools của Chrome 74"
desc: "Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome"
cover: "https://i.imgur.com/bj1kcFp.png"
type: "post"
lesson: 0
chapter: 0
tags: ["chrome"]
---

<!-- TOC -->

- [Highlight tất cả element đang áp dụng CSS](#highlight-t%E1%BA%A5t-c%E1%BA%A3-element-%C4%91ang-%C3%A1p-d%E1%BB%A5ng-css)
- [Lighthouse](#lighthouse)
- [Xem nội dung của WebSocket binary](#xem-n%E1%BB%99i-dung-c%E1%BB%A7a-websocket-binary)
- [Chụp ảnh màn hình](#ch%E1%BB%A5p-%E1%BA%A3nh-m%C3%A0n-h%C3%ACnh)
- [Bổ sung filter Service worker trong tab Network](#b%E1%BB%95-sung-filter-service-worker-trong-tab-network)
- [Performance recording](#performance-recording)

<!-- /TOC -->

## Highlight tất cả element đang áp dụng CSS

Khi hover lên một property CSS, giao diện sẽ được highlight những element nào đang chịu ảnh hưởng

![Highlight tất cả element đang áp dụng CSS](https://developers.google.com/web/updates/images/2019/03/highlight.png)

## Lighthouse

Thêm mục đánh giá [Tap targets are not sized appropriately](https://developers.google.com/web/tools/lighthouse/audits/tap-targets), đại khái là nó sẽ kiểm tra các element để user click, như là button, a, role=button, có được set kích thước phù hợp trên mobile hay chưa, các element có bị đặt gần nhau quá không, vì gần nhau quá user có thể vô tình click nhầm

![Tap targets are not sized appropriately](https://developers.google.com/web/tools/lighthouse/audits/images/tap-targets.png)

Mục đánh giá cho PWA bây giờ được quánh giá theo cơ chế Badge, tức là anh đáp ứng đủ 9 tiêu chí nhận huân chương hạng B, 10 tiêu chí huân chương hạng A.

## Xem nội dung của WebSocket binary

![WebSocket binary message viewer](https://developers.google.com/web/updates/images/2019/03/binary1.png)

Mở tab **Network**, chọn filter **WS** để lọc các connection dạng WebSocket

![WebSocket binary message viewer](https://developers.google.com/web/updates/images/2019/03/binary2.png)

Chọn vào tên WebSocket muốn xem

![WebSocket binary message viewer](https://developers.google.com/web/updates/images/2019/03/binary3.png)

Mở tab **Messages**

![WebSocket binary message viewer](https://developers.google.com/web/updates/images/2019/03/binary6.png)

Chọn vào binary message muốn xem, bạn có thể Copy vào clipboard ![](https://developers.google.com/web/tools/chrome-devtools/images/shared/copy-to-clipboard.png), thay đổi kiểu định dạng sang Base64 hoặc UTF-8

![WebSocket binary message viewer](https://developers.google.com/web/updates/images/2019/03/binary5.png)

## Chụp ảnh màn hình

Tính năng này có lâu rồi, nhưng trước đây để access được hơi khó khăn vì bị ẩn đi, từ giờ nó sẽ được đưa vào Command Menu

`Control+Shift+P` để mở Command Menu, gõ `area`, chọn tiếp **Capture area screenshots**

![Chụp ảnh màn hình](https://developers.google.com/web/tools/chrome-devtools/images/shared/command-menu.png)

Kéo thả vào vùng muốn chụp

![Kéo thả vào vùng muốn chụp](https://developers.google.com/web/updates/images/2019/03/screenshot1.png)

## Bổ sung filter Service worker trong tab Network

Gõ `is:service-worker-initiated` hoặc `is:service-worker-intercepted` trong tab Network để lọc tất cả request được khởi tạo hoặc khả năng bị modified bở service worker

![Bổ sung filter Service worker trong tab Network](https://developers.google.com/web/updates/images/2019/03/swfilters1.png)

![Bổ sung filter Service worker trong tab Network](https://developers.google.com/web/updates/images/2019/03/swfilters1.png)


## Performance recording

Cửa sổ Performance sẽ có thêm phần Long Task, những task nào tốn quá nhiều thời gian sẽ được gắn thêm marker màu đỏ

![Performance recording](https://developers.google.com/web/updates/images/2019/03/longtasks1.png)

Phần Timings cũng bổ sung mục **First Pain**

![Phần Timings cũng bổ sung mục First Pain](https://developers.google.com/web/updates/images/2019/03/fp.png)


<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=I14fXc7sXdU&list=WL&index=2&t=0s">What's New In DevTools (Chrome 74)
</a>
