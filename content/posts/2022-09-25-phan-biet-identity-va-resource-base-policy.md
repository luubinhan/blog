---
slug: "2022-09-25-phan-biet-identity-va-resource-base-policy"
date: "2022-09-25"
title: "Phân biệt sự khác nhau giữa Identity và Resource Base Policy trong AWS IAM"
desc: "Series một số kiến thức cần có để lấy chứng chỉ AWS"
tags: ["aws", "beginner"]
canonical_url: false
---

**IDENTITY**-based policy gán cho `user`, `group`, hoặc `role` (gọi chung là `identity`). Chỉ định những quyền gì mà *identity* có thể làm
**RESOURCE**-based policy gán cho *resource*, ví dụ như S3 bucket, SQS queue, VPC endpooint

Trong tình huống `user` *không được cấp quyền* trên S3 bucket A (không được cấp không đồng nghĩa với việc bị cấm), nhưng resource policy đang gán cho bucket A cho phép mọi user upload vào bucket này, thì `user` vẫn có thể upload

Ví dụ, có *identity policy*

- User A: List, Read trên resource A
- User B: List, Read trên resource B, C
- User C: List, Read, Write trên Resource A,B,C
- User D: Không có policy nào cả

Tiếp đó chúng ta có *resource policy*

- Resource A: User A = (List, Read), User C = (List, Read)
- Resource B: User B = (List, Write), User D = (List, Read)
- Resouce C: User B = Denied Access, User D: Full Access

Thì kết quả từ 2 policy khi áp dụng sẽ là

|  | LIST | READ | WRITE | DENIED | FULL ACCCESS | 
|--|--|--|--|--|--|
| User A | RES A | RES A | 🚫 | 🚫 | 🚫 | 
|  User B | RES B | RES B  | RES B  | RES C | 🚫 | 
|  User C |  RES A,B,C | RES A,B,C |  RES A,B,C | 🚫 | 🚫 | 
|  User D | RES B | RES B | 🚫 | 🚫 | RES C | 

Khi **identity**-based policy kết hợp với **Permission Boundary**, lấy phần chung giữa hai tập

![](https://docs.aws.amazon.com/IAM/latest/UserGuide/images/permissions_boundary.png)

Khi **Resource**-based policy kết hợp với *identity*-based policy và permission boundary, nó hơi ngoài lề một chút, lấy tất cả những phần chung giữa ba tập hợp cộng với tất cả những gì có trong resource-base policy

![](https://docs.aws.amazon.com/IAM/latest/UserGuide/images/EffectivePermissions-rbp-boundary-id.png)

Khi kết hợp giữa tập *Service Control Policy*, *Permission boundary* và *identity-base policy*, chúng ta chỉ lấy phần tử chung của cả 3

![](https://docs.aws.amazon.com/IAM/latest/UserGuide/images/EffectivePermissions-scp-boundary-id.png)

Tham khảo thêm [# Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)