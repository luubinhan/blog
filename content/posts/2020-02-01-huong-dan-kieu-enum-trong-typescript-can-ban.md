---
slug: "/2020-02-01-huong-dan-kieu-enum-trong-typescript-can-ban"
date: "2020-02-01"
title: "Kiểu enum trong TypeScript: làm việc như thế nào, sử dụng ra sao"
desc: "Chúng ta sẽ trả lời 2 câu hỏi sau: enum của TypeScript làm việc như thế nào, Nó được sử dụng để làm gì. Vở lòng cho người mới viết TypeScript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "typescript"]
---

## Các khái niệm căn bản của enum

Javascript chỉ có đúng một kiểu mà giá trị bị ràng buộc *rất cụ thể*: `boolean`, giá trị chỉ được phép là `true` hoặc `false`, không chấp nhận một giá trị nào khác. `Enum` là phiên bản *mở rộng* với công dụng tương tự như `boolean`

```ts
enum NoYes {
    No,
    Yes
}
```

2 giá trị `No` `Yes` được gọi là thành viên của hội `enum` `NoYes`. Dùng nó như một `object`, chúng ta có thể *chấm* đến giá trị đó

```ts
function toGerman(value: NoYes) {
  switch (value) {
    case NoYes.No:
      return 'Nein';
    case NoYes.Yes:
      return 'Ja';
  }
}
```

Tất cả thành viên của hội `enum` đều được cấp một *thẻ thành viên* gồm `name` và `value`. Ở trên chúng ta chỉ đang khai báo phần `name` cho enum, `value` lúc đó sẽ lấy mặc định là số từ 0 đi lên

```ts
enum NoYes {
  No,
  Yes,
}
// nếu khai báo một cách tường minh hơn
enum NoYes {
  No = 0,
  Yes = 1,
}

assert.equal(NoYes.No, 0);
assert.equal(NoYes.Yes, 1);
```

Nếu cà khịa, khai báo như thế này

```ts
enum Enum {
  A,
  B,
  C = 4,
  D,
  E = 8,
  F,
}
```

Đồng nghĩa là các giá trị kế tiếp sẽ tự động tăng lên một, so với giá trị khai báo trước đó

```ts
assert.deepEqual(
  [Enum.A, Enum.B, Enum.C, Enum.D, Enum.E, Enum.F],
  [0, 1, 4, 5, 8, 9]
);
```

Về cách đặt tên (`name`) trong `enum`, cũng có vài ba lựa chọn

- Đặt theo kiểu JavaScript, viết hoa hết, `Number,MAX_VALUE`
- Đặt theo kiểu symbol, con lạc đà, chữ đầu viết thường, `Symbol.asyncIterator`
- Kiểu TypeScript, con lạc đà, chữ đầu viết hoa, `Number.MaxValue`


Tương tự như object, chúng ta có thể truy xuất đến một thành viên của hội bằng cách viết sau

```ts
enum HttpRequestField {
  'Accept',
  'Accept-Charset',
  'Accept-Datetime',
  'Accept-Encoding',
  'Accept-Language',
}
assert.equal(HttpRequestField['Accept-Charset'], 1);
```

Giá trị `value` của enum, không bắt buộc là một number, có thể là một `string`

```ts
enum NoYes {
  No = 'No',
  Yes = 'Yes',
}
assert.equal(NoYes.No, 'No');
assert.equal(NoYes.Yes, 'Yes');
```

Còn một cách khai báo, ít được sử dụng, là kiểu xăng pha nhớt, các giá trị trong enum có thể là số cũng có thể là chữ

```ts
enum Enum {
  A,
  B,
  C = 'C',
  D = 'D',
  E = 8,
  F,
}
assert.deepEqual(
  [Enum.A, Enum.B, Enum.C, Enum.D, Enum.E, Enum.F],
  [0, 1, 'C', 'D', 8, 9]
);
```

Theo như kinh nghiệm từ các bật tiền bối, sử dụng enum thì nên dùng kiểu giá trị `string`

```ts
enum NoYes { No = 'NO', Yes = 'YES' }
```

Nếu có *log* ra chúng ta cũng biết được giá trị chính xác là gì, đỡ hack não ngồi đếm số thứ tự

```ts
console.log(NoYes.No);
console.log(NoYes.Yes);
```

Thêm nữa, ràng buộc được luôn kiểu giá trị

```ts
function func(noYes: NoYes) {}

func('abc');
func('Yes');
```

## Trường hợp sử dụng enum

### hằng số nhiều giá trị

Nếu chúng ta có một *mớ* các hằng số, có quan hệ họ hàng gần với nhau

```ts
const fatal = Symbol('fatal');
const error = Symbol('error');
const warn = Symbol('warn');
const info = Symbol('info');
const debug = Symbol('debug');
const trace = Symbol('trace');
```

Có thể dùng enum

```ts
enum LogLevel {
  fatal = 'fatal',
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
  trace = 'trace',
}
```

Lợi ích mang lại: nhóm lại với nhau một cục, TypeScript dễ đàng kiểm tra giúp chúng ta

### Tường minh hơn boolean

Chúng ta hay dùng boolean để làm *cờ* bật tắt hoặc đảo ngược giá trị

```ts
class List1 { isOrdered: boolean; }
```

Nếu dùng enum, nó sẽ rõ nghĩa hơn, nhiều lựa chọn hơn

```ts
enum ListKind { ordered, unordered }
class List2 {
  listKind: ListKind;
  
}
```

### String là một hằng số đúng nghĩa, an toàn hơn vì không thể thay đổi được giá trị

Ví dụ hàm bên dưới dùng `const`

```ts
const GLOBAL = 'g';
const NOT_GLOBAL = '';
type Globalness = typeof GLOBAL | typeof NOT_GLOBAL;

function createRegExp(source: string,
  globalness: Globalness = NOT_GLOBAL) {
    return new RegExp(source, 'u' + globalness);
  }

assert.deepEqual(
  createRegExp('abc', GLOBAL),
  /abc/ug);
```
dùng enum tiện hơn

```ts
enum Globalness {
  GLOBAL = 'g',
  NOT_GLOBAL = '',
}

function createRegExp(source: string, globalness = Globalness.NOT_GLOBAL) {
  return new RegExp(source, 'u' + globalness);
}

assert.deepEqual(
  createRegExp('abc', Globalness.GLOBAL),
  /abc/ug);
```

## Enum lúc chạy thì sẽ trở thành gì?

Sau khi TypeScript đã compile, enum sẽ được được chuyển thành javascript object

```ts
enum NoYes {
  No,
  Yes,
}
```

```js
var NoYes;
(function (NoYes) {
  NoYes[NoYes["No"] = 0] = "No";
  NoYes[NoYes["Yes"] = 1] = "Yes";
})(NoYes || (NoYes = {}));
```

[TypeScript enums: How do they work? What can they be used for?](https://2ality.com/2020/01/typescript-enums.html)

