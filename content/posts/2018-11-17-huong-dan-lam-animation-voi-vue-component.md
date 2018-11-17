---
slug: "/2018-11-17-huong-dan-lam-animation-voi-vue-component"
date: "2018-11-17"
title: "Viết animation cho Vue Component"
desc: "Làm một số animation đơn giản bằng công cụ có sẵn của Vue"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [Ví dụ 1: làm dropdown menu](#ví-dụ-1-làm-dropdown-menu)
- [Ví dụ 2: làm form flipping](#ví-dụ-2-làm-form-flipping)
- [Ví dụ 3: modal](#ví-dụ-3-modal)
- [Ví dụ 4: Todo list](#ví-dụ-4-todo-list)

<!-- /TOC -->


Vue có sẵn một component để chuyên làm animation là `<transition/>`

```jsx
<transition>
	<component />
</transition>
```
Nó sẽ thêm một số CSS class, mà dựa vào đó chúng ta có thể thêm animation cho component.

- `v-enter`: state ban đầu, được thêm vào trước khi element được chèn vào DOM, remove ngay sau frame insert
- `v-enter-active`: được thêm vào trước lúc insert remove sau khi animation kết thúc, tồn tại trong suốt lúc enter. Có thể dùng để define duration, delay, easing cho transition enter
- `v-enter-to`: có từ version 2.1.8. Add sau 1 frame khi element đã insert, cùng lúc với `v-enter` bị xóa, xóa sau khi animation kết thúc.
- `v-leave`: thêm vào ngay lúc có transition leaving, remove sau đó 1 frame
- `v-leave-active`: sẽ có trong lúc leaving. Tương tự v-enter-active
- `v-leave-to`: tương tự v-enter-to

![Làm animation trong Vue bằng component transition](https://vuejs.org/images/transition.png)

Nếu không thích thêm `v-` vào trước mấy class này, chúng ta có thể define một cái prefix khác.

```html
<transition name='my-transition' />
```

Để thêm giá trị `duration` trên component (tính theo mili giây)

```html
<transition :duration="1000" />
<transition :duration="{ enter: 500, leave: 800 }"/>
```

## Ví dụ 1: làm dropdown menu

```html
    <li class="dropdown">
      <button class="dropbtn" @mouseover="show = true" @mouseout="show = false">Dropdown 
        <i class="down-arrow"></i>
      </button>
      <transition name="dropdown">
        <ul class="dropdown-content" v-if="show" @mouseover="show = true" @mouseout="show = false">
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
       </ul>
     </transition>
    </li> 
```

Thêm các CSS cần thiết

```css
.dropdown-enter,
.dropdown-leave-to {
  transform: scaleY(0.7);
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave {
  opacity: 1;
  transform: scaleY(1);
} 
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top center;
}
```

<iframe height='265' scrolling='no' title='Vue Case 1: Drop Down Menu' src='//codepen.io/tutsplus/embed/qQRgZX/?height=265&theme-id=0&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/tutsplus/pen/qQRgZX/'>Vue Case 1: Drop Down Menu</a> by Envato Tuts+ (<a href='https://codepen.io/tutsplus'>@tutsplus</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Ví dụ 2: làm form flipping

```html
<transition name="card" mode="out-in">
    <div class="card" v-if="front == true" key="front">
      <h2>Sign In</h2>
      <div class="form">
        <h1>Sign In Form</h1>
      </div>
      <div class="footer">
        <span>Not a member?</span>
        <button @click="front = false">
          Join Us
        </button>
      </div>
    </div>
    <div class="card" v-else key="back">
      <h2>Sign Up</h2>
      <div class="form">
        <h1>Sign Up Form</h1>
      </div>
      <div class="footer">
        <span>Already a member?</span>
        <button @click="front = true">
          Log In
        </button>
      </div>
    </div>
  </transition>
```

CSS cần thiết

```css
.card-enter, .card-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
} 
.card-enter-active, .card-leave-active {
  transition: all 0.5s;
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="JeExJr" data-default-tab="html,result" data-user="tutsplus" data-pen-title="Vue Case 2: Flipping Form" class="codepen">See the Pen <a href="https://codepen.io/tutsplus/pen/JeExJr/">Vue Case 2: Flipping Form</a> by Envato Tuts+ (<a href="https://codepen.io/tutsplus">@tutsplus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script src="https://static.codepen.io/assets/embed/ei.js"></script>

## Ví dụ 3: modal

HTML

```html
<div id="app">
  <div v-bind:class="[isShowing ? blurClass : '', clearClass]">
    <p>Lorem ipsum dolor sit amet...</p>
    <button @click="toggleShow">Say Hello</button>
  </div>
  <transition enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut">
    <modal v-if="isShowing" class="modal">
      <button @click="toggleShow">Close</button>
    </modal>
  </transition>
</div>
```

CSS

```css
.clear {
  transition: opacity 1s;
} 
.blur {
  filter: blur(1px);
  opacity: 0.5;
}
```

<iframe height='265' scrolling='no' title='Vue Case 3: Modal Window' src='//codepen.io/tutsplus/embed/mQRvMz/?height=265&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/tutsplus/pen/mQRvMz/'>Vue Case 3: Modal Window</a> by Envato Tuts+ (<a href='https://codepen.io/tutsplus'>@tutsplus</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Ví dụ 4: Todo list

```html
<div>
    <input v-model="newItemText" />
    <button v-on:click="addNewTodo">Add</button>
    <button v-on:click="removeTodo">Remove</button>
      <transition-group name="list" tag="ul">
        <li v-for="task in tasks" v-bind:key="task" >{{ task }}</li>
      </transition-group>
  </div>
```
CSS

```css 
.list-enter-active {
  animation: add-item 1s;
} 
.list-leave-active {
  position: absolute;
  animation: add-item 1s reverse;
} 
.list-move {
  transition: transform 1s;
}
@keyframes add-item {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-10px) skewX(20deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
```

<iframe height='265' scrolling='no' title='Vue Case 4: To Do List' src='//codepen.io/tutsplus/embed/PxWVJL/?height=265&theme-id=0&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/tutsplus/pen/PxWVJL/'>Vue Case 4: To Do List</a> by Envato Tuts+ (<a href='https://codepen.io/tutsplus'>@tutsplus</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Ví dụ https://code.tutsplus.com/tutorials/design-better-ux-with-vuejs-transitions-and-animations--cms-32050
