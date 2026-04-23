---
slug: "2022-09-06-aws-scp-permission-boundary-iam"
date: "2022-09-06"
title: "AWS SCP là gì"
desc: "Series một số kiến thức cần có để lấy chứng chỉ AWS"
tags: ["aws", "beginner"]
canonical_url: false
---

## AWS SCP là gì

SCP là một tập hợp các rule **cấp quyền** sử dụng resource AWS trên tất cả account trong một AWS Organization

## Tại sao sử dụng SCP

Khi một tổ chức có nhiều account cần quản lý, việc quản lý sẽ khó khăn nếu chỉ sử dụng IAM

IAM cho phép chúng ta kiểm soát quyền hạn trên từng user và role của một account, nhưng nếu chúng ta cần quản lý quyền hạn trên nhiều role/nhiều account cùng lúc sẽ cần đến một công cụ bao quát hơn

>> OU (Organizational Unit) = tổ hợp các account được quản lý, SCP sẽ áp các rule trên từng OU

![](https://towardsthecloud.com/wp-content/uploads/aws-org-scp-diagram-1024x928.webp)

Như hình trên OU sẽ thường được định danh như các đơn vị *ban ngành* trong một tổ chức, chúng ta có *đội* nằm trong `Core`, đội làm `Application`, đội `Development`

> Lưu ý chỉ có thể áp tối đa **5** SCP trên một root/OU/account

Ví dụ khai báo một policy *deny* việc sử dụng AWS Shield service

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Effect": "Deny",
			"Action": ["shield:*"],
			"Resource": ["*"]
		}
	]
}
```

Vì SCP cũng có thể áp dụng trên root account, nên hãy rất cẩn thận và test kỹ trước khi áp dụng policy nào đó trên root account, tránh trường hợp mất các quyền quan trọng

## SCP vs Permission Boundary vs IAM User/Role Permission

SCP không phải chỉ để cấp quyền, nó còn có thể *deny*, có thể hình dung nó như một danh sách có thể làm gì và không được làm gì (**Deny/Allow action**) trên một nhóm đối tượng trong **Organization**

![](https://cloudacademy.com/wp-content/uploads/2021/03/Screenshot-2021-03-05-at-16.55.23.png)

| SCP | IAM Policies |
|--|--|
| Dùng với OU | Dùng với Principal (Ai) |
| Không thay thế IAM Policy | identity-base -> dùng với user, group, role. resource-base -> dùng với AWS resource như S3 |
| Dùng được với Root account | Không dùng được với Root account |
| Một account con chỉ có số quyền như account cha hoặc ít hơn | Chỉ 1 trong 2: allow hoặc deny, nếu allow thì ngầm hiểu phần còn lại deny, nếu deny ngầm hiều phần còn lại allow |

Còn về Permission Boundaries nó được sử dụng cho user/role (một IAM entity), nó cấp **maximum permission mà identity-base có thể cấp cho một IAM entity**, nó không dùng được với **resource-base**, trong khi đó SCP có thể áp dụng trên cả identity-base và resource-base

## Tóm tắt thuật ngữ
| Thuật ngữ | Giải thích |
|--|--|
| resource-base policy | policy dùng với user, group, role |
| identity-base policy | policy dùng với các service của AWS |
| Organization | Đơn vị chúng ta khai bảo để tiện quản lý |
