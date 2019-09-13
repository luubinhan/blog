---
slug: "/2019-06-17-huong-dan-toi-uu-hieu-nang-react-app"
date: "2019-06-17"
title: "3 bước tối ưu hiệu năng React App bằng các API mới của React"
desc: "Bài viết hướng dẫn tối ưu hiệu năng bằng memo, useMemo, useCallback"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "thu-thuat"]
---

<!-- TOC -->

- [React.memo](#Reactmemo)
- [useMemo](#useMemo)
- [useCallback](#useCallback)

<!-- /TOC -->


Khi sử dụng function component, React cung cấp 3 phương thức để tối ưu: `React.memo`, `useMemo`, và `useCallback`, chúng ta cùng điểm qua 3 thằng này

Xét ví dụ

```js
const ListPage = ({ data, title }) => (
    <>
        <Header title={title} />
        <List listItems={data} />
    </>
)
```

Component như trên (`<ListPage />`), khi nhận một `data` mới, tất cả component con bên trong là `Header` và `List` sẽ re-render, mặc dù cái `title` không hề thay đổi. Nếu `Header` không tốn quá nhiều thời gian để render thì ko có vấn đề. Ngược lại dĩ nhiên là nếu render `Header` tốn rất nhiều thời gian, chúng ta phải **xây lại** để tối ưu hơn.

## React.memo

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` là một HOC, [đọc lại bài này](https://luubinhan.github.io/blog/2018-11-04-gioi-thieu-react-memo-moi-trong-react-16), nó sẽ **nhớ** kết quả render của component. Nếu component trả về một output giống hệt cho cùng một prop, đưa nó vào `React.memo` sẽ tiết kiệm tí thời gian.

```js
const Header = ({ title }) => <h1>{title}</h1>

export default Header;
```

Wrap lại trong `React.memo`

```js
const Header = ({ title }) => <h1>{title}</h1>

export default React.memo(Header);
```

## useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Cũng tương tự nó sẽ nhớ kết quả trả về, tuy nhiên nó sẽ có thêm phần gọi là `array dependencies`, là một danh sách các **thằng** mà nó phụ thuộc, nếu giá trị phụ thuộc thay đổi nó mới rọi render lại, không thể trả thẳng kết quả lần trước


```js
const widgetList = useMemo(
    () => 
        widgets.map(w => ({
        ...w,
        totalPrice: someComplexFunction(w.price),
        estimatedDeliveryDate: someOtherComplexFunction(w.warehouse)
    })),
    [widgets]
);
```

Trong ví dụ trên, 1 component nhận một danh sách các widget, các widget này trước khi truyền vào sẽ được thêm vào 2 giá trị là *total price* và *delivery date*. Nếu giá trị các widget không thay đổi khi render lại component, thì không cần thiết phải chạy qua các hàm `someComplexFunction`, `someOtherComplexFunction`. Sử dụng `useMemo` để ghi nhớ kết quả và bỏ qua trong trường hợp đó.

## useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Mục đích để chặn các lần render không cần thiết giữa component cha và con

```js
const Parent = () => {
    const [showExtraDetails, setShowExtraDetails] = useState(false);
    return (
        <>
        <Child onClick={() => { showData(showExtraDetails); }/>
        </>
    )
}
```

1 component như vậy sẽ re-render cả cha và con cùng lúc, thậm chí component con có là `PureComponent` được wrap bên trong `React.memo` đi nữa, bởi vì `onClick` sẽ khác nhau trên mỗi lần render. Sử dụng `useCallback` chúng ta viết lại như sau

```js
const Parent = () => {
    const [showExtraDetails, setShowExtraDetails] = useState(false);
    const handleClick = useCallback(
      () => {
        showData(showExtraDetails);
      },
      [showExtraDetails],
    );
    return (
        <>
        <Child onClick={handleClick} />
        </>
    )
}
```

Như vậy hàm `handleClick` sẽ giống nhau cho các lần render khác nhau, nó chỉ khác khi `showExtraDetails` thay đổi.


<a target="_blank" rel="noopener noreferrer" href="https://headway.io/blog/react-optimize-components-memo-usememo-usecallback">React: Optimize Components with React.memo, useMemo, and useCallback</a>