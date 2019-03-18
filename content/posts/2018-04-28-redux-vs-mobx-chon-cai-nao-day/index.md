---
slug: "/2018-04-28-huong-dan-redux-vs-mobx-chon-cai-nao-day"
date: "2018-04-28"
title: "Redux vs Mobx chọn cái nào đây"
desc: "Khi nhắc tới thư viện để quản lý state cho một app js, chúng sẽ có 2 lựa chọn được rất nhiều người yêu thích là Redux hay Mobx"
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

Mình chưa xài Mobx nhiều, thật ra chỉ là cưỡi ngựa xem người khác làm mobx, 100% dự án mình dùng vẫn là Redux. Sau khi biết sự có mặt của Mobx, mình mò mẫm xem 2 thằng này có gì khác nhau:

## Redux

- Dễ test, dễ debug
- Dễ phát triển cho dự án lớn vì nguồn lực dồi dào, đại đa số ai học React xong cũng biết dùng đến Redux.
- Data flow một chiều duy nhất
- Quá cứng nhắc, chúng ta phải tuân thủ các pattern của nó, quá trình code sẽ mất nhiều thời gian hơn cho một chuyện hết sức đơn giản
- Học hơi khó khăn, cần nắm rõ kỹ thuật của Flux, thuần thục ES6, ES7 để sử dụng hiệu quả nhất.
- Cách tổ chức store khá thoải mái nên mỗi người làm một kiểu, ai cũng có quyền bảo vệ quan điểm của mình do ko có ràng buộc

## MobX

- Code nhanh, tự động bind dữ liệu 2 chiều luôn
- Không cần quan tâm đến Flux
- Ít được nhiều người quan tâm, nếu dự án đang làm MobX, sau đó nguyên team nghĩ hết, tuyển lại từ đầu thì sẽ ra sao?
- Còn cái nào nữa thì bạn bổ sung, mình chưa xài MobX

## Một vài nhận định từ các đồng môn

Phần lớn người nào học và sử dụng Redux điều cảm thấy  *ôi trời ơi sao phải setup lắm thứ thế này*, nào `action`, nào `reducer`, nào `store`, nào `connect`, `dispatch`.

Thực sự mình chưa xài MobX nhiều nên việc lợi ích thấy rõ thì mình mong bạn nào đã dùng nhiều chỉ giáo.


> Sooraj Chandran: Totally agree. That is the reason why if you are working in a team you would want to go with Redux — set standards. With MobX and building my own standards might not work well when working with others.


> Lựu chọn cái nào ư? Khách hàng ko quan tâm như dev chúng ta đâu, App chạy đúng là được.


Tác Giả: Sooraj Chandran

Link bài gốc: 
<a target="_blank" rel="noopener noreferrer" href="https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09">MobX vs Redux with React: A noob’s comparison and questions</a>