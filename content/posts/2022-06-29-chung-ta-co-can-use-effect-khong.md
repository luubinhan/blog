---
slug: "2022-06-29-chung-ta-co-can-use-effect-khong"
date: "2022-06-29"
title: "Chúng ta có cần useEffect không"
desc: "Một số trường hợp không cần effect hay bắt gặp"
tags: ["react", "javascript"]
canonical_url: false
---

`useEffect` được thiết kế để phục vụ đồng bộ hóa component với *thế giới bên ngoài*, như network, DOM, nếu không có sự tham gia của các yếu tố *bên ngoài*, ví dụ như *state* cần thay đổi khi *prop* thay đổi, chúng ta không cần dùng đến useEffect. Hạn chế lỗi, code chạy nhanh hơn, dễ hiểu hơn là những ưu điểm khi có ít effect.

<!-- TOC -->

- [Transform data](#transform-data)
- [User event](#user-event)
- [Khởi chạy ứng dụng](#khởi-chạy-ứng-dụng)
- [Subscrib trên những dữ liệu bên ngoài](#subscrib-trên-những-dữ-liệu-bên-ngoài)
- [Fetch data](#fetch-data)
- [Kết luận](#kết-luận)

<!-- /TOC -->

## Transform data

Ví dụ chúng ta cần filter trên một danh sách, chúng ta sẽ có xu hướng đưa việc transform này vào trong một effect với dependency là `array`

```js{5}
function TodoList({ todos, filter }) {
	// 🔴 Tránh xa sử dụng cách này
	const [visibleTodos, setVisibleTodos] = useState([])
	useEffect(() => {
		setVisibleTodos(getFilteredTodos(todos, filter))
	}, [todos, filter])
}

// ✅ Đúng ra chỉ cần
const visibleTodos = getFilteredTodos(todos, filter)
// ✅ Nếu việc `getFilteredTodos` tốn khá nhiều thời gian để chạy
const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
```

Ví dụ khác, kết hợp `fullName` và `lastName` thành `userName`

```js{7}
const [firstName, setFirstName] = useState('vui')
const [lastName, setLastName] = useState('laptrinh')

// 🔴 Tránh xa sử dụng cách này
const [fullName, setFullName] = useState('')
useEffect(() => {
	setFullName(firstName + ' ' + lastName)
}, [firstName, lastName])
```

Tại sao phại phức tạp một cách không cần thiết như thế trong khi chúng ta chỉ cần viết

```js{4}
const [firstName, setFirstName] = useState('vui')
const [lastName, setLastName] = useState('laptrinh')
// ✅ Đúng ra chỉ cần
const fullName = firstName + ' ' + lastName
```

## User event

Ví dụ chúng ta sẽ gọi `api/buy` khi user click vào nút *mua sản phẩm*, sau đó hiển thị một thông báo đến user, mặc dù việc gắn sự kiện `onClick` trên button rất hiển nhiên, nhưng có sẽ có người dùng effect

```js{4}
// 🔴 Tránh xa sử dụng cách này
useEffect(() => {
	if (product.isInCart) {
		showToast(`Đã thêm vào giỏ hàng`)
	}
}, [product])

function handleBuyClick() {
    addToCart(product);
}

function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
}

// ✅ Đúng ra chỉ cần
function buyProduct() {
	addToCart(product)
	showToast(`Đã thêm vào giỏ hàng`)
}

function handleBuyClick() {
    buyProduct(product);
}

function handleCheckoutClick() {
    buyProduct(product);
    navigateTo('/checkout');
}
```

Một ví dụ khác, cả hai `POST` request đều có thể xem là side effect, tuy nhiên chỉ có một trường hợp nên dùng `useEffect`

```jsx
// ✅ Trường hợp này ok
useEffect(() => {
	post('/analytics/event', { eventName: 'visit_form' })
}, [])

// 🔴 Tránh xa sử dụng cách này
const [jsonToSubmit, setJsonToSubmit] = useState(null)
useEffect(() => {
	if (jsonToSubmit !== null) {
		post('/api/register/', jsonToSubmit)
	}
}, [jsonToSubmit])
```

Với trường hợp 2, việc phải chạy `post('api/register'` hoàn toàn không phải do chúng ta phải **hiển thị** component, mà nó cần chạy vì user click submit. Đừng làm phức tạp vấn đề một cách không cần thiết

```jsx
// ✅ Rất hiển nhiên
function handleSubmit(e) {
	e.preventDefault()
	post('/api/register', { ...our_form_data })
}
```

## Khởi chạy ứng dụng

Khi ứng dụng bắt đầu chạy, chúng ta muốn một số hàm chạy đúng 1 lần đầu tiên

```jsx
function App() {
	// 🔴
	useEffect(() => {
		loadDatafromLocalStorage()
		checkAuthToken()
	}, []) 
}
```

Tuy nhiên nó lại chạy 2 lần trên môi trường development đấy các bạn ạ! [Bài này có giải thích nè](https://beta.reactjs.org/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development), mặc dù trên production sẽ không xảy ra (zỡn kiểu này không vui đâu mấy bác team React ạ)

Chúng ta nên hiểu sự khác nhau giữa **chạy một lần khi app khởi tạo** khác với **chạy một lần khi component mount**. Để chạy ĐÚNG 1 LẦN khi app khởi tạo, chúng ta sửa lại như vầy

```jsx
let didInit = false

function App() {
	useEffect(() => {
		if (!didInit) {
			didInit = true
			// ✅
			loadDatafromLocalStorage()
			checkAuthToken()
		}
	}, [])
}
```

Hoặc có thể chạy trước khi app render luôn

```jsx
if (typeof window !== 'undefined') {
	// ✅
	loadDatafromLocalStorage()
	checkAuthToken()
}

function App() { ... }
```

## Subscrib trên những dữ liệu bên ngoài

Những dữ liệu bên ngoài một react component, như từ browser API, chúng ta vẫn thường dùng effect như ví dụ

```jsx
function useOnlineStatus() {
	const [isOnline, setIsOnLine] = useState(true)
	// 🔴
	useEffect(() => {
		function updateState() {
			setIsOnline(navigator.onLine)
		}
		updateState()
		
		window.addEventListener('online', updateState)
		window.addEventListener('offline', updateState)

		return () => {
			window.removeEventListener('online', updateState)
			window.removeEventListener('offline', updateState)
		}
	}, [])
	
	return isOnline
}
```

Cách viết này không hẳn sai hoàn toàn, chỉ là có một cách tối ưu hơn được React hỗ trợ trong trường hợp cần phải subscribe trên external store: `useSyncExternalStore`

```jsx
function subscribe(callback) {
	window.addEventListener('online', callback)
	window.addEventListener('offline', callback)

	return () => {
		window.removeEventListener('online', callback)
		window.removeEventListener('offline', callback)
	}
}

function useOnlineStatus() {
	// ✅
	return useSyncExternalStore(
		subscribe,
		() => navigator.onLine, // lấy value từ client như thế nào
		() => true, // lấy value này từ server như thế nào	
	)
}
```

[Đọc thêm về useSyncExternalStore](https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore)

## Fetch data

Đây có thể là một trong những cách sử dụng effect phổ biến nhất hiện tại

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
}
```

Đoạn code này sẽ rơi vào tình huống *race condition* nếu như user nhập quá nhanh (giá trị `query` thay đổi theo input của user), lúc này chúng ta sẽ cần đến `debounce`, ngoài ra chúng ta sẽ còn phải nghĩ đến chuyện *cache* data đã lấy về để tối ưu, vâng vâng mây mây nhiều thứ khác phải xử lý. Đâu phải tự nhiên mà các framework như Next.js, Gatsby, Remix, Razzie đều giới thiệu những cách fetch data của riêng chúng

Mạnh dạng đề xuất sử dụng những thư viện thứ 3 để `fetch` data thay vì dùng  `useEffect`, như [useQuery](https://react-query.tanstack.com/reference/useQuery), hoặc *bèo nhất* cũng phải dùng custom hook [useFetch](https://usehooks-ts.com/react-hook/use-fetch)

## Kết luận

Khi sử dụng `useEffect` chúng ta phải hết sức để ý xem phần nào có thể tách ra thành custom hook, phần nào nên bỏ luôn, càng ít `useEffect` code càng dễ hiểu và dễ maintain

[You Might Not Need an Effect](https://beta.reactjs.org/learn/you-might-not-need-an-effect)
