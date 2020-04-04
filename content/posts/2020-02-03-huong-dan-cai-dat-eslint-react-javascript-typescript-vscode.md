---
slug: "/2020-02-03-huong-dan-cai-dat-eslint-react-javascript-typescript-vscode"
date: "2020-02-03"
title: "Chỉ dẫn thiết đặt ESLint trong nhiều tình huống sử dụng Javascript, Typescript, React"
desc: "Chúng ta bắt đầu với Javascript trước, sau đó sẽ là TypeScript, và React. Mục tiêu là làm đúng, tránh trường hợp cài package không cần thiết hoặc copy/paste các config tới khi nó chạy được thì thôi."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "javascript", "typescript", "react"]
---

<!-- TOC -->

- [Tại sao dùng ESLint](#tại-sao-dùng-eslint)
- [Cài đặt ESLint](#cài-đặt-eslint)
- [File cài đặt của ESLint](#file-cài-đặt-của-eslint)
- [Javascript thuần](#javascript-thuần)
- [Thiết đặt TypeScript](#thiết-đặt-typescript)
- [Thiết đặt cho React](#thiết-đặt-cho-react)
  - [React Javascript](#react-javascript)
  - [React TypeScript](#react-typescript)
- [Cài đặt cho VSCode](#cài-đặt-cho-vscode)

<!-- /TOC -->

Nếu chưa rành, bạn cần đọc từ đầu tới cuối, nếu đã thành thạo, chỉ việc nhảy tới phần cuối rồi copy config về xài.

Hướng dẫn này sử dụng bộ config của Airbnb, vì nó quá nổi tiếng và được sử dụng gần như là chuẩn. Tất nhiên, bạn có quyền thay đổi sao cho hợp _gu_

Nếu chưa bao giờ _nghe_ đến hướng dẫn viết code sao cho chuẩn của Airbnb, tham khảo các bài viết sau

- [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/blob/master/README.md)
- [Airbnb React style guide](https://github.com/airbnb/javascript/tree/master/react)
- [Airbnb CSS in JavaScript style guide](https://github.com/airbnb/javascript/tree/master/css-in-javascript)
- [Airbnb Sass style guide](https://github.com/airbnb/css)

## Tại sao dùng ESLint

Hiện tại không có bất cứ một đối thủ nào xứng tầm với ESLint, nó là dự án đã và đang được bảo trì bởi cộng động rất rộng lớn. Hầu hết các chương trình viết code đều hỗ trợ thông qua plugin, chúng ta sẽ không gặp khó khăn trong việc sử dụng nó với VSCode, Vim, Emac, WebStorm, Sublime, Atom,...

Túm lại, ESLint là **nền tảng** xịn sò nhất để bạn dựa trên đó đưa ra thiết đặt chung.

## Cài đặt ESLint

Giống như bất kỳ package nào khác, ESLint có thể được cài đặt ở 2 mức

- _global_, cài luôn vào máy `npm -g`
- đi theo từng project

Việc cài đặt ESLint ở mức _global_ khá là hợp lý vì chúng ta muốn dùng nó ở mọi project. Tuy nhiên cũng hợp lý nếu cài riêng trên từng project, nếu bạn đang cần

- Các phiên bản ESLint khác nhau trên từng dự án
- Không ẩn việc phụ thuộc vào ESLint
- Đồng nghiệp và các công cụ tự động ( như mấy thằng CI) sẽ cài ESlint có thể cài đặt nó như những package khác. Không cần thêm bất kỳ cài đặt và tài liệu nào khác.

Cài đặt ESLint trong thư mục project

```bash
npm i eslint --save-dev
```

Chạy ESLint trong project

```bash
npx eslint
```

Để tạo một _shortcut_ cho câu lệnh chạy eslint. Bên trong file `package.json` thêm dòng sau

```json
"scripts": {
    "lint": "eslint ."
}
```

Tham số `.` cho phép chạy ESLint bên trong thư mục hiện tại, chúng ta chạy lệnh thông qua shortcut

```bash
npm run lint
```

## File cài đặt của ESLint

Có thể đặt file cài đặt ESLint ở [nhiều vị trí](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy). Nếu không có nhu cầu quá đặt biệt, 1 file duy nhất ở thư mục ngoài cùng ( `root` ) là đủ.

ESLint cho phép sử dụng nhiều kiểu file

- Javascript
- JSON
- YAML

Kiểu YAML xài là _vui_ nhất. Tạo file tên `.eslintrc.yaml`

```bash
touch .eslintrc.yaml
```

> Nếu muốn thêm _logic_ bằng code, bạn cần dùng kiểu javascript

Điều cần quan tâm trước hết là thông báo cho ESLint chúng ta đang viết ngôn ngữ gì, phiên bản nào, môi trường mà code sẽ chạy. Nếu không có các thông tin, ESLint sẽ không chạy được.

```bash
parserOptions:
  ecmaVersion: 6
env:
  node: true
```

## Javascript thuần

Với project là javascript thuần, toàn bộ file là `.js`, có thể tự định nghĩa từ đầu hết, nhưng như vậy khá mất thời gian, khó bảo trì, chưa chắc chuẩn vì nó phụ thuộc vào sự hiểu biết của bạn về javascript

Rất nhiều các công ty lớn như [Google](https://github.com/google/eslint-config-google), [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), [Facebook](https://github.com/facebook/fbjs/tree/master/packages/eslint-config-fbjs-opensource) bỏ ra cả tỉ tỉ thời gian để bảo trì và cập nhập mấy cài đặt này

Sử dụng cài đặt vạn người yêu thích, Airbnb

```bash
npx install-peerdeps --dev eslint-config-airbnb-base
```

Các bài viết trên mạng sẽ kêu bạn cài `eslint-config-airbnb`, nó có bao gồm luôn phần cài đặt cho React, React Hooks, ... . Không cần thiết trong trường hợp project chỉ là javascript thông thường.

Để ý chúng ta **KHÔNG** dùng `npm` để cài đặt, mà dùng `npx install-peerdeps`. Nó sẽ cài luôn mấy package nào mà `eslint-config-airbnb-base` phụ thuộc. Trường hợp sử dụng ESLint chúng ta sẽ gặp hoài, vì hầu như nó đều phụ thuộc một vài package khác.

Cài xong, khai báo sẽ kế thừa bộ cài đặt của Airbnb

```yaml
extends:
  - airbnb-base
```

Những thiết đặt của airbnb có thể nói là rất phổ biến và được tin dùng bởi nhiều dự án lớn nhỏ khác nhau. Chúng ta có thể yên tâm sử dụng nó mà không cần thay đổi gì nhiều.

Tổng kết

```json
"devDependencies": {
  "eslint": "^6.1.0",
  "eslint-config-airbnb-base": "^14.0.0",
  "eslint-plugin-import": "^2.20.0" (peer dependency)
}
```

```yaml
parserOptions:
  ecmaVersion: 6

env:
  node: true

extends:
  - eslint:recommended
  - airbnb-base
```

## Thiết đặt TypeScript

Vấn đề chính của TypeScript là ESLint không thể tự động mà `parse` được, chúng ta phải thêm một parser [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser).

Cài đặt

```bash
npm install @typescript-eslint/parser --save-dev
```

> Parse làm nhiệm vụ đọc cài file input và tạo ra một _phiên bản_ mà ESLint hiểu được.

KHai báo dùng parser này

```yaml
parser: "@typescript-eslint/parser"
```

Đồng thời cập nhập luôn `package.json` và báo với ESLint đừng kiểm tra file `.js` mà kiểm tra file `.ts`

```json
"scripts": {
  "lint": "eslint . --ext .ts"
}
```

Tương tự như javascript, chúng ta cài đặt bộ thiết đặt sẵn của Airbnb

```bash
npx install-peerdeps --dev eslint-config-airbnb-typescript
npm i eslint-plugin-import --save-dev
```

`eslint-plugin-import` phải được cài đặt riêng, thủ công, không rõ lý do tại sao luôn.

Cập nhập lại file config ESLint

```yaml
extends:
  - airbnb-typescript/base
  - plugin:@typescript-eslint/recommended
```

Bạn có thể thắc mắc, tại sao chưa cài `@typescript-eslint` mà có thể sử dụng, thật ra lúc cài `eslint-config-airbnb-typescript` chúng ta đã cài luôn nó bằng `npx install-peerdeps`

Có thể rule khác nữa có thể tham khảo [trực tiếp từ tài liệu trên github](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

Cuối cùng, bạn sẽ thấy có rất nhiều bài viết trên mạng, chỉ bạn thiết đặt

```yaml
plugins:
  - "@typescript-eslint"
```

Nếu không sử dụng các thiết ESLint được đề nghị, cái này không cần thiết. Lý do là Airbnb đã bật luôn các rule như vậy.

Tổng kết

**package.json**

```json
"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^2.17.0", (peer dependency)
  "@typescript-eslint/parser": "^2.17.0",
  "eslint": "^6.8.0",
  "eslint-config-airbnb-typescript": "^6.3.1",
  "eslint-plugin-import": "^2.20.0"
}
```

**.eslintrc.yaml**

```yaml
parserOptions:
  ecmaVersion: 6

env:
  node: true

extends:
  - airbnb-typescript/base
  - plugin:@typescript-eslint/recommended
```

## Thiết đặt cho React

Thêm các thiết đặt ESLint cho React vô cùng đơn giản, mọi thứ đã có Airbnb lo.

Một trong những sai lầm phổ biến là cho rằng viết như bên dưới sẽ bật hỗ trợ React

**.eslintrc.yaml**

```yaml
parserOptions:
  ecmaFeatures:
    jsx: true
```

React sử dụng JSX, nhưng theo cách mà ESLint không thể **hiểu nổi**. Để React và ESLint _nói chuyện_ được với nhau, chúng ta phải sử dụng `eslint-plugin-react`

### React Javascript

Cài đặt package

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

**.eslintrc.yaml**

```yaml
extends:
  - airbnb
env:
  browser: true
```

**package.json**

```json
"scripts": {
  "lint": "eslint . --ext .js,.jsx"
}
```

Nếu có sử dụng React Hook, bạn nên thêm phần cài đặt sau (có bỏ qua việc kiểm tra accessibility)

**.eslintrc.yaml**

```yaml
extends:
  - airbnb-base
  - airbnb/rules/react
  - airbnb/hooks
```

Tổng kết

**package.json**

```json
"devDependencies": {
  "eslint": "^6.1.0",
  "eslint-config-airbnb": "^18.0.1",
  "eslint-plugin-import": "^2.20.0", (peer dependency)
  "eslint-plugin-jsx-a11y": "^6.2.3", (peer dependency)
  "eslint-plugin-react": "^7.18.0", (peer dependency)
  "eslint-plugin-react-hooks": "^1.7.0" (peer dependency)
}
```

**.eslintrc.yaml**

```yaml
parserOptions:
  ecmaVersion: 6

env:
  browser: true

extends:
  - airbnb
  - airbnb/hooks

rules:
  react/react-in-jsx-scope: off
```

[Rảnh ngồi xem toàn bộ thiết đặt](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)

### React TypeScript

Nếu dùng TypeScript, chúng ta không thể cài theo kiểu `npx install-peerdeps`, mà phải cài độc lập

```bash
npm install eslint-config-airbnb-typescript \
            eslint-plugin-import \
            eslint-plugin-jsx-a11y \
            eslint-plugin-react \
            eslint-plugin-react-hooks \
            @typescript-eslint/eslint-plugin \
            --save-dev
```

**.eslintrc.yaml**

```yaml
parserOptions:
  ecmaVersion: 6

env:
  browser: true

extends:
  - airbnb-typescript
  - airbnb/hooks
  - plugin:@typescript-eslint/recommended

rules:
  react/react-in-jsx-scope: off
```

**package.json**

```json
"devDependencies": {
  "eslint": "^6.8.0",
  "@typescript-eslint/eslint-plugin": "^2.17.0",
  "eslint-config-airbnb-typescript": "^6.3.1",
  "eslint-plugin-import": "^2.20.0",
  "eslint-plugin-jsx-a11y": "^6.2.3",
  "eslint-plugin-react": "^7.18.0",
  "eslint-plugin-react-hooks": "^2.3.0"
},
"scripts": {
  "lint": "eslint . --ext .ts,.tsx"
}
```

## Cài đặt cho VSCode

[VSCode đã có plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) khá thần thánh để hỗ trợ ESLint. Các thiết đặt yêu thích của mình

Tự động chạy lint khi save

```json
"eslint.run": "onSave"
```

VSCode sẽ kiểm tra trên JS, JSX, TS, TSX

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
]
```

Chọn kiểu nháy đơn

```json
"javascript.preferences.quoteStyle": "single",
"typescript.preferences.quoteStyle": "single",
```

Tự động cập nhập vị trí file

```json
"javascript.updateImportsOnFileMove.enabled": "always",
"typescript.updateImportsOnFileMove.enabled": "always",
```

[ESLint configuration and best practices](https://blog.geographer.fr/eslint-guide)
