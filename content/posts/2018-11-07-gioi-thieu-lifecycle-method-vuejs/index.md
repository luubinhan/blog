---
slug: "/2018-11-07-gioi-thieu-lifecycle-method-vuejs"
date: "2018-11-07"
title: "Giới thiệu lifecycle hook của Vue JS"
desc: "Giới thiệu nhanh gọn lẹ cho bạn nào chưa biết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vue"]
---

Mình đã có bài giới thiệu về [lifecycle hook của React Component](/2017-10-20-react-lifecycle-la-gi), Vue component cũng có lifecycle hook, biết hết các hook cơ bản là quan trọng vì sớm muốn chúng ta cũng muốn chạy một số đoạn code khi component được thêm vào DOM, được update, hoặc xóa.

![Giới thiệu lifecycle hook của Vue JS](https://d33wubrfki0l68.cloudfront.net/435786c6cbd23e078c35c2b21f40e1756b2c3d30/2098f/images/vuejs/external/component-lifecycle.png)


Chúng ta có thể nhóm nó theo

<!-- TOC -->

- [Initialization](#initialization)
  - [beforeCreate](#beforecreate)
  - [created](#created)
- [Mount ( chèn vào DOM )](#mount--chèn-vào-dom-)
  - [beforeMount](#beforemount)
  - [mounted](#mounted)
- [Update](#update)
  - [beforeUpdate](#beforeupdate)
- [updated](#updated)
- [Destroy](#destroy)
  - [beforeDestroy](#beforedestroy)
  - [destroyed](#destroyed)

<!-- /TOC -->

# Initialization

Các hook xảy ra trước khi component được chèn vào DOM, khác với các hook khác, những hook thuộc nhóm này sẽ chạy trong quá trình server-side render. Chúng ta cũng không truy cập được DOM và `this.$el` trong đây

## beforeCreate

Sự kiện xảy ra khi mới vừa khởi tạo component, `data` chưa khởi tạo, và các sự kiện chưa được setup

```js
export default {
	beforeCreate() {
		console.log('Không ai chạy trước mình đâu!')
	}
}
```

## created

Có thể truy xuất đến `data` và `events`. Template và Virtual DOM chưa được mount và render

```js
export default {
	data() {
    return {
      property: 'Blank'
    }
  },
  computed: {
    propertyComputed() {
      console.log('Thay đổi khi this.property thay đổi');
      return this.property;
  }
  },

  created() {
    this.property = 'Giá trị property mới';
    console.log('propertyComputed sẽ update vì this.property đã thay đổi');
  }
}
```

# Mount ( chèn vào DOM )

Các hook được sử dụng thường xuyên nhất. Cho phép truy cập lúc component ngay trước và sau lần render đầu tiên, tất nhiên nó sẽ không chạy lúc server render

Không nên sử dụng trong trường hợp muốn fetch dữ liệu cho component lúc khởi tạo. Thay vào đó dùng `created` ( hoặc `created` + `activated` cho component `keep-alive` )

## beforeMount

Ngay trước lần render đầu tiên và sau khi template hoặc render function được compile. Thường thì rất chẳng ai đụng đến hook này.

```js
export default {
	beforeMount() {
		console.log('this.$el chưa tồn tại')
}
}
```

## mounted

Chúng ta có thể truy cập tất cả, cũng là hook được sử dụng nhiều nhất

```jsx
<template>
	<p>text here</p>
</template>

<script>
	export default {
		mouted() {
			console.log(this.$el.textContent); // text here
		}
	}
</script>
```

# Update

Các hook sẽ được gọi khi component được re-render.

Không nên sử dụng các hook này nếu muốn biết các reactive property nào trên component đã thay đổi. Thay vào đó hãy sử dụng `computed` và `watch`

## beforeUpdate

Sau khi data thay đổi, trước khi render lại component.

```jsx
export default {
	data() {
		return {
			counter: 0
		}
	},
	beforeUpdate() {
		console.log(this.counter);
  },
  created() {
    setInterval( () => {
      this.counter++;
    }, 1000)
  }
}
```

# updated

Sau khi component được re-render

```jsx
<template>
	<p ref="dom-element">{{ counter }}</p>
</template>
<script>
export default {
	data() {
		return {
			counter: 0
}
},
updated() {
	// gọi mỗi giây
	console.log(+this.$refs['dom-element'].textContent === this.counter)
},
created() {
	setInterval( () => {
		this.counter++;
	}, 1000)
}
}
</script>
```

# Destroy

## beforeDestroy

Trước khi destroy

```jsx
export default {
  data() {
    return {
      someLeakyProperty: 'Em sẽ sử dụng hết bộ nhớ luôn!'
    }
  },

  beforeDestroy() {
    this.someLeakyProperty = null
    delete this.someLeakyProperty
  }
}

```

## destroyed

Sau khi destroy

```jsx
export default {
  destroyed() {
    console.log(this) // Chẳng bao giờ xài cái này
    MyCreepyAnalyticsService.informService('Mọi dấu vết đã được xóa')
  }
}

```

Ngoài ra, component `keep-alive` còn có 2 hook khác là `activated` và `deactivated`


<a href="https://alligator.io/vuejs/component-lifecycle/" target="_blank" rel="noopener noreferrer">Understanding Vue.js Lifecycle Hooks</a>