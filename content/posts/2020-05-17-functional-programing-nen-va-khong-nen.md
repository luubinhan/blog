---
slug: "/2020-05-17-functional-programing-nen-va-khong-nen"
date: "2020-05-17"
title: "Functional programing nên và không nên"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Luôn trả về giá trị](#luôn-trả-về-giá-trị)
- [Module hóa](#module-hóa)
- [Hợp thể ko kế thừa (composition vs. inheritance)](#hợp-thể-ko-kế-thừa-composition-vs-inheritance)
- [Ghi nhớ khi cần thiết](#ghi-nhớ-khi-cần-thiết)
- [Không thay đổi giá trị gốc](#không-thay-đổi-giá-trị-gốc)
- [Không dùng vòng lặp `for`](#không-dùng-vòng-lặp-for)
- [Không dùng `switch...case`](#không-dùng-switchcase)
- [Try...catch](#trycatch)
- [Undefined và null](#undefined-và-null)
- [Class](#class)
- [Đặt tên function](#đặt-tên-function)

<!-- /TOC -->

## Luôn trả về giá trị

**Luôn trả về giá trị**, kể cả nhưng hàm chỉ tạo side-effect, ngoài ra giá trị trả về còn nên cố định luôn một kiểu, không nên lúc kiểu này lúc kiểu khác, giữ giá trị thô, đừng lưu giá trị đã định dạng (như format tiền tệ, ngày tháng), dùng tham số, đừng hard-code

❌ Không ngon

```js
let result = 1;
for (let i = 2; i <= 5; i++) {
  result *= i;
}

console.log("Fact of 5: ", result);
```

✅ Chuẩn cơm mẹ nấu

```js
const fact = (n) => (n === 0 ? 1 : n * fact(n - 1));

console.log("Fact of 5: ", fact(5));
```

## Module hóa

Tách bạch một module chỉ làm một việc, và làm thật tốt việc đó

## Hợp thể ko kế thừa (composition vs. inheritance)

Kế thừa **KHÔNG** phải là cách chúng ta xử lý dữ liệu, behavior trong functional programing

## Ghi nhớ khi cần thiết

Với pure function, việc ghi nhớ (memoize) kết quả được xem là an toàn vì cùng input-cùng output.

Ví dụ dùng hàm `memize` của thư viện Ramda

```js
const fact = memoize((n) => (0 === n ? 1 : n * fact(n - 1)));

fact(5); // Calculates fact for 5, 4, 3 ...
fact(5); // Instantaneous
fact(3); // Instantaneous
```

## Không thay đổi giá trị gốc

❌ Không ngon

```js
var approved = [];

for (var i = 0; i < approved.length; i++) {
  if (users[i].score >= 7) {
    approved.push(approved);
  }
}
```

✅ Chuẩn cơm mẹ nấu

```js
const approved = filter((user) => user.score >= 7, users);
```

## Không dùng vòng lặp `for`

Mặc dù vòng lặp `for` nhanh nhất trong các vòng lặp, tuy nhiên nghiêm cấm sử dụng để tránh gây ra một side-effect không cố ý.

❌ Không ngon

```js
const even = [];
for (let i = 0; i <= 300; i++) {
  if (i % 2 === 0) {
    even.push(i);
  }
}

console.log(even); // [0, 2, 4, 6, 8 ...]
```

✅ Chuẩn cơm mẹ nấu

```js
import { filter, range } from "ramda";

const even = filter((n) => n % 2 === 0);

console.log(even(range(0, 300))); // [0, 2, 4, 6, 8 ...]
```

## Không dùng `switch...case`

❌ Không ngon

```js
const person = { name: "Wesley" };
let result;

switch (person.name) {
  case "Dayana":
    result = person.name + " is cool!";
    break;
  case "Wesley":
    result = person.name + " likes farting";
    break;
  default:
    result = "Who is " + person.name + "?";
}

console.log(result); // Wesley likes farting
```

✅ Chuẩn cơm mẹ nấu

```js
import { T, cond, propEq } from "ramda";

const getDescription = cond([
  [propEq("name", "Dayana"), ({ name }) => `${name} is cool!`],
  [propEq("name", "Wesley"), ({ name }) => `${name} likes farting`],
  [T, ({ name }) => `Who is ${name}?`]
]);

console.log(getDescription({ name: "Wesley" })); // Wesley likes farting
```

## Try...catch

❌ Không ngon

```js
try {
  undefined.property;
} catch (err) {
  console.log(err);
}
```

✅ Chuẩn cơm mẹ nấu

```js
import { tryCatch } from "ramda";
import { Either } from "ramda-fantasy";

const computation = tryCatch(
  () => undefined.property,
  Either.Right,
  Either.Left
);

console.log(computation()); // Left<TypeError>
```

## Undefined và null

Không có giá trị (undefined, null) dẫn đến chuyện phải verify khá nhiều thứ và điều kiện nối điều kiện. Sử dụng `Maybe`

❌ Không ngon

```js
const safeDiv = (a, b) => {
  if (b === 0) {
    return undefined;
  }

  return a / b;
};

console.log(safeDiv(20, 0) + 10); // Ops
```

✅ Chuẩn cơm mẹ nấu

```js
import { Maybe } from "ramda-fantasy";

const safeDiv = (a, b) => (0 === b ? Maybe.Nothing : Maybe.Just(a / b));

safeDiv(20, 0).chain((result) => {
  console.log(result + 10); // Never falls here
});
```

## Class

Nói chung, sử dụng `class` chúng ép buộc phải tạo ra effect và thao tác trực tiếp đến đối tượng gốc.

❌ Không ngon

```js
class Person {
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

let person = new Person();
person.setName("Cassandra");
```

✅ Chuẩn cơm mẹ nấu

```js
import { lensProp, prop, set } from "ramda";

const setName = set(lensProp("name"));
const getName = prop("name");

const person = setName("Cassandra", {});
```

## Đặt tên function

- Có một **động từ** mô tả cái nó sẽ làm
- Mô tả được bên trong nó làm cái gì (tất nhiên là ngắn gọn nhất có thể)
- Nếu có cùng concept, sử dụng một từ chung
- Chỉ làm một việc duy nhất
- Không mô tả nó làm như thế nào
- Nếu gặp khó khăn trong việc đặt tên function, có thể bạn đã không đúng khi gom quá nhiều xử lý vào nó (ôm đồm xử lý)
