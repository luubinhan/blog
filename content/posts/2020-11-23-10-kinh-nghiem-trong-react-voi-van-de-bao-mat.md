10 kinh nghiệm trong React để tránh các vấn đề với bảo mật

## Dùng data binding mặc định để có XSS protection

Khi render một nội dung dạng `text` bằng kiểu data binding mặc định (đặt trong dấu `{}`), React sẽ mặc định xử lý để tránh các vấn đề về XSS. Lưu ý một điều là nếu truyền vào cho `attribute` của element thì sẽ không có được tính năng này.

Mặc định có XSS protection

```jsx
<div>{textContent}</div>
```

Không có XSS protection

```jsx
<form action={data} />
```

## Validate URLs trước khi sử dụng

URLs có thể bị inject một code js bằng `javascript:`. Để **validate** một URL chỉ được phép là một trong 2 dạng `http:` `https:`:

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

## Server-side render