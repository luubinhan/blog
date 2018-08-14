---
slug: "/2018-03-28-huong-dan-mot-vai-tip-su-dung-chrome-dev-tools"
date: "2018-03-28"
title: "Một vài tip sử dụng Chrome Dev Tools"
desc: "Chrome DevTools càng ngày càng mạnh mấy bạn, bạn nào làm frontend cũng phải biết xài, một vài tip cóp nhặt có thể bạn chưa biết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Kéo thả các Element](#kéo-thả-các-element)
- [Reference đến element đang chọn trong console](#reference-đến-element-đang-chọn-trong-console)
- [Gọi lại giá trị tính toán lần trước trong console](#gọi-lại-giá-trị-tính-toán-lần-trước-trong-console)
- [Xác định đoạn CSS được định nghĩa ở đâu](#xác-định-đoạn-css-được-định-nghĩa-ở-đâu)
- [screenshot một element](#screenshot-một-element)
- [Tìm element sử dụng CSS selectors](#tìm-element-sử-dụng-css-selectors)
- [Shift-Enter trong console](#shift-enter-trong-console)
- [Clear console](#clear-console)
- [`Go to` như trong sumblime text hay VSCode](#go-to-như-trong-sumblime-text-hay-vscode)
- [Watch Expression](#watch-expression)
- [XHR/Fetch debugging](#xhrfetch-debugging)
- [Debug khi DOM bị thay đổi](#debug-khi-dom-bị-thay-đổi)

<!-- /TOC -->

## Kéo thả các Element

Bên trong tab Elements có thể kéo các element HTML và thả nó vào vị trí mới

![Kéo thả các Element](https://flaviocopes.com/chrome-devtools-tips/drag-and-drop.gif)

## Reference đến element đang chọn trong console

Để reference đến 1 element đang được chọn, gõ `$0`, nếu đang load jquery thì có thể dùng `$($0)`

![Reference đến element đang chọn trong console](https://flaviocopes.com/chrome-devtools-tips/reference-elements.gif)

## Gọi lại giá trị tính toán lần trước trong console

`$_` để gọi lại giá trị tính toán lần trước

```
3 + 4
// = 7
$_ * 2
// = 14
```

![Gọi lại giá trị tính toán lần trước trong console](https://flaviocopes.com/chrome-devtools-tips/use-last-result.gif)

## Xác định đoạn CSS được định nghĩa ở đâu

`cmd-click` (`ctrl-click` trong windows) vào property CSS trong tab Elements để nhảy ngay tới chổ định nghĩa

![Xác định đoạn CSS được định nghĩa ở đâu](https://flaviocopes.com/chrome-devtools-tips/find-where-css-defined.gif)

## screenshot một element

Chọn element + nhấn `cmd+shift+p` (`ctrl+shift+p` trong windows) để mở menu Command và chọn **Capture node screenshot**

![screenshot một element](https://flaviocopes.com/chrome-devtools-tips/screenshot-node.gif)

## Tìm element sử dụng CSS selectors

`ctrl+f` (`cmd+f` trong Mac) mở ô search, gõ đoạn css selector ở đây

![Tìm element sử dụng CSS selectors](https://flaviocopes.com/chrome-devtools-tips/find-elements-css-selectors.gif)

## Shift-Enter trong console

Để gõ đoạn code trên nhiều dòng trong console, ấn phím `shift-enter`

![Shift-Enter trong console](https://flaviocopes.com/chrome-devtools-tips/multiple-lines-commands.gif)

## Clear console

Để clear console thường ta sẽ nhấn nút Clear ở trên cùng, hoặc bằng gõ `ctrl+l` (`cmd+k`)

## `Go to` như trong sumblime text hay VSCode

Trong tab Source

- `ctrl+o` (cmd+o) để hiển thị tất cả file đang load
- `ctrl+shift+o` (cmd+shift+o) để hiển thị biểu tượng property, function hay là class trong file hiện tại
- `ctrl+g` để nhảy đến dòng

## Watch Expression

Thay vì phải viết đi viết lại biến hoặc expression trong lúc debug, thêm nó vào trong Watch Expression

![Watch Expression](https://flaviocopes.com/chrome-devtools-tips/watch-expressions.gif)

## XHR/Fetch debugging

Chỉ định khi nào dừng nếu send đi một XHR/Fetch request trong XHR/Fetch breakpoint panel

![](https://flaviocopes.com/chrome-devtools-tips/xhr-fetch-breakpoints.png)

## Debug khi DOM bị thay đổi

Right click vào element -> chọn **enable Break on Subtree Modifications**, khi có đoạn script nào thay đổi element, debugger sẽ stop ngay lập tức

![Debug khi DOM bị thay đổi](https://flaviocopes.com/chrome-devtools-tips/break-subtree-modifications.png)