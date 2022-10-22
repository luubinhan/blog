---
slug: "/2019-07-13-nguyen-tac-moi-lap-trinh-vien-can-biet"
date: "2019-07-13"
title: "10 nguyên lý lập trình nền tảng mà lập trình viên nào cũng cần biết"
desc: "Nhớ thời đại học quá nên ôn lại kiến thức vở lòng mấy bạn ơi"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat", "kinh-nghiem"]
---

<!-- TOC -->

- [KISS](#KISS)
- [DRY](#DRY)
- [Up up mở mở](#Up-up-m%E1%BB%9F-m%E1%BB%9F)
- [Hợp thể sẽ mạnh hơn được buff](#H%E1%BB%A3p-th%E1%BB%83-s%E1%BA%BD-m%E1%BA%A1nh-h%C6%A1n-%C4%91%C6%B0%E1%BB%A3c-buff)
- [Ai làm việc nấy (Single Responsibility)](#Ai-l%C3%A0m-vi%E1%BB%87c-n%E1%BA%A5y-Single-Responsibility)
- [Bớt quan tâm con gái nhà hàng xóm (Separation of Concerns)](#B%E1%BB%9Bt-quan-t%C3%A2m-con-g%C3%A1i-nh%C3%A0-h%C3%A0ng-x%C3%B3m-Separation-of-Concerns)
- [Bạn là lập trình viên không phải thầy bói YAGNI](#B%E1%BA%A1n-l%C3%A0-l%E1%BA%ADp-tr%C3%ACnh-vi%C3%AAn-kh%C3%B4ng-ph%E1%BA%A3i-th%E1%BA%A7y-b%C3%B3i-YAGNI)
- [Tối ưu hóa quá sớm](#T%E1%BB%91i-%C6%B0u-h%C3%B3a-qu%C3%A1-s%E1%BB%9Bm)
- [Refactor](#Refactor)
- [Thà anh code sạch, chứ anh không cần code cho cao siêu (Clean Code > Clever Code)](#Th%C3%A0-anh-code-s%E1%BA%A1ch-ch%E1%BB%A9-anh-kh%C3%B4ng-c%E1%BA%A7n-code-cho-cao-si%C3%AAu-Clean-Code--Clever-Code)
- [Tổng kết](#T%E1%BB%95ng-k%E1%BA%BFt)

<!-- /TOC -->



Nếu bạn là người theo chủ nghĩa viết code sao cho *chạy được là đủ*, bạn không nên đọc bài này. Còn mục tiêu là viết code và **đặt cái tâm vào những gì mình viết ra** thì bạn nên biết các nguyên lý nền tảng này.

## KISS

Nguyên tắc **Keep it simple, stupid** được áp dụng cho rất nhiều thứ trong cuộc sống, rất cần thiết cho các dự án từ vừa tới lớn.

Từ lúc bắt đầu code những dòng đầu tiên, chúng ta phải khắc cốt ghi tâm câu **đơn giản nhất có thể**, code càng phức tạp càng khó viết và đọc lại, càng có khả năng phát sinh bug, càng khó chỉnh sửa sau này. Cụ Antoine de Saint-Exupery có phán câu này:

> Hoàn hảo không phải là khi không còn gì để thêm vào nữa, mà là không còn gì có thể bỏ bớt

## DRY

Nguyên tắc vàng mà chúng ta nghe mãi nghe mãi. **Don’t repeat yourself**, không bao giờ để chuyện code chổ này giống hệt chổ kia, copy-paste một đoạn code ở nhiều chổ trong source. Nếu thấy một đoạn code mà cứ viết đi viết lại ở nhiều nơi trong source, người ta sẽ đánh giá trình bạn còn non và xanh lắm

## Up up mở mở (Open/Closed)

Biết có thể viết thêm các tính năng bổ sung thoải mái, nhưng không được chỉnh sửa core chính. Cái này có thể lấy ví dụ bạn lấy những package trên `npm`, nó nằm trong `node_modules`, sẽ không được chỉnh sửa gì ở đó hết, nếu lỡ sau này người ta update lên, là bạn phải tự cập nhập thủ công nhé.

## Hợp thể sẽ mạnh hơn được buff (Composition > Inheritance)

![10 nguyên tắc lập trình nền tảng mà lập trình viên nào cũng cần biết](https://wegotthiscovered.com/wp-content/uploads/2018/08/Power-Rangers-Movie-Blu-ray-cover-art-1.jpg)

Nếu bạn có xem 5 anh em siêu nhân bạn sẽ hiểu, nếu 5 anh em siêu nhân mà hợp thể lại sẽ tạo ra một con robot với sức mạnh vượt bật, đánh bại mọi cả thể yêu quái, dù nó được buff rất nhiều đồ chơi để tăng dame.

Cái này có ví dụ cho anh em nào viết OOP, mà mình thì không rành OOP lắm, nên anh em tự tìm ví dụ nhé.

## Ai làm việc nấy (Single Responsibility)

Mỗi function chỉ thực hiện một nhiệm vụ duy nhất, không ôm đồm nhiều thứ cùng lúc.

Nếu xác định ra đường là đi ăn cơm, thì ăn cơm rồi về, không có sẵn tiền mua thêm bịch chè, ly trà sữa hay vài trứng vịt lộn.

## Bớt quan tâm con gái nhà hàng xóm (Separation of Concerns)

Cũng tương tự với ai làm việc nấy, nguyên tắc này có phần trừu tượng, khái quát hơn một chút.

Lấy ví dụ quan hệ trai-gái, để có thể quen một lúc 3 cô, bạn cần lập 3 tài khoản Zalo khác nhau, trên 3 cái điện thoại khác nhau, để khi đi chơi với cô nào thì không bị phát hiện mấy cô kia, đừng dùng 1 tài khoản trên 1 điện thoại mà chat với cả 3 cô cùng lúc.

Lấy ví dụ trong *nghề* lập trình nó là mô hình thiết kế MVC, còn trong *nghề* React nó là khái niệm Container và Presentation component. Nhưng anh em cứ nhớ ví dụ 3 cô gái cho dễ.

![10 nguyên tắc lập trình nền tảng mà lập trình viên nào cũng cần biết](https://static.makeuseof.com/wp-content/uploads/2017/10/programming-principle-mvc-pattern.png)


## Bạn là lập trình viên không phải thầy bói (YAGNI - you aren’t gonna need it)

Nguyên tắc này nó nói là, bạn đừng viết ra những hàm mà bạn nghĩ, "ờ, có lẽ trong tương lai chúng ta sớm muộn cũng xài tới nó". Cái gì cần thì viết, có sao lại viết trước?

Ví dụ, bạn viết sẵn một số lớp abstract và generic để tránh trùng lặp code, mà quá nhiều lớp abstract dẫn đến hậu quả không thể nào mà bảo trì nổi. Nói chung để đảm bảo nguyên tắc DRY, bạn cứ viết trước đi, nếu thấy bị trùng, thầy refactor lại, như ông bà có câu cứ có trâu rồi hả mua chuồng

## Tối ưu hóa quá sớm (Avoid Premature Optimization)

Nếu bạn có xu hướng tối ưu các giải thuật được viết ra ngay từ đầu, vấn đề ở chỗ là bạn không thể biết được chương trình sẽ bị nghẽn cổ chai ở đâu cho đến khi có dữ liệu thực tế. Bạn có thể phỏng đoán, tất nhiên là được mà đôi khi hên hên lại đúng. Chỉ có một điều dễ thấy là bạn sẽ bỏ ra không ít thời gian để tăng tốc cho hàm đó, mà thiệt ra nó không chậm tới mức như bạn nghĩ, hoặc mức độ user sử dụng hàm đó sẽ không nhiều.

Hoàn thành những vấn đề mấu chốt trước, sau đó dò lại để biết đang bị thắt cổ chai ở đâu

## Refactor, rồi lại Refactor, rồi lại Refactor

Sự thật ai cũng biết là khi bạn mới bắt đầu viết, thời gian sau nhìn lại, khi đã có cái nhìn cụ thể và rõ ràng hơn những gì mình đang làm trong dự án, bạn sẽ code trước đây mình viết thật sự chưa "ngon". Công việc refactor là rất bình thường. Nếu bạn đang có việc cần thay đổi hoặc kiểm tra code cũ, nếu được thì cứ *dọn dẹp* một tí trước khi đi.

## Thà anh code sạch, chứ anh không cần code cho cao siêu (Clean Code > Clever Code)

Nói về clean code, là phải bỏ đi cái tôi to bự sang một bên, đừng bao giờ nghĩ code thế cho ngầu, code mà để bạn khoe với thiên hạ rằng cách code của tôi mới thông minh hơn.

Ví dụ dễ thấy, một số thanh niên mình từng làm việc chung rất thích dùng câu điều kiện trên một dòng, anh ấy cứ `&&  || && || &&` các kiểu trên một dòng, ai mà vô đọc thì chỉ có kiếm ảnh để nhờ giải thích là đang muốn làm cái gì.

## Tổng kết

9 người thì 10 ý, nếu đi hỏi 9 người với câu hỏi "Thế nào được gọi là một lập trình viên tốt", thì chắc nhận được không ít sự khác nhau về quan điểm, mà đôi khi còn trái chiều với nhau nữa.

Bạn thấy ý kiến này thế nào, một lập trình viên giỏi là người biết mình đang phục vụ người dùng cuối, người có thể làm việc hiệu quả với đồng đội, người có thể hoàn thành công việc được giao đúng yêu cầu, đúng tiến độ.


<a target="_blank" rel="noopener noreferrer" href="https://www.makeuseof.com/tag/basic-programming-principles/">10 Basic Programming Principles Every Programmer Must Follow</a>
