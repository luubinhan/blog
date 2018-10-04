---
slug: "/2018-10-04-huong-dan-redux-voi-ung-dung-lon"
date: "2018-10-04"
title: "Làm việc với Redux trong ứng dụng lớn"
desc: "Cùng thảo luận xung quanh vấn đề ứng dụng thiên về dữ liệu lớn, rất lớn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

Đây là những chỉ dẫn của [AppNexus](https://www.appnexus.com/) để tối ưu redux với lượng dữ liệu khủng

# Lưu dữ liệu với chỉ mục. Truy cập bằng selector

Cách cấu trúc dữ liệu sẽ ảnh hưởng nhiều đến performance và việc tổ chức ứng dụng. Lưu dữ liệu trả về từ API theo chỉ mục (index) mang lại nhiều lợi ích. Nói nôm na, lưu theo chỉ mục tức là theo dạng object, theo cặp key-value. Tác giả Redux ( Dan Abramov ) có trình bài vấn đề này [ở đây](https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage)

Tưởng tượng chúng ta có một mảng object, được `fetch` từ REST API. Giả dụ chúng ta quyết định lưu toàn bộ xuống *store* như nó trả về. Khi chúng ta muốn lấy một object cụ thể nào đó? Phải loop qua toàn bộ, rồi muốn lưu danh sách các user đang được chọn và chưa được chọn?

Để tránh tình trạng này, lưu nó dạng chỉ mục, viết lại reducer trước khi lưu xuống store, cục dữ liệu mong muốn, (bạn nào sử dụng FireStore, NoSQL database sẽ hiểu liền tại sao)

```js
{
  "usersById": {
    123: {
      id: 123,
      name: "Jane Doe",
      email: "jdoe@example.com",
      phone: "555-555-5555",
      ...
    },
    ...
  }
}
```

Dữ liệu được cấu trúc như thế này thì giải quyết vấn đề bằng cách nào? Ví dụ, chúng ta muốn truy cập đến một user object cụ thể

```js
const user = state.usersById[userId]
```

**Không cần loop, sử dụng key để lấy trực tiếp đến object mong muốn**

Câu hỏi tiếp theo, ủa vậy sao render được danh sách user nếu dữ liệu tổ chức như vậy. Để làm chuyện đó, chúng ta viết một hàm (hàm như vậy gọi là selector) đơn giản bằng `Object.keys()`

```js
const getUsers = ({userById}) => {
  return Object.keys(usersById).map(id => usersById[id]);
}
```

Thêm một hàm nữa cho việc lấy ra danh sách user với tham số truyền vào là mảng user id

```js
const getSelectedUsers = ({ selectedUserIds, usersById }) => {
  return selectedUserIds.map((id) => usersById[id]);
}
```

Đừng lo chuyện phải viết quá nhiều hàm, viết như vậy càng dễ cho sau này maintain. Trường hợp cái model user có bị thay đổi đi nữa, chúng ta không cần phải update cả trăm cái view đang sử dụng dữ liệu này, đơn giản là update những hàm selector này lại, re-format dữ liệu một tí là xong.

# Tách state chuẩn ở view và edit

Những dữ liệu từ REST API trả về được xem là **state chuẩn**,
