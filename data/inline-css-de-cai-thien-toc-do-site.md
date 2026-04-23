Một trong những cách bạn ít nghe tới khi tối ưu tốc độ website, và bạn cũng có thể không đồng tình với quan điểm này: **inline css**. **Tại sao?** và **bằng cách nào** mà việc inline css lại giúp cải thiện tốc độ?

## CSS ảnh hưởng thế nào đến tốc độ

Nếu JS và image thường sẽ được nhắc nhiều trong việc làm chậm tốc độ, ảnh hưởng đến các kết quả đo lường, CSS cũng không ngoại lệ.

Khi trình duyệt truy cập vào một URL, đầu tiên nó sẽ get về file HTML, **parsing** file này, dừng lại khi gặp những **dependency**.

CSS là một [render-blocking resource](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css), khi bạn thêm css bằng `<link href="style.css" />` trong thẻ `<head/>`, trình duyệt sẽ trigger một request đến phía server để lấy file stylesheet này về trước khi render tiếp phần còn lại.

## Bạn có thể làm gì?

Khi nói đến tối ưu tốc độ, thì lời khuyên là hãy đo tốc độ hiện tại trước bằng các [metric](https://web.dev/user-centric-performance-metrics/) phổ biến, sau đó đưa ra mục tiêu cụ thể khi tối ưu.

Thực tế đôi khi sẽ khác so với lý thuyết của bài này, nên bạn cứ measure -> thử -> measure lại -> thử tiếp.

## Inline như thế nào

Inline CSS như đã nói sẽ giúp bớt đi một request lên server. Tuy nhiên inline như thế nào?

```html
<p style="font-size: 20px; font-weight: bold;">Some text</p>
```

Tuy nhiên đây không phải là cách nên làm, trớ trêu thay bạn làm như vậy nó sẽ dính issue với đơn vị *runtime responsiveness* trong các công cụ measure tốc độ.

Nếu không sử dụng external css, mà inline vào từng element, nó sẽ dẫn đến chuyện nhiều style bị duplicate, và dẫn tới thời gian [first content paint](https://web.dev/first-contentful-paint/) tăng

**Vậy inline kiểu nào ?**

```html
<head>
  ...
  <style type="text/css">
body{background:#fff;color:#000;margin:0}.link{color:#1a0dab}.ts{border-collapse:collapse}.ts td{padding:0}.g{line-height:1.2;text-align:left;width:600px}.ti{display:inline;display:inline-table}
  </style>
</head>
```

Tuy nhiên nếu, trong một số trường hợp, bạn có thể sử dụng `defer` trên external style nếu nó không thực sự sử dụng ở trang hiện tại (pre-load)

```html
<head>
  ...
  <style type="text/css">
    /* inlined styles */
  </style>
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
</head>
```

Với cách external style, trình duyệt có thể cache lại để tiết kiệm số network request.

## Các công cụ hổ trợ

Một số công cụ giúp xác định đâu là critical css, chúng ta cần inline

- [Tìm các JS và CSS code không sử dụng](https://developers.google.com/web/tools/chrome-devtools/coverage)
- [Penthouse - Công cụ giúp tạo css critical](https://github.com/pocketjoso/penthouse)
- [Critical - Giúp extract và inline CSS nào nằm ở above-the-fold(phần hiển thị phía trên thanh cuộn)](https://github.com/addyosmani/critical)

[Improve site performance by inlining your CSS](https://blog.logrocket.com/improve-site-performance-inlining-css/)

