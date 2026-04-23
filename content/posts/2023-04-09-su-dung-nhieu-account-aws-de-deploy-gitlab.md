---
slug: "2023-04-09-su-dung-nhieu-account-aws-de-deploy-gitlab"
date: "2023-04-09"
title: "Sử dụng nhiều AWS account trong Gitlab CI"
desc: "Một bài toán cũng quá ư phổ biến khi deploy là có nhiều môi trường khác nhau dev, qa, staging và production, và chúng ta sẽ có các tài khoản tương ứng để có đủ quyền trên môi trường đó."
cover: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*jln3oTG0bqHiHcTm6YAWbw.png"
tags: ["gitlab", "beginner", "dev-ops"]
---

<!-- TOC -->

- [Sử dụng 1 tài khoản](#sử-dụng-1-tài-khoản)
- [Nhiều tài khoản bằng biến môi trường](#nhiều-tài-khoản-bằng-biến-môi-trường)
- [Nhiều tài khoản theo environment và scope biến môi trường theo environment](#nhiều-tài-khoản-theo-environment-và-scope-biến-môi-trường-theo-environment)
- [Nhiều tài khoản bằng AWS Profile](#nhiều-tài-khoản-bằng-aws-profile)

<!-- /TOC -->

## Sử dụng 1 tài khoản

Để bắt đầu, chúng ta sử dụng 1 tài khoản để upload lên S3, chúng ta sẽ khai báo các biến môi trường sau bên trong Gitlab CI

- `AWS_S3_BUCKET`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_DEFAULT_REGION`

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*rPl9Icr-_VuZXHfSW0NCrg.png)

File pipeline `.gitlab-ci.yml`

```yaml
stages:
	- build
	- production

create file:
	stage: build
	image: alpine
	script:
		- touch foo.bar
	artifacts:
		paths:
			- foo.bar

deploy to production:
	stage: production
	image:
		name: amazon/aws-cli
		entrypoint: [""]
	script:
		- aws --version
		- aws s3 cp foo.bar s3://$AWS_S3_BUCKET/foo.txt
```

Theo mặc định các biến `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION` sẽ được AWS CLI sử dụng để authen, không cần khai báo gì thêm

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*vEKIXwu9giYQYDhVBmrT_g.png)

## Nhiều tài khoản bằng biến môi trường

Cách này không phải hay nhất nhưng đa phần chúng ta sẽ nghĩ ngay tới đó là đặt hàng loạt biến AWS khác nhau cho từng môi trường

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*oxrBcHZ7w83fDS8ej16grg.png)

Bên trong job, chúng ta sẽ lấy các biến môi trường này ra để sử dụng, khá "thủ công"

```yml
stages:
    - build
    - test
    - production

create file:
    stage: build
    image: alpine
    script:
      - touch foo.bar
    artifacts:
        paths:
        - foo.bar

deploy to test:
    stage: test
    image:
        name: amazon/aws-cli
        entrypoint: [""]
    before_script:
	    # Set lại giá trị credential
        - export AWS_ACCESS_KEY_ID=$TEST_AWS_ACCESS_KEY_ID
        - export AWS_SECRET_ACCESS_KEY=$TEST_AWS_SECRET_ACCESS_KEY
        - export AWS_DEFAULT_REGION=$TEST_AWS_DEFAULT_REGION
    script:
        - aws --version
        - aws s3 cp foo.bar s3://$TEST_AWS_S3_BUCKET/foo.txt

deploy to production:
    stage: production
    image:
        name: amazon/aws-cli
        entrypoint: [""]
    before_script:
	    # Set lại giá trị credential
        - export AWS_ACCESS_KEY_ID=$PROD_AWS_ACCESS_KEY_ID
        - export AWS_SECRET_ACCESS_KEY=$PROD_AWS_SECRET_ACCESS_KEY
        - export AWS_DEFAULT_REGION=$PROD_AWS_DEFAULT_REGION        
    script:
        - aws --version
        - aws s3 cp foo.bar s3://$PROD_AWS_S3_BUCKET/foo.txt
```

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*seYjr6dGwJ6dz3KxC-TPqw.png)

Cách này nhìn chung là dễ hiểu, dễ làm, tuy nhiên nó lại phải khai báo khá nhiều biến bên trong pipeline và quá nhiều config trên từng job

## Nhiều tài khoản theo environment và scope biến môi trường theo environment

Nếu bạn để ý bên trong phần khai báo biến môi trường, chúng ta có cột **Environment**, có nghĩa là biến có thể có scope theo từng môi trường được

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*OX--G_EvC4z_1EkawOfLwg.png)

Chúng ta cần khai báo thêm environment cho job để nó có thể sử dụng biến môi trường thuộc scope 

```yaml
deploy to test:  
    stage: test  
    ...  
    environment:  
        name: testdeploy to production:  
    stage: production  
    ...  
    environment:  
        name: production
```

Sau khi khai báo thêm biến môi trường cho job, bên trong màn hình thêm **variables** lúc này chúng ta sẽ có thêm các lựa chọn ngoài **All** như trước

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*rhppig_K2zKK88gvMqSGUw.png)

Bây giờ chúng ta chỉ cần bỏ đi prefix, đặt lại đúng tên và môi trường là xong

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*gcRkv_J8UAlP5-E9O7dsuQ.png)
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*3YNcoTVtC3_1asxMc-RzZw.png)

```yml
stages:
    - build
    - test
    - production

create file:
    stage: build
    image: alpine
    script:
      - touch foo.bar
    artifacts:
        paths:
        - foo.bar

deploy to test:
    stage: test
    image:
        name: amazon/aws-cli
        entrypoint: [""]
    script:
        - aws --version
        - aws s3 cp foo.bar s3://$AWS_S3_BUCKET/foo.txt
    environment:
        name: test        

deploy to production:
    stage: production
    image:
        name: amazon/aws-cli
        entrypoint: [""]      
    script:
        - aws --version
        - aws s3 cp foo.bar s3://$AWS_S3_BUCKET/foo.txt
    environment:
        name: production
```

Như có thể thấy, pipeline giờ gần giống như trường hợp chúng ta chỉ có 1 tài khoản, rất dễ hiểu dễ làm, không cần thêm config gì rườm rà trên file `.gitlab-ci.yml`, tuy nhiên nó vẫn có quá nhiều biến môi trường cần phải quản lý

## Nhiều tài khoản bằng AWS Profile

Bên trong Gitlab, **variables** không chỉ có thể là giá trị, nó còn có thể là **file**, chúng ta khai báo các credentials theo dạng file

Một file credentials của aws sẽ có dạng `~/.aws/credentials`

```yml
[production]
aws_access_key_id=AKIAXKYMDEKGYDJ2OT4U
aws_secret_access_key=N/T3ZafKprWt3EMnMFDQCXXXXXXXXXXXXX
region=us-east-1
[test]
aws_access_key_id=AKIA6C7LEVAXLETXGONN
aws_secret_access_key=wtilH45rB3oUyIjJnIALhOhLlyXXXXXXXXXXXXX
region=us-east-1
```

Khai báo biến `AWS_SHARED_CREDENTIALS_FILE` dạng file

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*6_L4xNcITsl1Z1Ma6mO3Qg.png)

Biến `AWS_SHARED_CREDENTIALS_FILE` lúc này sẽ chứa đường dẫn đến đến file

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*EUayc8Ef5VZBeIa1bbyeng.png)

AWS CLI một cách thần kỳ sẽ hiểu dùng file này để lấy thông tin credential, job chúng ta chỉ cần chỉ định biến `AWS_PROFILE` muốn sử dụng

```yaml
stages:
    - build
    - test
    - production

create file:
    stage: build
    image: alpine
    script:
      - touch foo.bar
    artifacts:
        paths:
        - foo.bar

deploy to test:
    stage: test
    image:
        name: amazon/aws-cli
        entrypoint: [""]
    variables:
	    ## chỉ định profile test
        AWS_PROFILE: test
    script:
        - aws --version
        - aws s3 cp foo.bar s3://$AWS_S3_BUCKET/foo.txt
    environment:
        name: test        

deploy to production:
    stage: production
    image:
        name: amazon/aws-cli
        entrypoint: [""] 
    variables:
	    # chỉ định profile production
        AWS_PROFILE: production             
    script:
        - aws --version
        - aws s3 cp foo.bar s3://$AWS_S3_BUCKET/foo.txt
    environment:
        name: production
```

Và nếu thích dùng môi trường thay vì biến, chúng ta khai báo thêm biến môi trường để map vào từng profile, tuy nhiên mình thấy nó thêm rườm rà, khuyên bạn không nên.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Hn8tRLJ3CpAtnT4f-Eyy6g.png)

Chúc các bạn thực vui!

[GitLab CI: How to Manage AWS CLI Credentials for multiple AWS Accounts in a Single Pipeline](https://medium.com/devops-with-valentine/gitlab-ci-how-to-manage-aws-cli-credentials-for-multiple-aws-accounts-in-a-single-pipeline-bb2b37972999)
Markdown selection 7246 bytes 840 words 249 lines Ln 250, Col 239HTML 4358 characters 807 words 173 paragraphs