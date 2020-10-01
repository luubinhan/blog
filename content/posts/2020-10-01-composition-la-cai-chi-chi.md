# Composition là cái chi chi



Composition một cách mường tượng mà nói là việc đưa hai (hoặc nhiều) thứ khác nhau vào một chổ để nhận được một loại kết quả

(hãy nhớ về 5 anh em siêu nhân kết hợp thành một con robot mãnh thú to hơn)

## Composition trong toán học

Toán học cũng chưa thật sự liên quan nhiều đến frontend, tuy nhiên toán học là nơi đã phát sinh ra khái niệm này

Ví dụ có 2 hàm, một hàm là `y = 2 * x`, hàm thứ 2 là `y = x + 10`.

_Composition_ 2 hàm này lại để kết quả của thằng này là input của thằng kia, chúng ta sẽ có hàm mới `y = (2 * x) + 10`. **Đó là tất cả khái niệm cần nắm**

## Function composition

Trong ngữ cảnh của functional programming, cũng không khác toán học, chỉ là được diễn tả bằng code

```js
let date = getDate();
let text = formatDate(date);
let label = createLabel(text);
showLabel(label);
```

Code này có vài đoạn lặp lại, chúng ta có nhận lấy một input, covert nó sang một loại khác, rồi lại lấy kết quả đó, convert tiếp.

Làm sao để lượt bỏ hết sự lặp lại?

```js
let steps = [
    getDate,
    formatDate,
    createLabel,
    showLabel
]
```

Một "vài người" cho rằng code vậy sạch hơn. Viết một helper function để hiện thực ước mơ đó

```js
function runSteps(steps) {
  let result;
  for (let i = 0; i < steps.length; i++) {
    let step = steps[i];
    // làm tiếp các bước được móc nối vào
    result = step(result);
  }
  return result;
}
```

Nhờ sự trợ giúp của hàm `runSteps` chúng ta có thể viết lại

```js
runSteps([
    getDate,
    formatDate,
    createLabel,
    showLabel
])
```

Nếu tổng số code bước phải làm là cố định, chúng ta muốn chạy y chang như vậy trên nhiều chổ khác nhau, chúng ta tiếp tục đưa nó vào một function

```js
function showDateLabel() {
  runSteps([
    getDate,
    formatDate,
    createLabel,
    showLabel
  ]);
}
// Giờ gọi ở bất kỳ đâu
showDateLabel();
showDateLabel();
```

Các bạn lập trình lại tiến một bước xa hơn, sao không rút gọn code hơn nữa bằng một hàm gọi là `pipe`

```js
let showDateLabel = pipe(
  getDate,
  formatDate,
  createLabel,
  showLabel
);
// Giờ gọi ở bất kỳ đâu
showDateLabel();
showDateLabel();
```

Chúng ta *dấu diếm* phần implement của thể  đó như thế này

```js
function pipe(...steps) {
  // chạy hết tất cả các function cho tui
  return function runSteps() {
    let result;
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      result = step(result);
    }
    return result;
  }
}
```

Như vậy chúng ta đã đi rất xa, rất rất xa. Từ điểm xuất phát phải gọi lần lượt các hàm một cách thủ công, chúng ta chỉ định các bước cần chạy theo thứ tự một cách *sạch sẽ hơn*

```js
// code cũ
let date = getDate();
let text = formatDate(date);
let label = createLabel(text);
showLabel(label);

// code mới
let showDateLabel = pipe(
  getDate,
  formatDate,
  createLabel,
  showLabel
);
showDateLabel();
```

Nếu có thắc mắc trong đầu: ủa vậy để mần chi? Phức tạp rườm rà vãi cả ra! Hãy cân nhắc xem giữa hay cách viết trên, cách nào bạn đọc dễ hơn?

Khi hiểu được `pipe` và function composition giống như bạn phát hiện ra một điều gì đó *đẹp đẽ* tuyệt vời trong lúc code, nhưng không có nghĩa là không có nhược điểm, outsource cho `pipe`, chúng ta không còn thấy được rõ ràng dữ liệu đã đi ra-đi vào như thế nào.

