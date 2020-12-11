Khác nhau giữa `useSelector` và `mapState`

- Khi một action được `dispatch`, `useSelector` sẽ thực hiện một phép so sánh giữa kết quả trước đó và kết quả hiện tại, nếu khác, component bị force để re-render.
- `useSelector` sử dụng phép so sánh `===` chứ không dùng phương pháp so sánh **shallow** (dịch vui là so sánh "nhẹ")

Lý do sử dụng selector

- Sử dụng lại, một selector có thể sử dụng ở nhiều nơi, nhiều component khác nhau
- Tinh gọn, ví dụ chúng ta có *entity* `user`  chứa `lastname`, `fullname`, `email`, nhưng chúng ta chỉ muốn lấy `email`, một selector `getUserEmail` sẽ rất rõ ràng tinh gọn

## Sử dụng sao cho tối ưu?

Vì `useSelector` dùng phép so sánh `===` nên nếu hàm selector trả về mảng (dùng `.map`, `.filter`, destructuring `...`), component sẽ bị trigger re-render.

Cũng nên để ý, khi function dùng làm *selector* có thể có nhiều tính toán, transform phức tạp. Với mỗi lần re-render, sẽ tốn thời gian để thực thi hàm selector.

```js
const selectData = state => {
    const filteredData = expensiveFiltering(state.data);
    const sortedData = expensiveSorting(filteredData);
    const transformedData = expensiveTransformation(sortedData);
    return transformedData;
};
...
const data = useSelector(selectData);
```

Trong lúc re-render,  dù cho `data` không thay đổi, hàm `selectData` vẫn được gọi.

Giải quyết bằng cách sử dụng thư viện [Reselect](https://github.com/reduxjs/reselect), nó sẽ cho phép trả về kết quả trước đó, nếu input là giống nhau.

```jsx
import React from 'react'
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectUsers = state => state.users;

const selectData = createSelector(
    state => state.data,
    data => {
        const filteredData = expensiveFiltering(data);
        const sortedData = expensiveSorting(filteredData);
        const transformedData = expensiveTransformation(sortedData);
        return transformedData;
    }
);

export const UsersCounter = () => {
    ...
    const data = useSelector(selectData);
    ...
}
```





https://programmerden.com/2020/04/06/optimize-your-redux-selectors-with-useselector-hook-and-memoize-them-with-reselect/