## Selector

> Selector là một hàm nhận input là 'state' của store và trả về một giá trị mong muốn

```js
const selectEntities = state => state.entities;

function selectItemIds(state) {
    return state.items.map(item => item.id);
}

const selectSomeSpecificField = state => state.some.deeply.nested.field;

function selectItemsWhoseNamesStartWith(items, namePrefix) {
     const filteredItems = items.filter(item => item.name.startsWith(namePrefix));
     return filteredItems;
}
```

Về cách đặt tên, không bắt buộc, nhưng đa phần sẽ đặt với *prefix* `select` hoặc `get`

## Khác nhau giữa `useSelector` và `mapState`

- Khi một *action* được *dispatch*, `useSelector` sẽ thực hiện so sánh giữa kết quả trước đó và kết quả hiện tại, *nếu khác*, component bị force để re-render.
- `useSelector` sử dụng so sánh `===` chứ không dùng phương pháp so sánh **shallow** (dịch vui là so sánh "nhẹ")

## Lý do sử dụng selector

- Sử dụng lại, một selector có thể sử dụng ở nhiều nơi, nhiều component khác nhau
- Tinh gọn, ví dụ chúng ta có *entity* `user`  chứa `lastname`, `fullname`, `email`, nhưng chúng ta chỉ muốn lấy `email`, một selector `getUserEmail` sẽ rất rõ ràng tinh gọn
- Lý tưởng nhất, chỉ có *reducer* và *selector* mới biết được structure của redux store, như vậy một khi structure này có thay đổi, chúng ta chỉ việc cập nhập lại ở 2 chổ này.

```js
import { createSelector } from 'reselect'

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)

...
const visibleTodos = useSelector(getVisibleTodos)
...
```

## Sử dụng sao cho tối ưu?

Vì `useSelector` dùng phép so sánh `===` nên nếu hàm selector trả về mảng (dùng `.map`, `.filter`, destructuring `...`), component sẽ bị trigger re-render.

Để ý, khi function dùng làm *selector* có thể có nhiều tính toán, transform phức tạp. Với mỗi lần re-render, sẽ tốn thời gian để thực thi hàm selector.

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

### Selector phụ thuộc vào giá trị prop của component

Trong trường hợp một hàm selector có nhận input là prop của component, phải đảm bảo hàm selector được khai bao bên ngoài component.

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectUser = (state, userId) => users.find(user => user.id === userId);

const selectUserById = createSelector(
  [selectUser],
  user => expensiveTransformation(user)
);

export const UserDetails = ({ userId }) => {
  const user = useSelector(state => selectUserById(state,userId));
  return <div>{user.name}</div>
};

export const App = () => {
  return (
    <>
      <span>User Details:</span>
      <UserDetails userId={1} />
    </>
  )
};
```

### Nhiều instance của một component

Khi một hàm selector được dùng trong nhiều *instance* của một component và cũng phụ thuộc vào `prop`, như 2 *instance* của `UserDetails` ở trên

```jsx
<UserDetails userId={1} />
<UserDetails userId={2} />
```

Chúng ta cần chắc chắn, **mỗi `instance` của `UserDetails` sẽ ứng với một instance của hàm selector,** nếu chỉ viết như ví dụ ở trên là không được, cả 2 instance của `UserDetails` chỉ trỏ về một selector.

Sử dụng kết hợp với `useMemo` của React để đạt được kết quả mong muốn

```jsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectUser = (state, userId) => users.find(user => user.id === userId);

const makeSelectUserById = () => 
  createSelector(
    [selectUser],
    user => expensiveTransformation(user)
  );

export const UserDetails = ({ userId }) => {
  const selectUserMemo = useMemo(makeSelectUserById, []);
  const user = useSelector(state => selectUserMemo(state, userId));
  return <div>{user.name}</div>
};

export const App = () => {
  return (
    <>
      <span>User Details:</span>
      <UserDetails userId={1} />
	  <UserDetails userId={2} />
    </>
  )
};
```

Với cách này `const selectUserMemo = useMemo(makeSelectUserById, []);` chúng ta tạo một instance của hàm selector trên từng instance của component.

https://programmerden.com/2020/04/06/optimize-your-redux-selectors-with-useselector-hook-and-memoize-them-with-reselect/

https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/

