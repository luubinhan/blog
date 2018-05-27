---
path: "/2018-05-27-huong-dan-webpack-4-cho-nguoi-moi-bat-dau"
date: "2018-05-27T13:35:13.234Z"
title: "Hướng dẫn webpack 4 cho người mới bắt đầu - Phần 2"
desc: "Phần 2 trong series về webpack, mình sẽ nói về code slitting, loaders"
tags: ["javascript", "webpack"]
---

Trong Series này
1.  [Webpack là gì và tại sao ta phải xài nó](https://luubinhan.github.io/blog/2018-05-25-viet-code-javascript-tot-hon-voi-webpack)
2. [Dùng Loaders, code slitting trong webpack](https://luubinhan.github.io/blog/2018-05-27-huong-dan-webpack-4-cho-nguoi-moi-bat-dau)
3. [Plugins, Development](https://luubinhan.github.io/blog/2018-05-28-huong-dan-webpack-4-cho-nguoi-moi-bat-dau-phan-3)
4. Optimize - working on it

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

Tại sao chúng ta lại đi import CSS vào trong file js? Nếu bạn thời kỳ trước việc chèn hầm bà lằng kiểu này là cực kỳ bị lên án, nhưng bây giờ thời thế khác, một số lý do để trọn CSS vào trong js trong development

- Một component javascript sẽ có thể phụ thuộc vào CSS, images, SVG. Nếu được đóng gói thành 1 cục, chúng ta dễ mang nó sử dụng ở nơi khác hơn
- Nếu chúng ta không sử dụng component, đoạn css import trong component cũng sẽ không được import luôn, tránh những việc load css ở tất cả
- Trước đây nếu dùng OOP trong CSS, việc chỉnh sửa một đoạn css sẽ dễ bị side effect, ảnh hướng đến những chổ ta không mong muốn. CSS module để CSS chỉ hoạt động local thôi
- Giảm số lượng HTTP request xuống

### Image

Dùng `file-loader` để đọc file image. Với HTML chuẩn, image được sử dụng bằng 2 cách là dùng tag `img` hoặc thuộc tính `background-image`. Với Webpack, chúng ta có thể optimize cho trường hợp dung lượng image với kích thước nhỏ thành dạng `string` bên trong javascript luôn. Lúc này trình duyệt không cần load riêng file image nữa

Cài cái loader

```
nmp install --save-dev file-loader
```

webpack.config.js

```diff
 module.exports = {
    ...
    module: {
      rules: [
        ...
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           {
+             loader: 'file-loader'
+           }
+         ]
+       }
      ]
    }
  }
```

Trong lúc code chúng ta vẫn viết bình thường

```jsx
import codeURL from './code.png';

...
render() {
  return(
    <img src={codeURL} alt="" />
  )
}
...
```

Kết quả bundle

```html
<img src="data:image/png;base64,iVBO..." />
```

Có thể đọc thêm trên docs của `file-loader` để xem cách chỉnh kích thước nào thì chuyển nội dung ảnh thành data URI. File loader còn thể thể xử lý trên một số dạng file khác nữa, chứ không chỉ là hình thôi không.

## Code splitting

Trích từ trang chủ webpack

> Code splitting là một trong những tính năng hấp dẫn nhất của Webpack. Tính năng này cho phép bạn tách code ra thành nhiều file bundle để load khi cần thiết hoặc load xong xong. Cái này có thể dùng để giảm kích thước file bundle và kiểm soát được load resource hợp lý hơn, nếu sử dụng đúng cách, sẽ giảm đảng kể thời gian load trang

Trước giờ chúng ta chỉ setup để bundle ra 1 file duy nhất từ `src/index.js` ra file `dist/bundle.js`. Khi ứng dúng phình ra, chúng ta cần tách code ra thành nhiều file, toàn bộ code đầu cần phải load hết ngay từ đầu đâu nhỉ? Dùng [Code Slitting](https://webpack.js.org/guides/code-splitting/) và [Lazy Loading](https://webpack.js.org/guides/lazy-loading/) để chỉ load khi cần.

```diff
   const path = require('path')

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     app: './src/app.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    ...
  }
```

Với setup như thế này, nếu chúng ta có 2 file trong thư mục `src` là `app.js` và `chat.js`, webpack sẽ bundle ra 2 file `chat.bundle.js`, `app.bundle.js`

Bài sau nói tiếp plugins nhé, kết thúc với loaders ở đây

[Link bài gốc](https://www.sitepoint.com/beginners-guide-webpack-module-bundling/)
Tác giả: Mark Brown

Chỉnh sửa theo sự hiểu của mình một tí