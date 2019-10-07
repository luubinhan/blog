---
slug: "/2019-10-01-giai-thich-authentication-bang-token"
date: "2019-10-01"
title: "Authentication bằng Token - Bài 1: Cơ chế authentication bằng token"
desc: "Phần mềm ngày nay được phát triển theo hướng sử dụng token để làm authentication, để có thể tách chức năng này ra như một phần độc lập, cho phép phần mềm có thể scale ở mức cao nhất"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat"]
---

Trong bài 1 này sẽ giải thích các thuật ngữ và hướng giải quyết vấn đề xác thực user bằng token

Tham khảo bài [Làm quen với kiến trúc Serverless](/2019-08-30-lam-quen-voi-kien-truc-serverless) để biết tại sao lại có nhu cầu tách phần authentication ra thành một service riêng.

Ví dụ thực tế để hiểu rõ hơn cách authentication bằng token, để các bạn dễ nhớ cơ chế authentication token vận hành, chúng ta dùng một quy trình có thật trong cuộc sống

- **ứng dụng** = **khách sạn**
- **authentication service** = **tiếp tân khách sạn**
- **resource của ứng dụng** = **phòng khách sạn**
- **access token** = **thẻ từ khách sạn**
- **thông tin xác thực** = **chứng minh nhân dân/ hoặc passport**

Chúng ta sẽ nhớ cơ chế token authentication này đến hết phần đời còn lại!

Khi chúng ta bước vào một khách sạn, chúng ta được phép đi đến những khu vực *miễn phí*, như sảnh chờ, nhà vệ sinh chung

> Mở một ứng dụng, chúng ta có thể truy cập các trang public như homepage

Tuy nhiên để có thể vào phòng, hồ bơi, chúng ta cần thẻ từ của khách sạn

> Để truy cập vào trang account, lấy các thông tin private, chúng ta cần token

Chúng ta bước tới chỗ quầy lễ tân, đưa CMND, bộ phận tiếp tân sẽ xác thực thông tin này trước khi đưa cho chúng ta một thẻ từ

> User đi tới trang đăng ký/đăng nhập để xác thực thông tin. Authentication service kiểm tra thông tin và trả về một token

Với thẻ từ được cấp, chúng ta được phép vào phòng, hồ bơi và một số dịch vụ được quy định trong thẻ từ

> Khi có token, chúng ta gửi token này lên API nếu cần lấy một thông tin private

Bên khách sạn sẽ hiểu là, bất kể chỗ nào bạn quét cái thẻ từ đó, thì bạn là người đang nắm giữ thẻ, nghĩa là nó sẽ không cần biết bạn có đưa thẻ đó cho ai mượn không

> Với token nhận được, API sẽ biết được ai là người giữ token này. Dù đứa nào đó chôm được cái token này, nó cũng sẽ cho rằng đó là bạn

Khi lỡ làm mất khách thẻ từ, chúng ta bao với quầy lễ tân, họ thực hiện khóa thẻ từ bị mất, đóng cửa phòng

> Cơ chế deactive một token sau khi đã cấp phát, tự động "đá" user nào dùng token đã deactive ra khỏi các trang private

Chúng ta không thể xài cái thẻ này hoài được, phụ thuộc vào khách sạn, họ có cho thời gian hết hạn cái thẻ đó không

> Authentication service sẽ có quyền thiết lập thời gian hết hạn của một token

Nếu bạn **chôm** luôn cái thẻ từ về nhà, lần sau vào khách sạn bạn không sử dụng được nó nữa

> Dù cho bạn vẫn giữ token (cũ), nhưng khi đã hết hạn, bạn cũng không lấy được dữ liệu từ API

Khách sạn có thể cung cấp nhiều loại thẻ từ khác nhau, bạn chỉ có thẻ vào phòng mình, nhưng bên vệ sinh họ sẽ có thẻ để mở tất cả các phòng

> Admin có những token riêng, được phép truy xuất đến mọi thông tin trên ứng dụng

Để thẻ từ không giả mạo được, nó sẽ đi kèm một chữ ký điện tử (của từng khách sạn) trong đó, nếu không xác thực được chữ ký này, bạn sẽ không thể sử dụng

> Token có chữ ký điện tử để đảm bảo không bị làm giả

Hy vọng qua bài viết này, các bạn có thể thuộc làu và giải thích được cơ chế token cho những người ngoại đạo biết nó là gì, vận hành ra làm sao.

Đọc tiếp

- [Authentication bằng Token - Bài 1: cơ chế authentication bằng token](/2019-10-01-giai-thich-authentication-bang-token)
- [Authentication bằng Token - Bài 2: Giới thiệu JWT](/2019-10-02-giai-thich-jwt-la-gi)
- [Authentication bằng Token - Bài 3: Hướng dẫn authentication với React]
- [Bảo mật web - Một số kiểu tấn công](/2018-11-18-mot-so-van-de-can-quan-tam-de-bao-mat-web)


<a target="_blank" rel="noopener noreferrer" href="https://www.jvandemo.com/simple-metaphor-to-understand-and-remember-how-token-based-authentication-works/
">📜 Simple metaphor to easily understand and remember how token-based authentication works</a>


