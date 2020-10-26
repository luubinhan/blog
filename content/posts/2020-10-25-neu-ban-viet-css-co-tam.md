---
slug: '2020-10-25-neu-ban-viet-css-co-tam'
date: '2020-10-25'
title: 'Một vài điểm nên nhớ khi viết CSS'
desc: 'Nếu bạn là người viết CSS có tâm, bạn cần đọc bài này để tránh những lỗi edge case khi viết CSS'
tags: ['thuat-thuat', 'css']
canonical_url: false
---

## Khoảng cách giữa title và icon

![img](https://ishadeed.com/assets/just-in-case/just-in-case-1.png)

Phần chữ ở *title* có thể sẽ rất dài, về để tránh nó bị dính sát rạt với cái icon, thêm `margin-right: 1rem`

## 2 button nằm kề nhau

Nếu có 2 button nằm kế nhau, 99,9999% chúng ta muốn giữa các button có khoảng trắng, dùng css selector `adjacent-sibling`

```css
.button + .button {
    margin-left: 1rem;
}
```

## Tag và Category

![img](https://ishadeed.com/assets/just-in-case/just-in-case-3.png)

Trong trường hợp mà tag name và category name quá dài, nếu để nó dàn trải như trong hình, sẽ tốt hơn nếu cho nó rớt dòng

![img](https://ishadeed.com/assets/just-in-case/just-in-case-3-1.png)

```css
.tag {
    max-width: 6.25rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
```

## Không load được image

Nếu dùng thẻ `<img />` mà nó ko load được hình thì sao, 1 cách cũng khá đơn giản là set `background-color`

![img](https://ishadeed.com/assets/just-in-case/just-in-case-5.png)

```css
img {
    background-color: #525252;
}
```

## Hình Avatar

Đừng quên đặt `object-fit: cover` để có một hình tròn trịa đẹp đẽ như bên dưới, không bị *stretch* hay *compressed*

![img](https://ishadeed.com/assets/just-in-case/just-in-case-6.png)



[The Just in Case Mindset in CSS](https://ishadeed.com/article/the-just-in-case-mindset-css/)