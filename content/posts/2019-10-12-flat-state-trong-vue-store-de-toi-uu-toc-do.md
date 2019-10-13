---
slug: "/2019-10-12-flat-state-trong-vue-store-de-toi-uu-toc-do"
date: "2019-10-12"
title: "Sử dụng flat state trong Vue Store"
desc: "Nhét những tập dữ liệu lớn trong Vuex store, đặc biệt là các cấu trúc dữ liệu lồng nhau luôn gây ra vấn đề không sớm thì muộn. Bài viết giới thiệu cách tiếp cận với flat state trong Vuex store"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

Đầu tiên chúng ta cần trả lời câu hỏi **global state** có phải là phương thuốc chữa *bá bệnh* cho các vấn đề liên quan tới `state`? Mình chỉ đưa dữ liệu vào Vuex store như là lựa chọn cuối cùng và có một lý do cụ thế để phải sử dụng. Điều thứ 2, luôn giữ global state ở dạng cây một cấp, nghĩa là chúng ta không lồng dữ liệu liệu vào nhau như bên dưới

Đọc thêm [https://markus.oberlehner.net/blog/should-i-store-this-data-in-vuex/](https://markus.oberlehner.net/blog/should-i-store-this-data-in-vuex/) để có khái niệm khi nào cần dữ liệu trong store và khi nào không.

Quan điểm về flat state (không lưu dữ liệu lồng nhau trong store) được lấy cảm hứng từ chú [Matt Biilmann](https://twitter.com/biilmann) chia sẽ về quan điểm về Redux sau khi làm cái dashboard cho Netlify trong bài phỏng vấn [Architecting the Netlify Dashboard with React and Redux](http://www.fullstackradio.com/122)

```json
cap_1: {
    cap_2: {
        cap_3: {
        }
    }
}
```

> Rất khó để sync dữ liệu ở dạng lồng ghép như vậy.

Ví dụ, có danh sách bài viết, mỗi bài viết được nhét thông tin tác giả bên trong, có nhiều bài viết có cùng một tác giả, rồi ngày đẹp trời tác giả này đổi tên, thì chúng ta phải đi sync lại toàn bộ tất cả bài viết của ổng.

```js
const articles = [
  // bài viết này được load trước
  {
    author: {
      avatar: 'https://picsum.photos/id/1011/25',
      id: 1,
      name: 'Jane Doe',
    },
    id: 1,
    intro: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
    title: 'Lorem Ipsum',
  },
  // tác giả đó ổng vô đổi avatar,
  // rồi chúng ta load thêm bài viết
  // avatar của ổng đã không còn như xưa
  {
    author: {
      avatar: 'https://picsum.photos/id/2000/25',
      id: 1,
      name: 'Jane Doe',
    },
    id: 2,
    intro: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    title: 'Dolor sit',
  },
];
```

Cách mà chúng ta nên lưu, tách riêng 2 thằng

```js
const articles = {
  1: {
    author: 1,
    id: 1,
    intro: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
    title: 'Lorem Ipsum',
  },
  2: {
    author: 1,
    id: 2,
    intro: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    title: 'Dolor sit',
  },
};

const authors = {
  1: {
    avatar: 'https://picsum.photos/id/2000/25',
    id: 1,
    name: 'Jane Doe',
  },
};
```

Những kiểu thực thể khác nhau, chúng ta tách ra thành các module riêng biệt, dùng khái niệm **foreign key** (khóa ngoại) như trong database

```js
// src/store/modules/article.js
import Vue from 'vue';

import { normalizeRelations, resolveRelations } from '../helpers';
import articleService from '../../services/article';

const state = {
  byId: {},
  allIds: [],
};

const getters = {
  // trả về một article với giá trị id được truyền vào
  find: (state, _, __, rootGetters) => id => {
    // dùng ID để lấy thông tin tác giả
    return resolveRelations(state.byId[id], ['author'], rootGetters);
  },
  // trả về danh sách articles
  list: (state, getters) => {
    return state.allIds.map(id => getters.find(id));
  },
};

const actions = {
  load: async ({ commit }) => {
    const articles = await articleService.list();
    articles.forEach((item) => {
      commit('add', normalizeRelations(item, ['author']));
      // thêm hoặc update order
      commit('author/add', item.author, {
        root: true,
      });
    });
  },
};

const mutations = {
  add: (state, item) => {
    Vue.set(state.byId, item.id, item);
    if (state.allIds.includes(item.id)) return;
    state.allIds.push(item.id);
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state,
};
```


```js
// src/store/helpers.js
export function normalizeRelations(data, fields) {
  return {
    ...data,
    ...fields.reduce((prev, field) => ({
      ...prev,
      [field]: Array.isArray(data[field])
        ? data[field].map(x => x.id)
        : data[field].id,
    }), {}),
  };
}

export function resolveRelations(data, fields, rootGetters) {
  return {
    ...data,
    ...fields.reduce((prev, field) => ({
      ...prev,
      [field]: Array.isArray(data[field])
        ? data[field].map(x => rootGetters[`${field}/find`](x))
        : rootGetters[`${field}/find`](data[field]),
    }), {}),
  };
}
```

Sử dụng

```html
<template>
  <div id="app">
    <ArticleList :articles="articles"/>
  </div>
</template>

<script>
// src/App.vue
import { mapActions, mapGetters } from 'vuex';

import ArticleList from './components/ArticleList';

export default {
  name: 'App',
  components: {
    ArticleList,
  },
  computed: {
    ...mapGetters('article', { articles: 'list' }),
  },
  created() {
    this.loadArticles();
  },
  methods: {
    ...mapActions('article', { loadArticles: 'load' }),
  },
};
</script>
```

Trong component `App.vue` chúng ta lấy các getter và action trong `article` module, khi vừa khởi tạo component, gọi action `loadArticle` để lấy dữ liệu

```html
<template>
  <ul class="ArticleList">
    <li
      v-for="article in articles"
      :key="article.id"
    >
      <h2>{{ article.title }}</h2>
      <p>{{ article.intro }}</p>
      <div class="ArticleList__author">
        <img class="ArticleList__avatar" :src="article.author.avatar" :alt="article.author.name">
        {{ article.author.name }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articles: {
      required: true,
      type: Array,
    },
  },
};
</script>
```

Nhờ vào các hàm getter và `resolveRelations()`, chúng ta có thể dễ dàng truy cập author của từng article


<a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/make-your-vuex-state-flat-state-normalization-with-vuex/">📜 Make your Vuex State Flat: State Normalization with Vuex</a>