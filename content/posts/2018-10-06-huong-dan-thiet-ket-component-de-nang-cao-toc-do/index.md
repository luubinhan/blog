---
slug: "/2018-10-06-huong-dan-thiet-ket-component-de-nang-cao-toc-do"
date: "2018-10-06"
title: "Nâng cao tốc độ Component"
desc: "Bài viết của team làm Facebook Ads chia sẽ, cùng điểm qua các vấn đề căn bản để tối ưu component"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "performance"]
---

<!-- TOC -->

- [Sử dụng `shouldComponentUpdate` và `React.PureComponent`](#sử-dụng-shouldcomponentupdate-và-reactpurecomponent)
- [Sử dụng dữ liệu Immutability để so sánh](#sử-dụng-dữ-liệu-immutability-để-so-sánh)
- [Chuyên biệt hóa để maintain và cải thiện hiệu năng](#chuyên-biệt-hóa-để-maintain-và-cải-thiện-hiệu-năng)
- [Độc lập trên từng `children`](#độc-lập-trên-từng-children)

<!-- /TOC -->

# Sử dụng `shouldComponentUpdate` và `React.PureComponent`

**re-render** là thứ sẽ tiêu tốn công sức và chúng ta phải hạn chế nó tối đa, bằng hook `shouldComponentUpdate(nextProps, nextState)`

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return (
    !shallowEqual(this.props, nextProps) ||
    !shallowEqual(this.state, nextState)
  );
}
```

Pure component là những component chỉ dùng giá trị `props` và `state` để `render`, không cần tính toán logic, nó cũng sẽ không có hook `shouldComponentUpdate`, React sẽ dùng kiểu so sánh **tương đối**

```jsx
// chỉ phụ thuộc vào props và state khi render
render() {
  return (
    <div style={{width: this.props.width}}>
      {this.state.rows}
    </div>
  );
}
```

Vì vậy phải đảm bảo các `children` của một PureComponent cùng là một PureComponent, nếu không có trường hợp nó sẽ không render đúng.

Ví dụ như bên dưới, 2 object này React sẽ so sánh được

```js
{
  size: 64,
  color: 'blue'
}
// .vs
{
  size: 64,
  color: 'red'
}
```

Nhưng object thế này thì thua

```js
{
  isActive: true,
  balance: '1500000',
  picture: '',
  age: 29,
  name: {
    first: 'An',
    last: 'Luu'
  },
  contact: [
    {
      email: function() {},
      phone: '123456'
    },
    {
      email: 'anluu@gmail',
      address: '123 Sai Gon'
    }
  ]
}
```

# Sử dụng dữ liệu Immutability để so sánh

Cách làm áp dụng ở đây tương tự như việc trả hàng hóa

![](https://uidesign.gearbest.com/gb_blog/2101-2400/2375/6-tips-about-applying-for-a-product-return-on-GearBest-Z00.jpg)

Nếu gói hàng bị trả chưa khui gì cả, người bán hàng chỉ cần kiểm tra xung quanh đảm bảo gói hàng chưa bị khui thì họ sẽ xem như nó còn nguyên vẹn, không cần kiểm tra bên trong.

Tương tự, nếu chúng ta dùng dữ liệu Immuatable, chúng ta có thể nhanh chóng biết được 2 object hay mảng đó có khác nhau hay không.

Để biết thêm về Immutable, [đọc thêm ở đây](https://facebook.github.io/immutable-js/)

# Chuyên biệt hóa để maintain và cải thiện hiệu năng

Chuyên biệt hóa là việc tách nhỏ các component ra, mỗi một component đảm nhiệm một công việc cụ thể

Ví dụ, thay vì viết 1 component là `ScrollingTable`

```jsx
<ScrollingTable
  width="123"
  style="blue"
  scrollTop={props.offsetTop}
/>
```

Nên viết thành 2 component

```jsx
<OuterScroller scrollTop={props.offsetTop}>
  <InnerTable width="123" style="blue" />
</OuterScroller>
```

# Độc lập trên từng `children`

Có thể hình dùng việc lồng ghép các component theo kiểu parent-children giống như một cái cây-thân-nhánh-lá

![](https://media.istockphoto.com/vectors/tree-background-vector-id518399734?k=6&m=518399734&s=612x612&w=0&h=qxXFy440iXG-CXB9jlC-TyWPKU0NRWLa3cGYu_-ukQI=)

Khi lồng ghép quá nhiều dẫn đến việc để so sánh và biết được sự khác nhau giữa **cây cũ** và **cây mới** là vô cùng tốn sức

Không những vậy, các component children sẽ thay đổi thường xuyên. Lấy ví dụ

```jsx
var Parent = React.Component({
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children;
  }
  render() {
    return (
      <section>{this.props.children}</section>
    )
  }
});

setInterval(() => React.render(
  <Parent>
    <div>child</div>
  </Parent>
), 1);
```

Tất nhiên đây là ví dụ để bạn dễ hình dung rằng các component children thường xuyên thay đổi, việc kiểm tra `shouldComponentUpdate` lúc này rất khó nói trước là `true` hay `false`

Khuyến khích sử dụng ContainerComponent để kết nối vào store và Component chỉ đảm nhiệm việc render HTML

```jsx
// BudgetWidgetContainer
var BudgetWidgetContainer = React.PureComponent({  
  render() {
    return <BudgetWidget value={this.state.amount} />
  }
});
```

`<BudgetWidget/>` không quan tâm value từ đâu có, nó chỉ việc render HTML, chúng ta có thể sử dụng component như vậy ở nhiều nơi, chúng ta chỉ cần viết lại Container Component

[Xem video gốc của bài viết](https://www.youtube.com/watch?v=KYzlpRvWZ6c)