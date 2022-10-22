---
slug: "/2020-03-12-thu-thuat-su-dung-don-vi-viewport-tren-mobile"
date: "2020-03-12"
title: "Thủ thuật sử dụng đơn vị viewport trên mobile"
desc: "Để có thể quản lý được state của ứng dụng một cách tốt nhất, chúng ta cần sự phân chia phù hợp giữa local state (internal state của component) và state cửa ứng dụng đặt trong React Context. Một vài điều muốn chia sẽ để nâng cao khả năng bảo trì và trải nghiệm nếu sử dụng đến context trong React."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "thu-thuat"]
---

Đơn vị viewport trong css (`vh`, `vw`) không phải lúc nào cũng chạy đúng trên mọi trình duyệt điện thoại. Giống như chưa đủ khổ cho dev nên mỗi trình duyệt mobile lại có cách xử lý riêng cho đơn vị này.

Cách mà [w3 định nghĩa](https://www.w3.org/TR/css-values-3/#viewport-relative-lengths) cách tính đơn vị này. Với mobile cái chúng ta quan tâm nhiều nhất là đơn vị `vh`

> 1vh = 1% độ cao khởi tạo của khu vực trình duyệt dùng để hiển thị trang web.

Nghĩa là giá trị này không bao gồm các phần khác của trình duyệt, như thanh address, thanh bookmark (**nếu có**), tab bar, ... và những thứ linh tinh khác mà user có thể add thêm vào trình duyệt của họ.

Nhưng khi bạn bắt đầu scroll trên điện thoại, câu chuyện trở nên phức tạp hơn, thanh address bar sẽ biến mất, giá trị của `vh` cần phải cập nhập lại, hiện tượng _cà khịa_ xuất hiện trên màn hình.

Trình duyệt Safari trên iOS là người tiên phong sử dụng luôn một giá trị cố định đúng với kích thước màn hình (không phải kích thước khung hiển thị của trình duyệt). Chrome mobile cũng bắt đầu áp dụng cách này để chặn việc nội dung trang nhảy lung tung.

Điều này có ý nghĩa như thế nào? Nghĩa là khi bạn đặt giá trị `100vh` nó sẽ vượt ra ngoài, user sẽ phải scroll trên trình duyệt để xem hết.

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/07/viewport-units-mobile-crop.jpg?ssl=1)

Để khắc phục nhược điểm này. Chúng ta không thể trông cậy vào css, phải dùng đến javascript túm lấy độ cao `window.innerHeight`, lưu giá trị đó lại thành một biến CSS và sử dụng nó thay cho đơn vị `vh`

```css
.my-element {
  height: 100vh; /* fallback khi trình duyệt không hỗ trợ biến css */
  /* cái này chỉ có trên webkit */
  min-height: -webkit-fill-available;
  height: calc(var(--vh, 1vh) * 100);
}
```

Chúng ta sẽ _túm lấy_ và định nghĩa `--vh` bằng javascript

```js
// Trước tiên lấy viewport height và chuyển thành giá trị 1%
let vh = window.innerHeight * 0.01;
// Đặt biến css
document.documentElement.style.setProperty("--vh", `${vh}px`);
```

Còn một vấn đề nhỏ còn lại cần phải xử lý là cập nhập lại giá trị này khi trình duyệt thay đổi kích thước (xoay trái, xoay phải, xoay ngang, xoay dọc)

```js
// chạy lại khi window resize
window.addEventListener("resize", () => {
  // làm tương tự 2 bước đã làm
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
```

[The trick to viewport units on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
