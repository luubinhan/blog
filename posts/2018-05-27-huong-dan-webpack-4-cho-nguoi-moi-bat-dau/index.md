---
path: "/2018-05-27-huong-dan-webpack-4-cho-nguoi-moi-bat-dau"
date: "2018-05-27T13:35:13.234Z"
title: "Webpack là gì và tại sao ta phải xài nó"
desc: "Bài này sẽ nói rõ tại sao Webpack là sự lựa chọn sáng suốt cho bundle javascript"
tags: ["javascript", "webpack"]
---

Trong Series này
1.  [Webpack là gì và tại sao ta phải xài nó](https://luubinhan.github.io/blog/2018-05-25-viet-code-javascript-tot-hon-voi-webpack)
2. [Dùng Loaders, plugins trong webpack](https://luubinhan.github.io/blog/2018-05-27-huong-dan-webpack-4-cho-nguoi-moi-bat-dau)

Chúng ta mở lại file package.json, sửa lại chút

```diff
{
    ...
    "scripts": {
+     "develop": "webpack --mode development --watch",
+     "build": "webpack --mode production"
    },
    ...
}
```

Với cách setup này, chỉ cần chạy `npm run develop` chúng ta sẽ chạy webpack ở development mode và bật tính năng detect thay đổi để chạy lại.

Khi chạy `npm run build` chúng ta sẽ chạy webpack ở mode production, khi chạy ở mode này code sẽ được minified lại bằng Uglify JS, size nhỏ hơn khi chạy dev mode.

## Loaders

Loaders là gì? loaders là những thư viện sẽ can thiệp trước lúc chúng ta import file, nó cho phép webpack mở rộng khả năng không chỉ còn là bundle javascript thôi, mà cả những static resource khác, như css, image, svg, ...

### Babel Loader

Thời điểm hiện tại chắc ai cũng viết JS kiểu mới, để transpile cái ES6 mà ta viết, chúng ta sẽ cần `babel-loader`

```
npm install --save-dev babel-loader  @babel/core @babel/preset-env
```

Mở lại file webpack.config.js

```diff
const path = require('path')

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.js$/,
+         exclude: /(node_modules|bower_components)/,
+         use: {
+           loader: 'babel-loader',
+         }
+       }
+     ]
+   }
  }
```

Để cấu hình cách transpile của babel, chúng ta add thêm file `.babelrc` vào cùng thư mục với webpack.config.js

```json
{
  "presets": [
    ["@babel/env", {
      "modules": false
    }]
  ],
  "plugins": ["syntax-dynamic-import"]
}
```

Đoạn trên chúng ta đang cấu hình để khi Babel transpile, nó không đổi câu `import` và `export` về ES5 và cho phép import linh động, sẽ nói đến trong phần slitting code

Giờ thì cứ vô tư viết ES6 nhé, vì khi bundle webpack sẽ transpile code của chúng về thành ES5

## SASS Loader

Trước tiên cài một số package để làm việc với SASS

```
npm install --save-dev style-loader css-loader sass-loader node-sass
```

File webpack.config.js

```diff
 module.exports = {
    ...
    module: {
      rules: [
        ...
+       {
+         test: /\.scss$/,
+         use: [{
+           loader: 'style-loader'
+         }, {
+           loader: 'css-loader'
+         }, {
+           loader: 'sass-loader'
+         }]
+       }
      ]
    }
  }
```

Mấy cái loader này sẽ được thực hiện theo thứ tự

- `sass-loader` transforms Sass thành CSS.
- `css-loader` parses CSS vào JavaScript và resolve dependencies.
- `style-loader` chèn CSS vào bên trong thẻ <style>

Có thể hình dung nó như một function với callback là một function khác

```
styleLoader(cssLoader(sassLoader("source")))
```

Sau khi cấu hình như vậy chúng ta có thể import file  `.scss` bên trong file javascript

```diff
import { groupBy } from 'lodash-es'
import people from './people'

+ import './style.scss'

  ...
```

Tại sao chúng ta lại đi import CSS vào trong file js? Nếu bạn thời kỳ trước việc chèn hầm bà lằng kiểu này là cực kỳ bị lên án, nhưng bây giờ thời thế khác, một số lý do

- 


[Link bài gốc](https://www.sitepoint.com/beginners-guide-webpack-module-bundling/)