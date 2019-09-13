---
slug: "/2019-09-06-gioi-thieu-can-ban-ve-cors"
date: "2019-09-06"
title: "Làm quen với phương pháp Atomic để structure source code, design"
desc: "Atom, molecule, organism, template, và page là những khái niệm chính của phương pháp này"
cover: "https://miro.medium.com/max/1838/1*uhcVPeGql8ejpHjYIbpdJQ.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "ux-ui"]
---

<!-- TOC -->

- [Atom](#atom)
- [Molecule](#molecule)
- [Organism](#organism)
- [Template](#template)
- [Page](#page)

<!-- /TOC -->

Đây là một trong những cách tiếp cận để structure một thiết kế một system. Tác giả của structure này là Brad Frost, thanh niên bị ám ảnh bởi một thạc sĩ hóa học người Việt Nam (chắc dạy ở Mỹ), dạy môn hóa học khi anh này đang học cấp II.

Lấy ý tưởng **nguyên tử** hóa học, sự **kết hợp** giữa các **nguyên tử** tạo ra một **phân tử**, kết hợp các phân tử lại tạo thành 1 sinh vật

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/chemical-equation.png)

Thú thật ngày xưa mình rất dốt hóa, nên mình chỉ chém nhiêu đây thôi, không dám chém thêm về hóa học.

Những khái niệm chính của Atomic cần nắm

- **Atom** nguyên tử (nguyên tố), đơn vị nhỏ nhất
- **Molecule** do 2 nguyên tử trở lên hợp lại tạo thành, những phân tử hóa học như H2O được cấu thành từ nguyên tử Hidro và Oxy
- **Organism** là sự kết hợp của nhiều phân tử tạo thành

Chúng ta đã biết bảng tuần hoàn hóa học, thứ ám ảnh thời học sinh

![Bảng tuần hoàn hóa học](http://atomicdesign.bradfrost.com/images/content/periodic-table.png)

Thì lớn lên chúng ta có bảng tuần hoàn HTML, ám ảnh thời web developer

![Bảng tuần hoàn HTML](http://atomicdesign.bradfrost.com/images/content/html-periodic-table.png)

Sự kết hợp của các element chúng ta tạo ra những trang web khác nhau (Organism)

Ngoài 3 khái niệm chính trên của hóa học, tác giả đưa thêm 2 khái niệm vào của dân web chúng ta

- **Template**
- **Page**

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/atomic-design-process.png)

### Atom

Những element nhỏ nhất trong giao diện, đó chính là các thẻ html

```html
<input />
<label />
<button />
```

### Molecule

Trong lập trình chúng ta thường gọi nó là component, thí dụ như search component sẽ bao gồm `label`, `input`, `button`

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/molecule-search-form.png)

### Organism

Một component có ô search, có thanh navigation, logo, đố bạn đó là gì? Header

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/organism-header.png)

Tất nhiên header cũng có thể  có nhiều component khác

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/organisms-headers.png)

Một component có thể gọi là Organism có thể bao gồm nhiều component lặp lại như danh sách sản phẩm, bài viết

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/organisms-product-grid.png)

### Template

Giờ tới khái niệm mà tất cả anh em làm web chúng ta điều biết

Template là page nhưng ở dạng skeleton, chúng ta chưa tô vẽ gì cụ thể, nó như một cái rập, chúng ta dùng để đập ra vài trăm bộ đồ.

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/template-timeinc-homepage.png)

### Page

Page là một một UI hoàn chỉnh với nội dung, hình ảnh, logic có đầy đủ hết rồi

![Structure theo phương pháp Atomic](http://atomicdesign.bradfrost.com/images/content/page-timeinc-homepage.png)

Một illustration tổng quát

![](http://atomicdesign.bradfrost.com/images/content/atomic-design-abstract-concrete.png)

