---
slug: "/2019-05-28-giai-thich-pattern-flux-trong-react"
date: "2019-05-28"
title: "Giải thích Flux Pattern theo phong cách John Wick"
desc: "Tại sao trong Redux chúng ta lại có khái niệm action, dispatch, store"
cover: "https://i.imgur.com/fbC5Rb5.jpg"
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---


## Vấn đề

Trước tiên chúng ta cần biết Flux giải quyết vấn đề gì. Flux là một pattern để xử lý luồng dữ liệu trong ứng dụng. Flux và React được sinh ra và lớn lên dưới ngôi nhà Facebook. 2 đứa chúng nó thường đi cùng nhau, có thể đi riêng nếu thích.

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/800/1*EfeNEshl8-uwZSuUw275Ag.png)

Một trong những ví dụ phổ biến mà Flux giải quyết là vòng lặp của tính năng notification. Khi đăng nhập vào Facebook, bạn thấy một thông báo mới trên icon cái chuông huyền diệu, một khi click vào cái chuông này, toàn bộ thông báo sẽ ko còn nằm trong **new message** nữa. Một vài phút sau, khi nhận được thông báo mới, cái chuông lại **rung lên**, báo bạn biết có đứa vừa tạch mạch comment gì đó, và cứ thế, vòng lặp cứ tiếp tục

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/800/1*4xc1FzIHWiyAvb1iAQKSqQ.png)

Các bạn trong team Facebook đã đề xuất một kiến trúc, khái quát lên cho luồng đi của dữ liệu, một luồng xử lý như sau, đây là các bạn ấy chia sẽ, kiến trúc thực tế có thể phức tạp hơn.

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/800/1*OcTeAqv8AU_z-O2HuucmeA.png)

Các model sẽ *nắm giữ* dữ liệu và truyền dữ liệu này xuống các cục view -> nơi sẽ render, hiển thị dữ liệu này.

Bởi vì, user tương tác thông qua view, view đôi lúc sẽ cần cập nhập lại dữ liệu của model, và đôi khi model này cần thay đổi dữ liệu trên model khác. Hơn nữa, nhiều khi một thay đổi của user kéo theo một chuỗi các thay đổi khác, có khi nó là một async. Có thể hình dung game banh bàn, bạn ko thể biết được trái banh nó sẽ đập vào đâu hết.

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/400/1*7myoHOaUyFEmPC-dj61CKw.png)

Khi ấy bạn sẽ không biết được dữ liệu bị **rơi rớt** ở đâu.

## Giải pháp của Facebook: luồng dữ liệu một chiều

Đội ngũ Facebook giải quyết bằng một kiến trúc khác, **luồng dữ liệu sẽ đi một chiều duy nhất**, một khi cần thêm dữ liệu mới, luồng lại đi từ điểm xuất phát. Và họ gọi kiến trúc đó là **Flux**

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*lZM0yU9ExEMd7DggVxXkxA.png)

Nhìn vào cái hình trên, có bạn sẽ không thấy hết được sự **ngầu** của kiến trúc này.

Nếu chỉ nhìn vào cái hình đó, không đọc tài liệu về Flux, có thể bạn sẽ chẳng hứng thú vì với nó. Nhưng một khi muốn tìm hiểu Flux, đó là kim chỉ nam trước khi đi sâu vào chi tiết từng khái niệm một.

Để **cảm** được Flux, hãy nghĩ về tổ chức trong John Wick, với những nhân vật khác nhau, nắm giữ những vai trò khác nhau.

## Giới thiệu các vai chính

### 'Bọn' action creator

Nhiệm vụ của bọn này là tạo ra action, tất cả những thay đổi, tương tác phải tới gặp bọn này. Nó giống như bọn ngồi điều hành điện thoại trong phim John Wick, những đứa khác tới đây, phát đi 1 thông điệp, action creator sẽ "định dạng" lại thông điệp đó bằng một mật mã mà tất các những đứa khác nằm trong hệ thống hiểu được.

Thông điệp được gửi đi bao gồm: kiểu thông điệp (type) và nội dung chính của thông điệp (payload). Trong đó kiểu thông điệp là một hằng số đã được định nghĩa trước đó.

**Tác dụng phụ** của một hệ thống mà toàn bộ kiểu thông điệp đã được định nghĩa sẵn, **lính mới** vào chỉ cần mở file này ra là biết được ứng dụng đang làm, sẽ có những tình huống nào sẽ làm thay đổi trạng thái dữ liệu.

### Bọn dispatcher

Trong John Wick, nói chung các bạn nên xem John Wick trước khi đọc bài này đó, bạn trực điện thoại nhận tin nhắn, format tin nhắn xong, bạn sẽ **hét** lên cho các bạn đứng trực chổ tổng đài điện thoại. Bạn **trực điện thoại** này biết danh sách các **đầu cầu** (store) cần gửi thông báo đến.

Quá trình này được thực hiện một cách **tuần tự**, không chen lấn, không xen ngang, nếu mỗi đầu cầu cần ràng buộc về thứ tự nhận thông tin, chúng ta có để anh dispatcher này quản lý.
Anh Dispatcher trong Flux sẽ khác với dispatcher trong các kiến trúc khác. Thông tin luôn được gửi đến hết các đầu cầu bất kể nó là thông tin gì. Nghĩa là mỗi đầu cầu không chỉ đăng ký một kênh thông tin nhất định, nó lắng nghe toàn bộ thông tin được gửi đi, chuyện nó quan tâm và xử lý trên từng thông tin nào là nó tự quyết định, giống như chú Bowery King nhận được yêu cầu truy sát John Wick, nhưng anh nhận tin rồi ko làm gì cả.

### Bọn đầu cầu Store

Gọi là đầu cầu thì cũng chưa đầy đủ, ngoài là nơi tiếp nhận và thực thông tin, nó còn là nơi chứa toàn bộ dữ liệu của ứng dụng, nguồn tiền của 1 tổ chức, mọi luật lệ, logic của dữ liệu sẽ nằm ở đây.

![Giải thích Flux pattern](https://media.comicbook.com/2019/05/john-wick-bowery-king-1171365-1280x0.jpeg)

Anh Store này như chú [Bowery King](https://www.imdb.com/title/tt6146586/characters/nm0000401?ref_=tt_cl_t4), khi muốn anh ấy làm gì đó, chuyển tiền, nhận tiền, đóng tiền thì bạn buộc phải làm đúng quy trình từ trên xuống dưới action creator -> dispatcher

### Bọn View

![Giải thích Flux pattern](https://m.media-amazon.com/images/M/MV5BNTQ2MWYyYTMtOTg3NC00MjA1LWFmMTUtOWRjMWViMWIxZTBmXkEyXkFqcGdeQXVyNTc5OTMwOTQ@._V1_SY1000_CR0,0,1499,1000_AL_.jpg)

Nhận dữ liệu, thay đổi thông tin hiển thị, tiếp nhận dữ liệu từ user đưa ngược lên lại tổ chức là công dụng toàn bộ của bọn này.

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/800/1*MY5xNk_JeKvGsGdywYD4EA.png)

Tổng hợp lại chúng ta có sơ đồ vận hành của tổ chức này như sau

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*GHrusKRFhQ0Y6rrwjqI6QQ.png)

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*66hoDpUhczSXrgH2cUUasw.png)

Trong hình minh họa trên, còn một đứa nữa đứng giữa View và Store, được gọi là controller view, một dạng của **người đưa tin**, nó sẽ nhận thông báo từ đầu cầu store khi có dữ liệu thay đổi.

Khi user gửi đi một thông báo đến View

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*SusQ7Aip2fSWg6raQtPSnA.png)

Thông tin được gửi lại action creator

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*dkm9qsWuD9DtXzH-u-DjJQ.png)

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*RLrImTDeArSMoA4kZsajLQ.png)

![Giải thích Flux pattern](https://cdn-images-1.medium.com/max/1600/1*fWBaUg9-_1-V5M2YQBWhWg.png)



<a target="_blank" rel="noopener noreferrer" href="https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207">A cartoon guide to Flux
</a>




