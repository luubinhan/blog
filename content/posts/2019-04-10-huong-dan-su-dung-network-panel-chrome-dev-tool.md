---
slug: "/2019-04-10-huong-dan-su-dung-network-panel-chrome-dev-tool.md"
date: "2019-04-10"
title: "Sử dụng Panel Network của Chrome DevTools"
desc: "Panel Network trên trình duyệt Chrome là một công cụ rất hữu ích để phân tích các sự kiện network, bài này căn bản dành cho người mới nhé."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome"]
---

Panel Network trên trình duyệt Chrome là một công cụ rất hữu ích để phân tích các sự kiện network, bài này căn bản dành cho người mới nhé.

Để vừa đọc vừa vọc tut này, các bạn dùng trang này để vọc
https://devtools.glitch.me/network/getstarted.html

![Demo Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/demo.png)

Sau khi mở Panel Network trên DevTools, ấn Ctrl+R để refresh lại trang, lúc này các sự kiện của network sẽ được ghi lại và hiển thị trên tab
![Panel Network trên DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/log.png)

Bên dưới cùng, là thông tin về tổng số request đã gửi, tổng dung lượng đã down về

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/total-requests.svg)

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/total-size.svg)

Cái chart phía trên sẽ cho thấy cái nhìn khái quát về các sự kiện của network theo biểu đồ thời gian

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/hide-overview.svg)

Trong table network log

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/requests-table.svg)

- Status: mã response của HTTP
- Type: resource type
- Initiator: cho biết đứa nào đã **gây** ra request
- Size: size của resource
- Time: tổng số thời gian dùng để download/upload resource
- Waterfall: chart mô tả thời điểm request, thời gian request của một resource

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/waterfall-total-duration.png)

Click vào ![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/large-resource-rows-button.png) để hiển thị thêm thông tin trên từng resource, cột size sẽ cho biết là resource này đã được compress chưa.

Giá trị ở trên là size chưa compress, ở dưới là đã compress, nếu cả 2 giá trị này bằng nhau thì compress không chạy

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/large-request-rows.png)

Network log sẽ liên tục record thông tin khi có network request mới, nếu đã có đủ thông tin muốn lấy, click ![Stop record](https://developers.google.com/web/tools/chrome-devtools/network/imgs/record-on.png)  để dừng việc record này lại

Các column hiển thị trên Network log có thể tùy biến dễ dàng bằng cách click chuột phải lên tên cột

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/add-column.png)

Để giả lập môi trường mạng của mobile, sử dụng  Network Throttling

![Sử dụng Network Throttling Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/throttling.png)

![Sử dụng Network Throttling Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/slow3g.png)

Để kiểm tra lần load đầu tiên, trước hết chúng ta xóa cache của trình duyệt bằng cách click và giữ vào nút refresh ![Refresh](https://developers.google.com/web/tools/chrome-devtools/images/shared/reload.png), chọn "Empty Cache and Hard Reload", nó sẽ xóa hết cache trên trang hiện tại trước khi load
![Empty Cache and Hard Reload](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/hardreload.png)

Chúng ta có thể dùng tab Network để tìm một string trong header và message body.

Thí dụ, chúng ta muốn kiểm tra các resource có sử dụng cơ chế cache phù hợp chưa, nếu resource không thay đổi thường xuyên, trình duyệt nên được thông báo để cache các resource này. **Cơ chế** cache này được thiết đặt trong header, click nút search ![Search](https://developers.google.com/web/tools/chrome-devtools/images/shared/search.png) để hiển thị ô search, nhập Cache-Control rồi *enter*,  chúng ta sẽ có toàn bộ thông tin `Cache-control: max-age` của từng resource

![Sử dụng Search Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/search.png)

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/results.png)

Với ô filter, chúng ta cũng có vài tip trên ô filter ![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/filters.png) này

- Có thể dung regex, ví dụ `/.*\.[cj]s+$/` sẽ bỏ qua resource ko có chữa chữ c hoặc j

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/regex.png)

- Thêm dấu `-` phía trước để loại bỏ, như `-main.css` sẽ bỏ qua các resource có chứa `main.css`

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/negative.png)

- `domain:*anluu.com` để lọc các resource load từ anluu.com

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/imgs/filter-text-box.svg)

Trường hợp muốn block một resource nào đó để kiểm tra xem chuyện gì sẽ xảy ra khi chúng ta ko load nó.

Thí dụ chúng ta sẽ bỏ qua file stylesheet khi load trang, ấn tổ hợp phím `Ctrl+Shift+P` để mở menu, gõ Blocking -> chọn **Show Request Blocking** 

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/commandmenu.png)

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/block.png)

Chọn *Add pattern* ![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/images/shared/add.png)

Nhập main.css -> click Add.

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/addblock.png)

Sau đó refresh lại trang

![Sử dụng Panel Network của Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/imgs/tutorial/blockedstyles.png)


<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=e1gAyQuIFQo">Xem video của tut Inspect Network Activity - Chrome DevTools 101
</a>

