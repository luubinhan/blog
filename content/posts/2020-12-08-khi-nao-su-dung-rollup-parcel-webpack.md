---
slug: "2020-12-08-rollup-parcel-webpack"
date: "2020-12-08"
title: "Ghi chú về 3 module bundler rollup, parcel, webpack"
desc: ""
tags: ["hoc-thuat", "web", "javascript"]
canonical_url: false
---

>  **bundler** của JS là công cụ dùng để đưa tất cả file đã `import` vào thành 1 file duy nhất. Nó còn có thể *minify` kết quả cuối cùng nếu bạn muốn.

JS bundler có 3 *ông lớn* ở thời điểm hiện tại

- Parcel
- Rollup
- Webpack

### Đánh giá trên việc config có dễ hay không

Parcel số 1, gần như không phải làm gì

Webpack và Rollup yêu cầu phải có file config riêng.

Rollup có sẵn polyfill cho `import/export`, webpack chưa có

Rollup hỗ trợ relative path, webpack phải dùng `path.resolve` hoặc `path.join`

Config webpack phức tạp nhất, được cái hỗ trợ nhiều third-party

### Loại bỏ code không sử dụng

Loại bỏ code không sử dụng, còn gọi dead code, Tree shaking rất cần thiết để nâng cao hiệu năng.

Parcel vẫn là số 1. Hỗ trợ tree-shaking cả ES6 và CommonJS

Rollup đứng thứ 2.

Webpack thì phải thủ công config để có tree-shaking.

Rollup và webpack tập trung tree-shaking với ES6.

### Code splitting

Webpack số 1, đúng kiểu làm ít hưởng nhiều. Có 3 lựa chọn

- Sử dụng config entry
- Sử dụng plugin CommonsChunkPlugin
- Dynamic import

Rollup và Parcel hỗ trợ splitting ngay từ đầu, nhưng đang vướng nhiều issue bị report.

Webpack vẫn là lựa chọn hàng đầu.

### Live reload

Parcel gặp một số vấn đề với HTTP logging, Hooks và middleware

Rollup phải cài thêm `rollup-plugin-serve`, `rollup-plugin-livereload` chứ không có sẵn.

Webpack cài thêm `webpack-dev-server`.

Khả năng tùy chỉnh của webpack sẽ cao hơn Rollup và Parcel.

### Module transform

Các bundler chỉ hỗ trợ file JS, với các file khác chúng ta cần thêm plugin

![](https://miro.medium.com/max/300/1*fQYPJhmQuHA93GWcChKBTw.png)

Parcel hỗ trợ sẵn tất cả những kiểu file quen thuộc, không cần đụng đến config. Không những vậy, khi gặp các file config `.babelrc`, `.postcssrc`, `.posthtml` nó sẽ tự handle

Webpack và Rollup cần thêm plugin và config mới có transform và transpiler.

## Kết

- Nhanh gọn lẹ, app đơn giản, chọn Parcel
- Làm thư viện, hạn chế third-party, dùng Rollup
- App phức tạp, nhiều third-party, dùng webpack.



Ghi chú từ [Rollup vs. Parcel vs. webpack: Which Is the Best Bundler?](https://medium.com/better-programming/the-battle-of-bundlers-6333a4e3eda9)
