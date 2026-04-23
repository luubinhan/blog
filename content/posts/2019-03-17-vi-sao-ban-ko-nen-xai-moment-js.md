---
slug: "/2019-03-17-vi-sao-ban-ko-nen-xai-moment-js"
date: "2019-03-17"
title: "Vì sao quần hùng kéo nhau không xài moment.js nữa"
desc: "Tất cả chúng ta đã từng và đang sử dụng moment.js mà ko hề dành chút thời gian để xem nó ảnh hưởng như thế nào đến performance"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Nó quá chậm](#n%C3%B3-qu%C3%A1-ch%E1%BA%ADm)
  - [Parsing giá trị ISO 8601](#parsing-gi%C3%A1-tr%E1%BB%8B-iso-8601)
  - [Parsing giá trị EPOCH](#parsing-gi%C3%A1-tr%E1%BB%8B-epoch)
  - [Format](#format)
  - [Tính toán](#t%C3%ADnh-to%C3%A1n)
  - [So sánh](#so-s%C3%A1nh)
- [Nó quá nặng](#n%C3%B3-qu%C3%A1-n%E1%BA%B7ng)
- [Nó Mutable](#n%C3%B3-mutable)
- [Quá khó để debug](#qu%C3%A1-kh%C3%B3-%C4%91%E1%BB%83-debug)

<!-- /TOC -->

Trước đây khi nhắc đến thư viện xử lý ngày tháng, là trong đầu mọi developer frontend sẽ nghĩ ngay tới [Moment.js](https://momentjs.com/), tuy nhiên dạo gần đây, đâu đâu cũng nghe cũng thấy đến các bài viết khuyên chúng ta bỏ ngay moment.js hoặc ít nhất là xài một cách cẩn trọng hơn.

Thằng Date object build sẵn của javascript thì ko đủ xài. Sớm hay muộn chúng ta cùng cần đến một thư viện thứ 3 để làm việc với ngày tháng, và lựa chọn hiển nhiên trước đây là moment.js. Một thư viện tất cả trong một, giải quyết tuốt tuồn tật các vấn đề liên quan đến ngày tháng.

**Vậy tại sao bây giờ người ta chê nó?**

## Nó quá chậm

Trong quá trình thực hiện optimize cho dự án, tác giả bài này (ko phải mình nhé) đã phát hiện ra rằng, phần lớn những chổ **tắt nghẽn** là ở chỗ  parsing ngày chuẩn ISO8601 từ database, cụ thể là hàm `moment(ISO8601_DATE_HERE)`, khá là sốc với kết quả này, vì ko dùng bất cứ một định dạng đặc biệt nào, một input chuẩn ISO bình thường, nếu mà dùng `moment(new Date(ISO8601_DATE_HERE))` thì nhanh hơn gấp 7 lần.

Thực hiện test và so sánh với một số thư viện khác

![Nó quá nặng](https://i.imgur.com/QjK9gvY.png)

### Parsing giá trị ISO 8601

Moment.js tốn khoảng 9 giây để parse 100.000 giá trị ngày ISO8601, trong khi đó [Day.js](https://github.com/iamkun/dayjs) chỉ mất .5 giây, các API cung cấp khá giống nhau, tuy nhiên thằng Day.js **khôn hơn**, nó xác định giá trị `z` ở cuối string, nếu có nó sẽ gọi `new Date(string)`. Trong khi Moment.js, [Luxon](https://moment.github.io/luxon/) và [JS-Joda](https://js-joda.github.io/js-joda/) sử dụng một regex của từng thằng để làm.

> Lưu ý không dùng Day.js hay Date-Fns nếu bạn cần hỗ trợ IE9, *hy vọng là bạn không xui tới vậy*, từ ES5 thì `Date.parse` mới làm việc tốt với ISO 8601

### Parsing giá trị EPOCH

Kết quả parse EPOCH Time thì các thư viện cho kết quả tương đương, tuy nhiên nếu bạn là đứa nghiện tốc độ, khuyến nghị sử dụng Date-Fns

### Format

Về vấn đề format, các thư viện lại gần như ko cung cấp hàm nào cả, đa phần tụi nó sẽ dùng regex để thực hiện. Riêng thằng JS-Joda sử dụng một hàm trong đó nó ì các kiểu để kiểm tra, rồi `charAt` nên nhanh hơn một chút so với những thằng dùng regex

### Tính toán

Các phép toán trên ngày tháng đúng là lằn xà ngoằn, moment.js làm khá tốt hơn hẳn Day.js và Luxon, tuy nhiên vô đối vấn là JS-Joda trên vụ này.

### So sánh

Kiểm tra 2 giá trị ngày có là bằng nhau tương đối phức tạp hơn so sánh 2 ngày có lớn hơn nhau, bởi vì chúng ta không thực hiện so sánh giá trị khoảng thời gian (timestamps)
Mấy thư viện khác ngoài Luxon có vẻ ok, không rõ vì sao Luxon lại lấp vấp vụ này.

## Nó quá nặng

![Nó quá nặng](https://i.imgur.com/X7EsHHT.png)

Moment.js dung lượng khoảng 232kB (zip lại thì cỡ 66 kB), mà theo Yoshihide Jimbo thì có thể cắt bớt chỉ còn 68 kB ( 23 kB zip) bằng cách loại bỏ locale.

JS-Joda chỉ nhẹ hơn Moment.js chút xíu, tuy nhiên do nó cũng là thư viện nặng vì phải chứa period và time zone, 2 thằng này dùng Moment.js bạn phải cài thêm dạng plugin

Mấy thằng còn lại như Luxon, Day.js, Date-Fns thì nhẹ khỏi nói, ít nhất cũng phải nhẹ hơn 22 lần so với moment.js

Nếu bạn đang dùng moment.js ở Backend thì ko sợ nhiều, chứ còn ở Frontend thì 1kb cũng có giá của nó.

## Nó Mutable

Ví dụ bạn đang làm một cái app lịch hiển thị những sự kiện sắp diễn ra.

```js
const startedAt = moment()
const endedAt   = startedAt.add(1, 'year')

console.log(startedAt) // > 2020-02-09T13:39:07+01:00
console.log(endedAt)   // > 2020-02-09T13:39:07+01:00
```

`startedAt`, `endedAt` đều là mutable (có thể thay đổi), rõ ràng chúng ta không muốn giá trị của `startedAt` bị thay đổi sau khi gọi hàm `add`

```js
const init   = moment()
const add    = init.add(1, 'year')
const sub    = init.subtract(10, 'months')
const start  = init.startOf('year')
const end    = init.endOf('year')
const utc    = init.utc()
const local  = init.local()
const offset = init.utcOffset(480)
```

Tất cả đống biến này đều trỏ tới cùng 1 object.  Giải quyết cũng đơn giản

```js
const startedAt = moment()
const endedAt   = moment(startedAt).add(1, 'year')
```

> Khi dùng Moment.js luôn nhớ dùng cách này để tạo một instance mới

## Quá khó để debug

Nếu giá trị input đẹp đẽ, sạch sẽ, mọi việc đều sẽ trót lọt (ko tính đến vụ mutation nhé). Tuy nhiên đời mà ai lại ko có lỗi lầm

Giờ chúng ta thử ví dụ, có object là. `person { lastVisitedAt }` 

```js
const person = { lastVisitedAt: '2017-11-11T00:00:00.000Z' }
moment(person.lastVsitedAt).format() // > '2019-02-08T16:01:45+01:00'
```

Nếu bạn lỡ gõ nhầm tên property như vậy đi `lastVsitedAt`, thì `moment(undefined)` cũng không `throw error` luôn.

Giờ thử đưa mấy giá trị lạ lạ như sau vào moment()

```js
moment().format()          // > 2019-02-08T17:07:22+01:00
moment(undefined).format() // > 2019-02-08T17:07:22+01:00
moment(null).format()      // > Invalid date
moment({}).format()        // > 2019-02-08T17:07:22+01:00
moment("").format()        // > Invalid date
moment([]).format()        // > 2019-02-08T17:07:22+01:00
moment(NaN).format()       // > Invalid date
moment(0).format()         // > 1970-01-01T01:00:00+01:00
```

Moment.js ko throw error mà chỉ trả về `Invalid Date object`

Khi gọi `toISOString()` nó lại lạ kỳ trả về `null` chứ ko phải chuỗi `Invalid Date`

```js
moment().toISOString()          // >  2019-02-08T16:14:10.835Z
moment(undefined).toISOString() // >  2019-02-08T16:14:10.835Z
moment(null).toISOString()      // >  null
moment({}).toISOString()        // >  2019-02-08T16:14:10.836Z
moment("").toISOString()        // >  null
moment([]).toISOString()        // >  2019-02-08T16:14:10.836Z
moment(NaN).toISOString()       // >  null
moment(0).toISOString()         // >  1970-01-01T00:00:00.000Z
```

Nói cách ngắn gọn, `undefined` không hợp lệ trong moment(), nhưng `null` thì ok. Bị lỗi ư, nó trả về một `Invalid Date object`, `null` hoặc custom object tuỳ vào nó vui hay buồn.

Nếu kết quả này chưa làm bạn thuyết phục, hay tự kiểm chứng nhé.
[https://repl.it/@piotrekfracek/DateTime](https://repl.it/@piotrekfracek/DateTime)


<a target="_blank" rel="noopener noreferrer" href="https://overreacted.io/how-are-function-components-different-from-classes/">Why you shouldn't use Moment.js...</a>
