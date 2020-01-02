---
slug: "/2020-01-01-chi-dan-viet-redux-sao-cho-chuan"
date: "2020-01-01"
title: "Chỉ dẫn viết Redux sao cho chuẩn"
desc: "Đây không phải là quan điểm cá nhân, bài viết được dịch thuật từ tài liệu chính thức của Redux"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "react", "redux"]
---

<!-- TOC -->

- [A. Bắt buộc](#a-bắt-buộc)
  - [Ko mutate state](#ko-mutate-state)
  - [Reducer ko được có side effect](#reducer-ko-được-có-side-effect)
  - [Không đưa các giá trị Non-Serialize vào trong action và state](#không-đưa-các-giá-trị-non-serialize-vào-trong-action-và-state)
  - [Chỉ một Redux store cho app](#chỉ-một-redux-store-cho-app)
- [B. Cực kỳ khuyến khích](#b-cực-kỳ-khuyến-khích)
  - [Sử dụng Redux Toolkit để viết Redux logic](#sử-dụng-redux-toolkit-để-viết-redux-logic)
  - [Sử dụng Immer để cập nhập giá trị store](#sử-dụng-immer-để-cập-nhập-giá-trị-store)
  - [Cấu trúc file và thư mục](#cấu-trúc-file-và-thư-mục)
  - [Đưa càng nhiều logic và trong reducer càng tốt](#đưa-càng-nhiều-logic-và-trong-reducer-càng-tốt)
  - [Reducer cần nắm rõ cấu trúc của state](#reducer-cần-nắm-rõ-cấu-trúc-của-state)
  - [Đặt tên state dựa trên dữ liệu sẽ lưu](#đặt-tên-state-dựa-trên-dữ-liệu-sẽ-lưu)
  - [Xem reducer như một cỗ máy chứa và vận hành state](#xem-reducer-như-một-cỗ-máy-chứa-và-vận-hành-state)
  - [Đơn giản hóa các state chồng chéo/có quan hệ với nhau](#đơn-giản-hóa-các-state-chồng-chéocó-quan-hệ-với-nhau)
  - [Các action nên tổ chức như event, không phải setter](#các-action-nên-tổ-chức-như-event-không-phải-setter)
  - [Viết tên action có nghĩa](#viết-tên-action-có-nghĩa)
  - [Tránh dispatch các action một cách tuần tự](#tránh-dispatch-các-action-một-cách-tuần-tự)
  - [Kết nối càng nhiều component để đọc dữ liệu trong store](#kết-nối-càng-nhiều-component-để-đọc-dữ-liệu-trong-store)
  - [Sử dụng cách viết tắt cho `mapDispatch` khi dùng `connect`](#sử-dụng-cách-viết-tắt-cho-mapdispatch-khi-dùng-connect)
  - [Gọi `useSelector` nhiều lần trong function component](#gọi-useselector-nhiều-lần-trong-function-component)
  - [Sử dụng Redux DevTools](#sử-dụng-redux-devtools)
- [Khuyến khích](#khuyến-khích)
  - [Giá trị type của action nên là `domain/eventName`](#giá-trị-type-của-action-nên-là-domaineventname)
  - [Viết action sử dụng cách đặt tên chuẩn của Flux](#viết-action-sử-dụng-cách-đặt-tên-chuẩn-của-flux)
  - [Sử dụng action creator](#sử-dụng-action-creator)
  - [Sử dụng Thunk cho các logic async](#sử-dụng-thunk-cho-các-logic-async)
  - [Tách các logic phức tạp ra khỏi component](#tách-các-logic-phức-tạp-ra-khỏi-component)
  - [Sử dụng selector function để đọc dữ liệu trong store](#sử-dụng-selector-function-để-đọc-dữ-liệu-trong-store)
  - [Tránh đưa state của form vào trong redux](#tránh-đưa-state-của-form-vào-trong-redux)

<!-- /TOC -->

Tài liệu chính thức hướng dẫn viết redux sao cho ngon-sạch, bao gồm những cách làm được đề nghị, kinh nghiệm thực tế và những cách tiếp cận được khuyến khích.

Cả phần core của Redux và các tài liệu của Redux không hề là chuẩn mực bắt buộc mọi người tuân thủ, có rất nhiều cách để sử dụng Redux, cũng như có rất nhiều cách làm _đúng_ để giải quyết một vấn đề.

## A. Bắt buộc

### Ko mutate state

Chỉnh sửa state là nguyên nhân gây bug thường thấy trong Redux, như không re-render, time-travel trong Redux DevTools ko hoạt động. Tuyệt đối **KO tự chỉnh sửa giá trị của state**, bao gồm cả trong reducer và bất kỳ chỗ nào trong source code, chỉ được phép **thay thế giá trị của state**

Có thể sử dụng những công cụ như [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant), [immer](https://immerjs.github.io/immer/docs/introduction) để tránh việc vô tình chỉnh sửa state ngoài ý muốn.

### Reducer ko được có side effect

Các hàm Reducer chỉ phụ thuộc vào `state` và `action`, chỉ tính toán và trả về giá trị mới dựa vào những tham số này. **Không chạy bất kỳ logic bất đồng bộ nào (AJAX, timeout, promise), các giá trị khởi tạo một cách ngẫu nhiên Date.now, Math.random, thay đổi những giá trị bên ngoài reducer**

### Không đưa các giá trị Non-Serialize vào trong action và state

**Tránh dùng các giá trị non-serialize như Promise, Symbol, function, class instance vào trong state hoặc dispatch action.** Điều này còn nhằm đảm bảo các công như Redux DevTool chạy đúng

### Chỉ một Redux store cho app

Với một ứng dụng, **chỉ được sử dụng một Redux store, sử dụng bởi toàn bộ ứng dụng**, khai báo trong file `store.js`

Cũng không có một chỗ nào trong source được import store trực tiếp. Nó phải được truyền vào `<Provider/>`, hoặc tham chiếu thông qua middleware như Thunk.

## B. Cực kỳ khuyến khích

### Sử dụng Redux Toolkit để viết Redux logic

[Redux Toolkit](https://redux.js.org/redux-toolkit/overview/) là bộ công cụ chính thức của chúng tôi (Redux team) để phát triển redux một cách hiệu quả, chuẩn để viết logic redux của chúng tôi.

Nó bao gồm các hàm để làm việc với các trường hợp phổ biến nhất của Redux, bao gồm cài đặt store, khai báo reducer, các thư viện được sử dụng rộng rãi trong Redux như Redux Thunk, Reselect để viết các selector function.

### Sử dụng Immer để cập nhập giá trị store

Viết update cho store đôi khi rất mệt mỏi, có thể sử dụng thêm công cụ hỗ trợ [immerjs](https://immerjs.github.io/immer/docs/introduction).

### Cấu trúc file và thư mục

Về cơ bản Redux _không quan tâm cách bạn tổ chức file và thư mục_. Tuy nhiên, trong thực tế việc đặt các logic gần nhau giúp việc cập nhập code nhanh hơn.

Khuyến khích sử dụng cách tiếp cận "feature folder" hoặc [cách làm ducks](https://github.com/erikras/ducks-modular-redux) (tất cả những logic cho feature nằm trong một file duy nhất)

Một cấu trúc thư mục cơ bản sẽ gồm

```bash
-/src
--/index.tsx
--/app
---/store.ts
---/rootReducer.ts
---/App.tsx
--/common
--/features
---/todos
----/todosSlice.ts
----/Todos.tsx
```

### Đưa càng nhiều logic và trong reducer càng tốt

Nếu có thể, cố gắng đưa càng nhiều logic hoặc tính toán để có một state mới vào trong reducer càng tốt, không nên đưa vào chỗ xử lý tiền dữ liệu như các function handler click. Việc này giúp logic dễ test hơn, tránh lỗi.

Redux không thực sự quan tâm giá trị mới của state được tính toán bên trong reducer hay trong action creation. Ví dụ như Todo App, việc _toggle todo_ sẽ cập nhập lại mảng `todos` trong store. Có thể tính toán mảng `todos` mới ở cả action và reducer

```js
// Click handler:
const onTodoClicked = (id) => {
    dispatch({type: "todos/toggleTodo", payload: {id}})
}
// tính toán ở Reducer:
case "todos/toggleTodo": {
    return state.map(todo => {
        if(todo.id !== action.payload.id) return todo;
        return {...todo, id: action.payload.id};
    })
}
```

```js
// Tính toán ở action creation:
const onTodoClicked = id => {
  const newTodos = todos.map(todo => {
    if (todo.id !== id) return todo
    return { ...todo, id }
  })
  dispatch({ type: 'todos/toggleTodo', payload: { todos: newTodos } })
}
// Reducer:
case "todos/toggleTodo":
    return action.payload.todos;
```

Khuyến khích làm việc này ở reducer vì những nguyên nhân sau

- Test ở Reducer sẽ dễ hơn vì nó là pure function, chỉ cần gọi `const result = reducer(testState, action)` và đưa vào kết quả bạn expect.
- Thay đổi giá trị state luôn tuân theo quy định, không chỉnh sửa-chỉ thay thế. Rõ ràng là việc này sẽ trực quan hơn trong reducer, những nếu ngoài reducer, chúng ta dễ vô tình chỉnh sửa ngoài ý muốn
- Time-travel debug cho phép chúng ta **undo** một dispatch action, rồi **redo** thậm chí thay thế bằng một action khác. Debug sẽ dễ hơn nếu chúng ta đưa logic đó vào reducer
- Khi áp dụng nguyên tắc này, chúng biết được khi cần thay đổi, và nơi state bị thay đổi chắc chắn là trong reducer chứ không đâu khác.

Có những ngoại lệ có thể tính toán trước, như khởi tạo một ID, nhưng nên tránh là tốt nhất.

### Reducer cần nắm rõ cấu trúc của state

Các reducer do bạn viết, khi trả về một giá trị đã tính toán của state, phải viết cụ thể là trả về giá trị gì, tránh sử dụng _spread/blind return_ như sau `return action.payload` (blind return), `return {...state, ...action.payload}` (spread return). Vì như vậy, nó sẽ phụ thuộc giá trị truyền vào lúc dispatch action phải đúng với cấu trúc ban đầu. Nếu vô tình dữ liệu này không đúng cấu trúc sẽ có bug.

### Đặt tên state dựa trên dữ liệu sẽ lưu

Object truyền vào cho `combineReducers` sẽ là tên key trả về trong state. Tránh sử dụng từ `reducer` ,

Ko nên có một object state như thế này

```js
{usersReducer: {}, postsReducer: {}}
```

Nên

```js
{users: {}, posts: {}}
```

### Xem reducer như một cỗ máy chứa và vận hành state

Rất nhiều reducer của redux được viết một cách không ràng buộc như thế này, kiểm tra action, tính toán giá trị state mới mà không hề phụ thuộc tới state hiện tại. Có những trường hợp giá trị của một state phụ thuộc vào giá trị state khác, nếu không kiểm tra trước khi cập nhập, có thể dẫn đến bug

### Đơn giản hóa các state chồng chéo/có quan hệ với nhau

Rất nhiều ứng dụng cần cache các dữ liệu phức tạp trong store, dữ liệu thường có quan hệ chồng chéo trong API và phụ thuộc vào nhiều entities khác nhau (như quan hệ giữa dữ liệu Users, Posts, Comments)

Khuyến khích nên lưu dữ liệu trong store ở dạng [căn bản nhất](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/). Như vậy khi nhìn vào có thể dễ dàng biết được dựa vào ID của chúng

### Các action nên tổ chức như event, không phải setter

Chúng ta có thể truyền bất cứ giá trị gì cho `action.type`, thí dụ như `"users/update"`, `"users/updated"`, `"upload/progress"`, `"users/setUserName"`. Không sai nhưng khuyến khích nên diễn tả các `action.type` này như một event, hơn là các `setter` như vậy. Nếu diễn đạt theo kiểu setter như vậy thường dẫn tới quá nhiều action type, quá nhiều dispatcher

### Viết tên action có nghĩa

`action.type` phục vụ 2 mục đích

- reducer sẽ kiểm tra giá trị type để tính toán
- hiển thị trên công cụ redux devtool để chúng ta theo dõi

Tiếp cận action như cơ chế **event**, tên này này không cần ràng buộc với một trường cụ thể nào trong store, đặt tên sao để khi đọc vào chúng ta có thể hiểu được chuyện gì đang diễn ra trên ứng dụng (thông qua công cụ redux devtool). Tránh những cái tên quá chung chung như `SET_DATA` hay `UPDATE_STORE`.

### Tránh dispatch các action một cách tuần tự

Tránh `dispatch` nhiều action cùng lúc để thực hiện một tác vụ nào đó. Không sai, nhưng kết quả là việc update UI rất tiêu tốn công sức của trình duyệt, đôi khi có những state không truy xuất được ở một vài logic.

### Kết nối càng nhiều component để đọc dữ liệu trong store

Càng nhiều component kết nối vào store sẽ giúp hiệu năng update UI cải thiện, do biết được component nào cần và không cần update.

Có thể kết nối bằng `connect` hoặc `useSelector`

### Sử dụng cách viết tắt cho `mapDispatch` khi dùng `connect`

[Sử dụng cách viết tắt cho `mapDispatch` khi dùng `connect`](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object) nhằm đơn giản hóa code. Gần như chưa bao giờ cần phải viết `mapDispatch` như một function.

```js
import {increment, decrement, reset} from "./counterActions";

// Redux tự động dùng dispatch
// khi bạn truyền vào là một object
const actionCreators = {
  increment,
  decrement,
  reset
}

export default connect(mapState, actionCreators)(Counter);

// or
export default connect(
  mapState,
  { increment, decrement, reset }
)(Counter);
```

### Gọi `useSelector` nhiều lần trong function component

Khi sử dụng hook `useSelector`, khuyến khích dùng nhiều lần để lấy nhiều phần dữ liệu khác nhau, thay vì lấy một cục dữ liệu lớn đã bao gồm các dữ liệu nhỏ hơn bên trong. Không giống với `mapState`, `useSelector` không yêu cầu trả về object, sử dụng selector để lấy những đơn vị dữ liệu nhỏ hơn bên trong store sẽ giúp ít cho việc render nhiều lần.

### Sử dụng Redux DevTools

Học cách cài đặt và sử dụng thuần thục [Redux DevTool](https://github.com/zalmoxisus/redux-devtools-extension), nó sẽ cho phép chúng ta

- Xem lịch sử dispatch action
- Nội dung của từng action
- State cuối cùng sau khi action được dispatch
- Sự khác nhau của state trước và sau một action
- Action đã được dispatch từ đâu

## Khuyến khích

### Giá trị type của action nên là `domain/eventName`

Trước đây tài liệu Redux có đề cập và sử dụng tên như thế này `SCREAMING_SNAKE_CASE` để khai báo action type, ví dụ như `ADD_TODO` và `INCREMENT`, cách này sẽ khớp với cách đặt biến hằng số trong đa số các ngôn ngữ lập trình. Tuy nhiên viết hoa hết như vậy hơi khó đọc.

Cộng đồng lập trình viên áp dụng một cách đặt tên khác, bắt đầu là `feature` hoặc `domain` nơi action này thuộc về và theo sau là tên của kiểu action. Ngoài ra còn có nhiều cách khác như `"[Domain] Action Type"` hay `"[Login Page] Login"`, `"domain:action"`

Hàm `createSlice` trong Redux Toolkit tạo ra một action type như sau `"domain/action"`, ví dụ `todos/addTodo`. Chúng tôi khuyến khích sử dụng `domain/action` cho dễ đọc.

### Viết action sử dụng cách đặt tên chuẩn của Flux

_Flux Architechure_ chỉ yêu cầu mỗi action object phải có trường `type` và không có bất cứ ràng buộc nào khác, từ cách đặt tên cũng như trường nào nên đưa vào. Để đảm bảo nhất quán, Andrew Clark viết ra một bộ [Flux Standard Actions](https://github.com/redux-utilities/flux-standard-action) để chuẩn hóa. Tóm tắt lại bộ nội dung này, action nên là

- Luôn đặt dữ liệu trong trường `payload`
- Thêm trường `meta` cho các thông tin khác
- Thêm trường `error` cho các action báo lỗi

### Sử dụng action creator

Thuật ngữ **Action creator** có nguồn gốc từ cách tiếp cận của _Flux Architechure_, action creator **không bắt buộc**, các component và logic có thể gọi trực tiếp `dispatch({ type: "some/action"})` (action object được truyền dạng inline).

Tuy nhiên, sử dụng action creator đảm bảo tính nhất quán, đặc biệt phù hợp khi cần chuẩn bị một dữ liệu hoặc logic cho action (thí dụ như khởi tạo một giá trị ID không trùng lặp).

**Khuyến khích sử dụng action creator**. Tuy nhiên, thay vì viết tay, bạn nên sử dụng hàm `createSlice` trong bộ Redux Toolkit, nó sẽ giúp tạo một action creator và action type tự động

### Sử dụng Thunk cho các logic async

Redux được thiết kế để có thể mở rộng và middleware API được tạo ra cho phép các dạng async logic khác khau có thể cài cắm vào trong Redux store. Bằng cách đó, bạn không cần bắt buộc phải học các thư viện cụ thể nào đó như RxJS nếu không phù hợp với nhu cầu thực tế.

Kết quả cả khá nhiều middleware addon được tạo ra cho Redux và tạo ra không ít bối rối cũng như câu hỏi về nên sử dụng middleware nào.

Chúng tôi thực sự khuyến khích sử dụng [Redux Thunk](https://github.com/reduxjs/redux-thunk) như mặc định, nó có thể giải quyết hầu hết các trường hợp. Đồng thời sử dụng cú pháp `async/await` trong thunk rất dễ đọc.

Nếu bạn có như cầu sử dụng một workflow async thực sự phức tạp như cancel, debouncing, chạy logic khau khi action được dispatch, **thread chạy ngầm** có thể cân nhắc sử dụng các middleware như Redux-Saga và Redux-Observable

### Tách các logic phức tạp ra khỏi component

Chúng tôi khuyến nghị nên đưa các logic phức tạp ra khỏi component, theo tư tưởng của cách làm _container/presentational_, càng nhiều component chỉ nhận prop và hiển thị UI càng tốt, đồng thời khi phải làm việc với các logic bất tuần tự (async) bên trong component rất khó để bảo trì sau này.

Tuy nhiên, sử dụng React hook có vẻ như dễ dàng hơn trong việc quản lý các logic kiểu như fetch dữ liệu trực tiếp trong component và có thể thay thế bằng thunk trong vài trường hợp

### Sử dụng selector function để đọc dữ liệu trong store

Selector function là công cụ mạnh mẽ đề đọc các giá trị trong store. Những thư viện như Reselect cho tạo và lưu trữ các selector function, chỉ tính toán lại kết quả nếu cần thiết, là một đặc tính quan trọng để cải thiện hiệu năng.

Khuyến khích sử dụng các selector function và lưu lại kết quả đọc được từ store bất cứ khi nào có thể, tạo các selector function này bằng Reselect

Tuy nhiên, cũng không nhất thiết **bắt buộc phải** viết selector function cho tất cả các giá trị trong state. Cân nhắc các trường hay cần truy xuất và cập nhập cũng như lợi ích mang lại khi sử dụng các selector function

### Tránh đưa state của form vào trong redux

Hầu như như state của form ko nên nằm trong Redux. Dữ liệu này không thực sự phải _global_, ko cần được cache, không được sử dụng bởi nhiều component cùng lúc. Connect form vào redux cũng dẫn đến chuyện dispatch action trên tất cả các sự kiện thay đổi trong form, nó sẽ làm hiệu năng giảm trầm trọng và không mang lại nhiều hiệu quả.

Chỉ nên dữ state của form trong component và đưa toàn bộ giá trị lên store sau khi user submit form.

Chỉ duy nhất trường hợp đưa form state vào redux là hợp lý khi viết component như WYSIWYG với tính năng live preview trên các thuộc tính. Còn lại đa phần không cần thiết.

[https://redux.js.org/style-guide/style-guide/](https://redux.js.org/style-guide/style-guide/)
