---
slug: "2020-10-07-ban-co-the-lam-gi-voi-bien-css"
date: "2020-10-07"
title: "3 điều bạn có thể không biết về biến trong CSS"
desc: "Bài này chúng ta sẽ đi qua ba thứ chúng ta có thể làm được với biến trong css, có thể bạn chưa biết"
tags: ["css", "hoc-thuat"]
canonical_url: false
---

<!-- TOC -->

- [Chuyện gì xảy ra nếu chúng ta dùng `var()` với một biến undefined](#chuyện-gì-xảy-ra-nếu-chúng-ta-dùng-var-với-một-biến-undefined)
- [Fallback value khi giá trị biến không tìm thấy](#fallback-value-khi-giá-trị-biến-không-tìm-thấy)
- [DevTool của trình duyệt giúp được gì](#devtool-của-trình-duyệt-giúp-được-gì)

<!-- /TOC -->

## Chuyện gì xảy ra nếu chúng ta dùng `var()` với một biến undefined

Trước hết phải nói CSS và HTML là ngôn ngữ không quá strictly, một vài lỗi nhỏ không làm làm chết nguyên trang, nếu dùng `var()` với một biến không tồn tại, không gây ra ảnh hưởng parsing.

Sẽ có nhiều lý do cho việc xuất biến undefined trong `var`, có thể là

- Gõ nhầm tên biến
- Tưởng là có nhưng chưa define biến này
- Biến đó ko tồn tại trên trang đang xem

```css
ol li { --foo: red; }
ul li { color: var(--foo); }
```

Bởi, lời khuyên là luôn đặt biết ở node trên cùng như `:root` hay `html`, như vậy biến có thể truy xuất ở bất cứ đâu trong DOM.

```css
:root {
    --main-color: #f06;
}

.my-lovely-component {
    border: 1px solid var(--main-color);
}
```

Vậy nếu biến đó `undefined` thì sao? Thứ tự xử lý sẽ là

1. Nếu property đó ko *inheritable* (ví dụ như `border`) nó được đưa về `initial`
2. Nếu là property kế thừa, như `color`, thì `inherited` giá trị từ thằng cha, nếu không có cái nào hết, thì sẽ dùng `initial`

Giá trị initial của `border` sẽ là `medium none currentColor`, cái này siêng thì kiểm tra trên [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border#Formal_definition)

```css
:root {
    --main-color: #f06;
}

body {
    color: gold;
}

.my-lovely-component {
    // nó sẽ dùng giá trị `gold` kế thừa từ body
    color: var(--secondary-color);
}
```

## Fallback value khi giá trị biến không tìm thấy

Đây cũng ít ai để ý mà dùng, `var()` có thể truyền thêm tham số thứ 2, là giá trị fallback khi không tìm thấy biến

```css
// dùng red nếu không thấy --theme-color
color: var(--theme-color, red);
```

Khá clear đúng không, nhưng bạn cũng có thể viết như thế này cho nó *rắc rối* đồng đội chơi

```css
color: var(--foo, var(--bar, var(--baz, var(--are, var(--you, var(--crazy)))));
```

Cú pháp trên hoàn toàn hợp lệ, nhưng không nên làm khó nhau như vậy. Ngoài ra đây cũng là một cách viết hợp lệ 

```css
--my-variable: one, two, three;
content: var(--foo, one, two, three);
```

Hãy nhớ, làm mọi thứ đơn giản nhất thôi các bạn, đừng nghĩ mình viết như vậy sẽ thông minh hơn người khác.

## DevTool của trình duyệt giúp được gì

Rắc rối là như vậy, may mà chúng ta có DevTool cứu giúp

**Tự động điền tên biến**

Khi cần quick change trên trình duyệt, sau khi gõ `var(`, nó tự động gợi ý các biến hợp lệ

![Screenshot of Firefox's css var autocomplete](https://patrickbrosset.com/assets/firefox-css-var-autocomplete.png)

Firefox, Edge, Chrome đều có

**Biết giá trị nào đang được sử dụng**

Bên trong tab **Computed**, giá trị cuối cùng đang sử dụng sau cả tá kế thừa sẽ được hiện ra

![Screenshot of the tooltip that appears in Edge when you hover over a var() function](https://patrickbrosset.com/assets/edge-computed-css-var.png)

Hy vọng trong tương lai DevTool sẽ có nhiều hỗ trợ hơn như xác định biến `undefined`

[3 things about CSS variables you might not know](https://patrickbrosset.com/articles/2020-09-21-3-things-about-css-variables-you-might-not-know/)

