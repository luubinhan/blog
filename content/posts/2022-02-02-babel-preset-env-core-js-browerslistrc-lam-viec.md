---
slug: "2022-02-02-babel-preset-env-core-js-browerslistrc-lam-viec"
date: "2022-02-02"
title: "Cách mà babel preset-env, core-js, browserslistrc làm việc với nhau"
desc: ""
tags: ["javascript", "beginner", "hoc-thuat"]
---

## Thiết đặt babel

Với input là code js với các syntax mới, babel sẽ *transform* thành code mà trình duyệt có thể hiểu được.

Chúng ta sẽ cần các gói babel cần thiết

```bash
npm i @babel/core @babel/preset-env @babel/cli --save-dev
```

Bên trong file config của babel, `babel.config.json` chúng ta sẽ tìm thấy phần thiết đặt `preset-env`

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

**@babel/preset-env** là một bộ các plugin của babel để nó có thể **transform** các syntax mới, **tùy theo trình duyệt mà chúng ta chỉ định**

Trình duyệt được chỉ định có thể set trong file `babel.config.json` hoặc dùng một file riêng `.browserslistrc`, hoặc trong `package.json`

Dùng file package.json
```json
"browserslist": [
    "defaults",
    "not IE 11",
    "maintained node versions"
]
```

Dùng file .browserslistrc
```
defaults
not IE 11
maintained node versions
```

Ví dụ với đoạn code như sau

```js
const obj = {
  arr: [1, 2, 3, 4],
  printArr() {
    console.log(...this.arr);
  }
};

obj.printArr();
```

Sau khi transform với thiết đặt browser là IE11, chúng ta sẽ có

```js
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var obj = {
  arr: [1, 2, 3, 4],
  printArr: function printArr() {
    var _console;

    (_console = console).log.apply(_console, _toConsumableArray(this.arr));
  }
};
obj.printArr();
```

Babel đã cố gắng hết sức, tuy nhiên `printArr` là kiểu **array-like (na ná array)** chứ không thực sự là một **array**

Các trình duyệt cũ sẽ không chạy được kiểu *na ná* array như vậy.

Đây là lúc **core-js** phát huy tác dụng

**core-js là tập hợp các polyfill** cho các tính năng chưa được trình duyệt cập nhập.

Cài đặt

```bash
npm i core-js
```

Sau đó import vào file dùng bootstrap như `src/index.js`

```js
import "core-js";

const obj = {
  arr: [1, 2, 3, 4],
  printArr() {
    console.log(...this.arr);
  }
};

obj.printArr();
```

Bổ sung config cho babel để dùng core-js trong lúc transform `babel.config.json`

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": 3
      }
    ]
  ]
}
```

Kết quả chúng ta sẽ nhận được

```js
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.async-iterator");
require("core-js/modules/es.symbol.has-instance");
require("core-js/modules/es.symbol.is-concat-spreadable");
require("core-js/modules/es.symbol.iterator");
require("core-js/modules/es.symbol.match");
require("core-js/modules/es.symbol.replace");
require("core-js/modules/es.symbol.search");
require("core-js/modules/es.symbol.species");
//...
```

Khi import một file core-js, chúng ta sẽ có được tất cả những polyfill cần thiết cho trình duyệt đã chỉ định.

Tạm kết, sử dụng những CLI như `create-react=app` hay Vue CLI, mọi thứ đã được config sẵn, tuy nhiên biết cơ chế và cách làm thủ công là cần thiết, chắc chắn sẽ có lúc chúng ta cần dùng.

[How babel preset-env, core-js, and browserslistrc work together](https://www.valentinog.com/blog/preset-env/)