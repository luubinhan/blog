---
slug: "2020-10-09-huong-dan-chay-nhieu-node-version-khac-nhau"
date: "2020-10-09"
title: "Hướng dẫn chạy nhiều Node version khác nhau trên Windows"
desc: ""
tags: ["node", "thu-thuat"]
canonical_url: false
---

**Tại sao lại có nhu cầu này**?

Ví dụ như source code mỗi project yêu cầu một node version khác nhau, và bắt buộc phải đúng version đó *mới chịu*

**Todo bạn cần làm**

Gỡ bỏ Node đang sử dụng, và xóa hết các thư mục liên quan
`C:\Users<user>\AppData\Roaming\npm`

Tải về và cài đặt *Node Version Manager*

- Nếu dùng linux hay macOS: [nwm](https://github.com/creationix/nvm)
- Nếu dùng Windows: [NVM mới nhất](https://github.com/coreybutler/nvm/releases)

Ví dụ bạn cần chạy Node version 10.18.0 và 12.16.1, chạy lệnh sau trọng PowerShell

```bash
# installs the node version 10.19.0
nvm install 10.19.0

# installs the node version 12.16.1
nvm install 12.16.1
```

Để chỉ định version muốn dùng, chạy lệnh

```bash
nvm use 12.16.1
// switch về 10.19.0
nvm use 10.19.0
```

Lưu ý chạy bằng quyền admin nhé.