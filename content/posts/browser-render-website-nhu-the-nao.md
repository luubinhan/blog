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



[](https://dev.to/jstarmx/how-the-browser-renders-a-web-page-1ahc)