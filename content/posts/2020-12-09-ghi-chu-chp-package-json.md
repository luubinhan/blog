---
slug: "2020-12-09-ghi-chu-chp-package-json"
date: "2020-12-09"
title: "Ghi chú file package.json của node module"
desc: ""
tags: ["hoc-thuat", "javascript"]
canonical_url: false
---

Tạo file `package.json` (đồng thời khởi tạo một npm package)

```bash
npm init
// dùng các thiết đặt mặc định
npm init --yes
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--TQDD7RDS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/1050/1%2AQlNpEYhWUe_gU60G8X77mA.png)

Các property chính cần nắm trong file `package.json`

`name`: tên project

```json
"name": "my-blog-backend",
```

`version`: version hiện tại của project

```json
"version": "1.0.0",
```

`main`: đường dẫn trỏ đến file `entry point` chính của project

```json
"main": "server.js",
```

`scripts`: chứa các command shortcut

```json
"scripts": {
  "start": "npx babel-node src/server.js",
  "dev": "npx babel-node src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1",
  "lint": "eslint ./server"
},
```

`bugs`: địa chỉ để báo bug và email nhận thông báo

```json
"bugs":
{
  "url": "https://github.com/owner/project/issues",
  "email": "project@hostname.com"
},
```

`private`: true nếu bạn không muốn publish, như đang làm project công ty thì không ai để `false`

```json
"private": true
```

`keywords`: hỗ trợ các công cụ search tìm theo từ khóa

```json
"keywords": [
    "node",
    "vue",
 ],
```

`dependencies`: những thư viện nào đang phụ thuộc

```json
"dependencies": {
  "express": "^4.17.1"
},
```

`devDependencies`: external dependencies trong lúc dev, không cần nếu bạn chỉ lấy production build.

```json
"devDependencies": {
  "@babel/cli": "^7.12.8",
  "@babel/core": "^7.12.9",
  "@babel/node": "^7.12.6",
  "@babel/preset-env": "^7.12.7"
}
```

`repository`: code bạn đặt source ở đâu, để người khác có thể đóng góp

```json
"repository": {
  "type" : "git",
  "url" : "https://github.com/npm/cli.git"
}
```

`license`: bản quyền, project này open source hay tài sản của công ty

```json
"license": "ISC" // hay proprietary, MIT
```