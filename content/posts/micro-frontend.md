Micro frontend tại sao và như thế nào

## Tại sao bạn cần biết đến Micro frontend

Vấn đề cần giải quyết:

- Ứng dụng càng lúc càng phình ra về quy mô, cũng như độ phức tạp
- **Một codebase FE** duy nhất mà muốn maintain thì chỉ có *gặp ác mộng hằng đêm*
- Bạn có nhiều team FE khác nhau, mỗi team chỉ làm việc chính trên một phần tính năng nào đó rất cụ thể, chỉ 1 codebase mà hơn 5 team vào làm việc trên đó thì thôi xong
- Bạn muốn có 1 codebase viết bằng typescript, một codebase viết js, một feature được build bằng React, feature khác được build Vue

## Micro frontend là cái gì

Đây là cách tiếp cận cũng *na ná* như micro service, thay vì 1, chúng ta có nhiều codebase, và trên từng codebase chỉ quản lý một tính năng cụ thể mà thôi.

Có thể xem một ứng dụng web là một bộ kết hợp của nhiều tính năng, mỗi một tính năng như vậy được quản lý bởi một team

![A flow diagram showing 3         independent deployment pipelines for 3 different micro frontends, which         are then composed into a single app after deployment](https://microfrontends.com/img/deployment.png)

Thuật ngữ này được giới thiệu lần đầu vào 2016 bởi [Thourghtworks Tech Radar](https://www.thoughtworks.com/radar/techniques/micro-frontends)

> An architectural style where independently deliverable frontend applications are composed into a greater whole

![Micro frontends on the ThoughtWorks tech radar](https://microfrontends.com/img/radar.png)

Một cách trực quan hơn bạn có thể tham khảo hình sau

![A wireframe of an example website,         showing a container application that embeds a micro frontend within it](https://microfrontends.com/img/composition.png)

Còn đây là demo của trang microfrontends.com [https://demo.microfrontends.com/](https://demo.microfrontends.com/)

## Hiện thực hóa như thế nào

Để có thể hiện thực hóa hoàn chỉnh micro frontend sẽ bao gồm rất nhiều thứ, ở đây chỉ tóm tắt một số vấn đề cơ bản cần giải quyết

####  Tương tác giữa các ứng dụng

Một câu hỏi được đặt ra đầu tiên là nếu tách ra thành nhiều bộ source như vậy, làm sao chúng có thể nói chuyện được với nhau? Một cách tổng quát, **nên hạn chế việc trao đổi thông tin qua lại ít chừng nào tốt chừng đó**, bởi vì nếu bạn làm ngược lại, nghĩa là bạn đang lặp lại vấn đề chúng ta muốn giải quyết ngay từ đâu: **decoupling** các tính năng với nhau.

Nhưng việc trao đổi giữa các ứng dụng với nhau là không tránh khỏi và cần thiết, chúng ta chỉ tiết chế chứ không loại bỏ hết, [Custom event](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) là một cách, cách khác, lấy mô hình truyền callback và data từ trên xuống trong React để làm **kênh** trao đổi thông tin, làm như thế nó sẽ rất tường minh, cách thứ 3 là thông qua thanh đường dẫn trên trình duyệt, chút nữa nói kỹ hơn.

Tựa chung, chúng ta không share state, mà chỉ share dữ liệu trong database  như microservice.

#### Thư viện component dùng chung

#### Styling

#### Cách cách để integrate



