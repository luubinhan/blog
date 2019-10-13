---
slug: "/2019-10-05-viet-unit-test-cho-vue-component-cho-nguoi-moi-bat-dau"
date: "2019-10-05"
title: "Viết Unit Test cho Vue component cho người mới bắt đầu"
desc: "Cái nhìn về unit test cho component, test cái gì, cái gì không test khi viết unit test"
cover: "https://alligator.io/images/vuejs/testing-vue-with-jest.png"
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs"]
---

<!-- TOC -->

- [Xác định những gì cần test](#x%c3%a1c-%c4%91%e1%bb%8bnh-nh%e1%bb%afng-g%c3%ac-c%e1%ba%a7n-test)
  - [Test cái gì?](#test-c%c3%a1i-g%c3%ac)
  - [Cái gì KHÔNG CẦN test](#c%c3%a1i-g%c3%ac-kh%c3%94ng-c%e1%ba%a6n-test)
- [Ví dụ](#v%c3%ad-d%e1%bb%a5)
  - [Phân tích](#ph%c3%a2n-t%c3%adch)
  - [Unit test](#unit-test)
    - [Test case 1: Render HTML](#test-case-1-render-html)
    - [Test case 2: router login được gọi khi click button mà chưa đăng nhập](#test-case-2-router-login-%c4%91%c6%b0%e1%bb%a3c-g%e1%bb%8di-khi-click-button-m%c3%a0-ch%c6%b0a-%c4%91%c4%83ng-nh%e1%ba%adp)
    - [Test case 3: vuex được gọi khi user đã đăng nhập và click button](#test-case-3-vuex-%c4%91%c6%b0%e1%bb%a3c-g%e1%bb%8di-khi-user-%c4%91%c3%a3-%c4%91%c4%83ng-nh%e1%ba%adp-v%c3%a0-click-button)
- [Kết](#k%e1%ba%bft)

<!-- /TOC -->

Khi viết unit test, mình thấy không cần bỏ ra quá nhiều thời gian để cover 100% các case sẽ có, nhưng vẫn đảm bảo đủ các trường hợp cần thiết. Vậy câu hỏi là: như thế nào là **đủ**? Đây là những quan điểm rất cá nhân, nếu bạn nào đã là master of unit test rồi thì mình hy vọng có được sử chỉ giáo.

Mình xem như bạn đã biết chút ít về [Jest](https://jestjs.io/) và [Vue Test Utils](https://vue-test-utils.vuejs.org/), đã chạy vue-cli để setup một dự án mới với Jest

***
Chúng ta sẽ học được gì
- Tại sao viết test, mục đích của viết test
- Xác định cái nào cần và không cần test
- Ví dụ để thực hành

***

## Xác định những gì cần test

### Test cái gì?

Khi chúng ta viết test cho một component, bắt đầu với những public interface của component đó. Đừng nghe đến chứ *public interface* mà rung sợ, nó chỉ là những gì component đó tương tác với *thế giới* bên ngoài. Nếu bạn viết *hướng dẫn sử dụng* để người khác xài component đó, bạn viết những gì, đó là những thứ bạn sẽ test, component nhận vào những gì và output ra những gì.

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1569450315452_inputs%20%26%20outputs.png?alt=media&token=57071fae-3a80-46aa-a32a-7a7d51897b89)


**Đầu vào** của component
- props
- tương tác của user, click, kéo-thả
- store
- route params
**Đầu ra** của component
- render ra DOM
- tạo ra sự kiện nào đó
- thay đổi route
- cập nhập lại store

Khi tập trung vào những public interface này nghĩa là chúng ta cũng không tập trung vào logic bên trong của component, từng dòng code của component đó chạy ra sao. Nghe có vẻ không hợp lý, nhưng unit test chỉ tập trung vào kết quả trả về, không quan tâm **làm thế nào** để có kết quả đó.

Component `<RandomNumberGenerator/>` bên dưới, nó sinh ra trong cuộc đời này là để tạo một con số ngẫu nhiên nằm trong khoảng `min` và `max`. Trước khi tiếp tục, bạn có thể xác định được input và output của component này chưa?

```html
// RandomNumberGenerator.vue
<template>
  <div>
    <span class="number">{{ randomNumber }}</span>
    <button v-on:click="generateRandomNumber">Generate Random Number</button>
  </div>
</template>
    
    
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      randomNumber: 0
    }
  },

  methods: {
    generateRandomNumber() {
      this.randomNumber =
        Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
    }
  }
}
</script>
```

### Cái gì KHÔNG CẦN test

Chúng ta không cần biết nó đã làm **như thế nào**, cách làm đó đúng hay sai chúng ta không phải là người đi kiểm tra, ví dụ như `<RandomNumberGenerator/>`, chúng ta đưa vào 2 input `min` và `max`, hàm sẽ thực hiện việc đó là

```js
generateRandomNumber() {
  this.randomNumber = Math.floor(Math.random() * (this.max - this.min + 1) ) + this.min;
}
```

Tất cả những gì chúng ta cần đảm bảo là con số trả về nằm giữa 2 giá trị `min` và `max`, nếu sau này có cập nhập hay thay đổi cách hiện thực của hàm này, dùng thư viện khác để random, dùng cách khác để random, chúng ta không cần kiểm tra cách làm bên trong.

## Ví dụ

Component `TestComponent.vue` bên dưới, nó có 3 dependency là Vuex (`$store`), Vue Router (`$router`) và Vue Auth (`$auth`)

```html
// TestComponent.vue
<template>
  <div>
    <h2>{{ item.title }}</h2>
    <button @click="addToCart">Add To Cart</button>
    <img :src="item.image" alt=””/>
  </div>
</template>
<script>
export default {
  name: "ProductItem",
  props: [ "id" ],
  computed: {
    item () {
      return this.$store.state.find(
        item => item.id === this.id
      );
    }
  },
  methods: {
    addToCart () {
      if (this.$auth.check()) {
        this.$store.commit("ADD_TO_CART", this.id);
      } else {
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>
```

### Phân tích

Component này được sinh ra, nuôi dạy, cho ăn học để lớn lên là để

- Hiển thị một sản phẩm dựa trên prop `id` (toàn bộ sản phẩm nằm trong store)
- Nếu là chưa đăng nhập, click vào nút *Add to Card* sẽ đẩy về trang *Login*
- Nếu user đã đăng nhập, click vào *Add to Card*, nó sẽ bắn ra sự kiện  `ADD_TO_CARD` để Vuex cập nhập


**Input của component này**

- `id`
- state từ Vuex và Vue Auth
- User click nút *Add to Card*

**Output của component này**

- Render html
- Vue Router Push (cho user chưa đăng nhập)
- Data được gửi tới Vuex mutation (nếu user đã đăng nhập)

### Unit test

Chúng ta sử dụng một function,  trả về một object dùng để config, cho tiết kiệm thời gian phải viết đi viết lại ấy

**item.spec.js**
```js
import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent'

function createConfig (overrides) {
    const id = 1
    const mocks = {
        // Vue Auth
        $auth: {
          check: () => false
        },
        // Vue Router
        $router: {
          push: jest.fn()
        },
        // Vuex
        $store: {
          state: [ { id } ],
          commit: jest.fn()
        }
    }
    const propsData = { id }
    return Object.assign({ mocks, propsData }, overrides)
}

describe('TestComponent.vue', () => {
    
})
```

#### Test case 1:  Render HTML

Có ai đó vô tình đổi tên biến `title` thành `name` và quên mất cập nhập trong file template. Có vẻ là một tình huống rất cần để viết test đúng không? Nhưng viết thế nào, số lượng biến như vậy trong template là nhiều vô số kể, viết test từng biến một thì chắc hết cả tuổi thanh xuân.

Cách tốt nhất để test trong trường hợp trên là dùng **snapshot test**. Nó sẽ không chỉ kiểm tra `title` mà còn gồm luôn cả image, button text, class,...

```js
test('TEST CASE 1: Render HTML', () => {
    const wrapper  = shallowMount(Item, createConfig())
    expect(wrapper).toMatchSnapshot()
})
```

![Viết unit test cho Vue Component](https://i.imgur.com/ikNBg1Y.png)

Chúng ta không kiểm tra đoạn text bên trong có render đúng như input không, như thế này là thừa thải

```js
test('render correct', () => {
    const wrapper  = shallowMount(Item, createConfig())
    expect(wrapper.find('h2').text()).toBe(item.title)
})
```

#### Test case 2: router login được gọi khi click button mà chưa đăng nhập

```js
test('TEST CASE 2: router login được gọi khi click button mà chưa đăng nhập', () => {
    const config = createConfig()
    const wrapper = shallowMount(Item, config)
    wrapper.find('button').trigger('click')
    /// thêm expect ở bên dưới
})
```

Mình sẽ không quan tâm, `<Login.vue/>` có được mount vào sau khi click hay không, chúng ta chỉ expect khi click `$router` sẽ push vào object `{ name: "login" }`

```js
const spy = jest.spyOn(config.mocks.$router, 'push')
expect(spy).toHaveBeenCalledWith({ name: 'login' })
```

#### Test case 3: vuex được gọi khi user đã đăng nhập và click button

Cũng tương tự như trên, chúng ta sẽ test mutation cập nhập đúng giá trị chúng ta mong muốn khi viết test cho store, còn ở component, chúng ta cần biết component có commit lên cho Vuex chưa

Sửa lại `$auth.check` thành `true` để giả lập đăng nhập thành công rồi, chúng ta kiểm tra phương thức `commit` của store

```js
test('TEST CASE 3: vuex được gọi khi user đã đăng nhập và click button', () => {
    const config = createConfig({
        mocks: {
            $auth: {
              check: () => true
            },
            $store: {
              state: [{ id: 2 }],
              commit: jest.fn()
            }
        }
    })
    const wrapper = shallowMount(TestComponent, config)
    wrapper.find('button').trigger('click')
    const spy = jest.spyOn(config.mocks.$store, 'commit')
    expect(spy).toHaveBeenCalled()
})
```

Toàn bộ file spec lúc này

```js
import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent.vue'

function createConfig (overrides) {
  const id = 1
  const mocks = {
    $auth: {
      check: () => false
    },
    $router: {
      push: jest.fn()
    },
    $store: {
      state: [{ id }],
      commit: jest.fn()
    }
  }
  const propsData = { id }
  return Object.assign({ mocks, propsData }, overrides)
}

describe('TestComponent', () => {
    test('TEST CASE 1: Render HTML', () => {
        const wrapper = shallowMount(TestComponent, createConfig())
        expect(wrapper).toMatchSnapshot()
    })
    test('TEST CASE 2: router login được gọi khi click button mà chưa đăng nhập', () => {
        const config = createConfig()
        const wrapper = shallowMount(TestComponent, config)
        wrapper.find('button').trigger('click')
        const spy = jest.spyOn(config.mocks.$router, 'push')
        expect(spy).toHaveBeenCalledWith({ name: 'login' })
    })

    test('TEST CASE 3: vuex được gọi khi user đã đăng nhập và click button', () => {
        const config = createConfig({
        mocks: {
          $auth: {
            check: () => true
          },
          $store: {
            state: [{ id: 2 }],
            commit: jest.fn()
          }
        }
        })
        const wrapper = shallowMount(TestComponent, config)
        wrapper.find('button').trigger('click')
        const spy = jest.spyOn(config.mocks.$store, 'commit')
        expect(spy).toHaveBeenCalled()
    })
})
```

## Kết

Mindset khi chúng ta viết unit test component là: **mọi unit test đều dư thừa, trừ khi bạn có lý do cho việc unit test đó**

Các câu hỏi chúng ta đặt ra trước khi viết
- Component sinh ra trên trái đất này để làm gì
- Public interface của component là gì, input, output nó là gì
- Đoạn test đó để kiểm tra code của mình, hay code của người ta?


Các bài viết đã tham khảo

<a target="_blank" rel="noopener noreferrer" href="https://www.vuemastery.com/blog/unit-testing-vue-1/">📜 Unit Testing in Vue: What to Test?</a>

<a target="_blank" rel="noopener noreferrer" href="https://vuejsdevelopers.com/2019/08/26/vue-what-to-unit-test-components/">📜 Knowing What To Test - Vue Component Unit Testing</a>