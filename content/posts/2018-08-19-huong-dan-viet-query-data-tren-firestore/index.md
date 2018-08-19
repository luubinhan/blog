---
slug: "/2018-08-19-huong-dan-viet-query-data-tren-firestore"
date: "2018-08-19"
title: "Hướng dẫn viết query data cho Cloud Firestore - Phần 3"
desc: "Series hướng dẫn sử dụng các service Firebase"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["firestore", "firebase"]
---

Chúng ta sẽ tiếp tục series về Firestore, nếu 2 bài trước thì chúng ta đã biết cách set security rule, giờ để xem ảnh hưởng của rule này lên lúc query data

Khi write và read documents, để tiết kiệm thời gian và resource, Cloud Firestore đánh giá các kết quả có thể xảy ra chứ không chạy qua tất cả giá trị. Nếu câu query có document mà user không có quyền truy cập, toàn bộ cái request sẽ fail

Lưu ý: cách chạy này chỉ áp dụng khi query nhiều documents từ 1 collection. Khi bạn dùng ID để truy xuất đến 1 document sẽ không giống như trên.

# Query doucment dựa trên `auth.uid`

Ví dụ bên dưới mô ta cách viết câu query để lấy documents. Hình dung database bao gồm 1 collection của documents `story`

/stories/{storyid}

```js
{
  title: "A Great Story",
  content: "Once upon a time...",
  author: "some_auth_id",
  published: false
}
```

Security rule trên story

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /stories/{storyid} {
      // Chỉ user đăng nhập có id = author
      allow read, write: if request.auth.uid == resource.data.author;
    }
  }
}
```

Câu query nếu sẽ fail vì nó không khớp với security rules ở trên, mặc dù user đăng nhập chính là author của 1 document trong collection

```js
db.collection('stories').get()
```

Trường hợp này chúng ta phải viết như sau

```js
var user  = firebase.auth().currentUser;
db.collection('stories').where('author', '==', user.uid).get()
```

# Query document dựa trên field



[Link bài gốc](https://www.youtube.com/watch?v=d8qvN52Z-VU)