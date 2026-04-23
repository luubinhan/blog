---
slug: "/2020-05-01-huong-dan-lam-animate-sieu-don-gian-voi-react"
date: "2020-05-01"
title: "Làm animate siêu đơn giản với hook khi react component mount và unmount"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

Có rất nhiều lúc chúng ta muốn thêm/xóa một element trên trình duyệt, nó rất chi là trực quan dễ dàng với jQuery, tuy nhiên vì không còn đụng chạm trực tiếp vào DOM, việc đơn giản đó lại hơi _kỳ công_

```js
// những ngày xa xưa ấy còn đâu
$("#my-element").fadeIn("slow");
```

Tại sao lại khó khăn ấy nhỉ? Hãy mường tượng nó qua một ví dụ

```css
/* styles.css */

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

```jsx
// index.js

const App = ({ show = true }) =>
  show ? <div style={{ animation: `fadeIn 1s` }}>HELLO</div> : null;
```

Đó là tất cả những gì chúng ta cần làm để animate lúc component đang mount với `fadeIn`, tuy nhiên lại không có cách nào để animate _unmount_, vì chúng ta đã xóa cái DOM ngay khi `show` chuyển thành `false`. Element đã ra đi ngay lập tức.

Vậy chúng ta cần làm gì

1. `show` thay đổi, báo react khoan hãy unmount, delay nó lại một chút
2. Chạy animate
3. Animate vừa chạy xong, unmount

Đây là cách làm đơn giản nhất chỉ bằng CSS và hook, tất nhiên nếu đụng tới những tính huống phức tạp hơn, khuyến khích bạn sử dụng [react-spring](https://www.react-spring.io/)

```jsx
// index.js

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Fade from "./Fade";

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow((show) => !show)}>
        {show ? "hide" : "show"}
      </button>
      <Fade show={show}>
        <div> HELLO </div>
      </Fade>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

```jsx
// Fade.js

import React, { useEffect, useState } from "react";

const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        style={{ animation: `${show ? "fadeIn" : "fadeOut"} 1s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default Fade;
```

```css
/* styles.css */

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

Bạn có thể xem [demo ở đây](https://codesandbox.io/s/react-easy-animation-b658i)

[Super easy react mount/unmount animations with hooks](https://czaplinski.io/blog/super-easy-animation-with-react-hooks/)
