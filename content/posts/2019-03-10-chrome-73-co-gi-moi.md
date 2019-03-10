---
slug: "/2019-03-10-chrome-73-co-gi-moi"
date: "2019-03-10"
title: "Chrome 73 có gì mới"
desc: "Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome"]
---

<!-- TOC -->

- [Logpoint](#logpoint)
- [Tooltip hiển thị chi tiết về element trong Inspect mode](#tooltip-hiển-thị-chi-tiết-về-element-trong-inspect-mode)
- [Export dữ liệu code coverage](#export-dữ-liệu-code-coverage)
- [Di chuyển bên trong cửa sổ Console bằng phím mũi tên](#di-chuyển-bên-trong-cửa-sổ-console-bằng-phím-mũi-tên)
- [Thêm đường contrast đề nghị trong popup Color Picker](#thêm-đường-contrast-đề-nghị-trong-popup-color-picker)
- [Lưu giá trị Geolocation đã thay đổi](#lưu-giá-trị-geolocation-đã-thay-đổi)
- [Code Folding](#code-folding)
- [Message Tab](#message-tab)

<!-- /TOC -->


## Logpoint

Cho phép log message trong cửa sổ Console mà không cần dùng lệnh `console.log()` bên trong source

Để add logpoint

1 - click phải chuột tại vị trí mong muốn trong source code, chọn **Add logpoint**
![Chọn Add logpoint trong source](https://developers.google.com/web/updates/images/2019/01/add-logpoint.png)

2 - Nó sẽ hiện ra popup, nhập vào đó một cái expression mong muốn
![Popup để nhập expression](https://developers.google.com/web/updates/images/2019/01/breakpoint-editor.png)
![Nhập giá trị biến trong cửa sổ popup](https://developers.google.com/web/updates/images/2019/01/logpoint-expression.png)

> Để nhập giá trị biến, ví dụ `TodoApp`, đặt tên biến bên trong dấu `{}` như vầy `{TodoApp}`

Đọc thêm bài viết [Always Log Objects](https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4#a4f3) để nắm rõ hơn cú pháp này.

3 - Click vào vùng bên bất kỳ để save, một cái badge màu cam sẽ đánh dấu cho biết đang log ở vị trí đó. click vào cái badge này để bỏ log, giá trị log này sẽ ko bị mất khi bạn refresh trang.
![Nhập giá trị biến trong cửa sổ popup](https://developers.google.com/web/updates/images/2019/01/logpoint-badge.png)

## Tooltip hiển thị chi tiết về element trong Inspect mode

Trong khi đang mở chế độ inspect element ![](https://developers.google.com/web/tools/chrome-devtools/images/shared/inspect.png), nếu đưa chuột lên trên element đó, một cửa sổ nhỏ hiển thị thông tin quan trong như font size, font color, contrast ratio, margin

![Tooltip hiển thị chi tiết về element trong Inspect mode](https://developers.google.com/web/updates/images/2019/01/inspect.png)

## Export dữ liệu code coverage

Code coverage là kết quả đánh giá có bao nhiêu phần trong code đã được thực thi, [xem thêm chi tiết](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage), bây giờ chúng ta có thể export kết quả này ra file json, nội dung file sẽ như sau

```json
[
  {
    "url": "https://wndt73.glitch.me/style.css",
    "ranges": [
      {
        "start": 0,
        "end": 21
      },
      {
        "start": 45,
        "end": 67
      }
    ],
    "text": "body { margin: 1em; } figure { padding: 0; } h1 { color: #317EFB; }"
  },
  ...
]
```

- `url` là đường dẫn source file css, hay js đã analyze
- `ranges` là phần code đã sử dụng, trong đó có `start` là hàng đầu tiên, đến vị trí `end`
- `text` là toàn bộ source code

1. Đầu tiên gọi `Control + Shift + P` để mở cửa sổ Command
![mở cửa sổ Command](https://developers.google.com/web/updates/images/2019/01/command-menu.png)

2. Gõ vào đoạn text `coverage`
![Chọn Coverage(https://developers.google.com/web/updates/images/2019/01/show-coverage.png)
![Cửa sổ Coverage(https://developers.google.com/web/updates/images/2019/01/coverage.png)

3. Click **Reload** [Reload](https://developers.google.com/web/tools/chrome-devtools/images/shared/reload.png) để tiến hành analyze

4. Click nút **Export** [Export](https://developers.google.com/web/tools/chrome-devtools/images/shared/export.png) để xuất file

## Di chuyển bên trong cửa sổ Console bằng phím mũi tên

Ấn Shift + Tab bên trong cửa sổ Console

![Focusing a link](https://developers.google.com/web/updates/images/2019/01/focus1.png)

Dùng phím mũi tên lên xuống để di chuyển, trái phải để mở hoặc đóng toàn bộ một node

![Focusing another link](https://developers.google.com/web/updates/images/2019/01/focus2.png)

## Thêm đường contrast đề nghị trong popup Color Picker

Popup Color Picker giờ sẽ có thêm một đường nữa gọi là [AAA Contrast Ratio recommendation](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html), trước đây chỉ có một đường là AA

Đường ở trên là AA, đường dưới là AAA
![The AA line (top) and AAA line (bottom)](https://developers.google.com/web/updates/images/2019/01/AAA.png)

Nếu bạn chưa biết, contrast ratio là độ tương phản đề nghị cần có cho chữ và màu nền để người đọc web có thể đọc được nội dung, design thường thích kiểu chữ xám xám trong khi nó rất khó đọc.

## Lưu giá trị Geolocation đã thay đổi

Mở cửa sổ **Sensors** Control + Shift + P, gõ tìm **Sensors** 

![Command Menu](https://developers.google.com/web/updates/images/2019/01/command-menu.png)
![Sensors tab](https://developers.google.com/web/updates/images/2019/01/sensors.png)

Trong mục **Geolocation** click **Manager**. **Settings > Geolocations** trong cửa sổ mới mở ra
![Geolocations tab in Settings](https://developers.google.com/web/updates/images/2019/01/geolocations.png)

Chọn **Add location**, nhập thông tin xong chọn **Add**

## Code Folding

Trong cửa sổ **Source** và **Network** có thể thu gọn code, kiểu collapse ấy
![Lines 54 to 65 have been folded](https://developers.google.com/web/updates/images/2019/01/folding.png)

Để bật tính năng này, ấn F1 để vào **Settings > Preferences > Source **, sau đó chọn mục **Code Folding**

## Message Tab

Cửa sổ **Frames** giờ đổi tên thành **Message**, nó chỉ có trong tab **Network**, dùng để inspect web socket connection

![Messages tab](https://developers.google.com/web/updates/images/2019/01/messages.png)


[Xem video ở đây](https://www.youtube.com/watch?v=uddZX9ZK6wY&list=WL&index=2&t=0s)

