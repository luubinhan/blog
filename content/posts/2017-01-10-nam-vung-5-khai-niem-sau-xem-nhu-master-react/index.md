---
slug: "/2017-01-10-nam-vung-5-khai-niem-sau-xem-nhu-master-react"
date: "2017-01-10"
title: "Nắm vững 5 khái niệm sau, xem như master React"
desc: "Sạo vậy thôi chứ làm gì mà trở thành master ngay lập tức được, lý lẽ bình thường muốn master bất cứ thứ gì cũng cần mồ hôi và nước mắt. Hiểu được 5 khái niệm được cho là căn cơ nhất này sẽ giúp bạn dễ xa lầy hơn."
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Khái niệm #1: React component hoạt động ra sau](#khái-niệm-1-react-component-hoạt-động-ra-sau)
- [Khái niệm #2: JSX chạy thế nào](#khái-niệm-2-jsx-chạy-thế-nào)
- [Khái niệm 3: Props và State](#khái-niệm-3-props-và-state)
- [Khái niệm #4: Component API](#khái-niệm-4-component-api)
- [Khái niệm 5: Component Type](#khái-niệm-5-component-type)

<!-- /TOC -->

Sạo vậy thôi chứ làm gì mà trở thành master ngay lập tức được, lý lẽ bình thường muốn master bất cứ thứ gì cũng cần mồ hôi và nước mắt. Hiểu được 5 khái niệm được cho là căn cơ nhất này sẽ giúp bạn dễ xa lầy hơn.

1. Component
2. JSX
3. Props & State
4. Component API
5. Component Type

# Khái niệm #1: React component hoạt động ra sau

Điều đầu tiên cần nằm lòng là tất cả những gì React xây dựng điều xoay quanh component. Thế thì component là gì. Ví dụ tuyệt vời nhất là select HTML element, select có thể xem như một component được định nghĩa sẵn với kiểu hiển thị riêng của nó (màu xám, có label, nút tam giác nằm ở góc phải) và tự nó xử lý tác vụ đóng mở mấy cái option

![](https://img.readitlater.com/i/cdn-images-1.medium.com/max/800/1*dPxDcCmCItzEyQuPpHOS3Q/RS/w704.gif)

Giờ tưởng tượng là chúng ta sẽ tự build ra một cái component tương tự như select với giao diện và event chúng ta tự kiểm soát

![](https://img.readitlater.com/i/cdn-images-1.medium.com/max/800/1*AZ2IbiM4WskvgvIyhq6qPA/RS/w704.gif)

Đó là những gì React giúp chúng ta làm, xây dựng một đối tượng không chỉ output ra một HTML templete thông thường,  chúng ta sẽ viết ra những function để control những event trên cái template đó

Để tạo ra một React component căn bản nhất

```js
class MyComponent extends React.component {
 render(){
  return Hello World!;
 }
}
```

#  Khái niệm #2: JSX chạy thế nào

Có thể thấy là với cách tạo ra một component như React thì javascript và HTML sống chung một nhà. Vũ khí bí mật của React để làm được chuyện "what-the-heck" đó là JSX language.

Ngày xưa, đi học được dạy phải tách biệt HTML ra một file và JS ra một file, thời gian sau này anh em làm frontend thấy làm gom như vậy làm thấy nhanh hơn, mà cũng không quá evil như mấy ông thầy dạy

```js
class MyComponent extends React.component {
 render(){
returnToday is: {new Data()};
 }
}
```

Để ý cái cách ta chèn code javascript ở trong HTML bằng cách đưa nào vào bên trong dấu {}, đó là cách viết JSX

# Khái niệm 3: Props và State

Bạn chắc chắn biết đến attribute href cho thẻ a , chưa biết? về lại w3com học nhé. Với một component của React những attribute như vậy được gọi là props . Props là cách mà các component tương tác lẫn nhau

```js
class ParentComponent extends React.Component{
 render(){
  return <ChildComponent message="Hello World" />;
 }
}
class ChildComponent extends React.Component{
 render(){
  return And then I said, "{this.props.message}";
 }
}
```

Dữ liệu trong component có thể truyền từ cha xuống con và không có ngược lại

Đôi khi dữ liệu sẽ không phải được truyền từ cha xuống con, mà nó chỉ là một dữ liệu tạm thời nào đó, ví dụ như giá trị input của user chẳng hạn, lúc đó nó được gọi là state

Cho dễ hình dung, nếu xem cái bảng nam châm là một component thì props là nút gạt xóa, state là những gì viết trên bảng

![](https://img.readitlater.com/i/cdn-images-1.medium.com/max/1000/1*aYxNrkwkAPwIoGc0-3k_Ug/RS/w704.jpeg)

Bên trong một component, state được quản lý bằng hàm setState thường được viết lòng trong một hàm xử lý sự kiện

```js
class MyComponent extends React.Component {
 handleClick = (e) => {
  this.setState ({clicked: true});
 }
 render(){
  return <a href="#" onClick={this.handleClick}> Click Me</a>;
 }
}
```

# Khái niệm #4: Component API

Những hàm như render và setState là một phần của component API, ngoài ra nó còn một số hàm hữu ích khác nữa như constructor để khởi tạo state và kích hoạt các phương thức, một số hàm trigger trước khi component được load, sau khi load, sau khi unmounting. vâng vâng.

Thật ra việc master được React phần nhiều là master được việc lập trình và khái niệm để kiến trúc ra một component hơn là một loạt các API được hỗ trợ sẵn, vậy nên phần này kết thúc ở đây.

# Khái niệm 5: Component Type

Mấy ví dụ trên, định nghĩa một component được khai báo dạng class

```js
class MyComponent extends React.Component{
}
```

Giờ thì hãy quên cách viết này đi! Bây giờ ai cũng viết một component ở dạng function component

Một functional component là một function nhận một props object như tham số truyền vào và trả về một đống HTML lằn xà ngoằn. Y hệt như cách viết template kinh điển, khác biệt cơ bản là ở chổ mình có thể xài JavaScript bất cứ chổ nào khi cần

```js
const myComponent = props => {
    return Hello {props.name}, Today is {new Date()};
}
```

Viết cách này có một hậu quả là mình không thể access được phương thức của component, trên thực tế việc này không ảnh hưởng gì làm vì phần lớn trường hợp ta không dùng tới.

Và như vậy component này sẽ không có phương thức setState , không có state luôn, người ta còn gọi là stateless functional component.

Cách viết này rất là gọn gàng, phù hợp cho những trường component đơn giản, nên áp dụng khi có thể.

Nguồn

>> https://medium.freecodecamp.com/the-5-things-you-need-to-know-to-understand-react-a1dbd5d114a3