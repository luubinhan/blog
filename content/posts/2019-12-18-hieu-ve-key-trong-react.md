---
slug: "/2019-12-18-hieu-ve-key-trong-react"
date: "2019-12-18"
title: "Hiểu về prop key trong React"
desc: "Một chút nhận định về prop key trong React"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

> `key` là một cơ chế để quản lý các instance của component

Mỗi lần React render 1 component, nó chạy function của chúng ta để nhận về một giá trị mới, giá trị này được dùng để cập nhập DOM. Nếu chúng trả về cùng một giá trị, nó sẽ không gọi update DOM, thậm chí **tất cả prop có thay đổi**

Đọc thêm bài viết [Thủ thuật cải thiện render](https://kentcdodds.com/blog/optimize-react-re-renders)

**Tất cả prop có thay đổi** nếu kết quả trả về không khác nhau, nó không cập nhập DOM. **Trừ trường hợp là prop `key`**, dù cho kết quả cuối cùng không thay đổi, nhưng giá trị `key` khác nhau, React cũng sẽ unmount instance trước đó và mount vào một instance mới.

Điều đó có nghĩa là toàn bộ `state` trước đó sẽ được khởi tạo lại như lúc ban đầu. React cũng sẽ chạy cleanup trên `effect`

> Cleanup effect thật ra chạy sau khi một component đã mount, trước khi effect tiếp theo được gọi.

Tưởng tượng chúng ta có một component, với state của riêng nó

```jsx
function Counter() {
  console.log('Counter called')
  const [count, setCount] = React.useState(() => {
    console.log('Counter useState initializer')
    return 0
  })
  const increment = () => setCount(c => c + 1)
  React.useEffect(() => {
    console.log('Counter useEffect callback')
    return () => {
      console.log('Counter useEffect cleanup')
    }
  }, [])
  console.log('Counter returning react elements')
  return <button onClick={increment}>{count}</button>
}
function CounterParent() {
  // sử  dụng useReducer theo cách này để đảm bảo tất cả những lần gọi setCounterKey
  // `counterKey` được gán cho một object mới
  // đồng nghĩa với việc `key` sẽ khác nhau
  const [counterKey, setCounterKey] = React.useReducer(c => c + 1, 0)
  return (
    <div>
      <button onClick={setCounterKey}>reset</button>
      <Counter key={counterKey} />
    </div>
  )
}
```

Đây là kết quả log ra


```bash
// bắt đầu mounted
Counter called
Counter useState initializer
Counter returning react elements
// mounted
Counter useEffect callback
// click nút counter
Counter called
Counter returning react elements
// để ý đến callback của effect và các step lúc khởi tạo không được gọi lúc này
// click nút reset
// xảy ra trên instance mới
Counter called
Counter useState initializer
Counter returning react elements
// cleanup instance trước đó
Counter useEffect cleanup
// new instance đã được mounted
Counter useEffect callback
```

Một ứng dụng thực tế, sử dụng key để *ép*  render giá trị `subject` khi `topic` thay đổi

```jsx
function Contact() {
  const [topic, setTopic] = React.useState('training')
  return (
    <form>
      <label htmlFor="topic">Topic</label>
      <select id="topic" value={topic} onChange={e => setTopic(e.target.value)}>
        <option value="training">Training</option>
        <option value="consulting">Consulting</option>
        <option value="question">Question</option>
      </select>
      <label htmlFor="subject">Email Subject</label>
      <input
        id="subject"
        key={topic}
        defaultValue={defaultValuesByTopic[topic]}
      />
      <label htmlFor="body">Email body</label>
      <textarea id="body" />
    </form>
  )
}
```

Chúng ta có `<input id="subject" />`, nếu không truyền `key=topic`, nó sẽ không được khởi tạo lại dù cho giá trị của `defaultValue={defaultValuesByTopic[topic]}` đã thay đổi.

[Understanding React's key prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)

