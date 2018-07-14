---
slug: "/2018-05-01-cai-thien-performance-react-app"
date: "2018-05-01"
title: "Cải thiện performance của React App"
desc: "Series này mình sẽ đề cập các cách làm để cải thiện performance của React App"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

Chúng ta sẽ lượt qua các vấn đề sau

1. Cách viết `shouldComponentUpdate` không hợp lý và tại sao `PureComponent` không phải vị cứu tinh
2. Thay đổi **DOM** quá nhiều lần
3. Sử dụng **events** và **calbacks**

## `shouldComponentUpdate` và PureComponent

Để ngăn việc *render* không cần thiết chúng ta sẽ can thiệp bên trong hook `shouldComponentUpdate`, nó nhận vào `props` sẽ thay đổi và `state` mới, nếu hàm này return `true`, hàm `render` sẽ được gọi, và ngược lại.


### Vấn đề

Hãy thử xem xét cách viết `shouldComponentUpdate` thường thấy 

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

Còn PureComponent thì sao, thay vì return boolean value trong `shouldComponentUpdate`, nó sẽ return kết quả của so sánh `props` và `state`

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

Trong thực tế cho thấy PureComponent không mấy hữu dụng, không biết là tính năng hay là bug mà PureComponent sẽ không chặn việc render ở đây.

### Giải pháp

Một giải pháp có thể nghĩ ngay tới là thực hiện một phép so sánh toàn diện, cái này thật ra là chạy, nhưng sẽ vướng 2 khuyết điểm

1. So sánh toàn diện thì tốn nhiều thời gian code, ì ạch, thậm chí còn làm performance tệ hơn
2. Phụ thuộc vào phiên bản React hiện tại đang sử dụng, nếu có release mới, khả năng là ko còn sử dụng được

Theo quan điểm cá nhân, so sánh toàn diện không nên áp dụng.

Evan You tác giả của Vue.js trong [trả lời này](https://github.com/vuejs/vue/issues/4255#issuecomment-274143903) có đề cập việc sử dụng `shouldComponentUpdate` có thể bỏ qua vì nó không mấy thực tế, có rất nhiều trường hợp có thể bị bỏ xót nếu để mặc cho React Element tự xác định state nào đã change trong component.

Thay vì kiểm tra `this.props.children !== nextProps.children`, sử dụng các `props` khác nhau để xác định state change, khuyến khích dùng *string/numeric* để so sánh cho lẹ


## Thay đổi DOM quá nhiều lần

Có bao giờ bạn từng sử dụng một *component* nhiều lần trong app, cảm thấy app hơi lag? Animation cảm giác chạy hơi khực khực?

### Vấn đề

Khi xây các component phức tạp, bạn sẽ phải xào nấo DOM một chút, khả năng sẽ vướng vào 2 issue sau

1. [Trigger layout](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
2. [Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid_layout_thrashing)

Hãy chạy thử hiệu ứng đang làm cho một component **Collapse** với khoản vài chục cái instance, sau đó chọn 6x slowdown trên dev tool để thấy sự khác biệt, 6x slowdown là giá trị tương ứng với tốc độ khi xem trên điện thoại

[](https://cdn-images-1.medium.com/max/800/1*2xOju9iTPGs22U0joILHmQ.png)

### Giải pháp

Mỗ sẽ một component **Collapse**, ta thường sẽ làm là thay đổi độ cao của nó

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

## Callback

Khi attact một function vào bất kỳ event nào trên DOM, nếu có thêm `debounced` hoặc `throttled` sẽ tốt hơn, giảm tải số lần gọi đến function này đến mức thấp nhất.

Cách viết rất thường thấy

```js
window.addEventListener('resize', _.throttle(callback))
```

Nhưng tại sao không sử dụng nó trong component callback

### Vấn đề

Xét component sau

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

### Giải pháp

Để giải quyết vấn đề trên, có thểm viết lại component

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

Đợi user nhập xong đi rồi xử lý sự kiện, ở đây sử dụng `_.debounce`, `_.throttle` từ thư viện **lodash**, sự khác nhau của 2 thằng này thì đọc thểm trên docs của nó.

Nếu bị nghiện performance, bạn có thể chia sẽ thêm một số tip với mình. Thanks You

Tác Giả: Noam Elboim
Link bài gốc: https://medium.com/myheritage-engineering/how-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6