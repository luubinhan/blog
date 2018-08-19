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

<!-- TOC -->

- [Query doucment dựa trên `auth.uid`](#query-doucment-dựa-trên-authuid)
- [Query document dựa trên field](#query-document-dựa-trên-field)
- [Tính toán ràng buộc lúc query](#tính-toán-ràng-buộc-lúc-query)

<!-- /TOC -->

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

```powershell
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

Để hình dung tương quan giữa rule và lúc query, xét ví dụ rule bên dưới, collection *stories* cho phép bất kỳ user nào truy cập vào **story** documents khi giá trị của field *published* là `true`

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /stories/{storyid} {
      allow read: if resource.data.published == true || request.auth.uid == resource.data.author

      allow write: if request.auth.uid == resource.data.author;
    }
  }
}
```

Để query data ở trên

```js
db.collection('stories').where('published', '==', true).get()
```

# Tính toán ràng buộc lúc query

Trong biến `request.query` bao gồm `limit`, `offset`, và `orderBy`, ví dụ chúng ta đặt ra rule là không trả về dữ liệu nếu câu query không chứa limit hoặc limit lớn hơn quy định

```powershell
allow list: if request.query.limit <= 10
```

Một cách đầy đủ hơn, gom các điều kiện về author và publish vào trong hàm `authorOrPublished()` để tránh lập lại

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /stories/{storyid} {
      // `true` nếu story đang 'published'
      // hoặc authored = người đang request
      function authorOrPublished() {
        return resource.data.published == true || request.auth.uid == resource.data.author;
      }

      allow list: if request.query.limit <= 10 &&
                     authorOrPublished();

      allow get: if authorOrPublished();
      
      allow write: if request.auth.uid == resource.data.author;
    }
  }
}
```


[Link bài gốc](https://www.youtube.com/watch?v=d8qvN52Z-VU)