---
slug: "/2018-05-21-huong-dan-thuoc-tinh-counter-increment-va-counter-reset"
date: "2018-05-21"
title: "Hướng dẫn sử dụng thuộc tính counter-reset và counter-increment"
desc: "Nếu muốn đánh số tự động trong css, ta thường sử dụng đến kiểu display list-style, bài này giới thiệu một thuộc tính khác ít ai biết tới"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

Tương tự như `<ol>`, để có thể đánh số thứ tự một cách tự động cho bất kể element nào, ta có thể dùng cặp thuộc tính `counter-reset` và `counter-increment`

```css
article {
    // section là một định danh bất kỳ, giá trị khởi tạo = 0
    counter-reset: section; 
}
section {
    // đặt cho đối tượng con, trên mỗi giá trị section nằm trong article, counter sẽ tăng lên 1
    counter-increment: section; 
}

section h2:before {
    // giá trị counter được truyền vào cho thuộc tính content
    content: counter(section) '. '; 
}
```

Nếu không thích kiểu đánh số mặc định là 1, 2, 3 ...., có thể chỉ định bằng cách

```css
section:before {
    content: counter(section, upper-roman)
}
```

Hoạt động tốt trên IE8+

Một số áp dụng tìm trên codepen

<p data-height="265" data-theme-id="0" data-slug-hash="GdXyWo" data-default-tab="css,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Custom List Style 3" class="codepen">See the Pen <a href="https://codepen.io/chriscoyier/pen/GdXyWo/">Custom List Style 3</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<p data-height="265" data-theme-id="0" data-slug-hash="xjapNK" data-default-tab="css,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Wilto Counters" class="codepen">See the Pen <a href="https://codepen.io/chriscoyier/pen/xjapNK/">Wilto Counters</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<p data-height="265" data-theme-id="0" data-slug-hash="qYoLaq" data-default-tab="css,result" data-user="snookca" data-embed-version="2" data-pen-title="Timeline CSS with Counters" class="codepen">See the Pen <a href="https://codepen.io/snookca/pen/qYoLaq/">Timeline CSS with Counters</a> by Jonathan Snook (<a href="https://codepen.io/snookca">@snookca</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>