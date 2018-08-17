---
slug: "/2018-08-17-huong-dan-set-security-rules-cho-cloud-firétore"
date: "2018-08-17"
title: "Hướng dẫn cách cài đặt security rules cho Cloud Firestore"
desc: "Cùng nhìn lại quá trình tiến hóa của javascript trong cách sử lý flow"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["firestore", "firebase"]
---

<!-- TOC -->

- [Khai báo](#khai-báo)
- [Rules read/write](#rules-readwrite)
- [Chia nhỏ thao tác ra](#chia-nhỏ-thao-tác-ra)
- [Kế thừa](#kế-thừa)

<!-- /TOC -->

Cloud FireStore Security Rules cho phép chúng ta tùy chỉnh việc cấp quyền truy cập đến **documents** và **collection** trong database. Chúng ta có thể thiết lập quyền trên toàn bộ database hoặc một **document** xác định.

# Khai báo

Câu lệnh khai báo của Firestore Security Rules 

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    // ...
  }
}
```

`service cloud.firestore` để giới hạn chúng ta chỉ áp rule này xuống Cloud Firestore, tránh xung đột với các service khác của Firebase

`match /databases/{database}/documents` chỉ định rule này chỉ áp dụng cho các database trong project. Hiện tại mỗi project trên Firebase sẽ chỉ hổ trợ một database Firestore

# Rules read/write

Câu lệnh `match` sẽ chỉ định đường dẫn của *document* bị ảnh hưởng, bên trong đó ta dùng lệnh `allow` để diễn giải chi tiết về rule

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    // tất cả document trong collection cities
    match /cities/{city} {
      allow read: if <condition>;
      allow write: if <condition>;
    }
  }
}
```

Tất cả câu `match` phải chỉ đến **documents**, không trỏ tới **collections**, có thể dùng `match /cities/HCM` hoặc sử dụng ký tự đại diện bất kỳ document nào bên trong `cities` như ví dụ `match /cities/{city}`

# Chia nhỏ thao tác ra

Tình huống: chúng ta muốn lúc tạo có những điều khác với lúc xóa document, hoặc cho phép read 1 document nhưng không cho phép đọc toàn bộ

Câu điều kiện `read` có thể chia nhỏ ra thành `get` và `list`, trong khi `write` có thể chia nhỏ thành `create`, `update`, `delete`

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      // điều kiện trên 1 document
      allow get: if <condition>;

      // điều kiện khi queries nhiều document, hoặc gọi hết collection
      allow list: if <condition>;
    }

    match /cities/{city} {
      // lúc tạo
      allow create: if <condition>;

      // lúc update
      allow update: if <condition>;

      // lúc delete
      allow delete: if <condition>;
    }
  }
}
```

# Kế thừa

Như đã biết, nếu chưa biết thì giờ mình giải thích nhanh, database trên Firebase lưu dạng collections(giống như array), trong các collection là document (một object). Trên mỗi document nó có thể chứa các collection khác nữa. Vậy thì các rules trên document nó sẽ ảnh hưởng thế nào đến các sub collection này.

Với ví dụ ở trên, trong `cities` chúng ta chứa một sub collection là `landmarks`. Rule trên `cities` sẽ không ảnh hưởng đến `landmarks`, trừ khi chúng ta cố tình set nó như sau

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow read, write: if <condition>;
        // áp dụng luôn cho collections con
        match /landmarks/{landmark} {
          allow read, write: if <condition>;
        }
    }
  }
}
```

Khi viết lồng câu `match` như vậy, câu `match` bên dưới sẽ **luôn relative** với thằng trên. Và chúng ta cũng có thể viết như sau, kết quả tương tự với cách viết ở trên

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      match /landmarks/{landmark} {
        allow read, write: if <condition>;
      }
    }
  }
}
```

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city}/landmarks/{landmark} {
      allow read, write: if <condition>;
    }
  }
}
```

Nếu không chỉ áp dụng rule cho đúng thằng `landmarks`, sử dụng cú pháp đại diện cho toàn bộ collection nằm dưới `cities`, `{name=**}`

```powershell
service cloud.firestore {
  match /database/{database}/documents {
    match /cities/{document=**} {
      allow read, write: if <condition>;
    }
  }
}
```

Với cách viết trên toàn bộ document nằm ở `/cities/hochiminh/landmarks/landmark81`, `/cities/hochiminh/landmarks/bitexco`, `cities/hochiminh`

Nếu chúng ta viết lại `match /cities/{city}/{document=**} thì nó chỉ ảnh hưởng đến sub collection, thằng `cities/hochiminh` sẽ không bị ảnh hưởng.

Nếu có nhiều câu `allow` khớp với `match`, thì kết quả sẽ là một phép `hoặc`, bất kỳ thằng nào thõa điều kiện thì `allow`

```powershell
service cloud.firestore {
  match /databases/{database}/documents {
    // 'cities' collection.
    match /cities/{city} {
      allow read, write: if false;
    }
    // 'cities' collection hoặc subcollections.
    match /cities/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Ví dụ ở trên toàn bộ collection cities sẽ cho phép read, write vì điều kiện thứ 2 luôn `true`, mặc dù thằng trước nó luôn `false`


[Link bài gốc của Google](https://firebase.google.com/docs/firestore/security/rules-structure)
