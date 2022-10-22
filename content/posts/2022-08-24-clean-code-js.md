---
slug: "2022-08-24-clean-code-js"
date: "2022-08-24"
title: "Nguyên lý nền tảng clean code trong JS"
desc: "Ví dụ chủ yếu bằng JS, nhưng cũng có thể áp dụng với các ngôn ngữ khác"
tags: ["javascript", "beginner"]
canonical_url: false
---

## Exit sớm khi có thể
`#exit early when possible`

![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--gFdvC2DR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-1.png)

## Rõ ràng tốt hơn thông minh
`#Be expressive, not clever`
Hàm bên trái có vẻ trong cool ngầu hơn, nhưng nếu nghĩ đến việc thay đổi một xíu logic thì hàm bên phải sẽ dễ hơn vì nó dễ đọc và dễ hiểu hơn, không cần tốn quá nhiều mana để thấu hiểu

![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--C00ZxQZ2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-2.png)

## Tên biến rành mạch
`#Make variable names descriptive`
![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--iMyCptAk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-3.png)

## Nên dùng `for-of`
Tuy không phải nhanh nhất nhưng `for-of` có nhiều điểm cộng hơn so với `for-in`, `for-i`, `forEach`

- ngắn hơn
- cho phép continue, return và break trong vòng lặp
- dễ follow hơn

![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--jGut6Jci--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-4.png)

![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--OBn52DyH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-5.png)![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--2H0zwKG2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-6.png)

## Dùng prefix `is`, `has` với các biến mang giá trị boolean

![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--3Cme03R_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-7.png)

## Tránh dùng phủ định `!`
`#Avoid double negatives`
![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--8eAJqI1M--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-8.png)
`#Avoid using “!” with “else”`
![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--mo_PlhPY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y5aubh2ycvsrxad89acx.png)

## Nối chuỗi bằng `+`
`#Prefer string interpolation over concatenation`
Dễ đọc hơn
![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--naFp1Y1E--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b86sc4fofvpj3h8j7rzc.png)

## Tránh sử dụng ternary operator để trả về giá trị boolean
`#Avoid using the ternary operator to a return boolean value`
![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--uqMPao6g--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6ki75tjajqfdz28edadc.png)

## Không sử dụng magic number
`#Avoid using “magic” numbers`
![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--DoVWaX-X--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/agjo6gso4ar0tv06k0dt.png)

## Tránh truyền hơn 2 tham số cho function
`#Avoid declaring functions with more than 2 arguments`
Nếu có nhiều hơn 2 tham số truyền vào cho function, hãy dùng object
![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--mSzEeLD5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-14.png)

## Tham số truyền vào là boolean thì dùng object
`#Prefer objects to boolean arguments`
![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--SSpeskvO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-15.png)

# Dành cho React

## Mỗi function là một DOM
`#Declare DOM only once per function`
![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--EqOya5qJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-16.png)

## Cẩn thận với `&&`
`#Mind the guard operator`
![clean code principles](https://res.cloudinary.com/practicaldev/image/fetch/s--uxYQ7Xi3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://kendsnyder.com/sandbox/clean_code/images/combined-18.png)

Lấy cảm hứng từ cuốn [The elements of style](https://www.amazon.com/Elements-Style-Fourth-William-Strunk/dp/020530902X/)
Hình ảnh từ [](https://dev.to/flatlogic/javascript-clean-code-principles-286)
