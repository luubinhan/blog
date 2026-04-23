---
slug: "2022-08-10-re-render-trong-react"
date: "2022-08-10"
title: "Re-render trong React"
desc: "Những pattern quan trọng giúp tránh re-render và những anti-pattern dẫn đến re-render không cần thiết"
tags: ["react", "javascript"]
canonical_url: false
---

## Re-render là gì trong React

Khi nói đến performance của React, chúng ta có 2 trạng thái cần quan tâm:
- **render lần đầu** - khi component xuất hiện lần đầu trên màn hình
- **re-render** - render lại một component đã xuất hiện trên màn hình
Thường thì re-render xảy ra khi user tương tác với ứng dụng gây ra sự thay đổi dữ liệu, state của ứng dụng và component cần được render lại để hiển thị tương ứng với dữ liệu mới. Tuy nhiên không phải re-render nào cũng cần thiết, có thể chia ra làm 2 loại re-render
- **Loại cần thiết** - component có sử dụng dữ liệu đã thay đổi. Ví dụ như input cần re-render khi user nhập dữ liệu
- **Loại không cần thiết** - bị re-render do ảnh hưởng từ những component khác, không thay đổi gì sau khi re-render.
Re-render không phải lúc nào cũng gây ra vấn đề gì to tác, cơ bản React rất nhanh, việc re-render xảy ra gần như người dùng không thể để ý được, chỉ với những component thật sự phức tạp, mỗi lần render tiêu tốn nhiều thời gian, lúc này chúng ta dễ thấy hiện tượng *lag*, giao diện delay trên mỗi lần render.

## Tại sao lại re-render

Có thể gom lại 4 nguyên nhân tại sao component re-render: state thay đổi, component cha/con re-render, context thay đổi, hook thay đổi. 

### Do state thay đổi

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part2-1-re-renders-because-of-state-ngh8uc?file=/src/App.tsx)
![](https://www.developerway.com/assets/react-re-renders-guide/part2-state-changes-example.png)

### Do parent re-render

Component sẽ bị render nếu component parent re-render, hay nói đúng hơn, một component mà re-render, đám child của nó cũng re-render, mặc dù cũng có một vài trường hợp cá biệt, component child có thể trigger render component parent

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-2-2-re-renders-because-of-parent-b0xvxt?file=/src/App.tsx)
![](https://www.developerway.com/assets/react-re-renders-guide/part2-parent-example.png)

### Do context thay đổi

Một giá trị bên trong context thay đổi, **toàn bộ** component nằm trong context đó sẽ re-render, dù là nó không sử dụng giá trị bị thay đổi. Có thể chặn re-render này bằng cách memoization, sẽ được đề cập bên dưới.

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-2-3-re-render-because-of-context-i75lwh?file=/src/App.tsx)
![](https://www.developerway.com/assets/react-re-renders-guide/part2-context-example.png)

### Do hook

Nếu bên trong hook có thay đổi, component sẽ re-render, và re-render này là không thể chặn được.

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-2-4-re-render-because-of-hooks-5kpdrp?file=/src/App.tsx)
![](https://www.developerway.com/assets/react-re-renders-guide/part2-hooks-example.png)

## Phương pháp hạn chế re-render

Một anti pattern (khuyến cáo không nên dùng) là tạo component bên trong hàm render của component
![](https://www.developerway.com/assets/react-re-renders-guide/part3-creating-components.png)

Cách viết bên trái trên mỗi lần re-render, nó sẽ **re-mount** lại `<SlowComponent />`, nó sẽ xóa component, khởi tạo một component hoàn toàn mới mỗi lần re-render `<Component />`

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-3-1-creating-components-inline-t2vmkj?file=/src/App.tsx)

### Đóng gói

![](https://www.developerway.com/assets/react-re-renders-guide/part3-moving-state-down.png)

Hãy phân tích lợi ích của cách viết bên phải, chúng ta gom state và các component liên quan đến state này vào một component, khi giá trị state `open` thay đổi, so với cách viết bên trái, component `<VereSlowComponent />` sẽ không bị ảnh hưởng

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-3-2-moving-state-down-vlh4gf?file=/src/App.tsx)

### Sử dụng prop children

![](https://www.developerway.com/assets/react-re-renders-guide/part3-passing-as-children.png)

Hơi giống như cách ở trên, chúng ta *tách* state vào một component độc lập, nhưng vì ở đây `<VereSlowComponent />` phải nằm bên trong, chúng ta dùng prop `children`, như thế dù `<ComponentWithScroll />` có re-render, vẫn không ảnh hưởng đến `<VerySlowComponent />`

Đây cũng là một trường hợp cá biệt cho thấy không phải parent render thì child component sẽ render

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-3-2-moving-state-down-vlh4gf?file=/src/App.tsx)

### Truyền prop là component

![](https://www.developerway.com/assets/react-re-renders-guide/part3-passing-as-props.png)

Cũng tương tự như `children` nếu chúng ta truyền component như một prop, nó sẽ không bị re-render dù cho component chính render

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-3-4-passing-components-as-props-9h3o5u?file=/src/App.tsx)

### Dùng API của React

![](https://www.developerway.com/assets/react-re-renders-guide/part4-memo-normal-example.png)

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-4-simple-memo-fz4xhw?file=/src/App.tsx)

Nếu không đủ tinh tế và muốn xài đồ có sẵn cho an toàn thì chúng ta đã có sẵn API của react `React.memo`, `useMemo`

![](https://www.developerway.com/assets/react-re-renders-guide/part4-memo-with-props.png)

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-4-1-memo-on-component-with-props-fq55hm?file=/src/App.tsx)

Sử dụng `useMemo`, `useCallback` cũng cần nhắc không hẳn dùng mọi lúc, mọi nơi sẽ tối ưu, đôi khi nó lại ngốn ram của user, và trong một số trường hợp nó không có tác dụng, như trường hợp sau

![](https://www.developerway.com/assets/react-re-renders-guide/part5-unnecessary-usememo-on-props.png)

[Xem ví dụ trên codesandbox](https://codesandbox.io/s/part-5-1-unnecessary-usememo-lmk8fq?file=/src/App.tsx)

Một gợi ý là nếu thấy các prop không phải kiểu **primitive value** thì có thể cân nhắc memorize

[React re-renders guide: everything, all at once](https://www.developerway.com/posts/react-re-renders-guide)