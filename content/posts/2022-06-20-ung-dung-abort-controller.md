---
slug: "/2022-06-20-ung-dung-abort-controller"
date: "2022-06-20"
title: "Một vài ứng dụng của AbortController"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "thu-thuat", "medium"]
---

<!-- TOC -->

- [Xóa Event Handler](#xóa-event-handler)
- [Async trong React hook](#async-trong-react-hook)

<!-- /TOC -->

Món *đồ chơi* mới [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) (ý là thằng bạn trình duyệt cũ không chịu chơi chung) cho phép chúng ta hủy một tác vụ đang chạy, tác dụ hay gặp nhất là việc fetching data

```js
const controller = new AbortController()

await fetch('vuilaptrinh.com', { signal: controller.signal })

// dừng lại anh ơi
controller.abort()
```

Trước khi có `AbortController` đố bạn có cách nào để ngưng việc `fetch` một khi đã báo nó *chạy đi em*

> `controller.signal`  ở trên mang giá trị `state`, mọi thứ được xử lý bên trong AbortController, chúng ta chỉ khai báo với anh `fetch` có thay đổi state thì truyền vào đây giúp em nhé

Chúng ta sẽ tham khảo một vài ứng dụng của AbortController nào

## Xóa Event Handler

Nếu chúng ta muốn hủy đăng ký một trên `event` để tránh ngốn RAM của user

```js
window.addEventListener('resize', () => { /* do something */});

// hủy đăng ký
window.removeEventListener('resize', () => { /* do something */});
```

Nhưng nếu nhìn kỹ, chúng ta sẽ ngộ ra cái `() => doSomething()` truyền cho `addEventListener` và `removeEventListener` hoàn toàn khác nhau, nghĩa là  việc chúng ta làm là công cốc rồi. Đúng ra chúng ta phải viết

```js
window.addEventListener('resize', doSomething);
window.removeEventListener('resize', doSomething);
```

Nhưng nếu lỡ chúng ta đã *khoái* arrow function và hông *khoái* cái `removeEventListener`. Chúng ta có thể dùng `AbortController`

```js
const controller = new AbortController();
const { signal } = controller;

window.addEventListener('resize', () => { /* do something */}, { signal })

// unregister nè
controller.abort()
```
> Lưu ý Chrome cũ không chạy và Safari dưới 15 không chạy

## Async trong React hook

Xung quanh việc *làm cái gì* bên trong *useEffect* có khá nhiều quan điểm, số lượng người dùng `useEffect` để *fetching* data cũng không phải ít. Nói chung cũng ok thôi, và sử dụng `async` bên trong `useEffect` đúng là một *canh bạc* hên xui mai rũi, xui xui chưa fetch xong user *lạng* qua trang khác thì biết chuyện gì xảy ra rồi, nó vẫn fetching cho xong dữ liệu

```js
function VuiComponent() {
	useEffect(async () => {
		const res = await fetch('url')
	}, [])
	return (<div />) 
}
```

Để đảm bảm khi component chúng ta bị remove, nó phải hủy luôn việc fetching

```js
function VuiComponent() {
	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		(async () => {
			const res = await fetch('url')
		})();

		return () => controller.abort();
	}, [])
	
	return (<div />) 
}
```

Một điểm rất đáng để tâm trong React là sau khi `await` cú call đầu tiên, nếu chúng ta lấy `state` bên trong hàm `async` không hẳn nó là giá trị mới nhất, rất có thể nó lấy giá trị trước đó

```js
function KhongVuiComponent() {
	const [value, setValue] = useState(0);

	useEffect(async () => {
    await new Promise((r) => setTimeout(r, 1000));

    console.log(value)
    // Ở đây không chắc value lúc nào cũng = giá trị sau khi click button nha
  }, []);

	return <button onClick={() => setValue((v) => v + 1)}>Increment</button>
}
```

```js
fetchButton.onclick = async () => {
	const controller = new AbortController();
	
}
```

