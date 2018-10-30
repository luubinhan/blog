---
slug: "/2018-10-30-gioi-thieu-reactive-programing-trong-javascript"
date: "2018-10-30"
title: "Giới thiệu về Reactive Programing trong javascript"
desc: "Reactive programing là khái niệm khá trừu tượng và khó tiếp cận với người mới bắt đầu, chuẩn bị tinh thần đọc bài này vài lần trong vài ngày thì mới mong thẩm thấu hết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Reactive programing là gì?](#reactive-programing-là-gì)
- [Stream là gì?](#stream-là-gì)
- [Tại sao chúng ta cần Stream + Reactive Programing](#tại-sao-chúng-ta-cần-stream--reactive-programing)
- [Implement hộp thoại "Who to follow" của twitter](#implement-hộp-thoại-who-to-follow-của-twitter)
  - [Load dữ liệu lúc đầu](#load-dữ-liệu-lúc-đầu)
  - [Nút refresh](#nút-refresh)
  - [Click đóng một suggestion](#click-đóng-một-suggestion)
- [Tổng kết](#tổng-kết)

<!-- /TOC -->

# Reactive programing là gì?

> Reactive programming is programming with asynchronous data streams

Tạm dịch: Reactive programming là lập trình xử lý với dữ liệu không tuần tự (async) như stream

Có khái niệm mới **stream**

Muốn hiểu được reactive programing, bạn cần biết khái niệm **stream**

# Stream là gì?

Có thể hình dung stream như là một **array đặc biệt**, chứa một *tập* các phần tử **đặc biệt**, các phần tử này có thể emit: 1. value, 2. error, 3. complete, các phần tử trong stream cũng không có hết ngay từ đầu, mà sẽ xuất hiện ở một thời điểm ko xác định trong tương lai.

![Giới thiệu về Reactive Programing trong javascript](https://i.imgur.com/9pPGwQ2.jpg)

Về sau, mình dùng kiểu viết này để mô tả stream

```
--a---b-c---d---X---|->

a, b, c, d là các value được emit
X error
| completed signal
---> dòng thời gian
```

Tuân theo [Observer Design Pattern](https://en.wikipedia.org/wiki/Observer_pattern), việc **lắng nghe** stream gọi là **subscribe**, những gì được emit, chúng ta viết các function để xử lý cho 3 trường hợp, các function này gọi là **observer**

Ví dụ, trên giao diện, chuỗi các event click trên một trang có thể được xem là một stream

![Giới thiệu về Reactive Programing trong javascript](https://camo.githubusercontent.com/995c301de2f566db10748042a5a67cc5d9ac45d9/687474703a2f2f692e696d6775722e636f6d2f484d47574e4f352e706e67)

Trên stream click ban đầu, chúng ta thực hiện một số thao tác, nếu click trong khoảng 250ms gộp lại thành 1, filter để chỉ lấy các data lớn hơn 2. Những hàm để xử lý các data stream như vậy gọi là **operator**

Có rất nhiều thứ có thể xem là async data stream. Ví dụ: một cái form đăng ký với các input username, password, email, nút submit, nguyên quá trình user nhập giá trị các field này đến lúc submit, là một async data stream. Một giao diện counter, có duy nhất một button ấn để tăng counter, thì suốt quá trình ấn counter được xem là async data stream.

Để làm việc với Reactive Programing, 100% bạn cần dùng đến thư viện (siêu nhân có thể tự viết), tùy theo ngôn ngữ (ko chỉ có javascript mới có nhé), nó sẽ có một số hàm để bạn chuyển đổi một data bình thường thành một data stream (data stream là phải có thể emit 3 cái đã nói), một số hàm để bạn `merge`, `flatten`, `filter` các data stream này lại.

# Tại sao chúng ta cần Stream + Reactive Programing

Có thể thấy ngay Reactive programing khá trừu tượng, nhưng do thay vì implement những ràng buộc một cách chi tiết, những ràng buộc này được gắn vào từng data gửi đi trên stream, code nó sẽ gọn gàng hơn.

Kiểu viết này sẽ mang phong cách **declarative** hơn là **imperative**, chúng ta không khai báo từng bước tuần tự cần làm gì, chúng ta chỉ khai báo mối quan hệ giữa các stream với nhau.

![Giới thiệu về Reactive Programing trong javascript](https://i.imgur.com/1kygX2B.jpg)

10 năm trước, mọi việc chỉ đơn giản là submit toàn bộ giá trị các field lên backend xử lý, rồi đơn thuần hiển thị kết quả trả về, bây giờ user thích real-time feedback, bấm "like" một phát là đầu bên kia thấy được liền.

Những event real-time như thế, user khoái, chúng ta cần có một công cụ lập trình để làm việc đó, Reactive Program ra đời cũng từ yêu cầu của user.

# Implement hộp thoại "Who to follow" của twitter

Mình sẽ sử dụng [RxJS](https://github.com/Reactive-Extensions/RxJS) trong ví dụ, vì mình chỉ biết javascript thôi các bạn.

![Giới thiệu về Reactive Programing trong javascript](https://camo.githubusercontent.com/81e5d63c69768e1b04447d2e246f47540dd83fbd/687474703a2f2f692e696d6775722e636f6d2f65416c4e62306a2e706e67)

Tính năng chính của hộp thoại này

- Vừa mở lên, load data từ API, hiển thị 3 tài khoản
- Click "Refresh", hiển thị 3 tài khoản khác
- Khi click "x", xóa tài khoản đó khỏi danh sách, hiển thị một tài khoản khác.

Chúng ta tiếp cận với vấn đề này như thế nào, **gần như mọi thứ có thể xem là stream**.

## Load dữ liệu lúc đầu

Bắt đầu với tính năng đơn giản nhất "Mới vào, load 3 account từ API". (1) gửi 1 request (2) nhận response (3) render kết quả

Lúc bắt đầu chúng ta chỉ có 1 request, mọi thứ rất đơn giản, yên tâm là nó sẽ phức tạp dần lên khi có nhiều request. Mô phỏng nó như data stream, stream này chỉ có 1 emit value.

```
——a——-|—>
```

Khi có một event request xảy ra, nó báo 2 việc: **khi nào** và **cái gì**. Khi nào event này được emit và cái gì chính là value được emit (url string)

Trong Rx, bà con gọi stream là Observable, mình thích gọi là stream hơn

```js
var requestStream = Rx.Observable.just('https://api.github.com/users');
```

**Khi** emit value, chúng ta `subscribe` để thực thi một hành động tiếp theo

```js
requestStream.subscribe( requestUrl => {
// execute the request
  jQuery.getJSON(requestUrl, function(responseData) {
    // ...
  });
}
```

Cái response của request cũng là một dạng stream, dữ liệu sẽ đến tại một thời điểm không xác định trong tương lai

```js
requestStream.subscribe(function(requestUrl) {
  // execute the request
  var responseStream = Rx.Observable.create(function (observer) {
    jQuery.getJSON(requestUrl)
    .done(function(response) { observer.onNext(response); })
    .fail(function(jqXHR, status, error) { observer.onError(error); })
    .always(function() { observer.onCompleted(); });
  });
  
  responseStream.subscribe(function(response) {
    // do something with the response
  });
}
```

`Rx.Observable.create()` sẽ tạo ra những stream mới, qua việc thông báo cho các observer đang subscriber các sự kiện `onNext()`, `onError()`.

Nó giống cách chạy của Promise lắm đúng không? Vâng Observable là một dạng Promise++, phiên bản mở rộng.

Chúng ta có 1 subscribe bên trong 1 subscribe khác, nó giống như callback hell. Thêm nữa việc tạo `responseStream` hoàn toàn độc lập với `requestStream`. Trong Rx chúng ta có một cách đơn giản để transform và tạo một stream mới từ những thằng khác

Hàm `map(f)`, sẽ lấy từng giá trị của stream A, gọi function `f()`, và trả về giá trị cho stream B. Tạo một stream này từ stream khác, y như hàm map của array thôi mà.

```js
var responseMetastream = requestStream
  .map(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });
```

Sau đó chúng ta tạo một **stream của stream** metastream. Bắt đầu phức tạp rồi đó. Metastream là 1 stream mà mỗi cái value được emit sẽ trỏ ra 1 stream khác. Trong ví dụ, mỗi URL request, được trỏ đến một stream promise chứa response

![stream của stream - metastream](https://camo.githubusercontent.com/2a8a9cc75acd13443f588fd7f386bd7a6dcb271a/687474703a2f2f692e696d6775722e636f6d2f48486e6d6c61632e706e67)

Với responseStream, chúng ta chỉ một đơn giản một stream chứa response, nên việc tạo một metastream cho response sẽ rối và không cần. Mỗi giá trị được emit của response sẽ là một object JSON, không phải một Promise của object JSON. Sử dụng `.flatMap()` để gộp tất cả response thành 1 stream, `.flatMap` là operator để xử lý dữ liệu async trong Rx

```js
var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });
```

![flatMap để giảm số chiều của stream](https://camo.githubusercontent.com/0b0ac4a249e1c15d7520c220957acfece1af3e95/687474703a2f2f692e696d6775722e636f6d2f4869337a4e7a4a2e706e67)

responseStream được khai báo bởi requestStream, nếu sau này có thêm các sự kiện trên requestStream, chúng ta sẽ có một event response tương ứng trên responseStream

```
requestStream:  --a-----b--c------------|->
responseStream: -----A--------B-----C---|->
```

Sau khi có được responseStream, chúng ta render thôi

```js
responseStream.subscribe(function(response) {
  // render `response` to the DOM however you wish
});
```

Toàn bộ bode bây giờ

```js
var requestStream = Rx.Observable.just('https://api.github.com/users');

var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

responseStream.subscribe(function(response) {
  // render `response` to the DOM however you wish
});
```

## Nút refresh

JSON trả về từ API sẽ có 100 user, nó chỉ cho thêm offset, không cho set page size, chúng ta chỉ cần 3 user, lãng phí hết 97 user. Tạm thời không quan tâm phần này, chúng ta sẽ cache lại cái response sau.

Khi click nút refresh, requestStream sẽ emit một URL mới, sau đó chúng ta nhận được một response mới. Chúng ta cần 2 thứ:

- 1 stream cho sự kiện click -> refreshStream
- cập nhập lại requestStream để nó phụ thuộc vào refreshStream

RxJS có hàm để chuyển event thành stream

```js
var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
```

Click refresh nó không có URL kèm theo, chúng ta phải nhét cái URL bằng code. Map vào URL với giá trị offset ngẫu nhiên

```js
var requestStream = refreshClickStream
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });
```

Tới đây, chắc chắn mở app lên không thấy gì cả, không có request nào được gửi đi, chỉ click refresh thì mới thấy.

Phải tách stream này ra riêng

```js
var requestOnRefreshStream = refreshClickStream
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });
  
var startupRequestStream = Rx.Observable.just('https://api.github.com/users');
```

Sau đó mới `.merge()` lại

```
stream A: ---a--------e-----o----->
stream B: -----B---C-----D-------->
          vvvvvvvvv merge vvvvvvvvv
          ---a-B---C--e--D--o----->
```

```js
var requestOnRefreshStream = refreshClickStream
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });
  
var startupRequestStream = Rx.Observable.just('https://api.github.com/users');

var requestStream = Rx.Observable.merge(
  requestOnRefreshStream, startupRequestStream
);
```

Có cách gọn hơn, không cần đến một stream trung gian

```js
var requestStream = refreshClickStream
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
  .merge(Rx.Observable.just('https://api.github.com/users'));
```

Thậm chí gọn hơn nữa

```js
var requestStream = refreshClickStream
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
  .startWith('https://api.github.com/users');
```

Chủ ý nãy giờ là giải thích `.startWith()` đó. Tuy nhiên là còn có thể tốt hơn nếu chúng ta không lặp lại URL. Làm việc đó bằng cách dời thằng `startWith()` ngay sau `refreshClickStream`, để giả lập sự kiện refresh khi vừa mới mở

```js
var requestStream = refreshClickStream.startWith('startup click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });
```

Khi click nút refresh, chúng ta cũng sẽ remove 3 thằng user đang hiển thị, như vậy chúng ta sẽ subscribe trên `refreshClickStream`

```js
refreshClickStream.subscribe(() => {
  // clear 3 sugesstion
})
```

Tuy nhiên, `responseStream` cũng đang có 1 subscribe ảnh hướng đến việc render, như vậy việc render này cũng tạo thêm 1 stream (có 2 sự kiện emit value để render)

```js
var suggestion1Stream = responseStream
  .map(function(listUsers) {
    // get one random user from the list
    return listUsers[Math.floor(Math.random()*listUsers.length)];
  });
```

Chúng ta cũng sẽ có `suggestion2Stream`, `suggestion3Stream`, `suggestionNStream` hoàn toàn giống với `suggestion1Stream`, nhưng mình sẽ để các bạn tự suy nghĩ cách giải quyết. Ví dụ này chỉ đề cập đến `suggestion1Stream`

Thay vì render trên subscribe của `responseStream`

```js
suggestion1Stream.subscribe(function(suggestion) {
  // render the 1st suggestion to the DOM
});
```

Quay lại vấn đề "click refresh, xóa suggestion", chúng ta đưa vào sugesstion1Stream giá trị null khi refresh

```js
var suggestion1Stream = responseStream
  .map(function(listUsers) {
    // get one random user from the list
    return listUsers[Math.floor(Math.random()*listUsers.length)];
  })
  .merge(
    refreshClickStream.map(function(){ return null; })
  );
```

Với trường hợp null, đơn giản render thông báo

```js
suggestion1Stream.subscribe(function(suggestion) {
  if (suggestion === null) {
    // hide the first suggestion DOM element
  }
  else {
    // show the first suggestion DOM element
    // and render the data
  }
});
```

Hình dung quá trình này như sau, trong đó N là giá trị null

```
refreshClickStream: ----------o--------o---->
     requestStream: -r--------r--------r---->
    responseStream: ----R---------R------R-->   
 suggestion1Stream: ----s-----N---s----N-s-->
 suggestion2Stream: ----q-----N---q----N-q-->
 suggestion3Stream: ----t-----N---t----N-t-->
```

## Click đóng một suggestion

Khi user click vào nút "x", chúng ta sẽ load 1 user khác vào. Cách chúng ta nghĩ đến đầu tiên, tạo một request mới khi click vào nút "x"

```js
var close1Button = document.querySelector('.close1');
var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');

var requestStream = refreshClickStream.startWith('startup click')
  .merge(close1ClickStream) // merge với close stream
  .map(function(){
    var randomOffset = Math.floor(Math.random()*500);
    var 'https://api.github.com/users?since=' + randomOffset;
  })
```

Không chạy, nó sẽ remove user và tải mới 3 suggestion luôn. Vì cái API của chúng ta xài nó load 1 lần 100 user, nên giờ chúng ta chỉ lấy các user nào chưa hiển thị luôn, không cần refresh mới.

Suy nghĩ theo hướng stream, khi event `close1` xuất hiện, chúng ta lấy emit response mới nhất trên *responseStream*, rồi lấy ngẫu nhiên 1 user


```
    requestStream: --r--------------->
   responseStream: ------R----------->
close1ClickStream: ------------c----->
suggestion1Stream: ------s-----s----->
```

Operator là `combineLatest` sẽ nhận vào 2 stream A, B, khi 1 trong 2 stream có emit value, `combineLatest` sẽ join 2 value emit gần nhất `a`, `b` rồi trả về `c = f(x, y)`, trong đó `f` là function chúng ta khai báo

```
stream A: --a-----------e--------i-------->
stream B: -----b----c--------d-------q---->
          vvvvvvvv combineLatest(f) vvvvvvv
          ----AB---AC--EC---ED--ID--IQ---->
```

Chúng ta có thể áp dụng `combineLatest()` cho `close1ClickStream` và `responseStream`, như vậy khi click nút close, nó sẽ lấy kết quả mới nhất từ response rồi trả về một giá trị mới cho `suggestion1Stream`

```js
var suggestionStream = close1ClickStream
  .combineLatest(responseStream, function(click, listUsers) {
    return listUsers[Math.floor(Math.random()*listUsers.length)];
  })
  .merge(
    refreshClickStream.map(function() {return null;})
  )
  .startWith(null);
```

Còn vấn đề nhỏ xíu nữa là, `combineLatest` chỉ chạy khi cả 2 stream đã có giá trị, nếu 1 trong 2 stream chưa emit value nào hết, thì nó không chạy. Để giải quyết vấn đề này, chúng tả giả lập click `close1` khi vừa mở app

```js
var suggestion1Stream = close1ClickStream.startWith('startup click') // we added this
  .combineLatest(responseStream,             
    function(click, listUsers) {l
      return listUsers[Math.floor(Math.random()*listUsers.length)];
    }
  )
  .merge(
    refreshClickStream.map(function(){ return null; })
  )
  .startWith(null);
```

# Tổng kết

Toàn bộ code

```js
var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var closeButton1 = document.querySelector('.close1');
var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
// and the same logic for close2 and close3

var requestStream = refreshClickStream.startWith('startup click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

var responseStream = requestStream
  .flatMap(function (requestUrl) {
    return Rx.Observable.fromPromise($.ajax({url: requestUrl}));
  });

var suggestion1Stream = close1ClickStream.startWith('startup click')
  .combineLatest(responseStream,             
    function(click, listUsers) {
      return listUsers[Math.floor(Math.random()*listUsers.length)];
    }
  )
  .merge(
    refreshClickStream.map(function(){ return null; })
  )
  .startWith(null);
// and the same logic for suggestion2Stream and suggestion3Stream

suggestion1Stream.subscribe(function(suggestion) {
  if (suggestion === null) {
    // hide the first suggestion DOM element
  }
  else {
    // show the first suggestion DOM element
    // and render the data
  }
});
```

Sample có thể vọc ở <a href="http://jsfiddle.net/staltz/8jFJH/48/" target="_blank" rel="noopener noreferrer">http://jsfiddle.net/staltz/8jFJH/48/</a>


 <a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754" target="_blank" rel="noopener noreferrer">https://gist.github.com/staltz</a>
