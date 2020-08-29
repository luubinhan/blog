---
slug: "/2020-08-24-dry-khong-duoc-vay-thi-wet"
date: "2020-08-24"
title: "DRY không hiệu quả, hãy dùng WET"
desc: "Khi bạn học lập trình bạn sẽ được nghe tới khái niệm DRY (Don't Repeat Yourself), bạn rất có thể đã vận dụng sai ý nghĩa của nó."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

Trên wiki: DRY là nguyên tắc bạn đừng viết lặp lại một đoạn code 

Bạn: Ok, những phần code bị trùng mình sẽ chuyển thành abstraction

Giải pháp trông có vẻ hiển nhiên đúng, nhưng không, abstraction của bạn thường là sai.

Đây là lý do tại sao:

1. Bạn thì code bị duplicate
2. Bạn đưa đoạn duplicate ra thành một abstract (method, class)
3. Bạn thay thể toàn bộ phần duplicate bằng abstraction mới
4. Bạn nghĩ code đã hoàn hảo
5. Thời gian trôi đi
6. PM đưa thêm các yêu cầu mới.
7. Bạn bắt đầu hiện thực các yêu cầu mới
8. Với yêu cầu mới này, bạn phải chỉnh sửa vài đoạn trong abstraction, `if...else` các kiểu, đổi parameter, abstraction của chúng ta có thể đưa ra những action khác nhau theo những điều kiện khác nhau
9. Giờ abstraction của trọng sẽ cho ra những kết quả khác nhau trên những case khác nhau
10. Yêu cầu mới lại đến, thêm parameter tiếp, thêm câu điều kiện tiếp
11. Và giờ đây đoạn code của bạn không còn dễ maintain, nói thẳng ra là một đống hầm bà lằng khó nuốt
12. Chúc mừng, bạn đã bị over engineer và gây ra một abstract quá đỗi phức tạp

Vậy thì sao? Hãy thử WET (Write everything twice)

## WET

Như cách chơi chữ đã thể hiện, nó là trường phái đối nghịch hoàn toàn với DRY, khi bắt đầu viết code, bạn sẽ không thể nào lường trước được mọi yêu cầu, mọi tính năng. Vì thế đừng vội vàng áp dụng abstraction

Bạn hãy nhớ

> Cái giả phải trả cho duplicate vẫn rẻ hơn nhiều cho một abstract viết sai

Ví dụ bạn viết một ứng dụng, bạn dựng ra một component tên `Button` để sử dụng nhiều nơi, nghe rất hợp lý. Một yêu cầu mới xuất hiện, ở trang landing page họ muốn có một nút bấm rất *fancy* và không giống với tất cả những nút bấm trước đây.

Ok, thay đổi cũng nhỏ thôi, chỉ cần thêm tí điều kiện `if..else`, 90% phần code là của `Button` và 10% code là của `FancyButton`

Sự thật đáng buồn là sẽ có rất nhiều những thay đổi như thế xuất hiện và khả năng rất cao là bạn không đủ kinh nghiệm để có hiện thực những abstraction đủ dễ hiểu, dễ maintain.

Lời khuyên? **Copy copy code đó ra, đừng ngần ngại**

[When DRY Doesn't Work, Go WET - Tác giả Nick Bull JS](https://dev.to/bulljsdev/when-dry-doesn-t-work-go-wet-4536)