---
slug: "/2020-01-30-huong-dan-bat-su-kien-ben-ngoai-react.md"
date: "2020-01-30"
title: "Bắt sự kiện click bên ngoài Component React"
desc: "Thủ thuật nhỏ để bắt sự kiện click có nằm ngoài component không"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "react"]
---

Nếu bạn tự làm một react component như *dropdown*, *modal*, *popover*, không sớm thì muộn bạn sẽ rơi vào tình huống sao "Bắt sự kiện click bên ngoài component để đóng nó (modal, popover, dropdown) lại"

![](https://miro.medium.com/max/546/1*7dmOCdkoDLfnWz6hBF0fYA.png)

Đây là những gì bạn cần làm

1. Để biết sự kiện nằm trong hay ngoài component, chúng ta phải lấy được DOM của element, dùng `ref` để lấy tham chiếu đến DOM *thực* của component

```jsx
const node = useRef();

...

return (
    <div ref={node}>
        ...
    </div>
)
```

2. Thêm một event listener cho sự kiện click ( *mousedown* )

```jsx
useEffect(() => {
    //  thêm khi đã mount
    document.addEventListener("mousedown", handleClick);
    // dọn dẹp
    return () => {
        document.removeEventListener("mousedown", handleClick);
    }
}, [])
```

3. Bên trong `handleClick` **node.current.contains(e.target)** sẽ trả về `true` nếu click xuất phát bên trong ref `node`

```js
const handleClick = e => {
    if (node.current.contains(e.target)) {
        return;
    }
    
    // outside
    ...
};
```

[Code](https://codesandbox.io/s/w62xl39907)
[Little Neat trick to capture click outside with React Hook](https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f)
