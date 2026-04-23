---
slug: "2022-05-07-cach-dung-usetransition-trong-react"
date: "2022-05-07"
title: "React Transition"
desc: "Một tính năng mới trong React 18, cho phép chúng ta đánh giấu một thay đổi là transition"
tags: ["javascript", "beginner", "hoc-thuat", "react"]
---
## Tại sao?

Một vấn đề rất thực tế mà chúng ta hay gặp khi viết *search component*, chúng ta sẽ thêm cơ chế *debounce* khi gọi xuống API sau khi user nhập giá trị vào `input`, *debounce* tức là hổng đi làm liền mà đợi cho đến hết thời gian thì mới làm.

Trước đây, React không có phân biệt giữa cái gì cần làm liền và cái gì có thể để sau rồi làm, dân tình gọi là sống vội. Giờ đây, thấy việc sống vội như thế là mà lối sống sai lầm, nên mở ra khái niệm *sống chậm*, thông thả mà làm. Như món nào cần gấp thì bạn bay ra tạp quá gần nhà mua liền, món nào chưa cần ngay thì đưa vào danh sách mua sắm cuối tháng đi siêu thị.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--6-YH79KT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t359lpszuvb3k6dlm6q0.gif)

Những công chuyện nào được coi là *sống chậm* React sẽ không làm liền và không hiển thị *Suspense fallback* component.

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
