---
slug: "/2020-01-02-khi-nao-nen-su-dung-uselayouteffect-trong-react"
date: "2020-01-02"
title: "Khi nào nên sử dụng useLayoutEffect thay vì useEffect"
desc: "2 React Hook làm nhiệm vụ khá giống nhau là useEffect và useLayoutEffect bạn đã biết cách sử dụng thế nào cho đúng"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "react"]
---

```jsx
useEffect(() => {
  // thực hiện side effect
  return () => /* dọn rác */
}, [khai báo các giá trị mà nó phụ thuộc]);

useLayoutEffect(() => {
  // thực hiện side effect
  return () => /* dọn rác */
}, [thực hiện side effect]);
```

Nếu ko có khác nhau thì React team sẽ không tạo ra 2 thằng, hiển nhiên?. (Hầu như có thể dụng `useEffect` trong mọi tình huống)

Khác nhau là ở **THỜI GIAN THỰC HIỆN**

`useEffect` chạy **bất tuần tự** và đợi **sau** khi việc component đã xuất hiện trên màn hình (sau khi trình duyệt *paint*)

Quá trình cụ thế là thế này

1. Component gọi đến `render`
2. Màn hình cập nhập lại UI mới
3. **SAU ĐÓ** chạy `useEffect`

`useLayoutEffect`, ngược lại, chạy **tuần tự** sau khi render nhưng là **trước** khi UI cập nhập

Quá trình

1. Component gọi đến `render`
2. `useLayoutEffect` được gọi, đợi chạy xong mới đi tiếp
3. Màn hình cập nhập lại UI mới

Trong 99% các trường hợp, sử dụng `useEffect`  sẽ là cách tốt nhất, vì những effect của chúng ta sẽ cần đồng bộ với prop, state, không cần xảy ra **NGAY LẬP TỨC** và không ảnh hưởng đến kết quả cuối cùng của UI.

Ví dụ như fetch dữ liệu sẽ không cần có kết quả ngay lập tức, hay đặt để các event handler

Nếu thấy UI bị `flickering` (giống như xuất hiện sọc sọc trên màn hình tivi) khi cập nhập, nguyên nhân do nó đã render khi *vừa có* state, sau đó lại re-render lại với state nhận được sau cùng. Đó là lúc bạn dùng `useLayoutEffect`

Ví dụ nhé, bạn cho user click để thay đổi state `value`, nó sẽ re-render component, sau đó effect chạy, nó lại set giá trị `value` thành một con số ngẫu nhiên => lại re-render component.

```jsx
import React, {
  useState,
  useLayoutEffect
} from 'react';
import ReactDOM from 'react-dom';

const BlinkyRender = () => {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  console.log('render', value);

  return (
    <button onClick={() => setValue(0)}>
      value: {value}
    </button >
  );
};

ReactDOM.render(
  <BlinkyRender />,
  document.querySelector('#root')
);
```

Với cách dùng `useLayoutEffect` chúng ta chỉ cập nhập UI đúng **1** lần, trong khi component gọi render **2** lần.


<a target="_blank" rel="noopener noreferrer" href="https://daveceddia.com/useeffect-vs-uselayouteffect/">📜 When to useLayoutEffect Instead of useEffect</a>

