---
slug: "/2019-08-03-huong-dan-su-dung-slot-trong-vuejs"
date: "2019-08-03"
title: "Sử dụng Slot trong Vue"
desc: "Để tái sử dụng component trong Vue mà không biết tới slot thì quá thiếu sót. Một vài ví dụ để bạn sử dụng slot nhiều hơn."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [Slot là gì](#slot-l%c3%a0-g%c3%ac)
- [Scope](#scope)
- [Ví dụ để sử dụng làm modal](#v%c3%ad-d%e1%bb%a5-%c4%91%e1%bb%83-s%e1%bb%ad-d%e1%bb%a5ng-l%c3%a0m-modal)
- [Component không render gì cả](#component-kh%c3%b4ng-render-g%c3%ac-c%e1%ba%a3)

<!-- /TOC -->

## Slot là gì

Trong React không có vụ này, vì bạn chỉ có một lựa chọn là `this.props.children` để định vị trí component con nằm trong component cha. Với Vue, bạn không chỉ có một mà rất nhiều chỗ để đặt component con, định vị trí nó bằng các `slot`

```html
// frame.vue
<template>
	<div>
		<slot></slot>
	</div>
</template>
```

Slot ở trên không có tên, được xem là `slot` mặc định, chỉ việc đặt component con ở giữa là được

```html
// app.vue
<template>
	<frame>
		vuilaptrinh.com
	</frame>
</template>
```

Nếu là `slot` có đặt tên

```html
// frame.vue
<template>
	<div>
		<header><slot name='header'>Title mặc định</slot></header>
		<slot>Nội dung mặc định nếu không truyền gì hết</slot>
	</div>
</template>
```

Cú pháp sử dụng không thể dễ hơn `v-slot:tên của slot` khi muốn đặt nó vào vị trí đã khai báo tên đó

```html
// app.vue
<template>
  <titled-frame>
    <template v-slot:header>
    	luckyluu
    </template>
    vuilaptrinh.com
  </titled-frame>
</template>
```

## Scope

Một điều cần biết là có thể truyền **dữ liệu** / **function** xuống children thông qua slot

```jsx
```

Để ý chỗ chúng ta dùng `v-bind:user="user"` , chúng ta đang *ném* biến user xuống cho component con

Để lấy được giá trị này

```jsx
// current-user.vue
<template>
	<span>
		<slot :user="user">
			{{ user.lastName }}
		</slot>
	</span>
</template>

<script>
export default {
	data() {
		return {
			user: ...
		}
	}
}
</script>
```

Mặc định nó sẽ dùng `user.lastName` khai báo của component, nếu chúng ta truyền vào thì nó dùng giá trị nhận được

```html
// app.vue
<template>
	<current-user>
		<template v-slot:default="slotProps">
			{{ slotProps.user.firstName }}
		</template>
	</current-user>
</template>

<script>
export default {
	data() {
		return {
			slotProps: ...
		}
	}
}
</script>
```

Nếu là default slot, có viết gọn là `v-slot="slotProps"` (hiển nhiên, slotProps không phải là tên bắt buộc), hoặc bỏ luôn `<template/>`

```jsx
// app.vue
<template>
	<current-user>
		<template v-slot="{user}">
			{{ user.firstName }}
		</template>
	</current-user>
</template>

<script>
export default {
	data() {
		return {
			user: {
			}
		}
	}
}
</script>
```

Chúng ta có thể bind nhiều giá trị.
Cách viết tắt cho v-slot là **`#`**, nên thay vì viết `v-slot:header="data"` có thể viết `#header="data"` 

## Ví dụ để sử dụng làm modal

Lấy structure của bootstrap nhé, chúng ta sẽ cho Modal component có 3 chỗ có thể thay đổi

```html{7,13,16}
<!-- my-modal.vue -->
<template>
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</div>
</template>
```

Sử dụng component model này như vầy

```html
<template>
  <my-modal>
    <!-- kiểu viết tắt của `v-slot` là # -->
    <template #header>
      <h5>Awesome Interruption!</h5>
    </template>
    <template #body>
      <p>Say something....</p>
    </template>
    <template #footer>
      <em>Ahihi</em>
    </template>
  </my-modal>
</template>
```

Thêm một nâng cấp cho component này nữa, mặc định khi click close, sẻ gọi đóng modal, chúng ta thêm `slot` để user truyền vào một function, muốn làm gì thì làm khi click nút close.

```jsx{16,27}
<!-- my-modal.vue -->
<template>
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer" :closeModal="closeModal"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  //...
  methods: {
    closeModal () {
      // 
 }
  }
}
</script>
```

Chúng ta có thể truyền hàm `closeModal` từ instance

```html
<template #footer="{closeModal}">
	<button @click="closeModal">
		I'm here
	</button>
</template>
```

## Component không render gì cả

Một component trong Vue có thể không render bất cứ gì cả, nếu chỉ đơn giản là chứa các function

```jsx
<template>
	<transition name="fade" v-bind="$attrs" v-on="$listeners">
		<slot></slot>
	</transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}	
</style>
```

Một component để làm transition như vậy không render html. Nó chỉ bổ sung hiệu ứng cho component.

Code này lấy ví dụ từ bài [Creating Reusable Transitions in Vue](https://vuejsdevelopers.com/2018/02/26/vue-js-reusable-transitions/)

Một ví dụ khác, chúng ta tạo một component, nó sẽ dựa vào giá trị của Promise: *pending, resolve, fail* để lựa chọn component hiển thị

```jsx
<!-- promised.vue -->
<template>
	<span>
		<slot name="rejected" v-if="error" :error="error"></slot>
		<slot name="resolved" v-if="resolved" :data="data"></slot>
		<slot name="pending" v-else></slot>
	</span>
</template>

<script>
<!-- promised.vue -->
<template>
	<span>
		<slot name="rejected" v-if="error" :error="error"></slot>
		<slot name="resolved" v-if="resolved" :data="data"></slot>
		<slot name="pending" v-else></slot>
	</span>
</template>

<script>
export default {
	props: {
		promise: Promise
	},

	data() {
		return {
			resolved: false,
			data: null,
			error: null
		}
	},

	watch: {
		promise: {
			handler (promise) {
				this.resolved = false
				this.error = null

				if (!promise) {
					this.data = null
					return
				}

				promise.then(data => {
					this.data = data
					this.resolved = true
				})
				.catch(err => {
					this.error = err
					this.resolved = true
				})
			},
			immediate: true
		}
	}
}	
</script>
```

Một component nhận vào một `Promise` là *prop*, chúng ta `watch` giá trị promise một khi nó thay đổi lập tức xóa *state*, và gọi `then`, `catch`

```html
<template>
	<div>
		<promise :promise="somePromise">
			<template #resolved="{ data }">
				Resolved: {{ data }}
			</template>
			<template #rejected="{ error }">
				Rejected: {{ error }}
			</template>
			<template #pending>
				Loading...
			</template>
		</promise>
	</div>
</template>
```

Nếu không muốn có thẻ `<span/>` trong component `promised.vue`, chúng ta không dùng thẻ `template` mà thêm vào bằng hàm render

```jsx
render() {
	if (this.error) {
		return this.$scopedSlots['rejected']({ error: this.error })
	}

	if (this.resolved) {
		return this.$scopedSlots['resolved']({ data: this.data })
	}

	return this.$scopedSlots['pending']()
}
```

Ví dụ này là lấy từ package [vue-promised](https://github.com/posva/vue-promised), bạn có thể tải luôn về xài nếu lười.

Một vài thư viện khác cũng xài kiểu component không render này là [Baleada](https://baleada.netlify.com/docs/), [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller), [PortalVue](https://github.com/LinusBorg/portal-vue)

Hết. Happy coding everyone 🖖🏻🖖🏻🖖🏻🖖🏻🖖🏻🖖🏻🖖🏻🖖🏻

<a target="_blank" rel="noopener noreferrer" href="https://www.smashingmagazine.com/2019/07/using-slots-vue-js">Using Slots In Vue.js</a>


