---
slug: "/2018-08-05-huong-dan-lam-viec-voi-javascript-regular-expressions"
date: "2018-08-05"
title: "Hướng dẫn cơ bản để làm việc với Javascript regular expression"
desc: "Những khái niệm quan trọng nhất kèm ví dụ dễ hiểu nhất để bạn không còn sợ mỗi khi đụng vô regular expression"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Giới thiệu](#giới-thiệu)
- [Regex trông như thế nào](#regex-trông-như-thế-nào)
- [Làm việc thế nào](#làm-việc-thế-nào)
- [Anchoring](#anchoring)
- [Thõa điều kiện trong khoản](#thõa-điều-kiện-trong-khoản)
- [Chỉ được phép xuất hiện 1 lần](#chỉ-được-phép-xuất-hiện-1-lần)
- [Inverse kết quá](#inverse-kết-quá)
- [Một số cú pháp đặc biệt](#một-số-cú-pháp-đặc-biệt)
- [Câu điều kiện Or](#câu-điều-kiện-or)
- [Quantifiers](#quantifiers)
  - [+](#)
  - [*](#)
  - [{n}](#n)
  - [{n,m}](#nm)
- [Điều kiện không bắt buộc (optional)](#điều-kiện-không-bắt-buộc-optional)
- [Group](#group)
- [Lấy giá trị của Group](#lấy-giá-trị-của-group)
- [Flag](#flag)
- [Thay thế chuỗi bằng Regex](#thay-thế-chuỗi-bằng-regex)
- [Một vài ứng dụng](#một-vài-ứng-dụng)

<!-- /TOC -->

# Giới thiệu

Regular Expression (hay gọi tắt là **regex**) là một string với format đặc biệt, với nó chúng ta có thể

- Tìm text trong *string*
- Thay thế substring trong *string*
- Trích xuất thông tin từ một *string*

Tất cả các ngôn ngữ đều có hỗ trợ regex. Có thể mỗi ngôn ngữ có đôi chổ khác nhau, tuy nhiên nhìn chung thì nó được áp dụng giống nhau cho hầu hết.

Regex có thể nối là rất khó học và nhớ hết, khó viết, khó maintain, chỉnh sửa. Tuy nhiên có những công việc gần như là chỉ có thể thực hiện với Regex

Bài này chúng ta chỉ điểm qua những khái niệm cơ bản của nó để làm việc với Regex không sợ sệt

# Regex trông như thế nào

Trong javascript, regex là một object, có thể định nghĩa bằng 2 cách

```js
// tạo 1 object mới
const re1 = new RegExp('hey');

// dùng regular expression literal 
const re2 = /hey/
```

`hey` trong ví dụ trên được gọi là **pattern**

# Làm việc thế nào

Regex ở trên chúng ta đang tìm string `hey`, không giới hạn gì cả: string có thể gồm một đống text, chữ `hey` nằm ở đâu đó không quan trọng. Test cái regex bằng `RegExp.test(String)`, sẽ trả về 1 **boolean**

```js
rel1.test('hey');
// => true
rel1.test('blablabla hey blablabla');
// => true
rel1.test('he');
// => false
rel1.test('blablabla');
// => false
```

# Anchoring

Nếu muốn thêm điều kiện chữ `hey` phải ở **đầu**, sử dụng cú pháp `^`

```js
/^hey/.test('hey')     //✅
/^hey/.test('bla hey') //❌
```

Điều kiện chữ `hey` nằm ở **cuối**, thêm cú pháp `$`

```jsx
/hey$/.test('hey')     //✅
/hey$/.test('bla hey') //✅
/hey$/.test('hey you') //❌
```

Nếu kết hợp cả 2 cú pháp trên, ta có câu điều kiện chỉ được phép có đúng chữ `hey`

```js
/^hey$/.test('hey') //✅
```

Để đặt điều kiện string bắt đầu với 1 text và kết thúc có 1 text khác, dùng `.*`

```js
/^hey.*joe$/.test('hey joe')             //✅
/^hey.*joe$/.test('heyjoe')              //✅
/^hey.*joe$/.test('hey how are you joe') //✅
/^hey.*joe$/.test('hey joe!')            //❌
```

# Thõa điều kiện trong khoản

Thay vì thõa một string cụ thể, có thể cho thõa bất kỳ ký tự nào trong một khoản, đặt giữa cặp `[]`

```js
/[a-z]/ // có các ký tự a,b,c....x,y,z
/[A-Z]/ // có các ký tự A,B,C,...X,Y,Z
/[a-c]/ // có các ký tự a,b,c
/[0-9]/ // 0,1,2...8,9
```

```js
/[a-z]/.test('a')  //✅
/[a-z]/.test('1')  //❌
/[a-z]/.test('A')  //❌

/[a-c]/.test('d')  //❌
/[a-c]/.test('dc') //✅
```

Kết hợp nhiều khoản lại

```js
/[A-Za-z0-9]/
```

```js
/[A-Za-z0-9]/.test('a') //✅
/[A-Za-z0-9]/.test('1') //✅
/[A-Za-z0-9]/.test('A') //✅
```

# Chỉ được phép xuất hiện 1 lần

Kết hợp với `^` và `$` với cặp điều kiện khoản `[]`

```js
/^[A-Za-z0-9]$/

/^[A-Za-z0-9]$/.test('A')  //✅
/^[A-Za-z0-9]$/.test('Ab') //❌
```

# Inverse kết quá

Dùng cú pháp `^` ở đầu của khoản giá trị

```js
/[^A-Za-z0-9]/.test('a') //❌
/[^A-Za-z0-9]/.test('1') //❌
/[^A-Za-z0-9]/.test('A') //❌
/[^A-Za-z0-9]/.test('@') //✅
```

# Một số cú pháp đặc biệt

- `\d` tương tự như `[0-9]`, chỉ là các giá trị số
- `\D` tương tự như `[^0-9], không chưa các ký tự số
- `\w` tương tự như `[A-Za-z0-9]`, bao gồm ký tự chữ và số
- `\W` tương tự như `[^A-Za-z0-9]`, không chứa ký tự chữ và số
- `\s` chứa các ký tự khoản trống như: space, tab, newline
- `\S` không chứa ký tự khoản trống
- `\0` chứa ký tự null
- `\n` chứa ký tự xuống dòng (newline)
- `\t` chứ ký tự tab

# Câu điều kiện Or

```js
/hey|ho/.test('hey') //✅
/hey|ho/.test('ho')  //✅
```

# Quantifiers

## +

Thõa điều kiện 1 **hoặc** nhiều hơn 1

```js
/^\d+$/

/^\d+$/.test('12')     //✅
/^\d+$/.test('14')     //✅
/^\d+$/.test('144343') //✅
/^\d+$/.test('')       //❌
/^\d+$/.test('1a')     //❌
```

## *

Thõa điều kiện 0 lần trở lên

```js
/^\d+$/

/^\d*$/.test('12')     //✅
/^\d*$/.test('14')     //✅
/^\d*$/.test('144343') //✅
/^\d*$/.test('')       //✅
/^\d*$/.test('1a')     //❌
```

## {n}

Thõa ít nhất **n** lần

```js
/^\d{3}$/

/^\d{3}$/.test('123')  //✅
/^\d{3}$/.test('12')   //❌
/^\d{3}$/.test('1234') //❌

/^[A-Za-z0-9]{3}$/.test('Abc') //✅
```

## {n,m}

Thõa từ n đến m lần

```js
/^\d{3,5}$/

/^\d{3,5}$/.test('123')    //✅
/^\d{3,5}$/.test('1234')   //✅
/^\d{3,5}$/.test('12345')  //✅
/^\d{3,5}$/.test('123456') //❌
```

nếu mà không đưa vào giá trị `m` thì thõa từ n đến bao nhiêu cũng được

```js
/^\d{3,}$/

/^\d{3,}$/.test('12')        //❌
/^\d{3,}$/.test('123')       //✅
/^\d{3,}$/.test('12345')     //✅
/^\d{3,}$/.test('123456789') //✅
```

# Điều kiện không bắt buộc (optional)

Thêm dấu `?` để điều kiện đó không bắt buộc phải thõa

```js
/^\d{3}\w?$/

/^\d{3}\w?$/.test('123')   //✅
/^\d{3}\w?$/.test('123a')  //✅
/^\d{3}\w?$/.test('123ab') //❌
```

# Group

Để nhóm các điều kiện lại, đặt giữa `()`

Ví dụ bên dưới, điều kiện thõa khi có *đúng* 3 ký tự số và theo sau đó là ký tự số hoặc chữ

```js
/^(\d{3})(\w+)$/

/^(\d{3})(\w+)$/.test('123')          //❌
/^(\d{3})(\w+)$/.test('123s')         //✅
/^(\d{3})(\w+)$/.test('123something') //✅
/^(\d{3})(\w+)$/.test('1234')         //✅
```

Nếu đặt dấu `+` phía sau `()`

```js
/^(\d{2})+$/

/^(\d{2})+$/.test('12')   //✅
/^(\d{2})+$/.test('123')  //❌
/^(\d{2})+$/.test('1234') //✅
```

# Lấy giá trị của Group

Thay vì sử dụng `RegExp.test(String)` để trả về boolean, sử dụng

- `String.match(RegExp)`
- `RegExp.exec(String)`

... để return một Array với những string thõa điều kiện

```js
'123s'.match(/^(\d{3})(\w+)$/)
//Array [ "123s", "123", "s" ]

/^(\d{3})(\w+)$/.exec('123s')
//Array [ "123s", "123", "s" ]

'hey'.match(/(hey|ho)/)
//Array [ "hey", "hey" ]

/(hey|ho)/.exec('hey')
//Array [ "hey", "hey" ]

/(hey|ho)/.exec('ha!')
//null
```

Trường hợp group đó thõa điều kiện nhiều lần, chỉ trả về giá trị cuối cùng

```js
'123456789'.match(/(\d)+/)
// Array ["123456789", "9"]
```

# Flag

- `g`: kiểm tra điều kiện nhiều lần
- `i`: không phân biệt hoa thường
- `m`: cho phép kiểm tra xuống dòng
- `u`: bật hổ trợ unicode

```js
/hey/ig.test('HEy') //✅
new RegExp('hey', 'ig').test('HEy') //✅
```

# Thay thế chuỗi bằng Regex

Hàm `replace` của String Object

```js
"Hello world!".replace('world', 'dog') //Hello dog!
"My dog is a good dog!".replace('dog', 'cat') //My cat is a good dog!
```
... có thể truyền vào tham số đầu  là một Regex

```js
"Hello world".replace(/world/, 'dog') // Hello dog
```

Thêm `g` để thay thế nhiều lần

```js
"My dog is a good dog!".replace(/dog/g, 'cat') //My cat is a good cat!
```

Sử dụng Group để di chuyển các phần text trong string

```js
"Hello, world!".replace(/(\w+), (\w+)!/, '$2: $1!!!')
// "world: Hello!!!"
```

# Một vài ứng dụng

Lấy số từ String

```js
'Test 123123329'.match(/\d+/)
// Array [ "123123329" ]
```

Kiểm tra email

```js
/(\S+)@(\S+)\.(\S+)/
/(\S+)@(\S+)\.(\S+)/.exec('copesc@gmail.com')
//["copesc@gmail.com", "copesc", "gmail", "com"]
```

Lấy đoạn test nằm giữa dấu `""`

```js
const hello = 'Hello "nice flower"'
const result = /"([^']*)"/.exec(hello)
//Array [ "\"nice flower\"", "nice flower" ]
```

Lấy nội dung ở giữa html tag

```js
/<span\b[^>]*>(.*?)<\/span>/

/<span\b[^>]*>(.*?)<\/span>/.exec('test')
// null
/<span\b[^>]*>(.*?)<\/span>/.exec('<span>test</span>')
// ["<span>test</span>", "test"]
/<span\b[^>]*>(.*?)<\/span>/.exec('<span class="x">test</span>')
// ["<span class="x">test</span>", "test"]
```

[Link bài gốc](https://flaviocopes.com/javascript-regular-expressions/)