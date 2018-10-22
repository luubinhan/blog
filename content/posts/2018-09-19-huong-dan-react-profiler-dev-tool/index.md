---
slug: "/2018-09-19-huong-dan-react-profiler-dev-tool"
date: "2018-09-19"
title: "Giới thiệu React Profiler"
desc: "Từ version React 16.5 bổ sung thêm một plugin DevTool profiler. Plugin này được dùng để thu thập các thông tin về thời gian render một component, xác định nguyên nhân làm trì trệ performance."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "performance"]
---

<!-- TOC -->

- [Thu thập](#thu-thập)
- [Đọc hiểu kết quả](#đọc-hiểu-kết-quả)
- [Lọc commit](#lọc-commit)
- [Flame chart](#flame-chart)
- [Ranked chart](#ranked-chart)
- [Component Chart](#component-chart)
- [Tương tác](#tương-tác)

<!-- /TOC -->

## Thu thập

Trên bộ DevTools sẽ có thêm tab **Profiler**

![](https://reactjs.org/static/devtools-profiler-tab-4da6b55fc3c98de04c261cd902c14dc3-acf85.png)

React-dom 16.5+ hỗ trợ thu thập dữ liệu khi chạy DEV, để dùng trong production sử dụng `react-dom/profiling`, Đọc thêm cách sử dụng ở đây https://fb.me/react-profiling

Trên màn hình vừa mở, click nút record để bắt đầu thu thập dữ liệu

![record để bắt đầu thu thập dữ liệu](https://reactjs.org/static/start-profiling-bae8d10e17f06eeb8c512c91c0153cff-acf85.png)

Lúc này, khi một component react chạy `render`, thông tin sẽ được thu thập. Sử dụng app như bình thường, khi không muốn thu thập dữ liệu nữa, click nút **stop**

![stop record](https://reactjs.org/static/start-profiling-bae8d10e17f06eeb8c512c91c0153cff-acf85.png)

## Đọc hiểu kết quả

Chúng ta quan tâm đến quá trình **commit** React component - là khi component được **insert**, **update**, hoặc **remove** khỏi DOM.

Ở trên cùng, bên phải, để ý cái bar chart

![](https://reactjs.org/static/commit-selector-bd72dec045515d59be51c944e902d263-8ef72.png)

Mỗi một cột trong cái chart này đại diện cho một commit, commit đang chọn sẽ được tô đen. Độ cao của cột này tương ứng cho thời gian cần để render.

## Lọc commit

Thời gian thu thập dữ liệu càng lâu, ứng dụng render càng nhiều lần, sớm muộn số lượng dữ liệu quá lớn như vậy chúng ta cần phải lọc để xem nhanh kết quả cần tìm. Ví dụ ẩn đi toàn bộ commit có thời gian bé hơn giá trị ms nào đó

![](https://reactjs.org/filtering-commits-683b9d860ef722e1505e5e629df7ef7e.gif)

## Flame chart

**Flame chart** đại diện cho trạng thái của ứng trong một thời điểm commit cụ thể. Mỗi cột đại diện cho một component, kích thước và màu sắc thể hiện thời gian render component và các component con bên trong. Màu xanh thì tốn ít thời gian, màu vàng là nhiều thời gian và màu xám là không render

![Flame chart](https://reactjs.org/static/flame-chart-3046f500b9bfc052bde8b7b3b3cfc243-acf85.png)

Ví dụ trên, commit trên tiêu tốn hết 18.4ms để render. Router tốn nhiều nhất thời gian để render: 18.4ms. Phần lớn là do phải render tất cả các component con, `Nav` (8.4ms), `Route` (7.9ms)

Click vào từng cột để hiển thị chi tiết các component con

![Click vào từng cột để hiển thị chi tiết các component con](https://reactjs.org/zoom-in-and-out-39ba82394205242af7c37ccb3a631f4d.gif)

Bên cột phải chúng ta có các thông tin như props, state, tổng số lần render.

![](https://reactjs.org/props-and-state-1f4d023f1a0f281386625f28df87c78f.gif)

Trong một số trường hợp, chọn vào component, chuyển qua lại giữa commit, sẽ có thông tin bổ sung tại sao component được render lại

![](https://reactjs.org/see-which-props-changed-cc2a8b37bbce52c49a11c2f8e55dccbc.gif)

## Ranked chart

**Ranked chart** đại diện cho 1 commit. Mỗi cột trong chart là một component, các cột này được sếp theo thứ tự component nào tốn nhiều thời gian render nhất sẽ lên trên.

![](https://reactjs.org/static/ranked-chart-0c81347535e28c9cdef0e94fab887b89-acf85.png)

## Component Chart

Để xem đã bao nhiêu lần 1 component được render. Mỗi cột là mỗi lần component được render.

![](https://reactjs.org/static/component-chart-d71275b42c6109e222fbb0932a0c8c09-acf85.png)

Double-click vào component này hoặc chọn component và chọn nút blue bar phải góc phải trên. Để xem thêm các thông tin khác

![](https://reactjs.org/see-all-commits-for-a-fiber-99cb4321ded8eb0c21ae5fc673878563.gif)

## Tương tác

Hiện tại đây đang trong quá trình thử nghiệm cho tính năng này, tracking nguyên nhân gây ra update.

![](https://reactjs.org/static/interactions-a91a39ac076b71aa7a202aaf46f8bd5a-acf85.png)

Mỗi dòng là một tương tác đã được track. Nút màu xanh bên cạnh là commit liên quan tới tương tác này.

Kiểm tra một tương tác trong commit cụ thể từ **flame chart** và **ranked chart**

![](https://reactjs.org/static/interactions-for-commit-9847e78f930cb7cf2b0f9682853a5dbc-acf85.png)

[Source code ví dụ](https://github.com/facebook/react-devtools/tree/master/test/example)

[Demo](https://react-devtools-profiler-demo.now.sh/)

[Link bài gốc](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
