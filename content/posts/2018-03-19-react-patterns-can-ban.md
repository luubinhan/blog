---
slug: "/2018-03-19-huong-dan-react-patterns-can-ban"
date: "2018-03-19"
title: "Một số cách viết sử dụng trong React"
desc: "Tổng hợp các cách làm phổ biến trong React"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Container/View](#containerview)
- [Container / Branch / View](#container--branch--view)
- [Higher Order Components](#higher-order-components)
- [Stateless function](#stateless-function)
- [JSX spread attributes](#jsx-spread-attributes)
- [render theo điều kiện đúng sai](#render-theo-điều-kiện-đúng-sai)
- [Style component](#style-component)
- [Event switch](#event-switch)

<!-- /TOC -->

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

Cách chia container - dùng để xử lý logic và view - dùng để nhận và hiển thị dữ liệu có nhiều điểm hữu dụng, cái view bạn có thể dùng được nhiều lần hơn khi tách biệt nó khỏi phần xử lý business logic

## Higher Order Component - HOC

Cái này có bài viết rồi, đọc lại bài cũ [ở đây](https://luubinhan.github.io/blog/2018-03-02-gioi-thieu-higher-order-component-trong-react)

## JSX spread attribute

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
