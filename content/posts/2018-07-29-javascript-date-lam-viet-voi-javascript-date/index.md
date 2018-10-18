---
slug: "/2018-07-29-huong-dan-javascript-date-lam-viet-voi-javascript-date"
date: "2018-07-29"
title: "Làm việc với date trong javascript"
desc: "Làm việc với kiểu ngày tháng trong javascript không phức tạp lắm, nhưng rất thường xài"
cover: "https://flaviocopes.com/javascript-dates/Screen%20Shot%202018-07-06%20at%2007.20.58.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Để làm việc với kiểu ngày giờ, chúng ta sử dụng kiểu `Date` trong javascript, chúng ta sẽ không nói về thư viện `moment.js`, được công nhận là thư viện xịn nhất để làm việc với ngày tháng, chúng ta chỉ nói javascript thuần

# Khởi tạo Date Object

Mặc dù chỉ gọi là **Date**, nhưng Date object sẽ bao gồm luôn các api về thời gian

Khởi tạo ngày với giá trị ngày, giờ hiện tại

```js
new Date()

// nếu truyền vào 0, chúng ta có giá trị Jan 1st 1970 (UTC)
new Date(0)
```

Cần nhớ 1 điều: đơn vị thời gian UNIX sẽ tính theo giây, Date trong javascript sẽ tính theo đơn vị mili giây

Convert từ UNIX sang javascript date

```js
const timestamp = 1530826365;
new Date(timestamp * 1000)
```

Nếu chúng ta truyền vào một `string`, nó sẽ tự động `parse` giá trị đó thành ngày tháng phú hợp

```js
new Date('2018-07-22')
new Date('2018-07') //July 1st 2018, 00:00:00
new Date('2018') //Jan 1st 2018, 00:00:00
new Date('07/22/2018')
new Date('2018/07/22')
new Date('2018/7/22')
new Date('July 22, 2018')
new Date('July 22, 2018 07:22:13')
new Date('2018-07-22 07:22:13')
new Date('2018-07-22T07:22:13')
new Date('25 March 2018')
new Date('25 Mar 2018')
new Date('25 March, 2018')
new Date('March 25, 2018')
new Date('March 25 2018')
new Date('March 2018') //Mar 1st 2018, 00:00:00
new Date('2018 March') //Mar 1st 2018, 00:00:00
new Date('2018 MARCH') //Mar 1st 2018, 00:00:00
new Date('2018 march') //Mar 1st 2018, 00:00:00
```

Nếu dùng `Date.parse` nó sẽ trả về timestamp mili giây chứ không phải Date Object

```js
Date.parse('2018-07-22')
Date.parse('2018-07') //July 1st 2018, 00:00:00
Date.parse('2018') //Jan 1st 2018, 00:00:00
Date.parse('07/22/2018')
Date.parse('2018/07/22')
Date.parse('2018/7/22')
Date.parse('July 22, 2018')
Date.parse('July 22, 2018 07:22:13')
Date.parse('2018-07-22 07:22:13')
Date.parse('2018-07-22T07:22:13')
```

Cũng có thể đưa từng giá trị riêng lẻ năm, tháng, ngày, giờ, phút, giây, mili giây

```js
new Date(2018, 6, 22, 7, 22, 13, 0)
new Date(2018, 6, 22)
```

# Timezones

Khi khởi tạo một giá trị ngày giờ chúng ta có thể truyền thêm tham số *timezone*

```js
// bằng cách thêm +HOURS
new Date('July 22, 2018 07:22:13 +0700')

// bằng cách thêm tên
new Date('July 22, 2018 07:22:13 (CET)')
```

Nếu truyền sai giá trị timezone, javascript sẽ dùng UTC mặc định, không quăng lỗi. Nếu format date time đưa vào sai, giá trị trả về là 'Invalid Date'

# Convert và Format kiểu Date

Với một Date object, chúng ta có một số api để chuyển giá trị thành *string*

```js
const date = new Date('July 22, 2018 07:22:13')

date.toString() 
// "Sun Jul 22 2018 07:22:13 GMT+0200 (Central European Summer Time)"
date.toTimeString()
//"07:22:13 GMT+0200 (Central European Summer Time)"
date.toUTCString()
//"Sun, 22 Jul 2018 05:22:13 GMT"
date.toDateString()
//"Sun Jul 22 2018"
date.toISOString()
//"2018-07-22T05:22:13.000Z" (ISO 8601 format)
date.toLocaleString()
//"22/07/2018, 07:22:13"
date.toLocaleTimeString()
//"07:22:13"
date.getTime()
//1532236933000
date.getTime()
//1532236933000
```

# Lấy giá trị từ Date Object

Một số api để get giá trị của Date

```js
const date = new Date('July 22, 2018 07:22:13')

date.getDate()//22
date.getDay()
//0 (0 là chủ nhật, 1 là thứ 2..)
date.getFullYear() //2018
date.getMonth() //6 (Bắt đầu từ 0)
date.getHours() //7
date.getMinutes() //22
date.getSeconds() //13
date.getMilliseconds() //0 (không xác định)
date.getTime() //1532236933000
date.getTimezoneOffset()
//-120 (Tùy theo khu vực và vùng miền).
```

Các phương thức trên sẽ có thêm version UTC, trả về giá trị UTC không phụ thuộc vào giá trị timezone hiện tại

```js
date.getUTCDate() //22
date.getUTCDay() //0 (0 means sunday, 1 means monday..)
date.getUTCFullYear() //2018
date.getUTCMonth() //6 (starts from 0)
date.getUTCHours() //5 (not 7 like above)
date.getUTCMinutes() //22
date.getUTCSeconds() //13
date.getUTCMilliseconds() //0 (not specified)
```

# Set giá trị

Các phương thức để set giá trị

```js
const date = new Date('July 22, 2018 07:22:13')

date.setDate(newValue)
date.setDay(newValue)
date.setFullYear(newValue) //note: đừng dùng setYear(), bỏ rồi
date.setMonth(newValue)
date.setHours(newValue)
date.setMinutes(newValue)
date.setSeconds(newValue)
date.setMilliseconds(newValue)
date.setTime(newValue)
date.setTimezoneOffset(newValue)
```

Lưu ý, nếu ta dùng `date.setHours(48)` sẽ vẫn ok, nó sẽ tự động cộng lên thành một ngày mới, tương tự cho `setMinutes`, `setSeconds`

Version UTC

```js
const date = new Date('July 22, 2018 07:22:13')

date.setUTCDate(newalue)
date.setUTCDay(newValue)
date.setUTCFullYear(newValue)
date.setUTCMonth(newValue)
date.setUTCHours(newValue)
date.setUTCMinutes(newValue)
date.setUTCSeconds(newValue)
date.setUTCMilliseconds(newValue)
```

# Javascript tự động cộng thêm giá trị ngày giờ

Nếu chúng ta đưa vào giá trị ngày lớn hơn 31, javascript sẽ cộng lên thành tháng tiếp theo, chứ không báo lỗi

```js
new Date(2018, 6, 40)
//Thu Aug 09 2018 00:00:00 GMT+0200
```

# So sánh 2 giá trị ngày giờ

Sử dụng `Date.getTime()` để so sánh sự khác nhau theo mili giây

```js
const date1 = new Date('July 10, 2018 07:22:13')
const date2 = new Date('July 22, 2018 07:22:13')
const diff = date2.getTime() - date1.getTime()
```

Kiểm tra 2 giá trị Date có bằng nhau không

```js
const date1 = new Date('July 10, 2018 07:22:13')
const date2 = new Date('July 10, 2018 07:22:13')
if (date2.getTime() === date1.getTime()) {
  //dates are equal
}
```

Lưu ý là đang so sánh đến mili giây, nên nếu so sánh 2 giá trị `July 10, 2018 07:22:13` và `July 10, 2018` thì nó sẽ không bằng nhau.

# Format theo locale

Nếu trình duyệt hỗ trợ `Intl`, ta có thể sử dụng để localize number, string, currencies, date

```js
// "12/22/2017"
const date = new Date('July 22, 2018 07:22:13')
new Intl.DateTimeFormat().format(date)

new Intl.DateTimeFormat('en-US').format(date) //"7/22/2018"

// đưa thêm option để customize lại output
const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

new Intl.DateTimeFormat('en-US', options).format(date) //"7/22/2018, 7:22:13 AM"
new Intl.DateTimeFormat('it-IT', options2).format(date) //"22/7/2018, 07:22:13"
```

[Link bài gốc](https://flaviocopes.com/javascript-dates/)