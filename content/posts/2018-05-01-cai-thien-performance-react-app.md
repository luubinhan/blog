---
slug: "/2018-05-01-huong-dan-cai-thien-performance-react-app"
date: "2018-05-01"
title: "Cải thiện performance của React App"
desc: "Trong bài này, chúng ta cùng đi qua các bước để fix những issue liên quan đến performance thường thấy."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "performance"]
---

<!-- TOC -->

- [Xác định các trường hợp render không cần thiết](#xác-định-các-trường-hợp-render-không-cần-thiết)
- [Tách các component update thường xuyên thành các component độc lập](#tách-các-component-update-thường-xuyên-thành-các-component-độc-lập)
- [`shouldComponentUpdate` và PureComponent](#shouldcomponentupdate-và-purecomponent)
- [Tránh việc đưa một object mới như là prop](#tránh-việc-đưa-một-object-mới-như-là-prop)
- [Production](#production)
- [Code splitting](#code-splitting)
- [Thay đổi DOM quá nhiều lần](#thay-đổi-dom-quá-nhiều-lần)
- [Callback](#callback)

<!-- /TOC -->

Toàn bộ source app ví dụ có thể lấy [ở đây https://github.com/ohansemmanuel/Cardie-performace](https://github.com/ohansemmanuel/Cardie-performace), khuyến khích các bạn nên tự lấy về và vọc.

Chạy lên nó sẽ có như vầy

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*Yh4h7wXPOcbaDBKdVJxm-g.png)

Khi click vào button nó sẽ update lại thông tin nghề nghiệp

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*o-8SuFxH2Tl37JG-wSOj0g.gif)

# Xác định các trường hợp render không cần thiết

Phương pháp đơn giản nhất để kiểm tra là bật nút `highlight update` trên React Dev tool.

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*jfeS12BHr2dt5ooLeh5u3Q.gif)

Cái viền màu xanh hiển thị xung quanh component cho biết nó đang gọi render.

Trong ví dụ này có thể thấy nguyên component `App` được re-render, không đúng như chúng ta mong muốn.

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*ofXx-J4tr7KXXlNozuW9OA.gif)

Tốt nhất là đúng cái phần hiển thị thông tin nghề nghiệp gọi render.

# Tách các component update thường xuyên thành các component độc lập

Sau khi đã bắt được component nào đang re-render không cần thiết, tách component này theo phương pháp sau

Component `App` connect với redux store bằng hàm `connect`, nó nhận các props là `name`, `location`, `likes` và `description`

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*EQLJ8lXEchp_USFfj2Em7A.png)

Khi user click cái button, cái description bị thay đổi. Nó làm cho component `App` re-render.

Nhớ lại kiến thức căn bản React, khi prop hoặc state thay đổi, cây virtual DOM được update

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/800/1*rv3Y1Au-GarKtoiTJSmWRA.png)
![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/800/1*x6NfWjAOcqwoZs2GhbdTZw.png)
![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/800/1*EpSSnv8Wjql-IcrNvzvz_A.png)

Giờ để xử lý, chúng ta tạo một component mới, đặt là `Profession`, để render thông tin description, chúng ta cần tổ chức lại để có cây virtual DOM như thế này

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*g8w3av5rclzcX9N387nxgQ.png)
![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*0kqtSR4WxvGy4yYBKyReIw.png)

Thay vì `<App />` nhận prop là `profession`, chuyển trách nhiệm này cho `<Profession />`

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*tLbbgUgBavBm6FMpOzqL7Q.png)

Kết quả sau khi tách component

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*Poo-6-5-bfYQ0qYBcXoyiw.gif)

# `shouldComponentUpdate` và PureComponent

Các bài viết liên quan đến chủ đề performance, chắc chắn sẽ nhắc đến `PureComponent`, bài này cũng không ngoại lệ.

```jsx
class MyComponent extends React.Component {}
class MyComponent extends React.PureComponent {}
```

Điều gì bạn cần quan tâm khi khai báo một component là `PureComponent`? Đó là việc mất đi hàm `shouldComponentUpdate`. Về nguyên tắc nó chỉ render lại khi `prop` thay đổi

```jsx
const Description = ({ description }) => (
	<p>
		<span className="faint">I am</span> a {description}
	</p>
)
```

Tác giả bài viết này còn chia nhỏ hơn nữa

```jsx
const Description = ({ description }) => {
  return (
    <p>
      <I />
      <Am />
      <A />
      <Profession profession={description} />
    </p>
  );
};
```

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*TpXci0NJ24imQqmsc7S-_A.png)

Chúng ta cần nhớ lại 1 lần nữa: React định nghĩa thế nào là một PureComponent?

Hãy thử xem xét cách viết `shouldComponentUpdate`

```jsx
class ShouldNotUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.children !== nextProps.children;    
  }
  
  render() {
    return `I should be rendered only 1 time. actual times rendered: ${++this.counter}`;
  }
}
```

Kết quả trả về sẽ không phải counter = 1, nghĩa là hàm render thực sự sẽ chạy rất nhiều lần, tại sao lại vậy? bởi vì `this.props.children !== nextProps.children` sẽ luôn luôn trả về `true`, React sẽ tạo ra một instance mới, 1 **ReactElement mới** mỗi khi render

```jsx
class ShouldNotUpdate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.counter = 0;
  }
  
  render() {
    return `I should be rendered only 1 time. actual times rendered: ${++this.counter}`;
  }
}
```

Số lần render vẫn không giảm đi, tại sao? Đọc tiếp sẽ rõ.

# Tránh việc đưa một object mới như là prop

Nó sẽ xảy ra tình huống là `prop` không thay đổi, nhưng React nghĩ là nó đã thay đổi, nên render lại. Ví dụ

```jsx
class I extends PureComponent {
  render() {
    return <span className="faint">{this.props.i.value} </span>;
  }
}

// đâu đó truyền vào 
class Description extends Component {
  render() {
	const i = {
	  value: "i"
	};
	return (
	  <p>
      <I i={i} />
	    <Am />
	    <A />
	    <Profession profession={this.props.description} />
	  </p>
	);
  }
}
```

![Cải thiện performance của React App](https://cdn-images-1.medium.com/max/1600/1*NymA8dLgtXQIHhk7AI2LzQ.png)

Ngay cả khi `<I />` là một PureComponent, nó vẫn render khi `profession` thay đổi.

Tại sao?

Khi `<Description />` nhận một prop mới, hàm render được gọi

Khi đến đoạn này `<I i={i} />`, giá trị của `i` là một object hoàn toàn mới

Với `PureComponent` nó chỉ dùng **shallow compare** giữa prop cũ và mới, tức là `string` và `number` thì so sánh theo giá trị, còn `object` so sánh theo tham chiếu đến vùng nhớ

Giá trị của `i` không khác, nhưng thực sự nó đã tham chiếu đến vùng nhớ khác

Điều này cũng giải thích cho việc tại sao cách làm như thế này không được khuyến khích

```jsx
Render()
<div onClick={() => { /*do something*/ }} />
```

Function cũng là một `object`, bạn đang truyền vào một `object` mỗi lần render

```jsx
// Do this, please
handleClick = () => {
}
render() {
  <div onClick={this.handleClick}
}
```

# Production

Deploy thì luôn build bằng production nhỉ, ngoài ra ở phía server nên nén lại bằng Gzip. Nếu dùng Node/Express ở backend, cài thêm module `compression` và sử dụng như Express middleware

# Code splitting

Cái này mình có hướng dẫn rồi, đọc lại [ở đây](/2018-10-07-huong-dan-lazy-load-component-react)

# Thay đổi DOM quá nhiều lần

Có bao giờ bạn từng sử dụng một *component* nhiều lần trong app, cảm thấy app hơi lag? Animation cảm giác chạy không mượt?

Khi xây các component phức tạp, bạn sẽ phải xử lý DOM một chút, khả năng sẽ vướng vào 2 issue sau

1. [Trigger layout](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
2. [Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid_layout_thrashing)

Hãy chạy thử hiệu ứng đang làm cho một component **Collapse** với khoản vài chục cái instance, sau đó chọn 6x slowdown trên dev tool để thấy sự khác biệt, 6x slowdown là giá trị tương ứng với tốc độ khi xem trên điện thoại

[Cải thiện performance của React App](https://cdn-images-1.medium.com/max/800/1*2xOju9iTPGs22U0joILHmQ.png)

Component **Collapse**, ta thường sẽ làm là thay đổi độ cao của nó

```jsx
updateHeight(isOpen) {
  if (isOpen) {
    this.containerEl.style.height = `${this.contentEl.scrollHeight}px`;
  } else {
    this.containerEl.style.height = '0px';
  }
}
```

Có 2 điểm cần lưu ý

1. Chúng ta thay đổi *height*, là chúng ta trigger chuyện sắp xếp lại Layout. Nếu chúng ta thay đổi `transform`, chúng ta chỉ sẽ trigger **Composite** và nhìn nó sẽ smooth hơn.
2. Dòng `this.containerEl.style.height = ${this.contentEl.scrollHeight}px;` là một ví dụ điển hình của **Layout Thrashing**, chúng ta đọc giá trị độ cao hiện tại, rồi lấy giá trị đó update cho một đối tượng DOM, nhân số lần này lên với số lượng component **Collapse** sẽ là một số lần đáng quan tâm. Sẽ tốt hơn nếu chúng ta chỉ đọc một lần rồi gán giá trị một lượt luôn.


```jsx
updateHeight(isOpen) {
  this.lastRAF && cancelAnimationFrame(this.lastRAF);
  if (isOpen) {
    this.lastRAF = requestAnimationFrame(() => {
      // đọc
      const height =`${this.contentEl.scrollHeight}px`;
      this.lastRAF = requestAnimationFrame(() => {
        this.lastRAF = requestAnimationFrame(() => {
          // gán giá trị
          this.containerEl.style.height = height;
          this.lastRAF = null;
        });
      });
    });
  } else {
    this.containerEl.style.height = '0px';
  }
}
```

Có thể sử dụng thư viện [Fastdom](https://github.com/wilsonpage/fastdom) thay vì tự viết

# Callback

Khi attach một function vào bất kỳ event nào trong DOM, nếu có thêm `debounced` hoặc `throttled` sẽ tốt hơn, giảm tải số lần gọi đến function này đến mức thấp nhất.

Cách viết rất thường thấy

```js
window.addEventListener('resize', _.throttle(callback))
```

Nhưng tại sao không sử dụng nó trong component callback?

```jsx
export default class UnleashedOne extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render () {
    return (
      <input onChange={this.onChange}/>
    );
  }
}
```

Chúng ta đang lắng nghe tất tần tật mỗi khi có thay đổi trên `input`, như vậy thực sự có cần thiết không?

Để giải quyết vấn đề trên, có thể viết lại component

```jsx
export default class LeashedOne extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeDebounce = _.debounce(value => this.props.onChange(value), 300);
  }
  onChange(e) {
    this.onChangeDebounce(e.target.value);
  }
  render () {
    return (
      <input onChange={this.onChange}/>
    );
  }
}
```

Đợi user nhập xong đi rồi xử lý sự kiện, ở đây sử dụng `_.debounce`, `_.throttle` từ thư viện **lodash**, sự khác nhau của 2 thằng này thì đọc thêm trên docs của lodash.

Nếu bị nghiện performance, bạn có thể chia sẻ thêm một số tip với mình.


Tham khảo thêm 

- [Giới thiệu React Profiler](/2018-09-19-huong-dan-react-profiler-dev-tool)


Tài liệu tham khảo

- [https://medium.com/myheritage-engineering/how-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6](https://medium.com/myheritage-engineering/how-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6)
- [https://logrocket-blog.ghost.io/death-by-a-thousand-cuts-a-checklist-for-eliminating-common-react-performance-issues/](https://logrocket-blog.ghost.io/death-by-a-thousand-cuts-a-checklist-for-eliminating-common-react-performance-issues/)