---
slug: "2022-08-15-re-render-va-nhung-dieu-bi-an"
date: "2022-08-15"
title: "Những bí ẩn trong việc re-render trong React"
desc: "Bạn có bao giờ bị bối rối như mình trong khi phát hiện component bị re-render, dù đã useMemo, useCallback, memo đủ kiểu. Hãy cùng tìm lời giải cho những ẩn số này."
tags: ["react", "javascript"]
canonical_url: false
---

<!-- TOC -->

    - [Cuối cùng `children` là cái gì trong React?](#cuối-cùng-children-là-cái-gì-trong-react)
    - [React Element là gì?](#react-element-là-gì)
    - [Cập nhập Element](#cập-nhập-element)
    - [Lời giải thích](#lời-giải-thích)
- [Những bí ẩn trong việc re-render trong React](#những-bí-ẩn-trong-việc-re-render-trong-react)
    - [Cuối cùng `children` là cái gì trong React?](#cuối-cùng-children-là-cái-gì-trong-react-1)
    - [React Element là gì?](#react-element-là-gì-1)
    - [Cập nhập Element](#cập-nhập-element-1)
    - [Lời giải thích](#lời-giải-thích-1)

<!-- /TOC -->

```jsx
const ChildComponent = () => {
	console.log("ChildComponent re-render")
	return <div>Child</div>
}

const MovingComponent = () => {
	const [state, setState] = useState({ x: 100, y: 100 })

	return (
		<div
			onMouseMove={e => setState({ x: e.clientX - 20, y: e.clientY - 20 })}
			style={{ left: state.x, top: state.y }}
		>
			<ChildComponent />
		</div>
	)
}
```

Chúng ta đã biết là khi component re-render, toàn bộ children của nó cũng được cập nhập, trong ví dụ trên nếu `state` thay đổi, nếu component `<ChildComponent />` quá *nặng* nó sẽ kéo performance rõ rệt.

Để giải quyết, thay vì dùng `React.memo`, chúng ta sẽ thực hiện như sau

```jsx
const MovingComponent = ({ children }) => {
	return (
		<div
			onMouseMove={e => setState({ x: e.clientX - 20, y: e.clientY - 20 })}
			style={{ left: state.x, top: state.y }}
		>
			{children}
		</div>
	)
}

// Sau đó
<MovingComponent>
	<ChildComponent />
</MovingComponent>
```

**Điều lạ kỳ đầu tiên**, **ủa nó vẫn là children mà?**, thế quái nào nó lại không re-render?

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-29bi9p)

**Điều lạ kỳ thứ 2**, nếu chúng ta truyền vào children như là một render function, `ChildComponent` sẽ lại bị re-render, mặc dù nó ko phụ thuộc vào `state`

```jsx
const MovingComponent = ({ children }) => {
	...
	return (
		<div ...// y như cũ
		>
			{ children('something') }
		</div>
	)
}

// Sau đó
<MovingComponent>
	// thậm chí không dùng prop truyền vô cho nó
	{() => <ChildComponent />}
</MovingComponent>
```

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-with-render-function-dk662n?file=/src/App.tsx)

**Điều lạ kỳ thứ 3**,  giờ dùng `React.memo` để chặn re-render

Trường hợp chỉ `memo` MovingComponent, `ChildComponent` vẫn re-render
```jsx
const MovingComponentMemo = React.memo(MovingComponent)

const SomeOutsideComponent = () => {
  // force render SomeOutsideComponent
  const [state, setState] = useState();

  return (
    <MovingComponentMemo>
      <ChildComponent />
    </MovingComponentMemo>
  )
}
```

Khi *memo* `ChildComponent` không cần memo `MovingComponent`, vấn đề được giải quyết

```jsx
const ChildComponentMemo = React.memo(ChildComponent)

const SomeOutsideComponent = () => {
  // force render SomeOutsideComponent
  const [state, setState] = useState();

  return (
    <MovingComponent>
      <ChildComponentMemo />
    </MovingComponent>
  )
}
```

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-with-react-memo-vx9qqv?file=/src/App.tsx)

**Điều kỳ lạ thứ 4**, sử dụng useCallback để chặn re-render cũng không thành công

```jsx
const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  // hy vọng càng thêm thất vọng
  const child = useCallback(() => <ChildComponent />, []);

  return (
    <MovingComponent>
      {child}
    </MovingComponent>
  )
}
```

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-with-render-func-and-use-callback-i381k7?file=/src/App.tsx)

Bạn có muốn tự tìm hiểu những ẩn số ở trên thì ngưng ở đây, còn muốn biết tại sao thì mời đọc tiếp

## Cuối cùng `children` là cái gì trong React?

```jsx
const Parent = ({ children }) => (<>{children}</>)

<Parent>
  <Child />
</Parent>
```

Khi chúng ta truyền children như thế, thật sự nó là gì? Nó là `prop`, chúng ta rõ ràng viết như thế này vẫn được

```jsx
<Parent children={<Child />} />
```

Parent có thể thay đổi, React xem children lúc này là **`prop`**  và nó ko phải component mà re-render, giải thích bí ẩn thứ nhất

Để giải thích được các bí ẩn ở trên, chúng ta cần nhớ vài điểm chính

## React Element là gì?

Điểm quan trọng thứ 2 cần phải hiểu là chuyện gì diễn ra khi chúng ta viết

```jsx
const child = <Child />
```

`<Child />` được gọi là "Element", một cách viết hoa mỹ mà đằng sau nó là React.createElement trả về một object, và object này chứa mô tả mà sau đó được `react-dom` dùng để render trên cây DOM

Nếu chúng ta viết

```jsx
const Parent = () => {
	const child = <Child />
	// tương tự như
	// const child =  React.createElement(Child,  null,  null);
	return <div />
}
```

Nó cũng giống như `cost child = { }`, một giá trị nằm đó, ko có một hành động render nào xảy ra, render chỉ thực hiện khi chúng ta đặt nó trong return

```jsx
const Parent = () => {
  const child = <Child />;
  return <div>{child}</div>;
};
```

## Cập nhập Element

Element tạo ra từ bởi `React.createElement` là một **immutable object**, cách duy nhất để cập nhập một Element là trigger việc re-render, một object tương tự được re-create

```jsx
const Parent = () => {
  const child = <Child />;
  return <div>{child}</div>;
};
```

Khi component `Parent` re-render, giá trị `child` được tạo mới hoàn toàn, vốn không có vấn đề gì to tác, chỉ là một object.

Nếu ko muốn re-create object, chúng ta dùng đến memo, để *cố định* object này luôn

```jsx
const ChildMemo = React.memo(Child);

const Parent = () => {
  const child = <ChildMemo />;

  return <div>{child}</div>;
};

// hoặc
const Parent = () => {
  const child = useMemo(() => <Child />, []);

  return <div>{child}</div>;
};
```
## Lời giải thích

1. Tại sao truyền component như prop thì không re-render

```jsx
const MovingComponent = ({ children }) => {
  const [state, setState] = useState();
  return (
    <div
      // ...
      style={{ left: state.x, top: state.y }}
    >
      {children}
    </div>
  );
};

const SomeOutsideComponent = () => {
  return (
    <MovingComponent>
      <ChildComponent />
    </MovingComponent>
  )
}
```

"Children" `<ChildComponent />` là một element được tạo ở `SomeOutsideComponent`, khi `MovingComponent` re-render, nó vẫn nhận cùng một object children, object này cũng không hề bị **re-create** và sẽ không re-render

2. Nếu truyền children như render function, tại sao nó bị re-render

```jsx
const MovingComponent = ({ children }) => {
  const [state, setState] = useState();
  return (
    <div ///...
    >
      {children()}
    </div>
  );
};

const SomeOutsideComponent = () => {
  return (
    <MovingComponent>
      {() => <ChildComponent />}
    </MovingComponent>
  )
}
```

Lúc này "children" là một **function**, chúng ta thực hiện **execute** để nó trả về object element, mỗi lần `MovingComponent` re-render nó sẽ **execute** children function và trả về một object hoàn toàn mới

3. Dùng memo ở "parent" component không chặn được re-render, và chỉ cần dùng memo với child component mà không cần dùng memo cho parent

```jsx
const MovingComponentMemo = React.memo(MovingComponent);

const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  return (
    <MovingComponentMemo>
      <ChildComponent />
    </MovingComponentMemo>
  )
}
```

Khi re-render `SomeOutsideComponent`, chúng ta tạo mới hoàn toàn `ChildComponent` trên mỗi lần re-render, `React.memo` nó kiểm tra prop truyền vào cho `MovingComponent` và lúc này nó đã là các object khác nhau trên mỗi lần render

Khi memo `ChildComponent`

```jsx
const ChildComponentMemo = React.memo(ChildComponent);

const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  return (
    <MovingComponent>
      <ChildComponentMemo />
    </MovingComponent>
  )
}
```

Trong trường hợp này, dù cho `MovingComponent` xảy ra re-render, children khi đối chiếu sẽ hoàn toàn không khác, react-dom sẽ bỏ qua và không re-render lại những object không thay đổi

4. Truyền children như một function, memo không còn hoạt động

```jsx
const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  const child = useCallback(() => <ChildComponent />, []);

  return <MovingComponent>{child}</MovingComponent>;
  // như này cho dễ hình dung
  // return  <MovingComponent children={child} />;
};
```

Khi `SomeComponent` re-render, `MovingComponent` cũng sẽ re-render, khi nó đó nó gọi tiếp **function** children, function được memoize nhưng **giá trị nó return** khác nhau ở mỗi lần execute

Hy vọng với bài viết này bạn làm chủ và giải thích được những bí ẩn đằng sau mỗi lần re-render

https://www.developerway.com/posts/react-elements-children-parents?utm_source=pocket_mylist


# Những bí ẩn trong việc re-render trong React

Bạn có bao giờ bị bối rối như mình trong khi phát hiện component bị re-render, dù đã useMemo, useCallback, memo đủ kiểu. Hãy cùng tìm lời giải cho những ẩn số này.

```jsx
const ChildComponent = () => {
	console.log("ChildComponent re-render")
	return <div>Child</div>
}

const MovingComponent = () => {
	const [state, setState] = useState({ x: 100, y: 100 })

	return (
		<div
			onMouseMove={e => setState({ x: e.clientX - 20, y: e.clientY - 20 })}
			style={{ left: state.x, top: state.y }}
		>
			<ChildComponent />
		</div>
	)
}
```

Chúng ta đã biết là khi component re-render, toàn bộ children của nó cũng được cập nhập, trong ví dụ trên nếu `state` thay đổi, nếu component `<ChildComponent />` quá *nặng* nó sẽ kéo performance rõ rệt.

Để giải quyết, thay vì dùng `React.memo`, chúng ta sẽ thực hiện như sau

```jsx
const MovingComponent = ({ children }) => {
	return (
		<div
			onMouseMove={e => setState({ x: e.clientX - 20, y: e.clientY - 20 })}
			style={{ left: state.x, top: state.y }}
		>
			{children}
		</div>
	)
}

// Sau đó
<MovingComponent>
	<ChildComponent />
</MovingComponent>
```

**Điều lạ kỳ đầu tiên**, **ủa nó vẫn là children mà?**, thế quái nào nó lại không re-render?

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-29bi9p)

**Điều lạ kỳ thứ 2**, nếu chúng ta truyền vào children như là một render function, `ChildComponent` sẽ lại bị re-render, mặc dù nó ko phụ thuộc vào `state`

```jsx
const MovingComponent = ({ children }) => {
	...
	return (
		<div ...// y như cũ
		>
			{ children('something') }
		</div>
	)
}

// Sau đó
<MovingComponent>
	// thậm chí không dùng prop truyền vô cho nó
	{() => <ChildComponent />}
</MovingComponent>
```

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-with-render-function-dk662n?file=/src/App.tsx)

**Điều lạ kỳ thứ 3**,  giờ dùng `React.memo` để chặn re-render

Trường hợp chỉ `memo` MovingComponent, `ChildComponent` vẫn re-render
```jsx
const MovingComponentMemo = React.memo(MovingComponent)

const SomeOutsideComponent = () => {
  // force render SomeOutsideComponent
  const [state, setState] = useState();

  return (
    <MovingComponentMemo>
      <ChildComponent />
    </MovingComponentMemo>
  )
}
```

Khi *memo* `ChildComponent` không cần memo `MovingComponent`, vấn đề được giải quyết

```jsx
const ChildComponentMemo = React.memo(ChildComponent)

const SomeOutsideComponent = () => {
  // force render SomeOutsideComponent
  const [state, setState] = useState();

  return (
    <MovingComponent>
      <ChildComponentMemo />
    </MovingComponent>
  )
}
```

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-with-react-memo-vx9qqv?file=/src/App.tsx)

**Điều kỳ lạ thứ 4**, sử dụng useCallback để chặn re-render cũng không thành công

```jsx
const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  // hy vọng càng thêm thất vọng
  const child = useCallback(() => <ChildComponent />, []);

  return (
    <MovingComponent>
      {child}
    </MovingComponent>
  )
}
```

[Xem demo trên codesandbox](https://codesandbox.io/s/childrens-pattern-example-with-render-func-and-use-callback-i381k7?file=/src/App.tsx)

Bạn có muốn tự tìm hiểu những ẩn số ở trên thì ngưng ở đây, còn muốn biết tại sao thì mời đọc tiếp

## Cuối cùng `children` là cái gì trong React?

```jsx
const Parent = ({ children }) => (<>{children}</>)

<Parent>
  <Child />
</Parent>
```

Khi chúng ta truyền children như thế, thật sự nó là gì? Nó là `prop`, chúng ta rõ ràng viết như thế này vẫn được

```jsx
<Parent children={<Child />} />
```

Parent có thể thay đổi, React xem children lúc này là **`prop`**  và nó ko phải component mà re-render, giải thích bí ẩn thứ nhất

Để giải thích được các bí ẩn ở trên, chúng ta cần nhớ vài điểm chính

## React Element là gì?

Điểm quan trọng thứ 2 cần phải hiểu là chuyện gì diễn ra khi chúng ta viết

```jsx
const child = <Child />
```

`<Child />` được gọi là "Element", một cách viết hoa mỹ mà đằng sau nó là React.createElement trả về một object, và object này chứa mô tả mà sau đó được `react-dom` dùng để render trên cây DOM

Nếu chúng ta viết

```jsx
const Parent = () => {
	const child = <Child />
	// tương tự như
	// const child =  React.createElement(Child,  null,  null);
	return <div />
}
```

Nó cũng giống như `cost child = { }`, một giá trị nằm đó, ko có một hành động render nào xảy ra, render chỉ thực hiện khi chúng ta đặt nó trong return

```jsx
const Parent = () => {
  const child = <Child />;
  return <div>{child}</div>;
};
```

## Cập nhập Element

Element tạo ra từ bởi `React.createElement` là một **immutable object**, cách duy nhất để cập nhập một Element là trigger việc re-render, một object tương tự được re-create

```jsx
const Parent = () => {
  const child = <Child />;
  return <div>{child}</div>;
};
```

Khi component `Parent` re-render, giá trị `child` được tạo mới hoàn toàn, vốn không có vấn đề gì to tác, chỉ là một object.

Nếu ko muốn re-create object, chúng ta dùng đến memo, để *cố định* object này luôn

```jsx
const ChildMemo = React.memo(Child);

const Parent = () => {
  const child = <ChildMemo />;

  return <div>{child}</div>;
};

// hoặc
const Parent = () => {
  const child = useMemo(() => <Child />, []);

  return <div>{child}</div>;
};
```
## Lời giải thích

1. Tại sao truyền component như prop thì không re-render

```jsx
const MovingComponent = ({ children }) => {
  const [state, setState] = useState();
  return (
    <div
      // ...
      style={{ left: state.x, top: state.y }}
    >
      {children}
    </div>
  );
};

const SomeOutsideComponent = () => {
  return (
    <MovingComponent>
      <ChildComponent />
    </MovingComponent>
  )
}
```

"Children" `<ChildComponent />` là một element được tạo ở `SomeOutsideComponent`, khi `MovingComponent` re-render, nó vẫn nhận cùng một object children, object này cũng không hề bị **re-create** và sẽ không re-render

2. Nếu truyền children như render function, tại sao nó bị re-render

```jsx
const MovingComponent = ({ children }) => {
  const [state, setState] = useState();
  return (
    <div ///...
    >
      {children()}
    </div>
  );
};

const SomeOutsideComponent = () => {
  return (
    <MovingComponent>
      {() => <ChildComponent />}
    </MovingComponent>
  )
}
```

Lúc này "children" là một **function**, chúng ta thực hiện **execute** để nó trả về object element, mỗi lần `MovingComponent` re-render nó sẽ **execute** children function và trả về một object hoàn toàn mới

3. Dùng memo ở "parent" component không chặn được re-render, và chỉ cần dùng memo với child component mà không cần dùng memo cho parent

```jsx
const MovingComponentMemo = React.memo(MovingComponent);

const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  return (
    <MovingComponentMemo>
      <ChildComponent />
    </MovingComponentMemo>
  )
}
```

Khi re-render `SomeOutsideComponent`, chúng ta tạo mới hoàn toàn `ChildComponent` trên mỗi lần re-render, `React.memo` nó kiểm tra prop truyền vào cho `MovingComponent` và lúc này nó đã là các object khác nhau trên mỗi lần render

Khi memo `ChildComponent`

```jsx
const ChildComponentMemo = React.memo(ChildComponent);

const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  return (
    <MovingComponent>
      <ChildComponentMemo />
    </MovingComponent>
  )
}
```

Trong trường hợp này, dù cho `MovingComponent` xảy ra re-render, children khi đối chiếu sẽ hoàn toàn không khác, react-dom sẽ bỏ qua và không re-render lại những object không thay đổi

4. Truyền children như một function, memo không còn hoạt động

```jsx
const SomeOutsideComponent = () => {
  const [state, setState] = useState();

  const child = useCallback(() => <ChildComponent />, []);

  return <MovingComponent>{child}</MovingComponent>;
  // như này cho dễ hình dung
  // return  <MovingComponent children={child} />;
};
```

Khi `SomeComponent` re-render, `MovingComponent` cũng sẽ re-render, khi nó đó nó gọi tiếp **function** children, function được memoize nhưng **giá trị nó return** khác nhau ở mỗi lần execute

Hy vọng với bài viết này bạn làm chủ và giải thích được những bí ẩn đằng sau mỗi lần re-render

[The mystery of React Element, children, parents and re-renders](https://www.developerway.com/posts/react-elements-children-parents)