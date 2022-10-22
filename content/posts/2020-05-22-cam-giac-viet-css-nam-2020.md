---
slug: "/2020-05-22-cam-giac-viet-css-nam-2020"
date: "2020-05-22"
title: "Cảm giác khi bạn viết CSS như thế nào trong năm 2020"
desc: "Nếu đã có bài làm một website trong năm 2016 nó như thế nào, thì giờ ta sẽ nói xem viết css trong năm 2020 sẽ ra mần sao"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "dam-dao"]
---

**Anh technical leader: em biết sao không, anh đã không viết code từ năm 2016 tới giờ, công việc của anh giờ chỉ toàn làm chính trị trong công ty thôi. Giờ em thấy cái dự án này công ty mình mới lấy về, họ muốn thêm phần giao diện cho nó khác đi, sửa responsive lại chút**

Ngon ăn đấy anh, nhận đi.

**Cái này họ làm React, nhưng mà lúc đó không biết đứa nào viết chỉ có một file css duy nhất với hơn 3000 dòng code, nhìn gớm quá, nhiều cái cứ xài tới xài lui mà không chịu kế thừa, cấu trúc thì khỏi nói rồi, gớm luôn, em thấy giờ mình làm sao cho tốt?**

Đúng rồi anh, ai mà làm như thế.

**Trước mắt, chúng ta coi hết lại đống này, xóa bớt mấy cái không cần thiết, sắp xếp lại, comment mọi thứ cho nó rõ ràng**

Làm trên một file CSS đó luôn hả anh?

**Ừ thì mình làm thêm bộ màu mới, thêm mấy tương tác cho nó cool hơn, sửa lỗi media queries, chắc là đủ rồi**

Được mà, mà giờ không ai viết CSS thuần nữa đâu anh.

**Giờ mình có những lựa chọn khác nào vậy em?**

Giờ mình có nhiều framework, với những bộ màu đã định nghĩa sẵn, làm sẵn luôn responsive và hiệu ứng nhè nhẹ.

**Kiểu bootstrap đúng không?**

Xài cũng được, nhưng em không khuyến khích anh xài cái đó.

**Sao vậy ta, hồi anh còn code, nó nổi lắm mà**

Bớt nổi rồi anh. Giờ còn nhiều em _hót_ không kém như Foundation, Bulma, Materialize, Semantic UI, Tailwind

**Chọn đại một cái được không em**

Mỗi thằng có ưu nhược khác nhau anh à, mà xài những cái này, các website bây giờ cứ na ná nhau, kiểu template, nói thật nhìn nó _khắm_ lắm.

**Vậy hổng lẽ tự viết sao em?**

Bậy nè, anh không nên tự viết từ đầu chi, mà anh phải đi override lại chúng thôi, cũng khá khá nhiều thứ cần override.

**Ít nhất nó cũng giúp chúng ta đơn giản hóa việt layout và responsive đúng chứ?**

Nếu mà không yêu cầu cao, anh dùng những thư viện _nhẹ hiều_ như Skeleton hay Pure CSS đi.

**Pure CSS, anh tưởng anh đã đang viết pure css**

Bậy nè, nó là tên thư viện, mà anh ít nhất biết dùng Flexbox chứ?

**Nó là gì đó, anh dùng float không à, ủa mà tại sao ít nhất?**

Kiểu layout bây giờ dùng flexbox không anh, còn cao cấp hơn thì dùng luôn css grid

**Nó có gì hay ho vậy?**

Nếu mà flexbox là kiểu layout một chiều, thì css grid là kiểu layout 2 chiều

**Kiểu 2 chiều, như X, Y đúng không**

Nó cho phép anh đưa nội dung về dạng row và column, rất nhiều tính năng xịn sò để làm các layout bay bổng

**Ngon, vậy xài được đó**

Chịu khó học nghe anh, lúc đầu hơi chua ăn đó.

**Còn lựa chọn nào khác cho css không em?**

Giờ anh có css variable nè, mixins, nesting, import, tính toán, hàm helper để code anh có tổ chức hơn.

**Anh có nghe nhầm không, function và variable?**

Không nhầm ạ

**Mấy cái syntax lạ lồng như thế, có nguy hiểm không**

Anh có mấy cái CSS preprocessor lo rồi mà

**Như SASS/SCSS?**

Đúng. Mà nó khác nhau đó nghe anh, SCSS > SASS, giờ cũng ít ai viết SASS lắm

**LESS xài được ko em, anh quen viết LESS**

Xưa rồi anh ơi, ai mà viết less nữa, nó chết bà rồi.

**Nhiều thứ quá nhỉ**

Đó em chưa kể đến mấy cái preprocessor mới ra là Stylus, CSS Crush, Myth đó.

**Khó quá, bỏ qua, chọn đại một cái đi**

Anh định dùng animation không, có quan tâm tới việc support nhiều trình duyệt không?

**Có chứ em**

Vậy anh phải coi thêm post-processor nữa, như PostCSS vậy

**Nó là gì nữa á**

Pre là xử lý _đường vào_, post là xử lý _đường ra_ đó anh, nó đơn giản là thêm mấy cái syntax phù hợp cho các trình duyệt khác nhau

**Vậy còn kinh nghiệm của em, thì chúng ta nên tổ chức sao cho tốt?**

Xem thêm BEM á anh, một chuẩn mực đặt tên class sao cho dễ đọc để nuốt

**Em có tự chế không đó?**

Nào có anh ơi, em còn biết đến OOCSS và SUITCSS nữa mà không dám nói sợ anh nói em nói xạo

**Kiểu này là anh phải sấp mặt mấy tháng để cập nhập kiến thức rồi em**

Mà anh biết CSS-in-JS chưa?

**Nó là cái nồi gì nữa em?**

Nó cho anh viết CSS trong file JS

**Em đùa vui quá**

Xạo làm chó, bây giờ React nó hổng viết CSS như bình thường nữa anh, nó chơi kiểu CSS in JS, hay là styled component. Còn không anh dùng inline style sheet,, CSS module,...

**Inline CSS, cái đó là Bad practice mà em**

Giờ người ta không nghĩ vậy nữa đâu anh, nó là chuyện bình thường mà. Còn chưa nói đến JSS nữa đó anh

**Thôi em à, anh thấy chúng ta đi xa quá rồi, từ CSS mà em chuyển nó thành JSS**

Nhưng đó là những gì đang hót nhất mà anh, anh thấy không hót hả.

**Anh nghĩ mình nên để yên cái project này và không thêm thắt gì nữa đi em, nó như vậy là đẹp rồi**

https://dev.to/madarsbiss/how-it-feels-like-to-style-things-in-2020-21cm
