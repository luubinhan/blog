---
slug: "2022-09-26-chrome-106-co-gi-moi"
date: "2022-09-26"
title: "Một vài thay đổi đáng chú ý của Chrome 106"
desc: "Một vài thay đổi đáng chú ý trong DevTools của Chrome 106 sắp tới"
tags: ["chrome","thu-thuat"]
canonical_url: false
---

## Group file theo Authored/Deployed

Source Code trong cửa sổ *Sources* thông thường được sắp xếp theo *Deployed* đến *Authored*, để tiện hơn trong lúc debug ở local, có thể đảo thứ tự này lại

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png?auto=format&w=845)

## Cải thiện Stack Trace

### Luồn async

Thay vì như trước đây chỉ hiện một phần khi hàm thực thi là `async`, giờ chúng ta có đầy đủ nguồn gốc, xuất xứ ai đã gây ra hàm `async` này. Ví dụ như hình bên phải cho ta thấy thứ tự (ngược) là `setTimeout > increment > onClick`

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png?auto=format&w=845)

### Tự động bỏ qua code của third-party

Issue 100% đến từ source code của chúng ta, nên viện hiển thị những hàm của third-party đã chạy qua là không cần thiết trong Stack trace, nó sẽ tự động bị ẩn

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png?auto=format&w=845)

Nếu không thích bạn có thể bật lại như cũ **Settings > Ignore list > Automatically add known third-party scripts to ignore list**

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png?auto=format&w=845)

## Ẩn danh sách file không quan tâm trong Source

Những source code như `node_modules`, `webpack` sẽ không phải là vấn đề cần quan tâm, và chúng ta có thể ẩn nó đi để đở rối mắt

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png?auto=format&w=845)

Khi bật tính năng này, đồng thời khi chúng ta duyệt file sẽ không còn thấy những file trong danh sách bỏ qua

![](https://wd.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png?auto=format&w=845)

Một số thay đổi nhỏ khác, tham khảo đầy đủ hơn ở [What's New In DevTools (Chrome 106)](https://developer.chrome.com/blog/new-in-devtools-106/)