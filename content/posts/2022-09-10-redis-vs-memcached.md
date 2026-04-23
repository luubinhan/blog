---
slug: "2022-09-10-redis-vs-memcached"
date: "2022-09-10"
title: "Lựa chọn giữa Redis và Memcached"
desc: "Series một số kiến thức cần có để lấy chứng chỉ AWS"
tags: ["aws", "beginner"]
canonical_url: false
---

Cả 2 điều rất dễ sử dụng và có chung công dụng tăng cường tốc độ, tuy nhiên có những khác biệt rất quan trọng chúng ta cần biết.

**Redis** và **Memcached** là 2 thư viện nguồn mở phổ biến khi cần kho dữ liệu *in-memory*. Memcached được thiết kế với định hướng đơn giản hóa nhất, trong khi Redis sẽ hỗ trợ nhiều tính năng và phù hợp với nhiều tình huống.

|  | Memcached | Redis |
|--|--|--|
| Cấu trúc dữ liệu phức tạp |  | ✅ |
| Multithreaded | ✅ | |
| Snapshots |  | ✅ |
| Replication |  | ✅ |
| Transaction |  | ✅ |
| Pub/Sub |  | ✅ |
| Geospatial |  | ✅ |

### Chọn Memcached nếu chúng ta gặp yêu cầu

- Đơn giản hóa
- Chạy trên những *node* lớn với nhiều core, nhiều thread
- Khả năng scale out/in
- Thêm/xóa node theo yêu cầu
- Phân biệt dữ liệu giữa các *shard*

### Chọn Redis nếu chúng ta gặp yêu cầu

- Nhiều kiểu dữ liệu phức tạp như `string`, `hash`, `list`, `set`
- Cần phải **sắp xếp** dữ liệu
- Cố định *key* của store
- Cần tạo **replicate** để tối ưu việc đọc dữ liệu
- Tự động **failover** nếu node chính chết
- Cần **pub/sub**
- Khả năng **backup/restore**