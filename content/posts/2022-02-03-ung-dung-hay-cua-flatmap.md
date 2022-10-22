---
slug: "2022-02-03-ung-dung-hay-cua-flatmap"
date: "2022-02-03"
title: "Ứng dụng hay của flatMap"
desc: "Thay thế hàm filter và map bằng flatMap"
tags: ["javascript", "beginner", "thu-thuat"]
---

Sử dụng `flatMap` có thể giúp code ngắn hơn, ví dụ trong tình huống bên dưới

```js
// filter các giá trị âm
// nhân đôi các giá trị dương còn lại
[-3,-1,1,3,5]
	.filter(num => num >= 0)
	.map(num => num * 2)
// -> [2, 6, 10]
```

Cách này không có gì sai, nhưng nếu muốn viết bằng một phương pháp khác thì sao?

```js
[-3,-1,1,3,5].flatMap(num => {
	if (num >= 0) {
		return [num * 2]
	}

	return []
})

// -> [2, 6, 10]
````

Nếu muốn rút ngắn hơn nữa

```js
[-3, -1, 1, 3, 5]
  .flatMap((num) => (num >= 0 ? [num * 2] : []));
  
// -> [2, 6, 10]
```

Tuy nhiên, nếu xét về mặt viết-sao-cho-dễ-đọc thì có vẻ dùng `filter` và `map` sẽ tốt hơn, `flatMap` được cái viết ngắn hơn.

Túm lại, ưng mắt cách nào hơn thì bạn viết cách đó.

- [Filter and map Array values with a flatMap one-liner](https://www.stefanjudis.com/snippets/filter-and-map-array-values-with-a-flatmap-one-liner/)