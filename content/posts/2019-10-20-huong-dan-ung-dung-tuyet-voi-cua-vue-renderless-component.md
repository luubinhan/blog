---
slug: "/2019-10-20-huong-dan-ung-dung-tuyet-voi-cua-vue-renderless-component"
date: "2019-10-20"
title: "Những ứng dụng tuyệt vời của Renderless component trong Vue"
desc: "Cùng điểm qua các phương pháp để giải quyết bài toán 'DRY' trong Vue, các bạn sẽ biết thêm các kỹ thuật tương đối nâng cao để lên bật Vue lão làng."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [Slot](#slot)
- [Slot scope](#slot-scope)
- [Sử dụng làm modal](#s%E1%BB%AD-d%E1%BB%A5ng-l%C3%A0m-modal)
- [Composing Component (siêu nhân hợp thể)](#composing-component-si%C3%AAu-nh%C3%A2n-h%E1%BB%A3p-th%E1%BB%83)
  - [Tại sao cần hợp thể?](#t%E1%BA%A1i-sao-c%E1%BA%A7n-h%E1%BB%A3p-th%E1%BB%83)
  - [Một cách nấu khác với slot](#m%E1%BB%99t-c%C3%A1ch-n%E1%BA%A5u-kh%C3%A1c-v%E1%BB%9Bi-slot)
- [Renderless Component (người vô hình chỉ mang logic)](#renderless-component-ng%C6%B0%E1%BB%9Di-v%C3%B4-h%C3%ACnh-ch%E1%BB%89-mang-logic)
  - [Ứng dụng renderless component làm ổ cắm mạng cấp dữ liệu internet](#%E1%BB%A9ng-d%E1%BB%A5ng-renderless-component-l%C3%A0m-%E1%BB%95-c%E1%BA%AFm-m%E1%BA%A1ng-c%E1%BA%A5p-d%E1%BB%AF-li%E1%BB%87u-internet)
- [Tài liệu tham khảo](#t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o)

<!-- /TOC -->

Để tái sử dụng component trong Vue cũng có lắm ngã dăm ba đường y như React có HOC, render prop, hook. Điểm qua những kỹ thuật/cách làm tương tự trong Vue

## Kỹ thuật dùng Slot

Khái niệm **Slot** trong vue là dạng "đặt gạch" trong component, sau này khi sử dụng ta có thể đưa nội dung khác vào những vị trí đã *đặt gạch*

Vue không giới hạn số lượng *gạch* muốn đặt, số lượng tùy thích

```html
<!-- mother.vue -->
Mẹ đặt gạch 2 chỗ header và body cho con nha
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
```

```html
<!-- con.vue:
Cho con dùng 2 chỗ header và body bằng nội dung mới nhé-->
<mother>
	<template slot="header">
	  <h1>Special Features</h1>
	</template>
	<template slot="body">
		<div>
		    <h5>Fish and Chips</h5>
		    <p>Super delicious tbh.</p>
		</div>
	</template>
</mother>
```

Đây là những viên gạch có đặt tên `<slot name="header"/>`

Nếu bạn không khai báo tên cho `<slot />`, khi đó component *ném gạch* sẽ được viết (children trong React đấy mà)

```html
<mother>
  Toàn bộ phần này nằm trong slot không đặt tên
</mother>
```

> bạn có thể viết tắt `slot="header"` thành `#header`

Ngoài như cầu đặt gạch, bạn sẽ có thêm nhu cầu truyền tải thêm ít dữ liệu qua lại giữa mẹ và con

### Khái niệm Slot scope

Đề **truyền dữ liệu** từ mẹ sang con, chúng ta bind dữ liệu muốn truyền qua slot `<slot :ten-bien="gia-tri"/>`

```html
<!-- mother.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header" :close="close"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
```

Component con sẽ nhận dữ liệu thông qua từ khóa `slot-scope`

```html
<!-- con.vue-->
<mother>
	<template #header slot-scope="{close}">
		<h1>{{ close ? ‘Closed’ : ‘Open’ }}</h1>
	</template>
	<template #body>
		<div slot="body">
		  <h5>Fish and Chips</h5>
		  <p>Super delicious tbh.</p>
		</div>
	</template>
</mother>
```

Ứng dụng các khái niệm `slot`, `slot-scope` vào component modal

Lấy cấu trúc html của bootstrap, chúng ta sẽ cho Modal component có 3 chỗ có thể thay đổi là

- `<slot name="header" />`
- `<slot name="body" />`
- `<slot name="footer" />`

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

Với 3 cục gạch đã đặt sẵn trong `my-modal.vue`,

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



## Kỹ thuật dùng Component Composition (siêu nhân hợp thể)

Sự kết hợp của nhiều component thành một component mới, dữ dội hơn, như siêu nhân GAO, được gọi là hợp thể component. Từ *"khoa học"* của nó là Component Composition (trong React cũng có cách làm này)

### Lý do phải hợp thể?

```html
<!-- BaseButton.vue -->
<template>
  <button class="nice-button" type="button">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ['text']
}
</script>
```

Nhu cầu thêm mắm, bớt muối cho một món phải *nhai đi nhai lại* là có. Giả dụ, ta đã có sẵn một component `BaseIcon` để hiển thị icon, giờ cái Button cùng  muốn thêm chút icon cho đời tươi mới, chúng ta **xào chung** hai món lại để nhai

```html
<template>
  <button class="nice-button" type="button">
    <BaseIcon v-if="leftIcon" :icon="leftIcon"/>
    {{ text }}
    <BaseIcon v-if="rightIcon" :icon="rightIcon"/>
  </button>
</template>

<script>
export default {
  props: ['text', 'leftIcon', 'rightIcon']
}
</script>
```

Trong đó chúng ta đã thêm hai điều kiện để đặt icon nằm bên trái hay bên phải. Component `Button` bây giờ cũng được thêm 2 prop `rightIcon`, `leftIcon`.

Mọi thứ sẽ rối rắm lên khi có thêm nhu cầu đưa cái spinner vào trong button, khi nào đang loading thì hiện cái spinner này

```html
<template>
  <button class="nice-button" type="button">
    <BaseSpinner v-if="isLoading"/>
    <template v-else>
      <BaseIcon v-if="leftIcon" :icon="leftIcon"/>
      {{ text }}
      <BaseIcon v-if="rightIcon" :icon="rightIcon"/>
    </template>
  </button>
</template>
```

Chỉ mới thêm chút đường sữa thôi, mà món ăn sắp thành cháo heo thập cẩm khó nuốt.

Với nhiều **gia vị** được yêu cầu bỏ vào của bọn khách hàng không biết gì về nấu nướng. Món ngon bây giờ thành **đặc sản** mà đứa nào đó muốn nấu tiếp, sửa đổi do quá mặn, thì cũng bất lực vì không biết đã thêm quá nhiều muối hay nhiều nước mắm.

### Một cách nấu khác với slot

Trong cuốn bí kíp 100 cách nấu ngon của Vue.js, nó cho chúng ta cách làm khác đã đề cập ở trên là `slot`

```html
<template>
  <button class="nice-button" type="button">
    <slot/>
  </button>
</template>
```

Đây là kiểu món tao đã nấu xong, nếu mày muốn bỏ thêm bất cứ gì đó, dùng món này tao đã nấu xong như một nguyên liệu cho món mới, chứ tao ko sửa lại món của tao.

```html
<BaseButton>
  Submit
  <BaseIcon icon="arrow-right"/>
</BaseButton>
```

Việc này cũng có ít *tranh cãi trong giới đầu bếp*, nếu tao phải phục vụ món ăn đó cho một trăm thực khách, tức là tao phải lặp lại việc order 100 gia vị `Button` về rồi tự nấu thêm 100 lần nữa? vi phạm nguyên tắc nghề nghiệp **DRY** (DON'T REPEAT YOURSELF).

Đúng là vi phạm nguyên tắc nghề, nhưng nó lại đảm bảo **KISS** (Keep it simple stupid - ĐƠN GIẢN NHẤT CÓ THỂ). Nói chung các bạn cũng phải thõa hiệp được này mất kia.


```html
<template>
  <BaseButton @click="sendForm">
    <BaseSpinner v-if="isLoading"/>
    <template v-else>
      Submit
      <BaseIcon icon="arrow-right"/>
    </template>
  </BaseButton>
</template>
```

## Kỹ thuật Renderless Component (người vô hình chỉ mang logic)

>Nếu bạn đã viết React, nó cũng có khái niệm tương tự chính là render prop

Một component trong Vue có thể không render bất cứ gì cả, nếu chỉ đơn giản là chứa các function, thực hiện logic tính toán.

Nó giống như cái ổ điện, nó chỉ biết làm một chuyện là cấp điện cho chui cắm, còn cái chui đó nối tới bóng đèn, máy tính, tủ lạnh, máy quạt là chuyện của người cắm điện.

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

Một component để làm transition như trên không render html, không quan tâm cái nó hiển thị là gì. Nó chỉ bổ sung hiệu ứng `fade` cho component.

Có thể viết nó ở dạng này, truyền thêm ít dữ liệu cho đứa con

```jsx
Vue.component('renderless-component-example', {
	render() {
		return this.$scopedSlots.default({
			exampleProp: 'vuilaptrinh.com'
		})
	}
})
```

> Tại sao dùng **Renderless component** mà không dùng `mixin` hay `directive`?

Để **tái sử dụng** code trong Vue, ngoài renderless component ra còn có thể dùng [mixin](https://vuejs.org/v2/guide/mixins.html) hoặc  [custom directive](https://vuejs.org/v2/guide/custom-directive.html). Cả 3 cách đều có thể dùng thay thế cho nhau được, vấn đề là **mức độ tường minh** của 3 thằng khác nhau.

Xét theo thứ tự tường mình từ thấp đến cao:

1. Custom directive 
2. Mixin
3. renderless component

Mixin thì bị vấn đề, nếu khai báo một số `state`, hoặc phương thức bên trong mixin, sau đó *trộn* chung với 1 component, không rõ ràng trực quan như là dùng một renderless component với `prop`

### Ứng dụng renderless component làm *ổ cắm mạng cấp dữ liệu internet*

Nhu cầu này sẽ rất quen thuộc,  tạo một network request lúc component `mounted()` để lấy dữ liệu.

Chúng ta tạo ra một component chuyên làm nhiệm vụ này

```jsx
// src/components/DataList.js
import axios from 'axios'

export default {
	props: {
		baseUrl: {
			type: String,
			default: 'https://jsonplaceholder.typicode.com'
		},
		endpoint: {
			type: String,
			required: true
		},
		// dùng để giới hạn kết quả query
		filter: {
			type: Object
		}
	},
	data() {
		return {
			api: axios.create({ baseURL: this.baseUrl }),
			data: null,
			error: null,
			loading: false,
		}
	},
	watch: {
		// load dữ liệu từ endpoint trong lần render đầu tiên
		// và khi giá trị filter thay đổi
		filter: {
			immediate: true,
			handler: 'load'
		}
	},
	methods: {
		// xử lý tất cả type: post, update, delete, get, put bằng một hàm duy nhất
		async query(type, ...params) {
			// tránh việc gọi load liên tục
			if (this.loading) return;

			this.loading = true;

			try	{
				const response = await this.api[type](...params);
				this.data = response.data;
				this.error = null;
				this.$emit('success', response);
			} catch (error) {
				this.data = null;
				this.error = error.response;
				this.$emit('error', error);
			}
			this.loading = false;
		},
		load() {
			return this.query('get', this.endpoint, { params: this.filter })
		}
	},
	render() {
		// đưa toàn bộ dữ liệu và phương thức xuống con thông qua slot scope
		return this.$scopedSlots.default({
			data: this.data,
			error: this.error,
			load: this.load,
			loading: this.loading
		})
	}
}
```

Renderless component `<DataList/>` sẽ làm nhiệm vụ `fetch` dữ liệu từ một API, endpoint được cung cấp qua `prop`, sau đó nó sẽ quăng kết quả, lỗi, trạng thái hiện tại về cho component con

```html
<data-list endpoint="posts">
	<div slot-scope="{ data: posts, error, loading }">
		<span v-if="loading">Loading...</span>
		<span v-else-if="error">Error while fetching data!</span>
		<ul v-else>
			<li v-for="post in posts" :key="post.id">
				<h3>{{ post.title }}</h3>
				<p>{{ post.body }}</p>
			</li>
		</ul>
	</div>
<data-list>
```

Thêm phần phân trang, chúng ta dùng giá trị filter

```html
<data-list endpoint="posts" :filter="{ page }">
	<div slot-scope="{ data: posts, error, loading }">
		<span v-if="loading">Loading...</span>
		<span v-else-if="error">Error while fetching data!</span>
		<ul v-else>
			<li v-for="post in posts" :key="post.id">
				<h3>{{ post.title }}</h3>
				<p>{{ post.body }}</p>
			</li>
		</ul>
		<button @click="page = 1">1</button>
    <button @click="page = 2">2</button>
    <button @click="page = 3">3</button>
	</div>
<data-list>
```

Bởi vì đã setup `watch` trên giá trị `filter`, nên khi thay đổi giá trị của `page`, nó sẽ gọi lại hàm `load()`

Xong phần `Rờ` trong **CRUD**, giờ đến Create-Update-Delete

Chúng ta cần tách phần code ở trên ra thành một mixin để sử dụng vào component detail. Chúng ta sẽ đưa nó vào một mixin là query.js

```js
// src/components/mixins/query.js
import axios from 'axios';

export default {
  props: {
    baseUrl: {
      type: String,
      // The JSONPlaceholder API is a fake API
      // basically a Lorem Ipsum JSON API.
      default: `https://jsonplaceholder.typicode.com`,
    },
    endpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // Create a new axios instance.
      // See: https://github.com/axios/axios#creating-an-instance
      api: axios.create({ baseURL: this.baseUrl }),
      data: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    // The `query` method will handle
    // different query types for us.
    async query(type, ...params) {
      // If we're currently loading content
      // we don't submit an additional request.
      if (this.loading) return;

      this.loading = true;
      try {
        const response = await this.api[type](...params);
        this.data = response.data;
        this.error = null;
        this.$emit(`success`, response);
      } catch (error) {
        this.data = null;
        this.error = error.response;
        this.$emit(`error`, error);
      }
      this.loading = false;
    },
  },
};
```

Với component để thêm-xóa-sửa

```jsx
// src/components/DataModel.js
import queryMixin from './mixins/query'

export default {
	mixins: [queryMixin],
	props: {
		entity: {
			type: Object,
		},
		id: {
			type: [Number, String]
		}
	},
	data() {
		return {
			data: this.entity || null,
		}
	},
	create() {
		// nếu có id và chưa có dữ liệu, chúng ta gọi fetch dữ liệu
		if (this.id && !this.data) this.find();
	},
	methods: {
		create(data) {
			return this.query('post', this.endpoint, data)
		},
		destroy() {
			return this.query('delete', `${this.endpoint}/${this.id}`)
		},
		find() {
      return this.query('get', `${this.endpoint}/${this.id}`);
    },
    update(data) {
      return this.query('patch', `${this.endpoint}/${this.id}`, data);
    },
	},
	render() {
		return this.$scopedSlots.default({
			create: this.create,
			data: this.data,
			destroy: this.destroy,
			loading: this.loading,
			update: this.update
		})
	}
}
```

`Create`

```html
<data-model endpoint="posts">
	<div slot-scope="{ data: post, loading, create }"></div>
	<span v-if="loading">Loading...</span>
  <template v-if="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </template>
  <form @submit.prevent="create(newPost)">
  	<label>
      Title: <input v-model="newPost.title">
    </label>
    <label>
      Body: <input v-model="newPost.body">
    </label>
    <button :disabled="loading">
      <template v-if="loading">Loading...</template>
      <template v-else>Create</template>
    </button>
  </form>
</data-model>
```

Với component để `Create`, chúng ta không truyền dữ liệu và `id`, vì thế nó không gọi API để lấy dữ liệu, nếu sau khi tạo, chúng ta sẽ nhận giá trị `post` và `id`.

Cập nhập, giống hệt với tạo ở trên, có điều có thêm `id`

```html
<data-model endpoint="posts" :id="1">
  <div slot-scope="{ data: post, loading, update }">
    <span v-if="loading">Loading...</span>
    <template v-if="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </template>

    <form @submit.prevent="update(post);">
      <label>
        Title: <input v-model="post.title">
      </label>
      <label>
        Body: <input v-model="post.body">
      </label>
      <button :disabled="loading">
        <template v-if="loading">Loading...</template>
        <template v-else>Update</template>
      </button>
    </form>
  </div>
</data-model>
```

`Delete`

```html
<data-model endpoint="posts" :id="1" @success="deleted = true">
  <div slot-scope="{ delete }">
    <p v-if="deleted">
      The post was successfully deleted.
    </p>
    <button :disabled="loading">
      <template v-if="loading">Loading...</template>
      <template v-else>Delete</template>
    </button>
  </div>
</data-model>
```

## Tài liệu tham khảo

<a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/building-renderless-components-to-handle-crud-operations-in-vue/">Building Renderless Components to Handle CRUD Operations in Vue.js</a>


<a target="_blank" rel="noopener noreferrer" href="https://dev.to/codinglukas/vue-js-pattern-for-async-requests-using-renderless-components-3gd">Vue.js Pattern for Async Requests: Using Renderless Components</a>


<a target="_blank" rel="noopener noreferrer" href="https://adamwathan.me/renderless-components-in-vuejs/">Renderless Components in Vue.js</a>


<a target="_blank" rel="noopener noreferrer" href="https://dulisz.com/blog/composing-components-in-vue-js/">Composing Components in Vue.js</a>


<a target="_blank" rel="noopener noreferrer" href="https://www.smashingmagazine.com/2019/07/using-slots-vue-js">Using Slots In Vue.js</a>


<a target="_blank" rel="noopener noreferrer" href="https://vuejsdevelopers.com/2018/02/26/vue-js-reusable-transitions/">Creating Reusable Transitions in Vue</a>
