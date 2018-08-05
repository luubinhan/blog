---
slug: "/2018-08-01-pointer-events-nhung-dieu-ban-co-the-lam"
date: "2018-08-01"
title: "Những điều có thể làm với pointer-events"
desc: "Một vài ứng dụng khác của pointer-events"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

`pointer-events` thường được sử dụng nhất để bỏ qua sự kiện click trên element.

# Thay đổi style của element parent khi hover

Khi button được hover lên, chúng ta thay đổi style của thằng cha

```html
<div class='parent'>
  <button class='btn'>
    Hover me
  </button>
</div>
```

```css
.parent {
  pointer-events: none;
  transition: border-color 0.15s ease-in-out;
  &:hover {
    border-color: #0069d9;
  }
}
.btn {
  pointer-events: auto;
}
```

Nếu đoạn code trên ko set `pointer-events: none` thì khi ta hover lên `<div class='parent'/>` nó sẽ thay đổi ngay, ở đây ta đang chặn lại để sự thay đổi chỉ xảy ra khi hover lên button

# Thay đổi style của element khác

Khi hover lên `.btn`, `.element` sẽ thay đổi màu text

```html
<div class='parent'>
  <div>
    <button class='btn' />
  </div>
  <div>
    <div class='element' />
  </div>
</div>
```

```css
.parent {
  pointer-events: none;
  &:hover {
    .element {
      color: #28a745;
    }
  }
}
.btn {
  pointer-events: auto;
}
```

[Xem toàn bộ demo](https://codepen.io/MartijnCuppens/pen/MBjqbM)