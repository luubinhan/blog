---
slug: "/2019-05-14-huong-dan-handle-event-trong-javascript-cho-nguoi-moi"
date: "2019-05-14"
title: "Hướng dẫn handle event listener căn bản cho các bạn mới bắt đầu với javascript"
desc: "Căn bản nhưng cần thiết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Sử dụng Event Object](#s%E1%BB%AD-d%E1%BB%A5ng-event-object)
- [Sử dụng bubbling](#s%E1%BB%AD-d%E1%BB%A5ng-bubbling)
- [Sự kiện Click](#s%E1%BB%B1-ki%E1%BB%87n-click)
- [Một số ví dụ khác](#m%E1%BB%99t-s%E1%BB%91-v%C3%AD-d%E1%BB%A5-kh%C3%A1c)

<!-- /TOC -->


Bắt đầu với một ví dụ đơn giản: một `<div/>` để user có thể kéo thả vào, chúng ta hiển thị user đã kéo thả vào nào

```html
<section>
  <div id="red" draggable="true">
    <span>R</span>
  </div>
  <div id="yellow" draggable="true">
    <span>Y</span>
  </div>
  <div id="green" draggable="true">
    <span>G</span>
  </div>
</section>

<p id="dragged">Drag a box</p>
```

Chúng ta sẽ gắn listener lên từng element


```js
document.querySelector('#red').addEventListener('dragstart', evt => {
    document.querySelector('#dragged').textContent = 'Dragged red';
});

document.querySelector('#yellow').addEventListener('dragstart', evt => {
    document.querySelector('#dragged').textContent = 'Dragged yellow';
});

document.querySelector('#green').addEventListener('dragstart', evt => {
    document.querySelector('#dragged').textContent = 'Dragged green';
});
```

Tất cả các listener trên đều thực hiện một thao tác giống nhau: đổi text. Chúng ta có thể gộp nó lại vào 1 function

```js
function preview(color) {
  document.querySelector('#dragged').textContent = `Dragged ${color}`;
}

document
  .querySelector('#red')
  .addEventListener('dragstart', evt => preview('red'));
document
  .querySelector('#yellow')
  .addEventListener('dragstart', evt => preview('yellow'));
document
  .querySelector('#green')
  .addEventListener('dragstart', evt => preview('green'));
```

Gọn hơn, nhưng vẫn cần nhiều function khác nhau cho các element khác nhau

## Sử dụng Event Object

Khi một listener được gọi, nó cũng sẽ nhận được một `Event` Object, object nếu chứa một số thông tin như thời gian xảy ra sự kiện, đối tượng gây ra sự kiện

```js
const preview = evt => {
  const color = evt.currentTarget.id;
  document.querySelector('#dragged').textContent = `Dragged ${color}`;
};

document.querySelector('#red').addEventListener('dragstart', preview);
document.querySelector('#yellow').addEventListener('dragstart', preview);
document.querySelector('#green').addEventListener('dragstart', preview);
```

## Sử dụng bubbling

Để giảm số dòng code chúng ta viết ra, thay vì chúng ta gắn các event listener lên từng .box, chúng ta chỉ gắn 1 listener lên `section` chứa tất cả box

Khi một sự kiện xảy ra trên element, nó ko dừng lại tại element đó, trình duyệt sẽ đi qua tất cả các element cha của nó, gọi tất cả các listener cho đến khi nó đi tới thẻ `body`. Quá trình này được gọi là `bubbling`

Bên trong `evt.target` sẽ chứa element bắn ra sự kiện, chứ không phải element được gắn listener là `section`

```js
const preview = evt => {
  const color = evt.target.id;
  document.querySelector('#dragged').textContent = `Dragged ${color}`;
};

document.querySelector('section').addEventListener('dragstart', preview);
```

## Sự kiện Click

`evt.target` chạy tốt với các sự kiện `change` và `dragstart` vì chỉ có một số lượng rất ít các element có thể nhận focus và giá trị input bị thay đổi tại một thời điểm chỉ có một

Với sự kiện `click` thì có khác một chút xíu

```html
<section>
  <div id="red" draggable="true">
    <span>R</span>
  </div>
  <div id="yellow" draggable="true">
    <span>Y</span>
  </div>
  <div id="green" draggable="true">
    <span>G</span>
  </div>
</section>

<p id="clicked">Clicked a box</p>
```

```js
const preview = evt => {
  const color = evt.target.id;
  document.querySelector('#clicked').textContent = `Clicked ${color}`;
};

document.querySelector('section').addEventListener('click', preview);
```

Nếu chúng ta click vào vùng của `span`, sự kiện vẫn được bắn ra, tuy nhiên nó không chứa `id` nên `evt.target.id` ngủm, đó là lý do tại sao có khi đoạn code trên có khi chạy đúng, có khi sai

Để lấy được element cha gần nhất, chúng ta dùng `element.closest()`

```js
const preview = evt => {
  const element = evt.target.closest('div[draggable]');
  if (element != null) {
    const color = element.id;
    document.querySelector('#clicked').textContent = `Clicked ${color}`;
  }
};
```

## Một số ví dụ khác

Khi có một list các item, các item có thể thêm bớt số lượng tuỳ thích, chúng ta sẽ không gắn listener vào từng item một

```html
<div id="buttons-container"></div>
<button id="add">Add new button</button>
```

Tiếp tục sử dụng bubbling, chúng ta chỉ gắn một listener cho container

```js
let buttonCounter = 0;
const container = document.querySelector('#buttons-container');
document.querySelector('#add').addEventListener('click', evt => {
  const newButton = document.createElement('button');
  newButton.dataset.number = buttonCounter;
  buttonCounter++;

  container.appendChild(newButton);
});

// gắn listener cho container, thay vì trên từng button
container.addEventListener('click', evt => {
  const clickedButton = evt.target.closest('button');
  if (clickedButton != null) {
    // log gía trị khi click
    document.querySelector('#clicked').textContent = `Clicked button #${clickedButton.dataset.number}`;
  }
});
```

Form có rất nhiều input và chúng ta muốn lấy tất cả dữ liệu user nhập vào, nhét trong một object

```html
<form>
  <label>Name: <input name="name" type="text"/></label>
  <label>Email: <input name="email" type="email"/></label>
  <label>Password: <input name="password" type="password"/></label>
</form>
<p id="preview"></p>
```
```js
let responses = {
  name: '',
  email: '',
  password: ''
};

document.querySelector('form').addEventListener('change', evt => {
  responses[evt.target.name] = evt.target.value;
  document.querySelector('#preview').textContent = JSON.stringify(responses);
});
```


<a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/the-thinking-behind-simplifying-event-handlers/">The Thinking Behind Simplifying Event Handlers</a>