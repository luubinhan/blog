---
slug: "/2020-02-15-7-ly-do-chinh-dang-khuyen-ban-khong-nen-dung-typescript"
date: "2020-02-15"
title: "7 lý do bạn không nên sử dụng TypeScript"
desc: "TypeScript có phải là con ác chủ bài, ngôn ngữ của tương lai, viết TypeScript thì mọi thứ sẽ không thể nào còn lỗi, những lý do khiến bạn phải suy nghĩ lại những nhận định trên"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["dam-dao", "javascript", "typescript"]
---

<!-- TOC -->

- [Quá mạo hiểm](#quá-mạo-hiểm)
- [Quá rối rắm](#quá-rối-rắm)
- [Không giải quyết vấn đề](#không-giải-quyết-vấn-đề)
- [Chẳng thay thế, chỉ là phần mở rộng](#chẳng-thay-thế-chỉ-là-phần-mở-rộng)
- [Mã nguồn mở, có thật vậy không?](#mã-nguồn-mở-có-thật-vậy-không)
- [Các công ty lớn sử dụng...](#các-công-ty-lớn-sử-dụng)
- [Nhiều tính năng hơn](#nhiều-tính-năng-hơn)

<!-- /TOC -->

Rất nhiều người yêu TypeScript, nó _"giải quyết"_ rất nhiều vấn đề mà JS gặp phải, một ngôn ngữ _"thay thế"_ cho JS, nó sẽ báo bạn ngay nếu code bạn có _vấn đề_ và _dễ đọc_ hơn. Có nhiều nhiều lý do được đưa ra để bạn nên dùng TypeScript, bài này ngược lại đưa cho bạn 7 lý do không nên dùng TypeScript

## Quá mạo hiểm

Tại sao lại mạo hiểm? Nếu TypeScript thêm định nghĩa type và kiểm tra lúc compile, IDE còn thông báo ngay lúc nếu kiểu dữ liệu không khớp. Chính xác đó là lý do. TypeScript chỉ kiểm tra kiểu dữ liệu lúc compile và _chỉ_ sử dụng kiểu có định nghĩa. Tất cả các network call, API và thư viện bổ sung chưa có type sẽ không có cách nào tương tác với TypeScript.

Nếu trong JS, chúng ta không đặt giả định về kiểu sẽ nhận được, không tự nhủ "cái này chắc chắn" sẽ trả về kiểu `string`, chúng ta luôn biết phải kiểm tra giá trị thật sự của biến nhận được trước khi sử dụng. Với TS, bạn phụ thuộc compiler làm việc này, nhưng sẽ có rất nhiều thứ phải làm. Bạn vừa phải bỏ thời gian viết định nghĩa cho từng tỉ tỉ thứ, rồi bỏ thêm mớ thời gian để đảm bảo các định nghĩa bạn viết ra phải đúng lúc chạy, vậy mục tiêu cuối cùng của tất cả những thứ đó là gì?

## Quá rối rắm

Mặt trái của sự thật: một ngôn ngữ được kỳ vọng sẽ đem đến sự minh bạch, sạch sẽ, dễ đọc hơn lại đem đến điều người lại. Để minh họa, hãy nhìn thử một đoạn TS sau

```ts
// TODO: do this more elegantly
;((currentReducer as unknown) as Reducer<NewState,NewActions>) = nextReducer

static create: Function = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
  return new Observable<T>(subscribe);
}
```

Đóng code trên lấy từ thư viện Redux và RxJS. Nếu bạn đang viết React và thích HOC, thì bạn sẽ hiểu viết bổ sung TypeScript sẽ đem đến mồ hôi và nước mắt cho các đồng nghiệp khác như thế nào.

## Không giải quyết vấn đề

TS bảo là giải quyết các vấn đề mà JS đang gặp. Nhưng sự thật là KHÔNG. Dynamic typing chưa bao giờ là vấn đề với những lập trình viên JS (có mình luôn), bạn sẽ phàn nàn vậy "NaN === NaN" không phải là vấn đề sau, việc có cũng được không có cũng được dấu chấm phẩy `;` không phải là vấn đề à,... một vài lý do khác nữa. TypeScript cũng chẳng giải quyết như bạn tưởng tượng đâu, nó chỉ giới thiệu một chuẩn mới, làm phân cực công đồng JS thêm thôi.

Thậm chí, nếu việc thiếu type trong JS là một vấn đề, TS không giải quyết luôn. Những ngôn ngữ thật sự giải quyết nó là Java, C, C# và các ngôn ngữ `compiled`.

## Chẳng thay thế, chỉ là phần mở rộng

TS sau cùng cũng complie về JS, nó không hề là **một ngôn ngữ có thể thay thế** JS như tự sướng. Những gì TypeScript có thể làm, sẽ bị giới hạn trong những gì JS làm được. Đừng ảo tưởng với TS là bạn đã đủ chinh chiến trên mọi chiến trường, đừng tin vào lời dối trá đó, hãy tìm hiểu nhiều hơn sức mạnh thực sự của JS và linh động kiểu dữ liệu mang lại gì cho bạn, lúc đó bạn sẽ thấy mình đã tiến xa hơn những gì cái khung TS đã đóng bạn lại.

## Mã nguồn mở, có thật vậy không?

Nhiều lý do đưa ra khi sử dụng TS là vì nó mã nguồn mở. Đúng, nhưng chưa đủ. Nó vẫn chịu sự chi phối từ Microsoft, một tập đoàn độc quyền khổng lồ nổi tiếng nhất thế giới, Microsoft chia sẻ mã nguồn nó như một động thái tiếp thị và lôi kéo thêm lập trình viên. Đừng lẫn lộn giữa mã nguồn mở với sự dân chủ: Microsoft vẫn ở đây và có quyền làm mọi thứ với TS, bạn chẳng làm gì được ngoài việc đứng nhìn. JS, lại khác, được cộng đồng đảm trách, sẽ không thay đổi bất cứ thứ gì nếu không được sự đồng ý từ số đông cộng đồng.

## Các công ty lớn sử dụng...

Không ít các cá nhân có trách nhiệm lựa chọn ngôn ngữ cho dự án lại đưa đây làm một lý do để sử dụng TS. Vậy có tính đến chuyện các công ty lớn cũng có những bộ codebase cũ mèm, lỗi thời. Việc người khác chọn một thứ gì đó, chắc gì thứ đó cũng hợp với mình.

## Nhiều tính năng hơn

Xưa rồi, khi TS được giới thiệu năm 2012, các tính năng như `class` chưa có trên JS. Nhưng nay đã là 2020, hơn 8 năm nay, JS đã tiến một bước rất xa, phải nói đúng hơn là giờ TS còn phải chạy theo JS

Từ quan điểm của một cá nhân không thấy nhiều lợi ích mà TypeScript mang lại.

[7 really good reasons not to use TypeScript](https://everyday.codes/javascript/7-really-good-reasons-not-to-use-typescript/)
