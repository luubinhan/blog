---
slug: "/2019-07-21-function-component-trong-vue"
date: "2019-07-21"
title: "Function Component trong Vue"
desc: "Không được xuất chúng như là function component của React, nên function component trong Vue không có nhiều người để ý. Hy vọng tương lai nó sẽ được nâng cấp để cạnh tranh với bên React đang quảng bá quá rầm rộ."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs", "hoc-thuat"]
---

<!-- TOC -->

- [Function Component trong Vue là gì](#Function-Component-trong-Vue-l%C3%A0-g%C3%AC)
- [Truy xuất dữ liệu](#Truy-xu%E1%BA%A5t-d%E1%BB%AF-li%E1%BB%87u)
- [Attribute](#Attribute)
- [Kết](#K%E1%BA%BFt)

<!-- /TOC -->

## Function Component trong Vue là gì

Component **không** chứa `state` và không có `instance`, không thể tham chiếu đến chính nó bằng từ khóa `this`

```jsx{2}
// dùng vue template
<template functional>
	<div>...</div>
</template>
```

```jsx{4}
// dùng render function
<script>
export default {
	functional: true,

	render(h) {
		//...
	}
}
</script>
```

## Truy xuất dữ liệu

Nếu không có `state` hay `instance` vậy làm sao chúng ta có thể tham chiếu đến dữ liệu và phương thức? Vue cung cấp tham số `context` bên dưới hàm render để chúng ta truy xuất: **prop, children, slot, scopedSlot, data, parent, listener, injection**

```jsx{3}
<template functional>
	<div>
		{{ props.someProp }}
	</div>
</template>

<script>
export default {
	props: {
		someProp: String
	}
}
</script>
```

```jsx
<script>
export default {
	functional: true,

	props: {
		someProp: String
	},

	render(h, ctx) {
		const someProp = ctx.props.someProp
	}
}
</script>
```

## Attribute

**attribute không được truyền xuống tự động, ví dụ như `class` và `id` mặc định bị bỏ qua**

```jsx
<!-- src/components/ArticleTeaser.vue -->
<template>
	<UiHeadline
		id="hyphenCase(article.title)"
		class="ArticleTeaser__title"
		@click="readMore"
	>	
		{{ article.title }}
	</UiHeadline>
</template>
```

```jsx
<!-- src/components/UiHeadline.vue -->
<template functional>
	<h1>
		<slot />
	</h1>
</template>
```

`id`, `class`, kể cả `@click` cũng không được truyền xuống. Nếu không mở source code đó ai mà biết được tại sao truyền các attribute này xuống mà nó không chạy.

Hên là có cách giải quyết, nếu bạn đã viết function component thì bạn phải chịu trách nhiệm bổ sung cách giải quyết cho nó

```jsx{3,4}
<template functional>
	<h1
		v-bind="data.attrs"
		v-on="listeners"
	>
		<slot />
	</h1>
</template>
```

Tuy nhiên, chưa xong hết được, vì `class` nó lại không nằm trong `data.attrs`

Bạn phải thông qua `data.class`/ `data.staticClass` và `data.style`/`data.staticStyle`

```jsx
<!-- Đưa vào `data.class` -->
<UiHeadline :class="['my-class']"/>

<!-- Đưa vào `data.staticClass` -->
<UiHeadline class="my-class"/>
```

```jsx{3,4}
<template functional>
	<h1
		:class="[data.class, data.staticClass]"
		:style="[data.style, data.staticStyle]"
		v-bind="data.attrs"
		v-on="listeners"
	>
		<slot />
	</h1>
</template>
```

## Kết

Thế quái nào chúng ta lại muốn viết function component, khi mà ta phải tự xử nhiều thứ quá hiển nhiên như vậy.

Anh Austin Gil ảnh có đo, thì thấy [function component nó nhanh hơn chút xíu so với một component có state](https://codesandbox.io/s/vue-stateful-vs-functional-yterr). Cái này theo bên React họ lại bảo bây giờ các js engine của trình duyệt nó handle dạng function và class gần như không khác nhiều 

<a target="_blank" rel="noopener noreferrer" href="https://stegosource.com/vue-js-functional-components-what-why-and-when/">Vue.js functional components: What, Why, and When?</a>

<a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/working-with-functional-vue-components/">Working With Functional Vue.js Components</a>
