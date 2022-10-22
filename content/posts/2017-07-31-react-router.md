---
slug: "/2017-07-31-react-router"
date: "2017-07-31"
title: "Giới thiệu React Router"
desc: "React không phải một framework, nó chỉ là một thư viện javascript, bởi vì vậy nó không thể giải quyết tất cả các yêu cầu một ứng dụng. Việc mà React làm rất tốt là tạo component và cách thức quản lý state của component, nhưng để tạo một Single Page App (sẽ viết tắt là SPA) phức tạp, nó cần những thư viện khác nữa, đầu tiên cần nhắc đến là React Router"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Giới thiệu về React Router](#giới-thiệu-về-react-router)
- [Nhiều Route](#nhiều-route)
- [Tái sử dụng component với Nested Route](#tái-sử-dụng-component-với-nested-route)
- [IndexRoute](#indexroute)
- [Một số cách khai báo với Route](#một-số-cách-khai-báo-với-route)
- [Sử dụng Link component, đừng sử dụng tag a](#sử-dụng-link-component-đừng-sử-dụng-tag-a)
- [Browser History](#browser-history)
- [Route với parameter string](#route-với-parameter-string)

<!-- /TOC -->


# Giới thiệu về React Router

Cách tiếp cận của React Router không khác mấy so với các thư viện Router trước đây

Ví dụ với 1 component `Home`

```jsx
class Home extends React.Component{
  render(){
    return(
      <h1>Welcome Home</h1>;
    )
  }
}
ReactDOM.render( (<Home/>), document.getElementById('root'));
```

Sử dụng với React-Router

```jsx
ReactDOM.render((
  <Router>
    <Route path="/" component={Home} /> 
  </Router>
), document.getElementById('root'));
```

Câu khai báo trên có thể diễn giải là với route "/" (tương đương với trang chủ), thì gọi `render` component `Home`

2 component `<Router>` và `<Route>` là những component React không render trong DOM, nếu `path` khớp với uri, nó render ra component chúng ta truyền vào cho nó (qua props component), chúng ta sẽ gặp lại khái niệm này thường xuyên: **Một component bản thân không render trong DOM, mà render một component khác**

# Nhiều Route

Xét ví dụ

```jsx
ReactDOM.render((
  <Router>
    <Route path="/" component={Home}></Route>
    <Route path="/tags" component={TagsPage}></Route>
    <Route path="/post/:id" component={Post}></Route>
  </Router>
), document.getElementById('root'));
```

- Với URL yourpage.com/ -> render component `Home`
- Với URL yourpage.com/tags -> render component `TagsPage`
- Với URL yourpage.com/post/12 -> render component `Post`

# Tái sử dụng component với Nested Route

Khai báo nested Route

```jsx
ReactDOM.render((
  <Router>
    <Route component={MainLayout}>
      <Route component={SearchLayout}>
        <Route path="users" component={UserList} />
      </Route> 
    </Route>
  </Router>
), document.getElementById('root'));
```

Khi user truy cập đường dẫn */users*, React Router sẽ render component `<UserList />` bên trong component `<SearchLayout/>`, cả 2 component này lại đặt trong component `<MainLayout/>`

Nếu muốn trang chủ cũng render `<MainLayout/>` cùng với component `<Home/>`

```jsx
ReactDOM.render((
  <Router>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />
      <Route component={SearchLayout}>
        <Route path="users" component={UserList} />
        <Route path="widgets" component={WidgetList} />
      </Route> 
    </Route>
  </Router>
), document.getElementById('root'));
```

# IndexRoute

Thay vì viết như trên, có thể sử dụng component `IndexRoute` cũng cho cũng kết quả

```jsx
ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route component={SearchLayout}>
        <Route path="users" component={UserList} />
        <Route path="widgets" component={WidgetList} />
      </Route> 
    </Route>
  </Router>
), document.getElementById('root'));
```

# Một số cách khai báo với Route

Nếu có một khai báo cho trang *User* như bên dưới

```jsx
<Route path="user/settings" component={UserSettings} />
<Route path="user/inventory" component={UserInventory} />
<Route path="user/orders" component={UserOrders} />
```

Viết lại cho gọn

```jsx
<Route path="user">
  <Route path="settings" component={UserSettings} />
  <Route path="inventory" component={UserInventory} />
  <Route path="orders" component={UserOrders} />
</Route>
```

Cần bổ sung thêm component cho trang `/user`

```jsx
<Route path="user">
  <IndexRoute component={UserProfile} />
  <Route path="settings" component={UserSettings} />
  <Route path="inventory" component={UserInventory} />
  <Route path="orders" component={UserOrders} />
</Route>
```

# Sử dụng Link component, đừng sử dụng tag a

Khi đã định nghĩa với Route, nếu muốn dẫn đến một route nào đó, sử dụng component `<Link to="" />` thay cho tag `<a/>`

```jsx
<div className="app">
  <header className="primary-header"></header>
  <aside className="primary-aside">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/user">Users</Link></li>
      <li><Link to="/user/settings">Settings</Link></li>
    </ul>
  </aside>
  <main>
    {this.props.children}
  </main>
</div>
```

Với `<Link>` nó biết khi nào đang active

```jsx
<Link to="/users" activeClassName="active">Users</Link>
```

# Browser History

`<Router>` muốn hoạt động được, phải khai báo với `ReactRouter.browserHistory`

```jsx
var browserHistory = ReactRouter.browserHistory;

ReactDOM.render((
  <Router history={browserHistory}>
  </Router>
), document.getElementById('root'));

```

Những version trước đây của React Router, attribute `history` có giá trị mặc định là hashHistory giống như router của Backbone.js, các version sau này, attribute history sẽ không có giá trị mặc định và bắt buộc phải khai báo khi sử dụng

Nếu muốn redirect user đến một route nào đó

```jsx
browserHistory.push('/some/path');
```

# Route với parameter string

```html
<Route path="users/:userId" component={UserProfile} />
```

Component UserProfile sẽ được render trong các trường hợp: `users/1`, `users/145`, `users/abc`, React Router sẽ truyền vào giá trị `userId` vào UserProfile như một props, access đến giá trị này bằng `this.props.params.userId`

