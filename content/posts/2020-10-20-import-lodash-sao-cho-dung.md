---
slug: '2020-10-20-import-lodash-sao-cho-dung'
date: '2020-10-20'
title: 'Import lodash như thế nào mới đúng'
desc: 'Nếu cần xài lodash, thì bạn xài nó sao cho hiệu quả'
tags: ['dam-dao', 'hoc-thuat']
canonical_url: false
---

Mình đã từng nghe một bạn Principle FE trong công ty phát biểu là

> Đã 2020 rồi mà còn xài lodash là sao, lodash đã tối cổ, chả ai xài nữa đâu

Khoan bàn chuyện đúng sai trong phát biểu này, nếu bạn cũng như mình, vẫn đang dùng `lodash` thì bạn cần biết `import` nó như thế nào cho đúng

**Tại sao cần làm đúng? Vì nếu làm sao vô tình bạn sẽ làm phình cục bundle lên gấp mấy chục lần**

Giờ so sánh 3 cách `import`

## Cách 1

```js
import _ from 'lodash';
```

Tại sao lại chọn kiểu này? Không cần quan tâm đến user, cảm giác rất quyền lực như có găng tay vô cực, chỉ với `_.` chúng ta có tất cả mọi thứ.

Điểm yếu, đây là cách tuyệt đối nghiêm cấm, vì gần như là load nguyên cái thư viện

![the best way to import lodash](https://cdn2.hubspot.net/hubfs/208250/Blog_Images/lodash2.png)

Tổng 190 KB, Lodash ngốn hết 72.5kb

## Cách 2

```js
import { map, each, get, set } from lodash;
```

Kiểu này ổn, dễ đọc, rất rõ ràng để thấy được những hàm nào cần sử dụng.

Tuy nhiên, nó lại không khác gì với cách 1. Tổng vẫn là 190kb

## Cách 3

```js
import map from 'lodash/map';
import each from 'lodash/each';
import get from 'lodash/get';
import set from 'lodash/set';
```

Kết quả cho thấy đây là cách tiết kiệm nhất, mặc dù thực tế sử dụng cho thấy cách này hơi tốn công anh em dev của chúng ta và nhìn đoạn import có vẻ dài.

![benchmarking lodash import](https://cdn2.hubspot.net/hubfs/208250/Blog_Images/lodash3.png)

Một số ý kiến cho là dùng [lodash-es](https://www.npmjs.com/package/lodash-es), một phiên bản theo kiểu ES module sẽ tiết kiệm hơn, đây là kết quả đo được

1. Cách 1: 256.4 KB
2. Cách 1: 256.54 KB
3. Cách 1: 142.39 KB

Như vậy việc dùng `lodash-es` có vẻ là vô dụng

## Dùng lodash babel plugin

Sử dụng [lodash babel plugin](https://github.com/lodash/babel-plugin-lodash) chúng ta có kết quả 140kb trên tất cả các cách *import*

![importing lodash with the lodash babel plugin](https://cdn2.hubspot.net/hubfs/208250/Blog_Images/lodash4.png)

## Dùng Lodash webpack plugin

[Lodash webpack plugin](https://github.com/lodash/lodash-webpack-plugin) không biết đã bùa chú kiểu gì mà kết quả cuối cùng rất *ngon* 121kb cho cách 1, các cách khác sẽ còn bé hơn nữa

![imprting lodash with the webpack plugin](https://cdn2.hubspot.net/hubfs/208250/Blog_Images/lodash5.png)

## Kết luận

Nếu ko siêng bạn nên dùng cách 3, còn nếu siêng bạn setup với babel-plugin-lodash và lodash-webpack-plugin để đạt hiệu quả cao nhất.

Lodash-es thì nên dẹp luôn đừng xài vì nó ko thay đổi gì tích cực cả.

[The Correct Way to Import Lodash Libraries](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark)