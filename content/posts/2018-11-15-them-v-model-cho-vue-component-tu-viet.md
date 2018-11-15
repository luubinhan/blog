---
slug: "/2018-11-15-them-v-model-cho-vue-component-tu-viet"
date: "2018-11-15"
title: "Hổ trợ v-model trên một custom Vue component"
desc: "Hướng dẫn cách viết một component để có thể dùng v-model"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

Với Vue nó khác với React là data có thể binding two-way, không ràng buộc one-way data flow, đơn giản là khai báo `v-model` cho dữ liệu nào muốn đồng bộ hóa, còn nếu binding một chiều thì dùng `v-bind`.

```html
<input v-model="email" />
// hoặc có thể viết
<input :value="email" @input="e => email = e.target.balue" />
```

<div class="note">Nghĩa là để <code>v-model</code> có thể chạy được, element hoặc component gắn nó phải nhận vào một prop (mặc định là <code>value</code>) và emit một event (mặc định là <code>input</code>)</div>

Tùy thuộc vào element, Vue sẽ dùng xử lý dữ liệu được emit, trên input type là radio , nó sẽ dùng prop checked và event là change.

## Thêm `v-model` cho một component chúng ta tự viết

Chúng ta sẽ làm một component sử dụng `<input />`

```jsx
<template>
	<input @input=”handleInput” />
</template>
<script>
export default {
	name: "basic-input",
	props: {
		value
  },
  data() {
    return {
      Content: this.value
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content)
    }
  }
}
</script>
```

Chỉ cần thêm props `value` cho component là chúng ta có thể sử dụng `v-model` trên `basic-input`

```jsx
<basic-input v-model="email" />
```

## Tùy biến `v-model` prop và event

Nếu nhu cầu cao hơn, chúng ta có thể không muốn dùng đến các event, prop mặc định để `v-model` chạy được, để làm được việc ấy, thêm một property cho component tên `model`

```jsx
export default {
	props: {
		tabilu
	},
	model: {
	  prop: "tabilu",
    event: "blur"
  },
  methods: {
    handleInput (value) {
      this.$emit("blur", value);
    }
  }
}
```

Khi Vue nó gặp component như vầy

```html
<basic-input v-model="email" />
```

Nó sẽ tự độ convert sang

```html
<basic-input :tabilu="email" @blur="e => email = e.target.value" />
```

<a href="https://scotch.io/tutorials/add-v-model-support-to-custom-vuejs-component" target="_blank" rel="noopener noreferrer">Add `v-model` Support to Custom Vue.js Component</a>

