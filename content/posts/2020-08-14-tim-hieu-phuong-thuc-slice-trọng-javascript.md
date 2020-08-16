---
slug: "/2020-08-14-tim-hieu-phuong-thuc-slice-trọng-javascript"
date: "2020-08-14"
title: "Tìm hiểu phương thức slice của mảng trong javascript"
desc: "Bài viết phù họp cho các bạn mới biết javascript, không phù hợp cho bạn nào đã quá rành"
cover: "https://res.cloudinary.com/practicaldev/image/fetch/s--hrMTCnVB--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/2u8lvreli9tyeef7tn1e.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Phương thức `**slice**` (copy cho em một miếng) có thể sử dụng trên 2 kiểu `String` và `Array`	

Cách sử dụng cơ bản thì ta có thể truyền vào index bắt đầu, và index kết thúc (*kết quả tả về không bao gồm index kết thúc*)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--OINYunXY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-0.jpg)

Index kết thúc cũng có thể *bỏ qua*, lúc này nó sẽ hiểu là lấy hết luôn các phần tử còn lại.

[![Javascript Array Slice Method: The default end parameter is length of the array](https://res.cloudinary.com/practicaldev/image/fetch/s--z2KQG8vX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/xxjavascript-array-slice-method-foxbits-fact-2.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--z2KQG8vX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/xxjavascript-array-slice-method-foxbits-fact-2.jpg)

Và nếu mà chúng ta truyền giá trị index kết thúc nó lớn hơn chiều dài của mảng, thì nó cũng không lỗi, mà trả về toàn bộ như không truyền vào

[![Javascript Array Slice Method: When the end value is higher than actual length of array.](https://res.cloudinary.com/practicaldev/image/fetch/s--eWuiw3eO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-3_0.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--eWuiw3eO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-3_0.jpg)

Còn vui vui, bạn không truyền vào index bắt đầu luôn, thì nó cũng không lỗi nốt, mà sẽ sao y toàn bộ các phần tử vào mảng mới

[![ Edit media Image  When both parameters are missing, it creates copy of the original array](https://res.cloudinary.com/practicaldev/image/fetch/s--0VNTZhPe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-4_0.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--0VNTZhPe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-4_0.jpg)

Với index bắt đầu nhận vào là `undefined` nó sẽ hiểu là `0` (em cũng lại javascript)

[![Javascript Array Slice Method: If first parameter is undefined, then the result contains elements from the starting point of the array.](https://res.cloudinary.com/practicaldev/image/fetch/s--ZziXO8ik--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-5.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--ZziXO8ik--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-5.jpg)

Index bắt đầu lớn hơn độ dài của array? Nó sẽ cho ta kết qua là một mảng rỗng

[![Javascript Array Slice Method: When begin is greater than or equal to length of array.](https://res.cloudinary.com/practicaldev/image/fetch/s--WQBi7Kp_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-6_0.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--WQBi7Kp_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-6_0.jpg)

> Chưa đủ thú vị? Vậy truyền vào số âm thì sao?

[![Negative Indexing of array elements in Javascript](https://res.cloudinary.com/practicaldev/image/fetch/s--Z0m01uqP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-negative-index.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--Z0m01uqP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-negative-index.jpg)

Lúc này nó sẽ được tính theo cơ chế *index ngược*, các giá trị *âm* sẽ được tính theo index: thằng cuối cùng là -1, áp cuối là -2, và cứ tiếp tục đi ngược lên.

[![Slice method with negative index works fine](https://res.cloudinary.com/practicaldev/image/fetch/s--9QHx20P0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-8.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--9QHx20P0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-8.jpg)

Chúng ta có thể dùng nó để lấy các phần tử từ phải qua trái (2 phần tử cuối, 3 phần tử cuối, ví dụ vậy)

[![Using Slice with negative index to fetch last 4 elements of an array](https://res.cloudinary.com/practicaldev/image/fetch/s--VkOdOPne--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-9.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--VkOdOPne--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/array-slice-example-fruits-for-fact-9.jpg)



Đối với String thì cũng cách dùng cũng tương tự như Array (mai quá!)

[![Javascript String Slice Method](https://res.cloudinary.com/practicaldev/image/fetch/s--sfq02PID--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/string-slice.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--sfq02PID--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://foxbits.dev/sites/default/files/inline-images/string-slice.jpg)

Mình nghĩ `slice` cũng là một trong những phương thức chúng rất hay sử dụng, như trong reducer của redux, dùng nó để sao y một state nào đó. Nên việc nắm vững, thực hành với nó nhiều là điều rất chi cần thiết.

https://dev.to/sandeshgit/understanding-the-slice-method-in-javascript-the-basics-negative-indexing-and-the-concept-of-shallow-copy-3m3i