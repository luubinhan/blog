---
slug: "/2020-08-05-gioi-thieu-yaml-cho-nguoi-moi-bat-dau"
date: "2020-08-05"
title: "Yaml cho web developer"
desc: "Dạo gần đây, nếu bạn là Front End developer chắc sẽ gặp nhiều đến file có đuôi .yml ( ví dụ như .gitlab-ci.yml). Nếu bạn chưa biết kiểu file này, thì bài này mình sẽ giới thiệu túm lược để bạn làm quen."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

File này được dùng khá nhiều cho việc thiết đặt và cấu hình. Mà nhiều nhất là dùng cho các thiết đặt CI/CD. Ngày xưa, khi chưa có Yaml, sau khi quá mệt mỏi với việc mỗi người mỗi ý trong việc viết file cấu hình, nổ ra cái ý tưởng hồi năm 2001

> Giờ sao chúng ta không tạo ra một file cấu hình giống như chỉ dẫn nấu ăn, chữ thôi, cực kỳ dễ hiểu

Yaml cũng là một dạng superset của người anh em JSON.

> Superset là một ngôn ngữ chứa tất cả feature của một ngôn ngữ, rồi mở rộng thêm một số thứ nữa

Ví dụ như TypeScript là superset của Javascript

```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": false,
    "types": ["node", "lodash", "express"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

File JSON không quá khó đọc, tuy nhiên lại vướng một vài hạn chế:

1. Không dùng biến được
2. Không dùng biến môi trường được
3. Không thể override value

YAML sẽ giúp ta làm được những điều chưa làm được ở json

```yaml
compilerOptions:
  module: system
  noImplicitAny: true
  removeComments: true
  preserveConstEnums: true
  outFile: "../../built/local/tsc.js"
  sourceMap: false
  types:
    - node
    - lodash
    - express
include:
  - src/**/*
exclude:
  - node_modules
  - "**/*.spec.ts"
```

_lưu ý đây chỉ là ví dụ, bạn không thể viết `tsconfig` bằng YAML, buồn thay_

Một số nguyên tắc-cú pháp cần nắm

**Thục đầu dòng**

Thục đầu dòng rất quan trọng, bạn chỉ được dùng dấu **khoảng trắng**, không cho phép dùng **tab**

**Viết comment**

```yaml
# I'm a comment
person: # I'm also a comment
  age: 20
```

**Dạng danh sách**

Có 2 cách biết, như đã nói là superset của json, nên chúng ta có cách thứ nhất i như json

```yaml
people: ["Anne", "John", "Max"]
```

Khuyến khích cách này hơn

```yaml
people:
  - Anne
  - John
  - Max
```

**Khai báo giá trị string**

Trong JSON bạn chỉ một cách viết giá trị dạng `String` là đưa nó vào dấu ngoặc kép `""`, Yaml thì linh động hơn

```yaml
company: Google # Single words, no quotes
full_name: John Foo Bar Doe # Full sentence, no quotes
name: "John" # Using single quotes
surname: "Christian Meyer" # Using double quotes
```

> Trong trường hợp bạn có chưa các ký tự đặc biệt, thì nên đưa vào dấu nháy kép.

**Số**

```yaml
year: 2019 # Integer
nodeVersion: 10.8 # Float
```

**Con trỏ**

Khái niệm _con trỏ_ xem như bạn đã biết nhé, mình không giải thích, cái này các bạn đi học chắc các thầy dạy kỹ lắm rồi.

Ví dụ như bạn đang viết một số config cho môi trường `production` và `staging`, tức nhiên là một config là giống nhau thôi, nên chúng ta chỉ cần _trỏ_ nó qua một chỗ

Đây là không _trỏ_ qua mà _copy/paste_ huyền thoại

```json
{
  "production": {
    "node_version": "13.0.0",
    "os": "ubuntu",
    "package_manager": "yarn",
    "run": ["yarn install", "NODE_ENV=${ENVIRONMENT} yarn build"],
    "env": {
      "ENVIRONMENT": "production"
    }
  },
  "staging": {
    "node_version": "13.0.0",
    "os": "ubuntu",
    "package_manager": "yarn",
    "run": ["yarn install", "NODE_ENV=${ENVIRONMENT} yarn build"],
    "env": {
      "ENVIRONMENT": "staging"
    }
  }
}
```

Để dùng con trỏ, chúng ta tạo trước một cái _neo_ để sau này trỏ vào cái _neo_ này

```yaml
base-config: &base # tên cái neo
  node_version: 13.0.0
  os: ubuntu
  package_manager: yarn
  run:
    - yarn install
    - NODE_ENV=${ENVIRONMENT} yarn build
```

Sau đó thực hiện việc trỏ

```yaml
base-config: &base
  node_version: 13.0.0
  os: ubuntu
  package_manager: yarn
  run:
    - yarn install
    - NODE_ENV=${ENVIRONMENT} yarn build

production:
  # dùng các thiết đặt ở neo tên là base
  <<: *base
  env:
    - ENVIRONMENT: production

staging:
  # dùng các thiết đặt ở neo tên là base
  <<: *base
  env:
    - ENVIRONMENT: staging
```

**Môi trường Shell/Bash**

Như đã nói lúc đầu, file `.yml` rất được ưu dùng đề làm config, đặc biệt là config môi trường CI/CD.

Môi trường CI/CD thường là Linux, và chúng ta cũng có thể truy cập đến các biến môi trường của Linux.

Ví dụ như Github CI, chúng ta có thể chỉ định biến môi trường global nào chúng ta muốn truy cập

```yaml
variables:
  NODE_IMAGE: node:10

stages:
  - build

test:
  image: $NODE_IMAGE
  stage: build
```

Cú pháp `$` không phải của `yaml` mà là của `shell/bash`. Những gì Github CI sẽ làm là đưa toàn bộ những biến bạn đặt trong `variables` và tạo ra biến trong `shell`

Một vài hệ thống khác cũng **inject** các giá trị khác như commit ref, branch name, build time, secret key được đặt bên ngoài file config

```yaml
variables:
  NODE_IMAGE: node:10

stages:
  - build

test:
  image: $NODE_IMAGE
  stage: build
  artifacts:
    name: $CI_COMMIT_REF_NAME
```

Ví dụ ở trên, chúng ta sử dụng biến môi trường `$CI_COMMIT_REF_NAME` của GitLab CI.

Hy vọng các bạn đã hiểu chút đỉnh về YAML và cảm thấy đọc file yaml không quá khó chịu nữa.

### Tài liệu tham khảo

[https://yaml.org/](https://yaml.org/)
[https://www.json2yaml.com/](https://www.json2yaml.com/)
[https://learnxinyminutes.com/docs/yaml/](https://learnxinyminutes.com/docs/yaml/)

[Yaml for Web Developers](https://dev.to/raulfdm/yaml-for-web-developers-559n)
