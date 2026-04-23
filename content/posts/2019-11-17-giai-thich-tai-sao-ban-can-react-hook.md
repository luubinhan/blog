---
slug: "/2019-11-17-giai-thich-tai-sao-ban-can-react-hook"
date: "2019-11-17"
title: "Tại sao lại sinh ra React hook"
desc: "Tại sao và lợi ích mà react hook đem lại là gì, mà thiên hạ cứ rần rần lên vậy?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "react"]
---

<!-- TOC -->

- [Lịch sử](#l%e1%bb%8bch-s%e1%bb%ad)
  - [Tháng 5, 2013](#th%c3%a1ng-5-2013)
  - [Tháng giêng, 2015](#th%c3%a1ng-gi%c3%aang-2015)
- [Vấn đề tồn đọng](#v%e1%ba%a5n-%c4%91%e1%bb%81-t%e1%bb%93n-%c4%91%e1%bb%8dng)
  - [Logic trùng lặp](#logic-tr%c3%b9ng-l%e1%ba%b7p)
  - [Chia sẽ logic](#chia-s%e1%ba%bd-logic)
- [Giải quyết](#gi%e1%ba%a3i-quy%e1%ba%bft)

<!-- /TOC -->

Qua bài viết này chúng ta sẽ cùng trả lời 2 câu hỏi bạn cần đặt ra khi tiếp cận một **đồ chơi mới** như React Hook

1. Tại sao nó lại tồn tại trên trái đất này?
2. Nó tồn tại trên trái đất này có lợi ích gì không?

## Lịch sử

### Tháng 5, 2013

Nếu bạn còn nhớ về cách viết một component trong React bằng `React.createClass`, chứng tỏ bạn đã là già làng trong React, ngày mới ra đời khi javascript không hề có khai báo `class`, chúng ta sẽ khai báo component như thế này

```jsx
const ReposGrid = React.createClass({
  getInitialState () {
    return {      
    }
  },
  componentDidMount () {
  },
  componentDidUpdate (prevProps) {    
  },
  render() {
    return (<div />)
  }
})
```

### Tháng giêng, 2015

Tổ chức *Ác ma* thế giới công bố chuẩn EcmaScript 2015, còn gọi với tên thân thương ES6. **class** chính thức có mặt trong javascript. Đội ngũ phát triển của React lúc đó kết luận, chúng ta *không cần phát minh lại cái bánh xe* (don't reinvent the wheel), cứ xài theo chuẩn đã có. Thế là từ đó chúng ta khai báo component bằng `class extends`

```jsx
class ReposGrid extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      repos: [],
      loading: true
    }

    this.updateRepos = this.updateRepos.bind(this)
  }
  componentDidMount () {
  }
  componentDidUpdate (prevProps) {
  }

  render() {
    return (<div />)
  }
}
```

Khi khai báo component bằng `class`, chúng ta khởi tạo giá trị của `state` bên trong phương thức `constructor` và nó sẽ được nhét vào trong `this`. Tuy nhiên, với cách khai báo đã *quốc tế hóa* của `class`, nếu chúng ta `extends` từ một `class`, chúng ta phải gọi `super()` trước khi có thể sử dụng `this`. Và riêng với React, chúng ta còn phải truyền thêm `props` vào trong `super`. Các bạn lập trình viên *phát bệnh* vì cách viết chướng mắt này.

```jsx
constructor (props) {
  super(props) // 🤮
}
```

Ngày xưa khi dùng `createClass` của React, bên trong hàm đó nó sẽ làm luôn chuyện binding toàn bộ `this` vào các phương thức cho một instance của component. Tuy nhiên khi viết `extends React.Component` chuyện đó ko còn tự động xảy ra *như phép màu* nữa, chúng ta phải đi `.bind` từng phương thức một trong `constructor`

```jsx
constructor (props) {
  this.updateRepos = this.updateRepos.bind(this) // 😭
}
```

Nếu nhìn vào các bạn sẽ nói, ồ cái này chả to tác gì đâu, chỉ là phải viết thêm mấy dòng ấy mà. Cũng vì lầm đường lạc lối theo class *Ác ma* mà React bị ko biết bao nhiều lời phàn nàn từ những lập trình viên khắp mọi nơi.

Hên sao, không lâu sau đó Class Field được thêm vào trong `class`, chúng ta có thể khai báo một biến bên trong `class` mà không cần dùng `constructor`, thay vì `.bind` chúng ta dùng arrow function

```jsx
class ReposGrid extends React.Component {
  state = {}  
  updateRepos = (id) => {}
}
```

## Vấn đề tồn đọng

Vấn đề đã được giải quyết tương đối ổn thỏa? Tuy nhiên vẫn còn vấn đề khác React team cảm thấy chưa hài lòng lắm phiên bản hiện tại.

Ý tưởng chính của React là để chúng ta có thể quản lý những ứng dụng phức tạp bằng cách chia ra thành từng component nhỏ rồi *kết hợp* (compose) lại với nhau. Đây là cách làm tạo ra *thương hiệu* sáng ngời của React. Cách tiếp cận theo kiểu component chả có vấn đề gì, cách **hiện thực** những component hiện tại đang có vấn đề.

### Logic trùng lặp

Trước đây chúng ta thiết kế component dựa rất nhiều vào component lifecycle. Chúng ta đặt để logic vào trong các từng lifecycle này, thí dụ như chúng ta cần phải gọi cùng một hàm bên trong cả 2 phương thức lifecycle `componentDidMount`, `componentDidUpdate`

```js
componentDidMount () {
  this.updateRepos(this.props.id)
}
componentDidUpdate (prevProps) {
  if (prevProps.id !== this.props.id) {
    this.updateRepos(this.props.id)
  }
}
updateRepos = (id) => {
  this.setState({ loading: true })

  fetchRepos(id)
    .then((repos) => this.setState({
      repos,
      loading: false
    }))
}
```

Để giải quyết vấn đề side effect (hàm `fetchRepos` làm cái quần gì ở ngoài đường ai mà biết, rõ ràng nó không thuộc phạm vi quản lý của component). Chúng ta **cần một cách tiếp cận khác không thể sử dụng lifecycle nữa**

### Chia sẽ logic

Khi nghĩ về sự kết hợp giữa các component trong React, chúng ta sẽ nghĩ về cách các đối tượng UI kết hợp với nhau.

```js
view = fn(state)
```

Trong thực tế, viết một ứng dụng không phải chỉ bao gồm tầng UI, rất nhiều trường hợp chúng ta cần **tái sử dụng logic, kết hợp các logic lại với nhau**. Trước đây React chưa hề có cách nào đáp ứng được nhu cầu này.

Ví dụ nếu có một component khác, nó cũng cần xài biến state `repos` và tất cả những logic liên quan, mà những cái đó nó đang nằm bên trong component `ReposGrid`. Làm sao chúng ta lấy ra xài lại? Cách bình thường là chúng ta copy-paste toàn bộ code bên trong qua một component mới. Cũng nhiều người làm vậy, ai có kinh nghiệm hơn thì dùng Higher-Order Component

```jsx
function withRepos (Component) {
  return class WithRepos extends React.Component {
    state = {
      repos: [],
      loading: true
    }
    componentDidMount () {
      this.updateRepos(this.props.id)
    }
    componentDidUpdate (prevProps) {
      if (prevProps.id !== this.props.id) {
        this.updateRepos(this.props.id)
      }
    }
    updateRepos = (id) => {
      this.setState({ loading: true })

      fetchRepos(id)
        .then((repos) => this.setState({
          repos,
          loading: false
        }))
    }
    render () {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      )
    }
  }
}
```

Rồi giờ có bất kỳ component nào muốn dùng `repos` thì cứ mẹ-bồng-con thế này

```jsx
// ReposGrid.js
function ReposGrid ({ loading, repos }) {
  ...
}

export default withRepos(ReposGrid)

// Profile.js
function Profile ({ loading, repos }) {
  ...
}

export default withRepos(Profile)
```

*Hồi xưa* chúng ta hay làm vậy, hoặc là dùng Render Props để chia sẻ những logic dùng tới dùng lui. Tuy nhiên, đây là cách tiếp cận không dành cho dân nghiệp dư, vì không phải dễ mà hiểu được cách tụi HOC nó chạy, thứ 2 nếu bạn cho chục mẹ bồng một đứa con thì sẽ sinh ra chuyện `wrapper hell` giống như callback hell

```js
export default withHover(
  withTheme(
    withAuth(
      withRepos(Profile)
    )
  )
)
```

Vận động não để hiểu đoạn này chạy kết quả thể nào

```html
<WithHover>
  <WithTheme hovering={false}>
    <WithAuth hovering={false} theme='dark'>
      <WithRepos hovering={false} theme='dark' authed={true}>
        <Profile 
          id='JavaScript'
          loading={true} 
          repos={[]}
          authed={true}
          theme='dark'
          hovering={false}
        />
      </WithRepos>
    </WithAuth>
  <WithTheme>
</WithHover>
```

Tóm lại những vấn đề trước mặt cần giải quyết là gì

- gọi `super(props)` là quá xàm xí đú
- `this` là thứ mơ hồ mà không dễ biết cách nó hoạt động, bạn có thể là chuyên gia và biết đấy, nhưng chúng ta tuân thủ nguyên tắc khi code **KISS**, ngu ngốc nhất có thể, đừng tỏ ra thông minh
- Tổ chức logic theo các phương thức lifecycle không còn hợp lý hợp tình
- React chưa có câu trả lời chính thức nào cho việc chia sẻ logic (HOC là từ pattern của javascript, không phải đặc sản nhà React, nên không tính)

## Giải quyết

Từ React 0.14 chúng ta có 2 cách tạo component, dùng class hoặc dùng function. Nếu cần state và các lifecycle thì dùng class, nếu chỉ nhận props rồi trả về UI thì dùng function. Đó là cách chúng ta được dạy.

Bác CTO John Carmack nói, em xin lỗi sửa câu văn của bác chút

> Tụi bây dẹp phương thức, class, framework hết dùm tao cái, Dùng hết function đi

React team, chân lý đây rồi, chúng ta tìm cách biến function component đáp ứng được những gì class component làm được đi.

Với function component, chúng ta chả cần quan tâm tới `super(props)`, `this` chạy thế nào. Chúng ta sẽ bổ sung state, giải quyết lifecycle, chia sẻ logic nữa là xong.

Và thế là các hook của React ra đời: `useState`, `useEffect`, custom hook

Để sử dụng state, chúng ta dùng hook là `React.useState`

```jsx
function ReposGrid ({ id }) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)
}
```

Lifecycle thì có thể bạn sẽ buồn (hoặc vui) khi nghe tin này. Nếu bắt đầu sử dụng React hook, function component, dẹp hết những gì bạn đã từng biết về lifecycle của component đi, quên đi những việc cần làm ở giai đoạn này, giai đoạn kia của component. Bạn hay tiếp cận *cách tư duy khác* hoàn toàn **Đồng bộ hóa**

Thử nghĩ những gì bạn làm ở một sự kiện của lifecycle, có thể là đổi state, fetch dữ liệu, cập nhập DOM, tất cả đều gom về một mục đích duy nhất **Đồng bộ hóa**. Những gì chúng ta cần đồng bộ thường là những thứ nằm ngoài React (gọi API, DOM, đại loại như thế) với những thứ bên trong React (state) hoặc ngược lại

Khi tiếp cận theo hướng đồng bộ hóa thay vì lifecycle event, nó cho phép chúng ta gom các logic liên quan lại với nhau. Để làm việc đó React cho chúng ta một Hook gọi là `React.useEffect`

Theo định nghĩa, `useEffect` cho phép chúng ta thực hiện side effect bên trong function component. Hàm này sẽ dùng để **re-sync** (thực hiện đồng bộ hóa các giá trị)

```jsx
React.useEffect(() => {
  document.title = `Hello, ${username}`
}, [username])
```

Đoạn code trên sẽ chạy lại bất cứ khi nào giá trị state `username` có thay đổi

Để gọi lại `fetchRepos` khi có thay đổi từ state `repos` ở ví dụ trên

```jsx
function ReposGrid ({ id }) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    fetchRepos(id)
      .then((repos) => {
        setRepos(repos)
        setLoading(false)
      })
  }, [id])

  if (loading === true) {
    return <Loading />
  }

  return (<div />)
}
```

Như vậy, chúng ta đã có thể nói lời chia tay mãi mãi với `React.Component`, `constructor`, `super`, `this`, lifecycle

Còn lại với cuộc chiến chống Higher-Order Component và Render Props. Để dùng lại logic, chúng ta sẽ vẫn dùng Hook, nhưng không phải do React làm sẵn cho *xơi*, chúng ta phải tự viết những custom Hook

Giờ chúng ta sẽ viết một custom hook `useRepos`, nó sẽ nhận một `id` lấy dữ liệu tương ứng.

```jsx
function useRepos (id) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    fetchRepos(id)
      .then((repos) => {
        setRepos(repos)
        setLoading(false)
      })
  }, [id])

  return [ loading, repos ]
}
```

Điều ngon lành ở đây là tất cả những gì liên quan đến `repos` điều gói gọn trong hook, ở đây mình muốn nói đến `loading`, `repos`

Sử dụng custom hook này trên các component khác nhau

```js
function ReposGrid ({ id }) {
  const [ loading, repos ] = useRepos(id)

  ...
}
```

```js
function Profile ({ user }) {
  const [ loading, repos ] = useRepos(user.id)

  ...
}
```

Thật không thể tin được bạn có thể khai báo và setState bên trong một function bình thường. Chúng ta đã có một React mạnh mẽ với các đặc tính sau

- Đơn giản hóa
- Đóng gói
- Linh động
- Mở rộng

Không những giải quyết vấn đề đang có, như cách mà các bạn làm marketing cho React tuyên truyền: sử dụng Hook để có `state` bên trong function component. Thật ra nó còn mang tới những giá trị to lớn khác là tăng khả năng tái sử dụng và kết hợp logic.


<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=eX_L39UvZes">📜 Why React Hooks?</a>

