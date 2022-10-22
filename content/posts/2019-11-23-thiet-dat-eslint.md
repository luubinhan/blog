---
slug: "/2019-11-23-thiet-dat-eslint"
date: "2019-11-23"
title: "Thiết đặt ESLint cho dự án React"
desc: "Các thiết đặt và công cụ cần thiết để eslint hoạt động tốt trong dự án React"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "tool"]
---

ESLint có thể cài global, nhưng mình thấy nên cài trên từng project sẽ tiện hơn khi phải mang đi mang lại. Đây là những package cần thiết cho eslint chạy trên project React

```bash
npm install --save-dev
eslint
babel-eslint
eslint-config-airbnb
eslint-config-babel
eslint-config-prettier
eslint-plugin-import
eslint-plugin-react
```

Bên trong thư mục gốc của project, tạo một file `.eslintrc`, với nội dung ngắn gọn thế này (muốn thêm bớt như thế này thì mọi người tự tùy chỉnh theo ý thích)

```json
"extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
],
"plugins": ["prettier","jsx-a11y"],
"parser": "babel-eslint",
"env": {
    "browser": true
}
```

Mấy bộ config sẵn của **airbnb**, **prettier** và **jsx-a11y** nếu không đủ dùng, bạn có thể tự thêm mắm muối vào trong file này luôn.

Thay vì mỗi lần phải chạy lint thủ công trên từng file/thư mục

```bash
npx eslint src/App.js
```

![](https://miro.medium.com/max/1480/1*_P4YPpbVg4L-Utu7egF-vg.png)

Chúng ta có thể thêm một đoạn shortcut vào trong `package.json`

```json
"scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
}
```

Sau này chúng ta có thể chạy

```bash
// chạy kiểm tra
npm run lint

// chạy sửa lỗi
npm run lint:fix
```

Đợi nó chạy mới báo lỗi cũng được, nếu đang xài VSCode, cài package [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#overview) này vào, nó sẽ highlight những lỗi eslint ngay trên giao diện không cần phải đợi chạy mới báo

![Chưa cài ESLint](https://miro.medium.com/max/2880/1*O6Q5VDIKC4UM_sfJOlE82w.png)


![Đã cài ESlint](https://miro.medium.com/max/2880/1*n20krHQQGci7D347-4HELQ.png)

Để hỗ trợ team tối đa, bạn có thể *export* những thiết đặt của VSCode vào 1 file trong thư mục `.vscode`, khi team nhận được thư mục project đồng thời cũng có luôn các plugin và thiết đặt cần thiết

```json
// file extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "dzannotti.vscode-babel-coloring"
  ]
}
```

```json
// File settings.json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ],
  "eslintConfig": {
    "extends": ["react-app", "shared-config"],
    "rules": {
      "additional-rule": "warn"
    },
    "overrides": [
      {
        "files": ["**/*.ts?(x)"],
        "rules": {
          "additional-typescript-only-rule": "warn"
        }
      }
    ]
  }
}
```

Chúng ta cũng nên dùng Prettier để format code lại trước khi commit lên git. Cài đặt các package cần thiết cho nhu cầu này

```bash
npm install --save
husky
lint-staged
prettier
```

- `husky` sẽ giúp chúng ta tương tác với git hook
- `lint-stated` cho phép chúng ta chạy script trên các file đang nằm trong staged
- `prettier` là công cụ để format code

Tiếp theo, mở file `package.json`

```json
"husky": {
    "hooks": {
        "pre-commit": "lint-staged"
    }
}
```

Bên dưới chỗ dependencies của file package.json

```diff
"dependencies": {
    // ...
  },
+ "lint-staged": {
+   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
+     "prettier --write",
+     "git add"
+   ]
+ },
  "scripts": {
```

Hết ! 😉


