---
slug: "2022-05-07-cach-dung-usetransition-trong-react"
date: "2022-05-07"
title: "React Transition"
desc: "Một tính năng mới trong React 18, cho phép chúng ta đánh giấu một thay đổi là transition"
tags: ["javascript", "beginner", "hoc-thuat", "react"]
---

React cho phép nó gián đoạn (không cập nhập những thay đổi đó ngay lập tức) và tránh việc hiển thị *Suspense fallback* component.

React sẽ phân biệt việc cập nhập UI thành 2 loại: loại một cần thực hiện ngay (như nhập liệu input, chọn giá trị trong dropdown), và loại có ưu tiên thấp hơn, chậm chút không sao (như filter một danh sách)

2 API mới, một hook và một cái dùng trong trường hợp không thể dùng hook
- React.startTransition
- React.useTransition

```jsx
function App() {
	const [isPending, startTransition] = useTransition();
	const [count, setCount] = useState(0);
	
	function handleClick() {
		startTransition(() => {
			setCount(c => c + 1);
		})
	}
	
	return (
		<div>
			{isPending && <Spinner />}
			<button onClick={handleClick}>{count}</button>
		</div>
	)
}
```

Lấy một ví dụ để thấy rõ hơn ứng dụng của *transition*

Chúng ta có một danh sách *employee name*, khi user nhập vào input, chúng ta thực hiện *filter* lại danh sách này.

```jsx
import { useState } from 'react'

export function FilterList({ name }) {
	const [query, setQuery] = useState('');
	const changeHandler = ({ target: { value } }) => setQuery(value);
	
	return (
		<div>
			<innput onChange={changeHandler} value={query} type="text" />
			{names.map((name, i) => (
		        <ListItem key={i} name={name} highlight={query} />
		      ))}
		</div>
	)
}

function ListItem({ name, highlight }) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return <div>{name}</div>;
  }
  return (
    <div>
      {name.slice(0, index)}
      <span className="highlight">
        {name.slice(index, index + highlight.length)}
      </span>
      {name.slice(index + highlight.length)}
    </div>
  );
}
```

[Demo](https://codesandbox.io/s/heavy-update-as-urgent-ejwbg?file=/src/FilterList.js)

Khi user nhập quá nhanh, chúng ta sẽ thấy UI có vẻ hơi *lag* và nó không hiển thị được kết quá ngay.

Ở đây `<ListItem />` đã được update liên tục khi user nhập vào input, việc này là không cần thiết, nó chỉ cần cập nhập lại sau khi user đã kết thúc nhập liệu, một cách khác là bỏ quả tất cả những lần cập nhập ở giữa, chỉ giữ lại lần cập nhập sau cùng.

Để sửa lại

```jsx
import { useState, useTransition } from 'react';
export function FilterList({ names }) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState('');
  const [isPending, startTransition] = useTransition();

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    startTransition(() => setHighlight(value));
  };

  return (
    <div>
      <input onChange={changeHandler} value={query} type="text" />
      {names.map((name, i) => (
        <ListItem key={i} name={name} highlight={highlight} />
      ))}
    </div>
  );
}
```

[Demo](https://codesandbox.io/s/heavy-update-as-non-urgent-ifobc?file=/src/FilterList.js).

[Don't Stop Me Now: How to Use React useTransition() hook](https://dmitripavlutin.com/react-usetransition/)
