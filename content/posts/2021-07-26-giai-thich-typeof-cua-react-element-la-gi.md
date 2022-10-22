---
slug: "2021-07-26-giai-thich-typeof-cua-react-element-la-gi"
date: "2021-07-26"
title: "typeof của React element để làm gì?"
desc: "Bài viết dành cho những bạn tò mò thích khám phá những gì diễn ra trong thế giới ngầm"
tags: ["javascript", "hoc-thuat", "react", "hard"]
canonical_url: false
---

Chúng ta viết một react component và bạn nghĩ mình viết JSX

```jsx
<marquee bgcolor="#000">Chào buổi sáng</marquee>
```

Nhưng thật ra chúng ta đang gọi hàm này

```jsx
React.createElement(
    /* type */ 'marquee',
    /* props */ { bgcolor: '#000' },
    /* children */ 'Chào buổi sáng'
)
```

Và function trên sẽ trả về cho chúng ta một `object`, *người đời* gọi `object` này là React element. Nó báo với React tiếp theo cần phải làm gì

```jsx
{
    type: 'marquee',
    props: {
        bgcolor: '#000',
        children: 'Chào buổi sáng',
    },
    key: null,
    ref: null,
    // highlight-next-line
    $$typeof: Symbol.for('react.element'), // ai đây ta?
}
```

`$$typeof` là cái gì vậy? và tại sao nó có value là `Symbol`?

Nếu chỉ cần sử dụng React thì việc biết hay không biết đến *nó* cũng không ảnh hưởng gì thế giới, chỉ dành cho các bạn thích tò mò.

######

Việc chèn thêm một HTML bằng code js như thế này đã từng rất phổ biến

```js
const messageEl = document.getElementById('message');
messageEl.innerHTML = '<p>' + message.text + '</p>';
```

Mọi thứ thật tuyệt vời cho đến khi *ai đó* cố tình nhét giá trị `<img src onerror="stealYourPassword()">` cho `message.text`. Một kiểu *hack nhẹ* cũng rất phổ biến

Để tránh kiểu tấn công này, chúng ta dùng `document.createTextNode()` hoặc `textContent`, hoặc **trục xuất** hết các ký tự `<` và `>` để nó không thể nào chạy được.

Tất nhiên không phải ai cũng biết và nhớ hết các thủ tục xử lý này khi nhận giá trị input từ user. Đó là lý do tại sao, các thư viện như React, việc **trục xuất** này được thực hiện mặc định

```jsx
<div>
{message.text}
</div>
```

Trong trường hợp **chúng ta biết mình đang làm gì**, muốn render thẻ HTML

```js
dangerouslySetInnerHTML={{ __html: message.text }}
```

Vậy dùng React thì an toàn tuyệt đối? **Không**

Phải nói có [nhiều lắm](https://github.com/facebook/react/issues/3473#issuecomment-90594748) cách tấn công dùng HTML và DOM. Việc chặn hết là quá khó và quá tốn thời gian.

Ví dụ nếu render `<a href={user.website}>`, và trang web dẫn đến có thể chỉ là `javascript: stealYourPassword()`, hay spreading kiểu này `<div {...userData}>` cũng nguy hiểm phết.

Vì với cách viết này

```jsx
// escape tự động
<div>
    {message.text}
</div>
```

...đã đủ an toàn lắm rồi đúng không? Không phải lúc nào cũng đúng. Đó là lý do tại sao có `$$typeof`

######

Một React element là một `object` như thế này

```js
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```

Tất nhiên chúng ta sẽ tạo ra object này bằng việc gọi `React.createElement()`. Nếu chúng ta sẽ lưu trữ `object` như một JSON ở phía server

```jsx
// server cho phép user lưu ở dạng JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* put your exploit here */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// Với React 0.13 đây là tử nguyệt
<p>
  {message.text}
</p>
```

React 0.13 đây là điểm bị lợi dụng để tấn công XSS. (Đáng lẽ ra ở phía Server không nên để cho user lưu dạng JSON như thế)

Phiên bản 0.14 React hỗ trợ xử lý con bug này bằng cách thêm đánh dấu **đây chính hiệu là react element bằng Symbol**

```js
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```

Bởi gì user hổng thể nào đặt một `Symbol` vào trong file JSON. **Thậm chí mấy ông làm backend ẩu tả cho phép return JSON thay vì text** cũng không vấn đề (Đoạn này chắc lão Dan đang cáo mấy chú Backend)

Điều tuyệt vời nữa là `Symbol.for()` thì scope ở mức global giữa các môi trường như iframe, worker. Nghĩa là việc **ném** các component qua lại giữa các môi trường cũng không bị ảnh hưởng.

######

Vậy nếu trình duyệt không hỗ trợ Symbol thì sao?

Đó là chuyện của user, ai bảo xài trình duyệt cũ thì không được bảo hộ đầy đủ chứ biết sao. React sẽ vẫn thêm vào property `$$typeof`, nhưng với giá trị `0xeac7`, tại sao là `0xeac7`? Tại tụi tui (React team) thấy nhìn nó giống chữ "React"

[Bài của Dan](https://overreacted.io/why-do-react-elements-have-typeof-property/)