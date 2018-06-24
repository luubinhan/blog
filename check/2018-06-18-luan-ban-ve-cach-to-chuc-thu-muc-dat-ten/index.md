---
path: "/2018-06-18-luan-ban-ve-cach-to-chuc-thu-muc-dat-ten"
date: "2018-06-18T13:35:13.234Z"
title: "Tiếp tục luận bàn về cách tổ chức thư mục, đặt tên component trong React"
desc: "Hổm đã viết về vấn đề này rồi, giờ lại viết tiếp, vì bản thân React cũng không ra bất cứ rule nào về việc này, bạn tự do tổ chức sao mà mình thấy hợp lý, bài trước là của tác giả đó thấy vậy là hay, bài này thì tác giả thích tổ chức thế này"
tags: ["react", "javascript"]
---

## Tổ chức thư mục

Nếu init project bằng **create-react-app**, chúng ta sẽ có sẵn những thư mục và file cơ bản nhất: *.gitinore*, *package.json*, *README.md*, *yarn.lock*, thư mục **public** và **src**

![](https://d33ypg4xwx0n86.cloudfront.net/direct?url=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*eXN1LlNnuZmosJ7n7EsJ-Q.png&resize=w704)

Chúng ta sẽ chỉ tập trung vào thư mục **src** và khoog quan tâm tới những file và thư mục ở khác.

## Containers và Components

Bên trong thư mục **src** chúng ta sẽ tạo thêm 2 thư mục là **components** và **containers**

```
src
├─ components // chứa components làm nhiệm vụ render 
└─ containers // các component xử lý logic
```

Nếu là theo cách này có một vài chổ không hợp lý

- Rất là khó để phân biệt và tách biệt 100% giữa container và presentational component, chắc chắn trong team sẽ có người là lên "em thấy cái này là container chứ sao lại là presentational được", kiểu như vậy.
- Cho phép 2 component có cùng tên với nhau, trong toàn bộ project mỗi component chỉ nên là duy nhất, tránh confuse trách nhiệm của mỗi bên.
- Tốn công, việc tách container ở một thư mục, presentationial ở thư mục khác, rất là phiền nếu muốn bay qua bay lại giữa 2 thư mục.

```
src
└─ User
  ├─ components
  └─ containers
```

Cách này thì sao? Có thể giải quyết được vấn đề bay qua bay lại ở trên, nhưng nếu có 100 cái components chung ta tiếp tục ngụp lặn trong cả trăm thư mục components containers ở khắp mọi nơi.

Theo tác giả chúng ta nên dẹp luôn khái niệm container và presentational luôn, tất cả chúng ta cần là 2 thư mục **components** và **screens**

## Tác và nhóm code lại với nhau

Bên trong thư mục *components* chúng ta group files theo module/tính năng.

```
src
└─ components
  └─ User
    ├─ Form.jsx
    └─ List.jsx
```

Khi component là kết hợp của nhiều component lại ta gom các file components vào 1 thư mục. Thí dụ nếu có thêm file `Form.css` ta sẽ làm như sau

```
src
└─ components
  └─ User
    ├─ Form
    │ ├─ Form.jsx
    │ └─ Form.css
    └─ List.jsx
```

## UI Components

Bên trong thư mục **components** ta có thể có thêm thư mục **UI**, trong đây sẽ chứa các component dạng generic. Thế nào là component generic? là những component dạng giống như những React UI Components của Sematic UI, Office Fabric UI, Reactrap.

```
src
└─ components
  └─ UI
```

## Đặt tên components

Chúng ta đã bàn về cách sắp xếp thư mục và chia các component ra dạng module. Giờ còn câu hỏi là đặt tên nó sao?

Như đã nói ở trên tên của mỗi component nên là duy nhất và gợi hình, đọc xong có thể hình dung được component đó dùng để làm gì. Việc này cũng rất có lợi trong lúc debug bằng React Dev Tools.

Pattern để đặt tên component **đường dẫn-tên file**. Thí dụ component ở file `components/User/List.jsx` thì đặt là `UserList`

Nếu `components/User/Form/Form.jsx` thì không cần đặt là `UserFormForm`, chỉ cần gọi nó là `UserForm` trong trường hợp tên file cùng tên với thư mục chứa nó.

Lợi ích của việc đặt tên như vậy là giúp chúng ta navigate đến file đó rất nhanh, đa phần các editor 'xịn' đều có thể dùng fuzzy search

![](https://d33ypg4xwx0n86.cloudfront.net/direct?url=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*vZO9Ci9a_lrfi2yTP9OiMA.png&resize=w704)

Tránh lặp lại tên, ngày xưa khi mới bắt đầu chúng ta thường đặt tên file rất là đầy đủ chuẩn không cần chỉnh, tuy nhiên việc này làm cho lúc `import` rất dài dòng, đường dẫn dài cả cây số. Trong trường hợp ở trên do `Form` đang nằm trong `User` thì ta biết ngay là `FormUser` rồi, không nên đặt tên file là `FormUser`

```jsx
import ScreenUserForm from './screens/User/UserForm';

// đấu với

import ScreenUserForm from './screens/User/Form';
```

Nếu ví dụ trên chưa đủ thuyết phục, hãy xem tiếp thêm một ví dụ khách

```jsx
import MediaPlanViewChannel from '/MediaPlan/MediaPlanView/MediaPlanViewChannel.jsx';

import MediaPlanViewChannel from './MediaPlan/View/Channel';
```

## Screens

Nãy có nói thư mục **screen** mà chưa giải thích, screens sẽ nơi chứa là những components được map vào cho `route`, như screen để tạo user mới, reset password, đăng nhập. Screen không nên chứa logic gì cả, 1 functional component, chúng ta sẽ đưa screen vào một thư mục hẳn hoi để dễ mapping đúng với structure của `route` chứ chúng ta không theo module

```
src
├─ components 
└─ screens
  └─ User
    ├─ Form.jsx
    └─ List.jsx
```

Chúng ta có file `Route.jsx`

```jsx
import React, { Component } from 'react';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import ScreensUserForm from './User/Form';
import ScreensUserList from './User/List';

const ScreensRoot = () => (
  <Router>
    <Switch>
      <Route path="/user/list" component={ScreensUserList} />
      <Route path="/user/create" component={ScreensUserForm} />
      <Route path="/user/:id" component={ScreensUserForm} />
    </Switch>
  </Router>
);

export default ScreensRoot;
```

Bằng cách này chỉ cần nhìn url ta có thể trace được đang dùng component ở thư mục nào

Về tên gọi của component trong thư mục screen này,
nếu `scr/screens/User/List.jsx` thì đặt tên là `ScreensUserList`;

Nếu bạn để ý thì sẽ thấy 2 route `create` và `edit` đang cùng được render cùng 1 component `ScreensUserForm`, cái này implement cũng dể thôi

```jsx
import React from 'react';
import UserForm from '../../components/User/Form/Form';

const ScreensUserForm = ({ match: { params } }) => (
  <div>
    <h1>
      {`${!params.id ? 'Create' : 'Update'}`} User
    </h1>
    <UserForm id={params.id} />
  </div>
);

export default ScreensUserForm;
```

Thư mục cuối cùng có như sau

```
src
├─ components 
│  ├─ User
│  │ ├─ Form
│  │ │ ├─ Form.jsx
│  │ │ └─ Form.css
│  │ └─ List.jsx
│  └─ UI 
│
└─ screens
  ├─ User
  │ ├─ Form.jsx
  │ └─ List.jsx
  └─ Root.jsx
```

## Kết luận

Trong bài này tác giả sẽ chỉ đề tập trung vào project sử dụng React, chưa đề cặp tới Redux, bài sau có.

Nếu thích thì có thể cảm ơn và follow tác giả để có thêm nhiều bài viết hay ho khác.

[Link bài gốc của Vinicius Dacal](https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)
