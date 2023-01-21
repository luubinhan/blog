---
slug: "2023-01-21-gioi-thieu-max-concurrency-lambda-sqs"
date: "2023-01-21"
title: "Giới thiệu maximum concurrency của Lambda khi sử dụng với SQS"
desc: "Khi một SQS gọi lambda function chúng ta có thể quyết định số lượng tối đa concurrency của Lambda"
tags: ["aws", "beginner"]
---

## Giới thiệu

Với SQS standard, Lambda sẽ *poll* message trên queue, lúc đầu khởi tạo 5 concurrency, khi message trên SQS tăng lên, Lambda tiếp tục tăng số lượng concurrency lên để đủ đáp ứng, tối đa *1000*

![](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2023/01/11/Lambda-processing-standard-SQS-queues.png)

Chi phí sẽ đội lên khi số lượng concurrency tăng lên quá nhiều, để ngăn chặn, chúng ta có thể *đăng ký* số lượng **reserved concurrency** cho từng Lambda function.

Khi nó chạm đến ngưỡng **reserved concurrency**, message sẽ được đẩy trả về queue, sau đó sẽ tiếp tục retry hoặc gửi vào DLQ (SQS Dead letter queue) nếu đã quá số lần retry cho phép

![](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2023/01/11/Lambda-reaching-reserved-concurrency-of-10.-1024x736.png)

**maximum concurrency** cũng khá giống với reserved concurrency, chỉ khác là nó chỉ hoạt động khi **nơi gọi Lambda là SQS**, khi đạt tới ngưỡng **maximum concurrency** Lambda sẽ ngừng lấy message từ queue, nó sẽ linh động hơn nếu chúng ta cần điều chỉnh giới hạn concurrency theo nơi gọi

![](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2023/01/11/Maximum-concurrency-is-set-to-10-for-the-SQS-queue.-1024x604.png)

Ngoài việc hạn chế Lambda dùng hết *nguồn lực* để xử lý message trên queue, chừa *sức* để xử lý những công việc đến từ các nguồn khác, nó còn tránh được việc message bị đưa về queue và đưa vào DLQ không cần thiết

## Thiết đặt

Bên trong màn hình cấu hình **Trigger** của Lambda

![](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2023/01/11/Configuring-the-maximum-concurrency-for-an-SQS-trigger-in-the-console.-879x1024.png)

Nếu sử dụng CLI

```bash
aws lambda create-event-source-mapping --function-name my-function --ScalingConfig {MaxConcurrency=2} --event-source-arn arn:aws:sqs:us-east-2:123456789012:my-queue
```

Nếu sử dụng Cloudformation

```yaml
Resources:
	MaxConcurrencyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: MyLambdaFunction
      Events:
        SQSEventFromMax:
          Type: SQS
          Properties:
            Queue: MySQSQueueArn
            BatchSize: 1
            Enabled: true
            ScalingConfig:
              MaximumConcurrency: 5
```