---
slug: "/2018-09-16-huong-dan-gitflow-workflow"
date: "2018-09-16"
title: "Giải thích Workflow theo kiểu Gitflow"
desc: "Gitflow là một dạng quy trình làm việc với Git, được giới thiệu bởi Vincent Driessen và sử dụng rất phổ biến trong các công ty phần mềm, đặt ra những quy ước trong việc tổ chức các branch trên Git"
cover: "https://image.slidesharecdn.com/gitflow-160421170910/95/git-flow-7-638.jpg"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Gitflow được thiết kế cho các dự án phần mềm release theo version, theo kiểu version release ấy. Đây là quy trình làm việc, nó sẽ không thêm các tính năng mới cho Git, nó chỉ định rất rõ vai trò của mỗi **branch**, tại sao, khi nào các branch sẽ tương tác qua lại với nhau.

Chúng ta cùng nghiên cứu mục đích của từng branch

## Develop

![](https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg)

Nếu **master** để lưu trữ lịch sử những bản release chính thức, **develop** mục đích như một branch cho việc tích hợp các **feature** branch. Trên **master** branch chúng ta sẽ thêm tag theo từng version release.

## Feature Branch

![](https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg)

Mỗi feature mới sẽ có branch riêng, tên branch sẽ được đặt theo feature đang phát triển, **Feature** branch xem **develop** branch như là branch cha của nó. Khi đã hoàn tất feature này, chúng ta *merge* nó lên trên **develop**, không bao giờ tương tác lên **master**, đồng thời xóa branch này.

## Release Branch

![](https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg)

Khi tất cả feature cần thiết đã hoàn thành để có thể release. Chúng ta tạo thêm branch **release**, tên branch là tên của của release version. Tạo branch này cũng đồng nghĩa với việc bắt đầu một vòng phát triển mới, không thêm các tính năng mới nữa, mà tập trung vào bug fix, tạo document này kia. Khi đã hoàn tất tiếp tục *merge* lên **master**

Bằng cách này, chúng ta có thể tách một team để đẩy việc đưa ra release và một team khác tiếp tục phát triển tính năng cho release tiếp theo.

Sau khi được merge vào **master** và **develop**, có thể xóa branch **release**.

## Hotfix

![](https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg)

Rất giống với **release** và **feature** trừ việc nó sẽ dựa trên **master** chứ không phải **develop**, để sửa các lỗi trên production. Đây là branch duy nhất *fork* trực triếp từ **master**. Một khi sửa xong, thì merge vào cả **master* và **develop** rồi xóa

Bên cạnh Gitflow, một số quy trình làm việc khác cũng khá phổ biến với Git là: Centralized Workflow, Feature branching, Forking Workflow

Để làm việc với GitFlow bằng SourceTree, có thể xem video tuts hướng dẫn trên youtube https://www.youtube.com/watch?v=z53JJ7P78Vc

[Link bài gốc](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)