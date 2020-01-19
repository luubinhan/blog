---
slug: "/2020-01-19-viet-type-cho-HOC-voi-typescript"
date: "2020-01-19"
title: "Viết React Higher-Order Component bằng TypeScript"
desc: "Cuộc sống đưa đẩy bạn phải viết TypeScript, thì bài này sẽ giúp bạn chút ít khi viết type với HOC"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "react"]
---

<!-- TOC -->

- [0.1. Enhancer](#01-enhancer)
- [0.2. Injector](#02-injector)
- [0.3. Enhance + Inject](#03-enhance--inject)

<!-- /TOC -->

> Từ React 16.8.0, chúng ta có React Hook, nó giải quyết toàn bộ những trường hợp chúng ta phải sử dụng higher-order component và giảm đáng kể độ phức tạp của việc set type so với HOC. Bạn sử dụng hook trong mọi tình huống có thể. Nếu gơi cảnh _ngặt nghèo_, anh lead của bạn _ko rõ lý do gì_ bắt xài HOC với TypeScript. Thì bài viết này để giúp biết biết cách set type cho HOC.

HOC trong React là _công cụ_ để chúng ta sử dụng nhiều đoạn code giống nhau trên các component khác nhau. Tuy nhiên khi dùng chung với TypeScript thì **triệu triệu** developer gặp không ít khó khăn khi set type cho nó. Bao gồm luôn mình trong đó.

Trong phạm vi bài viết này, chúng ta sẽ chi ra 2 loại HOC, 2 cách làm HOC phổ biến hiện nay, tạm gọi là **enhancer** và **injector**

- **Enhancer**: bọc một component, bổ sung thêm các hàm hoặc prop
- **Injector**: _bơm/chích_ thêm prop vào một component

Để phân biệt rõ hơn, bạn xem tiếp ví dụ bên dưới.

## 0.1. Enhancer

Chúng ta bắt đầu với Enhancer vì nó dễ viết `type` nhất. Ví dụ cơ bản nhất, bổ sung thêm prop `loading` vào component.

Không bao gồm `type`

```jsx
const withLoading = Component =>
  class WithLoading extends React.Component {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <LoadingSpinner /> : <Component {...props} />;
    }
  };
```

... và với `type`

```tsx
interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <LoadingSpinner /> : <Component {...(props as P)} />;
    }
  }
};
```

Có vài thứ cần giải thích ở đoạn trên, từng bước một nhé

```tsx
interface WithLoadingProps {
  loading: boolean;
}
```

Đây là `interface` khai báo các prop và `type` sẽ được thêm vào (**enhance**)

```tsx
<P extends object>(Component: React.ComponentType<P>)
```

Chúng ta đang sử dụng một [`generic`](https://www.typescriptlang.org/docs/handbook/generics.html), `P` là ký tự dùng để đại diện cho toàn bộ prop của component khi truyền cho HOC. `React.ComponentType<P>` là một type viết tắt cho cả hai `React.FC<P>` và `React.ClassComponent<P>`, nghĩa là một component truyền vào cho HOC này có thể là function cũng được, class component cũng được.

```tsx
class WithLoading extends React.Component<P & WithLoadingProps>
```

Đây là đoạn chúng ta component sẽ `return` từ HOC, nó chỉ định là component này sẽ bao gồm toàn bộ prop từ component (`P`) và prop của chính thằng HOC (`WithLoadingProps`), nó được _cộng dồn_ bằng toán tử `&`

```tsx
const { loading, ...props } = this.props;
```

> Với phiên bản cũ của TypeScript, có thể chúng ta phải _ép kiểu_ `this.props` như thế này `this.props as WithLoadingProps`

Cuối cùng chúng ta sử dụng prop `loading` để đặt điều kiện hiển thị cái _Spinner_

```jsx
return loading ? <LoadingSpinner /> : <Component {...props as P} />;
```

> ép kiểu `props as P` là bắt buộc từ TypeScript 3.2, đây là bug của TypeScript

Với HOC `withLoading` cũng có thể được viết để return một function component thay vì class

```tsx
const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => ({
  loading,
  ...props
}: WithLoadingProps) =>
  loading ? <LoadingSpinner /> : <Component {...(props as P)} />;
```

Chúng ta gặp vấn đề tương tự khi sử dụng rest/spread object, chúng ta chỉ định kiểu return là `React.FC<P & WithLoadingProps>`, nhưng chỉ sử dụng `WithLoadingProps` bên trong function component

## 0.2. Injector

Kiểu _injector_ HOC sẽ hay gặp hơn, nhưng cũng khó set type hơn, bên cạnh việc _chích_ thêm một số prop vào cho component, trong đa số các trường hợp nó còn xóa những prop đã _chích_ vào khi nó bọc lại, như vậy những thằng từ bên ngoài không thể ghi đè lên. `connect` của react-redux là một ví dụ cho injector HOC. Chúng ta không sử dụng nó, vì quá phức tạp, dùng một ví dụ đơn giản hơn, HOC chích thêm giá trị `counter` và `callback` để tăng giảm giá trị.

```tsx
import { Subtract } from "utility-types";

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedCounterProps>,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0
    };

    increment = () => {
      this.setState(prevState => ({
        value: prevState.value + 1
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1
      }));
    };

    render() {
      return (
        <Component
          {...(this.props as P)}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };
```

Một vài điểm khác nhau

```tsx
export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}
```

Khai báo một interface để chỉ định những prop nào sẽ được _chích_, đồng thời export luôn để component nào dùng HOC có thể lấy xài.

```tsx
import makeCounter, { InjectedCounterProps } from "./makeCounter";

interface CounterProps extends InjectedCounterProps {
  style?: React.CSSProperties;
}

const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);

export default makeCounter(Counter);
```

```tsx
<P extends InjectedCounterProps>(Component: React.ComponentType<P>)
```

Một lần nữa chúng ta dùng một `generic`, nhưng lần này để đảm bảo component sử dụng HOC có bao gồm các prop đã được chích, nếu không thì báo lỗi.

```tsx
class MakeCounter extends React.Component<
  Subtract<P, InjectedCounterProps>,
  MakeCounterState
>
```

Component được trả về từ HOC sẽ sử dụng [`Subtract`](https://github.com/piotrwitek/utility-types), nó sẽ tách hết những prop đã chích thêm, nghĩa là nếu ai đó set lại từ kết quả trả về từ HOC, nó sẽ lỗi

![](https://miro.medium.com/max/451/1*xTKe3DWJdC7nAVQnM4bvbg.png)

## 0.3. Enhance + Inject

Kết hợp cả 2 cách làm này lại, chúng ta sẽ có một component counter cho phép đưa giá trị minimum và maximum

```tsx
export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedCounterProps> & MakeCounterProps,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0
    };

    increment = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.maxValue
            ? prevState.value
            : prevState.value + 1
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.minValue
            ? prevState.value
            : prevState.value - 1
      }));
    };

    render() {
      const { minValue, maxValue, ...props } = this.props;
      return (
        <Component
          {...(props as P)}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };
```

`Subtract` được sử dụng để kết hợp cả những prop của chính component và prop của HOC

```tsx
Subtract<P, InjectedCounterProps> & MakeCounterProps
```

Ngoài ra không còn gì thật sự khác nhau giữa 2 cách làm này cần phải nói thêm.

[https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
