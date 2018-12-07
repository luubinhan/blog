---
slug: "/2018-12-06-huong-dan-xu-ly-authentication-voi-vue-vuex"
date: "2018-12-06"
title: "Authentication với Vue và Vuex"
desc: "Khi bắt đầu một dự án, việc chúng ta làm đầu tiên, luôn là trang đăng ký đăng nhập, hoặc gọi là xử lý luồng authen cho ngầu."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---


Chúng ta có những câu hỏi sau

- Lưu lại token như thế nào?
- Làm cách nào để redirect user sau khi authen
- Làm sao để chặn user truy cập một số route nếu chưa authen

Chúng ta sẽ cùng xem xét các vấn đề trên, áp dụng trong dự án sử dụng Vue, Vuex

Tuy nhiên cũng nên nhớ rằng mỗi project sẽ sử dụng luồng authen khác nhau. Nên không nên áp dụng cứng nhắc các cách được đề xuất trong bài viết này.

Trước khi đọc bài này mình khuyến cáo bạn nắm rõ [kiến thức căn bản của Vuex trong bài viết này](/2018-11-08-gioi-thieu-vuex-cho-nguoi-moi-bat-dau)


## Khai báo Vuex Auth Module

Một số giá trị chúng ta cần đưa vào store:

- `token`: lúc khởi tạo nếu có trong localStorage thì lấy giá trị này
- `status`: trạng thái của network request (`loading`, `success`, `error`)

```js
const state = {
  token: localStorage.getIte('user-token') || '',
  status: ''
}
```

Getters để lấy giá trị state này

```js
const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}
```

Actions xử lý login, logout

```js
const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    // Dùng promise để sau khi login thành công
    // chúng ta có thể redirect user đi đến trang khác
    return new Promise((resolve, reject) => { 
      commit(AUTH_REQUEST)
      axios({url: 'auth', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
                localStorage.setItem('user-token', token)
                // thêm header authorization:
                axios.defaults.headers.common['Authorization'] = token
                commit(AUTH_SUCCESS, resp)
                dispatch(USER_REQUEST)
                resolve(resp)
        })
      .catch(err => {
        commit(AUTH_ERROR, err);
        // nếu có lỗi, xóa hết token đang có trên trình duyệt
        localStorage.removeItem('user-token');
        reject(err);
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    })
  }
}
```

Mutations thực hiện update lại store

```js
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
}
```

## Tự động authen

Hiện tại nếu chúng ta f5 lại, chúng ta vẫn có token bên trong store (do lấy từ localStorage). Tuy nhiên authorization header trong Axios chưa được set

```js
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
```

## Authen Route

Chúng ta chắc chắn sẽ muốn cấp quyền vào một số route chỉ khi có token

Ví dụ đã đăng nhập sẽ được vào `/account`, chưa đăng nhập có thể vào `/login` và `/`

```js
import store from '../store' // your vuex store 

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
  ],
})
```

## Xử lý các tình huống khác

Các tình huống khác có thể xảy ra như token hết hạn, user chưa được quyền gọi API

Sử dụng Axios, chúng ta có option là `interceptors`, nó như lính gác cổng, tất cả những response trả về từ network request sẽ đi qua đây. Chúng ta kiểm tra tất cả request nào trả về lỗi HTTP 401, dispatch ra logout action

```js
axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // nếu là lỗi chưa đăng nhập unauthorized, gọi lên logout
        this.$store.dispatch(AUTH_LOGOUT)
      // có thể đưa user về trang đăng nhập ở đây!
      }
      throw err;
    });
  });
```



<a target="_blank" class="btn btn-default" rel="noopener noreferrer" href="https://github.com/sqreen/vue-authentication-example">Toàn bộ source code</a>


Tham khảo


<a target="_blank" rel="noopener noreferrer" href="https://blog.sqreen.io/authentication-best-practices-vue/">Authentication Best Practices for Vue</a>

<a target="_blank" rel="noopener noreferrer" href="https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16">Structuring a Vue project — Authentication</a>



