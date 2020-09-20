---
slug: "/2018-04-17-huong-dan-giai-thich-observer-pattern-trong-javascript"
date: "2018-04-17"
title: "Giải thích Observer Pattern trong javascript"
desc: "Observer là một pattern khá phổ biến trong javascript, bài giải thích ngắn gọn về pattern này"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

Mình lấy một pattern trong cuộc sống để bạn dễ hình dung trước: cơ quan phát thanh của thị trấn, quản lý toàn bộ các loa phát thanh xung quanh thị trấn. Khi có một công dân trong thị trấn đăng ký kết hôn, mất trộm,... một sự kiện nào đó xảy ra trong thị trấn, cơ quan này sẽ lan tin tức đến toàn bộ dân làng, nếu tin tức này liên quan đến người nào đó, ví dụ anh này có hẹn hò với chị kia mà còn đăng ký kết hôn chị nọ, thì các nhà đó tự giải quyết với nhau.

Giờ phân vai

- **Observable**: cơ quan phát thanh
- **Observer**: các hộ dân trong xã
- **Notify**: hành động lan tin cho toàn xã

```jsx
class Observable {
    constructor() {
        // chứa danh sách các hộ dân trong xã
        this.observers = [];
    }
    
    // thêm hộ dân mới vào xã mình
    subscribe(f) {
        this.observers.push(f);
    }

    // bỏ xã ra đi
    unsubscribe(f) {
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    // lan tin cho toàn xã
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}
```

Ví dụ sử dụng

```js
const input = document.querySelector('.js-input');
const p1 = document.querySelector('.js-p1');
const p2 = document.querySelector('.js-p2');
const p3 = document.querySelector('.js-p3');

// một số hành động sẽ làm khi nghe tin từ loa phường
const updateP1 = text => p1.textContent = text;
const updateP2 = text => p2.textContent = text;
const updateP3 = text => p3.textContent = text;

// thành lập ủy ban loa phường
const headingsObserver = new Observable();

// cho em đăng ký với mấy anh ơi
headingsObserver.subscribe(updateP1);
headingsObserver.subscribe(updateP2);
headingsObserver.subscribe(updateP3);

// khi giá trị input thay đổi
// bắn tin tức này đến cho cả làng
input.addEventListener('keyup', e => {
  headingsObserver.notify(e.target.value);
});
```

Đây là phiên bản siêu đơn giản của observer pattern, nếu muốn tìm hiểu sâu hơn nữa bạn có thể đọc [Learning Javascript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) của anh Addy Osmani. Observe pattern còn được gọi "Publication/Subscription", thật ra thì nó có xíu khác biệt mà Addy [đã đề cập](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)

Trong Observer pattern, *Observer* (object) muốn nhận thông báo phải đăng ký hộ khẩu (subscribe), trong khi đó Publish/Subscribe pattern sử dụng như một cầu nối đứng giữa object muốn nhận thông báo (subscriber) và object bắn ra sự kiện (publisher), ý tưởng ở đây là để tách sự phụ thuộc của subscriber và publisher. Giống như Youtube họ ko tự sản xuất video mà các bạn Youtuber làm video và phát qua kênh Youtube

```js 
// email đã nhận
var mailCounter = 0;
 
// khởi tạo subscriber sẽ lắng nghe sự kiện "inbox/newMessage" 
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  console.log( "A new message was received: ", topic );
   
  // Dùng dữ liệu trả về để render và nội dung  
  $( ".messageSender" ).html( data.sender );
  $( ".messagePreview" ).html( data.body ); 
});
 
// Một subscriber khác cũng lắng nghe sự kiện này và thực hiện một tác vụ khác 
// Update lại counter 
var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) { 
  $('.newMessageCounter').html( ++mailCounter ); 
});
 
publish( "inbox/newMessage", [{
  sender: "hello@google.com",
  body: "Hey there! How are you doing today?"
}]);
 
// unsubscribe( subscriber1 );
// unsubscribe( subscriber2 );
```

Tức là ở đây thằng Observer ta móc nó vào sự kiện xảy ra trên đối tượng (ví dụ trên là input), còn Pub/Sub thì sẽ có thằng đứng giữa 2 đứa, làm nhiệm vụ cung cấp 2 hàm là `publish` để tạo sự kiện, `subscribe` để lắng nghe sự kiện.

