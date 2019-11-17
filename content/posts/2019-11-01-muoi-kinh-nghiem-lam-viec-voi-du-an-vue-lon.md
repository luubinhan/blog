---
slug: "/2019-11-01-muoi-kinh-nghiem-lam-viec-voi-du-an-vue-lon"
date: "2019-11-01"
title: "10 kinh nghiệm khi làm việc với các dự án lớn viết bằng Vue.js"
desc: "Đây là 10 kinh nghiệm được đúc kết trong lúc làm việc với các bộ source lớn. Vấn đề với tất cả các bộ source lớn là nó rất khó để bảo trì."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["kinh-nghiem", "vuejs"]
---

<!-- TOC -->

- [Sử dụng `slot` để component dễ hiểu hơn và dễ tùy biến hơn](#s%e1%bb%ad-d%e1%bb%a5ng-slot-%c4%91%e1%bb%83-component-d%e1%bb%85-hi%e1%bb%83u-h%c6%a1n-v%c3%a0-d%e1%bb%85-t%c3%b9y-bi%e1%ba%bfn-h%c6%a1n)
- [Tổ chức Vuex Store](#t%e1%bb%95-ch%e1%bb%a9c-vuex-store)
- [Sử dụng action để lấy và gửi dữ liệu](#s%e1%bb%ad-d%e1%bb%a5ng-action-%c4%91%e1%bb%83-l%e1%ba%a5y-v%c3%a0-g%e1%bb%adi-d%e1%bb%af-li%e1%bb%87u)
- [Sử dụng `mapState`, `mapGetters`, `mapMutations` và `mapActions`](#s%e1%bb%ad-d%e1%bb%a5ng-mapstate-mapgetters-mapmutations-v%c3%a0-mapactions)
- [Sử dụng API Factories](#s%e1%bb%ad-d%e1%bb%a5ng-api-factories)
- [Sử dụng `$config` để truy cập biến môi trường](#s%e1%bb%ad-d%e1%bb%a5ng-config-%c4%91%e1%bb%83-truy-c%e1%ba%adp-bi%e1%ba%bfn-m%c3%b4i-tr%c6%b0%e1%bb%9dng)
- [Tuân theo một nguyên tắc chung khi viết commit](#tu%c3%a2n-theo-m%e1%bb%99t-nguy%c3%aan-t%e1%ba%afc-chung-khi-vi%e1%ba%bft-commit)
- [Khi lên production, fix luôn các package version đang xài](#khi-l%c3%aan-production-fix-lu%c3%b4n-c%c3%a1c-package-version-%c4%91ang-x%c3%a0i)
- [Sử dụng Virtual Scroller khi hiển thị nhiều dữ liệu](#s%e1%bb%ad-d%e1%bb%a5ng-virtual-scroller-khi-hi%e1%bb%83n-th%e1%bb%8b-nhi%e1%bb%81u-d%e1%bb%af-li%e1%bb%87u)
- [Kiểm tra dung lượng package](#ki%e1%bb%83m-tra-dung-l%c6%b0%e1%bb%a3ng-package)

<!-- /TOC -->

## Sử dụng `slot` để component dễ hiểu hơn và dễ tùy biến hơn

Bài viết hướng dẫn chi tiết khái niệm và cách dùng `slot` bạn [đọc lại ở đây](/2019-10-20-huong-dan-ung-dung-tuyet-voi-cua-vue-renderless-component). Với việc sử dụng `slot` bạn sẽ có những component với khả năng *xào đi nấu lại* dễ hơn.

Một ví dụ để thấy lợi ích của slot trong thực tế.

Khi mới nhận thiết kế từ bên design, popup modal vô cùng đơn giản, chỉ gồm `title`, `description` và dâm ba cái button bên dưới. Thoạt nhìn chúng ta chỉ cần 3 cái `prop` và một sự kiện bắn ra khi click button để thay đổi tùy theo tình huống sử dụng.

Nhưng sau một thời gian, bên design họ vẽ vời thêm một mớ mới, nhúng form, chèn hẳn một component khác vào trong đó, vâng vâng. `Prop` không đáp ứng nổi độ khùng của mấy bạn design. Và cách mà chúng ta refactor lại cái modal bằng `slot`

```html
<template>
  <div class="c-base-popup">
    <div v-if="$slot.header" class="c-base-popup__header">
      <slot name="header">
    </div>
    <div v-if="$slot.subheader" class="c-base-popup__subheader">
      <slot name="subheader">
    </div>
    <div class="c-base-popup__body">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="$slot.actions" class="c-base-popup__actions">
      <slot name="actions">
    </div>
    <div v-if="$slot.footer" class="c-base-popup__footer">
      <slot name="footer">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
```

## Tổ chức Vuex Store

Một lập trình viên bắt đầu mò mẫm cách xài Vuex vì họ gặp 2 vấn đề sau

1. Cần truy cập vào dữ liệu từ một component khác, nó nằm xa ơi là xa so với component hiện tại.
2. Sau khi component bị xóa khỏi DOM, bạn vẫn muốn dữ liệu đó không bị xóa

Khi bắt đầu tạo Vuex Store, chúng ta bắt đầu học được khái niệm `module` và cách sử dụng trong ứng dụng.

Không một quy chuẩn nào để tổ chức `module`, đồng nghĩa là mỗi người mỗi ý, đa phần các lập trình viên sẽ tổ chức theo dạng tính năng

- Auth
- Blog
- Inbox
- Setting

Hợp lý mà, một cách tiếp cận khác cũng hợp lý luôn là tổ chức theo dữ liệu trả về từ API

- User
- Team
- Message
- Widget
- Article

Vì là quan điểm nên không thể nói đúng sai, nhưng chúng ta phải **thống nhất một cách** tổ chức Vuex Store mà mọi người đều đồng ý là hợp lý. Người mới vào team cũng dễ follow hơn.

[Xem Kinh nghiệm tổ chức Vuex cho ứng dụng lớn](http://vuilaptrinh.com/2018-11-10-huong-dan-to-chuc-vuex-store-tren-du-an-lon/)

[# Sử dụng flat state trong Vue Store](http://vuilaptrinh.com/2019-10-12-flat-state-trong-vue-store-de-toi-uu-toc-do/)

## Sử dụng action để lấy và gửi dữ liệu

Hầu hết các network request được đưa vào Vuex action. Bạn có thắc mắc, tại sao lại thế? 🤨

Đơn giản là vì hầu hết các dữ liệu lấy về sẽ được đưa vào trong store. Mặc khác, xét trên khía cạnh đóng gói và tái sử dụng thì đây là cách mang lại sự dễ chịu khi sử dụng nhất.

## Sử dụng `mapState`, `mapGetters`, `mapMutations` và `mapActions`

Không có lý do gì phải có nhiều giá trị `computed` hoặc phương thức chỉ vì bạn cần truy cập vào `state/getter` hoặc gọi `actions/mutations` bên trong component. Sử dụng các hàm được cung cấp sẵn của Vuex `mapState`, `mapGetters`, `mapMutations` và `mapActions`

```js
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    // truy cập properties trong my_module
    ...mapState("my_module", ["property"]),
    // truy cập getters
    ...mapGetters("my_module", ["property"]),
    // truy cập các properties khác
    ...mapState("my_module", {
      property: state => state.object.nested.property
    })
  },

  methods: {
    // truy cập actions
    ...mapActions("my_module", ["myAction"]),
    // truy cập mutations
    ...mapMutations("my_module", ["myMutation"])
  }
};
```

[Xem tài liệu của Vuex](https://vuex.vuejs.org/guide/modules.html)

## Sử dụng API Factories

Tạo một hàm `this.$api` để có thể gọi ở bất kỳ đâu khi cần tạo network request. Trong thư mục gốc, thêm một thư mục tên `api` chứa tất cả các phương thức liên quan

```bash
api
├── auth.js
├── notifications.js
└── teams.js
```

[Xem cách đăng ký một phương thức global](https://vuejs.org/v2/guide/plugins.html)

## Sử dụng `$config` để truy cập biến môi trường

Trong bộ source chúng ta sẽ luôn cần những biến chưa config trên môi trường khác nhau

```bash
config
├── development.json
└── production.json
```

Nếu có thể truy cập những biến này thông qua `this.$config` có phải tiện lợi lắm không

```js
import Vue from "vue";

import development from "@/config/development.json";
import production from "@/config/production.json";

if (process.env.NODE_ENV === "production") {
  Vue.prototype.$config = Object.freeze(production);
} else {
  Vue.prototype.$config = Object.freeze(development);
}
```

## Tuân theo một nguyên tắc chung khi viết commit

Nếu bạn nào có contribute cho các dự án trên Github, sẽ thấy lợi ích của việc có một chuẩn chung khi viết diễn giải cho commit. Có thể lấy cách viết của [Angular tham khảo](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

```bash
git commit -am "<type>(<scope>): <subject>"

# Một vài ví dụ
git commit -am "docs(changelog): update changelog to beta.5"
git commit -am "fix(release): need to depend on latest rxjs and zone.js"
```

[Xem Bộ guide để viết code sạch dành riêng cho Vue](http://vuilaptrinh.com/2019-10-04-huong-dan-viet-code-vue-chuan)

## Khi lên production, fix luôn các package version đang xài

Không phải package nào cũng được đặt version theo quy tắc đã chuẩn hóa. Để tránh nửa đêm bị gọi dậy vì một trong các package đã cài bộ source bỗng dưng không tương thích, production không còn chạy như trên local.

Tội đồ là cái prefix `^` này. Xóa hết nó khi lên production

```json
{
  "name": "my project",

  "version": "1.0.0",

  "private": true,

  "dependencies": {
    "axios": "0.19.0",
    "imagemin-mozjpeg": "8.0.0",
    "imagemin-pngquant": "8.0.0",
    "imagemin-svgo": "7.0.0",
    "nuxt": "2.8.1",
  },

  "devDependencies": {
    "autoprefixer": "9.6.1",
    "babel-eslint": "10.0.2",
    "eslint": "6.1.0",
    "eslint-friendly-formatter": "4.0.1",
    "eslint-loader": "2.2.1",
    "eslint-plugin-vue": "5.2.3"
  }
}
```

[Xem Nguyên tắc đặt version](https://semver.org/)


## Sử dụng Virtual Scroller khi hiển thị nhiều dữ liệu

Khi cần hiển thị một số lượng lớn các hàng dữ liệu trên mộ trang, việc loop qua toàn bộ dữ liệu và render sẽ bị chậm. Dùng [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)

```bash
npm install vue-virtual-scroller
```

Nó sẽ chỉ render các dữ liệu có thể vừa vặn trong viewport, phần dữ liệu chưa hiển thị trên viewport sẽ được *lazy* render khi cuộn tới, tăng tốc độ đáng kể

```html
<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="user">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>
```

## Kiểm tra dung lượng package

Bộ source lớn thường đồng nghĩa sử dụng nhiều package *lụm* được trên mạng, nếu không để ý, việc cài đặt bừa bãi các package này dễ dẫn đến việc dung lượng tăng vọt

[Visual Studio Code có công cụ để kiểm tra dung lượng import](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) hoặc chạy công cụ [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)


**Bài viết sử dụng tham khảo**

[https://www.telerik.com/blogs/10-good-practices-building-maintaining-large-vuejs-projects](https://www.telerik.com/blogs/10-good-practices-building-maintaining-large-vuejs-projects)


