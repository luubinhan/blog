---
slug: "/2018-08-05-huong-dan-lam-viec-voi-javascript-regular-expressions"
date: "2018-08-05"
title: "Hướng dẫn cơ bản để làm việc với Javascript regular expression"
desc: "Những khái niệm quan trọng nhất kèm ví dụ dễ hiểu nhất để bạn không còn sợ mỗi khi đụng vô regular expression"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

<!-- TOC -->

- [Giới thiệu](#gi%e1%bb%9bi-thi%e1%bb%87u)
- [Khai báo regex](#khai-b%c3%a1o-regex)
- [Kiểm tra regex](#ki%e1%bb%83m-tra-regex)
- [Một số điều kiện có sẵn](#m%e1%bb%99t-s%e1%bb%91-%c4%91i%e1%bb%81u-ki%e1%bb%87n-c%c3%b3-s%e1%ba%b5n)
- [Các điều kiện chúng ta hay sử dụng](#c%c3%a1c-%c4%91i%e1%bb%81u-ki%e1%bb%87n-ch%c3%bang-ta-hay-s%e1%bb%ad-d%e1%bb%a5ng)
- [Nhóm điều kiện](#nh%c3%b3m-%c4%91i%e1%bb%81u-ki%e1%bb%87n)
- [Lấy giá trị của 1 Group](#l%e1%ba%a5y-gi%c3%a1-tr%e1%bb%8b-c%e1%bb%a7a-1-group)
- [Setting](#setting)
- [Ứng dụng](#%e1%bb%a8ng-d%e1%bb%a5ng)
  - [Thay thế chuỗi](#thay-th%e1%ba%bf-chu%e1%bb%97i)
  - [Lấy số từ String](#l%e1%ba%a5y-s%e1%bb%91-t%e1%bb%ab-string)
  - [Kiểm tra email](#ki%e1%bb%83m-tra-email)
  - [Lấy đoạn test nằm giữa dấu `""`](#l%e1%ba%a5y-%c4%91o%e1%ba%a1n-test-n%e1%ba%b1m-gi%e1%bb%afa-d%e1%ba%a5u-%22%22)
  - [Lấy nội dung ở giữa html tag](#l%e1%ba%a5y-n%e1%bb%99i-dung-%e1%bb%9f-gi%e1%bb%afa-html-tag)

<!-- /TOC -->

## Giới thiệu

Regular Expression (hay gọi tắt là **regex** - đọc là ghi-ríc-cờ-sờ) là một string với format đặc biệt, với nó chúng ta có thể

- Tìm text trong *string*
- Thay thế substring trong *string*
- Trích xuất thông tin từ một *string*

Tất cả các ngôn ngữ đều có hỗ trợ regex. Có thể mỗi ngôn ngữ có đôi chổ khác nhau, tuy nhiên nhìn chung thì nó được áp dụng giống nhau cho hầu hết.

Regex có thể nói là rất khó học, khó viết, khó nhớ, khó sửa. Tuy nhiên có những việc chỉ có thể thực hiện được với regex.

Ví dụ, kiểm tra một `string` có kết thúc bằng `.com`, `.football` hay không

```
"google.com" → true
"www.vietnam.football" → true
"google.foobar" → false
```

regex cho yêu cầu đó

```js
/(\.com|\.football)$/i
```


## Khai báo regex

**Phân tách** cái regex ở trên

![](https://miro.medium.com/max/1060/1*eRQ3ooQ_LPIEpYjcUMSgZw.png)

- `\` đặt trước các ký tự đặc biệt, dấu `.` là một ký tự đặc biệt
- `|` là câu điều kiện **or**
- `$` là điều kiện phải xuất hiện ở cuối string
- Đoạn nằm giữa `/đoạn-nằm-giữa/`, là chổ chúng ta viết các điều kiện. Đoạn-nằm-giữa có tên tiếng mỹ là pattern
- Chữ `i` ở cuối, phía sau `/` là một dạng **setting**, `i` là điều kiện chỉ hợp lệ nếu xuất hiện đúng một lần duy nhất. Có nhiều dạng setting khác nữa, phía dưới sẽ đề cập.

Trong javascript, regex là một object, có thể định nghĩa bằng 2 cách

```js
// tạo 1 object mới
const regex1 = new RegExp('football');

// dùng regular expression literal 
const regex2 = /football/
```

## Kiểm tra regex

Regex ở trên chúng ta đang tìm string `football`, không giới hạn gì cả, chữ `football` nằm ở đâu không quan trọng.

Kiểm tra regex bằng `RegExp.test(string)`, sẽ trả về giá trị `true/false`

```js
regex1.test('football');
// => true
regex1.test('blablabla football blablabla');
// => true
regex2.test('footba');
// => false
regex2.test('blab foot ballabla');
// => false
```

## Một số điều kiện có sẵn

*Đã khó rồi, các bạn còn đề nghị một số kiểu viết tắt cho bắt anh em căng não ra học*

- `\d` tương tự như `[0-9]`, chỉ là các giá trị số
- `\D` tương tự như `[^0-9]`, không chưa các ký tự số
- `\w` tương tự như `[A-Za-z0-9]`, bao gồm ký tự chữ và số
- `\W` tương tự như `[^A-Za-z0-9]`, không chứa ký tự chữ và số
- `\s` chứa các ký tự khoản trống như: space, tab, newline
- `\S` không chứa ký tự khoản trống
- `\0` chứa ký tự null
- `\n` chứa ký tự xuống dòng (newline)
- `\t` chứ ký tự tab


## Các điều kiện chúng ta hay sử dụng

> Phải xuất hiện ở đầu câu: `^`

Nếu muốn thêm điều kiện chữ `football` phải ở **đầu** câu

```js
/^football/.test('football')     //✅
/^football/.test('bla football') //❌
```

> Phải xuất hiện ở cuối câu: `$`

Điều kiện chữ `football` nằm ở **cuối**

```jsx
/football$/.test('football')     //✅
/football$/.test('bla football') //✅
/football$/.test('football you') //❌
```

Nếu kết hợp cả 2 cú pháp trên, ta có câu điều kiện chỉ được phép có đúng chữ `football`

```js
/^football$/.test('football') //✅
```

> Phải bắt đầu bằng bằng 1 pattern và kết thúc bằng 1 pattern khác: `.*`

Bắt đầu bằng chữ `hey` và có kết thúc bằng chữ `joe`

```js
/^hey.*joe$/.test('hey joe')             //✅
/^hey.*joe$/.test('heyjoe')              //✅
/^hey.*joe$/.test('hey how are you joe') //✅
/^hey.*joe$/.test('hey joe!')            //❌
```

> Phải nằm trong khoản: `[điểm bắt đầu - điểm kết thúc]`

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

*Hợp thể*

```js
/[A-Za-z0-9]/
```

```js
/[A-Za-z0-9]/.test('a') //✅
/[A-Za-z0-9]/.test('1') //✅
/[A-Za-z0-9]/.test('A') //✅
```

> Chỉ được phép xuất hiện 1 lần: kết hợp `[]`, `^`, `$`

```js
/^[A-Za-z0-9]$/

/^[A-Za-z0-9]$/.test('A')  //✅
/^[A-Za-z0-9]$/.test('Ab') //❌
```

> Đảo ngược kết quả: `[^]`

```js
/[^A-Za-z0-9]/.test('a') //❌
/[^A-Za-z0-9]/.test('1') //❌
/[^A-Za-z0-9]/.test('A') //❌
/[^A-Za-z0-9]/.test('@') //✅
```

> Điều kiện **hoặc**: `|`

```js
/hey|ho/.test('hey') //✅
/hey|ho/.test('ho')  //✅
```

> Xuất hiện ít nhất một lần: `+`

```js
/^\d+$/ // là các số từ 0-9

/^\d+$/.test('1')     //✅
/^\d+$/.test('14')     //✅
/^\d+$/.test('144343') //✅
/^\d+$/.test('')       //❌
/^\d+$/.test('1a')     //❌
```

> Chỉ đúng hoặc sai, không có thể cả đúng và sai: `*`

Nói vậy hơi khó hiểu, để giải thích rõ hơn nè, ví dụ yêu cầu phải là số từ 0-9, nếu kiểm tra `1a` => false vì nó có 1 là đúng, `a` là sai, còn `'' => true` vì nó chỉ có sai không có đúng

```js
/^\d*$/

/^\d*$/.test('12')     //✅
/^\d*$/.test('14')     //✅
/^\d*$/.test('144343') //✅
/^\d*$/.test('')       //✅
/^\d*$/.test('1a')     //❌
```

> Đúng n lần: `{n}`

```js
/^\d{3}$/ // có 3 ký tự số

/^\d{3}$/.test('123')  //✅
/^\d{3}$/.test('12')   //❌
/^\d{3}$/.test('1234') //❌

// hợp thể nào
/^[A-Za-z0-9]{3}$/.test('Abc') //✅
```

> Đúng từ  n đến m lần: `{n,m}`

```js
/^\d{3,5}$/ // đúng từ 3,4,5 lần

/^\d{3,5}$/.test('123')    //✅
/^\d{3,5}$/.test('1234')   //✅
/^\d{3,5}$/.test('12345')  //✅
/^\d{3,5}$/.test('123456') //❌
```

Nếu không đưa vào giá trị `m` thì thõa từ `n` đến bao nhiêu cũng được

```js
/^\d{3,}$/

/^\d{3,}$/.test('12')        //❌
/^\d{3,}$/.test('123')       //✅
/^\d{3,}$/.test('12345')     //✅
/^\d{3,}$/.test('123456789') //✅
```

>  Điều kiện đó không bắt buộc: `?`

```js
// \w bao gồm ký tự chữ và số
// \d tương tự như `[0-9]`
/^\d{3}\w?$/

/^\d{3}\w?$/.test('123')   //✅
/^\d{3}\w?$/.test('123a')  //✅
/^\d{3}\w?$/.test('123ab') //❌
```

## Nhóm điều kiện

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

## Lấy giá trị của 1 Group

Thay vì sử dụng `RegExp.test(String)` để trả về boolean, sử dụng

- `String.match(RegExp)`
- `RegExp.exec(String)`

Sẽ return một Array với những string thõa điều kiện

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

## Setting

- `g`: kiểm tra điều kiện nhiều lần
- `i`: không phân biệt hoa thường
- `m`: cho phép kiểm tra xuống dòng
- `u`: bật hỗ trợ unicode

```js
/hey/ig.test('HEy') //✅
new RegExp('hey', 'ig').test('HEy') //✅
```

## Ứng dụng

### Thay thế chuỗi

Hàm `replace` của String Object

```js
"Hello world!".replace('world', 'dog') //Hello dog!
"My dog is a good dog!".replace('dog', 'cat') //My cat is a good dog!
```

Có thể truyền vào tham số đầu  là một Regex

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

### Lấy số từ String

```js
'Test 123123329'.match(/\d+/)
// Array [ "123123329" ]
```

### Kiểm tra email

```js
/(\S+)@(\S+)\.(\S+)/
/(\S+)@(\S+)\.(\S+)/.exec('copesc@gmail.com')
//["copesc@gmail.com", "copesc", "gmail", "com"]
```

### Lấy đoạn test nằm giữa dấu `""`

```js
const hello = 'Hello "nice flower"'
const result = /"([^']*)"/.exec(hello)
//Array [ "\"nice flower\"", "nice flower" ]
```

### Lấy nội dung ở giữa html tag

```js
/<span\b[^>]*>(.*?)<\/span>/

/<span\b[^>]*>(.*?)<\/span>/.exec('test')
// null
/<span\b[^>]*>(.*?)<\/span>/.exec('<span>test</span>')
// ["<span>test</span>", "test"]
/<span\b[^>]*>(.*?)<\/span>/.exec('<span class="x">test</span>')
z// ["<span class="x">test</span>", "test"]
```

<a target="_blank" rel="noopener noreferrer" href="A guide to JavaScript Regular Expressions">📜 https://flaviocopes.com/javascript-regular-expressions/</a>
