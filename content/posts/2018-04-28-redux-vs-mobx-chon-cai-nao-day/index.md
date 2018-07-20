---
slug: "/2018-04-28-redux-vs-mobx-chon-cai-nao-day"
date: "2018-04-28"
title: "Redux vs Mobx chọn cái nào đây"
desc: "Khi nhắc tới thư viện để quản lý state cho một app js, thì chúng sẽ hay rất phân vân giữa 2 lựa chọn Redux hay Mobx"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Redux](#redux)
  - [Ưu](#ưu)
  - [Nhược](#nhược)
- [MobX](#mobx)
  - [Ưu](#ưu-1)
  - [Nhược](#nhược-1)
- [Một vài nhận định từ các đồng môn](#một-vài-nhận-định-từ-các-đồng-môn)

<!-- /TOC -->

Nói một cách ngắn gọn: MobX dành project tầm 1 - 3 người làm, các app nhỏ. Redux dành cho tất cả những yêu cầu cao hơn.

Nếu bạn chỉ quan tâm đến thể thì có thể ko cần đọc tiếp phần sau, còn nếu tò mó thì cứ đọc tiếp.

## Redux

### Ưu

- Dễ test
- Có thể đoán được những state nào bị ảnh hương -> dễ debug
- Mở rộng tốt, phù hợp team bự
- Kiên định, data flow một chiều duy nhất

### Nhược

- Quá cứng nhắc, chúng ta phải tuân thủ các pattern của nó, quá trình code sẽ mất nhiều thời gian hơn cho một chuyện hết sức đơn giản
- Học hơi khó khăn, cần nắm rõ kỹ thuật của Flux, thuần thục ES6, ES7 để sử dụng hiệu quả nhất.


## MobX

### Ưu

- Code nhanh, tự đọng bind dữ liệu 2 chiều luôn
- Không cần quan tâm đến Flux
- Linh động trong việc cho phép tự quản lý state

### Nhược

- Khi team phình ra, dự án bự lên **CHỈ** có thể maintain nổi nếu từ đầu tổ chức tốt, ý là thằng code trước mà để lại sh*t thì coi như ăn cho hết
- Quá tự do cũng mệt, dễ dẫn đến chuyện viết theo kiểu hơi chuối, muốn thích viết sau viết mà


## Một vài nhận định từ các đồng môn

Phần lớn người nào học và sử dụng Redux điều cảm thấy, ôi trời ơi sao phải setup lắm thứ thế này, nào action, nào reducer, nào store, nào connect, dispatch. Có những bạn đã từng làm nhiều Angular thường xuyên phàn nàn chuyện rất ghét việc binding dữ liệu 2 chiều (đọc-ghi) trong Angular, với những dự án lớn việc này làm chuyện debug hết sức khó khăn khi có lỗi. Đó là lý do Flux được giới thiệu, rồi khi Redux được giới thiệu, cộng đồng js dev chuyển qua xài nó. Với những dự án nhỏ, sử dụng dao to búa lớn như Redux để giết kiến thì ko cần thiết, hãy cứ đơn giản `setState` thôi.

MobX là một sự lựa chọn khác, một option để quản lý state cho dự án nhỏ. Nó sang mang đến những lợi ích thấy rõ khi kick off các dự án không quá bự. Thực sự mình chưa xài MobX nhiều nên việc lợi ích thấy rõ thì mình mong bạn nào đã dùng nhiều chỉ giáo.

DHTML -> JQuery -> Backbone vs. Knockout vs. Ember -> Meteor -> Angular vs React. Quá trình *thăng tiến* của front-end dev là thế. MobX là một công cụ tốt ở thời điểm hiện tại, hy vọng nó không như Knockout JS và các thư viện MVVM trước đây, mọi thứ mới bắt đầu vận hành mượt mà như một phép màu, 6-12 tháng sau, phép màu và tự do trở thành thảm họa cho những người dev kế thừa

Tác Giả: Sooraj Chandran
Link bài gốc: https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09