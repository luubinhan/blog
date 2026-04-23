---
slug: "/2022-01-31-co-gi-moi-trong-chrome-98"
date: "2022-01-31"
title: "Chrome 98 có gì mới"
desc: ""
cover: "https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/G9SHKEY2944USYg0uks6.jpg"
type: "post"
lesson: 0
chapter: 0
tags: ["chrome"]
---

## Tính năng thử nghiệm: Full-page accessibility tree

Tính năng Full-page accessibility tree sẽ cho phép dễ dàng xem [accessibility tree](https://developer.chrome.com/blog/full-accessibility-tree/#what-is-the-accessibility-tree)

Trên tab **Elements**, chọn tab **Accessibility**, click chọn checkbox **Enable full-page accessibility tree**

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png?auto=format&w=964)

Trong quá trình trải nghiệm nếu có ý kiến đóng góp, có thể gửi đến [đây](https://goo.gle/devtools-a11y-tree-feedback)

## Tab Changes

Code bên trong tab **Changes** sẽ được tự động format, thay vì như trước đây chỉ là một dòng

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png?auto=format&w=964)

## Đặt giá trị timeout khi record

Có thể đặt Timeout cho tất cả step hoặc step cụ thể, hữu dụng khi trang phải đợi network request quá lâu, hoặc animation

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png?auto=format&w=964)

## Đảm bảo trang đáp ứng cache với tab Back/forward cache

[Back/forward](https://web.dev/bfcache/) là tính năng của trình duyệt cho phép đi tới hoặc lùi trong tích tắc

Tab **Back/forward cache** cho phép kiểm tra tính năng này có hoạt động tốt trên trang hay không

Đi đến **Application > Back-forward Cache**, click nút **Test back/forward cache**, DevTools sẽ thử di chuyển tới, lui trên trang để xác định có bfcache chạy không.

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png?auto=format&w=964)

## Filter mới trên Properties

Trong tab **Properties**, trước đây property có giá trị `null` hoặc `undefined` sẽ không được hiển thị, giờ đây để hiển thị, chọn vào checkbox **Show all** trên thanh filter

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png?auto=format&w=964)

## Giả lập CSS forced-colors

CSS media có tính năng [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) để phát hiện user có dùng chế độ Windows Hight Contrast Mode không và áp dụng các CSS thích hợp

Để giả lập tính năng này: chọn Command Menu (Ctrl + P), **Show Rendering**, chọn trong dropdown **Emulate CSS media feature forced-colors**

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png?auto=format&w=964)

## Hiển thị thước kẻ khi hover bằng command

Mở Command Menu, tìm **Show rulers on hover**, cũng có thể mở bằng **Settings > Show rulers**

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png?auto=format&w=964)

## Thêm `row-reverse` và `column-reverse` trên flexbox

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png?auto=format&w=964)

## Phím tắt để chạy replay một XHR

Trên cửa sổ **Network**, chọn vào 1 request XHR muốn replay, ấn phím **R**

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png?auto=format&w=964)

Một số cải tiến và bug fix khác, tham khảo tại [What's New In DevTools (Chrome 98)](https://developer.chrome.com/blog/new-in-devtools-98/)