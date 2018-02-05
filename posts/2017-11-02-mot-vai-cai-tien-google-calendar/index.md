---
path: "/2017-11-02-mot-vai-cai-tien-google-calendar"
date: "2017-11-02T13:35:13.234Z"
title: "Một vài cải tiến của Google Calendar"
desc: "Cách đây hơn một tuần Google Calendar vừa có nâng cấp lên bản mới, cùng nhìn thử giao diện có gì thay đổi"
tags: ["ux-ui"]
---

Cùng nhìn thử cách Google làm với:

1. Giới thiệu một tính năng mới của sản phẩm
2. Quyết định tách 2 tác vụ là **xem** và **edit** ra 2 màn hình khác nhau
3. Áp dụng Google Material Design Pattern

## Giới thiệu tính năng mới

Khi có một thay đổi về giao diện, hoặc tính năng sản phẩm sẽ có 2 mặt: người sử dụng sẽ cảm thấy rất hứng thú và một vài người thì rất sợ những thay đổi này, vì vốn đã quá quen với cách làm việc của hệ thống cũ. Giới thiệu và guide người sử dụng những thay đổi này để họ biết và chấp nhận nó là cần thiết.

![](https://cdn-images-1.medium.com/max/2000/1*jedZ6ACXCLZTIXlA2SAw3w.png)

Không ép buộc người sử dụng cập nhập tính năng mới ngay lập tức, Google hiển thị một thông báo nhỏ ở trên cùng để user biết có tính năng mới được cập nhập cho cái công cụ người dùng đã quá quen thuộc và sử dụng hàng ngày, kiểu như

> Cứ sử dụng Calendar như bình thường nhé, khi nào sẵn sàng thì cập nhập tính năng mới nè, vui lắm.

[](https://cdn-images-1.medium.com/max/2000/1*rxdA2Wzp4SmS6MleIHe7yw.png)

[](https://cdn-images-1.medium.com/max/2000/1*6aRa42RkpvmrokqUCXW9JQ.png)

Như vậy với 3 cú click chuột cùng một vài câu thông báo ngắn gọn, user có thể cập nhập Calendar lên phiên bản mới, không những thế Google còn cho phép user quay lại phiên bạn cũ nếu thấy phiên bản mới khó sử dụng, khi đó một lời mời gởi feedback sẽ được gởi cho user trả lời cầu hỏi: Điều chi đã khiến em không thích phiên bản mới của anh. 

Việc phải duy trì 2 phiên bản đồng thời như vậy chứng tỏ Google rất giàu! Một chút chi phí đó để xây dựng lòng tin vào người sử dụng, người sử dụng bị cấy trong đầu ý nghĩ "Sản phẩm của Google thì nào cũng hướng tới tốt nhất cho người sử dụng"

## Tách 2 màn hình xem và edit

Trước đây để xem những thông tin như địa điểm, mô tả, link phải chuyển tới một trang mới, bây giờ xem được trực tiếp trên một cửa sổ popup nhỏ ở ngay màn hình chính.

![](https://cdn-images-1.medium.com/max/2000/1*VPdG6U1MRMrA0_vjMd0tyQ.png)

Một ví dụ điển hình cho quyết định có nên tách trang để xem thông tin chi tiết và trang chỉnh sửa thông tin chi tiết, thường chúng ta xe gộp nó lại thành một. 

Nghe thì có vẻ là chuyện rất hiển nhiên thôi, nhưng các bạn sẽ nghe rất nhiều luồn ý kiến khác nhau từ những người làm trong team như "Tại sao không cho 2 trang thành 1 thôi, nơi user có thể có thể làm được mọi thứ, one stop solution". Nghe thì cũng rất hợp lý, nhưng khi thực hiện bạn sẽ bị một chuyện là quá nhiều control trên màn hình edit, trang nhìn sẽ vô cùng rối vì quá nhiều tính năng cần được show ra trên màn hình này, và khi có quá nhiều control trên một màn hình thì user chắc chắn bị rối. Đây là dựa trên lý thuyết JTBD - Job to be done, [Xem thêm về JTBD](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)

Thử tưởng tượng, bạn ngồi xuống sắp xếp lịch công việc trong tháng tới, tuần tới, ngày tới, có phải bạn sẽ cần lướt qua những công việc được sắp xếp trước và sau để phân bố thời gian cho hợp lý.

![](https://cdn-images-1.medium.com/max/2000/1*fW40s0zTUC1HtTK1O6SGbg.png)

Với dạng tác vụ kiểu reminder hay event, user cần set thông tin giờ và địa điểm, một popup khác với chỉ 2 field quan trọng nhất này để user có thể chỉnh sửa ngay trên màn hình chính, nếu user muốn có nhiều thay đổi hơn nữa, có thể quyết định click "More option" để tới màn hình edit

## Design Pattern 

![Trang Settings cũ và mới](https://cdn-images-1.medium.com/max/2000/1*s0wREfdCJb42NqMQlj6NTw.png)

Trang Settings của Calendar giờ cũng được 'nâng cấp' theo chuẩn Google's Material Design

Nhìn vô là thấy liền Material Design giúp cho việc chuẩn hóa các sản phẩm của Google theo UX nhanh và hiệu quả như thế nào

- Những thông tin liên quan được group vào trong Card giúp dễ scan nội dung bên trong hơn
- Bên trong Card, các cụm control như Dropdown, Checkbox, Radio được gắn liền kề với phần mô tả, thay vì trước đây user phải hướng mắt theo đường zizag trái phải, trái phải, giờ nhìn từ trên xuống là thấy liền
- Nút Back nằm trên cùng giúp Web App và Mobile App gần như giống nhau về trải nghiệm
- Chữ nghĩa cũng được sắp xếp lại theo hướng kế thừa từ to tới nhỏ, tăng độ tương phản chứ không còn mờ mờ như hồi xưa.

