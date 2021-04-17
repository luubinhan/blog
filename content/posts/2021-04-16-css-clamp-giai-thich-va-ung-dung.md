---
slug: "2021-04-16-css-clamp-giai-thich-va-ung-dung"
date: "2021-04-16"
title: "CSS Clamp giải thích và ứng dụng"
desc: "hàm clamp() của CSS rất hữu dụng khi xử lý các vấn đề liên quan đến responsive, là một tính năng mới hay ho bạn cũng nên biết đế áp dụng"
tags: ["css","hard"]
canonical_url: false
---

## Diễn giải

> Lưu ý: hàm clamp không chạy trên IE

```css
clamp(MIN, PREFER, MAX);
```

Trong đó:

- **MIN**: là giá trị chặn dưới, nếu giá trị **PREFER < MIN => return giá trị MIN**
- **PREFER**: là giá trị sẽ được return nếu đang nằm trong khoản giữa MIN và MAX
- **MAX**: là giá trị chặn trên, nếu giá trị **PREFER > MAX => return giá trị MAX**

## Ứng dụng

Sử dụng cho giá trị `font-size`

```css
body {
    font-size: clamp(1.1rem, 1vw + 1.1rem, 2.5rem);
}
```

Diễn giải đoạn code chỉnh `font-size` không thể rắc rối hơn ở trên: "tính dùm tôi cái font size cho nó tự động to nhỏ theo màn hình, với công thức tính là 1% của viewport + 1.1rem, kết quả không được phép nhỏ hơn 1.1rem và lớn hơn 2.5rem"

Kết quả nhận được

![CSS Clamp giải thích và ứng dụng](https://css-tricks.com/wp-content/uploads/2020/08/clamp.gif)

Chúng ta vừa cho phép giá trị font-size linh động theo kích thước màn hình, nhưng vẫn đảm bảo nó không được quá lớn và quá nhỏ với hai giá trị chặn trên, chặn dưới.

Sử dụng với thuộc tính `width`

Nếu bạn có đam mê với typography thì thể đọc hết cuốn [The element of typographic style](https://readings.design/PDF/the_elements_of_typographic_style.pdf). Ở đây mình xin trích một đoạn trong cuốn sách này: từ 45 đến 75 ký tự trên một cột là chuẩn không cần chỉnh. Áp dụng lý thuyết này ta có thể viết

```css
div {
    width: clamp(45ch, 50%, 75ch);
}
```

> `ch` là đơn vị tính độ rộng của một ký tự

<iframe height="265" style="width: 100%;" scrolling="no" title="clamp example" src="https://codepen.io/luckyluu/embed/VwPdEOK?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/luckyluu/pen/VwPdEOK'>clamp example</a> by Lưu An
  (<a href='https://codepen.io/luckyluu'>@luckyluu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

