---
slug: "2021-03-28-mot-vai-luu-y-voi-javascript"
date: "2021-03-28"
title: "Một vài điều cần lưu ý khi bạn làm việc với JS"
desc: "Khi bạn làm việc với JS đủ lâu và ăn hành đủ nhiều bạn sẽ cần biết đến những đặc điểm rất riêng của JS"
tags: ["js"]
canonical_url: false

---

## `Array.sort()` cho kết quả khác nhau trên các trình duyệt khác nhau

Khi bạn cần *sort* các phần tử trong một mảng, khả năng rất cao là bạn sẽ sử dụng *callback* như: `sort((x, y) => x < y)`.

Đây là kết quả của Chrome và Firefox

![](https://res.cloudinary.com/practicaldev/image/fetch/s--s1SlEvCn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/63i4pdemdrcltmlcfmy7.png)

Hàm *callback* chúng ta truyền vào phải *return* một trong ba giá trị 1, 0, -1, vì chúng ta đang return một giá trị *boolean*, nên sẽ **tùy vào trình duyệt** quyết định

##  Sử dụng `JSON.stringify` với tham số

Là một web developer, ít nhất một lần trong đời bạn sẽ sử dụng đến hàm `JSON.stringify`. Nhưng bạn có biết hàm này còn một tham số thứ 2 có thể truyền vào? Nó sẽ được sử dụng như một danh sách **whitelist** khi *parse* (chỉ có những giá trị `key` nằm trong whitelist mới được *parse*)

[![json_stringify_1](https://res.cloudinary.com/practicaldev/image/fetch/s--1m2M-1nL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2mot0de4qunp1jz9drti.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--1m2M-1nL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2mot0de4qunp1jz9drti.png)

Không chỉ giới hạn là một mảng, có thể truyền một function để *validate*, *replace*, *parse* cặp `key`, `value` nhận được

[![json_stringify_2](https://res.cloudinary.com/practicaldev/image/fetch/s--LKLRzNjN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87gpt399syw126i3lnw5.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--LKLRzNjN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87gpt399syw126i3lnw5.png)

## `Array.filter()` không làm việc với Promise

Một công việc cũng hay sử lý trên mảng: thực hiện một số xử lý **async** trên các phần tử trong mảng, lặp qua các phần tử để xử lý dữ liệu rồi *filter* những phần tử không mong muốn.

Ví dụ, để kiểm tra user có quyền thực hiện một số tính năng nào đó không, chúng ta cần kiểm tra tất cả các giá trị trong mảng `permissions`

[![filter_1](https://res.cloudinary.com/practicaldev/image/fetch/s--zxtRNXjO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i8ph059u9575f29hmqjz.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--zxtRNXjO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i8ph059u9575f29hmqjz.png)

[![filter_3](https://res.cloudinary.com/practicaldev/image/fetch/s--RY4XUoXw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5d2v4ingkoxlvrjrynwv.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--RY4XUoXw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5d2v4ingkoxlvrjrynwv.png)

Code trên hoàn toàn hợp lý và đúng 100%

Tính huống tiếp theo, nếu bên trong hàm `userCan` chúng ta có một xử lý `async`?

[![filter_4](https://res.cloudinary.com/practicaldev/image/fetch/s--4PNbNENY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/as0sblsgjwbz52jqah2j.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--4PNbNENY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/as0sblsgjwbz52jqah2j.png)

Không chạy đúng đâu. Để sửa lại cho nó chạy đúng, chúng ta phải dùng `map` trước khi dùng đến `filter`

[![filter_5](https://res.cloudinary.com/practicaldev/image/fetch/s--dK138iQ1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8p5nocab1xkyjss5jl09.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--dK138iQ1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8p5nocab1xkyjss5jl09.png)

## Nullish vs OR

Ai cũng biết viết `OR`

```js
const foo = buzz || 'fallback'
```

Trong trường hợp bạn muốn `foo` bằng 0 khi `buzz` bằng 0, nói cách khác `0` vẫn được xem là một giá trị hợp lệ thì cách viết trên toang.

[![nullish](https://res.cloudinary.com/practicaldev/image/fetch/s--QoLPcQ4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ai8rwv56h5ymun1vpi6h.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--QoLPcQ4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ai8rwv56h5ymun1vpi6h.png)

Nullish tương đối mới và được hỗ trợ từ TypeScript 3.7, các phiên bản trình duyệt mới, cũng nên lưu ý điểm này nhé.

## Promise constructor anti-pattern

Tạo một Promise không vì một lý do gì cả.

Nếu bạn có một xử lý `async` thì bản chất nó đã **return một promise**, việc bạn `new Promise` chẳng có ý nghĩa gì cả

[![promise_1](https://res.cloudinary.com/practicaldev/image/fetch/s--C-1fI-Bz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98tp5ldyr4065np0skt5.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--C-1fI-Bz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98tp5ldyr4065np0skt5.png)

Chỉ đơn giản return `fetchThing()` là được (`fetchThing` là một async function)

[![promise_3](https://res.cloudinary.com/practicaldev/image/fetch/s--pHlwjR8x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jpyxc4hrmvepkthp1wyb.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--pHlwjR8x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jpyxc4hrmvepkthp1wyb.png)

## Catch await error

Nếu sử dụng Promise bạn sẽ dùng `then` và `catch`, còn dùng `async/await` bạn sẽ dùng `try/catch` như thế này

[![catch_1](https://res.cloudinary.com/practicaldev/image/fetch/s--xRTdGBFG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w77xvropho5fnzjr3lzq.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--xRTdGBFG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w77xvropho5fnzjr3lzq.png)

Một cách *thần kỳ* chúng ta vẫn có thể dùng `.catch` ngay trên await

[![catch_2](https://res.cloudinary.com/practicaldev/image/fetch/s--9_RtvCXJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k4sca69yg3cn1t2w3q1e.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--9_RtvCXJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k4sca69yg3cn1t2w3q1e.png)

Nếu ngồi chiêm nghiệm thật kỹ bạn sẽ hiểu vì sao chúng ta vẫn viết được như vậy, gợi ý await là một cách viết cũng dựa trên Promise mà ra

## Optional chain trên function

Optional chain trong `object` không xa lạ, nhưng optional chain trên function thì bạn có dùng chưa?

[![optional_1](https://res.cloudinary.com/practicaldev/image/fetch/s--GS_uEqqr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/57rtruthopibgpvl5pcz.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--GS_uEqqr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/57rtruthopibgpvl5pcz.png)

Một tình huống bạn sẽ sử dụng rất nhiều trong React là callback prop. Sẽ không còn cần phải viết `onClick={onClick && () => onClick(param)}`


[10 Things 2020 has taught me](https://dev.to/joakimunge/10-things-2020-has-taught-me-nfj)

