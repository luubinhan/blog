---
slug: "/2019-04-12-huong-dan-tim-hieu-time-zone"
date: "2019-04-12"
title: "Tìm hiểu về Time Zone"
desc: "Cùng luận bàn những vấn đề liên quan đến time zone"
cover: "https://bs-uploads.toptal.io/blackfish-uploads/blog/article/content/cover_image_file/cover_image/11094/cover-Refresh-DateTimeManipulation-Luke_Newsletter-760e8d9895e845e072e65b1a7cc25c50.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [GMT, UTC và Offset](#gmt-utc-v%C3%A0-offset)
- [Time zone !== offset](#time-zone--offset)
  - [Summer time (DST)](#summer-time-dst)
  - [Time zone vui vui nó lại đổi](#time-zone-vui-vui-n%C3%B3-l%E1%BA%A1i-%C4%91%E1%BB%95i)
- [Time zone trong môi trường Server-Client](#time-zone-trong-m%C3%B4i-tr%C6%B0%E1%BB%9Dng-server-client)
- [Đối tượng Date trong javascript](#%C4%91%E1%BB%91i-t%C6%B0%E1%BB%A3ng-date-trong-javascript)

<!-- /TOC -->

Như Việt Nam chúng ta thì giá trị time zone chỉ có một *GMT+7*, với những nước to bự như Mỹ, Canada, Nga thì có phải tới vài ba cái time zone trong cùng một nước ( ko hiểu sao Trung Quốc thì chỉ có 1 giá trị Time zone, nên nhiều khu vực ở Trung Quốc mặt trời mọc lúc 10 AM) 

## GMT, UTC và Offset

**GMT (Greenwich Mean Time)** là thời gian tính theo cái đồng hồ Royal Observatory ở *Greenwich, UK*

**UTC** là một hệ thống tính toán thời gian quốc tế hơn, giá trị chuẩn xác hơn và được sử dụng rộng rãi hơn trong lập trình.

**Offset** 

Giá trị `+09:00` trong `UTC+09:00` nghĩa là giờ địa phương đang trước mốc giờ chuẩn UTC 9 tiếng, khoảng khác biệt giữa giờ địa phương và giờ lấy làm mốc đó gọi là offset.

Một vài nước thích đặt tên time zone của mình theo tên riêng luôn, như Hàn Quốc thì nó là `KST = UTC+09:00`, giá trị time zone này cũng là giá trị của Nhật, Indo, và vài nước khác.

Giá trị offset lại ko phải căn cứ theo giờ, mà có thể chứa cả phút nữa, như Bắc Hàn thì dùng `+08:30`, Úc `+08:45`, `+09:30` một số vùng

## Time zone !== offset

Đôi khi chúng ta hay dùng time zone và offset mang ý nghĩa tương tự nhau, như vậy thì chưa chuẩn xác. Lý do:

### Summer time (DST)

Khái niệm này sẽ không gặp ở nhiều nước, đa phần các nước ở châu  u sẽ dùng đến thuật ngữ “Summer time” này, nó có tên **khoa học** khác là **Daylight Saving Time (DST)** nghĩa là trong mùa hè thời gian nó sẽ đi trước một tiếng so với giờ chuẩn

Lấy một ví dụ, California USA dùng PST ( Pacific Standard Time) trong mùa đông và PDT (Pacific Daylight Time, `UTC-07:00`) trong mùa hè. Những khu vực sử dụng 2 time zone như vậy gọi là **Pacific Time (PT)**

Câu hỏi tiếp theo là như vậy căn cứ vào đâu để tính mùa hè và mùa đông bắt đầu/kết thúc. Phủ phàng là giá trị ngày DST ở các nước khác nhau là khác nhau và vào các năm khác nhau cũng khác nhau nốt. Như ở Canada và Mỹ, DST tính từ 2:00AM ngày chủ nhật đầu tiên của tháng 4 cho tới 12:00AM ngày chủ nhật cuối cùng tháng 10 cho tới năm 2006, nhưng sang năm 2007, thì nó từ 2:00AM ngày chủ nhật thứ 2 của tháng 3 đến 2:00AM ngày chủ nhật đầu tiên tháng 11

### Time zone vui vui nó lại đổi

Nếu bạn thấy như vậy đã đủ phức tạp, thì bạn chưa biết gì đâu, Time zone nó còn phụ thuộc vào cả tình hình kinh tế, chính trị của một nước. Cụ thể năm 2007, tổng thống George Bush ký thỏa thuận năng lượng hồi năm 2005, làm giá trị DST này thay đổi trong năm 2007.

Vì quá rắc rối và phức tạp, Nga và Hy Lạp đã ko dùng luôn DST từ năm 2011

Trước đây Samoa sử dụng `UTC-10:00`, nhưng sau này nó chuyển sang `UTC+14:00` để cắt giảm các thương vụ thất bại với Úc và New Zealand vì sự khác nhau về time zone. Vụ này lên báo toàn thế giới năm 2011, vì nó mất đi hẳn một ngày 30 tháng 12 để điều chỉnh time zone

## Time zone trong môi trường Server-Client

Bây giờ hình dung bạn làm một cái app để lên lịch công việc, bạn lấy giá trị thời điểm user. Chọn ở phía client truyền xuống server rồi lưu lại giá trị đó, sau đó giá trị này được hiển thị lên phía client

Chuyện sẽ ra sao nếu client truy xuất từ những time zone khác nhau. Thí dụ lúc tạo lịch ở Việt Nam, nhưng sau đó nó đi công tác ở Mỹ rồi mở lên xem, giá trị lưu ở phía server phải là giá trị cố định và ko phụ thuộc time zone. Như vậy client chỉ cần làm việc là hiển thị giá trị đó đúng với time zone hiện tại.

Ngoài ra, lúc user tạo một mốc thời gian, chúng ta cũng chuyển nó qua đơn vị Unix time theo chuẩn **ISO-8601** để chứa luôn thông tin offset `2017–03–10T11:30:00+09:00`. Cái chúng ta làm đó thuật ngữ chuyên ngành hay dùng 2 từ để mô tả là `parsing` và `formatting`

## Đối tượng Date trong javascript

Trong native javascript, chúng ta có đối tượng `Date` để làm việc với kiểu date, nhưng chắc không dev nào chịu xài đâu, vì nó có rất nhiều vấn đề, nên đa phần đều dùng thêm 1 thư viện bổ sung, đọc thêm bài [Vì sao quần hùng kéo nhau không xài moment.js nữa](https://luubinhan.github.io/blog/2019-03-17-vi-sao-ban-ko-nen-xai-moment-js)



<a target="_blank" rel="noopener noreferrer" href="https://medium.com/@toastui/handling-time-zone-in-javascript-547e67aa842d">Handling Time Zone in JavaScript
</a>
