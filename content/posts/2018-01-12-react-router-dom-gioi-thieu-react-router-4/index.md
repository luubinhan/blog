---
slug: "/2018-01-12-react-router-dom-gioi-thieu-react-router-4"
date: "2018-01-12"
title: "Giới thiệu React Router v4 (react router dom)"
desc: "Trước đây có bài giới thiệu về React Router rồi, nhưng giờ React Router 4 ra, gần như đập đi làm lại chứ ko kế thừa nhiều."
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---


Lúc đầu Michael and Ryan (2 tác giả của React Router) vốn là người viết Ember, chưa rõ cách vận hành lắm của React, nên lúc anh viết cái React Router thì gần như nó cũng giống như Ember, Express, Angular, giờ khi 2 anh đã năm dững React, 2 anh quyết định đập đi làm lại React Router để kế thừa những ý tưởng của React Component. Và ta có React Router v4 hoàn toàn mới lạ so với bản cũ

Chìa khóa để nắm rõ React Router v4, gọi react router dom đi hé, vì package giờ cũng đổi tên react-router-dom, là quên hết những gì về React Router từng biết, **React Router là một component với hàm render ra một component khi đường dẫn thõa điều kiện trong path.**

```jsx
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        React Router Course
      </div>
    )
  }
}

export default App
```

Giờ import `BrowserRouter` rồi đổi tên lại thành `Router`, cái này ko bắt buộc mà đa phần người ta làm vậy quen rồi.

```jsx
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
```

Thằng `BrowserRouter` này sẽ đưa tất cả thông tin *route* xuống cho tất cả các component con thông quan `context`. Giờ bọc nguyên cái app trong Router này

```jsx
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          React Router Course
        </div>
      </Router>
    )
  }
}

export default App
```

Tiếp theo, ta sẽ sử dụng component `Route`, khi đường dẫn trình duyệt khớp với props `path` của thằng `Route` thì nó sẽ render ra component không thì trả về null

```jsx
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

const Home = () => (
  <h2>Home</h2>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/topics' component={Topics} />
        </div>
      </Router>
    )
  }
}

export default App
```

Cứ vậy, nếu muốn có thêm routes thì cứ add thêm các component `Route` này, khi user truy cập `/hello-viet-nam` thì chỉ component Home được render ra, 2 Route about và topics sẽ trả về null. Ở đây khi truy cập /about hay /topics thì component Home vẫn được render ra, nếu ko muốn render Home, thêm vào nó props là exact

```jsx
<Route exact path='/' component={Home} />
```

Giờ thêm một thanh navigation để user có thể click chuyển qua lại giữa các 'trang', Link trong react-router-dom thì ko khác phiên bản trước

```jsx
render() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/topics'>Topics</Link></li>
        </ul>

        <Route path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/topics' component={Topics} />
      </div>
    </Router>
  )
}
```

Bây giờ bên trong component `Topics`, cứ vô từ lồng thêm Route vào như lồng div trong div thôi

```jsx
const Topic = () => {
  <div>
    <h3>TOPIC</h3>
  </div>
}

const Topics = () => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`/topics/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`/topics/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`/topics/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`/topics/rendering`} component={Topic} />
    <Route path={`/topics/components`} component={Topic} />
    <Route path={`/topics/props-v-state`} component={Topic} />
  </div>
)
```

Khi user truy cập vào /topics sẽ có một thanh navigation và một component `động` tùy thuộc vào routes (~ đường dẫn trên trình duyệt, gọi routes cho sang).

Mà hardcode cái path thế này không hay, khi React Router render ra một component nó sẽ truyền vào 3 props cho component là: `match`, `location`, `history`. Trong ví dụ này nếu gọi `match.url` nó sẽ cho ta giá trị là `/topics`. Sửa lại component Topics một cách thông minh hơn

```jsx
const Topic = () => {
  <div>
    <h3>TOPIC</h3>
  </div>
}

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/rendering`} component={Topic} />
    <Route path={`${match.url}/components`} component={Topic} />
    <Route path={`${match.url}/props-v-state`} component={Topic} />
  </div>
)
```

Ngoài url ra, thằng match còn có các params dường truyền vào

```jsx
const Topics = ({ match }) => (
  <div>
    ...

    <Route path={`${match.url}/:topicId`} component={Topic} />
  </div>
)
//thằng con có thế lấy giá trị params topicId này
const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
```

Ví dụ muốn có một component hiển thị text là "Ê chọn topic đi" khi nó đang ở trang /topics, hãy nhớ Route cũng là component render một component khác theo điều kiện thôi mà

```jsx
<Route exact path={match.url} render={() => (
  <h3>Please select a topic.</h3>
)}/>
```

Full Code

```jsx
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
    )
  }
}

export default App
```

Thích câu này: Học React sẽ giúp bạn cứng javascript hơn, chơi với React Router 4 giúp bạn giỏi React hơn