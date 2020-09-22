---
slug: "/2018-10-04-huong-dan-redux-voi-ung-dung-lon"
date: "2018-10-04"
title: "Làm việc với Redux trong ứng dụng lớn"
desc: "Cùng thảo luận xung quanh vấn đề ứng dụng thiên về dữ liệu lớn, rất lớn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react", "performance"]
---

Đây là những chỉ dẫn của [AppNexus](https://www.appnexus.com/) để tối ưu redux với lượng dữ liệu khủng. Mức độ bài viết khá chuyên sâu, bạn cần nắm thật vững redux, hoặc xem lại redux để hiểu rõ và nhớ lâu nội dung bài này.

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

# View và edit nên có 2 state khác nhau

Những dữ liệu từ REST API trả về được xem là **state chuẩn**, giống hệt với database. State của ứng dụng chúng ta sẽ lưu thêm một số meta data khác cho từng user, bình thường chúng ta sẽ xử lý hết những dữ liệu trong cùng một reducer, vì nó tiện.

Nên tách việc xử lý state chuẩn trên reducer khác, **nếu tập trong tất cả xử lý trong một reducer sẽ khó maintain hơn là tách ra thành nhiều reducer riêng biệt**. (dùng `combineReducers` đấy mà)

Tại sao? Ví dụ chúng ta có 1 danh sách user, lưu dạng chỉ mục như ở trên

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

Chúng ta có màn hình để user chỉnh sửa, user click nút **Edit**, chúng ta phải update lại state để render màn hình edit, chúng ta thêm một field mới vào object như sau

```js
{
 "usersById": {
    123: {
      id: 123,
      name: "Jane Doe",
      email: "jdoe@example.com",
      phone: "555-555-5555",
      ...
      isEditing: true,
    },
    ...
  }
}
```

Submit lên trên API sau khi sửa. API trả về một object mới. Nhưng làm sau chúng ta merge lại vào store? Nếu replace toàn bộ object thì chúng ta mất cái field `isEditing`, tất nhiên là nếu muốn thì vẫn check và chỉ update những field mình muốn, nhưng như vậy rất tốn *sức người sức máy*. Tốt nhất chúng ta lưu dữ liệu từ API vào một nơi khác trong store bằng một reducer khác, không đụng gì vào nó, action cũng sẽ đơn giản hơn và dễ xử hơn

Thêm nữa, nếu user có nữa chừng ấn *cancel* chúng ta dễ dàng reverse lại nếu đưa edit state vào chổ khác

```js
"usersByIds": {
  123: {
    id: 123,
    name: "Jane Doe",
    email: "jdoe@example.com",
    phone: "555-555-5555",
    ...
  },
  ...
},
"editingUsersById": {
  123: {
    id: 123,
    name: "Jane Smith",
    email: "jsmith@example.com",
    phone: "555-555-5555",
  }
}
```
Như vậy chúng ta vẫn có state chuẩn, để reverse, edit state nếu user click edit nữa. Nói chung, tách ra, đừng gọp chung

# Xài chung state một cách khôn ngoan

Một khi ứng dụng phình ra, nhiều tính năng hơn, nên có cái reducer cho từng page, ví dụ trang hiển thị list user, lưu lại trong `users` reducer, một trang khác bao gồm tất cả post của user hiện tại. Tổ chức redux store như sau

```js
{
  "usersPage": {
    "usersById": {...},
    ...
  },
  "postsPage": {
    "postsById": {...},
    ...
  }
}
```

Mỗi trang đảm trách state của chính nó, các file reducer có thể để cùng với các file page luôn.

Sẽ đến lúc chúng ta cần chia sẻ một vài state giữa 2 view. Cân nhắc các câu hỏi sau

- Có bao nhiêu view hoặc reducer sẽ phụ thuộc vào dữ liệu này?
- Mỗi trang có cần một bản sao dữ liệu không?
- Dữ liệu thay đổi có thường xuyên không?

Ví dụ, thông tin user đang đăng nhập sẽ được hiển thị trên tất cả các trang. Tất cả trang đều dùng, thì nó sẽ không hợp lý với cách làm mỗi page một reducer. Thông tin user sẽ không đổi trên tất cả các trang (trừ khi nó vô sửa profile), vậy nên mỗi trang không cần phải có một bản sao thông tin này.

Tất cả các trang nên dùng chung một thông tin user đang login, cho nó một reducer riêng.

Trường hợp nào chuyện xài chung như vậy là ko hợp lý? Thí dụ trong các bài viết của user, nó có thêm danh sách các bình luận. Một trang hiển thị tất cả bình luận. Trang trang list post có tùy chọn hiển thị bình luận cho post đang chọn. Chúng ta có 2 trang đều phụ thuộc vào dữ liệu của bình luận. Trang list post sẽ bị thay đổi khá thường xuyên: user update, edit, delete, add post, bình luận tè le ở đó. Ở trang bình luận chỉ cho tương tác với API GET, PUT bình luận, có thể phân trang. Trang post thì ngược lại, nó chỉ lấy danh sách bình luận của chính nó. Rõ ràng, việc dùng chung bình luận giữa các view là không hợp lý. Mỗi trang nên lưu riêng một bản sao của bình luận.

# Tái sử dụng các hàm xử lý reducer

Sau một thời gian viết reducer, sẽ có lúc mình thấy mấy cái function này xử lý na ná nhau, như vậy thì nên tái sử dụng nó đừng viết mới. Ví dụ nếu logic của việc load dữ liệu bài viết và bình luận là như nhau, khác cái endpoint thôi và object schema, phân trang cũng giống.

Để dùng chung reducer, cách thứ nhất, truyền vào scope bên trong payload của action. Để dễ hình dung, lấy vị dụ một trang chứa nhiều section khác nhau, tất cả đều load bất tuần tự từ các API endpoint khác nhau, để theo dõi tình trang load này bằng state trong store

```js
const initialLoadingState = {
  usersLoading: false,
  domainsLoading: false,
  subDomainsLoading: false,
  settingsLoading: false,
};
```

Chúng ta có thể viết 4 reducer cho 4 cái action, thay vì như vậy nếu truyền thêm scope, một action `SET_LOADING`

```js

// reducer
const loadingReducer = (state = initialLoadingState, action) => {
  const { type, payload } = action;
  if (type === SET_LOADING) {
    return Object.assign({}, state, {
      // tùy theo scope mà gán cho key tương ứng
      [`${payload.scope}Loading`]: payload.loading,
    });
  } else {
    return state;
  }
}

// Action
const setLoading = (scope, loading) => {
  return {
    type: SET_LOADING,
    payload: {
      scope,
      loading,
    },
  };
}

// ví dụ gọi dispatch
store.dispatch(setLoading('users', true));
```

Làm như vậy chúng ta khử được quá nhiều lần lập lại logic của reducer.

Còn về vấn đề phân trang, API có thể trả về gần giống như sau

```js
{
  "users": ...,
  "count": 2500, // tổng số dòng
  "pageSize": 100, // số phần tử mỗi trang
  "startElement": 0, // giá trị index đầu tiên của phần từ đầu tiên
  ]
}
```

Để gọi dữ liệu trang tiếp theo, chúng ta có thể dùng tham số query `startElement=100`. Đây là cách chúng ta hiện thực reducer cho vấn đề phân trang

```js
const initialPaginationState = {
  startElement: 0,
  pageSize: 100,
  count: 0,
};
const paginationReducerFor = (prefix) => {
  const paginationReducer = (state = initialPaginationState, action) => {
    const { type, payload } = action;
    switch (type) {
      case prefix + types.SET_PAGINATION:
        const {
          startElement,
          pageSize,
          count,
        } = payload;
        return Object.assign({}, state, {
          startElement,
          pageSize,
          count,
        });
      default:
        return state;
    }
  };
  return paginationReducer;
};

// Ví dụ
const postsReducer = combineReducers({
  postsData: postsDataReducer,
  paginationData: paginationReducerFor('POSTS_'),
});
const commentsReducer = combineReducers({
  commentsData: commentsDataReducer,
  paginationData: paginationReducerFor('COMMENTS_'),
});

// Action creator

const setPaginationFor = (prefix) => { 
  const setPagination = (response) => {
    const {
      startElement,
      pageSize,
      count,
    } = response;
    return {
      type: prefix + types.SET_PAGINATION,
      payload: {
        startElement,
        pageSize,
        count,
      },
    };
  };
  return setPagination;
};
// ví dụ sử dụng
const setPostsPagination = setPaginationFor('POSTS_');
const setCommentsPagination = setPaginationFor('COMMENTS_');
```

Nếu chúng ta dispatch ra 1 action là `POSTS_SET_PAGINATION` nó sẽ chỉ đụng đến `postsReducer`. Một kiểu viết hơi tricky nếu bạn nào chưa nắm được [Closure function](https://developer.mozilla.org/vi/docs/Web/JavaScript/Closures) - mình có dịch trên MDN rồi, các bạn lên đó đọc lại.

# Tích hợp với React

Ví dụ sử dụng selector và action creator

```jsx
const ConnectedComponent = connect(
  (state) => {
    return {
      users: selectors.getCurrentUsers(state),
      editingUser: selectors.getEditingUser(state),
    };
  },
  (dispatch) => {
    const actions = {
      setPagination: actionCreatorFactories.setPaginationFor('USERS_'),
    };
    return bindActionCreators(actions, dispatch);
  })
)(UsersComponent);
```

Các component nó không cần quan tâm cái scope nào đang dùng với action và truy cập tới state bằng cách nào. Component giờ không cần quan tâm việc dữ liệu cụ thể bên trong state làm việc thế nào.

Xem thêm

- [Reselect](https://github.com/reactjs/reselect) thư viện tạo selector
- [Normalizr](https://github.com/paularmstrong/normalizr) thư viện chuẩn hóa dữ liệu JSON


[Toàn bộ vài viết](https://techblog.appnexus.com/five-tips-for-working-with-redux-in-large-applications-89452af4fdcb)