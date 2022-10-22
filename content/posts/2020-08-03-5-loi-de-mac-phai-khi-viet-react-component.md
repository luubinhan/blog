---
slug: "/2020-08-03-5-loi-de-mac-phai-khi-viet-react-component"
date: "2020-08-03"
title: "5 sai làm thường thấy khi viết react component"
desc: "Tổng hợp những lỗi thường thấy khi bạn viết react component, và làm sao để khắc phục"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

Đây cũng chẳng phải là những lỗi *bắt buộc* phải sửa, thoạt nhìn bạn cũng sẽ ko biết được nó có bị sai gì không, cũng không ảnh hưởng đến performance hay gì. Tuy nhiên mỗi người sẽ có ý kiến khác nhau trên một vấn đề, có người sẽ bắt fix, người thì cho là ko cần thiết, rất mong các bạn bổ sung cho quan điểm của mình.

## Sử dụng `useState` khi không thực sự cần thiết

Đôi khi chúng ta sử dụng `useState` trong nhiều trường hợp không cần thiết, đưa những giá trị vào `state` không thực sự ảnh hưởng đến việc cập nhập component.

Ví dụ, trong ta có 2 cái nút: Counter và Submit, nút counter tăng giá trị count, nút submit sẽ gửi giá trị count lên API. **Lưu ý là không có hiển thị giá trị count trên giao diện**

❌

```jsx
function ClickButton(props) {
  const [count, setCount] = useState(0);

  const onClickCount = () => {
    setCount((c) => c + 1);
  };

  const onClickRequest = () => {
    apiCall(count);
  };

  return (
    <div>
      <button onClick={onClickCount}>Counter</button>
      <button onClick={onClickRequest}>Submit</button>
    </div>
  );
}
```

Nhìn chung code này cũng sẽ ko có lỗi gì đâu, chỉ là nếu để ý bạn sẽ thấy khi state thay đổi, component *re-render*, nhưng rõ ràng việc *re-render* cũng chẳng thay đổi gì, vì chúng ta không hiển thị giá trị `count` ra giao diện

✅ Cách làm đề nghị như sau

```jsx
function ClickButton(props) {
  const count = useRef(0);

  const onClickCount = () => {
    count.current++;
  };

  const onClickRequest = () => {
    apiCall(count.current);
  };

  return (
    <div>
      <button onClick={onClickCount}>Counter</button>
      <button onClick={onClickRequest}>Submit</button>
    </div>
  );
}
```

Ở đây chúng ta dùng `useRef`, giá trị của `useRef` dù có thay đổi cũng không ảnh hưởng đến việc *re-render*.

## Sử dụng `router.push` thay vì link

Ví dụ nếu chúng ta muốn *navigate* đến một trang nào đó khi user click vào

❌

```jsx
function ClickButton(props) {
  const history = useHistory();

  const onClick = () => {
    history.push('/next-page');
  };

  return <button onClick={onClick}>Go to next page</button>;
}
```

Vấn đề là nếu làm như vậy, làm sau user có thể mở ra một tab mới?, các trình screen reader cũng sẽ ko hiểu được nó là một link (accessibility không tốt).

✅ Cách làm đề nghị như sau

```jsx
function ClickButton(props) {
  return (
    <Link to="/next-page">
      <span>Go to next page</span>
    </Link>
  );
}
```

## Handle action bằng useEffect

`useEffect` là một trong những hook tốt nhất, và tốn nhiều giấy mực nhất của react. Mặc dù cũng hữu ích đấy nhưng cũng không ít lúc phải mệt mỏi với nó.

Thí dụ có một cái component `fetch` một danh sách dữ liệu, rồi render ra

```jsx
function DataList({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    callApi()
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !error && data) {
      onSuccess();
    }
  }, [loading, error, data, onSuccess]);

  return <div>Data: {data}</div>;
}
```

Ở đây chúng ta setup 2 hook `useEffect`, cái đầu để load dữ liệu lần đầu tiên, cái thứ 2 để gọi `onSuccess` khi có thay đổi về dữ liệu.

Vấn đề là nó làm mất quan hệ 1-1 giữa action và function cần gọi. Nói một cách dễ hiểu hơn là việc `onSuccess` không **đảm bảo chỉ** được gọi khi get dữ liệu thành công, đâu đó trong code bạn vẫn có thể có những cách khác để gọi `onSuccess`.

✅ Cách làm đề nghị như sau

```jsx
function DataList({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    callApi()
      .then((fetchedData) => {
        setData(fetchedData);
        onSuccess();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{data}</div>;
}
```

## Mỗi component một nhiệm vụ

Compose nhiều component nói chúng là khó, khó ở chỗ khi nào tách thì hợp lý. Lấy ví dụ như cái header sẽ xuất hiện một nút burger trên mobile và tab trên desktop

❌

```jsx
function Header({ menuItems }) {
  return (
    <header>
      <HeaderInner menuItems={menuItems} />
    </header>
  );
}

function HeaderInner({ menuItems }) {
  return isMobile() ? <BurgerButton menuItems={menuItems} /> : <Tabs tabData={menuItems} />;
}
```



Vấn để ở đây là với logic `isMobile` như vậy, chúng ta có thực sự cần thiết tách `HeaderInner` ra không?

✅ Cách làm đề nghị như sau

```jsx
function Header(props) {
  return (
    <header>{isMobile() ? <BurgerButton menuItems={menuItems} /> : <Tabs tabData={menuItems} />}</header>
  );
}
```



## Chỉ một công việc thực hiện trong `useEffect`

Nếu không cẩn thận việc sử dụng `useEffect` lắm lúc cũng giống như cơn ác mộng với `componentWillReceivedProps` và `componentDidUpdate` một thời. Tưởng tượng chúng ta có một component fetch dữ liệu từ backend, hiển thị breadcrumb tùy theo vị trí hiện tại

❌

```jsx
function Example(props) {
  const location = useLocation();

  const fetchData = () => {
    /*  Calling the api */
  };

  const updateBreadcrumbs = () => {
    /* Updating the breadcrumbs*/
  };

  useEffect(() => {
    fetchData();
    updateBreadcrumbs();
  }, [location.pathname]);

  return (
    <div>
      <BreadCrumbs />
    </div>
  );
}
```



Chúng ta đang chạy 2 effect khác nhau: 1 là fetch dữ liệu, 2 là update breadcrumb trên giá trị location (nếu có thay đổi). Rõ ràng là đôi khi location có change thật nhưng chúng ta đâu cần `fetchData` chạy

Nên tách ra mỗi effect chỉ làm 1 việc thôi.

✅ Cách làm đề nghị như sau

```jsx
function Example(props) {
  const location = useLocation();

  const updateBreadcrumbs = () => {
    /* Updating the breadcrumbs*/
  };

  useEffect(() => {
    updateBreadcrumbs();
  }, [location.pathname]);

  const fetchData = () => {
    /*  Calling the api */
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BreadCrumbs />
    </div>
  );
}
```



Không biết còn trường hợp nào chúng ta vẫn hay mắc phải không, các bạn có thể chia sẻ thêm.



[Five common mistakes writing react components (with hooks) in 2020](https://www.lorenzweiss.de/common_mistakes_react_hooks)