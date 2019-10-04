---
slug: "/2019-10-04-huong-dan-viet-code-vue-chuan"
date: "2019-10-04"
title: "Bộ guide để viết code dành riêng cho Vue"
desc: "Được để xuất chính thức vởi Vue team"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

Trước tiên cần thống nhất quan điểm thế này, **ko phải guide nào cũng phù hợp cho mọi team**, mọi dự án, nến không nhất thiết phải áp dụng một cách *cứng nhắc* trong mọi trường hợp
 
## Cấp độ: Siêu cần thiết, giúp tránh được nhiều lỗi  

### Tên component nên là 2 chữ  

Trừ `App` component và các component có sẵn trong Vue như `<transition/>`, `<component />`  

Để tránh trùng các thẻ html, có thể sau này, HTML sẽ bổ sung thêm nhiều thẻ mới, thẻ HTML sẽ là 1 chữ  

```js
👎 Không chuẩn
Vue.component('todo', {
	//...
})

export default {
	name: 'Todo'
}

👍 Chuẩn cơm mẹ nấu
Vue.component('todo-item', {
	// ...
})

export default {
	name: 'TodoItem',
}

```

### `data` phải là một function
  

`data` phải là function trả về object. Nếu là một object, tất cả các instance component sẽ cùng trỏ tới một dữ liệu `data`.

```js
👎 Không chuẩn
export default{
	data: {
		foo: 'bar'
	}
}  

👍 Chuẩn cơm mẹ nấu
export default {
	data() {
		foo: 'bar'
	}
}
```

Riêng với thằng `root` component, nó chỉ có một, nên có thể là object
  
### Khai báo prop càng chi tiết càng tốt  

Ít nhất là có `type`, nếu được càng chi tiết chừng nào tốt chừng đó

```js
👎 Không chuẩn
props: {
	status: String
}

👍 Chuẩn cơm mẹ nấu
props: {
	status: {
		type: String,
		required: true,
		validator: function (value) {
			return [
				'syncing',
				'synced',
				'version-conflict',
				'error'
			].indexOf(value) !== -1
		}
	}
}
```  

### Luôn cung cấp `key` cho `v-for`  

Có luôn cái video này rồi, bạn [xem ở đây]()  

```html
👎 Không chuẩn
<ul>
	<li v-for="todo in todos">
		{{ todo.text }}
	</li>
</ul> 

👍 Chuẩn cơm mẹ nấu
<ul>
	<li
		v-for="todo in todos"
		:key="todo.id"
	>
		{{ todo.text }}
	</li>
</ul>
```

### Không bao giờ dùng `v-for` chung với `v-if`

Vì `v-for` được ưu tiên cao hơn `v-if`, nghĩa là nếu viết

```html
👎 Không chuẩn

<ul>
	<li
		v-for="user in users"
		v-if="user.isActive"
		:key="user.id"
	>
		{{ user.name }}
	</li>
</ul>
```

Nó sẽ chạy như thế này  

```js
this.users.map(function (user) {
	if (user.isActive) {
		return user.name
	}
})
```

Nghĩa là cứ mỗi lần re-render chúng ta đều loop qua tất cả các phần tử trong mảng, trong khi giá trị `isActive` này không đổi, nó ko tối ưu

Nên filter trước các user có giá trị `isActive = true` trước 

```js
👍 Chuẩn cơm mẹ nấu
computed: {
	activeUsers: function () {
		return this.users.filter(function (user) {
			return user.isActive
		})
	}
}
```  

### CSS scoped trên từng component

Những style nào dùng global có thể đưa vào `App` component, còn trong từng component, luôn dùng kiểu `scoped`

Tuy nhiên nếu bạn đang làm 1 thư viện component, để dùng tới dùng lui, hay đưa lên npm cho người khác xài, nên dùng cùng css class bình thường, không có scoped, người khác sử dụng có thể dễ override lại nếu cần

```html
👎 Không chuẩn
<template>
	<button class="btn btn-close">X</button>
</template>

<style>
	.btn-close {
		background-color: red;
	}
</style>

👍 Chuẩn cơm mẹ nấu
<template>
	<button class="button button-close">X</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
	border: none;
	border-radius: 2px;
} 

.button-close {
	background-color: red;
}
</style>
```

Dùng BEM khi viết thư viện component

```html
<template>
	<button class="c-Button c-Button--close">X</button>
</template>

<!-- Using the BEM convention -->
<style>
.c-Button {
	border: none;
	border-radius: 2px;
}

.c-Button--close {
	background-color: red;
}
</style>
``` 

### Private  

Sử dụng `module` scope cho các function muốn private. Nếu không thể, luôn dùng tiền tố `$_` trước các property private trong plugin, mixin,... và thêm luôn tên plugin để tránh bị conflict với các plugin khác ( `$_yourPluginName_`)

```js
👎 Không chuẩn
var myMixin = {
	// ...
	methods: {
		update: function () {
			// ...
		},
		_update: function () {
			// ...
		},
		$update: function () {
			// ...
		}
		$_update: function () {
			// ...
		}
	}
}

👍 Chuẩn cơm mẹ nấu
var myMixin = {
	methods: {
		$_myMixin_update: function () { }
	}
}
```  

## Cấp độ: Cực kỳ khuyến khích  

Một component là một file

```js
👎 Chuẩn cơm mẹ nấu
Vue.component('TodoList', {
	// ...
})

Vue.component('TodoItem', {
	// ...
})

👍 Chuẩn cơm mẹ nấu
components/
|- TodoList.vue
|- TodoItem.vue
```  

### File name luôn là một trong 2 dạng PascalCase hoặc kebab-case

```js
👎 Không chuẩn
components/
|- mycomponent.vue
components/
|- myComponent.vue  

👍 Chuẩn cơm mẹ nấu
components/
|- MyComponent.vue
components/
|- my-component.vue
```

### Base component

Những component được dùng với mục đích đồng nhất styling, layout được gọi là base component, nó có thể chỉ chứa
-   HTML    
-   UI component từ các thư viện khác    
-   Các base component khác

Và không được chứa `state` của Vuex store

Tên nên được đặt theo kiểu `BaseButton`, `BaseTable`. Lợi ích của việc này
-   Khi mở trong editor, nó được liệt kê gần nhau, dễ tìm, dễ phân loại 
-   Tên component sẽ luôn có 2 chữ như đã nói ở trên
-   Các component này được sử dụng rất thường xuyên, nên có thể dùng prefix để đăng ký một lần một cho tất cả component
    
```js
var requireComponent = require.context("./src", true, /^Base[A-Z]/)
requireComponent.keys().forEach(function (fileName) {
var baseComponentConfig = requireComponent(fileName)
baseComponentConfig = baseComponentConfig.default || baseComponentConfig
var baseComponentName = baseComponentConfig.name || (
	fileName
	.replace(/^.+\//, '')
	.replace(/\.\w+$/, '')
)
Vue.component(baseComponentName, baseComponentConfig)
})
```

```js
👎 Không chuẩn
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue 

👍 Chuẩn cơm mẹ nấu
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue  

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

### Component chỉ có một instance duy nhất

Với những component chỉ xuất hiện một lần trên 1 trang, không bao giờ nhận prop. Chúng ta có một cách đặt tên riêng, thêm tiền tố `The`

```js
👎 Không chuẩn
components/
|- Heading.vue
|- MySidebar.vue

👍 Chuẩn cơm mẹ nấu
components/
|- TheHeading.vue
|- TheSidebar.vue
```

### Component luôn gắn chặt vào một component cha

Nếu một component con, luôn đi cùng một component cha nhất định, thêm tên component cha làm tiền tố

Một số người sẽ dùng cách đưa các component này vào trong thư mục con

```js
components/
|- TodoList/
|- Item/
|- index.vue
|- Button.vue
|- index.vue

hoặc 

components/
|- TodoList/
|- Item/
|- Button.vue
|- Item.vue
|- TodoList.vue
```

Cách này ko được khuyến khích, vì nó có quá nhiều trùng tên, việc chuyển qua lại giữa các file này trong editor rất khó chịu, vì ko biết đang mở file nào, nhiều thư mục như vậy, làm việc duyệt qua các component này cũng mệt

```js
👎 Không chuẩn
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue  

👍 Chuẩn cơm mẹ nấu
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue 

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```
  

### Sử dụng kebab-case trong DOM template

Tên file của component thì nên viết dạng PascalCase, còn trong template nên dùng kebab-case

```html
👎 Không chuẩn
<!-- In single-file components and string templates -->
<mycomponent/>

<!-- In single-file components and string templates -->
<myComponent/>  

<!-- In DOM templates -->
<MyComponent></MyComponent>

👍 Chuẩn cơm mẹ nấu
components/
<!-- In single-file components and string templates -->
<MyComponent/>

<!-- In DOM templates -->
<my-component></my-component>
 
OR 

<!-- Everywhere -->
<my-component></my-component>
```

```js
👎 Không chuẩn
Vue.component('myComponent', {
	// ...
})

import myComponent from './MyComponent.vue'
export default {
	name: 'myComponent',
	// ...
}

export default {
	name: 'my-component',
	// ...
}

👍 Chuẩn cơm mẹ nấu
components/
Vue.component('MyComponent', {
	// ...
}) 

Vue.component('my-component', {
	// ...
})

import MyComponent from './MyComponent.vue'
export default {
	name: 'MyComponent',
	// ...
}
```

### Đặt tên prop

Dùng camelCase lúc khai báo, kebab-case trong template

```js
👎 Không chuẩn
props: {
	'greeting-text': String
}

<WelcomeMessage greetingText="hi"/>

👍 Chuẩn cơm mẹ nấu
props: {
	greetingText: String
}
	
<WelcomeMessage greeting-text="hi"/>
```

[https://vuejs.org/v2/style-guide/](https://vuejs.org/v2/style-guide/)