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

## Render Props

Với kiểu viết này thì có 2 luồng, 1 bên rất khoái và một bên phản đối kịch liệt, trong hàm `render` sẽ `return` và hàm đảm nhiệm việc render này từ props, bản thân cá nhân mình thì cũng không thích kiểu viết này lắm, nhìn không official

```jsx
class DagobahRP extends React.Component {
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
    return this.props.render(this.state);
  }
}

// notice that a function is passed to the render prop:
export default () => (
  <DagobahRP
    render={({ loading, error, planet }) => {
      if (loading) {
        return <LoadingView />;
      } else if (planet) {
        return <PlanetView {...planet} />;
      } else {
        return <ErrorView />;
      }
    }}
  />
);
```

Rất rất ích các thư viện hiện tại sử dụng cách việc này vì vướn phải vấn đề với performance, nếu không tin có thể bật profilers lên và đo thử

## Provider

Một trong những pattern nên 'quên đi' của React :D, nhưng cũng đề cập ở đây nếu gặp một số code cũ đọc còn hiểu, rất đơn giản như sau: lấy dữ liệu > đưa nó vào `context` object > sau đó sử dụng HOC để truy cập tới `context` object và truyền nó vào như một `prop` cho component nào đó.

```jsx
import React from "react";
import PropTypes from "prop-types";

// IMPORTANT: we need to define childContextTypes
// to be able to access the context object in React
const contextTypes = {
  dagobah: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    planet: PropTypes.shape({
      name: PropTypes.string,
      climate: PropTypes.string,
      terrain: PropTypes.string
    })
  })
};

export class DagobahProvider extends React.Component {
  state = { loading: true };

  componentDidMount() {
    fetch("https://swapi.co/api/planets/5")
      .then(res => res.json())
      .then(
        planet => this.setState({ loading: false, planet }),
        error => this.setState({ loading: false, error })
      );
  }

  static childContextTypes = contextTypes;

  getChildContext() {
    return { dagobah: this.state };
  }

  render() {
    return this.props.children;
  }
}
```

Để truy cập đến `context`, component con hiện thực như sau, sử dụng kết hợp với HOC

```jsx
const withDagobah = PlanetViewComponent =>
  class extends React.Component {
    static contextTypes = contextTypes;

    render() {
      const { props, context } = this;
      return <PlanetViewComponent {...props} {...context.dagobah} />;
    }
};
```

Tại sao nên quên đi? Vì `context` object này trong phiên bản React cũ, `context` mới từ React 16.3 đã có thay đổi, implement tương đối khác và dễ đàng hơn, `context` mới có thể thay thế Redux, khi nào bản React 16.3 chính thức ra mình sẽ viết thêm, giờ nó còn đang ở bản alpha