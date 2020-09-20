---
slug: "/2018-09-11-huong-dan-giai-thich-dependency-injection-cho-nguoi-moi-bat-dau-khong-biet-gi"
date: "2018-09-11"
title: "Dependency injection trong Javascript"
desc: "Dependency injection là một khái niệm hay gặp không chỉ trong Angular mà còn ở nhiều ngôn ngữ lập trình khác, Dependency injection không có gì ghê gớm cả, chỉ do cách dùng từ có vẻ to lớn vậy thôi"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Tại sao](#tại-sao)
- [Cách giải quyết của requires/AMD](#cách-giải-quyết-của-requiresamd)
- [Kiểu Reflection](#kiểu-reflection)

<!-- /TOC -->

# Tại sao

Giờ hãy tưởng tượng chúng ta có 2 module, cái đầu tiên để gọi ajax và cái thứ 2 để route

```js
var service = function() {
  return { name: 'Service' };
}
var router = function() {
  return { name: 'Router' };
}
```

Chúng ta có một function khác cần 2 module trên

```js
var doSomething = function(other) {
  var s = service();
  var r = router();
}
```

Đoạn code trên không có vấn đề gì cả trừ việc nó không có flexible. Nếu như chúng ta muốn dùng `ServiceXML` hoặc `ServiceJSON`, chúng ta không thể cứ đè ra sửa nội dung bên trong của function.

Giải pháp chúng ta sẽ phải làm là đưa 2 cái dependency là `service`, `router` như một params cho function `doSomething`

```js
var doSomething = function(service, router, other) {
  var s = service();
  var r = router();
}
```

Bằng cách này, chúng ta có thể sử dụng hàm `doSomething` rất nhiều chổ. Tuy nhiên nó sinh ra một vấn đề khác. Nếu chúng ta sử dụng hàm `doSomething` ở **n** chổ, giờ chúng ta thêm một dependency thứ 3, ko lẽ ngồi sửa hết toàn bộ những chổ đang sử dụng `doSomething`.

Tóm tắt lại chúng ta muốn

- Có thể đăng ký số lượng dependency
- injector cho phép nhận vào function và return về một function với những params nó mong muốn
- Không viết nhiều, càng ngắn càng tốt
- injector giữ nguyên scope của function truyền vào
- function truyền vào cho phép nhận custom arguments, không chỉ những dependency đã mô tả

# Cách giải quyết của requires/AMD

```js
define(['service', 'router'], function(service, router) {})
```

Ý tưởng trước hết là mô tả những dependency cần và sau đó viết function sử dụng nó. Thứ tự argument quan trọng. Chúng ta sẽ viết 1 module gọi **injector**

```js
var doSomething = injector.resolve(['service', 'router'], function(service, router, other){
  expect(service().name).to.be('Service');
  expect(router().name).to.be('Router');
  expect(other).to.be('Other')
});
doSomething('Other');
```

Ở đây chúng ta đang dùng `expect.js` như một thư viện assertion  để đảm bảo đoạn code bên trong hàm `doSomething` viết như chúng ta mong muốn

Giờ chúng ta xem xét đến module injector, chúng ta sẽ viết theo kiểu **singleton**

```js
var injector = {
  dependencies: {},
  register: function(key, value) {
    this.dependencies[key] = value;
  },
  resolve: function(deps, func, scope) {

  }
}
```

Nó đơn giản là một object với 2 function và một biến được dùng như storage. Chúng ta cần kiểm tra mảng `deps` và tìm trong biến `dependencies`, sau đó việc còn lại là gọi `.apply` để thực thi

```js
resolve: function(deps, func, scope) {
  var args = [];
  for (var i=0; i<deps.length, d=deps[i]; i++) {
    if (this.dependencies[d]) {
      args.push(this.dependencies[d]);
    } else {
      throw new Error('Can\'t resolve ' + d);
    }
  }
  return function() {
    func.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0)));
  }
}
```

`Array.prototype.slice.call(arguments, 0)` để transform các biến arguments sang một array. Viết thế này cũng còn một hàng chế là các custom params luôn phải nằm sau dependency, và không thể thay đổi thứ tự của params

# Kiểu Reflection

Đây cũng là kiểu tìm viết dependency injection của Angular.

Giờ nếu chúng ta gọi `doSomething.toString()` chúng ta có kết quả sau

```js
"function (service, router, other) {
    var s = service();
    var r = router();
}"
```

Trong javascript chúng ta có thể đọc một function như một string, sau đó ta có thể biết được expect được params của function này và tên của nó. Angular sử dụng cái regular expression sau để export arguments

```js
/^function\s*[^\(]*\(\s*([^\)]*)\)/m
```

Dùng nó để chỉnh lại class `resolve`

```js
resolve: function() {
  var func, deps, scope, args = [], self = this;
  func = arguments[0];
  deps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
  scope = arguments[1] || {};
  return function() {
    var a = Array.prototype.slice.call(arguments, 0);
    for(var i=0; i<deps.length; i++) {
        var d = deps[i];
        args.push(self.dependencies[d] && d != '' ? self.dependencies[d] : a.shift());
    }
    func.apply(scope || {}, args);
  }
}
```

Sử dụng RegExp chúng ta có kết quả

```js
["function (service, router, other)", "service, router, other"]
```

Chúng ta sẽ chỉ sử dụng đến item thứ 2. Sau khi xóa hết các khoảng trắng còn thừ và split cái string này ra thành một array, chúng ta có **deps** như mong muốn. Một thay đổi khác

```js
var a = Array.prototype.slice.call(arguments, 0);
...
args.push(self.dependencies[d] && d != '' ? self.dependencies[d] : a.shift());
```

Chạy qua tất cả giá trị dependency và nếu có còn thiếu thì đưa vào arguments để thay thế.

Injector mới này có thể sử dụng như sau

```js
var doSomething = injector.resolve(function(service, other, router) {
    expect(service().name).to.be('Service');
    expect(router().name).to.be('Router');
    expect(other).to.be('Other');
});
doSomething("Other");
```

Không cần quan tâm dependency và chúng ta có thể viết lộn xì ngầu với lại các params khác nó vẫn biết được đâu là dependency.

[Link bài gốc](http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript)