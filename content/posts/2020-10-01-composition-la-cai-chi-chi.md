---
slug: "2020-10-01-composition-la-cai-chi-chi"
date: "2020-10-01"
title: "Composition là cái chi chi"
desc: "Nhớ về 5 anh em siêu nhân kết hợp thành một con robot mãnh thú"
tags: ["javascript", "hoc-thuat"]
canonical_url: false

---

Composition một cách trừu tượng mà nói là việc đưa hai (hoặc nhiều) thứ khác nhau vào một chỗ để nhận được một loại kết quả

## Composition trong toán học

Toán học cũng chưa thật sự liên quan nhiều đến frontend, tuy nhiên toán học là nơi đã phát sinh ra khái niệm này

Ví dụ có 2 hàm, một hàm là `y = 2 * x`, hàm thứ 2 là `y = x + 10`.

_Composition_ 2 hàm này lại, kết quả của thằng này là input của thằng kia, chúng ta sẽ có hàm mới `y = (2 * x) + 10`. **Đó là tất cả khái niệm cần nắm**

## Function composition

Trong ngữ cảnh của functional programming, cũng không khác toán học, chỉ là được diễn tả bằng code

```js
let date = getDate();
let text = formatDate(date);
let label = createLabel(text);
showLabel(label);
```

Code này có vài đoạn *na ná* nhau, chúng ta có nhận lấy một input, convert nó sang một loại khác, rồi lại lấy kết quả đó, convert tiếp.

Làm sao để lượt bỏ hết sự *na ná* đó?

```js
let steps = [
    getDate,
    formatDate,
    createLabel,
    showLabel
]
```

Một "vài người" cho rằng code vậy sạch hơn. Viết một helper function để tin gọn hơn nữa

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

Nếu tổng số code bước phải làm là cố định, chúng ta muốn chạy y chang như vậy trên nhiều chỗ khác nhau, chúng ta tiếp tục đưa nó vào một function

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

Khi hiểu được `pipe` và function composition bạn sẽ thấy mọi thứ gọn gàng rành mạch thật tuyệt vời, nhưng không có nghĩa là không có nhược điểm, *outsource* cho `pipe`, chúng ta không còn thấy được rõ ràng dữ liệu đã đi ra-đi vào như thế nào.

## Component Composition

Một ngữ cảnh khác chúng ta cũng thấy sự xuất hiện của "composition" là lập trình UI hướng declarative. React component là một ví dụ.

```jsx
function App() {
  return <Screen />;
}
function Screen() {
  return <Form />;
}
function Form() {
  return <Button />;
}
function Button() {
  return <button>Hey there.</button>;
}
```

Đấy cũng gọi là composition vì chúng ta đứa những component vào trong những component khác, rồi nhận được kết quả là một tổng thể chứa tất cả component

Một dạng biến thể của composition trong component là `slot` (làm Vue bạn sẽ biết khái niệm này)

```jsx
function Layout({ sidebar, content }) {
  return (
    <div>
      <div className="sidebar">{sidebar}</div>
      <div className="content">{content}</div>
    </div>
  )
}
```

Sau đấy đưa các giá trị cụ thể vào slot

```jsx
function HomePage() {
  return (
    <Layout
      sidebar={<HomeSidebar />}
      content={<HomeContent />}
    >
  )
}
function AboutPage() {
  return (
    <Layout
      sidebar={<AboutSidebar />}
      content={<AboutContent />}
    >
  )
}
```

React sẽ không đặt hẳn một khái niệm riêng cho slot vì bạn có thể làm điều đó thông qua `prop`

## Composition vs inheritance

*Người đời* thường đem composition để đối chiếu với inheritance, kế thừa gặp nhiều trong class và object hơn, composition gặp nhiều trong function

Một cách cụ thể, nếu viết code theo kiểu `class`, bạn sẽ có xu hướng dùng lại các behavior từ một class khác bằng cách `extend` nó (kế thừa). Tuy nhiên, làm vậy cũng có hạn chế là rất khó tùy chỉnh các behavior sau này. Ví dụ như tình huống muốn `extend` không chỉ một mà nhiều `class`

Đôi khi, *miệng đời* cũng đồn đại rằng việc dùng class khiến "bạn bị khóa cứng" trong thiết kế ban đầu vì việc thay đổi kiến trúc của các class thì rất chi là tốn công. Với việc dùng composition, thay vì extend, bạn dữ nguyên hiện trạng của một instance, sử dụng trực tiếp từ instance này và cũng có thể làm gì đó kết hợp với nhiều thứ khác, có nhiều đất diễn hơn.

Nói chung, ngành phần mềm đã bỏ việc model các UI component như một dạng kế thừa nhiều tầng nhiều cấp.

Không có nói inheritance lúc nào cũng "tệ", nó chỉ không đủ "bén như dao lam", sử dụng cần phải tiết chế, việc kế thừa đa cấp ở một độ sâu nhất định, đòi hỏi bạn đủ kiên nhẫn để giải quyết các vấn đề của nó.

> If you write your code in a style that composes functions in some way before calling them, and there are other humans on your team, make sure that you’re getting concrete benefits from this approach. It is not “cleaner” or “better”, and there is a price to pay for “beautiful” but indirect code.

Tạm kết: Nếu bạn làm việc trong team, hãy đảm bảo mọi người nhất trí với nhau lợi ích mà nó mang lại từ cách làm này. Nó không liên quan gì tới việc "cleaner-better", nó luôn có cái giá phải trả cho "beautiful" nhưng mà code không trực quan

[composition - *Dan’s JavaScript Glossary*](https://whatthefuck.is/composition)