---
slug: "/2019-12-10-huong-dan-su-dung-v-model-tren-component-long-nhau"
date: "2019-12-10"
title: "Sử dụng v-model trên component lồng nhau"
desc: "Cách viết dùng v-model để tự đồng bộ giá trị khi lồng các component"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "vuejs"]
---

Bạn có component nhận vào `prop`, muốn sử dụng `v-model` để nó tự cập nhập giá trị khi có thay đổi

```html
// Address.vue
<template>
    <div>
        <input name="street" v-model="street">
        <input name="city" v-model="city">
        <input name="state" v-model="state">
        <input name="zip" v-model="zip">
    </div>
</template>
<script>
    export default {
        props: ['street', 'city', 'state', 'zip']
    }
</script>
```

Bạn truyền nó vào như thế này, với hy vọng mọi thứ chạy ngon lành

```html
// Form.vue
<template>
    <form>
        <input name="name" v-model="name">
        <input name="email" v-model="email">
        <mailing-address
            :street="address.street"
            :city="address.city"
            :state="address.state"
            :zip="address.zip"
        />
    </form>
</template>
<script>
    import MailingAddress from './Address.vue';
    export default {
        components: { MailingAddress },
        data() {
            return {
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: ''
                }
            }
        }
    }
</script>
```

Nhưng không 😭 nó sẽ thông báo trong console

> “Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. “

Về nguyên tắc, chúng ta ko được thay đổi giá trị truyền vào từ `prop`, nếu không lúc re-render nó sẽ ko còn đúng nữa.

**`v-model` về bản chất nó là gì?**

`v-model` nó làm cho chúng ta 2 việc

1. bind giá trị vào biến `value`
2. bind handle cho sự kiện `v-on:input`.

```jsx
// Form.vue
<template>
    <form>
        <input name="name" v-model="name">
        <input name="email" v-model="email">
        <mailing-address
            :value="address"
            @input="(newAddress) => {address = newAddress}"
        />
    </form>
</template>
<script>
    import MailingAddress from './Address.vue';
    export default {
        components: { MailingAddress },
        data() {
            return {
                name: '',
                email: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: ''
                }
            }
        }
    }
</script>
```



Cập nhập lại component Address của chúng ta

```html
// Address.vue
<template>
    <div>
        <input name="street" v-model="value.street">
        <input name="city" v-model="value.city">
        <input name="state" v-model="value.state">
        <input name="zip" v-model="value.zip">
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Object,
                required: true
            }
        },
        watch: {
            value() {
                this.$emit('input', this.value);
            }
        }
    }
</script>
```



Nếu nó thêm một cấp nữa thì sao? Ví dụ bên trong `Address.vue` chúng ta nhét thêm một component cháu nội của `Form` nữa

```html
// Address.vue
<template>
    <div>
        ...
        <state v-model="value.state" />
</div>
</template>
<script>
    import State from "./State";
    export default {
        components: { State },
        props: {
            value: {
                type: Object,
                required: true
            }
        },
        watch: {
            value() {
                this.$emit('input', this.value);
            }
        }
    }
</script>
```

State component

```html
<template>
    <select v-model="value">
        <option v-for="(state, abbreviation) in states"
                :value="abbreviation"
                v-html="state"
        ></option>
    </select>
</template>
<script type="text/babel">
    export default {
        props: {
            value: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                states: {
                    NY: 'New York',
                    WI: 'Wisconsin'
                    // + rest of the states
                }
            }
        }
    }
</script>
```

Nó sẽ tiếp tục chửi bới chúng ta, vì chúng ta đi thay đổi prop nữa rồi, chúng ta cần đưa nó về `computed`

```js
// State.vue
<template>
    <select v-model="localState">
        <option v-for="(state, abbreviation) in states"
                :value="abbreviation"
                v-html="state"
        ></option>
    </select>
</template>
<script type="text/babel">
    export default {
        props: {
            value: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                states: {
                    NY: 'New York',
                    WI: 'Wisconsin'
                    // + rest of the states
                }
            }
        },
        computed: {
            localState: {
                get() {return this.value},
                set(localState) { this.$emit('input', localState)}
            }
        }
    }
</script>
```

Cách này giống như chúng ta dùng controlled component trong React


* 📜 [Using v-model on Nested Vue Components](https://zaengle.com/blog/using-v-model-on-nested-vue-components)
