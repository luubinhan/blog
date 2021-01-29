---
slug: "2021-01-29-promise-memoization"
date: "2021-01-29"
title: "Promise Memoization"
desc: "Nếu bạn muốn tìm hiểu về caching một Promise"
tags: ["javascript", "hard"]
canonical_url: false
---


Chúng ta sẽ hiện thực caching với promise bằng cách dùng Promise Memoization

Ví dụ gọi một API để lấy thông tin của một `userId`

```js
const getUserById = async (userId: string): Promise<User> => {
  const user = await request.get(`https://users-service/${userId}`);
  return user;
};
```

Nếu `users-service` hơi chậm, việc lưu lại giá trị trước đó đã get được là một ý tưởng thường thấy

```js
const usersCache = new Map<string, User>();

const getUserById = async (userId: string): Promise<User> => {
  if (!usersCache.has(userId)) {
    const user = await request.get(`https://users-service/${userId}`);
    usersCache.set(userId, user);
  }

  return usersCache.get(userId);
};
```

Chúng ta lưu giá trị đó xuống **in-memory** (bộ nhớ RAM ấy), cách này cũng ok nhưng khá amater.

Nếu chúng ta không cache result trả về từ `await` mà cache luôn cái `Promise`?

```js
const userPromisesCache = new Map<string, Promise<User>>();

const getUserById = (userId: string): Promise<User> => {
  if (!userPromisesCache.has(userId)) {
    const userPromise = request.get(`https://users-service/v1/${userId}`);
    userPromisesCache.set(userId, userPromise);
  }

  return userPromisesCache.get(userId)!;
};
```

Nó cũng na ná như ở trên nhưng chúng ta không còn `await` vào câu request, chúng ta cũng không cần dùng async function. Nếu bạn cảm thấy hơi hại não chổ này, thì nên làm thử cái [demo nhỏ nhỏ này](https://www.jonmellman.com/posts/singleton-promises#followup-experiment)

Cách làm này có một cái tên khá ghê là **Singleton Promise** - chỉ dùng một promise duy nhất. Bởi vì chúng ta sẽ dùng cùng một Promise với cùng một `userId` nên khi có một race condition như cách viết bên dưới

```js
await Promise.all([
    getUserById('user1'),
  	getUserById('user1')
])
```

chúng ta không gặp bất cứ vấn đề gì.

Đó là khi bạn có tinh thần **em yêu khoa học**, còn đơn giản nhất, đỡ tốn công nhất, bạn có thể dùng những `lodash.memoize`

```js
import _ from 'lodash';

const getUserById = _.memoize(async (userId: string): Promise<User> => {
  const user = await request.get(`https://users-service/${userId}`);
  return user;
});
```



[Advanced Promise Patterns: Promise Memoization](https://www.jonmellman.com/posts/promise-memoization)