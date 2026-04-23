---
slug: "/2018-11-01-gioi-thieu-npm-link"
date: "2018-11-01"
title: "Hướng dẫn dùng npm link"
desc: "Cách dùng npm link để trỏ dependency đến thư mục local"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Sử dụng](#sử-dụng)
- [Debug](#debug)
- [Quay lại bình thường](#quay-lại-bình-thường)

<!-- /TOC -->

Nếu như bạn là tác giả của một module, bạn đang để nó ở một thư mục trên máy local, bạn không có viết test cho module này, bạn dùng chính app đang viết như là cách để test module luôn, tìm thấy lỗi trên module, sau khi sửa lỗi một cách thủ công trong thư mục `node_modules`, copy toàn bộ file qua git repository, rồi commit lên.

![Cách dùng npm link để trỏ dependency đến thư mục local](https://cdn-images-1.medium.com/max/880/0*wvDueqq35PXNE1qA)

Có một cách làm **sạch sẽ** hơn: `npm link`

# Sử dụng

Để link package, thực hiện bằng 2 bước

1. Tạo một shortcut trên dependency với `npm link`. Shortcut này trỏ tới một thư một khác trên máy.
2. Khai báo trên project sử dụng shortcut này, `npm link some-dep`

```powershell
cd ~/projects/some-dep
npm link  # Step 1.
cd ~/projects/my-app
npm link some-dep  # Step 2.
```

![Cách dùng npm link để trỏ dependency đến thư mục local](https://cdn-images-1.medium.com/max/880/0*x8jMbWUMifff9Eao)

Bạn có thể sửa, transpile, chạy test, commit bình thường trên `some-dep`. Khi chạy `my-app` nó sẽ chạy với những thay đổi đã thực hiện trên `some-dep`. Shortcut đã tạo ra sẽ ko được commit lên git, nó chỉ có hiệu lực trên local

# Debug

Nếu đang sử dụng VSCode và muốn set breakpoint trong `some-dep`, trên debugger của `my-app`, bạn cần thiết đặt trong `launch.json`

```json
"runtimeArgs": [
  "--preserve-symlinks"
]
```


![Cách dùng npm link để trỏ dependency đến thư mục local](https://cdn-images-1.medium.com/max/880/0*H1TB22svP8POFP8p)

# Quay lại bình thường

Nếu không còn muốn sử dụng bản local của `some-dep` nửa, `npm unlink` chăng? Cũng được, nhưng thật ra nó sẽ chạy `npm uninstall`, nghĩa là bạn phải uninstall rồi install lại từ đầu

```powershell
cd ~/projects/my-app
npm uninstall --no-save some-dep && npm install 
```

Nếu xóa shortcut trên `some-dep` sẽ an toàn hơn, không đụng tới dependency của `my-app`

```powershell
cd ~/projects/some-dep
npm uninstall  # Delete global symlink
```


<a href="https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557" target="_blank" rel="noopener noreferrer">Understanding npm-link</a>
