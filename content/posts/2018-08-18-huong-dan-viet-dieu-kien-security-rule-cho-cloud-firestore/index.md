---
slug: "/2018-08-17-huong-dan-viet-dieu-kien-security-rules-cho-cloud-firetore"
date: "2018-08-18"
title: "Hướng dẫn viết điều kiện security rules cho Cloud Firestore - Phần 2"
desc: "Series hướng dẫn sử dụng các service Firebase"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["firestore", "firebase"]
---

# Xác thực

Một trong những tình huống phổ biến nhất là cho phép truy cập dữ liệu nếu user đã đăng nhập (còn gọi là xác thực, authentication).

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép user truy cập document trong collection cities nếu đã đăng nhập
    match /cities/{city} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

Hoặc một tình huống phổ biến thứ 2 là cho phép user read và write lên dữ liệu của chính user đó

```powershell
services cloud.firestore {
  match /databases/{database}/documents {
    // chỉ cho phép uid khớp với userId trong document. Dùng ký tự đại diện {userId} như một biến bên trong câu điều kiện
    match /users/{userId} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

Nếu đang sử dụng Firebase Authentication, biến `request.auth` sẽ chưa thông tin của user gởi request, xem thêm chi tiết [ở đây.](https://firebase.google.com/docs/reference/rules/rules.firestore.Request#auth)

# Kiểm tra dữ liệu

Nếu muốn can thiệp việc cho phép hoặc từ chối truy cập theo dữ liệu trong document

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    // cho phép truy cập nếu giá trị của visibility bằng public
    match /cities/{city} {
      allow read: if resource.data.visibility == 'public';
    }
  }
}
```
Biến `resource` tương ứng với dữ liệu của document đang request, `request.data` sẽ là toàn bộ các field lưu trong document

Trước khi write dữ liệu xuống, chúng ta sẽ muốn kiểm tra dữ liệu đang có và dữ liệu mới. Nếu chúng ta đang set rule pending write (không write dữ liệu ngay lập tức mà đợi xí), biến `request.resource` lúc này sẽ chứa dữ liệu mới.

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow update: if request.resource.data.population > 0
      && request.resource.data.name == resource.data.name
    }
  }
}
```

# Truy cập đến các documents khác

Sử dụng `get()` và `exists()` chúng ta có thể đánh giá các request với các documents trong database. Cả hai hàm này đều yêu cầu chỉ định đường dẫn đầy đủ, và phải đưa biến theo cú pháp `$(biến)` trong đường dẫn

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      // kiểm tra user hiện tại có tồn tại bên trong collections users trước khi cho phép tạo thêm city mới
      allow create: if exists(/databases/$(database)/documents/users/$(request.auth.uid))

      // cho phép user xóa city nếu user này là admin
      allow delete: if get(/databases/$(database)/documents/users/$(request.auth.id).data.admin == true)
    }
  }
}
```

Đối với thao tác write, chúng ta có thể sử dụng `getAfter()` để truy cập dữ liệu của document sau khi thực hiện, thằng này cũng giống như `get` phải dùng đường dẫn đầy đủ.

# Hàm tùy biến

Một khi các rule security này trở nên phức tạp, chúng ta sẽ muốn gom các điều kiện này vào trong một hàm để tái sử dụng. Firestore hổ trợ luôn. Nó sẽ như Javascript, tuy nhiên không hẳn là javascript đâu, nó có một số hạn chế

- Hàm này luôn chỉ chứa 1 return, không chạy loop, gọi service bên ngoài
- Hàm có thể access được các hàm và biến có cùng scope.
- Hàm có thể gọi đến hàm khác nhưng không được recurse, tối đa là sâu đến 10 thôi.

Ví dụ kết hợp cả 2 điều kiện ở trên thành một hàm

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    function signedInOrPublic() {
      return request.auth.uid !== null || resource.data.visibility == 'public';
    }

    match /cities/{city} {
      allow read, write: if signedInOrPublic();
    }

    match /users/{user} {
      allow read, write: if signedInOrPublic();
    }
  }
}
```

[Link bài gốc](https://firebase.google.com/docs/firestore/security/rules-conditions)