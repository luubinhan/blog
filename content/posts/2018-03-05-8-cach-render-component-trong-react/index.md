---
slug: "/2018-03-05-8-huong-dan-cach-render-component-trong-react"
date: "2018-03-05"
title: "8 câu điều kiện khi render trong React"
desc: "Tutorial này sẽ cover những câu điều kiện dùng để render component phổ biến nhất"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [If/Else](#ifelse)
- [Ko render với `null`](#ko-render-với-null)
- [Đặt biến cho element](#đặt-biến-cho-element)
- [Câu điều kiện rút gọn](#câu-điều-kiện-rút-gọn)
- [Short-circuit operator (&&)](#short-circuit-operator-)
- [Immediately-invoked function expressions (IIFE)](#immediately-invoked-function-expressions-iife)
- [Subcomponents](#subcomponents)
- [Higher-Order Component (HOC)](#higher-order-component-hoc)

<!-- /TOC -->

# If/Else

Dễ nhất và căn bản nhất

```jsx
render() {
    if (this.state.mode === 'view') {
        return (
            <div />
        )
    } else {
        return (
            <div />
        )
    }
}
```

# Ko render với `null`

Nếu không muốn render một component, trong hàm return trả về giá trị `null`, lưu ý khi return null nhưng hàm render vẫn được gọi.

```jsx
render() {
    if (this.state.mode === 'view') {
        return <h1 />;
    } else {
        return (
            null
        )
    }
}
```

# Đặt biến cho element

Giờ nếu không muốn thêm câu `else`

```jsx
render() {
    let input;
    
    if (this.state.mode !== 'view') {
      input = <h1/>;
    }
      
    return input;
}
```

# Câu điều kiện rút gọn

Thay gì `if/else`, có thể dùng câu điều kiện rút gọn để render luôn

```
điều kiện ? nếu true : nếu false
```

Sử dụng với ví dụ trên

```jsx
render() {
    return(
        <div>
            {this.state.mode === 'view' ? <h1> : null}
        </div>
    )
}
```

Gọn gàng sạch sẽ hơn, tuy nhiên cũng đừng lạm dụng quá, có anh bạn làm chung với mình, lạm dụng cách này quá lố, đến nổi mỗi lần đọc code của anh ấy là cơn ác mộng, mặc dù không sai, nhưng thằng nào code sau mở lên đọc tội nó lắm.

```jsx
return (
  <div>
    { condition1
      ? <Component1 />
      : ( condition2
        ? <Component2 />
        : ( condition3
          ? <Component3 />
          : <Component 4 />
        )
      )
    }
  </div>
);
```

# Short-circuit operator (&&)

Trong trường hợp trên, rõ ràng việc trả về `null` cũng hơi dư thừa, có thể sử dụng ngắn-hơn-cả-ngắn với cú pháp `&&`. Cũng như câu điều kiện rút gọn, tuy nhiên nó sẽ chỉ render nếu `true`, con `false` nó sẽ không làm gì cả

```jsx
render() {
    return(
        <div>
            {this.state.mode === 'view' && <h1>}
        </div>
    )
}
```

# Immediately-invoked function expressions (IIFE)

IIFE như tên gọi nó đã nói lên tất cả, hàm sẽ thực thi ngay khi nó được định nghĩa.

Bình thường

```js
function myFunction() { 
    // ...
}
myFunction();
```

Để biến nó thành IIFE, convert nó qua thành một expression

```js
(function myFunction(/* tham số*/){
    // ...
}( /* tham số*/ ));

// viêt như vầy cũng được nha
(function myFunction(/* tham số*/){
    // ...
})( /* tham số*/ );

// hoặc bỏ luôn tên
(function(/* tham số*/){
    // ...
})( /* tham số*/ );

// hoặc dùng luôn arrow function cho máu
((/* tham số*/) => {
    // ...
})( /* tham số*/ );
```

Giờ thì dùng IIFE với component

```jsx
render() {
    return(
        <div>
            {
              (() => {
                const handler = view 
                    ? this.handleEdit 
                    : this.handleSave;
                const label = view ? 'Edit' : 'Save';
              
                return (
                  <button onClick={handler}>
                    {label}
                  </button>
                );
              })()
            }  
        </div>
    )
}
```

# Subcomponents

Nếu thấy dùng IFEE có vẻ hơi khó chịu, chúng ta đang làm React, tất cả hãy đưa về component, tách phần logic của component và phần render cái view ra luôn là đều được khuyến cáo, declarative vs. imperative programing

Vậy nên chuyển các điều kiện này sang một sub component để render dựa trên `props` luôn là ý hay.

```jsx
render(
    const view = this.state.mode === 'view';

    return(
        <div>
            {
              view
                ? <EditComponent handleEdit={this.handleEdit}  />
                : (
                  <SaveComponent 
                   handleChange={this.handleChange}
                   handleSave={this.handleSave}
                   text={this.state.inputText}
                 />
                )
            } 
        </div>
    )
)
```

Hoặc trong React-Router-4 mỗi route là một `If component` với cách thức vận hành như sao

```jsx
<If
    condition={ view }
    then={ editComponent }
    else={ editComponent }
/>

// Component Route trong React-Router
<Route path='/' component={Home} />
```

Đọc thêm về [React-Router-4](/2018-01-12-react-router-dom-gioi-thieu-react-router-4)


# Higher-Order Component (HOC)

Sử dụng HOC để truyền xuống một `prop` dựa trên kiểm tra logic

```jsx
function higherOrderComponent(Component) {
  return function EnhancedComponent(props) {
    if (condition) {
      return <AnotherComponent { ...props } />;
    }

    return <AnotherComponent { ...props } />;
  };
}
```

Đọc thêm về [HOCs tại đây](/2018-03-02-gioi-thieu-higher-order-component-trong-react)