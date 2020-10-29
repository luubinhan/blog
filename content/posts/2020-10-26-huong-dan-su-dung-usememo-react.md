---
slug: "2020-10-26-huong-dan-su-dung-usememo-react"
date: "2020-10-26"
title: "Hướng dẫn sử dụng useMemo trong React"
desc: "Nếu bạn thấy app của mình bắt đầu chậm, đó là lúc bạn nên bắt đầu cân nhắc các phương pháp để tối ưu tốc độ và đọc bài viết này."
tags: ["react", "thu-thuat"]
canonical_url: false
---

Thường React khá nhanh, chúng ta cũng không cần quá bận tâm đến việc tối ưu, nhiều bạn cũng sẽ không đồng ý với quan điểm này: những **tiện ích** để tối ưu mà React cung cấp, chưa đủ **trưởng thành** (premature - theo quan điểm của tác giả).

Chúng ta sẽ cùng xem qua cách sử dụng một **tiện ích** như vậy trong React để tối ưu tốc độ: `useMemo`

## Khi nào sử dụng `useMemo`

> Khi có những tính toán để lấy giá trị khá mất công, chúng ta lưu kết quả tính lại cho tiết kiệm thời gian tính toán.

Đừng dùng lộn với `React.memo` và `useCallback`, chúng nó được dùng vào những mục đích rất khác nhau.

## Ví dụ

Ví dụ chúng ta có ứng dụng hiển thị danh sách user, với tính năng cho phép filter theo user name.

```jsx
import React from 'react';
 
const users = [
  { id: 'a', name: 'Robin' },
  { id: 'b', name: 'Dennis' },
];
 
const App = () => {
  const [text, setText] = React.useState('');
  const [search, setSearch] = React.useState('');
 
  const handleText = (event) => {
    setText(event.target.value);
  };
 
  const handleSearch = () => {
    setSearch(text);
  };
 
  const filteredUsers = users.filter((user) => {
    console.log('Filter function is running ...');
    return user.name.toLowerCase().includes(search.toLowerCase());
  });
 
  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
 
      <List list={filteredUsers} />
    </div>
  );
};
 
const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
 
const ListItem = ({ item }) => {
  return <li>{item.name}</li>;
};
 
export default App;
```

Chỉ khi điền giá trị vào input, sau đó click `handleSearch` thì lúc giá trị của `filteredUsers` mới có sự thay đổi, tuy nhiên vì `filteredUsers` là một hàm nó sẽ luôn được rồi khi render, mỗi lần gõ một ký tự vào input, nó đã bị gọi lại, với giá trị trả về y như nhau.

Tất nhiên ứng dụng nhỏ thì vấn đề ở đây ko quá nghiêm trọng. Còn nếu muốn tối ưu hơn, chúng ta lưu lại kết quả, và chỉ chạy lại hàm tính toán kết quả khi có một sự thay đổi nào đó.

```jsx
const filteredUsers = React.useMemo(
    () =>
    users.filter((user) => {
        console.log('Filter function is running ...');
        return user.name.toLowerCase().includes(search.toLowerCase());
    }),
    [search]
);
```

Hàm này chỉ *execute* khi giá trị `search` thay đổi so với lần chạy trước đó.

Bản chất bên trong React thực hiện một phép so sánh trên giá trị `search` trước khi thực thi. Điều này có nghĩa là nếu chi phí cho việc so sánh này trong một số tình huống, đôi khi còn tốn nhiều thời gian hơn là việc gọi luôn mà ko cần so sánh. Nên các bạn có sử dụng cũng nên linh động, không nên quá cứng nhắc.

[How to useMemo in React](https://www.robinwieruch.de/react-usememo-hook?ck_subscriber_id=887772023)

