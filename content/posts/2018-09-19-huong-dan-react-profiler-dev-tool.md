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

![](https://reactjs.org/static/4da6b55fc3c98de04c261cd902c14dc3/ad997/devtools-profiler-tab.png)

Trên màn hình vừa mở, click nút **Record** để bắt đầu thu thập dữ liệu

![record để bắt đầu thu thập dữ liệu](https://reactjs.org/static/bae8d10e17f06eeb8c512c91c0153cff/ad997/start-profiling.png)

Khi một component gọi `render`, thông tin sẽ được thu thập. Sử dụng app như bình thường, khi không muốn thu thập dữ liệu nữa, click nút **stop**

![stop record](https://reactjs.org/static/45619de03bed468869f7a0878f220586/ad997/stop-profiling.png)

## Đọc hiểu kết quả

Với một component thì chúng ta quan tâm đến các sự kiện sau: khi **insert**, **update**, hoặc **remove** khỏi DOM (các sự kiện này gọi là *commit*)

Ở trên cùng, bên phải, để ý cái bar chart

![](https://reactjs.org/static/bd72dec045515d59be51c944e902d263/d8f62/commit-selector.png)

Mỗi một cột trong chart này đại diện cho một commit, commit đang chọn sẽ được tô đen. Độ cao của cột này tương ứng cho thời gian cần để render.

## Lọc commit

Thời gian thu thập dữ liệu càng lâu, ứng dụng `render` càng nhiều lần, sớm muộn số lượng dữ liệu quá lớn như vậy chúng ta cần phải lọc để xem nhanh kết quả cần tìm. Ví dụ ẩn đi toàn bộ commit có thời gian bé hơn giá trị `ms` nào đó

![](https://reactjs.org/683b9d860ef722e1505e5e629df7ef7e/filtering-commits.gif)

## Flame chart

**Flame chart** đại diện cho trạng thái của ứng dụng trong một thời điểm commit cụ thể. Mỗi cột đại diện cho một component, kích thước và màu sắc thể hiện thời gian render component và các component con bên trong. Màu xanh thì tốn ít thời gian, màu vàng là nhiều thời gian và màu xám là không render

![Flame chart](https://reactjs.org/static/3046f500b9bfc052bde8b7b3b3cfc243/ad997/flame-chart.png)

Ví dụ trên, commit trên tiêu tốn hết 18.4ms để render. Router tốn nhiều nhất thời gian để render: 18.4ms. Phần lớn là do phải render tất cả các component con, `Nav` (8.4ms), `Route` (7.9ms)

Click vào từng cột để hiển thị chi tiết các component con

![Click vào từng cột để hiển thị chi tiết các component con](https://reactjs.org/39ba82394205242af7c37ccb3a631f4d/zoom-in-and-out.gif)

Bên cột phải chúng ta có các thông tin như `prop`, `state`, tổng số lần render.

![](https://reactjs.org/1f4d023f1a0f281386625f28df87c78f/props-and-state.gif)

Trong một số trường hợp, chọn vào component, chuyển qua lại giữa commit, sẽ có thông tin bổ sung tại sao component được render lại

![](https://reactjs.org/cc2a8b37bbce52c49a11c2f8e55dccbc/see-which-props-changed.gif)

Trong hình, giá trị `state.scrollOffset` khác nhau giữa hay lần commit dẫn đến re-render

## Ranked chart

**Ranked chart** đại diện cho 1 commit. Mỗi cột trong chart là một component, các cột này được sếp theo thứ tự component nào tốn nhiều thời gian render nhất sẽ lên trên.

![](https://reactjs.org/static/0c81347535e28c9cdef0e94fab887b89/ad997/ranked-chart.png)

> Thời gian render component cha sẽ bao gồm tổng thời gian render các component con

## Component Chart

Để xem đã bao nhiêu lần 1 component được render. Mỗi cột là mỗi lần component được render.

![](https://reactjs.org/static/d71275b42c6109e222fbb0932a0c8c09/ad997/component-chart.png)

Double-click vào component này hoặc chọn component và chọn nút blue bar phải góc phải trên. Để xem thêm các thông tin khác

![](https://reactjs.org/99cb4321ded8eb0c21ae5fc673878563/see-all-commits-for-a-fiber.gif)

## Tương tác

Hiện tại đây đang trong quá trình thử nghiệm cho tính năng này, tracking nguyên nhân gây ra update.

![](https://reactjs.org/static/a91a39ac076b71aa7a202aaf46f8bd5a/ad997/interactions.png)

Mỗi dòng là một tương tác đã được *track*. Nút màu xanh bên cạnh là commit liên quan tới tương tác này.

![](https://reactjs.org/static/9847e78f930cb7cf2b0f9682853a5dbc/ad997/interactions-for-commit.png)

Kiểm tra một tương tác trong commit cụ thể từ **flame chart** và **ranked chart**

![](https://reactjs.org/7c66e7686b5242473c87b3d0b4576cf3/navigate-between-interactions-and-commits.gif)

<iframe width="560" height="315" src="https://www.youtube.com/embed/nySib7ipZdk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Source code ví dụ](https://github.com/facebook/react-devtools/tree/master/test/example)

[Demo](https://react-devtools-profiler-demo.now.sh/)

[Link bài gốc](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
