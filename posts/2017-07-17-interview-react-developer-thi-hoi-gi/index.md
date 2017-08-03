---
path: "/2017-07-17-interview-react-developer-thi-hoi-gi"
date: "2017-07-17T13:35:13.234Z"
title: "Interview React Developer thì hỏi gì?"
desc: "Một vài câu hỏi để kiểm tra mức độ am hiểu react của một lập trình viên frontend"
tags: ["javascript", "react"]
---

Mục Lục

<!-- MarkdownTOC -->

- Chuyện gì xảy ra khi gọi `setSate` ?
- Sự khác nhau giữa Element và Component trong React?
- Khi nào thì sử dụng Class Component và Functional Component
- `Refs` trong React dùng để làm gì
- Keys trong React là gì
- Sự khác nhau giữa controlled component và uncontrolled component
    - Controlled Component
    - Uncontrolled Component
- Để gọi AJAX, sự dụng sự kiện nào của lifecycle?
- `shouldComponentUpdate` dùng để làm gì
- Build Product bằng cách nào?
- Tại sao nên sử dụng `React.Children.map\(\)` thay vì `props.children.map\(\)`
- Events được xử lý trong React như thế nào?
- Sự khác nhau giữa `createElement` và `cloneElement`
- Argument thứ 2 của `setState` dùng để làm gì
- Đoạn code sau sai ở chổ nào

<!-- /MarkdownTOC -->


## Chuyện gì xảy ra khi gọi `setSate` ?

Đầu tiên, object được truyền trong <code>setState</code> sẽ được merge với state hiện tại của component, dựa trên sự thay đổi của object này, UI được update với state mới. Để làm được chuyện này, React sẽ dựng một cây React Element mới, so sánh sự khác nhau của cây element mới và cây element trước đó, React biết được chính xác chỉ cần update phần UI nào đã bị thay đổi.


## Sự khác nhau giữa Element và Component trong React?

React Element ám chỉ những gì thấy trên màn hình.

React component là một function hoặc class có hoặc không có input và sẽ trả về một React element.

## Khi nào thì sử dụng Class Component và Functional Component

Nếu component có state và các phương thức của lifecycle, sử dụng **Class Component**, ngược lại dùng **functional component**

## `Refs` trong React dùng để làm gì

Refs cho phép access trực tiếp đến DOM element hoặc một instance của component

```html

<input type="text" /> this.input = input} />

```

## Keys trong React là gì

Keys giúp React theo dõi sự thay đổi của một item trong list

```js
{this.state.todoItems.map( (task, uid) => {
  return
    <ul>
      <li>{task}</li>
    </ul>
  }
)}

```


## Sự khác nhau giữa controlled component và uncontrolled component

Controlled component là component React control dữ liệu dựa trên state và props, uncontrolled component là component mà dữ liệu được handle bởi DOM

#### Controlled Component

```html

<input type='text' value={this.state.username} onChange={this.updateUsername} />

```

#### Uncontrolled Component

```html

<input type='text' ref={(input) => this.input = input} />

```

## Để gọi AJAX, sự dụng sự kiện nào của lifecycle?

`componentDidMount` , lý do ko sử dụng <code>componentWillMount</code> vì React  có thể gọi componentWillMount nhiều lần nếu cần thiết, thứ 2 không thể chắc chắn AJAX luôn gọi thành công, nếu gơi vào trường hợp đó câu lệnh <code>setState</code> sẽ chạy trên unmounted component.

## `shouldComponentUpdate` dùng để làm gì

`shouldComponentUpdate` cho phép can thiệp quá trình update UI của component và các component con của nó.

## Build Product bằng cách nào?

Sử dụng phương thức DefinePlugin của Webpack để set `NODE_ENV = production`. Quá trình build production sẽ bỏ hết những đoạn như validate propType, cảnh báo này nọ, minify code, remove comments.

## Tại sao nên sử dụng `React.Children.map()` thay vì `props.children.map()`

`props.children` chưa chắc lúc nào cũng là array. Ví dụ

```html
<Parent>
    <h1>Welcome.</h1>
</Parent>
```

Nếu sử dụng `props.children.map` trong Parent sẽ bị lỗi vì `props.children` là một object không phải array.

```html
<Parent>
    <h1>Welcome.</h1>
    <h2>props.children will now be an array</h2>
</Parent>
```

`React.Children.map` cho phép `props.children` là array hoặc object đều được.

## Events được xử lý trong React như thế nào?

Các hàm xử lý event trong React sẽ được truyền vào một instance của `SyntheticEvent`, `SyntheticEvent` cũng giống như những native event bình thường của Browser trừ việc nó có thể làm việc trên tất cả các trình duyệt.

React không attach event vô các child node, mà sẽ lắng nghe tất cả các event sử dụng 1 event listener duy nhất, Với mục đích là để tăng performance và React không cần phải update lại event listener khi update DOM.

## Sự khác nhau giữa `createElement` và `cloneElement`

`createElement` là để tạo element, `cloneElement` copy element và đưa vào các props mới.

## Argument thứ 2 của `setState` dùng để làm gì

callback function, function sẽ chạy sau khi `component` được `render` lại với state mới.

`setState` là một phương thức bất đồng bộ (asynchronous)

## Đoạn code sau sai ở chổ nào

```js
this.setState((prevState, props) => {
 return { streak: prevState.streak + props.count }
})
```

Không sai gì cả, ít người biết rằng khi `setState` có thể truyền vào `previous state`.

Nguồn

https://tylermcginnis.com/react-interview-questions/