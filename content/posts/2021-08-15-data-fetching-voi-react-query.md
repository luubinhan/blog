---
slug: "/2021-08-15-data-fetching-voi-react-query"
date: "2021-08-15"
title: "Sử dụng React-Query để fetch data"
desc: "Một giải pháp để chúng ta có thể đơn giản hóa việc lưu trữ dữ liệu từ server và inject vào trong component dễ dàng"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "thu-thuat", "medium"]
---

<!-- TOC -->

- [Thực hiện fetch với `useQuery`](#thực-hiện-fetch-với-usequery)
- [Thực hiện cache](#thực-hiện-cache)

<!-- /TOC -->

Đã bao giờ anh em react chúng ta rơi vào cảnh sau: thử tới thử lui bao nhiều là thư viện để quản lý global state, thử bao nhiêu là hook `useFancyPromise`, rồi tự viết những giải pháp riêng, tất cả điều dẫn đến một kết cục: viết cả đống code để xử lý việc fetch data?

> Server state và client state cơ bản là khác nhau, vậy tại sao lại trộn chung

**Đặc điểm của Server state**

1. **cố định**, ngoài khả năng kiểm soát của client
2. **bất đồng bộ (async)**, cần fetch để lấy dữ liệu hoặc cập nhập
3. **chia sẽ**, nhiều người cùng truy xuất đến cùng một tập dữ liệu cũng như thao tác xử lý trên tập dữ liệu này

> Đến lúc dừng việc trộn server state vào trong client state

**Lợi ích mang lại khi tách việc quản lý server state bằng một công cụ riêng**

1. **cache**, phần khó nhất của lập trình
2. **Không duplicate** nhiều request
3. **Cập nhập** ngầm các dữ liệu outdate
4. **Tối ưu hiệu năng** bằng phân trang, lazy load
5. Quản lý **memory và garbage collection** tốt hơn

Xin giới thiệu với bạn người bạn mới React-query, anh này sẽ cung cấp cho chúng ta

- Một global context để lưu trữ dữ liệu lấy về từ server
- Thiết đặt caching vô cùng đơn giản

Nếu thích bạn cũng có thể tham khảo thêm [swr](https://github.com/vercel/swr) cũng khá cool

Chúng ta sẽ có các Server side APIs sau

```js
// api/product.js

// 1. Fetch tất cả products
const useFetchProducts = () => {}

// 2. Fetch một product cụ thể
const useFetchProduct = (id) => {}

// 3. Thêm một product
const useAddProduct = (product) => {}

// 4. Cập nhập một product
const useEditProduct = (product) => {}

// 5. Xóa một product
const useDeleteProduct = (id) => {}
```

## Thực hiện fetch với `useQuery`

```js
import { useQuery } from 'react-query'

const useFetchProducts = () => {
	return useQuery(
		// định danh
		// highlight-next-line
		'products',
		() => {
			fetch('/api/products')
		}
	)
}
```

Sử dụng trong component

```jsx
import { useFetchProducts } from "../api/products"

const Products = () => {
	const {
		data: products,
		isLoading
	} = useFetchProducts();

	return (
		<div>
			{
				isLoading && <div>Loading...</div>
			}
			{
				products && (
					products.map((product) => {
						<div key={product.id}>
							{product.name}
						</div>
					})
				)
			}
		</div>
	)
}
```

Việc `fetch` dữ liệu sẽ còn thêm các tính năng như *search, phân trang, filter*. Có react-query mọi thứ sẽ vô cùng đơn giản

```jsx
import { useState } from "react"
import { useFetchProducts } from "../api/products"

const Products = () => {
	// trang hiện tại
	// highlight-next-line
	const [page, setPage] = useState(1)

	// số item trên trang
	// highlight-next-line
	const [limit, setLimit] = useState(10)

	// từ khóa
	// highlight-next-line
	const [name, setName] = useState('')		

	const {
		data: products,
		isLoading
	} = useFetchProducts({
		// highlight-next-line
		page,
		// highlight-next-line
		limit,
		// highlight-next-line
		name
	});

	return (
		<div>
			{
				isLoading && <div>Loading...</div>
			}
			{
				products && (
					products.map((product) => {
						<div key={product.id}>
							{product.name}
						</div>
					})
				)
			}
		</div>
	)
}

```

Chúng ta cần cập nhập lại `useFetchProducts`

```js
import { useQuery } from 'react-query'

const useFetchProducts = ({ page, limit, name }) => {
	return useQuery(
		// highlight-next-line
		['products', { page, limit, name }],
		() => {
			// highlight-next-line
			fetch(`/api/products?page=${page}&limit=${limit}&search=${name}`)
		}
	)
}
```

## Thực hiện cache

Ví dụ chúng ta muốn đặt cache 10s, chúng ta sẽ sử dụng thiết đặt `staleTime`

```js
import { useQuery } from 'react-query'

const useFetchProducts = ({ page, limit, name }) => {
	return useQuery(
		['products', { page, limit, name }],
		() => {
			fetch(`/api/products?page=${page}&limit=${limit}&search=${name}`)
		},
		{
			// highlight-next-line
			staleTime: 10000
		}
	)
}
```

*Cực kỳ đơn giản đúng không!*

Tưởng tượng chúng ta có danh sách *product* hiển thị trên màn hình, click vào một *product* chúng ta hiển thị pop-up với các thông tin của product

Để `fetch` một product, chúng ta cũng đồng thời áp dụng cache

```js
const useFetchProduct = (id) => {
	return useQuery(
		['product', id],
		() => {
			fetch(`/api/products/${id}`)
		},
		{
			staleTime: 10000
		}
	)
}
```

Đến phần thú vị nè, *nếu các thông tin của từng product hoàn toán giống với thông tin trả về từ danh sách product?*, chúng ta có thể áp dụng cache cho từng product trong lúc fetch danh sách product

```js
import { useQuery, useQueryClient } from 'react-query'

const useFetchProducts = ({ page, limit, name }) => {
	// highlight-next-line
	const queryClient = useQueryClient();

	return useQuery(
		['products', { page, limit, name }],
		() => {
			fetch(`/api/products?page=${page}&limit=${limit}&search=${name}`)
		},
		{			
			staleTime: 10000,
			// highlight-next-line
			onSuccess: (products) => {
				products.forEach(product => {
					// highlight-next-line
					queryClient.setQueryData(
						['product', product.id],
						product
					);
				})
			}
		}
	)
}
```

Bằng cách dùng `useQueryClient().setQuery`, chúng ta force cache cho từng `product.id`, để khi `useFetchProduct` chạy nó sẽ có sẵn giá trị cache này và không cần thực hiện gọi API

Thể hiện chút tình yêu với dự án `react-query` nhé các bạn, [star ngay không nói nhiều](https://github.com/tannerlinsley/react-query)