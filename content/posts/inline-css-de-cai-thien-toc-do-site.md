Một trong những cách bạn ít nghe tới khi tối ưu tốc độ website, và bạn cũng có thể không đồng tình với quan điểm này: **inline css**. **Tại sao?** và **bằng cách nào** mà việc inline css lại giúp cải thiện tốc độ?

## CSS ảnh hưởng thế nào đến tốc độ

Nếu JS và image thường sẽ được nhắc nhiều trong việc làm chậm tốc độ, ảnh hưởng đến các kết quả đo lường, CSS cũng không ngoại lệ.

Khi trình duyệt truy cập vào một URL, đầu tiên nó sẽ get về file HTML, **parsing** file này, dừng lại khi gặp những **dependency**.

CSS là một [render-blocking resource](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css), khi bạn thêm css bằng `<link href="style.css" />` trong thẻ `<head/>`, trình duyệt sẽ trigger một request đến phía server để lấy file stylesheet này về trước khi render tiếp phần còn lại.

## Bạn có thể làm gì?

Khi nói đến tối ưu tốc độ, thì lời khuyên là hãy đo tốc độ hiện tại trước bằng các [metric](https://web.dev/user-centric-performance-metrics/) phổ biến, sau đó đưa ra mục tiêu cụ thể khi tối ưu.

Thực tế đôi khi sẽ khác so với lý thuyết của bài này, nên bạn cứ measure -> thử -> measure lại -> thử tiếp.

## Inline cái gì

Inline CSS như đã nói sẽ giúp bớt đi một request lên server. Tuy nhiên inline như thế nào?

```html
<p style="font-size: 20px; font-weight: bold;">Some text</p>
```

Tuy nhiên đây không phải là cách nên làm, trớ trêu thay bạn làm như vậy nó sẽ dính issue với đơn vị runtime responsiveness trong các công cụ measure tốc độ.

Ngoài ra còn các lý do sau

**render-blocking load time**

