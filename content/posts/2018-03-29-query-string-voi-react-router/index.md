---
slug: "/2018-03-29-huong-dan-query-string-voi-react-router"
date: "2018-03-29"
title: "Query String với React Router"
desc: "Cách sử dụng query string với React Router siêu căn bản"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

Khi làm web, nếu chúng ta muốn truyền một thông tin gì đó quá URL, ta sẽ sử dụng query string, cái này ai làm web chắc cũng biết

```
http://luubinhan.github.io/list?sortBy=date&sortOrder=desc
```

Cái đoạn sau dấu chấm hỏi gọi là query string `sortBy=date&sortOrder=desc`

Để tạo ra một đoạn *query string* như vậy ta sẽ sử dụng component `Link` của *react-router*

```jsx
let queryParameters = {
    sortBy: 'date',
    sortOrder: 'desc',
}
return (
  <Link
      to={{
        pathname: '/list',
        query: queryParameters
      }}
  >
    CLICK ME!
  </Link>
);
```

Nếu ta thiết đặt Route cho đường path `list` đến `ListComponent`

```jsx
<Route path="list" component={ListComponent} />
```

thì bên trong `ListComponent` ta có thể truy xuất đến giá trị của query string này bằng `props.location`

```jsx
const {location} = this.props;

console.log(location)
// { sortBy: 'date', sortOrder: 'desc' }
```