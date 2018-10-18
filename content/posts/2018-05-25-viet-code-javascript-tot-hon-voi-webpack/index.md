---
slug: "/2018-05-25-huong-dan-viet-code-javascript-tot-hon-voi-webpack"
date: "2018-05-25"
title: "Webpack là gì và tại sao ta phải xài nó"
desc: "Bài này sẽ nói rõ tại sao Webpack là sự lựa chọn sáng suốt cho bundle javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "webpack"]
---

# Trong Series này
1.  [Webpack là gì và tại sao ta phải xài nó](2018-05-25-viet-code-javascript-tot-hon-voi-webpack)
2. [Dùng Loaders, code slitting trong webpack](2018-05-27-huong-dan-webpack-4-cho-nguoi-moi-bat-dau)
3. [Plugins, Development Server](2018-05-28-huong-dan-webpack-4-cho-nguoi-moi-bat-dau-phan-3)

<!-- TOC -->

- [Trong Series này](#trong-series-này)
  - [Vấn đề](#vấn-đề)
    - [Cách tốt hơn](#cách-tốt-hơn)
  - [Webpack vs. Gulp](#webpack-vs-gulp)
  - [Viết code Module](#viết-code-module)
  - [Cấu hình Webpack](#cấu-hình-webpack)

<!-- /TOC -->

## Vấn đề

Viết code client-side nếu không có các công cụ hỗ trợ thì trước sau vì cũng giống như đống hỗn độn trên desktop, để maintain và người khác có thể vào đọc hiểu được thì việc code được tổ chức tốt là điều ai cũng biết, lý thuyết là thế, nhưng nếu cứ làm việc theo kiểu cũ cứ quăng script tràng lan bằng thẻ `<script>` sẽ chẳng dễ gì sắp xếp và nhớ nổi cái nào là cái nào nếu, add thêm cỡ chục files, *best practice* khuyên rằng hạn chế số lượng file script càng ít càng tốt, tốt nhất là 1 file duy nhất.

Trước đây có nhiều giải pháp cho vấn đề như là Gulp, dùng để bunch toàn bộ javascript thành 1 file. Nhưng chưa đủ. Với Gulp chúng ta đã đẩy các dependency ngang hàng nhau, và phụ thuộc vào biến global để chia sẽ dữ liệu giữa các files.

### Cách tốt hơn

Nếu trước đây chưa từng sử dụng mấy cái tool để quản lý asset ở frontend, tốt nhất là học luôn Webpack, bỏ qua Gulp, Gruntjs luôn. Còn nếu nếu đã từng dùng mấy task runner kiểu Gulp, Gruntjs, thì chuyển qua dùng webpack cũng không khó khăn lắm, chỉ là khác nhau cách tổ chức và quản lý dependency.

## Webpack vs. Gulp

Chắc đã từng nghe tới câu này: **Gulp là task runner, Webpack là module bundler**, ý nhĩa thật sự sau câu này là gì?

Gulp là công cụ tự động hóa tốt, cho phép chúng ta setup một mớ các tiến trình phức tạp cần thực hiện (một cách tự động) bằng javascript, rồi chạy nó bằng một lệnh duy nhất. Vấn đề với Gulp là nếu code file A depend vào code ở file B, bạn cần báo cáo với Gulp để nó include file A trước, và khi bạn thêm càng lúc càng nhiều file depend chồng chéo kiểu này, cây dependency là lớn dần, và sẽ gần như không thể maintain được nữa, vì chúng ta phải config bằng tay, nếu sử dụng file manifest với plugin `asset-builder` cũng không thể cứu vãn.

![](https://res.cloudinary.com/forestry-demo/image/fetch/c_limit,dpr_auto,f_auto,q_80,w_674/https://forestry.io/uploads/2018/03/webpack_fighter_of_the_gulpstack_champion_of_the_bundle.png)

Bài toán dependency này đã được Webpack giải quyết triệt để. Những gì bạn cần làm là báo với Webpack file **entry** point mình cần bundle là gì, chuyện bạn *import module* lúc code sẽ do webpack đảm nhiệm chuyện dựng lên dependency graph, webpack sẽ bundle cho bạn 1 file duy nhất bạn cần. Chúng ta khỏi phải báo cáo với webpack thứ tự các file nào cần trước hay sau, để đó Webpack lo!

Ngắn gọn là: với Gulp dependency bị giới hạn vì nó yêu cầu mình tự chỉ định sự phụ thuộc, Webpack thì nó dùng logic để tính toán rồi bundle đúng thứ tự.

## Viết code Module

Để Webpack hoạt động như phép màu như vậy, chúng ta chỉ cần viết javascript của mình dạng *module*. Viết module trong javascript là tách các file ra thành nhiều file, việc sử dụng code giữa các file sẽ thực hiện bằng **export** và **import**

Webpack hỗ trợ 2 chuẩn module hóa hiện giờ là **EcmaScript** và  **CommonJS**. Ví dụ bên dưới để hình dung cách viết module trong file `hello.js` rồi **import** vào trong file `app.js` bằng cả 2 kiểu viết EcmaScript và CommonJS

Viết kiểu **EcmaScript**

**hello.js**

```js
export function hello() {
    console.log('Hello Binh An!');
};
```

**app.js**

```js
import {hello} from './hello'
hello();
```

Viết kiểu **CommonJS**

**hello.js**

```js
module.exports = function() {
    console.log('Hello Bình An!');
}
```

**app.js**

```js
const hello = require('./hello');
hello();
```

## Cấu hình Webpack

Một điểm hay của webpack là nếu có ai đó đã config rồi thì những người sau không cần phải vào file config để hiểu cách tổ chức code, chỉ cần hiểu được cách tổ chức code của project.

Giờ thử config đơn giản nhất để hiểu một số thành phần quan trọng nhất của webpack

Tổ chức project như vầy

```basic
src/
    app.js
webpack.config.js
```

Mặt định Webpack sẽ tìm file config với tên là **webpack.config.js**. Tiếp chúng ta cần cài **webpack** và **webpack-cli**

```bash
npm init -y
npm install --save-dev webpack webpack-cli
```

Trong file **webpack.config.js**

```js
var path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
```

2 phần quan trọng nhất mà phải biết là **entry** - file source nằm ở đâu và **output** - file sẽ bundle ở đâu. Sử dụng module `path` để biết vị trí thực tế lúc chạy.

Chạy CLI để bundle

```bash
./node_modules/webpack-cli/bin/webpack.js
```

Nó sẽ đọc source trong file `src/app.js` rồi compile vào `dist/bundle.js`. Thư mục sau khi chạy xong sẽ có

```basic
dist/
    bundle.js
src/
    app.js
package.json
webpack.config.js
```

Để rút chạy đoạn CLI dài ngoằn `./node_modules/webpack-cli/bin/webpack.js` có thể thêm một custom script trong file **package.json**. Bạn có thể chạy nó bằng `npm run SCRIPT_NAME`

Thêm vào trong **package.json**

```json
{    
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "./node_modules/webpack-cli/bin/webpack.js",
        "watch": "./node_modules/webpack-cli/bin/webpack.js --watch"
    },
}
```

Giờ chúng ta có thể chạy bằng lệnh `npm run build`, ở trên chúng ta cũng vừa thêm đoạn `npm run watch`, thêm option `--watch` để khi có bất kỳ thay đổi nào nó sẽ tự động detect và compile lại.

!!!! CUNG HỶ !!!!!

Bạn đã chạm được vào cánh cửa đầu tiên của webpack, webpack còn nhiều khả năng nữa, tuy nhiên module bundle là core feature, bài tiếp theo chúng ta sẽ khám phá nhiều hơn như loaders, plugins, development server.

[Tìm hiểu thêm về import và export](2017-10-18-import-va-export-trong-javascript)


[Link bài gốc](https://forestry.io/blog/write-better-javascript-with-webpack/)

Tác giả: DJ Walker