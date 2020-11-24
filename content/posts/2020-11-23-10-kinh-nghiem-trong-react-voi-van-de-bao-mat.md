---
slug: "2020-11-23-10-kinh-nghiem-trong-react-voi-van-de-bao-mat"
date: "2020-11-23"
title: "Vài lưu trong React để tránh các vấn đề với bảo mật"
desc: "Một vài điểm nhắc nhớ các bạn khi đang viết React, để tránh bị dính injection"
tags: ["thu-thuat", "react"]
canonical_url: false
---

## Dùng data binding mặc định để có XSS protection

Khi render một nội dung dạng `text` bằng kiểu **data binding mặc định** (đặt trong dấu `{}`), React sẽ **mặc định** xử lý để tránh các vấn đề về XSS. Lưu ý một điều là nếu truyền vào cho `attribute` của element thì sẽ không có được tính năng này.

Mặc định có XSS protection

```jsx
<div>{textContent}</div>
```

Không có XSS protection, nhớ validate thủ công trước

```jsx
<form action={data} />
```

## Validate URLs trước khi sử dụng

URLs có thể bị *inject* một code js bằng `javascript:`. Để **validate** một URL chỉ được phép là một trong 2 dạng `http:` `https:`:

```jsx
function validateURL(url) {
  const parsed = new URL(url)
  return ['https:', 'http:'].includes(parsed.protocol)
}

<a href={validateURL(url) ? url : ''}>Click here!</a>
```

## Render HTML

Việc render HTML như trên trang chính thức của React cũng đã đề cập, *hết sức nguy hiểm*, nên luôn phải **sanitized** trước khi render, dùng thư viện https://www.npmjs.com/package/dompurify

```jsx
import purify from "dompurify";

<div dangerouslySetInnerHTML={{ __html:purify.sanitize(data) }} />
```

## Truy cập trực tiếp đến DOM

Không được truy cập trực tiếp đến DOM rồi *inject* thêm vào element nào đó, luôn sử dụng cặp đôi `dangerouslySetInnerHTML` và `dompurify` như ở trên nếu cần chèn nội dung

```jsx
import purify from "dompurify";

<div dangerouslySetInnerHTML={{__html:purify.sanitize(data) }} />
```

Đừng có làm vậy nghe, dùng `findDomNode()`, rồi `innerHTML` như thời đi học

```jsx
this.myRef.current.innerHTML = attackerControlledValue;
```

## Kiểm tra thư viện dependency

Các thư viện dependency đôi khi cũng rất nguy hiểm, một cách vô tình hay cố ý, dùng những công cụ như là [snyk](https://www.npmjs.com/package/snyk) tích hợp với công cụ quản lý code (Github, Gitlab, Bitbucket) để kiểm tra một cách tự động.

## JSON

Việc gửi đi một JSON lên phía server cũng không phải là ít gặp, luôn escape ký tự `<` để tránh bị *inject*

```js
window.__PRELOADED_STATE__ =   ${JSON.stringify(preloadedState).replace( /</g, '\\u003c')}
```



[10 React security best practices](https://snyk.io/blog/10-react-security-best-practices/)