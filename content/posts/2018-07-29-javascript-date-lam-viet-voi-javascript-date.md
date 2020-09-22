---
slug: "/2018-07-29-huong-dan-javascript-date-lam-viet-voi-javascript-date"
date: "2018-07-29"
title: "Các vấn đề khi làm việc với ngày tháng trong javascript"
desc: "Bỏ túi kỹ năng thiết yếu khi đụng đến xử lý ngày tháng"
cover: "https://flaviocopes.com/javascript-dates/Screen%20Shot%202018-07-06%20at%2007.20.58.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Khởi tạo Date Object](#khởi-tạo-date-object)
- [Timezone - Khu vực](#timezone---khu-vực)
- [Convert và Format kiểu Date](#convert-và-format-kiểu-date)
- [Các phương thức của Date Object để lấy giá trị](#các-phương-thức-của-date-object-để-lấy-giá-trị)
- [Thay đổi giá trị](#thay-đổi-giá-trị)
- [Lấy giá trị timestamp hiện tại](#lấy-giá-trị-timestamp-hiện-tại)
- [Javascript tự động cộng thêm giá trị ngày giờ](#javascript-tự-động-cộng-thêm-giá-trị-ngày-giờ)
- [Định dạng ngày giờ theo vùng miền](#định-dạng-ngày-giờ-theo-vùng-miền)
- [So sánh 2 giá trị ngày giờ](#so-sánh-2-giá-trị-ngày-giờ)

<!-- /TOC -->

## Khởi tạo Date Object

Mặc dù chỉ gọi là **Date** (ngày), nhưng nó đã bao gồm luôn các API về thời gian

```js
// ngày giờ hiện tại
new Date();

// nếu truyền vào 0, chúng ta có giá trị Jan 1st 1970 (UTC)
new Date(0);
```

UNIX timestamp là giá trị bằng số ( tính đến giây) của Date

> LƯU Ý: UNIX timestamp tính theo giây. Date của JavaScript tính theo **milli giây**

Nếu có giá trị UNIX timestamp, khởi tạo một Date Object bằng cách nhân với 1000

```js
const timestamp = 1530826365;
new Date(timestamp * 1000);
```

Nếu truyền vào một `string`, thay vì number, gọi `Date(string)` sẽ `parse` giá trị đó, hay ho là ở chỗ nó tự **đoán mò** xem `string` truyền vào đang theo định dạng nào.

```js
new Date("2018-07-22");
new Date("2018-07"); //July 1st 2018, 00:00:00
new Date("2018"); //Jan 1st 2018, 00:00:00
new Date("07/22/2018");
new Date("2018/07/22");
new Date("2018/7/22");
new Date("July 22, 2018");
new Date("July 22, 2018 07:22:13");
new Date("2018-07-22 07:22:13");
new Date("2018-07-22T07:22:13");
new Date("25 March 2018");
new Date("25 Mar 2018");
new Date("25 March, 2018");
new Date("March 25, 2018");
new Date("March 25 2018");
new Date("March 2018"); //Mar 1st 2018, 00:00:00
new Date("2018 March"); //Mar 1st 2018, 00:00:00
new Date("2018 MARCH"); //Mar 1st 2018, 00:00:00
new Date("2018 march"); //Mar 1st 2018, 00:00:00
```

Việc này có một nguy hiểm, thứ tự ngày tháng có thể không đúng như chúng ta mong đợi.

Tốt nhất là cứ theo chuẩn quốc tế ISO 8601, string dạng thế này

```js
`YYYY-MM-DDTHH:mm:ss:sssZ`;
```

Điểm lưu ý duy nhất của string này là chữ Z cuối cùng, nó đại diện cho UTC, nếu không có, tức là đang dùng giờ địa phương.

Dùng `Date.parse`, sẽ trả về timestamp (**milli giây**)

```js
Date.parse("2018-07-22");
Date.parse("2018-07"); //July 1st 2018, 00:00:00
Date.parse("2018"); //Jan 1st 2018, 00:00:00
Date.parse("07/22/2018");
Date.parse("2018/07/22");
Date.parse("2018/7/22");
Date.parse("July 22, 2018");
Date.parse("July 22, 2018 07:22:13");
Date.parse("2018-07-22 07:22:13");
Date.parse("2018-07-22T07:22:13");
```

Hoặc là truyền theo dạng **năm, tháng (từ 0), ngày, giờ, phút, giây, mili giây**

```js
new Date(2018, 6, 22, 7, 22, 13, 0);
new Date(2018, 6, 22);
```

## Timezone - Khu vực

Khi khởi tạo một giá trị ngày giờ chúng ta có thể truyền thêm tham số _timezone_, nếu không muốn dùng UTC

```js
// bằng cách thêm +HOURS
new Date("July 22, 2018 07:22:13 +0700");

// bằng cách thêm tên , ICT gồm Campuchia, Lào, Thái Lan, Việt Nam
new Date("July 22, 2018 07:22:13 (ICT)");
```

Nếu truyền sai giá trị timezone, javascript sẽ dùng UTC, không quăng lỗi. Nếu giá trị date đưa đưa vào sai, quăng lỗi 'Invalid Date'

Để tìm hiểu kỹ hơn timezone, đọc thêm bài này [http://vuilaptrinh.com/2019-04-12-huong-dan-tim-hieu-time-zone/](http://vuilaptrinh.com/2019-04-12-huong-dan-tim-hieu-time-zone/)

## Convert và Format kiểu Date

Với một Date object, chúng ta có khá nhiều lựa chọn để chuyển giá trị _Date => string_

```js
const date = new Date("July 22, 2018 07:22:13");

date.toString();
// "Sun Jul 22 2018 07:22:13 GMT+0200 (Central European Summer Time)"
date.toTimeString();
//"07:22:13 GMT+0200 (Central European Summer Time)"
date.toUTCString();
//"Sun, 22 Jul 2018 05:22:13 GMT"
date.toDateString();
//"Sun Jul 22 2018"
date.toISOString();
//"2018-07-22T05:22:13.000Z" (ISO 8601 format)
date.toLocaleString();
//"22/07/2018, 07:22:13"
date.toLocaleTimeString();
//"07:22:13"
date.getTime();
//1532236933000
date.getTime();
//1532236933000
```

## Các phương thức của Date Object để lấy giá trị

```js
const date = new Date("July 22, 2018 07:22:13");

date.getDate(); //22
date.getDay();
//0 (0 là chủ nhật, 1 là thứ 2..)
date.getFullYear(); //2018
date.getMonth(); //6 (Bắt đầu từ 0)
date.getHours(); //7
date.getMinutes(); //22
date.getSeconds(); //13
date.getMilliseconds(); //0 (không xác định)
date.getTime(); //1532236933000
date.getTimezoneOffset();
//-120 (Tùy theo khu vực và vùng miền).
```

Các phương thức trên sẽ có thêm phiên bản UTC, trả về giá trị UTC không phụ thuộc vào giá trị timezone hiện tại

```js
date.getUTCDate(); //22
date.getUTCDay(); //0 (0 means sunday, 1 means monday..)
date.getUTCFullYear(); //2018
date.getUTCMonth(); //6 (starts from 0)
date.getUTCHours(); //5 (not 7 like above)
date.getUTCMinutes(); //22
date.getUTCSeconds(); //13
date.getUTCMilliseconds(); //0 (not specified)
```

## Thay đổi giá trị

Các phương thức để cập nhập lại giá trị của Date

```js
const date = new Date("July 22, 2018 07:22:13");

date.setDate(newValue);
date.setDay(newValue);
date.setFullYear(newValue); //note: đừng dùng setYear(), bỏ rồi
date.setMonth(newValue);
date.setHours(newValue);
date.setMinutes(newValue);
date.setSeconds(newValue);
date.setMilliseconds(newValue);
date.setTime(newValue);
date.setTimezoneOffset(newValue);
```

> Lưu ý, nếu ta dùng `date.setHours(48)` sẽ vẫn ok, nó sẽ tự động cộng lên thành một ngày mới, tương tự cho `setMinutes`, `setSeconds`

Với `setHours()` chúng ta có thể truyền tham số kiểu `setHours(0,0,0,0)` để cập nhập giờ-phút-giây-mili giây.

Phiên bản UTC

```js
const date = new Date("July 22, 2018 07:22:13");

date.setUTCDate(newalue);
date.setUTCDay(newValue);
date.setUTCFullYear(newValue);
date.setUTCMonth(newValue);
date.setUTCHours(newValue);
date.setUTCMinutes(newValue);
date.setUTCSeconds(newValue);
date.setUTCMilliseconds(newValue);
```

## Lấy giá trị timestamp hiện tại

Nếu muốn lấy timestamp hiện tại (mili giây)

```js
Date.now();
// tương tự như viết
new Date().getTime();
```

## Javascript tự động cộng thêm giá trị ngày giờ

Nếu chúng ta đưa vào giá trị ngày lớn hơn 31, javascript sẽ cộng lên thành tháng tiếp theo, chứ không báo lỗi (không rõ là nên vui hay buồn với tính năng này)

```js
new Date(2018, 6, 40);
//Thu Aug 09 2018 00:00:00 GMT+0200
```

## Định dạng ngày giờ theo vùng miền

Nếu trình duyệt hỗ trợ `Intl`, ta có thể sử dụng để bản địa hóa các giá trị number, string, currencies, date

```js
// "12/22/2017"
const date = new Date("July 22, 2018 07:22:13");
new Intl.DateTimeFormat().format(date);

// định dạng kiểu Mỹ
new Intl.DateTimeFormat("en-US").format(date); //"7/22/2018"

// đưa thêm option để customize lại output
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};

new Intl.DateTimeFormat("en-US", options).format(date); //"7/22/2018, 7:22:13 AM"
new Intl.DateTimeFormat("it-IT", options2).format(date); //"22/7/2018, 07:22:13"
```

## So sánh 2 giá trị ngày giờ

Sử dụng `Date.getTime()` để tính toán sự giá trị ngày tháng, chính xác tới mili giây nhé

```js
const date1 = new Date("July 10, 2018 07:22:13");
const date2 = new Date("July 22, 2018 07:22:13");
const diff = date2.getTime() - date1.getTime();
```

Kiểm tra 2 giá trị Date có bằng nhau không

```js
const date1 = new Date("July 10, 2018 07:22:13");
const date2 = new Date("July 10, 2018 07:22:13");
if (date2.getTime() === date1.getTime()) {
  //dates are equal
}
```

> Lưu ý là đang so sánh đến mili giây, nên nếu so sánh 2 giá trị `July 10, 2018 07:22:13` và `July 10, 2018` thì nó sẽ không bằng nhau.

[The definitive guide to JavaScript Dates](https://flaviocopes.com/javascript-dates/)

[https://www.toptal.com/software/definitive-guide-to-datetime-manipulation](https://www.toptal.com/software/definitive-guide-to-datetime-manipulation)

[https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/](https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/)

[https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript](https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript)
