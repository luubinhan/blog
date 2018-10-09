---
slug: "/2016-11-19-phan-5-es6-can-ban-template-literals"
date: "2016-11-19"
title: "Hồi 5: ES6 căn bản - Template literals"
desc: "Hồi 5 trong series ES6 căn bản, nói về Template literals, một nâng cấp lớn cho string"
category: "javascript"
cover: ""
type: "post"
lesson: 1
chapter: 5
tags: ["javascript"]
---

Trong Series này

1. [Nâng cấp cho Object](/2016-11-15-chuong-1-es6-can-ban)
2. [Arrow function](/2016-11-16-chuong-2-es6-can-ban-arrow-function/)
3. [Assignment Destruction](/2016-11-17-phan-3-es6-can-ban-assignment-destructuring)
4. [Rest parameters và spread operator](/2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator)
5. [Template literals](/2016-11-19-phan-5-es6-can-ban-template-literals)
6. [Khai báo biến với let và const](/2016-11-20-phan-6-es6-can-ban-khai-bao-let-const)
7. [Căn bản class](/2016-11-21-phan-7-es6-can-ban-classes)

<!-- TOC -->

- [Cú pháp](#cú-pháp)
- [Lưu ý về dấu backslash `\`](#lưu-ý-về-dấu-backslash-\)
- [Lồng nhau](#lồng-nhau)
- [Multi-line String](#multi-line-string)
- [Tagged templates](#tagged-templates)

<!-- /TOC -->

Template literal là một `string` **đặc biệt**, mình có thể nhúng **expression** vào trong đó.

# Cú pháp

Đặt `string` giữa dấu <code>``</code>

```js
var text  = `First template literal`
```

Chèn giữa `string` đó một đoạn *code javascript* (expression)

```js
var name  = `AnLuu`
var text = <code>Hello, `${name}!</code>`
console.log(text)
// result: Hello, AnLuu
```


Biến sử dụng trong expression phải được khai báo trước

```js
`The time and date is ${ new Date().toLocalString() }`
`The result of 2+3 equals ${ 2 + 3 }`
```

# Lưu ý về dấu backslash `\`

```js
`\`` === '`' // --> true
```

Bình thường sau ký tự `\` là một ký tự đặc biệt nào đó, ví dụ \n để thêm dòng mới, nếu không muốn có kết quả này, mà chỉ muốn render ra đúng ký tự \n, dùng hàm `String.raw`

```js
var text = String.raw`The "\n" new line won't result in a new line. It'll be escapted`
```

# Lồng nhau

Mình có thể lồng code trong code

```js
`This a template literal ${ `with another %{ 'one' } embeded inside it`}`

// Ví dụ khác

const classes = `header ${ isLargeScreen() ? '' :
 `icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;
```

# Multi-line String

Để có nhiều dòng trong javascript string, trước ES6 có mấy cách làm như sau

```js
var multilineString =
    'The first line\n\
    A second line\n\
    Then a third line'

var multilineString =
    'The first line\n' +
    'A second line\n +
    'Then a third line'

var multilineString = [
    'The first line',
    'A second line',
    'Then a third line'
].join['\n']
```

Với ES6, đơn giản là mình gõ Enter như bình thường

```js
var multilineString =
`The first line
The second line
Then a third line`
```

Cực kỳ hữu ích khi cần phải chèn một đoạn HTML như sau

```js
var book = {
    title: 'Module ES6',
    excerpt: 'Here goes some properly sanitized HTML',
    tags: ['es6','template-literals','es6-in-depth']
}
var html = `<article>
    <header>
        <h1>${ book.title }</h1>
    </header>
    <section> ${ book.excerpt}</section>
    <footer>
<ul>
${
book.tags.map( tag => <code>
    <li> ${tag}</li>
</code>)
.join('\n')
}</ul>
</footer>
</article>`
```

# Tagged templates

Với một template literal như... 

```js
`Hello, ${ name }. I am ${ emotion } to meet you!`
```
...viết bằng tagged template

```js
    tag(['Hello,','. I am', 'to meet you!'], 'Maurice','thrilled')
```

Tagged template là một dạng **cao siêu** của template literal, tham số đầu tiên của nó là một mảng các string, các tham số sau đó, lần lượt được chèn vào giữa các phần tử của mảng.

`tag` ở đây có thể là một hàm tự mình viết luôn

```js
var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {
  var str0 = strings[0]; // "That "
  var str1 = strings[1]; // " is a "

  var ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  return `${str0}${personExp}${str1}${ageStr}`;
}

var output = myTag`That ${ person } is a ${ age }`;

console.log(output);
// That Mike is a youngster
```

[Tham khảo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)