---
slug: "/2018-11-11-huong-dan-two-way-data-binding-voi-vue-vuex"
date: "2018-11-11"
title: "Cách làm two-way data binding cho form field trong Vue và Vuex"
desc: "Two-way data binding trong Vue và Vuex làm như thế nào cho đúng mà nhanh"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Sử dụng directive `v-model`, chúng có thể dễ dàng thực hiện two-way data binding cho element, một trong những tính năng rất hay ho mà Vue cung cấp.

```jsx
<template>
	<input v-model="message" />
</template>
<script>
export default {
  data() {
    // thay đổi giá trị của message ở đây
    // hoặc nhập vào input
    // cả 2 dữ liệu này được đồng bộ hóa
    return { message: ''},
  }
}
</script>
```

Tuy nhiên khi làm những ứng dụng lớn, chúng ta sẽ có những nhu cầu cao hơn, cần đến Vuex.

Nếu đưa toàn bộ dữ liệu vào vuex store, chúng ta sẽ sửa lại

```jsx
<template>
  <input v-model="form.message" />
</template>
<script>
export default {
  data() {
    return {
      // LƯU Ý đây là cách làm SAI
      form: this.$store.state.form
    };
  }
}
</script>

// Setup store

export default new Vuex.Store({
  strict: true,
  state: {
    form: { message: ''}
  }
})
```

Khi xem console trên trên trình duyệt nó sẽ quăng thông báo

```
Error: [vuex] Do not mutate vuex store state outside mutation handlers
```

Bởi vì state của store là **mutation**, tức không được trực tiếp sửa, mà phải thông qua các hàm mutations

Theo như <a href="https://vuex.vuejs.org/guide/forms.html" target="_blank" rel="noopener noreferrer">tài liệu chính thức của Vuex</a>, đây là cách chúng ta bind dữ liệu trên form

```jsx
<template>
  <input v-model="firstName" />
  <input v-model="lastName" />
  <input v-model="message" />
</template>
<script>
export default {
  computed: {
    firstName: {
      get() {
        return this.$store.state.form.firstName;
      },
      set(value) {
        this.$store.commit('updateFirstName', value);
      }
    },
    lastName: {
      get() {
        return this.$store.state.form.lastName;
      },
      set(value) {
        this.$store.commit('updateLastName', value);
      }
    },
    message: {
      get() {
        return this.$store.state.form.message;
      },
      set(value) {
        this.$store.commit('updateMessage', value);
      },
    }
  }
}
</script>
```

Tuy nhiên là chúng ta lặp lại một số code, code sẽ rất dài nếu có quá nhiều fields.

Chúng ta có thể dùng thêm <a href="https://github.com/maoberlehner/vuex-map-fields" target="_blank" rel="noopener noreferrer">vuex-map-fields</a>, refactor lại code ở trên

```jsx
<template>
	<input v-model="firstName"/>
  <input v-model="lastName"/>
  <input v-model="message"/>
</template>
<script>
import {mapFields} from 'vuex-map-fields';

export default {
  computed: {
    ...mapFields([
      'form.firstName',
      'form.lastName',
      'form.message',
    ])
  }
}
</script>
```

Ngoài ra `vuex-map-fields` cũng cung cấp các hàm `getters` và hàm `mutations` cho dữ liệu

```jsx
import { getField, updateField } from 'vuex-map-fields';

export default new Vuex.Store({
  strict: true,
  state: {
    form: {
      firstName: '',
      lastName: '',
      message: '',
    }
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  }
})
```

Mọi thứ cứ để `vuex-map-fields` lo! Bạn không cần tự viết mấy hàm getters và mutations đơn giản quá làm gì, trừ trường hợp bạn muốn bổ sung một số logic đặc biệt

<a href="https://markus.oberlehner.net/blog/form-fields-two-way-data-binding-and-vuex/" target="_blank" rel="noopener noreferrer">Bài giới thiệu của tác giả library</a>

