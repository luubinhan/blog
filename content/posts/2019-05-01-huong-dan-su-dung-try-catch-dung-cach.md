---
slug: "/2019-05-01-huong-dan-su-dung-try-catch-dung-cach"
date: "2019-05-01"
title: "Sử dụng try...catch đúng cách"
desc: "Nhìn lại một cách cặn kẽ hơn cách chúng ta xử lý trường hợp lỗi trong javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


Tình huống khi bạn biết chắc nó sẽ có lỗi, nhưng là một lỗi có thể chấp nhận và bỏ qua, bạn sẽ viết nó thế này

```js
const defaultConfig = { foo: 'bar' };
let customConfig = {};
try {
  customConfig = require(path.resolve(process.cwd(), 'custom.config'));
} catch (error) {
  // không có custom config thì cũng ok mà.
}
const config = { ...defaultConfig, ...customConfig };
```

Nếu có `custom.config` file, chúng ta load nó, nếu ko thì cũng chẳng sao, chúng ta dùng giá trị mặc định.

Vậy đâu là vấn đề khi chúng ta sử dụng `catch` mà ko làm gì cả. Vấn đề là chúng ta catch **toàn bộ** error mặc dù chúng ta không hề biết là có một error nào khác có thể xuất hiện trong `try` hay ko

```js
// custom.config.js
const foo = 'bar';
foo = 'baz'; // TypeError: Assignment to constant variable.

module.exports = { foo };
```

Nếu file `custom.config` của chúng ta mắc lỗi `TypeError: Assignment to constant variable` như trên, đoạn code load config sẽ vẫn chạy với default config như đã biết, vì nó bỏ qua luôn khi có lỗi trong file `custom.config.js`. 

```diff
const defaultConfig = { foo: 'bar' };
 let customConfig = {};
 try {
   customConfig = require(path.resolve(process.cwd(), 'custom.config'));
 } catch (error) {
  // không có custom config thì cũng ok mà.
+  if (error.code !== 'MODULE_NOT_FOUND') throw error;
 }
 const config = { ...defaultConfig, ...customConfig };
```

Kiểm tra `error.code` để đảm bảo chỉ bỏ qua các lỗi mà chúng ta thật sự không quan tâm, tình huống này là `MODULE_NOT_FOUND`, và `throw` một error cho các trường hợp khác.

Có thể phân error ra làm 2 loại: **operational error** và **programmer error**. Operational error là các lỗi từ bên ngoài chương trình chúng ta viết, code chúng ta vẫn chạy, nhưng lỗi chúng ta ko kiểm soát được như gọi API bị fail. Programmer error là kiểu lỗi do chúng ta gây ra bên trong source, đọc [bài này để hiểu chi tiết hơn](https://www.joyent.com/node-js/production/design/errors)

Với kiểu operational error, chúng ta có những cách tiếp cận sau

- catch lại error và thực hiện lại thao tác đó lần nữa
- catch error mà ko làm gì cả, hoặc hiển thị một thông báo đến user
- Ko catch luôn, hoặc throw một custom error

Với lỗi với network request, chúng ta có thể dựa vào `error.code` trả về để lựa chọn thao tác tiếp theo muốn thực hiện.

```js
// notifications.js
import { fetchNew } from './notification-service';

try {
  const notifications = await fetchNew();
  // ...
} catch (error) {
  if (error.message.match(/Network Error/)) {
    Sentry.withScope((scope) => {
      scope.setLevel(Sentry.Severity.Info);
	    Sentry.captureException(error);
	  });
  } else {
    throw error;
  }
}
```

Ở ví dụ trên, chúng ta ko thông báo gì cả cho user mà log lại lỗi đó trong [Sentry](https://sentry.io/welcome/) (Sẵn tiện giới thiệu luôn, Sentry là một tool để lưu lại các lỗi nếu có xảy ra trên app, khá hữu ích nhé)

Nếu chúng ta có file `article-service.js` chứa function thực hiện request API, rải rác ở nhiều nơi khác trong source, sử dụng function này của `article-service.js`, chúng ta sẽ ko đặt catch error ở trong `article-service.js` mà đặt ở nơi đang sử dụng

```js
// article-service.js
import api from './api';

export async function list() {
	return api.list({ filter: { type: 'article' } })
}
```

```js
// article-listing.js
import { list } from './article-service';

// ...

try {
  const articles = await list();
  renderArticles(articles);
} catch(error) {
  Sentry.withScope((scope) => {
    scope.setLevel(Sentry.Severity.Warning);
	  Sentry.captureException(error);
  });
  // hiển thị thông báo
  // để user biết có lỗi chứ
  renderError(error);
}

```

Tóm lại, một điều quan trọng nhất cần nhớ sau bài này là **đừng bao giờ dùng try...catch mà bỏ trống phần catch**

<a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/try-catch-the-right-way/">try...catch: The Right Way</a>
