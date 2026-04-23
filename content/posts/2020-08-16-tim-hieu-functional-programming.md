---
slug: "/2020-08-16-tim-hieu-functional-programming"
date: "2020-08-16"
title: "Giới thiệu functional programming trong JavaScript"
desc: "Functional programming là một topic rất chi quen thuộc trong cộng đồng JS, các bạn có biết tại sao mọi người lại hype với nó? Tại sao mọi người lại quay lưng với Object oriented"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

<!-- TOC -->

- [Functional Programming là gì ? (dân tình hay viết tắt là FP)](#functional-programming-là-gì--dân-tình-hay-viết-tắt-là-fp)
- [Tại sao lại sử dụng FP?](#tại-sao-lại-sử-dụng-fp)
- [Tại sao lại sử dụng FP với JavaScript?](#tại-sao-lại-sử-dụng-fp-với-javascript)
- [Viết FP như thế nào?](#viết-fp-như-thế-nào)
- [Tài liệu tham khảo](#tài-liệu-tham-khảo)

<!-- /TOC -->

Functional Programming ? Là cái gì? Tại sao dùng? Dùng như thế nào?

Các bạn có từng *hoảng loạn* như mình khi phải nghe hàng loạt thuật ngữ sau không

> stateless, compose, pure, side effect, ramda, lazy, immuable, curry, functor, monad, monoid, higher-order, referential transparency

## Functional Programming là gì ? (dân tình hay viết tắt là FP)

Functional Programming nó là một thuật ngữ mà hiểu theo kiểu bình dân là một **style**-phong cách-kiểu viết code.

Khi nói đến **style** thì bắt buộc phải có một số đặc thù nhất định để phân biệt với các **style** khác. Chút nữa sẽ nói cụ thể.

Không chỉ có JS mà một số ngôn ngữ lập trình khác cũng hỗ trợ *style* này

- F#
- Haskell
- Erlang
- JS ( tất nhiên )
- Elm
- Scala
- Ocaml
- Clojure

Ngoài trước FP, nếu các bạn học cùng thời với mình thì sẽ được dạy Object Oriented *Programming*

Một thuật ngữ các bạn cũng sẽ hay gặp là **programming paradigm**, có thể hiểu *bình dân* là **cách chúng ta nhìn nhận mọi thứ vận hành**, cách mà chương trình sẽ kết nối và hoạt động với nhau (**mindset** nếu muốn dùng thuật ngữ hoa mỹ)

Một số *programming paradigm*  liên quan


| Nhóm 1                                                       | Nhóm 2                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Imperative**: tập các lệnh được đưa ra theo thứ tự cố định | **Declarative**: tui muốn cái này, bạn làm sao đưa ra kết quả như mong muốn |
| **Object-Oriented**: imperative cool, nhưng nếu có nhiều state và phải quản lý toàn bộ nó, hãy chia nó ra thành từng **object** làm nhiệm vụ quản lý `state` này và chương trình là sự kết hợp các object **truyền/nhận** thông tin | **Functional**: một dạng sub-paradigm (con cùng cha chú) với declarative |

Ý tưởng FP không qua cao siêu, chỉ gói gọn trong một câu

> Pure Function: chỉ phụ thuộc vào input truyền vào, chỉ trả về output không làm gì khác cả

Ví dụ, một function như thế này không được xem là Pure Function

```js
var name = "Andy";

function greet() {
    console.log("Hello, " + name + "!")
}

greet(); // Hello, Andy!

name = "luckyluu"
greet(); // Hello, luckyluu!
```

Nó vi phạm 2 nguyên tắc, một là phụ thuộc vào một biến bên ngoài, 2 là nó không trả về mà làm thay đổi một **thứ** bên ngoài (ở đây là log ra một giá trị).

## Tại sao lại sử dụng FP?

**Predictable/Safer**

Chúng ta có thể hoàn toàn tin tưởng vào pure function, nó chỉ làm đúng việc cần làm và không ảnh hưởng đến hàng xóm. Chắc chắn là ít có những có bug mà ai cũng không ngờ tới

**Dễ test/debug**

Những gì bạn cần test trên một Pure Function là đưa vào input và kiểm tra output. Ví dụ mà bạn nhận được một output sai, kiểm tra input đã đúng hết thì bạn sẽ biết ngay vấn đề nằm ở trong function đó, hãy nhớ Pure Function chỉ phụ thuộc vào input, không có side effect thì làm gì đổ lỗi được.

> Ngoài ra theo quan điểm cá nhân thì việc sử dụng FP cũng giúp chúng ta copy-paste code giữa nhiều dự án dễ dàng hơn

Còn nếu bạn đang sử dụng FP vì những lý do sau, thì mình khuyên bạn không nên tin vào điều này

- Những người sử dụng FP trông cool/ngầu hơn những người tiền bối sử dụng Object Oriented
- Đây là paradigm xịn sò nhất ở thì hiện tại

**Nói chung FP cũng chỉ là một trong những paradigm trong lập trình, sẽ có điểm mạnh và điểm yếu riêng.**

## Tại sao lại sử dụng FP với JavaScript?

Khi bắt đầu học và sử dụng JS để viết object-oriented chúng ta đều nhận ra một điều rằng: JS không phải sinh ra để viết object-oriented.

Bạn sẽ thấy nhan nhản các câu hỏi tricky trong JavaScript về `prototype` , `this` trong các buổi phỏng vấn, qua chi là khó để làm việc và hiểu được thực những thứ như vậy trong javascript, chúng ta sẽ kỳ vọng nó làm việc như thế này, nhưng JS lại không làm như chúng nghĩ.

>  Đã bao nhiêu lần bạn bị dính bug liên quan tới `this`

Dù cho bạn là chuyên gia lập trình cấp cao, chắc cũng bao lần mệt mỏi với `this`

Và nếu bạn sử dụng FP mọi thứ nhức đầu đó sẽ không còn là vấn đề quan tâm.

Ngoài ra có khá nhiều thư viện/công cụ trong cộng đồng javascript xây *sẵn* để chúng ta xào món FP này nhanh nhất có thể

## Viết FP như thế nào?

Mình đã có 2 bài viết cho chủ đề này, các bạn có thể đọc lại

[Nguyên lý nền tảng của lập trình function](https://luubinhan.github.io/blog/2019-07-26-nguyen-ly-chung-cua-lap-trinh-huong-function)

[Functional programing nên và không nên](https://luubinhan.github.io/blog/2020-05-17-functional-programing-nen-va-khong-nen/)

Một số thư viện để bạn viết FP một cách gọn gàn, sạch sẽ, thơm tho

- Mori: https://github.com/swannodette/mori
- Immutable.js: https://github.com/immutable-js/immutable-js
- Ramda: https://github.com/ramda/ramda
- Underscore: https://github.com/jashkenas/underscore
- Lodash: https://github.com/lodash/lodash
- Nhiều lắm

## Tài liệu tham khảo

https://codewords.recurse.com/issues/one/an-introduction-to-functional-programming

https://www.youtube.com/watch?v=qtsbZarFzm8&list=WL&index=7&t=0s
