---
slug: "/2019-07-09-6-vi-du-giup-ban-yeu-luon-rxjs-observable"
date: "2019-07-09"
title: "6 ví dụ để bạn yêu luôn observable"
desc: "Thêm những lý do để dụ dỗ bạn xài Observable"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

**Observable** mình dịch ra tiếng việt thế này cho bạn dễ hình dung. Một khi bạn bật chế độ `observable` với một đứa con gái nào đó, là bạn đang trong giai đoạn bị nó ám ảnh, nhất cử nhất động của nó bạn điều để ý, nó hắc xì bạn cũng biết, một tuần nó mặc mấy bộ đồ bạn cũng biết. Chỉ cần nghe tiếng bước chân là bạn biết được hôm nay nó mang đôi dép gì (mức độ này hơi kinh khủng lắm rồi) là bạn có những phản xạ vô điều kiện bộc phát nơi cửa miệng "Chiều nay trời mưa nhe em, mang dép lào đi cho chuẩn". Phản xạ này là gọi là **subscription**

Rồi quay lại với vấn đề kỹ thuật, bài này không giải thích rõ Observable pattern, các khái niệm chính của nó, nếu muốn bạn đọc lại bài này trước đây [có viết rồi](https://luubinhan.github.io/blog/2018-10-30-gioi-thieu-reactive-programing-trong-javascript), như cái tựa bài viết nó spoil hết cái nội dung rồi "Ví dụ để thấy tại sao chúng ta nên *bật chế độ* Observable với một em gái nào đó"

Thần chú mình muốn bạn thuộc lầu

> Lập trình Reactive là làm việc với luồng dữ liệu bất đồng bộ

Lại phải giải thích câu này chút, **Nếu những gì diễn ra trên ứng dụng đang xảy ra một cách bất đồng bộ, khả năng rất cao là Observable sẽ giúp ích cho cuộc sống của anh em chúng ta bớt khổ hơn**.

Có nhiều cách làm và thư viện handle vụ luồng dữ liệu bất đồng bộ này, tuy nhiên, Observable có gì mà cool, sắp được chuẩn hóa và đưa vào ECMAScript. Thư viện RxJS đang được sử dụng rộng rãi và quá ngon rồi.

Rồi vô luôn ví dụ nhe

## Handle các event bằng Observable

Chúng ta có 1 button, khi button này click tạo ra một chuỗi ngẫu nhiên. Viết bằng cả 2 cách javascript thuần, và sử dụng RxJS

```js
const button = document.querySelector('button');
const output = document.querySelector('output');

button.addEventListener('click', e => {
    output.textContent = Math.random().toString(36).slice(2);
})
```

Bằng RxJS nè

```js
const button = document.querySelector('button');
const output = document.querySelector('output');

Rx.Observable
    .fromEvent(button, 'click')
    .subscribe(() => {
        output.textContent = Math.random().toString(36).slice(3);
    })
```

Nó dài hơn khi viết javascript thuần mà man 😂. Chi mà phức tạp vậy? Đúng luôn, nhưng giờ thêm yêu cầu này vào thì sao: *Ở mỗi lần click đến bội số của 3 ( 3,6,9,12,...) thì mới random một string mới*

```js
Rx.Observable
    .fromEvent(button, 'click')
    .bufferCount(3) // một dòng duy nhất
    .subscribe(() => {
        output.textContent = Math.random().toString(36).slice(3);
    })
```

Vậy bạn viết JS thôi thì sao, khỏi nói cũng biết nó sẽ dài dòng hơn.

## Operator, operator

Trong ví dụ trên, `.bufferCount` *đã cho thấy sức mạnh vượt trội** so với cách thông thường. Có thể nói thế này, **chúng ta xài Observable này là vì những gì chúng ta làm được bằng operator**. Trong thư viện RxJS nó cả tá Operator tha hồ mà chơi.

Một ví dụ khác, cũng là vụ random string ở trên, mà giờ chỉ muốn random **khi nó là một cú triple click** (một phát 3 nháy, không phải double click nhoa)

```js
const click$ = Rx.Observable.fromEvent(button, 'click');

click$.Observable
    .bufferWhen(() => {
        click$.delay(400);
        // kkhoảng thời gian của một cú 3 click
    })
    .filter(events => events.length >= 3)
    .subscribe(() => {
        output.textContent = Math.random().toString(36).slice(3);
    })
```

DỊch ra ngôn ngữ con người nó sẽ như thế này, **trong khoảng thời gian là 400ms, trong đám event được emit (tụi này được đưa vào mảng `events`), nếu mảng này lớn hơn hoặc bằng 3, thực hiện đống việc đã đăng ký bên dưới `subscribe`**

Bạn đã bắt đầu yêu Observable chưa? Mình đã khoái khoái rồi đó.

## Ai có thể là  Observable

Đơn giản, bất kể già trẻ lớn bé, trai gái, nếu RxJS có hàm ( khi nãy là `.fromEvent`) thì chúng ta có thể biến nó thành đối tượng bị theo dõi liên tục.

## Observable cho các HTTP request

Một sức mạnh *siêu nhiên* khác của RxJS: xử lý mấy em HTTP request rất mượt mà

Ví dụ, fetching một danh sách album và render.

```js
const albumsApiUrl = 'https://jsonplaceholder.typicode.com/albums';

Rx.Observable
    .ajax(albumsApiUrl)
    .subscribe(
        res => console.log(res),
        err => console.log(err)
    )
```

Trộn chung với ví dụ ở trên, chúng ta làm cái tính năng awsome sau, click  là có danh sách album ngẫu nhiên

```js
Rx.Observable
    .fromEvent(button, 'click')
    .flatMap(getAlbums)
    .subscribe(
        render,
        err => console.error(err)
    )

function getAlbums() {
    const userId = Math.round(Math.random() * 10);
    return Rx.Observable.ajax(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        )
}
```

<iframe height="265" style="width: 100%;" scrolling="no" title="Observables 4" src="//codepen.io/mmiszy/embed/WZOJjy/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mmiszy/pen/WZOJjy/'>Observables 4</a> by Michał Miszczyszyn
  (<a href='https://codepen.io/mmiszy'>@mmiszy</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Ví dụ trên có sử dụng operator `flatMap`, 1 trong những operator siêu kinh điển của RxJS, cho phép merge 2 mảng kiểu Observable thành 1

Nếu chúng ta click liên tục trong thời gian ngắn, là có vấn đề, re-render nhiều lần, chúng ta cũng ko xác định được request nào được resolve cuối cùng. Cụ thể là thế này, có thể thằng xuất phát trước lại về đích sau cùng, chuyện của network ai mà biết được thời điểm đó nó download film gì làm chậm mạng, thằng request sau có khi lại về đích trước, như vậy thì dùng cục response lúc nào để render, mình muốn response của thằng request cuối cùng.

Bạn muốn, trong công cuộc tán gái, đứa nào ở lại đến giây phút cuối cùng là đứa chiến thắng, bạn sẽ dẹp luôn những đứa nào thả thính trước đó? Ví von như vậy cũng chưa chuẩn, phải là đứa nào đến sau cùng thì dữ lại, dẹp mẹ tụi tới trước (thế này thì bất công vl mấy bạn)

RxJS làm được chuyện đó không? Có chứ, **mọi thứ đã có operator**, chuyển qua dùng `switchMap`, sẽ chỉ có **response cuối cùng được render**, mấy request trước đó sẽ bị cancel hết

![](https://res.cloudinary.com/dukp6c7f7/image/upload/f_auto,fl_lossy,q_auto/s3-ghost/2017/09/Screen_Shot_2017_09_29_at_9_24_06_PM-1506713083152.png)

```js{3}
Rx.Observable
    .fromEvent(button, 'click')
    .switchMap(getAlbums)
    .subscribe(
        render,
        err => console.error(err)
    )
```

## Kết hợp các Observable

Một use case khác mà chúng ta gặp hoài. Chức năng filter hoạt động như sau: cho tụi user nhập vào `user id` bằng `<input />`, và chọn thể loại âm nhạc nó muốn bằng `<select />`. Điều quan trọng là chỉ tạo request mới khi cả 2 giá trị trong đó điều có dữ liệu, và re-render khi một trong 2 giá trị này bị thay đổi.

Tạo Observable trước nhé

```js
const id$ = Rx.Observable
    .fromEvent(input, 'input')
    .map(e => e.target.value)

const resource$ = Rx.Observable
    .fromEvent(select, 'change')
    .map(e => e.target.value)
```

Chúng ta phải hợp thể 2 thằng trên vào một, để khi một trong 2 thằng có thay đổi chúng ta lấy được giá trị sau cùng của cả 2. **mọi thứ đã có operator**, nhiều lắm, ở đây dùng `combineLatest`

```js
Rx.Observable
    .combineLatest(id$, resource$)
    .switchMap(getResource)
    .subscribe(render)
```

<iframe height="265" style="width: 100%;" scrolling="no" title="Observables 6" src="//codepen.io/mmiszy/embed/mBwLoX/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mmiszy/pen/mBwLoX/'>Observables 6</a> by Michał Miszczyszyn
  (<a href='https://codepen.io/mmiszy'>@mmiszy</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## Kết

Bạn đã thấy sử dụng Observable thú vị dường nào chưa? Nếu câu trả lời là "Có ❤️, trọn đời yêu em", bạn hãy nhào vô document của nó để nghiên cứu chuyên sâu hơn. Hoặc [đọc lại bài trước đây của mình](https://luubinhan.github.io/blog/2018-10-30-gioi-thieu-reactive-programing-trong-javascript).

Nếu câu trả lời là "No 💩, anh éo care mấy đứa ạ". Thì bạn cũng nên bớt bớt đối xử tệ với nó đi, vì trong tương lai JS sẽ đưa nào vào như một object chính thức luôn, không chạy đằng trời được đâu các bạn ạ.

Hy vọng anh em hôm nay đã học thêm được cái gì đó thú vị, hẹn gặp lại anh em vào một viết thú vị khác.


<a target="_blank" rel="noopener noreferrer" href="https://x-team.com/blog/rxjs-observables/">6 SIMPLE EXAMPLES WHICH WILL MAKE YOU LOVE OBSERVABLES (RXJS 5)</a>