---
slug: "2020-12-03-browser-render-website-nhu-the-nao"
date: "2020-12-03"
title: "Tóm tắt quá trình render của trình duyệt"
desc: "Tóm lược các bước chính trình duyệt cần thực hiện để render một trang web"
tags: ["hoc-thuat", "web"]
canonical_url: false
---

<!-- TOC -->

- [Parse HTML](#parse-html)
- [2 - External Resource](#2---external-resource)
- [3 - Parse CSS](#3---parse-css)
- [4 - Execute JS](#4---execute-js)
- [5 - Merge DOM và CSSOM để tạo render tree](#5---merge-dom-và-cssom-để-tạo-render-tree)
- [6 - Calculate layout và paint](#6---calculate-layout-và-paint)

<!-- /TOC -->

## Parse HTML

Khi trình duyệt nhận một dữ liệu HTML, nó sẽ **parse** qua DOM node

![](https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-1.png)

## 2 - External Resource

Khi gặp các file CSS, JS nó sẽ chạy đi lấy dữ liệu đó, quá trình **parse** vẫn tiếp tục, nhưng sẽ **chặn** việc render trên trình duyệt (CSS được sếp vào loại resource **block render**)

JS hơi khác, mặc định nó sẽ **chặn** quá trình parse HTML (**block parse**). Tuy nhiên với việc truyền thêm attribute `defer` hoặc `async`, việc parse js sẽ chạy ngầm, và không chặn parse HTML

Với `defer`, file sẽ được execute sau khi parse document xong, nếu nhiều file được thêm thuộc tính `defer`, nó sẽ được execute theo thứ tự trong HTML

```html
<script type="text/javascript" src="script.js" defer>
```

Với `async`, file sẽ execute ngay khi load, nghĩa là có thể trong lúc parse hoặc sau lúc parse, vì vậy thứ tự đặt file không quan trọng, không đảm bảo file execute theo đúng thứ tự.

```html
<script type="text/javascript" src="script.js" async>
```

[![Fetching CSS and JavaScript resources in a web browser](https://res.cloudinary.com/practicaldev/image/fetch/s--5qrUxpJD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-2-1000.png)](https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-2.png)

Với các trình duyệt sau này, nó sẽ hỗ trợ thêm việc **preload**, lấy về những resource chưa thật sự cần ở thời điểm hiện tại, nhưng trong tương lai có thể cần đến, việc này cũng tùy thuộc vào từng trình duyệt mà cách xử lý có khác nhau

```html
<link href="style.css" rel="preload" as="style" />
```

## 3 - Parse CSS

Sau khi đã có được source file css "trong tay", trình duyệt làm tiếp 2 thao tác, parse CSS và build CSSOM

[![Parsing CSS and building the CSSOM in a web browser](https://res.cloudinary.com/practicaldev/image/fetch/s--lDR98Pu7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-3-1000.png)](https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-3.png)

## 4 - Execute JS

Các trình duyệt khác nhau, quá trình parse-compile-execute sẽ khác nhau, cũng cần nhớ thêm việc parse JS rất tốn kém tài nguyên của máy.

Ngay sau khi **JS đã load xong** và **DOM đã parse xong**, sự kiện `document.DOMContentLoaded` sẽ được *emit*

```js
document.addEventListener('DOMContentLoaded', event => {})
```

Sau khi các async JS, image load xong, sự kiện `window.load` sẽ được emit

```js
window.addEventListener('load', (event) => {});
```

[![Timeline of executing JavaScript in a web browser](https://res.cloudinary.com/practicaldev/image/fetch/s--fu8vnHfk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-4-1000.png)](https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-4.png)

## 5 - Merge DOM và CSSOM để tạo render tree

Hợp thể giữa DOM và CSSOM sẽ cho ra **render tree**, là toàn bộ những gì sẽ hiển thị trên trình duyệt

[![Merging the DOM and CSSOM to create a render tree in a web browser](https://res.cloudinary.com/practicaldev/image/fetch/s--ay06Rl9_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-5-1000.png)](https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-5.png)

## 6 - Calculate layout và paint

Sau khi đã nhận được **render tree**, trình duyệt đã có đủ thông tin để tính toán những phần tử nào, đặt ở đâu, kích thước ra làm sao, qua trình đó gọi là calculate layout, kết thúc quá trình tính toán này, trình duyệt sẽ bắt đầu quá trình **paint**, là những gì user sẽ thấy trên trình duyệt, đây cũng là bước cuối cùng.

[![Calculating the layout and paint of a web page in a browser](https://res.cloudinary.com/practicaldev/image/fetch/s--MBpASwvG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-6-1000.png)](https://www.jstar.mx/images/blog/how-a-browser-renders-a-web-page/step-6.png)

[](https://dev.to/jstarmx/how-the-browser-renders-a-web-page-1ahc)