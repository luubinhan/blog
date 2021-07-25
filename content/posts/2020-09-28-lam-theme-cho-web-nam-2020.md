---
slug: "2020-09-28-lam-theme-cho-web-nam-2020"
date: "2020-09-28"
title: "Hướng dẫn dùng biến trong CSS để làm dark/light mode"
desc: "Nếu bạn cũng như mình, mặc kệ những đứa xài IE11, mình chỉ hỗ  trợ cho đối tượng người sử dụng là những người trẻ thông minh, xài Edge, xài Chrome, xài Firefox, đọc ngay bài viết này mình chỉ cách làm."
tags: ["css", "ui-ux"]
canonical_url: false
---

Cách đây mười năm, nếu bạn hỏi mình có thể đặt biến trong CSS thì câu trả lời sẽ là KHÔNG, bạn cần viết bằng các ngôn ngữ như SCSS, LESS để có thể xài biến.

> Còn trong năm 2020, thì câu trả lời sẽ là CÓ.

Tại sao chúng ta lại muốn đặt biến màu sắc kích thước? Để khi chúng ta muốn thay đổi bộ mặt một website từ xanh lá chuối sang đỏ rực lửa, chỉ cần "búng tay" là có liền.

Ví dụ chúng ta theo trào lưu "light và dark theme" cho website, user có thể chọn kiểu sáng-sạch-sẽ hay đen-đuông-đuốc

![](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F11xwGmImm24QEBIRv6a0NzhW-wTc9rFh6%2Fdarktheme-darktheme-usage-availability-toggle.png)

Cú pháp đặt biến trong CSS, bắt đầu bằng dấu `--`, sau đó là tên biến

```css
:root {
    --my-background-color: #fff;
    --heading-1-font-size: 15em;
    --another-variable: 20px;
}
```

Ví dụ sử dụng những biến đã khai báo

```css
h1 {
    background-color: var(--my-background-color);
    font-size: var(--heading-1-font-size);    
}
```

Chúng ta đưa tất cả những giá trị cần thay đổi khi switch qua lại giữa 2 mode dark/light vào các biến số bên trong `body`

```css
// Light theme
body {
    --bg-color: #F3F7F9;
    --bg-content-color: #fff;
    --bg-code: #fffbf3;
    --body-color: #444;
    --title-color: #111;
    --link-color: #6b17e6;
    --border-color:  rgba(0,0,0,.1);
    --space: 3.5rem;
    --content-width: 860px;
    --header-height: 80px;
    --radius: 5px;
}
```

Khi thay đổi giá trị sang dark mode

```css
// Dark theme
body[data-theme="dark"] {
 	--bg-color: #0D2538;
 	--bg-content-color: #0f2d44;
 	--bg-code: rgba(0,0,0,.3);
 	--border-color:  rgba(255,255,255,.1);;
 	--body-color: #ced8de;
 	--title-color: #fff;
 	--link-color: #af9cef;
}
```

Chúng ta sẽ thêm một số hàm cần thiết vào trong `window`

```js
// Mượn xài đỡ của overreacted.io
(function() {
    window.__onThemeChange = function() {};
    function setTheme(newTheme) {
        window.__theme = newTheme;
        preferredTheme = newTheme;
        document.body.setAttribute('data-theme', newTheme);
        window.__onThemeChange(newTheme);
    }

    var preferredTheme;
    try {
        preferredTheme = localStorage.getItem('theme');
    } catch (err) { }

    window.__setPreferredTheme = function(newTheme) {
        setTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (err) {}
    }

    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkQuery.addListener(function(e) {
        window.__setPreferredTheme(e.matches ? 'dark' : 'light')
    });

    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})();
```

Thao tác cuối cùng là một đoạn JS để trigger việc đổi mode

```js
// Ví dụ hàm xử lý onClickChangeTheme sẽ được gắn vào một button

function onClickChangeTheme(mode = 'dark') {
  window.__setPreferredTheme(mode);
}

```

Chúng ta cũng có thể check được theme mà user đã chọn trước đó

```js
 if (window.__theme == 'dark') // làm gì đó thật vi diệu
```

Kỹ thuật là như vậy, còn nếu bạn hỏi mình sẽ cập nhập trang blog này cho có 2 mode light/dark theme? Mình sẽ không làm, một số website như trang của mình thì việc switch màu như vậy không đem lại nhiều giá trị cho người đọc.


Bài viết của vuilaptrinh.com