---
slug: '/2020-07-22-su-dung-ellipsis-text-voi-flexbox'
date: '2020-07-22'
title: 'Sử dụng ellipsis text với flexbox'
desc: 'Câu chuyển cắt chuỗi khi quá dài bằng CSS, trong tình huống sau, cái tên file của bạn quá dài, nhưng bạn không muốn cắt ở cuối chuỗi, mà cắt ở giữa để vẫn thấy được file extension'
cover: ''
type: 'post'
lesson: 0
chapter: 0
tags: ['css', 'thu-thuat']
---


![Finder](https://leonardofaria.net/wp-content/uploads/2020/07/finder.jpg)

Chuỗi chưa cắt

```
mobile-phone-screenshot-long-fine-name.png
```

Chuỗi sau khi cắt

```
mobile-phone-sc...g-fine-name.png
```

![Finder](https://leonardofaria.net/wp-content/uploads/2020/07/filename.gif)

Cái HTML structure dĩ nhiên là chúng ta tách cái đuôi file ra riêng, độc lập với cái tên

```html
<div class="filename">
  <span class="filename__base">this-file-has-a-really-really-really-long-filename.</span>
  <span class="filename__extension">pdf</span>
</div>
```

CSS:

```css
.filename {
  display: flex;
  min-width: 0;
}

.filename__base {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.filename__extension {
  flex-shrink: 0;
}
```

Việc ellipsis text sẽ được thực hiện bởi kết hợp ba thuộc tính `text-overflow`, `white-space` và `overflow`. Tuy nhiên chúng ta vẫn phải ước lượng được mối liên hệ giữa phần chứa file name `.filename__base` và element bọc bên ngoài (ở đây là `.filename`)

Thủ thuật quan trọng ở đây là dùng thuộc tính **`min-width: 0`**, chúng ta đặt giá trị nhỏ nhất cho phép của `.filename`, nó sẽ *ép* các thằng con bên dưới co lại nếu nó không có khai báo thuộc tính `flex-shrink`

[Demo các bạn xem ở đây](https://codepen.io/leonardofaria/pen/rNxZJad)

[Using Flexbox and text ellipsis together](https://leonardofaria.net/2020/07/18/using-flexbox-and-text-ellipsis-together/)
