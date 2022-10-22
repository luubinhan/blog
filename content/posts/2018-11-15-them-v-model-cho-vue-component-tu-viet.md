---
slug: "/2018-11-15-them-v-model-cho-vue-component-tu-viet"
date: "2018-11-15"
title: "Hỗ trợ v-model trên Vue component tùy biến"
desc: "Hướng dẫn cách viết một component để có thể dùng v-model"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

Với Vue nó khác với React là data có thể binding *two-way*, không ràng buộc *one-way data flow*, chỉ việc khai báo `v-model` cho dữ liệu nào muốn binding *two-way* là xong, còn nếu binding một chiều thì dùng `v-bind`.

```html
<!--Binding two-way-->
<input v-model="email" />

<script>
export default {
  data() {
    email: 'hello@vuilaptrinh.com'
  }
}
</script>
```

Cách viết `v-model` có thể hiểu là một cách viết tắt của 2 xử lý

1. Bind dữ liệu `:value`
2. Gắn sự kiện xử lý khi `@input`

Phiên bản đầy đủ không rút gọn được viết lại như sau

```html
<input :value="email" @input="e => email = e.target.value" />
```

Tùy theo element, Vue sẽ xử lý khác nhau trên giá trị được emit, nếu như `<input type="radio" />`

```html
<input v-model="email" type="radio" />

Phiên bản đầy đủ
<input :checked="email" @change="e => email = e.target.value" />
```

## `v-model` cho một component chúng ta tự viết

```html
<template>
  <div class="my-custom">
	  <input @input="handleInput" />
  </div>
</template>

<script>
export default {
	props: {
		value
  },
  data() {
    return {
      content: this.value
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

Thêm props `value`, và `emit` event input cho component là chúng ta có thể sử dụng `v-model`

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

