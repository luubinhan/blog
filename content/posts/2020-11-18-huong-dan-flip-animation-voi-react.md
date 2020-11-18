---
slug: "2020-11-18-huong-dan-flip-animation-voi-react"
date: "2020-11-18"
title: "Hướng dẫn kỹ thuật FLIP animation với React"
desc: "Nếu bạn là người làm animation có tâm, bạn không muốn animation làm ảnh hưởng đến tốc độ của ứng dụng, bạn cần biết đến FLIP animation"
tags: ["thu-thuat", "react"]
canonical_url: false
---



Trước đây mình đã có một bài về FLIP animation, các bạn có thể đọc lại [ở đây](https://vuilaptrinh.com/2018-07-25-huong-dan-tao-animate-voi-flip-technique/) để biết kỹ thuật này là gì và tại sao nó lại giúp tối ưu tốc độ.

Có thể tóm tắt kỹ thuật FLIP bằng hình minh họa bên dưới

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/06/JakPwnSa.png?w=398&ssl=1)

Những gì trong ô màu tím, cần diễn ra trước sự kiện *paint* của trình duyệt.

Để đạt mục đích ***transform* trước khi trình duyệt thực hiện `paint`**, chúng ta sẽ sử dụng `useLayoutEffect`, những gì diễn ra ở đây sẽ xảy ra **sau khi DOM cập nhập**, **trước khi paint**

<iframe height="265" style="width: 100%;" scrolling="no" title="React FLIP animations" src="https://codepen.io/jlkiri/embed/oNjaMrK?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/jlkiri/pen/oNjaMrK'>React FLIP animations</a> by Kirill Vasiltsov
  (<a href='https://codepen.io/jlkiri'>@jlkiri</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Với lần render đầu tiên, chúng ta cần *cache* lại vị trí cuối cùng của animation

```jsx
useEffect(() => {
    // ...
    const rects = useRef(new Map()).current;
    
    const squares = document.querySelectorAll('.square');
    
    for (const square of squares) {
        rects.set(square.id, square.getBoundingClientRect());
    }
},[])

useLayoutEffect(() => {
    const squares = document.querySelectorAll('.square');
    
    for (const square of squares) {
        const cachedRect = rects.get(square.id);
        
        if (cachedRect) {
            const nextRect = square.getBoundingClientRect();
            
            // invert
            const translateX = cachedRect.x - nextRect.x;
            
            // cache position và size
            rects.set(square.id, nextRect);
            
            // play animation
            square.animate([
                { transform: `translateX(${translateX}px)` },
            	{ transform: `translateX(0px)` }
            ], 1000)
        }
    }
}, ids);
```

Tóm tắt những gì đã thực hiện bằng hình minh họa sau

![Diagram. Cache the size and position, retrieve previous size and position from cache, get new size and position, calculate the difference, and play the animation.](https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/06/kTkr-F7_.png?fit=1024%2C1024&ssl=1)



**Một vài lưu ý**

- Đảm bảo các tính toán không vượt quá 100ms, điều này nhằm đảm bảo user không cảm nhận có một độ trễ trên giao diện, có thể kiểm tra bằng DevTools
  ![img](https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/06/6LqLR8Jc.png?fit=1024%2C275&ssl=1)
- Để tránh re-render không cần thiết, chúng ta ko được dùng `useState`, thay vào đó chúng ta phải dùng `useRef` một object cố định chúng ta có thể thay đổi giá trị mà không gây ra re-render
- Không thực hiện đọc vị trí -> chạy animate ngay và luôn trên element đó, luôn thực hiện theo dạng đọc hàng loạt, sau đó animate một loạt
- Nếu không muốn tự viết, có thể tham khảo 2 thư viện dùng với React: [`react-flip-toolkit`](https://github.com/aholachek/react-flip-toolkit) và [`react-easy-flip`](https://github.com/jlkiri/react-easy-flip).

[Everything You Need to Know About FLIP Animations in React](https://css-tricks.com/everything-you-need-to-know-about-flip-animations-in-react/)