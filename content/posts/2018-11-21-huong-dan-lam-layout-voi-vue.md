---
slug: "/2018-11-21-huong-dan-lam-layout-voi-vue.md"
date: "2018-11-21"
title: "Dựng component layout với Vue"
desc: "Khi mình nói đến layout, là ám chỉ đến những phần giống nhau trên trang, như cái sườn chính của website là header, footer sẽ giống nhau trên tất cả trang, chỉ phần bên trong là khác nhau."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [Render theo điều kiện](#render-theo-điều-kiện)
- [Dùng một wrapper component](#dùng-một-wrapper-component)
- [Chủ động thay đổi component layout](#chủ-động-thay-đổi-component-layout)
- [Chủ động thay đổi component layout với renderless component](#chủ-động-thay-đổi-component-layout-với-renderless-component)
- [Chủ động import khi cần thiết](#chủ-động-import-khi-cần-thiết)
- [Tổng kết](#tổng-kết)

<!-- /TOC -->


Nếu dùng Vue CLI để khởi tạo, bạn sẽ có sẵn layout như thế này

```jsx
<template>
  <div class="App">
    <nav class="App__nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
    <footer>
      &copy; Awesome Company
    </footer>
  </div>
</template>
```

Nếu chúng ta không cần các dạng layout khác nhau, chỉ một kiểu layout duy nhất thì có thể dùng cách này là đủ.

Ví dụ như bạn đang cần một cái sidebar mà nó sẽ có vài dạng khác nhau cho từng loại trang, bạn cần tìm hiểu thêm một số cách làm layout của Vue

## Render theo điều kiện

Cách tiếp cận ai cũng nghĩ đến đầu tiên sẽ là dùng `v-if` để render một vài phần khác nhau theo điều kiện cụ thể.

```diff
<template>
   <div class="App">
-    <nav class="App__nav">
+    <nav v-if="showNav" class="App__nav">
       <router-link to="/">Home</router-link> |
       <router-link to="/about">About</router-link>
     </nav>
     <router-view/>
-    <footer>
+    <footer v-if="showFooter">
       &copy; Awesome Company
     </footer>
   </div>
 </template>
```

Với cách này chúng ta phải dùng thêm khá nhiều biến để kiểm soát được việc khi nào thì hiển thị và ẩn một element.

Tuy nhiên, nếu ứng dụng lớn, bạn không nên dùng cách này vì nó sẽ nhanh chóng trở thành mớ code hầm bà lằng

## Dùng một wrapper component

Chúng ta sẽ dựng một component làm layout, chừa một vài vị trí trong component để chèn các element khác vào đó, trong React gọi là `children`, trong Vue thì nó mạnh hơn, vì nó cho bạn đặt nhiều vị trí khác nhau bằng `slot`.

Rất nhiều người thích xài cách này, và mình cũng thuộc nhóm đó.

Bên trong `src/App.vue` chúng ta chỉ cần render `<router-view/>`

```jsx
<template>
  <div class="App">
    <router-view/>
  </div>
</template>
```

File `src/layouts/LayoutDefault.vue` sẽ chứa các component dùng chung, `<slot/>` là nơi sẽ render component con.
 
```jsx
<template>
  <div class="LayoutDefault">
    <nav class="LayoutDefault__nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <main class="LayoutDefault__main">
      <slot/>
    </main>
    <footer class="LayoutDefault__footer">
      &copy; Awesome Company
    </footer>
  </div>
</template>
```

Giờ nếu trang Home dùng layout này

```jsx
<template>
	<layout-default>
		… Nội dung trang Home ….
	</layout-default>
</template>
<script>
import LayoutDefault from ‘../layouts/LayoutDefault.vue’
export default {
	components: {
		LayoutDefault,
	}
}
</script>
```

Để đặt nhiều slot hơn, bạn đọc thêm <a href="https://vuejs.org/v2/guide/components-slots.html#Named-Slots"> ở trang chủ</a>

Tuy nhiên, vấn đề của cách làm này là khi component Home được update, nó cũng phải render lại `<LayoutDefault/>`, vì nó nằm cùng file mà

## Chủ động thay đổi component layout

Nghe đồn component của Vue mạnh dữ lắm, nó có một component tên là `<component />` !

```jsx
<component :is="SomeComponent" />
```

Trong đó biến `SomeComponent` có thể được gán cho bất kỳ component nào, nó sẽ thay cái SomeComponent được gán lúc đó như là `<component/>`

```jsx
<component :is="bien-so">A</component>
// rồi đâu đó bạn gán lại cái bien-so thành <LayoutComponent />
// Nó sẽ render thành
<LayoutComponent>A</LayoutComponent>
```

Bên trong `App.vue` chúng ta sửa lại để trên `<router-view/>` có thể tự thay đổi giá trị của `layout`, chúng ta dùng thêm `:layout.sync`, trên component con chúng ta chỉ cần emit `update:layout` để cập nhập lại giá trị layout

**Nhớ return data cho layout là `div` để nếu không có gán giá trị nào thì nó sẽ lấy default là `div`**

```jsx
<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      layout: 'div',
    };
  },
};
</script>
```

Trên Home chúng ta emit sự kiện để thay giá trị layout khi component `created()`

```jsx
<template>
  <div class="Home">
    <h1>Home</h1>
    ...
  </div>
</template>

<script>
import LayoutDefault from '../layouts/LayoutDefault.vue';

export default {
  name: 'Home',
  created() {
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
```

Mình đồng ý là mới nhìn nó sẽ hơi phức tạp và kỳ cục hơn cách wrap component cha con bình thường.

> Khác nhau chính là ở chỗ component layout không nằm trong component router view.

Nó giúp cho việc thay đổi qua trang khác nếu vẫn cùng 1 layout được emit, nó không update lại `LayoutDefault`, chỉ update phần router view

<iframe src="https://codesandbox.io/embed/184177316l" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Chủ động thay đổi component layout với renderless component

Trong Vue nó còn có cái gọi là Renderless Component, chúng ta sẽ sử dụng nó để việc chủ động chọn layout dễ dàng hơn ở trên

```jsx
<template>
  <layout-default-dynamic>
    <div class="Home">
      <h1>Home</h1>
      <!-- ... -->
    </div>
  </layout-default-dynamic>
</template>
<script>
import LayoutDefaultDynamic from '../layouts/LayoutDefaultDynamic';

export default {
  name: 'Home',
  components: {
    LayoutDefaultDynamic,
  },
};
</script>
```

Giống như cách [Dùng một wrapper component](#dùng-một-wrapper-component), nhưng chúng sẽ build `<layout-default-dynamic/>` theo kiểu renderless, nó không chứa html markup

```jsx
// src/layouts/LayoutDefaultDynamic.js
import LayoutDefault from './LayoutDefault.vue';

export default {
  name: 'LayoutDefaultDynamic',
  created() {
    this.$parent.$emit('update:layout', LayoutDefault);
  },
  render() {
    return this.$slots.default[0];
  },
};
```

Chúng ta đã bỏ hết phần template đi, thay vào đó dùng hàm `render` để return slot, gọi `$parent.$emit`

## Chủ động import khi cần thiết

Vẫn là lazy load component với webpack để tiết kiệm file bundle, tuy đơn giản nhưng hiệu quả vô cùng để cải thiện performance


```jsx
import Vue from 'vue';

export default {
  name: 'Layout',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  created() {
    // Kiểm tra xem component layout
    // đã được đăng ký chưa
    if (!Vue.options.components[this.name]) {
      Vue.component(
        this.name,
        () => import(`../layouts/${this.name}.vue`),
      );
    }

    this.$parent.$emit('update:layout', this.name);
  },
  render() {
    return this.$slots.default[0];
  },
};
```

```diff
<template>
-  <layout-default-dynamic>
+  <layout name="LayoutDefault">
     <div class="Home">
       <h1>Home</h1>
       <!-- ... -->
     </div>
-  </layout-default-dynamic>
+  </layout>
 </template>
 
 <script>
-import LayoutDefaultDynamic from '../layouts/LayoutDefaultDynamic';
+import Layout from '../layouts/Layout';
 
 export default {
   name: 'Home',
   components: {
-    LayoutDefaultDynamic,
+    Layout,
   },
 };
 </script>
```

## Tổng kết

Nói chúng cách nào cũng sẽ tốt nhất cho từng trường hợp cụ thể nhất, không thể nói suông là cách này tốt hơn cách kia mà không test thực tế, bạn cứ thử, cứ test performance và xem nhu cầu của mình cần dùng đến cách nào, hoặc bạn thích cách nào hơn.


<a target="_blank" rel="noopener noreferrer" href="https://github.com/maoberlehner/dynamic-vue-layout-components">Toàn bộ source code</a>

<a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/dynamic-vue-layout-components/">Dynamic Vue.js Layout Components</a>
