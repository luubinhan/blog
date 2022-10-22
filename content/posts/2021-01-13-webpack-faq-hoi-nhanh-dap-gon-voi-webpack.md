---
slug: "2021-01-13-webpack-faq-hoi-nhanh-dap-gon-voi-webpack"
date: "2021-01-13"
title: "Hỏi nhanh đáp gọn về webpack"
desc: "Chuyên mục hỏi nhanh - đáp gọn, nếu bạn chưa biết gì về webpack"
tags: ["webpack", "beginner", "medium", "hard"]
canonical_url: false
---

*🐸 Những module pattern nào webpack hỗ trợ?*

`common.js` và es6

🐸 Có được phép có nhiều entry point trong cùng 1 file config?*

Có

*🐸 Làm sao để tạo file config webpack tự động?*

`webpack-cli init`

*🐸 Loader trong webpack là gì?*

transform những module nào không phải là JS vào trong bundle

*🐸 Loader chạy sync hay async*

Cả hai

*🐸 Khác nhau giữa loader và plugin*

Loader dùng để pre-processing, plugin phức tạp hơn và nó can thiệp nhiều vào quá trình compile.

*🐸 Làm sao để tách một số data ra khỏi bundle thành một file riêng biệt, ví dụ như file css*

Sử dụng [ExtractTextWebpackPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin). Tất cả css sẽ không còn nằm inline trong file JS bundle, nó sẽ là một file riêng (style.css chẳng hạn)

*🐸 Hot module replacement là gì?*

Tính năng cho phép cập nhập module mà không cần reload

*🐸 parallel-webpack là gì và nó ảnh hưởng thế nào đến quá trình build*

[parallel-webpack](https://github.com/trivago/parallel-webpack) sẽ giúp config với nhiều entry point, cho phép webpack build parallel, nâng cao tốc độ build

*🐸 Mô tả một cách ngắn gọn long-term caching và làm sao sử dụng nó trong webpack?*

Browser sẽ cache static file bên dưới local để cải thiện tốc độ load, để đảm bảo nếu có bản build mới, trình duyệt biết và download file mới, tên  file thường được đặt như sau

```
app.js?build=1
app.js?build=2

// hoặc
app.js.2a6c1fee4b5b0d2c9285.js
app.js.70b594fe8b07bcedaa98.js
```

Để làm việc này, trong webpack chúng ta đặt config

```js
module.exports = {
    ...
    output: {
     filename: "[name].[hash].js"
    }
    ...
}
```

*🐸 Khác nhau giữa hash và chunkhash?*

[hash] tạo ra một id ngẫu nhiên cho từng lần build và sử dụng cho tất cả  chunk. Nếu thay [hash] bằng [chunkhash] nó sẽ tạo ra mỗi chunk một id ngẫu nhiên.

*🐸 Mô tả CommonsChunk Plugin?*

Là một tính năng có sẵn của webpack, cho phép tạo file riêng (gọi là chunk) cho những module dùng chung. Hỗ trợ caching và nâng cao tốc độ load

*🐸Diễn giải đoạn code bên dưới*

```js
new webpack.ContextReplacementPlugin(
     /moment[\/\\]locale/,
     /(en-gb|en-us)\.js/
)
```

Báo với webpack, chỉ include những file có tên khớp với điều kiện `/(en-gb|en-us)\.js/`, trong đường dẫn `/moment[\/\\]locale/` khi bundle

*🐸 Làm sao để remove những css selector không dùng đến?*

Dùng plugin [purifycss-webpack](https://github.com/webpack-contrib/purifycss-webpack)


