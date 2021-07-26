---
slug: "/2020-03-23-tat-tan-tat-huong-dan-ve-use-effect"
date: "2020-03-23"
title: "useEffect từ a tới z"
desc: "Đây là một bài viết tương đối dài dòng về useEffect, bạn cần biết và đã đọc qua tài liệu về useEffect trên trang chính thức của React trước, và nếu chỉ thực sự cần biết sử dụng useEffect ra sao, bạn không cần đọc bài viết phân tách mổ xẻ sâu kiểu này."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "hoc-thuat"]
---

<!-- TOC -->

- [Mỗi lần render là một giá trị Prop và State độc lập](#mỗi-lần-render-là-một-giá-trị-prop-và-state-độc-lập)
- [Một là không nói láo, 2 là không nói láo nhiều lần](#một-là-không-nói-láo-2-là-không-nói-láo-nhiều-lần)
- [Hậu quả của việc dối trá](#hậu-quả-của-việc-dối-trá)
- [2 cách để thú thật với React về dependency](#2-cách-để-thú-thật-với-react-về-dependency)
- [Tính năng update của Google Docs](#tính-năng-update-của-google-docs)

<!-- /TOC -->

## Mỗi lần render là một giá trị Prop và State độc lập

Trước khi bắt đầu nói về `useEffect` chúng ta cần nhắc lại quá trình render

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p> ...
      <button onClick={() => setCount(count + 1)}></button>
    </div>
  );
}
```

Khác với Vue, nó không phải là một dạng _data binding_, _watcher_, _proxy_, nó chỉ là một giá trị thông thường.

```jsx
const count = 42;

<p> {count} </p>;
```

Đầu tiên giá trị khởi tạo của `count` sẽ =0. Khi chúng ta gọi `setCount(1)`, React sẽ gọi lại component một lần nữa, với giá trị `count` lúc này là `1`. Cứ vậy

```jsx
// Lần đầu render
function Counter() {
  const count = 0; // trả về bởi useState()  // ...
  <p>You clicked {count} times</p>;
  // ...
}

// sau khi click, function này được gọi lại lần nữa
function Counter() {
  const count = 1; // trả về bởi `useState()  // ...
  <p>You clicked {count} times</p>;
  // ...
}

// sau khi click, function được gọi lại lần nữa
function Counter() {
  const count = 2; // trả về bởi useState()  // ...
  <p>You clicked {count} times</p>;
  // ...
}
```

Khi update một state, React gọi lại component, mỗi lần render như vậy, nó sẽ **thấy** một giá trị `count` mới. Sau đó React sẽ update lại DOM tương ứng.

Vấn đề mấu chốt cần nắm là giá trị `count` **trong các lần render khác nhau là khác nhau.**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked on: ${count}`);
    }, 3000);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
      ...
    </div>
  );
}
```

Chúng ta thực hiện các bước sau

- Bấm counter lên 3
- Bấm "Show alert"
- Bấm tiếp `Click me` cho counter lên 5 trước khi bị gọi timeout

![Counter demo](https://overreacted.io/46c55d5f1f749462b7a173f1e748e41e/counter.gif)

Câu hỏi ở đây là nó sẽ alert ra 5 - giá trị cuối cùng, hay là 3 giá trị lúc chúng ta click

[Chạy thử](https://codesandbox.io/s/w2wxl3yo0l)

_Bạn có thấy kết quả quá vô lý?_

Như đã nói ở trên, giá trị `count` là hằng số trên mỗi lần render. **Function của chúng ta được gọi nhiều lần, mỗi lần gọi như vậy giá trị `count` bên trong là một số độc lập hoàn toàn với giá trị trước đó**

Không phải **đặc sản** của React, viết dạng function như thế này bạn sẽ dễ hình dung hơn.

```js
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert(`Hello, ${name}`);
  }, 3000);
}

let someone = { name: "Dan" };
sayHi(someone);

someone = { name: "Yuzhi" };
sayHi(someone);

someone = { name: "Dominic" };
sayHi(someone);
```

Thế còn hàm xử lý event thì sao? cụ thể là hàm `handleAlertClick`? Cũng như trên, hàm này là có các **version** khác nhau ở các lần render khác nhau.

Bài viết được **quảng cáo** là nói về `useEffect` mà nãy giờ chưa đá động gì!

Quay lại với ví dụ từ [trang chính thức của React](https://reactjs.org/docs/hooks-effect.html)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Câu hỏi là `useEffect` đã làm cách nào để lấy được giá trị cuối cùng của `count`?

Lẽ nào đó có một dạng "data binding" hay "watching" ở đây để update giá trị `count` bên trong hàm effect? Hoặc giả React _chơi chiêu_ dùng biến mutable bên trong component để luôn có được giá trị cuối?

_Không hề!_

Chúng ta đã biết: giá trị `count` là hằng số cho các lần render, event handle cũng độc lập trên các lần render khác nhau, effect cũng vậy luôn.

Không phải giá trị `count` thay đổi bên trong `useEffect` **bất biến**, mà là `useEffect` cũng bị thay đổi trên từng lần render.

```jsx
// lần render đầu tiên
function Counter() {
  // ...
  useEffect(() => {
    document.title = `You clicked ${0} times`;
  });
  // ...
}

// sau khi click
function Counter() {
  // ...
  useEffect(() => {
    document.title = `You clicked ${1} times`;
  });
  // ...
}

// click thêm lần nữa
function Counter() {
  // ...
  useEffect(() => {
    document.title = `You clicked ${2} times`;
  });
  // ..
}
```

> Có thể mường tượng effect là một phần của kết quả lúc render

Giờ thử với `setTimeout`

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    ...
    setTimeout(() => {
          console.log(`You clicked ${count} times`);
        }, 3000);
    ...
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Nếu mà click vài lần với một khoảng thời gian _bỏ nhỏ_ thì kết quả log ra là gì?

[Thử ở đây](https://codesandbox.io/s/lyx20m1ol)

Bạn không chỉ nhận được 1 mà là một chuỗi các đoạn log ứng với số lần click.

![Screen recording of 1, 2, 3, 4, 5 logged in order](https://overreacted.io/a5727d333c270e05942f508707265378/timeout_counter.gif)

_Đương nhiên phải chạy như vậy mới đúng chứ, đâu có gì phải thắc mắc?_

Bạn đã thử với `this.state` trong class component chưa?

```jsx
componentDidUpdate() {
    setTimeout(() => {
        console.log(`You clicked ${this.state.count} times`);
    }, 3000)
}
```

![Screen recording of 5, 5, 5, 5, 5 logged in order](https://overreacted.io/264b329edc111a1973003bdf2bcacd65/timeout_counter_class.gif)

_Lý do?_ Giá trị `this.state` bên trong class component là một mutation (có thể thay đổi).

Nếu luôn muốn lấy giá trị sau cùng bên trong effect, cách dễ nhất là dùng `refs`

```jsx
function Example() {
    const [count, setCount] = useState(0);
    ...
    const latestCount = useRef(count);
    ...

    useEffect(() => {
        ...
        latestCount.current = count;
        ...
        setTimeout(() => {
            ...
                console.log(`You clicked ${latestCount.current} times`);
            ...
        }, 3000);
    });
}
```

![](https://overreacted.io/timeout_counter_refs-78f7948263dd13b023498b23cb99f4fc.gif)

```jsx
function Greeting({ name }) {
  return <h1 className="Greeting">Hello, {name}</h1>;
}
```

Nếu chúng ta render `<Greeting name="Dan" />`, sau đó render `<Greeting name="Luu" />`. Cuối cùng chúng ta luôn nhận được _Hello, Luu_

React luôn đồng bộ cục DOM với giá trị hiện tại của `prop` và `state`. Không cần phân biệt giữa `mount` và `update` khi render. Có thể hình dung effect cũng tương tự như vậy, **`useEffect` cho phép đồng bộ những phần không nằm trong React tree với giá trị của `prop` và `state`**

```jsx
function Greeting({ name }) {
  useEffect(() => {
    document.title = "Hello, " + name;
  });

  return <h1 className="Greeting">Hello, {name}</h1>;
}
```

Câu thần chú cho việc này là: **Quan trọng là đích đến, không phải quá trình**

Chạy effect trên tất cả lúc chạy render sẽ không hay lắm, đôi khi có trường hợp lặp vô tận.

Trong quá trình re-render, React chỉ cập nhập đúng phần DOM đã thay đổi.

Ví dụ như

```jsx
<h1 className="Greeting">Hello, Dan</h1>
```

Sang

```jsx
<h1 className="Greeting">Hello, Luu</h1>
```

React sẽ thấy 2 object

```js
const oldProps = { className: "Greeting", children: "Hello, Dan" };
const newProps = { className: "Greeting", children: "Hello, Yuzhi" };
```

Nó sẽ xác định được `children` bị thay đổi và cần update, còn `className` thì không, nó sẽ làm như sau

```js
domNode.innerText = "Hello, Luu";
```

Chúng ta cũng muốn effect làm điều tương tự, khi re-render chỉ apply những update cần thiết

Ví dụ với component này

```jsx
function Greeting({ name }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = "Hello, " + name;
  });

  return (
    <h1 className="Greeting">
      Hello, {name}
      <button onClick={() => setCounter(count + 1)}></button>
    </h1>
  );
}
```

`useEffect` không hề liên quan tới giá trị state `counter`, gọi `document.title` khi giá trị `counter` thay đổi không phải là ý hay.

Đó là lý do tại sao chúng ta có thêm tham số `dependency` (một mảng) khi dùng `useEffect`

```jsx
useEffect(() => {
  document.title = "Hello, " + name;
}, [name]); // deps
```

Dịch ra ngôn ngữ con người là thế này: "Tao biết React mày không phân biệt được sự khác nhau bên trong function, nên tao hứa là tao chỉ dùng đến `name` bên trong function này thôi, và chỉ giá trị `name` này update thì mày hả gọi nó"

## Một là không nói láo, 2 là không nói láo nhiều lần

Đừng bao giờ lừa gạt React bằng cách đưa dependency không đúng cho nó, hậu quả nhãn tiền. Hợp lý, nhưng nhiều lập trình viên quen sử dụng `class` sẽ cố tình qua mặt

```js
function SearchResults() {
  async function fetchData() {
    // ...
  }

  useEffect(() => {
    fetchData();
  }, []);
  // việc ntn được hôn? không phải lúc nào cũng đúng
  // có cách viết tốt hơn
}
```

Bạn sẽ nghĩ là "Tao chỉ muốn chạy nó lúc mount thôi". Nếu chúng ta chỉ định một dependency, **tất cả giá trị bên trong component sử dụng bởi effect phải được khai báo cụ thể**. Bao gồm prop, state, function

Đôi khi mà làm như vậy nó phát sinh lỗi. Thí dụ như gọi fetch data liên tục hoặc socket được tạo không cần thiết. Cách giải quyets là **không xóa chúng khỏi dependency**

Trước khi nói về cách giải quyết, chúng ta xem vấn đề ở đây là gì khi so sánh Dependency

## Hậu quả của việc dối trá

Nếu mảng dependency chứa tất cả giá trị sử dụng trong `useEffect`, React biết được khi nào thì re-run nó

```js
useEffect(() => {
  document.title = "Hello, " + name;
}, [name]);
```

![Diagram of effects replacing one another](https://overreacted.io/fae247cd068eedbd4b62ba50592d2b3d/deps-compare-correct.gif)

Nhưng nếu chúng ta chỉ định `[]`, nó không re-run sau lần đầu tiên

```jsx
useEffect(() => {
  document.title = "Hello, " + name;
}, []); // thiếu name
```

![Diagram of effects replacing one another](https://overreacted.io/25f75db3f9f57ffe1426912093577445/deps-compare-wrong.gif),

```js
useEffect(() => {
  document.title = "Hello, " + name;
}, []); // Sai: không được phép bỏ qua thằng name
```

Rõ ràng là 2 thằng dependency không khác nhau, nên nó sẽ không chạy effect

Trong tình huống này, vấn đề khá là hiển nhiên, nhưng trực giác có thể đánh lừa bạn trong các tình huống khác, lấy ví dụ, chúng ta muốn giá trị `counter` tăng đều sau mỗi giây. Với một class, trực giác sẽ mách bảo: "Set up cái interval một lần, rồi dứt tình vứt áo một lần", kiểu như [thế này](https://codesandbox.io/s/n5mjzjy9kl), khi chuyển qua dùng `useEffect` bạn sẽ nghĩ đến dùng `[]` cho mảng phụ thuộc "Tao chỉ muốn tình một đêm", đúng không?

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

Theo như lập luận rất hay gặp "danh sách phụ thuộc cho phép chúng ta chỉ định việc re-render effect khi nào", và ở đây ta chỉ muốn trigger nó một lần vì nó là interval, _nhưng tại sao lại có vấn đề ở đây?_

Chúng ta đang muốn effect này chỉ chạy lần đầu tiên mà thôi, đưa vào dependencies là `[]` có vẻ hợp lý, React sẽ bỏ qua hết những lần sau, nhưng chúng ta đang lừa dối React, vì bên trong chúng ta có sử dụng giá trị `count`, chúng ta có giá trị phụ thuộc mà không khai báo. Thực tế `setCount()` sẽ gọi liên tục sau 1 giây, chứ không dừng lại sau lần gọi đầu tiên.

Ở lần render đầu tiên, `count` = 0, vì thế `setCount(count + 1)` ở lần render đầu tiên nghĩa là `setCount(0+1)`, nhưng vì không re-run effect thêm lần nào nữa, chúng ta cứ gọi mãi `setCount(0+1)` ở những lần tiếp theo

```jsx
// state = 0
function Counter() {
  // ...
  useEffect(
    // lần đầu
    () => {
      const id = setInterval(() => {
        setCount(0 + 1); // luôn là setCount(1)      }, 1000);
      return () => clearInterval(id);
    },
    [] // không re-run  );
  // ...
}

// state = 1
function Counter() {
  // ...
  useEffect(
    // không bao giờ chạy    () => {
      const id = setInterval(() => {
        setCount(1 + 1);
      }, 1000);
      return () => clearInterval(id);
    },
    []
  );
  // ...
}
```

Những con bug như thế này sẽ rất rất khó để mò ra được, vì thế hãy luôn thành thật với React, khai báo hết dependency đang có.

![Diagram of stale interval closure](https://overreacted.io/29e53bd0c9b7d2ac70d3cd924886b030/interval-wrong.gif)

## 2 cách để thú thật với React về dependency

_Nên chọn cách một, cách 2 chỉ áp dụng khi cần thiết_

**Cách 1: luôn là người trung thực, chính trực đạo đức hết mực, luôn khai báo đầy đủ thông tin bạn trai, bạn gái, ba má, chú bác nào bạn đang phụ thuộc cho cơ quan thuế**

```jsx
useEffect(() => {
  const id = setInterval(() => {
    etCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);
```

Tuy nhiên thế này, khi giá trị `count` thay đổi, cái interval của chúng ta sẽ bị xóa và đặt lại lần nữa sau những lần render, nó không phải là cái chúng ta mong muốn nó hoạt động như vậy

![Diagram of interval that re-subscribes](https://overreacted.io/5734271ddfa94d2d65ac6160515e0069/interval-rightish.gif)

**Cách 2 là thay đổi tư duy, giảm bớt anh trai nuôi, em gái nuôi không cần thiết**

Chúng ta không nói xạo, chúng ta giảm bớt số lượng những thứ phụ thuộc cho việc re-run effect

Để làm được việc này, chúng ta phải hỏi bản thân: **chúng ta dùng count để làm gì?** Có vẻ như chúng ta chỉ dùng nó cho việc gọi hàm `setCount`, chúng ta không thực sự cần giá trị `count` nếu chúng ta biết được giá trị trước đó, trường hợp trên, chúng ta có thể không cần dùng đến giá trị `count` mà dùng _previous state_

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

![Diagram of interval that works](https://overreacted.io/f128ad20c28317ed27a3cb68197fc906/interval-right.gif)

[Chạy thử](https://codesandbox.io/s/q3181xz1pj)

## Tính năng update của Google Docs

Khi nói về effect, định hướng lập trình chúng ta là **đồng bộ hóa**, có một khái niệm khá thú vị khi thực hiện đồng bộ hóa là chúng ta thường không đồng bộ toàn bộ nội dung. Lấy ví dụ như Google Docs, nó không thực sự truyền tải **cả trang** lên phía server, làm như vậy hiệu năng sẽ rất tệ, cái nó làm là gửi đi một thông tin chứa cái mà user đang muốn thực hiện.

**Tốt nhất truyền đi thật ít thông tin từ effect (chỉ những thông tin cần thiết nhất) vào trong component**. Hàm `setCount(c => c + 1)` sẽ gửi đi ít thông tin hơn so với hàm `setCount(count + 1)` đứng trên một khía cạnh nào đó vì nó không phụ thuộc giá trị hiện tại, [sử dụng ít state nhất có thể](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state) để đạt được kết quả là một trong các nguyên lý chính của đợt cập nhập React với effect

Tuy nhiên không phải lúc nào cuộc sống cũng đơn giản với bạn như vậy, nếu chúng ta muốn tính toán giá trị của state mới dựa trên một prop, 2 giá trị state phụ thuộc lẫn nhau, `setState` là không đủ. Chúng ta có người chị em hàng xóm tên `useReducer`

```jsx
function Counter({ step }) {
  const [count, dispatch] = useReducer(reducer, 0);

  function reducer(state, action) {
    if (action.type === "tick") {
      return state + step;
    } else {
      throw new Error();
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return {count};
}
```

Cách dùng `useReducer` như vậy là một dạng **cheat mode** của hook, cho phép chúng ta bỏ qua các dependency _ngầm_ khỏi effect, và chặn re-run không không cần thiết

[Chạy thử](https://codesandbox.io/s/7ypm405o8q)

Bài viết này vẫn còn, và nếu bạn vẫn còn muốn đào sâu hơn nữa, có thể tìm đọc bài viết gốc của Dan

[A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
