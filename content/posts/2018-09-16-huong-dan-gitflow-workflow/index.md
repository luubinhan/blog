---
slug: "/2018-09-16-huong-dan-gitflow-workflow"
date: "2018-09-16"
title: "Giải thích Workflow theo kiểu Gitflow"
desc: "Gitflow là một dạng quy trình làm việc với Git được giới thiệu bởi Vincent Driessen, đặt ra những quy ước bắt buộc trong việc tổ chức các branch của trên Git"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Gitflow được thiết kế cho những dự án có một lịch release xoay vòng, theo kiểu version release ấy. Workflow này sẽ không thêm những khái niệm hoặc lệnh mới vô Git. Nó chỉ định rất rõ từng vai trò của thể của mỗi **branch**, như thế nào, khi nào các branch sẽ tương tác qua lại với nhau.

# Bắt đầu

Chúng ta cùng nghiên cứu mục đích của từng branch

## Develop

![](https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg)

Nếu **master** để lưu trữ lịch sử những bản release chính thức, **develop** mục đích như một branch cho việc tích hợp các **feature** branch. Trên **master** branch chúng ta sẽ thêm tag theo từng version release.

## Feature Branch

![](https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg)

Mỗi feature mới sẽ có branch riêng, tên branch sẽ được đặt theo feature đang phát triển, **Feature** branch xem **develop** branch như là branch cha của nó. Khi đã hoàn tất feature này, chúng ta merge nó lên trên **develop**, không bao giờ tương tác lên **master**, đồng thời xóa branch này.

## Release Branch

![](https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg)

Khi tất cả feature cần thiết đã hoàn thành để có thể release. Chúng ta tạo thêm branch **release**, tên branch là tên của của release version. Tạo branch này cũng đồng nghĩa với việc bắt đầu một vòng phát triển mới, không thêm các tính năng mới nữa, mà tập trung vào bug fix, tạo document này kia. Khi đã hoàn tất tiếp tục merge lên **master**

Bằng cách này, chúng ta có thể tách một team để đẩy việc đưa ra release và một team khác tiếp tục phát triển tính năng cho release tiếp theo.

Sau khi được merge vào **master** và **develop**, có thể xóa branch **release**.

## Hotfix

![](https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg)

Rất giống với **release** và **feature** trừ việc nó sẽ dựa trên **master** chứ không phải **develop**, để sửa các lỗi trên production. Đây là branch duy nhất *fork* trực triếp từ **master**. Một khi sửa xong, thì merge vào cả **master* và **develop** rồi xóa

[Link bài gốc](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)