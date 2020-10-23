---
slug: '2020-10-23-huon-dan-mock-api-bang-mirage-js'
date: '2020-10-23'
title: 'Mock API bằng Mirage JS'
desc: 'Hướng dẫn bạn giả lập API khi chưa các bạn BE đang bận làm việc lớn'
tags: ['thuat-thuat', 'javascript']
canonical_url: false
---

## Tại sao bạn cần giả lập (mock) API

FE sẽ **ko phải đợi** đến khi BE làm xong API mới có thể bắt đầu integrate, nếu bạn có thể mock những API sẽ được trả về dựa trên *contract* đã thống nhất, thì *gần như* là không còn quá nhiều việc phải làm khi API làm xong.

## Làm như thế nào

Để mock API, kể thể dùng nhiều cách như [JSON Server](https://www.npmjs.com/package/json-server), [mountebank](http://www.mbtest.org/), hôm nay mình hướng dẫn dùng [Mirage](https://miragejs.com/) mình mới biết, kết hợp với Vue nhé, React cũng tương tự thôi.

1. Cài đặt vào devDependencies

```bash
npm i miragejs -D
```

2. Mình chọn tổ chức thư mục theo kiểu này, bạn có thể để nó ở chỗ khác thì tùy ý

```
/
├── public
├── src
│   ├── api
│   │   └── mock
│   │       ├── fixtures
│   │       │   └── get-tasks.js
│   │       └── index.js
│   └── main.js
├── package.json
└── package-lock.json
```

3. Tạo mock server 

```js
// api/mock/index.js
import { Server } from 'miragejs';

export default function ({ environment = 'development' } = {}) {
  return new Server({
    environment,
    routes() {
      // chút thêm routes ở đây
    },
  });
}
```

4. Mở file dùng để bootstrap app của chúng ta, đang dùng Vue nó sẽ là `src/main.js` (`src/index.js` nếu bạn dùng với React)

```js
import createServer from './api/mock';

// chỉ tạo fake server trong lúc chạy dev mode
if (process.env.NODE_ENV === 'development') {
    createServer();
}
```

Ví dụ bạn gọi API trong code như thế này

```js
await axios.get('/api/tasks');
```

Chúng ta sẽ cập nhập lại file `api/mock/index.js`, bổ sung route `/api/tasks` cho mock server

```js
// api/mock/index.js

export default function ({ environment = 'development' } = {}) {
    // ...
    routes() {
      this.get('/api/tasks', () => ({
        tasks: [
          { id: 1, text: "Feed the cat" },
          { id: 2, text: "Wash the dishes" },
          //...
        ],
      }))
    },
  });
}
```

Tương tự để mock các HTTP method khác

```js
this.get('/tasks', (schema, request) => { ... });
this.post('/tasks', (schema, request) => { ... });
this.patch('/tasks/:id', (schema, request) => { ... });
this.put('/tasks/:id', (schema, request) => { ... });
this.del('/tasks/:id', (schema, request) => { ... });
this.options('/tasks', (schema, request) => { ... });
```

Nếu mọi thứ *êm đẹp* bạn sẽ được thông báo trên cửa sổ console

![Screenshot of a Mirage response in the console showing data for two task objects with IDs 1 and 2.](https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/07/image-32.png?resize=1208%2C296&ssl=1)

## Cần nội thêm nội dung động?

Bạn có thể dùng [fakerjs](https://github.com/marak/Faker.js/) để chèn thêm dữ liệu một cách ngẫu nhiên.

Để có dữ liệu **init** cho fake server, chúng ta sẽ sử dụng `seeds()`

```js
export default function ({ environment = 'development' } = {}) {
    seeds(server) {
        server.db.loadData({
            tasks: [
                { id: 1, text: "Feed the cat" },
                { id: 2, text: "Wash the dishes" },
            ],
        })
    },
    routes() {
        this.get('/api/tasks', (schema) => {
            return schema.db.tasks;
        }),
        this.post('/api/tasks', (schema, request) => {
          // nhận data được gửi từ post
          const task = JSON.parse(request.requestBody).data;
          return schema.db.tasks.insert(task);
        })
        ...
    },
  });
}
```

## Cần route động?

Route động là gì, ví dụ như bạn dùng phương thức delete hay update bằng một route như thế này

```
DELETE: /api/tasks/8lVzv5lv2n6Mu912x19UdKDC08
PUT: /api/tasks/8lVzv5lv2n6Mu912x19UdKDC08
```

```js
// api/mock/index.js
...
this.delete('/api/tasks/:id', (schema, request) => {
  	// id từ url
    const id = request.params.id;
    return schema.db.tasks.remove(id);
})
...
```

Nếu bạn để ý, tất cả đều bắt đầu bằng `api`, `namespace` sinh ra là để phục vụ đối tượng lười biếng như chúng ta

```js
routes() {
    // bọn dưới sẽ bắt đầu bằng /api hết
    this.namespace = '/api';

    this.get('/tasks', () => { ... })
    this.delete('/tasks/:id', () => { ... })
    this.post('/tasks', () => { ... })
}
```

## Chỉ giả lập những route chỉ định?

Nếu như bạn đã có một số API, một số BE đang implement, tất nhiên chúng ta chỉ mock những API chưa làm, còn cái nào làm rồi thì cứ xài cái thật luôn

```js
routes() {
    // chỉ giả lập GET /task
    this.get('/task', () => { ... });
    
    // còn lại dùng hàng thật
    this.passthrough();
}
```

Nhưng đa phần API thật sẽ nằm đâu đó chứ không phải `localhost:3000`, thêm đoạn sau

```js
routes() {
    // api thực nằm ở đây
    this.urlPrefix = 'https://devenv.ourapp.example';
    
    // chỉ giả lập GET /task
    this.get('/task', () => { ... });
    
    // còn lại dùng hàng thật
    this.passthrough();
}
```

Lúc này tất cả API đều sẽ gọi lên `https://devenv.ourapp.example`, duy chỉ gặp thằng ``https://devenv.ourapp.example/task`, mirage sẽ **intercept** và đưa hàng giả vào.

## Kết

Sử dụng cũng được vài cái thư viện làm mock API, MirageJS là thằng mình thấy ưng nhất, không quá phức tạp, giải quyết được những vấn đề rất căn cơ của FE.

Mirage JS còn khá nhiều chiêu trò thú vị chờ bạn khám phá trên [tài liệu chính thức của nó](https://miragejs.com/docs/getting-started/introduction/), nếu thấy hay đừng quên nhất **like** và contribute cho dự án trên [Github](https://github.com/miragejs/miragejs)

**Happy coding** 🎉🙌