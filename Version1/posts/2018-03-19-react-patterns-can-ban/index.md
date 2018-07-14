---
path: "/2018-03-19-react-patterns-can-ban"
date: "2018-03-19T13:35:13.234Z"
title: "React Pattern căn bản"
desc: "Một số Pattern hay sử dụng trong React"
tags: ["javascript", "react"]
---

## Container/View

```jsx
class PlanetView extends React.Component {
    renderLoading() {
        return <div>Loading...</div>
    }

    renderError() {
        return <div>I'm sorry! Please try again</div>
    }

    renderPlanet() {
        const {name, climate, terrain} = this.props.planet;
        return (
            <h2>{name}</h2>
            <div>Climate: {climate}</div>
            <div>Terrain: {terrain}</div>
        )
    }

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        } else if (this.props.planet) {
            return this.renderPlanet();
        } else {
            return this.renderError();
        }
    }
}

class PlanetContainer extends React.Component {
    state = {loading: true};

    componentDidMount() {
        fetch('www.api.com/planet/5')
            .then(res => res.json())
            .then(
                planet => this.setState({loading: false, planet}),
                error => this.setState({loading: false, error})
            )
    }

    render() {
        return <PlanetView {...this.state} />
    }
}
```

Cách chia container và view thế này đang được sử dụng khá nhiều vì khả năng mở rộng sau này tốt, cái view chỉ cần quan tâm hiển thị dữ liệu như thế nào, phần xử lý logic sẽ do container đảm nhiệm.

## Container / Branch / View

```jsx
const LoadingView = () => <div>Loading...</div>

const ErrorView = () => <div>I'm sorry! Please try again.<div>;

const PlanetView = ({ name, climate, terrain }) => (
    <div>
        <h2>{name}</h2>
        <div>Climate: {climate}</div>
        <div>Terrain: {terrain}</div>
    </div>
)

const PlanetBranch = ({ loading, planet }) => {
  if (loading) {
    return <LoadingView />;
  } else if (planet) {
    return <PlanetView {...planet} />;
  } else {
    return <ErrorView />;
  }
};

class PlanetContainer extends React.Component {
  state = { loading: true };

  componentDidMount() {
    fetch("https://swapi.co/api/planets/5")
      .then(res => res.json())
      .then(
        planet => this.setState({ loading: false, planet }),
        error => this.setState({ loading: false, error })
      );
  }

  render() {
    return <PlanetBranch {...this.state} />;
  }
}

export default PlanetContainer;
```

Chia cái View ra nhỏ hơn nữa thành Branch > View, việc quyết định chia nhỏ xuống bao nhiêu là vừa thì tùy theo trường hợp cụ thể để tính toán, với nguyên tắc bất di bất dịch anh ơi viết cho nó đơn giản dể hiểu chừng nào tốt chừng đấy, không phải ai cũng đủ trình thông minh để đọc hết code của anh.

## Higher Order Components

Cái này có bài viết rồi, đọc lại bài cũ [ở đây](https://luubinhan.github.io/blog/2018-03-02-gioi-thieu-higher-order-component-trong-react)

## Stateless function

Khuyến khích sử dụng vì có thể tái sử dụng component rất nhiều lần, trong component không được chứa `state`, chỉ nhận `prop` rồi return

```jsx
const Greeting = () => <div>Hi There!</div>
```

Với `props`

```jsx
const Greeting = (props, context) => 
  <div style={{color: context.color}}>Hi {props.name}!</div>
```

Có thể khai báo biến

```jsx
const Greeting = (props, context) => {
  const style = {
    fontWeight: "bold",
    color: context.color,
  }

  return <div style={style}>{props.name}</div>
}
```

Có thể khai báo `defaultProps`, `propTypes`, `contextTypes` như thường


```jsx
Greeting.propTypes = {
  name: PropTypes.string.isRequired
}
Greeting.defaultProps = {
  name: "An.Luu"
}
Greeting.contextTypes = {
  color: PropTypes.string
}
```

## JSX spread attributes

Giống như cách viết `...` để spread object, 2 Cách viết sau sẽ cho cùng kết quả

```jsx
<main className="main" role="main">{children}</main>

// dùng spread attributes
<main {...{className: "main", role: "main", children}} />
```

Cái đoạn trên chắc sẽ ít thấy ai viết, thường gặp như thế này nhiều hơn

```jsx
const FancyDiv = props =>
  <div className="fancy" {...props} />
```

Lưu ý thứ tự sẽ ảnh hưởng đến chuyện override, thí dụ nếu truyền `className` như sau sẽ override lại cái class *fancy*

```jsx
<FancyDiv className="my-fancy-div" />
// kết quả <div class='my-fancy-div'/>
```

Nhưng nếu khai báo `FancyDiv` như vầy thì sẽ ko bị override

```jsx
const FancyDiv = props =>
  <div {...props} className="fancy" />
```

## render theo điều kiện đúng sai

Render khi điều kiện === true

```jsx
{condition && <span>Got it</span>}
```

Render khi điều kiện === false

```jsx
{condition || <span>Got it</span>}
```

Render với cập điều kiện đúng sai

```jsx
{ condition
    ? <span>Got it</span>
    : <span>Not really</span>
}
```

[Một số kiểu viết với rendẻ theo điều kiện](https://luubinhan.github.io/blog/2018-03-05-8-cach-render-component-trong-react)

## Style component

Tên này tự chế cái tên này thôi, cũng rất hay sử dụng nên viết ra nếu bạn nào chưa biết có thể tham khảo. Nếu sử dụng qua Bootstrap bạn sẽ biết nó viết CSS theo kiểu inherite, một button có thể có nhiều style 

```html
<button class="btn"></button>
<button class="btn btn-primary"></button>
<button class="btn btn-default"></button>
```

Để implement kiểu viết này, ta sử dụng thêm một thư viện `classnames`, viết thường cũng được mà dùng `classnames` tiện hơn

```jsx
import classnames from 'classnames'

const PrimaryBtn = props =>
  <Btn {...props} primary />

const Btn = ({ className, primary, ...props }) =>
  <button
    type="button"
    className={classnames(
      "btn",
      primary && "btn-primary",
      className
    )}
    {...props}
  />
```


## Event switch

Với component cần handle nhiều kiểu event khác nhau, tạo một hàm và dùng câu `switch` trong đó sẽ trực quan hơn

```jsx
// Thay vì
handleClick() { require("./actions/doStuff")(/* action stuff */) }
handleMouseEnter() { this.setState({ hovered: true }) }
handleMouseLeave() { this.setState({ hovered: false }) }

// Thì viết
handleEvent({type}) {
  switch(type) {
    case "click":
      return require("./actions/doStuff")(/* action dates */)
    case "mouseenter":
      return this.setState({ hovered: true })
    case "mouseleave":
      return this.setState({ hovered: false })
    default:
      return console.warn(`No case for event type "${type}"`)
  }
}
```
