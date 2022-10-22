---
slug: "/2019-05-15-huong-dan-layout-masonry-bang-flexbox"
date: "2019-05-15"
title: "Làm layout masonry bằng flexbox"
desc: "Những ngày làm masonry layout với các thư viện jquery đã ko còn nữa"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---


Một trong những cách đơn giản nhất để tạo masonry layout là dùng flexbox, tất cả những gì cần làm là set `flex-flow: column wrap` và `height: giá-trị-độ-cao-nào-đó`, là bạn có kiểu layout nổi tiếng của pinterest.

```css
/* hiển thị theo dạng column, rớt dòng khi cần thiết */
.container {
    display: flex;
    flex-flow: column wrap;
    align-content: space-between;
    /* fixed height, cao hơn độ cao của item cao nhất */
    height: 960px;
}
```

Cách này bị một vấn đề, thứ tự các item chúng ta sẽ là như thế này
![Làm layout masonry bằng flexbox](https://i.imgur.com/Xiyr8Gj.jpg)

Đây không phải là kết quả chúng ta mong muốn, nó phải xếp các item từ trái qua phải mới hợp gu

Nếu chuyển giá trị `flex-direction: row`, thứ tự sẽ đúng như mong muốn, tuy nhiên nó lại bị khoảng trống khi các item có độ cao không đồng nhất, như thế này 

![Làm layout masonry bằng flexbox](https://i.imgur.com/iC5BJRw.jpg)

Sử dụng kết hợp với 2 thuộc tính `:nth-child()` và `order` để giải quyết vấn đề này

|   | Column 1  | Column 2  | Column 3  |
|---|---|---|---|
| Row 1  | 1  | 2  | 3  |
| Row 2  | 4  | 5  | 6  |
| Row 3  | 7  | 8  | 9  |
| Row 4  | 10  | 11  | 12  |

Chúng ta có 3 cột, chúng ta sẽ xếp các item theo từng cột, nhưng order nó theo hàng

```css
/* sắp xếp lại theo từng dòng */
.item:nth-child(3n+1) { order: 1; }
// set order = 1 cho các item 1, 4, 7, 10,...
.item:nth-child(3n+2) { order: 2; }
// set order = 1 cho các item 2, 5, 8, 11,...
.item:nth-child(3n) { order: 3; }
// set order = 1 cho các item 3, 6, 9, 12,...

```

Với các item có cùng giá trị order như `1, 4, 7, 10` trình duyệt sẽ render theo thứ tự xuất hiện của html, một cách ngắn gọn với đoạn css trên chúng ta đã xếp các item lại theo thứ tự là `1,4,7,10,2,5,8,11,3,6,9,12`

Còn một trường hợp có thể xảy ra là item có độ cao ko `fill` hết chỗ trống trong cột, khi ấy nó sẽ dồn item đó về cột phía trước

![Làm layout masonry bằng flexbox](https://i.imgur.com/4oBdLOd.png)

Để xử trí vụ này, đây là một cái trick khá vi diệu, chúng ta sẽ chèn 2 element `before` và `after` có giá trị  `order: 2` để các item sẽ theo thứ tự `1, 4, 7, 10, <break>, 2, 5, 8, 11, <break>, 3, 6, 9, 12`

```css
/* bắt buộc chèn vào cột mới */
.container::before,
.container::after {
content: “”;
flex-basis: 100%;
width: 0;
order: 2;
}
```

Đường màu xám là 2 element `before` và `after`

![Làm layout masonry bằng flexbox](https://i.imgur.com/yTnodUu.jpg)

Toàn bộ source

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  ...
</div>
```

```css
/* hiển thị theo dạng column, rớt dòng khi cần thiết */
.container {
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
/* fixed height, cao hơn độ cao của item cao nhất */
  height: 600px; 
}

.item {
  width: 32%;
  margin-bottom: 2%;
}

/* sắp xếp lại theo từng dòng */
.item:nth-child(3n+1) { order: 1; }
// set order = 1 cho các item 1, 4, 7, 10,...
.item:nth-child(3n+2) { order: 2; }
// set order = 1 cho các item 2, 5, 8, 11,...
.item:nth-child(3n) { order: 3; }
// set order = 1 cho các item 3, 6, 9, 12,...

/* bắt buộc chèn vào cột mới */
.container::before,
.container::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
```

[Toàn bộ source trên codepen](https://codepen.io/collection/XPjvPP/)


<a target="_blank" rel="noopener noreferrer" href="https://tobiasahlin.com/blog/masonry-with-css/">CSS masonry with flexbox, :nth-child(), and order</a>