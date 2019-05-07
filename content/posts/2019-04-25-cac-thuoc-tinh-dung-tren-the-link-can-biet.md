---
slug: "/2019-04-25-cac-thuoc-tinh-dung-tren-the-link-can-biet"
date: "2019-04-25"
title: "Preload, prefetch và các thuộc tính khác trên link"
desc: "Cùng tìm hiểu các attribute sử dụng trên thẻ link để cải thiện hiệu năng"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---


```html
<link rel="prefetch" href="/style.css" as="style" />
<link rel="preload" href="/style.css" as="style" />

<link rel="preconnect" href="https://example.com" />
<link rel="dns-prefetch" href="https://example.com" />

<link rel="prerender" href="https://example.com" />
```

## preload

`<link rel="preload" />`  sẽ báo với trình duyệt download và cache một resource (như script hoặc stylesheet) nhanh nhất có thể. Nếu chúng ta cần resource đó ngay sau khi trang đang load.

Một khi trình duyệt đã download xong resource này, trình duyệt sẽ không làm gì hết, file script đó sẽ ko được thực thi, file stylesheet sẽ ko được áp dụng. Nó cache lại ở đó, khi có một thằng nào khác cần tới nó, nó sẽ được cung cấp ngay lập tức.

Cú pháp

```html
<link rel="preload" href="/style.css" as="style" />
```

Các giá trị có thể cung cấp cho `as`

- style
- script
- font
- fetch

Chúng ta cần phải cung cấp giá trị `as` để trình duyệt biết thứ tự ưu tiên download về cho đúng.

Ví dụ, sử dụng custom font, nếu sử dụng font face chúng ta đặt việc load file này trong css

```html
<link rel="stylesheet" href="index.css" />
```

```css
/* index.css */
@font-face {
  src: url('comic-sans.woff2') format('woff2');
}
```

Theo mặc định file `comic-sans.woff2` chỉ được download khi file `index.css` đã được load và áp dụng. Chúng ta có thể *cưỡng ép* load file font này về trước


```html
<link rel="preload" href="comic-sans.woff2" as="font" />
```

## prefetch


`<link rel="prefetch" />` yêu cầu trình duyệt download và cache lại resource ngầm bên dưới, nó sẽ có độ ưu tiên thấp, không tranh giành thứ tự ưu tiên với các resource quan trọng hơn. Thí dụ như bạn cần resource đó ở các trang sau nữa, bạn có thể load trước để sẵn ở trang hiện tại.

Cú pháp

```html
<link rel="prefetch" href="/style.css" as="style" />
```

Ví dụ, user di chuyển từ home page sang trang product page, đa phần luồng đi của user sẽ là như thế, trừ trường hợp học bookmark lại trang đó, hoặc nhấp vào một link được share. Chúng ta có thể sử dụng `<link rel="prefetch" />` để tải trước các file css, js sẽ dùng trên trang product.

## preconnect

`<link rel="preconnect" />` được dùng để tăng tốc độ load ban đầu bằng việc báo với trình duyệt, chúng ta sẽ load một resource từ domain nào đó không sớm thì muộn. Thí dụ chúng ta load font từ Google, CDN, JSON từ API server.

Thực hư tăng tốc được bao nhiêu thì cũng chưa rõ, nhưng đây là cách chúng ta báo với trình duyệt

```html
<link rel="preconnect" href="https://api.my-app.com" />
```

## dns-prefetch

`<link rel="dns-prefetch" />` công dụng cũng tương tự như `preconnect`, nó sẽ setup sẵn các config cần thiết trên trình duyệt khi cần thực hiện một DNS resolution

```html
<link rel="dns-prefetch" href="https://api.my-app.com" />
```

## prerender

`<link rel="prerender" />` yêu cầu trình duyệt load 1 url và render nó trong một tab ẩn,  khi user click vào đường link đến url đó, trang web sẽ được hiển thị ngay và luôn.

Tuy nhiên là thuộc tính này tính đến thời điểm hiện tại rất ít trình duyệt hỗ trợ

```html
<link rel="prerender" href="https://my-app.com/pricing" />
```


<a target="_blank" rel="noopener noreferrer" href="https://3perf.com/blog/link-rels/watch?v=I14fXc7sXdU&list=WL&index=2&t=0s">Preload, prefetch and other link tags
</a>