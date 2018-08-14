---
slug: "/2018-06-24-huong-dan-lam-viec-voi-console-trong-javascript"
date: "2018-06-24"
title: "Làm việc với console trong javascript"
desc: "Một web developer chân chính là người biết sử dụng console.log :D. Tuy nhiên cũng nên biết rằng console nó còn rất nhiều phương thức khác nữa"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [console.log, console.error, console.warn và console.info](#consolelog-consoleerror-consolewarn-và-consoleinfo)
- [console.group](#consolegroup)
- [console.table](#consoletable)
- [console.count, console.time, console.timeEnd](#consolecount-consoletime-consoletimeend)
- [console.trace và console.assert](#consoletrace-và-consoleassert)
- [Xóa hết console](#xóa-hết-console)

<!-- /TOC -->

# console.log, console.error, console.warn và console.info

Đây là những phương thức được sử dụng nhiều nhất. Có thể truyền vào 1 hoặc nhiều parameter, mỗi parameter trường vào sẽ được hiển thị về kết quả ở dạng string và cách nhau bằng khoảng trắng, trong trường hợp là object hay array thì nó hiện thị dạng cây

![](https://cdn-images-1.medium.com/max/1600/1*1Zh9s1-XCx27o6FAKGb5Hg.png)

# console.group

Phương thức này cho phép nhóm các câu `console.log` vào trong một group có thể collapse. Syntax rất đơn giản, đặt các câu console.log  vào giữa cặp `console.group('ten-group')` và `console.groupEnd()`

```js
function doSomething(obj) {
  console.group('doSomething Proifle');
  const _data = new Date()
  console.log('evauating data: ', _data)
  const _fullName = `${obj.firstName} ${obj.lastName}`
  console.log('fullName: ', _fullName);
  const _id = Math.random(1);
  console.log('id: ', _id);
  console.groupEnd();
}

doSomething({firstName: 'An', 'lastName': 'Luu'})
```

Kết quả

![](https://cdn-images-1.medium.com/max/1600/1*PWOoWRhG9lWjhU4z6qFCOQ.png)

# console.table

Từ khi biết đến `console.table` cuộc đời tui bước sang trang mới! Hiển thị JSON bên trong console.log thì kinh dị lắm, với `console.table` sẽ hiển thị mảng dữ liệu trong table cực dể dòm

```js
const typeOfConsole = [
  {name: 'log', type: 'standard'},
  {name: 'info', type: 'standard'},
  {name: 'table', type: 'WOW'},
]

console.table(typeOfConsole);

const mySocial = {
  facebook: true,
  linkedIn: true,
  flickr: true,
  instagram: true,
  VKontaktebadoo: false
}

console.table(mySocial, ['Socials', 'I an account'])
```

Thế này thì sao

![](https://cdn-images-1.medium.com/max/1600/1*Fb2VQtATz3uCH2hw6yVB-w.png)

# console.count, console.time, console.timeEnd

Vũ khí cần thiết để debug, `console.count` trả về số lần và thời gian hàm `count()` đượcg gọi.

Truyền vào tên cho `console.time`, gọi `console.timeEnd` để dừng thời gian và hiển thị kết quả, đặt đoạn code cần đo thời gian chạy giữa 2 hàm này

```js
console.time('total');
console.time('init arr');
const arr = new Array(20);
console.timeEnd('init arr');

for (var i = 0; i < arr.length; i++) {
  arr[i] = new Object();
  const _type = (i % 2 === 0) ? 'even' : 'odd';
  console.count(_type + 'added');
}
console.timeEnd('total');
```

Kết quả

![](https://cdn-images-1.medium.com/max/1600/1*Fc8jI1oaCE57aB-baawGaw.png)

# console.trace và console.assert

Cả hai hàm này sẽ in ra một đoạn thông báo kèm với dòng code thứ mấy trong file. Tưởng tượng chúng ta tạo một thư viện js và muốn thông báo đến user lỗi xuất hiện ở đâu. Khác biệt của `console.assert` khác với `console.trace` là nó chỉ in kết quả nếu điều kiện để kiểm tra trả về `false`

```js
function lesserThan(a, b) {
  console.assert( a < b, {'message': 'a is not lesser than b',  'a': a, 'b': b});  
}
lesserThan(6, 5);
console.trace('End');
```
![](https://cdn-images-1.medium.com/max/1600/1*oeGhwHWJ0JALyKZMJq_inw.png)

# Xóa hết console

Nếu chúng đang sử dụng webpack, nếu muốn xóa hết toàn bộ các chổ có console trong lúc build production thì dễ ợt, dùng uglifyjs-webpack-plugin

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var debug = process.env.NODE_ENV !== "production";

.....
optimization: {
        minimizer: !debug ? [
            new UglifyJsPlugin({
                // Compression specific options
                uglifyOptions: {
                    // Eliminate comments
                    comments: false,
                    compress: {
                       // remove warnings
                       warnings: false,
                       // Drop console statements
                       drop_console: true
                    },
                }
           })] : []
}
```

Cảm ơn bạn đã đọc hết bài viết

[Link bài viết gốc của tác giả Riccardo Canella](https://medium.freecodecamp.org/how-you-can-improve-your-workflow-using-the-javascript-console-bdd7823a9472)