---
slug: "/2020-06-06-vue-3-co-gi-moi"
date: "2020-06-06"
title: "Vue 3 có gì mới?"
desc: "Điểm mặt một số tính năng mới trong Vue 3"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "vuejs"]
---

## Breaking change

Nếu đang dùng Vue 2 và muốn chuyển lên Vue 3 sử dụng, có một điểm breaking change (không sửa không được, chết hết)

Nếu đang dùng Vue 2, chúng ta `new` một object Vue

```jsx
new Vue({
    el: "#app",
    template: "<div>{{message}}</div>",
    data: { message: "Hello World!" },
})
```

thì Vue 3 chúng ta gọi hàm `Vue.createApp`

```jsx
const app = Vue.createApp({
    template: "<div>{{ message }}</div>",
    data() {
        return {
            message: "Hello World!"
        }
    }
});

app.mount("#app");
```

Điểm cần lưu ý thêm là `data` trong Vue phải luôn là một phương thức thay vì object như trước đây

Việc mount global component cũng sẽ chuyển cho `app` thay vì gắn vào Vue instance như trước

```jsx
// vue 2
Vue.component('my-button', {
    template: '<button @click="updateValue">Click to update!</button>',
    methods: {
       updateValue() {
       	this.$emit('update');
       }, 
    }
})
```

```jsx
// vue 3

const app = Vue.createApp(/* app config */);

app.component('my-button', {
  emits: ["update"],
  template: '<button @click="updateValue">Click to update!</button>',
  methods: {
    updateValue() {
      this.$emit('update');
    },
  },
})

app.mount("#app");
```

Tương tự với Router và Store

```jsx
// vue 2
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(/* store config */);
const router = new VueRouter(/* router config */);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
```

```jsx
// vue 3
const store = createStore(/* store config */);
const router = createRouter(/* router config */);

const app = createApp(/* app config */);
app.use(store);
app.use(router);
app.mount('#app');
```



## Composition API (React Hook phiên bản Vue)

Cái này vai mượn ý tượng của team React quá luôn nha các bạn.

Với Vue 2 khai báo các thuộc tính của component bằng **Option API**

```html
<template>
  <div>
    <h2>List of items:</h2>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <div>
      <label>
        Name:
        <input name="name" v-model="inputValue"/>
      </label>
    </div>
    <button @click="addItem"></button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
      list: [],
    };
  },
  computed: {
    itemsCount() {
      return this.item.list.length();
    },
  },
  methods: {
    addItem() {
      this.list.push(this.inputValue);
      this.inputValue = "";
    },
  },
};
</script>
```

Hạn chế của Option API, logic của component nằm rải rác ở nhiều chỗ trong `computed`, `data`, `methods`, muốn sử dụng lại các logic này cũng khó khăn, dùng `mixins` thì nó lại không rõ ràng.

**Composition API** được giới thiệu để giải quyết vấn đề trên

```html
<template>
  <div>
    <h2>List of items:</h2>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <div>
      <label>
        Name:
        <input name="name" v-model="inputValue"/>
      </label>
    </div>
    <button @click="addItem"></button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        const inputValue = ref('')
        const list = ref([]);
        
        const itemsCount = computed(function() {
            return list.value.length()
        })
        
        function addItem() {
            list.value.push(this.inputValue.value)
            inputValue.value = '';
        }
        
        return {
            inputValue,
            list,
            itemsCount,
            addItem
        }
    }
}
</script>
```

Việc sử dụng Composition API hay Option API là tùy chúng ta, Vue 3 hỗ trợ hết.

Muốn sử dụng lại logic này ở những component khác, viết tách function ở trên ra

```jsx
import { ref, computed } from 'vue';

export const useList = () => {
    const inputValue = ref('')
    const list = ref([]);

    const itemsCount = computed(function() {
        return list.value.length()
    })

    function addItem() {
        list.value.push(this.inputValue.value)
        inputValue.value = '';
    }

    return {
        inputValue,
        list,
        itemsCount,
        addItem
    }
}
```

Sau đó trong component muốn sử dụng

```jsx
export default {
    setup() {
		const {
            inputValue,
            list,
            itemsCount,
            addItem
    	} = useList();
        
        return {
            inputValue,
            list,
            itemsCount,
            addItem
        }
    }
}
```

## Vue Fragment

Hồi xưa chúng ta chỉ được phép nhét giữa `<template/>` một element, giờ nhét mấy cái element cũng được hết

```jsx
<template>
    	<div class="element-1"></div>
       	<div class="element-2"></div>
</template>
```

## Mét nhét component vào chỗ nào trong DOM cũng được

Ngày xưa component khai báo ở đâu thì sẽ được render ở vị trí đó trong DOM, ngày nay, với `<teleport/>` component thì component có thể được render vào ví trí bất kỳ mà chúng ta khai báo

```html
<teleport to="body">
	<div v-if="modalOpen" class="modal">
        <div>
            I'm a teleported modal! 
            (My parent is "body")
            <button @click="modalOpen = false">
                Close
            </button>
        </div>
    </div>
</teleport>
```

## Suspense (lại chôm của React)

Nói chung bạn nào đã biết Suspense React thì Vue nó y chang vậy đó.

Khi bị lỗi, không render được component, Suspense sẽ được *đắp vào* thay thế

```html
<template>
  <Suspense>
    <template #default>
      <div v-for="item in articleList" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </template>
    <template #fallback>
      Articles loading...
    </template>
  </Suspense>
</template>
```

## Đa vũ trụ - à không đa v-model

Ngày xưa, v-modal chỉ được phép sử dụng với một giá trị, ngày nay, v-modal thích xài bao nhiêu thì xài

```html
<template>
	<survey-form v-model:name="name" v-model:age="age"> </survey-form>
</template>

//SurveyForm.vue
<template>
	<div>
		<label>Name: </label>
		<input :value="name" @input="updateName($event.target.value)" />
		<label>Age: </label>
		<input :value="age" @input="updateAge($event.target.value)" />
	</div>
</template>
<script>
export default {
	props: {
		name: String,
		age: Number,
	},
	setup(props, { emit }) {
		const updateName = (value) => {
			emit('update:name', value);
		};
		const updateAge = (value) => {
			emit('update:age', +value);
		};
		return { updateName, updateAge };
	},
};
</script>
```

Một vài nâng cấp không nhìn thấy được như source code dùng TypeScript hoàn toàn, nâng cao tốc độ,

Tham khảo

- https://tsh.io/blog/vue-new-features/
- https://learnvue.co/2020/03/extract-and-reuse-logic-in-the-vue-composition-api/
- https://blog.logrocket.com/new-features-in-vue-3-and-how-to-use-them/