---
slug: "/2021-04-04-hoi-dap-voi-vue"
date: "2021-04-04"
title: "Hỏi đáp cùng Vue"
desc: "Một số khái niệm trong Vue cần nắm"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs", "hoc-thuat"]
---

<!-- TOC -->

- [Function component là gì?](#function-component-là-gì)
- [Tại sao data trong Vue component phải là 1 function](#tại-sao-data-trong-vue-component-phải-là-1-function)
- [`v-if` và `v-show` khác nhau như thế nào](#v-if-và-v-show-khác-nhau-như-thế-nào)
- [Default value của prop là array hoặc object](#default-value-của-prop-là-array-hoặc-object)
- [Mục đích của `key` trong Vue Component](#mục-đích-của-key-trong-vue-component)
- [10. Vì sao không sử dụng `v-if` và `v-for` cùng lúc?](#10-vì-sao-không-sử-dụng-v-if-và-v-for-cùng-lúc)
- [19. Các event modifier cung cấp bởi Vue](#19-các-event-modifier-cung-cấp-bởi-vue)
- [20. Một số key modifier cung cấp sẵn](#20-một-số-key-modifier-cung-cấp-sẵn)
- [25. Modifier trên model](#25-modifier-trên-model)
- [54 Plugin trong Vue là gì và dùng để làm gì](#54-plugin-trong-vue-là-gì-và-dùng-để-làm-gì)
- [68 trường hợp nên sử dụng render function mà không dùng kiểu viết template](#68-trường-hợp-nên-sử-dụng-render-function-mà-không-dùng-kiểu-viết-template)
- [80. Mục đích của thẻ `keep-alive`](#80-mục-đích-của-thẻ-keep-alive)
- [82. Cấu trúc một async component](#82-cấu-trúc-một-async-component)
- [83 inline template](#83-inline-template)
- [84 x template](#84-x-template)
- [96. Mục đích của `once`](#96-mục-đích-của-once)
- [99. Mục đích của `renderError`](#99-mục-đích-của-rendererror)
- [200 nextTick là gì](#200-nexttick-là-gì)
- [95 Làm sao để force update](#95-làm-sao-để-force-update)

<!-- /TOC -->

## Function component là gì?

Function component là một component với đặc điểm:

1. **Stateless**: không chứa state bên trong nó
2. **Instanceless**: không có instance, nghĩa là không có từ khóa `this`

## Tại sao data trong Vue component phải là 1 function

```jsx title="Tại sao không thể viết?"
data: {
	message: 'here data' 😠
}
```

```jsx title="bắt buộc phải là function return data"
data() {
	return {
		message: 'here data' 👍
	}
}
```

Theo tài liệu trên trang của Vue, nếu khai báo `data` là 1 object, các `instance` của 1 component sẽ trỏ đến cùng một `data`

> Việc làm này là với mục đích tiết kiệm bộ nhớ.

Nếu mỗi component là một object độc lập hoàn toàn với nhau, khi component được khởi tạo, tất cả các phương thức và dữ liệu được khởi tạo theo.

Vue cho phép các dữ liệu trên component hoàn toàn độc lập, còn những thứ như `method`, ``computed`, `lifecycle hook` được tạo và lưu một lần duy nhất.

## `v-if` và `v-show` khác nhau như thế nào

`v-if` không render DOM, `v-show` có render nhưng dùng css để ẩn đi, dùng `v-show` để tối ưu vì không cần update DOM liên tục.

## Khai báo default value của `prop` là `array` hoặc `object`

```js
props: {
	arr: {
		default: [],
		type: Array
	}
}
```

☠️ No no đừng viết vậy nhé

Tất cả ``instance` sẽ cùng *reference* tới một prop `arr`


```js title="Cách viết đúng"
props: {
  arr: {
    type: Array,
    default: function () { return [] }
  }
}
```

viết kiểu ES6

```js
props: {
  arr: {
    type: Array,
    default: () => []
  }
}
```

## Mục đích của `key` trong Vue Component

Để tối ưu, Vue tái sử dụng khi có thể, tránh khởi tạo component mọi lúc. Việc này dẫn đến một vài bug trong tính huống như bên dưới

```jsx
<template v-if="toggle">
	<input placeholder="Enter your name" />
</template>
<template v-else>
	<input placeholder="Enter your name" />
</template>
```

Nếu không có `key`, Vue không tạo ra 2 `<input/>`, mà dùng cùng 1 `<input/>`, khi giá trị `toggle` chuyển từ `true` sang `false` và ngược lại, nếu input này đang có giá trị nó sẽ không bị thay đổi.

```jsx title="Viết lại cho đúng"
<template v-if="toggle">
	<input placeholder="Enter your name" key="toggle-true" />
</template>
<template v-else>
	<input placeholder="Enter your name" key="toggle-false" />
</template>
```

## Vì sao không sử dụng `v-if` và `v-for` cùng lúc?

Vì `v-for` có thứ tự ưu tiên cao hơn `v-if`, nên có thể bị bug khi dùng chung.

## Các `event modifier` cung cấp bởi Vue

Trong javascript cung cấp các modifier `event.preventDefault()`, `event.stopPropagation()` trong đối tượng `event`. Vue thì có thêm các modifier bổ sung

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

Ví dụ

```jsx
<button @click.stop="callHandler"></button>
```

## Một số key modifier cung cấp sẵn

Vue hỗ trợ các key modifier để lắng nghe sự kiện bàn phím trên `v-on`

```html
<input v-on:keyup.13="show" />
```

Khi ấn phím **Enter** (key code = 13), nó sẽ chạy hàm `show`. Các phím có tên hay dùng

```bash
.enter
.tab
.delete
.esc
.space
.up
.down
.up
.left
.right
```

Ví dụ sử dụng

```html
<input v-on:keyup.enter="submit" />
```

Và có luôn modifier cho chuột

```bash
.left
.right
.middle
```

## Modifier trên model

- **lazy**: thay vì change ngay lập tức, chỉ change sau một khoản thời gian delay

```html
<input v-model.lazy="msg"/>
```

- **number** chuyển giá trị sang dạng số 

```html
<input v-model.number="age" type="number" />
```

- **trim** cắt bỏ khoảng trắng ở đầu và ở cuối

```html
<input v-model.trim='msg' />
```

## Plugin trong Vue là gì và dùng để làm gì

Plugin sẽ cho phép đăng ký các function ở scope global, các function được nói đến có thể là

- `directive`, `filter`, `transition`
- `methods`, `properties`
- `mixin`
- Dùng Vue.prototype để "nhét" thêm một số phương thức global, ví dụ `vm.$router`

Để tạo một plugin

```js
MyPlugin.install = function (Vue, options) {
	// 1. global method, property
	Vue.myGlobalMethod = function() { }

	// 2. global asset
	Vue.directive('my-directive', {
		bind (el, binding, vnode, oldNode) { }
	})

	// 3. "Nhét" (inject) một trên toàn bộ component
	Vue.mixin({
		created: function() {

		}
	})

	//4. Một phương thức global
	Vue.prototype.$myMethod = function (methodOptions) { }
}
```

Sau đó khai báo với Vue sử dụng plugin này

```js
Vue.use(MyPlugin)

new Vue({ ... })
```

## Trường hợp nên sử dụng render function mà không dùng kiểu viết template

Như tạo component động dựa trên input hoặc giá trị slot

## Mục đích của thẻ `keep-alive`

Là một component dùng để giữ state và tránh việc re-render. Khi component trong trạng thái inactive nó sẽ cache lại chứ không destroy

```html
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```

## 82. Cấu trúc một async component

Vue có sẵn một factory function để **lazy load** component, được gọi với tên async component

```js
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
	// indicator để biết load xong chưa
  loading: LoadingComponent,
	// nếu load bị lỗi
  error: ErrorComponent,
	// mặc định 200ms, thời gian delay
  delay: 200,
	// mặc định là không có giới hạn, sau thời gian này, ErrorComponent sẽ hiển thị
  timeout: 3000
})
```

## x template

Cho phép chúng ta có thể định nghĩa một template bằng thẻ `script`, chỉ cần thêm vào `text/x-template`

```html
<script type="text/x-template" id="script-template">
	<div>vuilaptrinh.com</div>
</script>
```

```js
Vue.component(`x-template-example`, {
	template: '#script-template'
})
```

## Mục đích của `once`

Nếu muốn render **rất nhiều nội dung tĩnh**, chúng ta chỉ cần thực hiện **một lần** và sau đó cache lại kết quả này.

```jsx
<div v-once>
	<h1>vuilaptrinh.com</h1>
</div>
```

## Mục đích của `renderError`

Khi gọi hàm `render` có phát sinh lỗi, hàm `renderError` sẽ được gọi

```jsx
render(h) {
	throw new Error('An error')
},
renderError(h, err) {
	return h( 'div', {style: { color: 'red' }}, err.stack )
}
```

## `nextTick` là gì

Hàm `nextTick()` cho phép chạy một hàm khác sau khi dữ liệu được set và DOM đã cập nhập. Như ví dụ sau, nó giống như khi gọi setTimeout

```js
// thay đổi dữ liệu
vm.msg = 'vuilaptrinh'
// DOM chưa update
Vue.nextTick(function () {
	// DOM đã update
})

Vue.nextTick()
	.then(function () {
		// DOM đã update
	})
```

## Làm sao để force update

Trường hợp phải force update rất hiếm xảy ra. Nhưng nếu muốn chúng ta có thể gọi `vm.$forceUpdate()` để ép buộc re-render
