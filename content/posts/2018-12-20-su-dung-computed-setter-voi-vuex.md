---
slug: "/2018-12-20-su-dung-computed-setter-voi-vuex"
date: "2018-12-20"
title: "Viết component gọn gàng hơn với Computed Setter"
desc: "Một gợi ý để sử dụng computed setter với các dữ liệu bên ngoài component như Vuex"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---


Một trong những khái niệm quan trọng của Vue là computed property.

```js
data() {
    return {
        firstName:  'John',
        lastName: 'Doe'
    }
},
computed: {
    fullName () {
        return `${this.firstName} ${this.lastName}`;
    }
}
```

`fullName` được gọi là một computed getter. Chúng ta có thể khai báo một cách đầy đủ hơn

```js
computed: {
    fullName: {
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(fullName) {
            this.firstName = fullName.split(' ')[0];
            this.lastName = fullName.split(' ')[1];
        }
    }
}
```

Từ giờ, khi chúng ta đặt lại giá trị `fullName` ( `this.fullName = 'Example'`), 2 giá trị `firstName` và `lastName` sẽ cập nhập theo.

Giờ lấy ví dụ sử dụng thực tế hơn với Vuex. Chúng ta lấy một số dữ liệu từ store để sử dụng trong component. Nếu ko dùng computed setter, chúng ta sẽ viết như sau

```jsx
<template>
    <div>
        <input
            :value="text"
            type="text"
            @input="onInput"
        />
        <button @click="convertToUpperCase">To UpperCase</button
    </div>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onInput (e) {
            this.$store.dispatch('CHANGE_TEXT', e.target.value);
        },
        convertToUpperCase() {
            this.$store.dispatch('CHANGE_TEXT', this.text.toUpperCase())
        }
    }
}
</script>
```

Dùng Computed Setter sẽ gọn gàng hơn.

```js
<template>
    <div>
        <input
            v-model="textValue"
            type="text"
        />
        <button @click="convertToUpperCase">To UpperCase</button
    </div>
</template>

<script>
export default {
    props: ['text'],
    computed: {
        textValue: {
            get () {
                return this.text;
            },
            set (value) {
                this.$store.dispatch('CHANGE_TEXT', value);
            }
        }
    },
    methods: {
        convertToUpperCase() {
            this.textValue = this.textValue.toUpperCase()
        }
    }
}
</script>
```

1. Update dữ liệu bên ngoài component đơn giản hơn. Thay thế `:value`, `@input`, bằng `v-model`. Thay đổi giá trị cũng đơn giản hơn, như trong hàm `convertToUpperCase`
2. Chúng ta chỉ gọi `dispatch` ở một chổ duy nhất khi cần thay đổi giá trị


<a target="_blank" rel="noopener noreferrer" href="https://medium.com/@Taha_Shashtari/simplify-your-components-with-computed-setters-2f687f193fb0">Simplify Your Vue Components with Computed Setters</a>
