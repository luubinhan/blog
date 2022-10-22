---
slug: "/2018-10-05-gioi-thieu-focus"
date: "2018-10-05"
title: "Giới thiệu focus trên web"
desc: "Chúng ta nói về focus và làm cách nào chúng ta sử dụng nó trong ứng dụng web, bạn nào quan tâm accessibility thì phải biết cái này, đặt biệt mấy chế designer hay kêu bỏ focus ring"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["mobile-web-specialist", "ux-ui"]
---

Nói đến focus là nói đến element nào (như input, button, link, checkbox, select) đang nhận input từ bàn phím, hoặc clipboard nếu user gọi paste

![Giới thiệu focus trên web](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/keyboard-focus.png)

Element đang có trạng thái focus sẽ được xác định bằng vòng focus ring, tùy theo mỗi trình duyệt mà cách hiển thị khác nhau.

![Giới thiệu focus trên web](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/sign-up.png)

Mình từng gặp tình huống là lướt web bằng smart tv không có bàn phím và chuột, thao tác hoàn toàn bằng remote, hoặc một số người sử dụng máy tính chủ yếu bằng bàn phím, không thể dùng chuột vì lý do nào đó, không có cái focus ring là mình không biết được mình đang trỏ tới element nào hết

> Luôn đảm bảo ứng dụng có thể thao tác bình thường dù không cần chuột, chỉ cần bàn phím

![Giới thiệu focus trên web](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/system-prefs2.png)


Một số element của HTML như `input`, `button`, `select`, `a`, `textarea` được gọi là *focusable*, nghĩa là mặc định nó đã có `tabindex=0` và bạn tab là tới mà không cần viết thêm code gì cả 

![Giới thiệu focus trên web](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/implicitly-focused.png)

Những element khác như `<p/>`, `<div/>` không focus khi chúng ta ấn tab, không cần phải focus vào những element mà mình không cần tương tác gì với nó

![Giới thiệu focus trên web](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/not-all-elements.png)

Thử mở trang [airline site mockup page](http://udacity.github.io/ud891/lesson2-focus/01-basic-form/) và tab thử qua các element, trên trang này đang tắt hết các sự kiện mouse input.

Một tình huống cũng hay xảy ra, là ko biết focus đang nằm đâu, đang tab ngon lành, bỗng dưng mất tiêu focus ring, không thấy xuất hiện nữa, tab thêm vài cái nữa thì nó lại xuất hiện.

Nguyên nhân là có element focusable đang bị ẩn đi, không nằm trên màn hình, mặc dù nó có tồn tại, để xác định được element nào đang focus, có thể dùng javascript `document.activeElement`

```js
console.log(document.activeElement)
```

Đã thấy công dụng của vòng focus, nếu bạn design không thích vòng focus mặc định của trình duyệt, dễ dàng bỏ đi bằng thuộc tính `outline`

```css
:hover, :focus {
    outline: none; // hoặc 0
}
```

![Giới thiệu focus trên web](https://developers.google.com/web/fundamentals/accessibility/imgs/focus-ring.png)

Bạn hãy cho nó một cách hiển thị khác, để user biết được đang focus vào element nào

```css
:hover, :focus {
    background: red;
}
```


Bài viết liên quan

- [Ràng buộc dữ liệu input với HTML5](/2019-03-25-rang-buoc-du-lieu-voi-html-5/)
- [Sử dụng aria trên site eCommerce, vấn đề accessibility cần quan tâm](/2018-10-08-huong-dan-aria-va-su-dung-voi-ecommerce-site)
- [Sử dụng tabindex](https://luubinhan.github.io/blog/2018-10-02-huong-dan-su-dung-tabindex-de-di-chuyen/)

<a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/web/fundamentals/accessibility/focus/">📜 Introduction to Focus</a>

<a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/web/fundamentals/accessibility/accessible-styles">📜 Styling focus</a>

