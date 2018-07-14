---
path: "/2017-10-18-import-va-export-trong-javascript"
date: "2017-10-18T13:35:13.234Z"
title: "Import và Export trong Javascript"
desc: "Bàn về các kiểu import và export module trong javscript"
tags: ["javascript", "webpack"]
---

Một **giá trị**, **hàm**, **object** có thể được `export` từ một file này và dùng câu lệnh `import` để sử dụng bên trong file khác.

# Export

## Cú pháp

```js
export {name1, name2, name3,..., nameN}

// export su dung alias
export {name1 as differentName1, name2 as differentName2}

// export mot khai bao bien so hoac hang so
export let name1, const name2, var name3
export let name1 = 10, const name2 = 20, var name3 = 30

// export mot class hoac function
export default expression;
export default function(...) { ... }
export default function name1(...) {...}
```

## Giải thích 

Có 2 kiểu `export`

1. Export 1 function đã được được khai báo hoặc một giá trị: export có định danh

```js
// exports a function declared earlier
export { myFunction }; 

// exports a constant
export const foo = Math.sqrt(2);
```

2. Default Export cho một hàm hoặc class

```js
export default function() {}

export default class {}
```

Khi export có định danh thì khi import cũng phải gọi đúng tên đã export, trong khi sử dụng default export thì khi import đặt tên là gì cũng được.

```js
export default k = 12; // test.js

import m from './test' 
console.log(m);        // log 12
```

Trên một file chỉ có thể có một default export, câu lệnh sau không phải là default export

```js
export * from ...;
```

# Import

## Cú pháp

```js
import defaultExport from "module-name";
import * as name from "module-name";

import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

## Giải thích

Module export có tên quá dài, có thể đặt alias trong câu `import`

```js
import {reallyReallyLongModuleExportName as shortName} from '/modules/my-module.js';
```

Import tất cả các giá trị, hàm, object,... đã export trong một file khác

```js
import * as myModule from 'another.file'
```

Import chỉ định một số hàm, object, giá trị trong file

```js
import {funcA, objB, constC} from 'another.file'
```