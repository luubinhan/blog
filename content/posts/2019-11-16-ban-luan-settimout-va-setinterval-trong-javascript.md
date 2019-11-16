---
slug: "/2019-11-16-ban-luan-settimout-va-setinterval-trong-javascript"
date: "2019-11-16"
title: "Bàn luận về setTimeout và setInterval trong javascript"
desc: "Một số vấn đề về setTimeout đáng để bạn cân nhắc trước khi sử dụng"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "javascript"]
---


## setInterval và setTimeout

Nếu bạn cần gọi một hàm **lặp lại** theo một khoản thời gian nhất định trong javascript bạn sẽ dùng gì? Một là dùng `setInterval`  hay là đệ quy `setTimeout`

Vì sao bạn nên cân nhắc trước khi sử dụng `setInterval`, nó đã gây ra tội tình gì? Vì sao sẽ tốt hơn nếu chúng ta lắng nghe và đợi một *tín hiệu* nào đó rồi chạy

```js
window.onload = () => {
  // đợi tính hiệu nào đó rồi thực thi một số việc 
  // sẽ luôn là lựa chọn tốt nhất
};
```

Nếu ông bà có dạy *đợi mua bò mới đi làm chuồng thì đã muộn* không đúng trong trường hợp này. **CÓ** trước hẳn làm gì thì làm.

### setInterval

Với `setInterval` nó sẽ tiếp tục chạy cho tới khi chúng ta ra lệnh xóa nó hoặc đóng luôn trình duyệt.

`setInterval` cam kết đoạn code của chúng ta nó sẽ được đưa vào **STACK** theo đúng một chu kỳ thời gian. *Tuy nhiên*, đoạn code này của bạn **không được cam kết** sẽ chạy theo đúng chu kỳ thời gian, phụ thuộc vào các yếu tố khác nữa, và đã phần là có độ trễ, theo một cách dân gian ta gọi nó là **HÊN XUI**

![Bàn luận về setTimeout và setInterval trong javascript](https://miro.medium.com/max/1837/1*A138JkWveIfKajztvhu60g.png)

Thời gian chạy của hàm `dummyMethod1` tốn nhiều thời gian hơn dự tính, lý do thì không rõ.

> Nếu bạn chưa biết, javascript được thiết kế để chạy single thread, nghĩa là nó **không** thực hiện hai công việc cùng một lúc.

Điều đó có nghĩa, các phương thức khác phía trên stack phải đợi cho đến khi `dummyMethod1` làm xong công chuyện của nó.

Thêm một ví dụ khác, nếu hàm khai báo bên trong `setInterval` có thời gian chạy lớn hơn giá trị delay của `setInterval` (ví dụ như hàm gọi ajax), chúng ta sẽ có vấn đề như thế này

```js
var fakeCallToServer = function() {
  setTimeout(function() {
    console.log('returning from server', new Date().toLocaleTimeString());
  }, 4000);
}

setInterval(function(){
 let insideSetInterval = new Date().toLocaleTimeString();
 console.log('insideSetInterval', insideSetInterval);
 fakeCallToServer();
}, 2000);
//insideSetInterval 14:13:47
//insideSetInterval 14:13:49
//insideSetInterval 14:13:51
//returning from server 14:13:51
//insideSetInterval 14:13:53
//returning from server 14:13:53 
//insideSetInterval 14:13:55
//returning from server 14:13:55
```

Như kết quả ở trên cho thấy, câu `console.log("insideSetInterval")` sẽ liên tục gọi ajax bất kể trước đó đã gọi thành công chưa. Đáng lẽ chúng ta phải kết thúc việc gọi liên tục này, đa phần chúng ta quên `clearInterval`. Nó sẽ tạo ra một hàng đợi *dài ngoằn* trong stack.

Giờ thử một xử lý tuần tự trong `setInterval`

```js
var counter = 0;

var fakeTimeIntensiveOperation = function() {

    for (var i =0; i< 50000000; i++) {
        document.getElementById('random');
    }

    let insideTimeTakingFunction  = new Date().toLocaleTimeString();

    console.log('insideTimeTakingFunction', insideTimeTakingFunction);
}

var timer = setInterval(function(){ 

    let insideSetInterval = new Date().toLocaleTimeString();

    console.log('insideSetInterval', insideSetInterval);

    counter++;
    if(counter == 1){
        fakeTimeIntensiveOperation();
    }

    if (counter >= 5) {
       clearInterval(timer);
    }
}, 1000);

//insideSetInterval 13:50:53
//insideTimeTakingFunction 13:50:55
//insideSetInterval 13:50:55 <---- mất tiêu câu gọi lúc 54 giây
//insideSetInterval 13:50:56
//insideSetInterval 13:50:57
//insideSetInterval 13:50:58
```

Những gì đang diễn ra ở trên, với một thao tác tốn kha khá thời gian xử lý, nó mất hẳn đoạn code `console.log("insideSetInterval")`, nôm na là nó bị *đứt một nhịp*, tình huống này xảy ra với Chrome, nó tạo ra một *nhịp* mới.

Thay vì dùng `setInterval`, chúng ta có thể dùng đệ quy `setTimeout`

### setTimeout

Mặc dù cũng chưa hẳn cam kết 100% đoạn code của chúng chạy đúng theo một chu kỳ đã định với đệ quy `setTimeout`. Chí ít nó cũng không gây ra chuyện đưa hàng đống lệnh chờ chạy vào trong stack

![Bàn luận về setTimeout và setInterval trong javascript](https://miro.medium.com/max/1920/1*A9gNYo3pOtnzuXi30NHjfA.png)

Khi thực hiện bằng `setTimeout`, bên trong vòng đệ quy chúng ta đã có bước kiểm tra **có nên** gọi thêm lần nữa không.

Lưu ý khi bạn dùng setTimeout, chớ có **thực thi** hàm đó luôn (kèm dấu `()`), chúng ta chỉ truyền hàm đó thôi

```js
function sayHi() {}
// ☠ Lỗi
setTimeout(sayHi(), 1000)
// 👍 OK
setTimeout(sayHi, 1000)
```


**Nguồn tham khảo**


[Why not to use setInterval](https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9)

[setTimeout VS setInterval](https://develoger.com/settimeout-vs-setinterval-cff85142555b)

[Scheduling: setTimeout and setInterval](https://javascript.info/settimeout-setinterval)