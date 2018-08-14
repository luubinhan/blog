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

Hình dung cái pattern này như sau: Chúng ta có 1 cái *instance* sẽ đảm nhiệm quản lý **tập các đối tượng** (observer) và thông báo đến tất cả các **observer** này khi có một thay đổi nào đó xảy ra.

Tưởng tượng ta có các elements (có **s** nha) sẽ được cập nhập khi có một **event** xảy ra (ví dụ như nhập giá trị input). Chúng ta cần **thêm** (= **subscribe**) các *elements* (= **observer**) sẽ thay đổi khi chúng ta nhập giá trị cho `input`, code nó như sau

```jsx
class Observable {
    constructor() {
        // chứa danh sách các đối tượng đang subscribe theo sự kiện
        this.observers = [];
    }
    
    // thêm đối tượng đó vào mảng observers
    subscribe(f) {
        this.observers.push(f);
    }

    // cũng nên có function để remove nó ra khỏi mảng observer nhỉ
    unsubscribe(f) {
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    // gởi đi thông báo khi xảy ra sự kiện và một số dữ liệu kèm theo
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}
```

Sử dụng nó

```jsx
const input = document.querySelector('.js-input');
const p1 = document.querySelector('.js-p1');
const p2 = document.querySelector('.js-p2');
const p3 = document.querySelector('.js-p3');

// các action sẽ thêm vào mảng observers
const updateP1 = text => p1.textContent = text;
const updateP2 = text => p2.textContent = text;
const updateP3 = text => p3.textContent = text;

// khởi tạo Observer class
const headingsObserver = new Observable();

// cho em đăng ký với mấy anh ơi
headingsObserver.subscribe(updateP1);
headingsObserver.subscribe(updateP2);
headingsObserver.subscribe(updateP3);

// khi giá trị input thay đổi: đưa nào đăng ký thì tao gởi mail, lộn gọi đến action tụi bây đăng ký thực hiện
input.addEventListener('keyup', e => {
  headingsObserver.notify(e.target.value);
});
```

Đây là phiên bản siêu đơn giản của observer pattern, nếu muốn tìm hiểu sâu hơn nữa bạn có thể đọc [Learning Javascript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) của tác giả Addy Osmani. Observe pattern còn được gọi "Publication/Subscription", thật ra thì nó có xíu khác biệt mà Addy [đã đề cập](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)

Trong Observer pattern, *Observer* (object) muốn nhận thông báo phải *subscribe* vào object sẽ fire ra sự kiện, trong khi đó Publish/Subscribe pattern sử dụng như một cầu nối đứng giữa object muốn nhận thông báo (subscriber) và object fire ra sự kiện (publisher), ý tưởng ở đây là để tách sự phụ thuộc của subscriber và publisher, cho phép các event chỉ định có thể truyền đi những arguments chứa giá trị mà subscriber cần.

```jsx
 
// email đã nhận
var mailCounter = 0;
 
// khởi tạo subscribers sẽ lắng nghe sự kiện "inbox/newMessage".
 
// Render preview
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