---
slug: "/2020-03-16-van-de-cua-react-context-tren-async"
date: "2020-03-16"
title: "Vấn đề của React Context trên các xử lý async"
desc: "React Context có phải là viên đạn bạc sẽ giải quyết mọi vấn đề thay cho Redux hay không?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "thu-thuat"]
---

<!-- TOC -->

- [Chúng ta bắt đầu với một component duy nhất](#chúng-ta-bắt-đầu-với-một-component-duy-nhất)
- [Lấy dữ liệu sau khi có tương tác](#lấy-dữ-liệu-sau-khi-có-tương-tác)
- [Đâu là giải pháp](#đâu-là-giải-pháp)

<!-- /TOC -->

Để chia sẻ được `state` giữa các component với nhau, React cung cấp API Context, với lời hứa ngon ngọt mà bạn có thể đọc đâu đó trên mạng "có thể thay thế redux". Từ kinh nghiệm thực tế của team Atlassian cũng như của bản thân mình (là tui luckyluu), sử dụng nó trên các module lớn, hoặc trên toàn bộ App (gốc trên cùng của cây React) là một cơn **Ác mộng** cho lập trình viên.

## Chúng ta bắt đầu với một component duy nhất

Tưởng tượng chúng tạo ra một component Dropdown hiển thị danh sách categories

```jsx
class CategoriesQuery extends Component {
  state = { data: null, loading: false, error: null };

  fetch = async () => {
    this.setState({ loading: true });
    try {
      const data = await fetch('/categories');
      this.setState({ data, loading: false })
    } catch (error) {
      this.setState({ error, loading: false })
    }
  };

  componentDidMount() {
    this.fetch();
  }

  render () {
    return this.props.children(this.state);
  }
}

// usage
const CategoriesDropdown = (
  <CategoriesQuery>
    ({ data, loading, error }) => <Dropdown ... />
  </CategoriesQuery>
)
```

Khá sạch đẹp, đúng không? Lúc component được mount vào DOM chúng ta fetch dữ liệu, đặt giá trị cho state loading, vâng vân.

Tình huống gặp phải là chúng ta cũng muốn sử dụng danh sách categories này trên một component nào đó khác. Việc cứ phải bọc (wrap) component lại dạng cha con, rồi truyền danh sách categories thông qua `props` không phải là lựa chọn khôn ngoan, chúng ta cần lưu nó ở một nơi tập trung (store) và truy xuất ở bất kỳ đâu, chúng ta có thể sử dụng `createContext`. Việc chuyển qua dùng `createContext` dễ như ăn bún

```jsx
const { Provider, Consumer: CategoriesConsumer } = createContext();

class CategoriesProvider extends Component {
  state = { data: null, loading: false, error: null };

  fetch = async () => {
    this.setState({ loading: true });
    try {
      const data = await fetch('/categories');
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  componentDidMount() {
    this.fetch();
  }

  render () {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

// usage
const CategoriesDropdown = (
  <CategoriesConsumer>
    ({ data, loading, error }) => <Dropdown ... />
  </CategoriesConsumer>
)
```

Chúng ta **"chỉ"** còn lại 2 vấn đề: đặt `<CategoriesProvider/>` ở đâu và chuyện gì sẽ xảy ra nếu Provider vì lý do nào đó không thể là _cha chú_ của một component consumer?

Xử lý các vấn đề phức tạp xung quanh việc viết context thế nào cho hợp lý, fallback ra làm sao sẽ cần đến một bài viết dài dòng khắc, giờ cứ tưởng tượng bạn luôn cần Provider render "ở đâu đó" (nhiều khi là cùng với cả tá provider khác nữa khi bạn làm một ứng dụng lớn).

## Lấy dữ liệu sau khi có tương tác

Đoạn code fetch dữ liệu lúc mount component ở trên trông rất hợp lý, nhưng sẽ có tình huống bạn cần trigger `fetch` không phải lúc mount.

```
Node A
    - Node B
        - Node C
```

Nếu đặt tình huống bạn fetch dữ liệu categories ở `<Node A />`, được `<Node C/>` hiển thị, nhưng user lúc sử dụng đôi khi chả bao giờ thấy đến `<Node C/>`, họ có thể dừng lại ở màn hình `<Node A/>` thì việc bắt trình duyệt đi lấy dữ liệu quá sớm không phải là một chuyện nên làm. Do đó chúng ta sẽ có nhu cầu trả về hàm lấy dữ liệu trực tiếp xuống context:

```jsx
render () {
  const value = { ...this.state, fetch: this.fetch };
  return <Provider value={value}>{this.props.children}</Provider>;
}
```

**ĐỪNG BAO GIỜ LÀM NHƯ VẬY**. Bạn có thấy được con bug "ngầm" trong cách viết trên không? Mỗi lần `CategoriesProvider` re-render, chúng ta truyền xuống một giá trị hoàn toàn mới cho `value` - _một object được khởi tạo mới tinh_. Tạo ra một object rồi truyền xuống thành `props` là lỗi căn bản cần tránh, tuy nhiên khi dùng cho Context Provider nó đặc biệt trầm trọng. Khi để ý thấy lỗi này, chúng tôi đã theo sự chỉ dẫn từ tài liệu của [React Context guidelines](https://reactjs.org/docs/context.html#caveats), lưu phương thức đó vào state

```jsx
class CategoriesProvider extends Component {
  constructor() {
    this.state = {
      data: null,
      loading: false,
      error: null,
      fetch: this.fetch
    };
  }
}
```

Sau đó trong component consumer, chúng ta sẽ fetch dữ liệu categories khi thằng component consumer thực sự render

```jsx
const CategoriesQuery = ({ children }) => {
  const context = useContext(CategoriesContext);
  useEffect(() => {
    if (!context.data) context.fetch();
  }, [context]);
  return children(context);
};
```

Xong! Chưa thật sự xong đâu, khi thêm `<CategoriesQuery/>` ở 2 nơi khác nhau trên cây, nếu 2 component được mount cùng một lúc, `fetch` sẽ chạy **2 lần**.

Bug nhỏ thôi mà đúng không? Chúng ta không kiểm tra state `loading` trước khi gọi `fetch`. Sửa nhanh trong Provider:

```js
// class CategoriesProvider...
fetch = () => {
  if (this.state.loading) return;
  // ...
};
```

Thử refresh lại trang, với 2 `CategoriesQuery` mount và... **BÙM** Vẫn là 2 request network. Kiểm tra lại lần nữa nào, có gì đó lỗi rồi, không lỗi nữa, lại lỗi nữa, rồi bỗng dưng chúng ta nhận ra React `setState` là một `async`. Có nghĩa là việc giá trị `loading` vẫn là `false` trong cả 2 lần gọi thậm chí `setState` đã được gọi một lần. "Shitty React"

Bắt đầu tìm kiếm một cách làm "less shitty" (bớt nhảm shit) với chuyện `setState` async trong Context Provider (có 4 năm cách làm tùy theo độ _sáng tạo_), nhưng có thể đảm bảo rằng không có cách nào thập toàn thập mỹ. Luôn cảm thấy chúng ta đang chống lại cách làm chính quy từ React.

## Đâu là giải pháp

Context API có rất nhiều điểm cộng ngay cả khi so sánh với Redux, cái chúng ta cần là một cách vẹn toàn cả cho cả 2.

Mình cũng gặp vấn đề y chang như vậy với ứng dụng đang làm. Tìm kiếm và cuối cùng chốt hạ dùng [react-sweet-state](https://atlassian.github.io/react-sweet-state/) cho cả team

```jsx
import { createStore, createHook } from "react-sweet-state";

// giá trị khởi tạo
const initialState = {
  data: null,
  loading: false,
  error: null
};

// define the actions that mutate the state
const actions = {
  fetch: () => async ({ getState, setState }) => {
    if (getState().loading) return;
    setState({ loading: true });
    try {
      const data = await fetch("/categories");
      setState({ data, loading: false });
    } catch (error) {
      setState({ error, loading: false });
    }
  }
};

// tạo store
const CategoriesStore = createStore({ initialState, actions });

// tạo components để truy cập dữ liệu từ store
const useCategories = createHook(CategoriesStore);

// sử dụng
const CategoriesQuery = ({ children }) => {
  const [state, actions] = useCategories();
  useEffect(() => {
    if (!state.data) actions.fetch();
  }, [state, actions]);
  return children(context);
};
```

Có nhiều điểm cộng cho [react-sweet-state](https://atlassian.github.io/react-sweet-state/) như nó vẫn dùng Context API, nhưng an toàn hơn, các action sẽ dễ test hơn, làm việc được với Redux DevTools, đã xử lý những lỗi vẫn hay gặp với React Context. Và nhiều điều hay ho khác nữa. Các bạn nhớ like cho repo này trên github.

Một số dẫn chứng khác để bạn tham khảo

- [React Context **Không được thiết kế cho dữ liệu thường xuyên cập nhập**](https://twitter.com/dan_abramov/status/1109595839347990528)
- [**Hạn chế hiệu năng** của React Context](https://github.com/facebook/react/issues/13739)
- [React Context **Không hỗ trợ selector**](https://github.com/facebook/react/issues/14110)
- [React Context **Không thể ngăn chặn việc re-render**](https://github.com/facebook/react/issues/15156)

[The pitfalls of async operations via React Context API](https://medium.com/@albertogasparin/the-pitfalls-of-async-operations-via-react-context-api-ab987d4290e6)
