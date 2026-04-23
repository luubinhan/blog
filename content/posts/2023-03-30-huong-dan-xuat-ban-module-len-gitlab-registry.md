---
slug: "2023-03-30-huong-dan-xuat-ban-module-len-gitlab-registry"
date: "2023-03-30"
title: "Xuất bản npm module bằng Lerna với Gitlab CI/CD"
desc: ""
tags: ["gitlab", "beginner", "dev-ops"]
---

Trong bài viết này chúng ta sẽ thực hiện tự động hóa quá trình xuất bản npm module lên [gitlab registry](https://docs.gitlab.com/ee/user/packages/npm_registry/) bằng lerna sử dụng Gitlab CI/CD, lưu ý chúng ta không dùng [npmjs registry](https://www.npmjs.com/), nó cũng ko có quá nhiều khác biệt, chỉ cần một vài thay đổi nhỏ để xuất bản lên *npmjs registry*. Các công cụ chúng ta cần đến

- **lerna** để quản lý và xuất bản version cho nhiều module cùng lúc
- **Gitlab CI/CD**: source code sẽ lưu trên gitlab, dùng Gitlab CI/CD runner để đẩy module lên Gitlab NPM Registry (nơi chứa module npm của gitlab)

Các bạn cần có căn bản về 2 công cụ này để có tể hiểu hết được bài viết

Phương pháp đặt tên đánh version của chúng ta sẽ như sau
- **main** là nhánh chính, chứa version chính thức chúng ta sẽ xuất bản
- **feature branch** sẽ cho ra các version *alpha* (hay còn gọi với tên khác là **canary**) cho phép chúng ta test nhanh phiên bản mới trước khi xuất bản chính thức

Dùng lerna, chúng ta xuất bản version canary bằng

```bash
lerna publish --canary
# => 1.0.1-alpha.0+${SHA}
```

```json
// package.json
"publish:canary": "lerna publish --canary --no-git-tag-version --no-push --yes"
```

Khi đã merge vào nhánh `main`, chúng ta sẽ chạy `lerna version` với những tham số cần thiết để `push` thêm **tag** vào package cũng như cập nhập, *commit*, *push* version mới vào trong **package.json**. Để pipeline có quyền push những thay đổi vào trong repository, chúng ta có những thiết đặt rất quan trọng sẽ được đề cập trong phần Gitlab CI/CD bên dưới.

```js
// package.json
"version:stable": "lerna version --yes"
```

## Gitlab CI/CD

Trọng tâm của bài nay này chúng ta sẽ tập trung vào việc xuất bản một module tự động bằng CI/CD của Gitlab. Chúng ta sẽ đụng đến token, file pipeline `.gitlab-ci.yml`, cần quyền **Maintainer** trên repo để có thể vào menu **Settings**

### Token

Chúng ta sẽ cần 2 loại TOKEN

- **CI_JOB_TOKEN** đây là token predefined của CI/CD, nó sẽ có quyền để xuất bản lên gitlab registry, nếu như cần xuất bản lên npm registry chúng ta sẽ cần *npm token* và lưu nó bào trong biến môi trường để sử dụng trong CI.
- Token cho việc push và thêm tag trên repo, chúng ta sẽ đặt tên nó là `GL_TOKEN`, tạo một project token và cấp quyền `api`, `read_repository`, `write_repository` trên nhánh main

### `.gitlab-ci.yml`

Đây là một file pipeline dùng để tham khảo, các bạn có thể tùy biến thêm tùy theo nhu cầu,.

Khai báo một step `.prepare` sẽ dùng làm extend cho các *job*, trong trường hợp cần phải sử dụng lại các bước này nhiều lần, đây là cách hiệu quả để re-use logic

```yml
.prepare
	before_script:
		- git config user.email $GITLAB_USER_EMAIL
		- git config user.name $GITLAB_USER_NAME
		- git remote set-url origin "https://gitlab-ci-token:$GL_TOKEN@$CI_SERVER_HOST/$CI_PROJECT_PATH.git"
		- echo "//${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=$CI_JOB_TOKEN" > .npmrc
		- git checkout $CI_COMMIT_BRANCH
```

Chúng ta cần phải đảm bảo các bước này được chạy trước *script* chính, nên nó được đặt ở `before_script`. Vì Lerna có đụng chạm đến Git repository trong quá trình nó đổi version và xuất bản lên registry, chúng ta phải thêm các bước thiệt đặt email, name khi chạy git

**Đây là đoạn cực kỳ quan trọng**, mình muốn tách riêng và nhắc lại lần nữa, vì nếu không có $GL_TOKEN đã tạo ở trước, chúng ta sẽ fail và bị lỗi 403, chúng ta cũng không thể dùng CI_JOB_TOKEN ở đây vì nó chỉ có quyền xuất bản mà không có quyền can thiệp vào git repository

```yml
git remote set-url origin "https://gitlab-ci-token:$GL_TOKEN@$CI_SERVER_HOST/$CI_PROJECT_PATH.git"
```

Sao đó chúng ta sẽ tạo ra phải `.npmrc` để khai báo registry chúng ta muốn xuất bản, ở đây  vì chúng ta chỉ muốn xuất bản nó lên gitlab NPM registry. Trong trường hợp cần xuất bản lên npmjs registry, chúng ta thay đổi nó thành

```yml
// Nhớ tạo NPM_TOKEN và lưu thành biến môi trường
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
```

Mặt định Gitlab CI/CD sẽ checkout nhánh đang chạy job theo state `DETACHED HEAD`, chúng ta phải chỉ định cụ thể `git checkout $CI_COMMIT_BRANCH` để Lerna không *chửi* chúng ta

Để build một bản *canary* (phiên bản thử nghiệm chưa hoàn thiện) dành cho nhánh feature, chúng ta sẽ khai báo

```yml
# .gitlab-ci.yml
build-publish-canary:
  extends:
    - .prepare
  script:
    - yarn install --frozen-lockfile
    - yarn build
    - yarn test
    - yarn publish:canary
  rules:
    - if:
        $CI_COMMIT_BRANCH != "main" && $CI_PIPELINE_SOURCE !=
        'merge_request_event' && $CI_COMMIT_TITLE != "Publish"

```

Sau khi chạy các lệnh bên trong `.prepare`, chúng ta cho chạy `yarn install --frozone-lockfile` để cài đặt dependencies sử dụng chính xác như những gì đã liệt kê trong file `yarn.lock`, đây là một kinh nghiệm để tránh CI làm thay đổi file lock.

Có những `rules` rất quan trọng mà chúng ta đã thiết đặt

- `$CI_COMMIT_BRANCH != main` đảm bảo job này chỉ chạy trên các nhánh không phải là `main`
- `$CI_PIPELINE_SOURCE != 'merge_request_event` đảm báo job không chạy trên merge request
- `$CI_COMMIT_TITLE != Publish` đảm bảo job không chạy sau khi Lerna tạo ra một commit với title là **Publish**, commit này sẽ xuất hiện khi chạy `lerna version`

Đối với nhánh `main` chúng ta sẽ có một job khác

```yaml
# .gitlab-ci.yml
build-version-stable:
  extends:
    - .prepare
  script:
    - yarn install --frozen-lockfile
    - yarn build
    - yarn test
    - yarn version:stable
  rules:
    - if: $CI_COMMIT_BRANCH == "main" && $CI_COMMIT_TITLE != "Publish"
```

Chúc các bạn thành công !

Bài viết của luckyluu
