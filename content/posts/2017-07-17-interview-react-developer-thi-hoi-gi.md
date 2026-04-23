---
slug: "/2017-07-17-interview-react-developer-thi-hoi-gi"
date: "2017-07-17"
title: "Interview React Developer thì hỏi gì?"
desc: "Một vài câu hỏi để kiểm tra mức độ am hiểu react của một lập trình viên frontend"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Chuyện gì xảy ra khi gọi `setState` ?](#chuyện-gì-xảy-ra-khi-gọi-setstate-)
- [Sự khác nhau giữa Element và Component trong React?](#sự-khác-nhau-giữa-element-và-component-trong-react)
- [Khi nào thì sử dụng Class Component và Functional Component](#khi-nào-thì-sử-dụng-class-component-và-functional-component)
- [`Ref` trong React dùng để làm gì](#ref-trong-react-dùng-để-làm-gì)
- [Key trong React là gì](#key-trong-react-là-gì)
- [Sự khác nhau giữa controlled component và uncontrolled component](#sự-khác-nhau-giữa-controlled-component-và-uncontrolled-component)
- [Để gọi AJAX, sử dụng sự kiện nào của lifecycle?](#để-gọi-ajax-sử-dụng-sự-kiện-nào-của-lifecycle)
- [`shouldComponentUpdate` dùng để làm gì](#shouldcomponentupdate-dùng-để-làm-gì)
- [Build Product bằng cách nào?](#build-product-bằng-cách-nào)
- [Tại sao nên sử dụng `React.Children.map()` thay vì `props.children.map()`](#tại-sao-nên-sử-dụng-reactchildrenmap-thay-vì-propschildrenmap)
- [Events được xử lý trong React như thế nào?](#events-được-xử-lý-trong-react-như-thế-nào)
- [Sự khác nhau giữa `createElement` và `cloneElement`](#sự-khác-nhau-giữa-createelement-và-cloneelement)
- [Argument thứ 2 của `setState` dùng để làm gì](#argument-thứ-2-của-setstate-dùng-để-làm-gì)
- [Đoạn code sau sai ở đâu](#đoạn-code-sau-sai-ở-đâu)

<!-- /TOC -->

## Chuyện gì xảy ra khi gọi `setState` ?

Đầu tiên, object được truyền trong <code>setState</code> sẽ được merge với state hiện tại của component, dựa trên sự thay đổi của object này, UI được update với state mới.

Để làm được chuyện này, React sẽ dựng một cây React Element mới, so sánh sự khác nhau của cây element mới và cây element trước đó, React biết được chính xác chỉ cần update phần UI nào đã bị thay đổi.

## Sự khác nhau giữa Element và Component trong React?

React Element ám chỉ những gì thấy trên màn hình.

React component là một function hoặc class có hoặc không có input và sẽ trả về một React element.

## Khi nào thì sử dụng Class Component và Functional Component

Nếu component có state và các phương thức của lifecycle, sử dụng **Class Component**, ngược lại dùng **functional component**

## `Ref` trong React dùng để làm gì

Ref để truy cập trực tiếp đến DOM sau khi render

```jsx
<input type="text" ref={(input) => this.input = input} />
```

## Key trong React là gì

Key giúp React theo dõi sự thay đổi của một item trong list. Tại sao thêm key? để **tối ưu performance**, giúp React tìm nhanh tới element đó khi cần.

```jsx
{this.state.todoItems.map((task, uid) => {
  return
    <li key={uid}>{task}</li>
  }
)}
```

## Sự khác nhau giữa controlled component và uncontrolled component

**Controlled Component**: `prop` hoặc `state` của component được gán cho giá trị DOM

```jsx
<input type='text' value={this.state.username} onChange={this.updateUsername} />
```

**Uncontrolled Component**: giá trị của DOM thì do DOM quản

```jsx
<input type='text' ref={(input) => this.input = input} />
```

## Để gọi AJAX, sử dụng sự kiện nào của lifecycle?

`componentDidMount`

# `shouldComponentUpdate` dùng để làm gì

`shouldComponentUpdate` cho phép can thiệp quá trình update UI của component và các component con của nó. Nếu return `true` thì update, ngược lại `false`


## Tại sao nên sử dụng `React.Children.map()` thay vì `props.children.map()`

`props.children` chưa chắc lúc nào cũng là `array`. Ví dụ

```jsx
<Parent>
    <h1>Welcome.</h1>
</Parent>
```

Nếu sử dụng `props.children.map` trong Parent sẽ bị lỗi vì `props.children` là một object không phải array.

```jsx
<Parent>
    <h1>Welcome.</h1>
    <h2>props.children will now be an array</h2>
</Parent>
```

`React.Children.map` cho phép `props.children` là `array` hoặc `object` đều được.

## Events được xử lý trong React như thế nào?

Các hàm xử lý event trong React sẽ được truyền vào một instance của `SyntheticEvent`, `SyntheticEvent` cũng giống như những native event bình thường của Browser trừ việc nó có thể làm việc trên tất cả các trình duyệt.

React không attach event vô các child node, mà sẽ lắng nghe tất cả các event sử dụng 1 event listener duy nhất, Với mục đích là để tăng performance và React không cần phải update lại event listener khi update DOM.

## Sự khác nhau giữa `createElement` và `cloneElement`

`createElement` là để tạo element, `cloneElement` copy element và đưa vào các props mới.

## Argument thứ 2 của `setState` dùng để làm gì

callback function, function sẽ chạy sau khi `component` được `render` lại với state mới.

`setState` là một phương thức bất đồng bộ (asynchronous)

## Đoạn code sau sai ở đâu

```jsx
this.setState((prevState, props) => {
 return { streak: prevState.streak + props.count }
})
```

Không sai gì cả, ít người biết rằng khi `setState` có thể truyền vào `previous state`.

<a target="_blank" rel="noopener noreferrer" href="https://tylermcginnis.com/react-interview-questions/">📜 React Interview Questions</a>



