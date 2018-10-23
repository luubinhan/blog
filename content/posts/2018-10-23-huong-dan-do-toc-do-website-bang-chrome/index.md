---
slug: "/2018-10-23-huong-dan-do-toc-do-website-bang-chrome"
date: "2018-10-23"
title: "Đo thời gian render bằng Chrome"
desc: "Bàn luận kỹ thuật để đo chính xác thời gian render"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome", "performance"]
---


Để thực hành bài này, bạn có thể sử dụng [source code có sẵn](https://github.com/nolanlawson/measure-style-and-layout) này

Trên tab Performance của DevTools chúng ta có

![Đo thời gian render bằng Chrome](https://github.com/nolanlawson/measure-style-and-layout)

Đây là giá trị CPU đã tiêu tốn để render component, theo đơn vị là mili giây. Nó sẽ được thực hiện 4 bước

- Thực thi javascript
- Apply các format bằng CSS
- Tính layout, trình duyệt tiếp tục tính toán để "đặt" các element trên màn hình ở chỗ nào
- Render được thực hiện trên một [thread riêng](https://blogs.windows.com/msedgedev/2017/08/17/making-web-smoother-independent-rendering/)

Đa phần mọi người sẽ bỏ qua các bước 2, 3, 4 khi đo, chỉ tính toán thời gian thực thi javascript

![Đo thời gian render bằng Chrome](https://nolanwlawson.files.wordpress.com/2018/09/screenshot-2018-09-22-11-45-56-3-copy.png?w=570&h=254)

Bước render rất khó có thể đo được chính xác, nó được thực hiện trên threat riêng và dùng GPU

Phần style và layout thì có thể đo chính xác hơn vì nó block lại main thread

# Đo gì?

Chúng ta sẽ [đánh dấu](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) từ khi javascript bắt đầu chạy, đến hết phần render

Sử dụng `requestAnimationFrame` là chính, nó được gọi trước quá trình style và layout, nhưng thực tế trước Edge v18 và một số bản Safari thì không đúng, nên cũng có thể có chút sai xót

![Đo thời gian render bằng Chrome](https://nolanwlawson.files.wordpress.com/2018/09/screenshot-2018-09-22-11-45-56-3.png?w=570&h=254)

```js
requestAnimationFrame(() => {
  setTimeout(() => {
    performance.mark('end')
  })
})
```

Phần code trong `setTimeOut` được gọi ngay sau bước paint

![Đo thời gian render bằng Chrome](https://nolanwlawson.files.wordpress.com/2018/09/screenshot-2018-09-22-12-15-07.png?w=570&h=343)

![Đo thời gian render bằng Chrome](https://i.imgur.com/Pwa9tV8.png)

# Một số vấn đề

- `setTimeOut` đôi khi có sai lệch tầm 4ms trên một số trình duyệt
- Nếu có một `setTimeOut` callback khác trong code, có thể không còn đúng
- Sau này khi các trình duyệt đã hỗ trợ cách tốt hơn thì setTimeOut kiểu này là dư thừa


<a target="_blank" rel="noopener noreferrer" href="https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/">Accurately measuring layout on the web</a>