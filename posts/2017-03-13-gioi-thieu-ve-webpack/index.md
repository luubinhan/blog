---
path: "/2017-03-13-gioi-thieu-ve-webpack"
date: "2017-03-13T13:35:13.234Z"
title: "Giới thiệu về Webpack"
desc: "Ở thời điểm hiện tại webpack đang là module bundler phổ biến nhất, khi mới tiếp cận với nó sẽ thấy hơi khó vì nó không giống như Gulp, file config khá phức tạp, nếu chỉ copy paste mà không hiểu cách thức hoạt động của nó thì khó mà thuần thuật và giải quyết khi phát sinh lỗi."
tags: ["javascript","react","webpack"]
---

<!-- MarkdownTOC -->

- Webpack là gì?
- Túm lại nếu bạn đang gặp những vấn đề sau:
- Loaders

<!-- /MarkdownTOC -->

# Webpack là gì?

Lúc đầu Webpack được phát triển như một module bundler cho JavaScript, sau này nó phát triển lên như một trình quản lý toàn bộ front-end code

```html
<script src="js/jquery.js"></script>
<script src="js/menu-widget.js"></script>
<script src="js/menu-widget--fancy-button.js"></script>
<script src="js/ad-widget.js"></script>
<script src="js/loading-bar.js"></script>
<script src="js/loading-bar.fancy.theme.js"></script>
<script src="js/social.sdk.js"></script>
<script src="js/analytics.js"></script>
<script src="js/analytics.seo.js"></script>
<script src="js/main.js"></script>
```

Đoạn code trên khá quen, lý do cách làm cũ này không tốt

1. Load quá nhiều JS, gởi nhiều network request -> Thời gian tải trang chậm hơn
2. Nhiều thư viện phụ thuộc ngầm. menu-widget-fancy-button phụ thuộc menu-widget, menu-widget phụ thuộc jquery -> menu-widget-fancy-button phụ thuộc jquery. loading-bar có phụ thuộc thư viện nào không?
3. main.js tuyệt đối phải để dưới cùng
4. mọi thứ đều global

Bằng cách combine toàn bộ js lại vào một file có thể giải quyết vấn đề số (1)

```js
module.exports = {
    entry: [
      'js/jquery.js',
      'js/menu-widget.js',
      'js/menu-widget--fancy-button.js',
      'js/ad-widget.js',
      'js/loading-bar.js',
      'js/loading-bar.fancy.theme.js',
      'js/social.sdk.js',
      'js/analytics.js',
      'js/analytics.seo.js',
      'js/main.js'
    ]
    output: {
        path: './dist',
        filename: 'output.js'
    }
}
```

Gulp/Grunt cũng có thể sử lý những tác vụ `preprocess` và `transpile`, compile tất cả input source. Nhưng khi dự án phình ra, Gulp mắc phải vấn đề với bởi cách vận hành case-by-case

![mô tả cách chạy của Gulp](https://cdn-images-1.medium.com/max/800/1*yBt2rFj2DbckFliGE0LEyg.png)

Hình trên mô tả cách chạy của Gulp, còn hình dưới là cách chạy của Webpack

![cách chạy của Webpack](https://cdn-images-1.medium.com/max/800/1*TOFfoH0cXTc8G3Y_F6j3Jg.png)

 
# Túm lại nếu bạn đang gặp những vấn đề sau:

1. Rắc rối với việc load dependencies đúng thứ tự
2. Phải include những đoạn css, js không dùng đến trên production
3. Vô tình load trùng một thư viện nào đó
4. Gặp issue với vấn đề `scoping` trong css và javascript
5. Webpack cho phép sử dụng `require` hay `import` (ES6). 

```js
var string = 'Hello!'
alert(string)
```

Nếu câu "Hello!" là một đoạn code dài loằn ngoằn, chúng ta sẽ tách nó ra 2 file

`string.js`

```js
window.string = 'asuperreallylongstring'
```

`main.js`

```js
alert(window.string)
```

`include` cả 2 file này vào

```js
<script src="js/string.js"></script>
<script src="js/main.js"></script>
```

Thay vì `include` theo cách thông thường bằng HTML như vậy, ta sẽ viết bằng `require` trong file js

`string.js`

```js
module.exports = 'asuperreallylongstring'
```

`main.js`

```js
var string = require('./string.js')
alert(string)
```

Như vậy chỉ còn cần `include` mỗi file `main.js` vào trong html

Change lại file config vì bây giờ file nào phụ thuộc file nào được định nghĩa bằng `require` như vậy ta không cần `compile` tất cả file vào 1 file nữa, mỗi thứ cứ để webpack lo

```js
module.exports = {
    entry: 'js/main.js',
    output: {
        path: './dist',
        filename: 'output.js'
    }
}
```

# Loaders

Trong file `loading-bar.js`, có đoạn code giả vụ sau

```js
var $ = require('./js/jquery')

$(function () {
    $('.loading-bar').html('<img src="/assets/loading-bar.png" />')
})
```

Đã có file loading-bar.png trong đúng thư mục `assets` trên server, vấn đề là viết kiểu này thì loading-bar.png đang là dạng implicit dependency, phải viết lại

```js
var $ = require('./js/jquery')
var image = require('./assets/loading-bar.png')

$(function () {
    $('.loading-bar').html('<img src="' + image + '" />')
})
```

Thêm dấu chấm (.) để webpack hiểu là chúng ta muốn load một resource nằm relative với file đang mở.

Mặc định webpack sẽ không đọc được những file khác ngoài file text thông thường, khi đó sẽ cần đến những loader, có thể xem như những plugin khi cần đến thì ta khai báo thêm vào.

```js
module.exports = {
    entry: 'loading-bar.js',
    output: {
        path: './dist/',
        filename: 'output.js'
    },
    module: {
        loaders: [{
            test: /\.png$/,
            loader: 'url-loader'
        }]
    }
}
```

Diễn giải đoạn config ở trên: với file có kiểu dạng .png, thì sử dùng loader là url-loader để thực thi.

Tương tự với CSS framework, sẽ bao gồm css, image, font, js

```js
module.exports = {
  entry: 'loading-bar.js',
  output: {
    path: './dist/',
    filename: 'output.js'
  },
  module: {
    loaders: [{
      test: /\.png$/,
      loader: 'url'
    },{
      test: /\.js$/,
      loader: 'babel-loader'
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.(ttf|svg|woff)$/,
      loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
    }]
  }
}
```

Trên file css ta không chỉ báo sử dụng một loader, mà đến 2 loader, mỗi loader phân cách bằng `!`

```js
loader: 'style-loader!css-loader'
```

css-loader sẽ được sử dụng trước sau đó là style-loader, theo chiều từ phải qua trái. Tại sao? với css cần làm 2 chuyện một là load nó bằng css-loader để chuyển nó thành một dạng dữ liệu mà javascript có thể hiểu, thứ 2, style-loader để chèn css đó vào trong DOM

Còn một vấn đề nữa, khi dùng loader là data-url lúc này image sẽ được hiểu thành `DATA-URL`, mạng dạng string

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
```

Khi ảnh có kích thước lớn, thì việc nhúng hẳn một tấm ảnh dạng string thế này vào javascript không phải là cách tốt, với những asset khác, lưu nó vào một vị trí khác trên server là load về bằng file-loader.

Nếu muốn tiếp tục nghiên cứu

https://webpack.js.org/configuration/Docs
https://github.com/petehunt/webpack-howto
https://github.com/webpack/webpack/tree/master/