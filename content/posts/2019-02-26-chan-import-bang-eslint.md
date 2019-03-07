---
slug: "/2019-02-26-chan-import-bang-eslint"
date: "2019-02-26"
title: "Không cho phép import với ESlint"
desc: "Với ESlint chúng ta có thể cấm import những thư viện lớn, tránh để bà con trong team import tá lả."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


Sử dụng rule `no-restricted-imports`

Ví dụ chúng ta nghiêm cấm import *moment.js*, một thư viện khiến cục bundle của chúng ta phình to. Nếu được các bạn nên cân nhắc sử dụng [date-fns](https://date-fns.org/) hoặc [Luxon](https://moment.github.io/luxon/)

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "paths":  [{
        "name": "moment",
        "message": "Sử dụng date-fns hoặc Luxon đi cưng à"
      }]
    }]
  }
}
```

Khi *bọn nó* cố ý import sẽ nhận được cảnh báo

```js
import moment from 'moment';
```

Ví dụ khác, chặn ko cho import **lodash**, khuyến cáo dùng [lodash-es](https://www.npmjs.com/package/lodash-es)

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "name": "lodash",
      "message": "Use lodash-es instead!",
    }],
  }
}
```

Có thể dùng message mặc định, truyền vào một mảng các thư viện bị cấm

```json
{
  "rules": {
    "no-restricted-imports": ["error", "underscore", "bluebird"]
  }
}
```

Trong trường hợp phức tạp hơn,  chúng ta có thể chặn tất cả những module nào khớp với pattern `legacy/*`, kiểu như `import helpers from 'legacy/helpers'` là cấm

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
        "patterns": ["legacy/*"]
    }],
  }
}
```



<a target="_blank" rel="noopener noreferrer" href="https://addyosmani.com/blog/disallow-imports/">Disallow large imports from JavaScript projects</a>