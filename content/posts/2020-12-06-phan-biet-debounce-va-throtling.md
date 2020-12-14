---
slug: "2020-12-06-phan-biet-debounce-va-throtling"
date: "2020-12-06"
title: "Phân biệt debounce và throttle"
desc: "Phân biệt 2 phương pháp xử lý khi cần nâng cao hiệu năng"
tags: ["hoc-thuat", "web", "javascript"]
canonical_url: false
---

### `debounce`

Được sử dụng để **delay** việc thực thi một hàm nào đó. Ví dụ khi user nhập vào ô search, chúng ta **không thực thi ngay** câu lệnh tìm kiếm **mà đợi** một khoảng thời gian sau khi user đã ngừng việc nhập.

![img](https://i0.wp.com/css-tricks.com/wp-content/uploads/2016/04/debounce.png)

Có thể hình dung cái thang máy, cửa chuẩn bị đóng, nếu có người đưa chân vào nó sẽ không chạy liền, mà cho người đó vào rồi mới chạy.

<iframe height="265" style="width: 100%;" scrolling="no" title="Debouncing keystrokes Example" src="https://codepen.io/dcorb/embed/mVGVOL?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/mVGVOL'>Debouncing keystrokes Example</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### throttle

**Trong khoản thời gian đã chỉ định, chỉ thực thi hàm 1 lần duy nhất**, bỏ qua mọi lần gọi khác. Ví dụ như user click liên tục vào nút **search** để gọi API, chúng ta chỉ thực thì đúng lần đầu, các lần click tiếp theo chúng ta cho qua và không gọi API.

Một ví dụ khác làm infinite-scroll, khi user đã load đến vị trí **gần** cuối trang, chúng ta sẽ đi lấy thêm dữ liệu, chúng không đợi đến khi user **đã đến** cuối trang. `debounce` sẽ không hữu ích vì nói chỉ cho thực thi khi user stop việc scroll. `throttle` sinh ra cho việc này.

<iframe height="265" style="width: 100%;" scrolling="no" title="Infinite scrolling throttled" src="https://codepen.io/dcorb/embed/eJLMxa?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/eJLMxa'>Infinite scrolling throttled</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Rất hữu dụng khi cần gắn các sự kiện vào DOM. Vì chúng ta có thể hạn chế bớt số lần thực thi không cần thiết.

Ví dụ với sự kiện scroll, nếu chúng ta bắt `onScroll` để thực thi một hành động, số lần thực thi sẽ rất lớn. Đây là vấn đề vào năm 2011 của Twitter,  user khi scroll trên điện thoại sẽ chậm và tệ nhất là *memory leak* luôn.

> Nên sử dụng thư viện có sẵn nếu cần, như `lodash`, đừng tự viết lại.

### `requestAnimationFrame`

Là một API của trình duyệt, tương tự như `_.throttle(doSomething, 16)`

Sinh ra để đáp ứng chạy cho thật mượt (đảm bảo 60fps).

Khi sử dụng cần tự viết việc *start/cancel*

IE9 không hỗ trợ

<iframe height="265" style="width: 100%;" scrolling="no" title="Scroll comparison requestAnimationFrame vs throttle" src="https://codepen.io/dcorb/embed/pgOKKw?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dcorb/pen/pgOKKw'>Scroll comparison requestAnimationFrame vs throttle</a> by Corbacho
  (<a href='https://codepen.io/dcorb'>@dcorb</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

##### Ghi chú từ [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
