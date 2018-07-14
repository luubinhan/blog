---
path: "/2018-03-14-sync-addin-vscode"
date: "2018-03-14T13:35:13.234Z"
title: "Sync extensions của VSCode"
desc: "Khi sử dụng VSCode chắc ai cũng cài thêm một mớ extensions, lỡ ngày nào cài lại máy, hay sử dùng máy công ty, máy ở nhà muốn VSCode sync mấy cái extentions hay sử dụng"
tags: ["javascript"]
---

- Tài khoản Github, danh sách extension sẽ được lưu lên gist
- Cài thêm extentions tên là Settings Sync - tác giả Shan Khan.


# Tạo access token trên Github

Đăng nhập vào tài khoản Github, vào trang Settings / Developer settings / Personal access tokens / Generate New Token

![](https://shanalikhan.github.io/img/github1.PNG)

Nhập tên và cấp quyền tạo gist cho token này

![](https://shanalikhan.github.io/img/github2.PNG)

Sau khi tạo xong, nhớ lưu lại token này ở đâu đó

![](https://shanalikhan.github.io/img/github3.PNG)

# Upload những thiết đặt, extensions đã cài cho VSCode

Dùng phím tắt `Shift + Alt + U` hoặc search từ command Palette, search từ sync

Nó sẽ yêu cầu nhập giá trị token vừa mới tạo

![](https://shanalikhan.github.io/img/upload1.png)

Sau khi upload thành công, nó sẽ trả về gist id, **nhớ copy** và lưu lại giá trị gist Id này để sử dụng trên máy khác.

# Download các thiết từ gist về

Dùng phím tắt `Shift + Alt + D`, hoặc gọi từ command palette

Nó sẽ yêu cầu nhập lại token và gist id đã tạo, điền vào, xong!
![](https://shanalikhan.github.io/img/upload1.png)
![](https://shanalikhan.github.io/img/download2.png)
![](https://shanalikhan.github.io/img/download3.png)