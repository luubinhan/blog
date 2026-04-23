---
slug: "/2019-12-13-huong-dan-cai-thien-hieu-nang-react-component"
date: "2019-12-13"
title: "Tối ưu component React bằng React.memo, useMemo và useCallback"
desc: "Sử dụng những hàm có sẵn của React để viết component ngon hơn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "thu-thuat"]
---


Hầu hết các trường hợp, hiệu năng của các ứng dụng React không phải là vấn đề quá nghiêm trọng. Bản thân thư viện React đã hỗ trợ tận răng các phương để cải thiện lúc render component. Tuy nhiên cũng có vài trường hợp các component của chúng ta render nhiều hơn mức cần thiết và làm ảnh hưởng đến hiệu năng chung.

Lấy ví dụ

```jsx
const ListPage = ({ data, title }) => (
  <div>
    <Header title={title} />
    <List listItems={data} />
  </div>
);
```

Trong ví dụ rất rất đơn giản trên, nếu `data` thay đổi, toàn bộ `<Listpage/>` sẽ render, bao gồm cả `<Header />` vốn không có thay đổi gì nếu giá trị `data` khác đi

Thời bây giờ chúng ta chuộng kiểu viết functional component hơn, 3 cách để tối ưu cho một functional component là sử dụng: `React.memo`, `useMemo`, `useCallback`

## React.Memo

Là một Higher order component dùng để **ghi nhớ** kết quả của function component, tất nhiên nếu truyền cùng một prop thì kết quả trả về sẽ là không đổi, nên có thể lấy kết quả **đã nhớ** trước đó

```jsx
const Header = ({ title }) => <h1>{title}</h1>;

export default React.memo(Header);
```

Cách viết trên là bắt buộc, vì nếu bạn viết như bên dưới, component của bạn sẽ không xuất hiện trong devtool

```jsx
const Header = React.memo(({title}) => <h1>{title}</h1>));

export default Header;
```

## useMemo

Tên có vẻ giống, nhưng không giống nhau, nếu `React.memo` là một HOC để ghi nhớ một function component, `useMemo` là hàm giống như helper cho phép chỉ định: lưu lại kết quả của hàm nào và những giá trị nào sẽ làm thay đổi kết quả đó.


```jsx
const widgetList = useMemo(
  () =>
    widgets.map(w => ({
      ...w,
      totalPrice: someComplexFunction(w.price),
      estimatedDeliveryDate: someOtherComplexFunction(w.warehouseAddress)
    })),
  [widgets]
);
```

Ở đoạn code trên, chúng ta muốn **ghi nhớ** giá trị của `totalPrice` và `estimatedDeliveryDate` bởi vì việc tính toán các giá trị này vô cùng *tốn sức*. Chúng ta chỉ định `widgets` nếu không thay đổi thì đừng đi tính lại làm gì, mà lấy kết quả lần trước ra.

## useCallback

Được sử dụng để chặn việc render không cần thiết giữa `parent` và `children` component

```jsx
const Parent = () => {
    const [showExtraDetails, setShowExtraDetails] = useState(false);
    return (
        [...]
        <Child onClick={() => { showData(showExtraDetails); }/>
        [...]
    );
}
```

Component `Child` sẽ luôn re-render khi `Parent` render, thậm chí `Child` là một `PureComponent` hoặc được bọc trong `React.memo`

`useCallback` được dùng như bên dưới

```jsx
const Parent = () => {
    const [showExtraDetails, setShowExtraDetails] = useState(false);
    const handleClick = useCallback(
      () => {
        showData(showExtraDetails);
      },
      [showExtraDetails],
    );
    return (
        [...]
        <Child onClick={handleClick}/>
        [...]
    );
}
```

[https://headway.io/blog/react-optimize-components-memo-usememo-usecallback/](https://headway.io/blog/react-optimize-components-memo-usememo-usecallback/)

