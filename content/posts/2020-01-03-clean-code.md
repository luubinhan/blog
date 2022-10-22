---
slug: "/2020-01-03-clean-code"
date: "2020-01-02"
title: "Clean Code"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "javascript"]
---

## Đặt tên

❌ Không ngữ nghĩa
```js
let x = 10;

let y = new Date().getFullYear();

if (x > 30) {
    //...
}

if (y - x >1990) {
    //...
}
```

✅ Có ngữ nghĩa
```js
let userAge = 30;

let currentYear = new Date().getFullYear();

if (userAge > 30) {
    //...
}

if (currentYear - userAge >1990) {
    //...
}
```

❌ Dư hậu tố, tiền tố không cần thiết

```js
let nameValue;
function theProduct();
```

✅ Vừa đủ

```js
let name;
function product();
```

## Điều kiện

❌ Không dùng điều kiện phủ định

```js
if (!isUserExist(user)) {
  //...
}
```

✅ Không dùng `!`

```js
if (isNewExist(user)) {
  //...
}
```

❌ Quá nhiều điều kiện chồng chéo

```js
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

✅ Hạn chế điều kiện bằng return

```js
function isPercentage(val) {
  if (val < 0) {
    return false;
  }

  if (val > 100) {
    return false;
  }

  return true;
}

// hoặc xịn hơn
function isPercentage(val) {
  var isInRange = (val >= 0 && val <= 100);
  return isInRange;
}
```

## Tham số

❌ Không truyền tham số mặc định

```js
function getUserData(name) {
  const userName = userName || "Patrick Collision";
  // ...
}
```

✅ Truyền tham số mặc định

```js
function getUserData(name = "Patrick Collision") {
  // ...
}
```

❌ Truyền nhiều tham số

```js
function getUserData(name, email, role) {
}
```

✅ Truyền tham số kiểu object

```js
function getUserData({ name, email, role }) {
}
```

## Function

❌ Đa tính năng, nhiều công dụng

```js
function checkSomething(statement) {
  const REGEXES = [
    // ...
  ];

  const statements = statement.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const names= [];
  tokens.forEach(token => {
    // lex...
  });

  names.forEach(node => {
    // parse...
  });
}
```

✅ Tối giản hóa chức năng

```js
function checkSomething(statement) {
  const tokens = tokenize(statement);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

## Bắt lỗi

❌ Bắt lỗi cho vui

```js
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

✅ Có lỗi thì kèm theo xử lý

```js
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

## Comment

❌ Cái gì cũng comment

```js
function hashing(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

✅ Comment đúng nơi cần thiết

```js
function hashing(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```