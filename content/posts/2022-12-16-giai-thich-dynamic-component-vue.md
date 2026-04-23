---
slug: "2022-12-16-giai-thich-dynamic-component-vue"
date: "2022-12-16"
title: "Dynamic component trong Vue"
desc: "Tìm hiểu khái niệm Dynamic component của Vue"
tags: ["javascript","vuejs","hoc-thuat","beginner"]
---

Khái niệm dynamic component trong Vue rất đơn giản, nếu `:is="true"`, component đó sẽ được render

```html
<component :is=”currentTab”></component>
```

Khi chúng ta dùng `:is`, còn một component khác cũng cần biết là `<keep-alive/>`, nó cho phép component *tạm thời* núp lùm chứ không phải *diệt cỏ tận gốc*, ví dụ trong tab component, khi switch qua switch lại giữa các tab, không cần phải kill nó luôn.

```html
<keep-alive>
<component :is=”currentTab” />
</keep-alive>
```

Chúng ta nghiền ngẫm xem cách sử dụng 2 đứa này, với một trường hợp khác

Có một cục dữ liệu như thế này, mỗi key là một kiểu dữ liệu khác nhau

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  birthdate: "1986-06-22T00:00:00Z",
  anniversary: "2005-10-09T00:00:00Z",
  activities: ["Skiing", "Hiking", "Cycling", "Drinking Beer"],
  about: "John talking about himself. It goes on and on forever...[snip]",
  metadata: {
    lastUpdateUTC: "2019-06-29T15:14:00Z",
    lastUpdatedBy: "admin"
  }
}
```

Để hiển thị 1 dữ liệu của key, chúng ta có thể làm như thế này

```html
<li>
  <span class="item-title">Name</span> {{ person.firstName }} {{ person.lastName }}
</li>
<li>
  <span class="item-title">Birthday</span> {{ person.birthday | formatDate }}
</li>
<li>
  <span class="item-title">activities</span> 
  // loop tiếp
</li>

```

Với từng kiểu dữ liệu khác nhau, chúng ta sẽ cần đến những filter khác nhau, hoặc thậm chí thêm thư viện (như để parse giá trị date). Vấn đề là chúng ta không loop được 1 lần một cho khỏe

Trước tiên chúng ta cần đưa trách nhiệm xử lý, định dạng các kiểu dữ liệu này cho component con, thằng bố chúng ta chỉ việc loop thôi

```html
<li><span class="item-title">First Name</span> <details-text :value="person.firstName + ' ' + person.lastName" /></li>
<li><span class="item-title">Birthday</span> <details-date :value="person.birthday" /></li>
<li><span class="item-title">Activities</span> <details-list :value="person.activities" /></li>
```

Vẫn chưa loop được, vì các component con này là khác nhau, chúng ta cần có một cách nào đó để đưa điều kiện: “Ê, chọn component này khi dữ liệu là a,b,c,d”

Dynamic component sẽ cho chúng ta làm điều đó!

Trước tiên chúng  ta cần transform dữ liệu ban đầu về dạng mảng như sau

```js
 computed: {
    items() {
      return [
        { name: "Name", value: `${this.person.firstName} ${this.person.lastName}`, component: "DetailsText" },
        { name: "Birthday", value: this.person.birthday, component: "DetailsDate" },
        { name: "Activities", value: this.person.activities, component: "DetailsList" },
      ];
    }
  }
```

Chúng ta đã có thể dùng `v-for`, chọn đúng component cần dùng

```html
<li v-for="item in items" :key="item.name">
	<span class="item-title">{{item.name}}</span>
	<component :is="item.component" :value="item.value" />
</li>
```

Cái hay là chỗ chúng ta map `:is=”item.component”` với component đã khai báo cho từng thằng dữ liệu 

[The Magic of Vue's Dynamic Components For Lists of Data](https://www.drewtown.dev/post/the-magic-of-vues-dynamic-components-for-lists-of-data)

