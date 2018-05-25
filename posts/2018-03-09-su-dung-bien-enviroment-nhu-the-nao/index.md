---
path: "/2018-03-09-su-dung-bien-enviroment-nhu-the-nao"
date: "2018-03-09T13:35:13.234Z"
title: "Sử dụng biến Node Environment"
desc: "Biến environment là một phần cơ bản cần biết khi làm việc với Node"
tags: ["javascript", "webpack"]
---

Khi nhắc đến thuật ngữ "Environment Variable" là nghĩ ngay tới việc thiết đặt biến này cho thư mục Java Home trong windows

![](https://cdn-images-1.medium.com/max/800/1*NWeRct1eJ16rAmEaabKV7A.png)

Thật ra không liên quan gì đâu nhá

Trong Node, biến Environment là một biến global, thường được sử dụng để chỉ định `process` nào muốn chạy. Ví dụ, khi chạy một ứng dụng web, ta sẽ có các biến **Environmen** sau:

- Port
- Database connection string

Nếu đã từng làm việc với .Net, chắc sẽ biết tới file `web.config`. Biến Environment làm việc i như các thiết đặt trong `web.config`

Ảnh vui nha

![](https://cdn-images-1.medium.com/max/800/1*v9l07sac43rmP-FAXxmwkw.png)

# Set giá trị bằng terminal

Thí dụ ta set giá trị của `PORT` 

```
PORT=6060 NODE_ENV=production webpack
```

Giờ lúc code, ta gọi cái biến này ra bằng cách

```js
var port = process.env.PORT
```

Không phải lúc nào set giá trị của biến `env` bằng terminal, ví dụ connection string thì không ai đưa vào bằng terminal

```
PORT=65534 DB_CONN="mongodb://react-cosmos-db:swQOhAsVjfHx3Q9VXh29T9U8xQNVGQ78lEQaL6yMNq3rOSA1WhUXHTOcmDf38Q8rg14NHtQLcUuMA==@react-cosmos-db.documents.azure.com:19373/?ssl=true&replicaSet=globaldb" SECRET_KEY=b6264fca-8adf-457f-a94f-5a4b0d1ca2b9
```

# Set giá trị bằng file `.env`

Tạo ra một cái file `.env` trong cùng thư mục project, khai báo mớ biến environment ở đây

```
PORT=65534

DB_CONN="mongodb://react-cosmos-db:swQOhAsVjfHx3Q9VXh29T9U8xQNVGQ78lEQaL6yMNq3rOSA1WhUXHTOcmDf38Q8rg14NHtQLcUuMA==@react-cosmos-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"

SECRET_KEY="b6264fca-8adf-457f-a94f-5a4b0d1ca2b9"
```

Để đọc được giá trị này, có rất nhiều cách, mà cách nào thì cũng phải cái thêm package!, dùng package dễ nhất là `dotenv`

```
npm install dotenv --save
```

Việc sử dụng hết sức đơn giản như sau

```js
require('dotenv').config();

var MongoClient = require('môngdb').MongoClient;

MongoClient.connect(process.env.DB_CONN, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
```

> Lưu ý đừng check in file `.env` này lên github, nếu checkin lên Github sẽ báo ngay tới email là việc làm này hết sức nguy hại tới sự 'riêng tư'!

# Extension của VSCode

Nếu đang dùng VSCode, một số extension này sẽ hưu ích

DotENV extension: mang màu sắc đến với cuộc sống

![](https://cdn-images-1.medium.com/max/800/1*K5PBHyeMSrND58ycVyw3YA.png)