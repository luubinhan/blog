---
slug: "2023-08-04-tranh-mat-tien-voi-lambda"
date: "2023-08-04"
title: "Lưu ý khi sử dụng AWS Lambda để tránh mất tiền"
desc: "Khi chúng ta sử dụng đúng lúc đúng nơi, những dịch vụ serverless như Lambda sẽ rẻ hơn so với hệ thống bình thường, chúng ta vẫn nghe quảng cáo nhan nhản serverless thì xài nhiêu trả nhiêu, an toàn hơn, khả năng mở rộng và phục hồi tốt hơn cách truyền thống, có thật sự đúng như quảng cáo không?"
cover: ""
tags: ["aws", "beginner", "dev-ops"]
---

<!-- TOC -->

- [Không để ý chi phí logging và monitor](#không-để-ý-chi-phí-logging-và-monitor)
- [Đọc kỹ hướng dẫn sử dụng trước khi dùng](#đọc-kỹ-hướng-dẫn-sử-dụng-trước-khi-dùng)
- [Không chịu bật thông báo](#không-chịu-bật-thông-báo)
- [Lambda gọi Lambda theo cơ chế Synchronous](#lambda-gọi-lambda-theo-cơ-chế-synchronous)
- [Không cache](#không-cache)
- [Cấp quá nhiều tài nguyên](#cấp-quá-nhiều-tài-nguyên)
- [Kiến trúc củ chuối](#kiến-trúc-củ-chuối)

<!-- /TOC -->

Vâng đúng nhưng không phải trong mọi hoàn cảnh, chiếc chìa khóa vạn năngcó thể giải quyết mọi yêu cầu hệ thống. Khi thiết kế một hệ thống chúng ta phải cân nhắc đến việc cho nó tiến hóa theo nhu cầu, cũng giống như những phần mềm chúng ta viết ra điều phải thay đổi để thích nghi và đáp ứng nhu cầu mới của khách hàng

Chúng ta cùng đi qua một vài lỗi hay gặp và cách khắc phục để tiết kiệm chi phí tối đa

## Không để ý chi phí logging và monitor

Ghi log và monitor ứng dụng để có thể tìm lỗi và phát hiện nguyên nhân gây lỗi là bắt buộc, nhưng nó đi đôi với chi phí. AWS CloudWatch tính phí cả 2 phần ghi log và lưu trữ log

Bạn sẽ ngạc nhiên khi phát hiện ra rằng chi phí cho CloudWatch đôi khi còn cao hơn cả cho Lambda và API Gateway

Để giải quyết:

1. Log `INFO` hay `ERROR` chỉ trên môi trường production
2. Chỉ giữ log thật sự hữu ích nhất để debug trên production
3. Lưu log trong 30 ngày là vừa đủ để debug mà không làm đội chi phí lưu trữ

Nếu đã có log được lưu ở một bên thứ 3 khác có thể bỏ qua log CloudWatch

## Đọc kỹ hướng dẫn sử dụng trước khi dùng

Để khỏi “hết hồn” lúc nhận bill cuối tháng, chúng ta cần biết khi bật một tính năng lên sẽ phát sinh thêm những phụ phí, rất nhiều phí chỉ được áp dụng trong những điều kiện cụ thể. Ví dụ như chọn *provisioned concurrency* cho Lambda sẽ thêm một số phụ phí

![](https://lumigo.io/wp-content/uploads/2023/07/1_ER0It8JsAuL3D1ECFlUBog-768x349.jpg)

Đừng nóng vội hãy luôn nhớ chậm lại một nhịp rồi tìm hiểu cho đầy đủ trước khi muốn sử dụng một dịch vụ nào khác.

## Không chịu bật thông báo

Mọi người cũng hay quên dùng tính năng *billing alarm* của AWS. Một công cụ tuyệt vời để báo liền cho chúng ta để biết được những khoản chi chúng ta đã bỏ ra có vượt ngoài tầm kiểm soát không

Cài đặt Billing Alarm nên là điều đầu tiên chúng ta cần làm khi sử dụng AWS trước khi mọi thứ ra vượt ra ngoài tầm kiểm soát.

## Lambda gọi Lambda theo cơ chế Synchronous

Một Lambda gọi một Lambda khác synchronous nghĩa là Lambda đầu nguồn sẽ *ngồi đợi* Lambda thứ 2 chạy xong trước khi nó tiếp tục chạy. Nó làm đội lên chi phí khá nhiều vì thời gian ngồi đợi vẫn bị tính phí, giống như lên xe taxi bạn ngồi đợi nhưng đồng hồ đếm tiền vẫn nhảy dù xe không chạy.

Hãy luôn nhớ gọi Lambda asynchronous bất cứ ở đâu cho phép

![](https://lumigo.io/wp-content/uploads/2023/07/1__Z1-AG9GVnzRSQW_a77yYQ-768x334.png)

## Không cache

Caching là người bạn thân thiết, hay khắc cốt ghi tâm điều này, caching nghĩa là Lambda sẽ không cần gọi và làm gì cả, kết quả được trả thằng ngay từ API Gateway hay CloudFront. Bên cạnh đó ở ứng dụng có thể cân nhắc sử dụng thêm dịch vụ chuyên cache như ElastiCache hay Memento, hay DynamoDB Accelerator

![](https://lumigo.io/wp-content/uploads/2023/07/0_9V50W4A0o6-r7bce-768x329.png)

## Cấp quá nhiều tài nguyên

Cấp quá nhiều memory cho Lambda cũng là một lỗi hay mắc. Lambda được tính phí theo 2 tiêu chi: lượng memory đã sử dụng và thời gian chạy của hàm.

Câu hỏi là cấp bao nhiêu cho đủ? Công cụ [Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning) sẽ giúp chúng ta xác định lượng memory cần thiết để cân bằng giữa chi phí và hiệu năng

![](https://lumigo.io/wp-content/uploads/2023/07/0_V70C8Qw83OYgW5FW.png)

## Kiến trúc củ chuối

Kiến trúc mà củ chuối quá thì hậu quả là nhản tiền, vừa tốn chi phí, hiệu năng không tối ưu và lại còn khó vận hành bảo trì

AWS có rất nhiều service để thực hiện gửi nhận message, như SNS, SQS, EventBridge, Kinesis, ưu nhược điểm là khác nhau và phải hiểu để sử dụng cho đúng mục đích, không khéo chúng ta là đi lấy giao chặt thịt heo đi giết kiến

![](https://lumigo.io/wp-content/uploads/2023/07/1_WQOGHnPyWMfVIR3yO3D0zA-768x485.jpg)

Tương tự, API Gateway cũng tốn khá khá tiền so với ALB nhưng nó có nhiều đồ chơi vượt trội hơn, tiền nào của đó thôi, liệu cơm gấp mắm

![](https://lumigo.io/wp-content/uploads/2023/07/1_gpJi-nd7tx8etGi0nvKR2A-768x383.png)

Mọi sai làm điều là một cơ hội để học hỏi, nên không sợ sai chỉ sợ không học được gì từ những gì mình đã làm sai. Chúc các bạn có một cuộc chơi đỡ tốn tiền hơn trên AWS

[Save money on Serverless: common costly mistakes and how to avoid them](https://lumigo.io/blog/save-money-on-serverless-common-costly-mistakes-and-how-to-avoid-them/)

