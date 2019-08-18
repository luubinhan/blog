---
slug: "/2019-07-26-nguyen-ly-chung-cua-lap-trinh-huong-function"
date: "2019-07-26"
title: "Nguyên lý chung của lập trình function"
desc: "Khái niệm ngàn người biết, bạn cũng phải biết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Nói về lợi ích](#n%c3%b3i-v%e1%bb%81-l%e1%bb%a3i-%c3%adch)
- [Immutable](#immutable)
- [Pure Function](#pure-function)
- [Đệ quy](#%c4%90%e1%bb%87-quy)
- [Tổng kết](#t%e1%bb%95ng-k%e1%ba%bft)
- [Tài liệu tham khảo](#t%c3%a0i-li%e1%bb%87u-tham-kh%e1%ba%a3o)

<!-- /TOC -->

## Nói về lợi ích

Trước tiên chúng ta phải nói về lợi ích của kiểu lập trình hướng function, để có thể có động lực *nghiên cứu đào sâu*, một vài điểm được nhiều người thống nhất

Code của chúng ta trở nên "module" hơn, nhắc về module thì lấy ví dụ trò xếp hình là dễ hình dung nhất

![Minh họa Module](https://cdn.redshift.autodesk.com/2014/10/benefits_of_modular_construction_lego.jpg)

- Các function độc lập, khi kết nối với nhau tạo ra một chương trình
Module cũng sẽ giúp code dễ hiểu hơn, 1 function = 1 công dụng, *không có gì dấu diếm*

- Dễ copy/paste hơn
- Dễ test hơn

Bên dưới chúng ta sẽ đề cập đến những nguyên lý cơ bản, mà kinh nghiệm thực tế đúc kết được, như sử dụng **immutable** thay vì **mutable**, viết **pure function**, chia nhỏ bằng đệ quy, là những **nguyên lý** chung, không ám chỉ một ngôn ngữ cụ thể nào

## Immutable

Nói đến lập trình function trước tiên phải nói về **immutable**

> Immutable là dạng dữ liệu sau khi tạo ra thì không thay đổi nữa

Mutate là gì? ví dụ, gán tham chiếu vào một biến đã có

```js{2}
var x = { name: 'luckyluu' }
var y = x

x = { name: 'vuilaptrinh' }
console.log(x, y)
// => {name: "vuilaptrinh"} { name: "luckyluu" }
```

Giá trị `x` tham chiếu đến một vùng nhớ khác khi viết `x = { name: 'vuilaptrinh' }`, trong khi đó `y` vẫn tham chiếu đến vùng nhớ cũ là `{ name: 'luckyluu' }`

Trường hợp 2 là chỉnh sửa giá một object có sẵn

```js {4}
var x = { name: 'luckyluu' }
var y = x

x.name = 'vuilaptrinh'
console.log(x, y)
// => {name: "vuilaptrinh"} { name: "vuilaptrinh" }
```

Không thay đổi `y`, nhưng cả 2 cùng tham chiếu tới cùng một `x`.

Riêng javascript chúng ta phải dùng hẳn một thư viện [immutable-js](https://immutable-js.github.io/immutable-js/docs/#/) vì việc "chặn" không cho thay đổi dữ liệu trong javascript thì "f..king complicated", đừng nghĩ `const bienA` là đã mutable, nó chỉ thay đổi scope thôi bạn ơi

Immutable là một cách làm không tốn nhiều chi phí để ngăn chặn các con bug chúng ta gặp trong các tình huống cá biệt, như 2 luồng xử lý cũng thực hiện ghi đè một giá trị-cùng lúc, hay trong một lần đọc dữ liệu nào đó mà bạn "nhỡ tay" đã thay đổi dữ liệu mà không hay biết.

Cái gì cũng có giá của nó! Tùy vào ngôn ngữ và cục object bự cỡ nào, chi phí bỏ ra để `clone` object ban đầu để chỉnh sửa sẽ khác nhau. Phát sinh vấn đề "xả rác" lung tung qua việc khai báo các object mới liên tục khi cần chỉnh sửa, do đó các trường hợp phát triển GUI (viết một editor như VS Code gọi là phát triển GUI) hay game sẽ không phù hợp với immutable, tất nhiên luôn có một vài chỗ vẫn dùng được

Khi bắt đầu dùng immutable, chúng ta phải tiếp cận khi viết code, phải suy nghĩ từng "cục" code nên làm thêm nào để *sạch* hơn, an toàn với sức khỏe bà mẹ và trẻ em hơn

## Pure Function

Thế nào là một **Function Sạch** ?

Đó giờ chúng ta vẫn viết function, lập trình hướng function thì có gì khác? **function** ở đây ám chỉ các hàm hoạt động như hàm toán học như `f(x) = x + 1`, những hàm toán học này rất đơn giản, nhận một giá trị, và trả về một giá trị, không chỉnh sửa giá trị bên ngoài, dù nó được truyền vào như tham số của hàm, nếu cùng tham số truyền vào, **luôn luôn** nhận được cùng kết quả trả về. Truyền vào cho `f(x) = x + 1` là 2 thì bất cứ lần nào cũng nhận được kết quả là 3. 

Nhờ vậy chúng ta có thể **cache** kết quả này, sử dụng kết quả cache trong trường hợp có cùng input. Chúng ta cũng có thể gọi các function này trên nhiều luồng chạy song song mà không phải lo lắng gì. Nếu các function không phụ thuộc lẫn nhau, chúng ta cũng có thể gọi nó theo bất cứ thứ tự nào mà không quan tâm đến vấn đề **race condition**

> Race condition, mình giải thích nôm na thế này, bạn là chàng trai lắm em theo đuổi, người đến trước, kẻ đến sau, mức độ quyết liệt của mỗi em lại khác nhau không phụ thuộc ai trước, ai sau, em xuất phát sau quá quyết liệt, nên ngỏ lời đòi cưới trước, bạn đồng ý, sau đó em xuất phát trước, cuối cùng cũng chạy tới được nhà bạn, bạn lại đồng ý tiếp. Thế là tiêu đời bạn rồi.

## Đệ quy

Function gọi lại chính nó, không phụ thuộc biến đếm liên quan gì tới lập trình function?

Ý tưởng cốt lõi của đệ quy là chia bài toán lớn thành bài toán tương tự như vậy, nhưng quy mô nhỏ hơn. Vấn đề nhỏ hơn nghĩa là cũng dễ hiểu hơn, cách giải quyết cũng rõ rành rành hơn. Khi chúng ta đổi mặt với vòng lặp, nghĩ xem đệ quy có phải là lựa chọn đúng hơn không. Ví dụ lặp bình thường phù hợp khi cần đi qua tất cả phần tử trong mảng, đệ quy lại phù hợp áp dụng quicksort trong mảng (thứ 6 tuần sau mình viết bài này nha!)

Khi làm việc với đệ quy, luôn nhớ sử dụng và nằm lòng câu hỏi **điều gì sẽ thực thi khi nó ở vị trí cuối cùng**

```js{6}
function factorial(x, acc) {
	acc = acc || 1
	if (x > 1) {
		return factorial(x - 1, acc * x)
	} else {
		return acc
	}
}
```

Hạn chế được yếu điểm của đệ quy là **tràn stack** với câu hỏi trên.

## Tổng kết

Tóm lại tại sao thiên hạ **rần rần** với lập trình function hâm he triệt lập trình hướng đối tượng OOP

- Không tạo ra side effect
- Thứ tự chạy function không quan trọng
- Dễ đọc (ý là người khác dễ đọc lại và hiểu mình đang viết gì)

Tất nhiên không phải lúc nào lập trình function cũng phù hợp với bất kỳ trường hợp nào, đôi khi side effect là cần thiết, bắt buộc, bạn không thể viết toàn bộ chương trình bằng pure function

Theo quan điểm cá nhân: lập trình function trở nên phổ biến bởi 2 nguyên nhân: 1. Ngày càng nhiều vi xử lý có khả năng xử lý đồng thời trên đa luồng, 2. Đây là kiểu viết rất dễ tiếp cận với mọi người (như ai cũng xài windows vì bẻ khóa nó thì không có gì dễ đến thế)

## Tài liệu tham khảo


<a target="_blank" rel="noopener noreferrer" href="https://www.lucidchart.com/techblog/2017/11/29/functional-programming-principles-every-imperative-programmer-should-use/">FUNCTIONAL PROGRAMMING PRINCIPLES EVERY IMPERATIVE PROGRAMMER SHOULD USE</a>

<a target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/questions/36504/why-functional-languages">Why functional languages? </a>




