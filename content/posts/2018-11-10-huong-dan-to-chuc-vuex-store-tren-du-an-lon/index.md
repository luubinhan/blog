---
slug: "/2018-11-10-huong-dan-to-chuc-vuex-store-tren-du-an-lon"
date: "2018-11-10"
title: "Kinh nghiệm tổ chức Vuex cho ứng dụng lớn"
desc: "Nếu bạn đã sử dụng thông thạo Vuex để tạo các ứng dụng be bé như ToDo list, Shopping Cart, hãy nâng trình của mình lên bằng các ứng dụng có nhiều dữ liệu hơn."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [src/store/index.js](#srcstoreindexjs)
- [src/store/modules/forms](#srcstoremodulesforms)
- [src/store/modules/customer.js](#srcstoremodulescustomerjs)
- [PageCustomer.vue](#pagecustomervue)
- [Tổng kết](#tổng-kết)
  - [Chủ động load các module](#chủ-động-load-các-module)
  - [Tối đa việc tái sử dụng](#tối-đa-việc-tái-sử-dụng)

<!-- /TOC -->


<a href="https://d33wubrfki0l68.cloudfront.net/696421d01191c8c515704cbbec42120ce807c38c/fc4e4/videos/2018-02-04/vuex-store-api-model-mapping.mp4" target="_blank" rel="noopener noreferrer">Video demo ứng dụng  </a>


Trong bài này chúng ta sẽ build 2 màn hình, màn hình Customer và màn hình shipping address

Codebase sẽ được tổ chức như sau

```
src
├── App.vue
├── ...
├── store
│   ├── action-types.js
│   ├── index.js
│   ├── modules
│   │   ├── customer.js
│   │   ├── forms
│   │   │   ├── address.js
│   │   │   ├── contact.js
│   │   │   └── name.js
│   │   └── shipping-address.js
│   └── mutation-types.js
└── ...

```

## src/store/index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // bật strict mode trên môi trường dev
  strict: process.env.NODE_ENV !== 'production',
});

```

File này sẽ ko có gì nhiều, mọi logic xử lý được tách thành từng modules

<div class="note">Cho phép reuse lại một số đoạn code, và chủ động các module khi cần.</div>

## src/store/modules/forms

Trên màn hình Customer: chúng ta có 3 dữ liệu: name, contact, address.

Trên màn hình Shipping Address: chúng ta có 2 dữ liệu: contact, address.
Chúng ta có thể tái sử dụng data của 2 màn hình này. Đó là lý do bên trong forms chúng ta có 3 file: `contact.js`, `address.js`, `name.js`


File contact.js

```js
// src/store/modules/forms/contact.js

import { getField, updateField } from 'vuex-map-fields';

import { ADD_ROW } from '../../mutation-types';
import { Contact } from '../../../models/Contact';

const mutations = {
  updateField,
  [ADD_ROW](state) {
    // cho phép thêm nhiều row mới.
    state.rows.push(new Contact());
  },
};

const getters = {
  getField,
};

// state phải return 1 function
// để có thể reuse module.
// Xem: https://vuex.vuejs.org/en/modules.html#module-reuse
const state = () => ({
  // tạo 1 row rỗng
  rows: [new Contact()],
});

export default {
  // chúng ta sử dụng namespacing
  // trên tất cả modules.
  namespaced: true,
  mutations,
  getters,
  state,
};

```

## src/store/modules/customer.js

Module này khá là nhiều, nên chúng ta sẽ giải thích một cách từ từ.

```js
import { createHelpers } from 'vuex-map-fields';

// API được dùng để gửi
// dữ liệu user nhập vào lên server.
import api from '../../utils/api';

// Models của data để gửi lên API
import { createCustomer } from '../../models/Customer';
import { createRequest } from '../../models/Request';

import { SUBMIT } from '../action-types';
import { ERROR, SUCCESS } from '../mutation-types';

import address from './forms/address';
import contact from './forms/contact';
import name from './forms/name';

// ...

```

Chúng ta sử dụng model để map dữ liệu từ store thành một structure chúng ta sẽ gửi lên API. Nếu muốn xem chi tiết phần này bạn xem trên [Github](https://github.com/maoberlehner/how-to-structure-a-complex-vuex-store/tree/master/src/models)

Phần action của module customer

```js
// src/store/modules/customer.js

// ...

const actions = {
  async [SUBMIT]({ commit, state }) {
    try {
      const customerData = createCustomer({
        // Chúng ta chỉ cho user nhập
        // một địa chỉ
        // (hoặc tên).
        address: state.address.rows[0],
        // Cho phép user nhập vào nhiều contact        
        contacts: state.contact.rows,
        name: state.name.rows[0],
      });
      const requestData = createRequest(customerData);

      await api(requestData);

      commit(SUCCESS);
    } catch (error) {
      commit(ERROR, error.message);
    }
  },
};

// ...

```

`SUBMIT` action ở trên chịu trách nhiệm gửi data lên API, xử lý status trả về. `createCustomer` là function sẽ giúp transform data mà API yêu cầu.

Chúng ta cần 2 mutation cho màn customer form:
1. `ERROR` để set state error khi request bị fail
2. `SUCCESS` cho trường hợp thành công

```js
// src/store/modules/customer.js

// ...

const mutations = {
  [ERROR](state, error) {
    state.error = error;
    state.success = false;
  },
  [SUCCESS](state) {
    state.error = false;
    state.success = true;
  },
};

// ...


```

Tới đây chúng ta có thể define object state cần có

```js
// src/store/modules/customer.js

// ...

const state = () => ({
  error: false,
  success: false,
});

const modules = {
  address,
  contact,
  name,
};

// ...

```

Để thuận tiện hơn trong lúc code, chúng ta đang sử dụng một số hàm helper của `vuex-map-fields`

```js
// src/store/modules/customer.js

// ...

// Để mapping form fields qua Vuex.
// Xem: https://github.com/maoberlehner/vuex-map-fields#custom-getters-and-mutations
export const { mapFields: mapAddressFields } = createHelpers({
  getterType: 'customer/address/getField',
  mutationType: 'customer/address/updateField',
});

export const { mapMultiRowFields: mapContactMultiRowFields } = createHelpers({
  getterType: 'customer/contact/getField',
  mutationType: 'customer/contact/updateField',
});

export const { mapFields: mapNameFields } = createHelpers({
  getterType: 'customer/name/getField',
  mutationType: 'customer/name/updateField',
});

export const customer = {
  namespaced: true,
  actions,
  mutations,
  state,
  modules,
};

```

## PageCustomer.vue

```jsx
<template>
  <div :class="$options.name">
    <h1>New Customer</h1>

    <p class="success" v-if="success">
      SUCCESS!
    </p>
    <p class="error" v-if="error">
      ERROR: {{ error }}
    </p>

    <template v-if="!success">
      <div class="form-sections">
        <section class="form-section">
          <div class="form-element">
            <label for="firstName" class="form-label">First name:</label>
            <input id="firstName" v-model="firstName">
          </div>
          <div class="form-element">
            <label for="lastName" class="form-label">Last name:</label>
            <input id="lastName" v-model="lastName">
          </div>
        </section>

        <section class="form-section">
          <div class="form-repeatable" v-for="(contact, index) in contacts" :key="index">
            <div class="form-element">
              <label for="email" class="form-label">E-Mail:</label>
              <input id="email" type="email" v-model="contact.email">
            </div>
            <div class="form-element">
              <label for="phone" class="form-label">Phone:</label>
              <input id="phone" v-model="contact.phone">
            </div>
          </div>
          <button class="form-button" @click="addContact">Add contact</button>
        </section>

        <section class="form-section">
          <div class="form-element">
            <label for="zip" class="form-label">ZIP:</label>
            <input id="zip" v-model="zip">
          </div>
          <div class="form-element">
            <label for="town" class="form-label">Town:</label>
            <input id="town" v-model="town">
          </div>
          <div class="form-element">
            <label for="street" class="form-label">Street:</label>
            <input id="street" v-model="street">
          </div>
        </section>
      </div>

      <button class="form-button" @click="submit">
        Submit
      </button>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import { SUBMIT } from '../../store/action-types';
import { ADD_ROW } from '../../store/mutation-types';

import store from '../../store';
import {
  customer,
  mapAddressFields,
  mapContactMultiRowFields,
  mapNameFields,
} from '../../store/modules/customer';

// chủ động đăng ký `customer` module 
// chỉ load module này khi cần thiết

// trước khi đăng ký module
// kiểm tra xem nó được đăng ký chưa 
if (!store.state.customer) {
  store.registerModule('customer', customer);
}

const {
  mapActions: mapCustomerActions,
  mapState: mapCustomerState,
} = createNamespacedHelpers('customer');
const {
  mapMutations: mapContactMutations,
} = createNamespacedHelpers('customer/contact');

export default {
  name: 'PageCustomer',
  // Here we're wiring everything up.
  computed: {
    ...mapCustomerState(['error', 'success']),
    // Đọc thêm về mapping field value
    // https://markus.oberlehner.net/blog/form-fields-two-way-data-binding-and-vuex/
    // https://markus.oberlehner.net/blog/how-to-handle-multi-row-forms-with-vue-vuex-and-vuex-map-fields/
    ...mapNameFields(['rows[0].firstName', 'rows[0].lastName']),
    ...mapContactMultiRowFields({ contacts: 'rows' }),
    ...mapAddressFields(['rows[0].zip', 'rows[0].town', 'rows[0].street']),
  },
  methods: {
    ...mapContactMutations({
      addContact: ADD_ROW,
    }),
    ...mapCustomerActions({
      submit: SUBMIT,
    }),
  },
};
</script>

```

Bạn có thể thấy là không có xử lý logic bên trong component. Tất cả những gì làm ở component là map các action, field, mutation, field từ store module vào component.

## Tổng kết

Để tổng kết lại chúng ta cũng nhìn lại chúng ta đạt được gì và cách tiếp cận structure như thế này trong Vuex store khác gì so với cách truyền thống

### Chủ động load các module

Bởi vì chúng ta không đăng ký tất cả các module một cách globally, no cho phép sử dụng tính năng webpack splitting code hoạt động với vue-router.

### Tối đa việc tái sử dụng

Với cách thiết kế store như thế này, chúng ta có thể sử dụng lại một số module. Chìa khóa để đạt được chính là đặt tên theo rule cố định và cách structure module, luôn tuân thủ các quy định giúp chúng ta có thể đoán được.



<a href="https://markus.oberlehner.net/blog/how-to-structure-a-complex-vuex-store/" target="_blank" rel="noopener noreferrer">Bài viết gốc  </a>


<a href="https://how-to-structure-a-complex-vuex-store.netlify.com/" target="_blank" rel="noopener noreferrer">Demo </a>


<a href="https://github.com/maoberlehner/how-to-structure-a-complex-vuex-store" target="_blank" rel="noopener noreferrer">Toàn bộ source code  </a>





