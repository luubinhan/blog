---
slug: "/2018-09-18-merging-va-rebase-trong-git"
date: "2018-09-18"
title: "Merge vs Rebase trong Git"
desc: "Trong bài viết này, chúng ta sẽ so sánh giữa lệnh git rebase với git merge, những trường hợp ta có thể áp dụng rebase trong quá trình làm việc với git"
cover: "https://res.cloudinary.com/hilnmyskv/image/upload/q_auto,f_auto/v1624638022/Algolia_com_Blog_assets/Featured_images/engineering/master-git-rebase/qeawha3q6bhrfec1ohs3.png"
type: "post"
lesson: 0
chapter: 0
tags: ["git"]

---

**Merge** và **Rebase** là 2 công cụ để *trộn* 2 *branch* trong Git, mục đích sử dụng cho những tính huống khác nhau.

Một tình huống phổ biến khi sử dụng *merge*

- Tạo nhánh `my-new-feature` từ nhánh `master`
- Commit nhánh `my-new-feature` với một số thay đổi
- Tạo Pull Request: `my-new-feature` vào `master`

Sau khi `my-new-feature` được `merge` vào `master`, chúng ta sẽ có

![](https://blog-api.algolia.com/wp-content/uploads/2017/12/image5.png)

Đó là trường hợp lý tưởng rất ít khi xảy ra, 99.999999% là `my-new-feature` có vài điểm cần bổ sung sau khi review code, bug chẳng hạn, sai chính tả chẳng hạn.

- Chúng ta bổ sung 2 commit **C6** và **C7** vào nhánh `my-new-feature`
- Trong lúc đó, `master` cũng có thêm 2 commit **C8**, **C9** được `merge` vào bởi 2 bạn đồng nghiệp
- Cuối cùng PR của chúng ta cũng được `merge`

Cái history lúc này (vẫn ok chứ không vấn đề gì)

![](https://blog-api.algolia.com/wp-content/uploads/2017/12/image3-720x158.png)

Tuy nhiên, cũng là một tính huống rất hay gặp luôn, chúng ta *ôm* nhánh `my-new-feature` gần một tuần mà chưa xong, và chúng ta muốn có **C8**, **C9** đã được merge, và một cách chủ quan duy ý chí, dân dev chúng ta muốn có một cái history thật sạch đẹp, theo kiểu từng commit C4, C5, C6, C7,... là từng công việc rất cụ thể và độc lập, chúng ta không muốn gom hết một lượt đến cuối sprint rồi commit toàn bộ file là điều khiến người review code vô cùng mệt não.

![](https://blog-api.algolia.com/wp-content/uploads/2017/12/image2-720x239.png)

*Rebase giúp được gì ở tình huống này?*

Năm 2016 Github giới thiệu một cách merge PR mới: **Rebase and merge** (Gitlab sẽ là **Rebase front door**). Nó cho phép chúng ta thực hiện một thao tác **rebase** trên commit PR rồi mới thực hiện việc merge. 2 thao tác này hoàn toàn độc lập và luôn đúng theo thứ tự rebase trước, merge sau, chứ ko có ngược lại.

Tương tự như nút `Rebase and merge`, nếu dùng command

```bash
git checkout my-new-feature
git rebase master
git checkout master
git merge my-new-feature --ff
```

Bằng cách đó, history lúc này là một đường thẳng tắp

![](https://blog-api.algolia.com/wp-content/uploads/2017/12/image4-720x136.png)

> Rebase không phải để thay thế merge, `rebase` dùng để thực hiện trên nhánh feature - private branch của chúng ta, merge thực hiện trên master - share branch với đồng nghiệp

Việc `rebase` -> `merge` như thế sẽ tránh mất đi những commit C4, C5, C6, C7 trên history của nhánh `master`, như khi chỉ dùng một lệnh `merge`. Chúng ta bê nguyên cái history của nhánh `my-new-feature` lên luôn.

Vấn đề thứ 2, làm sao để **sync** nhánh `my-new-feature` với `master` (có C8, C9)?

```bash
/* lấy những thay đổi mới */
git fetch
/* checkout nhánh chúng ta muốn sync với master */
git checkout my-new-feature
/* thực hiện sync với master */
git rebase origin/master
```

![](https://blog-api.algolia.com/wp-content/uploads/2017/12/image1.png)

> Giữ nhánh `my-new-feature` cập nhập với những thay đổi mới nhất ở nhánh `master` để tránh quá nhiều conflict xảy ra khi tạo PR

Nút **Rebase and merge** không được yêu thích lắm, vì nó tạo quá nhiều conflict, nên chúng ta vẫn thường ưu ái merge hơn.

Để có một history thẳng hàng, đầy đủ tốn khá nhiều mồ hôi chứ không dễ như ăn bánh.

*Bài viết được bổ sung chỉnh sửa theo góp ý của bạn Nguyễn Thanh Nhân*

https://www.algolia.com/blog/engineering/master-git-rebase/