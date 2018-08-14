---
slug: "/2018-02-14-huong-dan-redux-la-gi-tai-sao-phai-dung"
date: "2018-02-14"
title: "Redux là gì và tại sao phải dùng?"
desc: "Nếu đã đụng tới React thì sớm muộn gì bạn cũng sẽ nghe đến Redux"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript", "redux"]
---

<!-- TOC -->

- [Tại sao?](#tại-sao)
- [Vấn đề là: Data Flow (Luồng dữ liệu)](#vấn-đề-là-data-flow-luồng-dữ-liệu)
- [Kết nối trực tiếp đến dữ liệu với Redux](#kết-nối-trực-tiếp-đến-dữ-liệu-với-redux)
- [Khi nào sử dụng Redux](#khi-nào-sử-dụng-redux)

<!-- /TOC -->

## Tại sao?

Câu hỏi đâu tiên cần trả lời: Tại sao chúng ta cần Redux?

Dĩ nhiên câu trả lời không phải là bởi vì ai trên mạng cũng bảo thế nên em phải xài nó.

Redux được sử dụng rộng rãi vì nó giải quyết **vấn đề** mà chúng ta thường gặp khi làm Single Page App.

Vấn đề "State management"? Không hề, bản thân React đã giải quyết State management rồi, Redux giúp quản lý `state`, nhưng nó không phải là **vấn đề** mấu chốt.

## Vấn đề là: Data Flow (Luồng dữ liệu)

Nếu sử dụng React một thời gian, chúng ta thấy ngay `props` trong React là dữ liệu đi xuống theo 1 chiều từ trên xuống. Dữ liệu truyền xuống qua `props`.

Ví dụ với *component* `Couter` như sau

![](https://daveceddia.com/images/counter-component.png)

Giá trị `count` lưu trong *state* của component `App`, được truyền xuống qua *props*

![](https://daveceddia.com/images/passing-props-down.png)

Để dữ liệu đi ngược lên trên, có phải chúng ta sẽ có 1 hàm *callback*, hàm *callback* này được truyền xuống cho **tất cả** các component con, khi dữ liệu `count` thay đổi, chúng ta gọi lại hàm *callback* này để 'báo' cho `App` biết giá trị `count` đã thay đổi.

![](https://daveceddia.com/images/passing-callbacks-down.png)

Hình dung như thế này, dữ liệu như là nguồn điện ở nhà, muốn có điện từ nhà máy tới từng hộ dân ta cần đường dây điện được nối xuyên suốt từ nhà máy đến từng hộ dân, vì điện không thể truyền qua không khí như sóng điện thoại. Đó là cách React đưa dữ liệu đến các *component* con, với Redux chúng ta sẽ hổ trợ dữ liệu đi qua đường sóng điện thoại.

Sớm hay muộn gì bạn cũng rơi vào tình huống như trên, container ở trên cùng có một vài dữ liệu mà components bên dưới nó cũng cần dữ liệu tương tự. Lấy ví dụ như thông tin user trên trang Twitter

![](https://daveceddia.com/images/twitter-user-data.png)

Để đưa dữ liệu từ `App` xuống các `Avatar` components, bạn phải truyền dữ liệu này qua những component không cần thiết.

![](https://daveceddia.com/images/twitter-hierarchy.png)

## Kết nối trực tiếp đến dữ liệu với Redux

Sử dụng hàm `connect` trong Redux sẽ cho phép chúng ta kết nối bất kỳ *component* nào đến trung tâm của mọi dữ liệu, thích cái gì thì *map* nó vô component

![](https://daveceddia.com/images/redux-connected-twitter.png)

Bên cạnh đó nó còn có một số tính năng khác đi kèm, như giúp debug dễ hơn với Redux DevTools cho phép kiểm tra mỗi khi state thay đổi, time-travel debug cho phép roll back lại state trước đó

Cách connect một component với Redux store

```jsx
import React from 'react';
import { connect } from 'react-redux';

const Avatar = ({ user }) => (
  <img src={user.avatar}/>
);

const mapStateToProps = state => ({
  user: state.user
});

export { Avatar };
export default connect(mapStateToProps)(Avatar);
```

Bản thân component *Avatar* không có gì khác biệt với component khác, nó sẽ nhận `props` và `render` ra như bình thường, hàm `connect` sẽ làm chuyện *map* cái state ở trong Redux store về thành `props`.

## Khi nào sử dụng Redux

- Nếu các *component* được tổ chức theo cây như ví dụ ở trên
- Nếu cần lưu dữ liệu tạm thời giữa các view, thí dụ load dữ liệu ở trang list xong vô trang detail load dự liệu trang detail, rồi khi quay lại trang list không cần phải load dữ liệu lại lần nữa.
- Nếu ứng dụng lớn, quản lý dữ liệu nhiều.