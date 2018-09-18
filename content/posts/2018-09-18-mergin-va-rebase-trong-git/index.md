---
slug: "/2018-09-18-merging-va-rebase-trong-git"
date: "2018-09-18"
title: "Merge vs Rebase trong Git"
desc: "Trong bài viết này, chúng ta sẽ so sánh giữa lệnh git rebase với git merge, những trường hợp ta có thể áp dụng rebase trong quá trình làm việc với git"
cover: "https://wac-cdn.atlassian.com/dam/jcr:15447956-9d33-4817-9dc6-fd6c86f24240/hero.svg"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Ý tưởng chính](#ý-tưởng-chính)
  - [Merge](#merge)
  - [Rebase](#rebase)
- [Nguyên tắc vàng của Rebase](#nguyên-tắc-vàng-của-rebase)
- [Quy trình làm việc](#quy-trình-làm-việc)

<!-- /TOC -->

# Ý tưởng chính

Điều đầu tiên cần hiểu về `git rebase` là nó giải quyết cùng một vấn đề như `git merge`. Cả 2 lệnh này được dùng để đưa các thay đổi từ một branch sang 1 branch khác, chỉ khác nhau ở cách làm.

Hãy hình dung chuyện sẽ xảy ra khi chúng ta bắt đầu làm việc trên một tính năng mới, trên feature branch, sau đó team khác commit code mới lên master branch.

![](https://wac-cdn.atlassian.com/dam/jcr:01b0b04e-64f3-4659-af21-c4d86bc7cb0b/01.svg)

Cái commit mới trong **master** liên quan đến feature chúng ta đang làm. Để lấy commit mới này từ **master** và đưa về feature branch đang làm, chúng ta có 2 lựa chọn: **merge** hoặc **rebase**

## Merge

```git
git checkout feature
git merge master

// hoặc viết bằng một dòng luôn
git merge master feature
```

Kết quả là nó sẽ tạo ra một **merge commit** mới trên feature branch, Chúng ta có một cấu trúc như sau

![](https://wac-cdn.atlassian.com/dam/jcr:e229fef6-2c2f-4a4f-b270-e1e1baa94055/02.svg)

Nói một cách khác, **feature branch** sẽ có **thêm** một state cần commit. Nếu **master** bị thay đổi thường xuyên, liên tục, cái history của feature branch  có thể sẽ rất lộn xộn, mặc dù có thể xử lý bằng `git log`, tuy nhiên các bạn developer khác sẽ rất khó mà hiểu được history của project

## Rebase

Một lựa chọn khác với merge, là dùng `rebase`

```git
git checkout feature
git rebase master
```

Nó sẽ đưa toàn bộ **feature** branch lên trên cùng của **master**.

![](https://wac-cdn.atlassian.com/dam/jcr:5b153a22-38be-40d0-aec8-5f2fffc771e5/03.svg)

Lợi ích của dùng `rebase` là chúng ta có history của project sạch sẽ hơn. Sẽ không có những merge commit dư thừa như trong lệnh `merge`.

# Nguyên tắc vàng của Rebase

Một khi đã hiểu được cách làm của **rebase**, điều quan trọng nhất đã học được là **đừng bao giờ xài nó**.

Ví dụ, đoán xem chuyện gì xảy ra nếu chúng ta **rebase** master vào feature branch

![](https://wac-cdn.atlassian.com/dam/jcr:1d22f018-b2c7-4096-9db1-c54940cf4f4e/05.svg)

Lệnh `rebase` sẽ đưa toàn bộ commit của master xuống feature. Vấn đề là cái này chỉ nằm trên local repository của chúng ta. Tất cả những dev khác sẽ tiếp tục làm việc trên master gốc. Git lúc này sẽ hiểu history master của chúng ta không phụ thuộc vào những người khác.

Cách duy nhất để sync lại 2 master branch là merge chúng lại. Bạn đã thấy sự rắc rối chưa? Khi cả 2 branch master sẽ có cùng các commit changes. Nói cách khác, đố ai biết được chúng ta chọn được cái này trong 2 cái để merge.

Trước khi chạy lệnh `git rebase`, luôn hỏi chính mình "Có đứa nào đang làm việc trên branch này?" Nếu câu trả lời là có, rút tay khỏi bàn phím và nghĩ đến giải pháp an toàn hơn như `git revert`

# Quy trình làm việc

Chúng ta cùng bàn quan những lợi ích của `rebase` trong quá trình phát triển feature

Bước đầu tiên để làm việc với `git rebase` là phải đảm bảo mỗi feature có một branch tương ứng. Như vậy chúng ta có một cấu trúc an toàn để có thể rebase

![](https://wac-cdn.atlassian.com/dam/jcr:6af9de07-088b-4f8b-97a7-b66569a9e4ac/06.svg)

Khi gọi `git rebase` chúng ta có 2 lựa chọn: **thằng cha của feature branch** (có thể là developmennt hoặc master tùy thuộc vào cái flow đang dùng) hoặc một thời điểm commit trước đó của feature. Lựa chọn thứ 2 là ta dùng Rebase kèm với options, ví dụ rebase lại trước đó 3 commit

```git
git checkout feature
git rebase -i HEAD~3
```

Bằng cách chỉ định `HEAD~3`, chúng ta không tạo thêm state mới của branch, chúng ta chỉ viết lại cho 3 commit trước đó.

![](https://wac-cdn.atlassian.com/dam/jcr:079532c4-2594-40ed-a5c4-0e3621b9edff/07.svg)

Nếu muốn viết lại toạn bộ cái feature sử dụng cách này, dùng lệnh `git merge-base` để tìm đến gốc của feature branch

```git
git merge-base feature master
```

[Link bài gốc](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)