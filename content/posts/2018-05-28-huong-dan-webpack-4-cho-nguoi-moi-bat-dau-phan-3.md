---
slug: "/2018-05-28-huong-dan-webpack-4-cho-nguoi-moi-bat-dau-phan-3"
date: "2018-05-28"
title: "Hướng dẫn webpack 4 cho người mới bắt đầu - Phần 3"
desc: "Bài này sẽ nói Plugins, Development, HotModuleReplacement trong Webpack"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "webpack"]
---

Trong Series này
1. [Webpack là gì và tại sao ta phải xài nó](2018-05-25-viet-code-javascript-tot-hon-voi-webpack)
2. [Dùng Loaders, code slitting trong webpack](2018-05-27-huong-dan-webpack-4-cho-nguoi-moi-bat-dau)
3. [Plugins, Development Server](2018-05-28-huong-dan-webpack-4-cho-nguoi-moi-bat-dau-phan-3)

<!-- TOC -->

- [Tách CSS](#tách-css)
- [Cập nhập HTML tự động](#cập-nhập-html-tự-động)
- [Development Server](#development-server)
- [HotModuleReplacement](#hotmodulereplacement)

<!-- /TOC -->

Trong khi loader sẽ tiến hành transform từng file một, **plugins** sẽ tiến hành xử lý trong từng đoạn code

Giờ chúng ta đã biết cách  bundle code, cài thêm các module bổ sung cho webpack, cách thêm các static asset, file bundle chúng ta sẽ bự dần bự dần - không sớm thì muộn thôi. Plugins sẽ giúp chúng ta tách phần code một cách thông mình hơn, optimize hơn cho production

Thật ra ma nói, khi sử dụng `mode` development/production trong webpack chúng ta đã sử dụng rất nhiều plugin mặc định trong webpack

*develoment*
- lúc này giá trị biến `process.env.NODE_ENV` sẽ bằng 'development'
- dùng NamedModulesPlugin

*production*
- `process.env.NODE_ENV` sẽ bằng 'production'
- UglifyJsPlugin
- ModuleConcatenationPlugin
- NoEmitOnErrorsPlugin

Trước khi thêm một số plugin khác, chúng ta sẽ tách file config ra thành 2, để sau này chúng ta apply các plugin khác nhau cho các mode chạy khác nhau

```diff
- webpack.config.js
+ webpack.common.js
+ webpack.dev.js
+ webpack.prod.js
```

Cài thêm plugin là `webpack-merge` để trộn file *webpack.common.js* với một trong 2 file webpack.dev.js hoặc webpack.prod.js

```bash
npm install --save-dev webpack-merge
```

**webpack.dev.js**

```js
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development'
})
```

**webpack.prod.js**

```js
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production'
})
```

**package.json**

```diff
  "scripts": {
-    "develop": "webpack --watch --mode development",
-    "build": "webpack --mode production"
+    "develop": "webpack --watch --config webpack.dev.js",
+    "build": "webpack --config webpack.prod.js"
   },
```

## Tách CSS

Chúng ta sẽ tách ra CSS khi chạy production bằng plugin là `ExtractTextWebpackPlugin`

```bash
npm install --save-dev extract-text-webpack-plugin
```

Setup loader cho file .scss giữ nguyên cho development mode, chỉ thêm ExtractTextWebpackPlugin cho production

**webpack.common.js**

```diff
 ...
  module.exports = {
    ...
    module: {
      rules: [
        ...
-       {
-         test: /\.scss$/,
-         use: [
-           {
-             loader: 'style-loader'
-           }, {
-             loader: 'css-loader'
-           }, {
-             loader: 'sass-loader'
-           }
-         ]
-       },
        ...
      ]
    }
  }
```

**webpack.dev.js**

```diff
const merge = require('webpack-merge')
  const common = require('./webpack.common.js')

  module.exports = merge(common, {
    mode: 'development',
+   module: {
+     rules: [
+       {
+         test: /\.scss$/,
+         use: [
+           {
+             loader: 'style-loader'
+           }, {
+             loader: 'css-loader'
+           }, {
+             loader: 'sass-loader'
+           }
+         ]
+       }
+     ]
+   }
  })

```

**webpack.prod.js**

```diff
  const merge = require('webpack-merge')
+ const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const common = require('./webpack.common.js')

  module.exports = merge(common, {
    mode: 'production',
+   module: {
+     rules: [
+       {
+         test: /\.scss$/,
+         use: ExtractTextPlugin.extract({
+           fallback: 'style-loader',
+           use: ['css-loader', 'sass-loader']
+         })
+       }
+     ]
+   },
+   plugins: [
+     new ExtractTextPlugin('style.css')
+   ]
  })

```

Nếu chạy `npm run build`, chúng ta có 3 file

- chat.bundle.js
- app.bundle.js
- style.css

## Cập nhập HTML tự động

Mỗi lần thay đổi chúng ta cứ phải tự tay chỉnh sửa file `index.html` thì hơi lười. Dùng `html-webpack-plugin` để tự động hóa quá trình này, đồng thời cần thêm `clean-webpack-plugin` để clear hết thư mục `dist`

```bash
npm instal --save-dev html-webpack-plugin clean-webpack-plugin
```

**webpack.common.js**

```diff
const path = require('path')
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    ...
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'My killer app'
+     })
+   ]
  }
```

Giờ mỗi lần build, chúng ta xóa hết thư mục dist luôn

## Development Server

Với `webpack-dev-server` cung cấp cho chúng ta một web server đơn giản với tính năng live reload rất rất là hữu ích luôn mấy man

```bash
npm install --save-dev webpack-dev-server
```

**package.json**

```diff
  {
    ...
    "scripts": {
-     "develop": "webpack --watch --config webpack.dev.js",
+     "develop": "webpack-dev-server --config webpack.dev.js",
    }
    ...
  }

```

Giờ mà chạy `npm run develop` chúng ta sẽ có ngay server http://localhost:8080/

## HotModuleReplacement

Plugin `HotModuleReplacement` sẽ nhỉnh hơn Live Reload một chút, thay vì live reload trình duyệt sẽ tự động refresh, chúng ta sẽ thấy nó load lại toàn bộ trang khi có thay đổi, còn HotModuleReplacement là nó swap nguyên cái module trong lúc đang chạy mà không cần refresh luôn. Nhanh như cái chớp mắt vậy. Nếu mà cấu hình đúng, chúng ta tiết kiệm được khối thời gian ngồi đợi load lại trang.

**webpack.dev.js**

```diff
+ const webpack = require('webpack')
  const merge = require('webpack-merge')
  const common = require('./webpack.common.js')

  module.exports = merge(common, {
    mode: 'development',
+   devServer: {
+     hot: true
+   },
+   plugins: [
+     new webpack.HotModuleReplacementPlugin()
+   ],
    ...
  }
```

Cho phép swap module trong app

**src/app.js**

```diff
+ if (module.hot) {
+   module.hot.accept()
+ }

  ...
```

`module.hot` sẽ có giá trị là `true` trong mode development và `false` trong production.

[Link bài gốc](https://www.sitepoint.com/beginners-guide-webpack-module-bundling/)
Tác giả: Mark Brown

Chỉnh sửa theo sự hiểu của mình một tí