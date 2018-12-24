---
slug: "/2018-11-08-gioi-thieu-vuex-cho-nguoi-moi-bat-dau"
date: "2018-11-08"
title: "Giới thiệu Vuex cho người mới bắt đầu"
desc: "Mình không giới thiệu cụ thể từng phần trong Vuex, các bạn cần nắm redux store của React để hiểu được bài này, các khái niệm và nguyên tắc gần như là giống nhau, khác cách đặt tên thôi."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [state](#state)
- [mutations](#mutations)
- [actions](#actions)
- [getters](#getters)
- [modules](#modules)

<!-- /TOC -->

Vuex là một cái store cho Vue, nó giống hệt như redux store của React, cũng giải quyết những vấn đề như redux, nên nếu bạn ko biết tại sao nó lại cần thì có thể đọc lại [Redux là gì và tại sao phải dùng](/2018-02-14-huong-dan-redux-la-gi-tai-sao-phai-dung).

Một số khái niệm chính của Vuex, các khái niệm này gần như là tương đồng với redux

![Giới thiệu Vuex cho người mới bắt đầu](https://cms-assets.tutsplus.com/uploads/users/2028/posts/32354/image/vueccvuex.png)

Trong store có

```js
new Vue.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
});
```

## state

Tất cả dữ liệu mà store nắm giữ

## mutations

`mutations` được config trong store (nó như reducer của redux) là tập những phương thức được dùng để update state. Chúng ta không update state trực tiếp, không gọi đến các hàm mutation trực tiếp, chúng ta gọi `this.$store.commit('ten-phuong-thuc', payload)` để gọi các phương thức này.

<div class="note">Mutation là những phương thức synchronous</div>

```js
// gọi mutation
methods: {
  unregister(registration) {
    this.$store.commit({
      type: 'unregister',
      userId: registration.userId
    });
  }
},

// khai báo mutation trong lúc tạo store
mutations: {
  register(state, userId) {
    state.registrations.push(userId);
  },
}
```

## actions

<div class="note">Sự khác biệt lớn nhất giữa action và mutation là trong action có thể return promise, nó có thể thực hiện các thao tác asynchronous</div>

Nếu trong redux bạn cần một middleware để xử lý các thao tác asynchronous, thì action trong vue store chính là các hàm bạn dùng để làm chuyện này.
Chúng ta cũng không gọi trực tiếp đến các hàm của `actions` mà phải gọi qua dispatch. Mục đích cuối cùng của action cũng là commit một mutation, nó cũng không chỉnh sửa gì state.

```js
// gọi một action ở component, map nó vô phương thức
methods: {
  registerUser(user) {
    this.$store.dispatch('register', user.id);
  }
}

// khai báo action trong store
actions: {
  register(context, userId) {
    setTimeout(() => {
      // vẫn commit lên mutation                
      context.commit('register', userId);
    }, 2000)
  }
}
```

## getters

Trong store chúng ta khai báo các phương thức gọi chung là `getters`, nó giống như các `computed property` của store.

<div class='note'>Các hàm `getters` luôn trả về giá trị</div>

Nếu bạn chưa biết computed property là gì, mình quote lại ngắn gọn cho các bạn nhớ

<div class="note">Computed property là những giá trị cần tính lại khi một biến nó phụ thuộc thay đổi giá trị.</div>

Ví dụ, giỏ hàng, tổng tiền là computed property được tính lại khi trên tất cả sản phẩm có trong giỏ hàng.

```js
getters: { // == computed properties
  availableProducts(state, getters) {
    return state.products.filter(product => product.inventory > 0)
  },
  cartTotals(state, getters) {
    let cartTotal = 0;
    for (const item of state.cart) {
      cartTotal += (item.price * item.quantity);
    }
    return cartTotal;
  }
},
```

## modules

Khi ứng dụng của chúng ta lớn lên, để hết mọi quản lý ở một chỗ như vậy sẽ rất mệt. Modules giúp chúng ta tách cái store ra theo từng feature

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
```

Các phần còn lại: getters, actions, mutations truy cập trực tiếp như bình thường, KHÔNG cần thông qua store.actions.moduleName. Nó sẽ được lồng vào trong module name khi chúng ta bật `namespaced: true`

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // module assets
      state: { ... }, 
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },
      // nested modules
      modules: {
        // kế thừa namespace từ module cha
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },
        posts: {
          namespaced: true,
          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```
