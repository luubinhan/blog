---
slug: "/2020-03-08-huong-dan-su-dung-react-context-nhu-the-nao-cho-hieu-qua"
date: "2020-03-08"
title: "Sử dụng React Context như thế nào cho hiệu quả"
desc: "Để có thể quản lý được state của ứng dụng một cách tốt nhất, chúng ta cần sự phân chia phù hợp giữa local state (internal state của component) và state cửa ứng dụng đặt trong React Context. Một vài điều muốn chia sẽ để nâng cao khả năng bảo trì và trải nghiệm nếu sử dụng đến context trong React."
cover: "https://miro.medium.com/max/2672/1*Y6W5NSQ_LQXLvt05q3JSkQ.jpeg"
type: "post"
lesson: 0
chapter: 0
tags: ["react", "thu-thuat"]
---


Chúng ta có một *module* (một nhánh trên cây react component cho dể hình dung) muốn sử dụng Context là `count`,  chúng ta tạo file `count-context.js`

```jsx
// src/count-context.js
import React from 'react'

const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()
```

Điều muốn nói đầu tiên là chúng ta cố tình **không khai báo giá trị khởi tạo** cho `CountStateContext`, nếu muốn bạn có thể gọi `React.createContext({count: 0})`. Khai báo một `defaultValue` chỉ hữu dụng trong trường hợp như bên dưới

```jsx
function CountDisplay() {
    const { count } = React.useContext(CountStateContext)
    return <div>{count}</div>
}
```

Vì không khai báo giá trị khởi tạo, chúng ta sẽ nhận lỗi khi viết destructure giá trị trả về từ `useContext`. Vì giá trị mặc định là `undefined` và chúng ta không thể destructure `undefined`

Không ai trong chúng ta muốn nhận lỗi do không có giá trị khởi tạo. Tuy nhiên, nếu chỉ sử dụng giá trị mặc định được cung cấp, lợi ích sẽ không nhiều bằng việc linh động giá trị này. Kinh nghiệm thực tế cho thấy khi khởi tạo và sử dụng context trong ứng dụng, chúng ta muốn các consumer context (component sử dụng `useContext`) có thể cung cấp thêm các giá trị mới.

*Trong tài liệu chính thức của React có đề cập, "cung cấp  giá trị mặc định có thế giúp việc test component độc lập mà không cần bộc chúng lại (component lồng vào nhau)". Không cùng quan điểm với ý kiến này,  cá nhân tác giả (Kent C. Dodds) cho rằng tốt hơn nên bộc component với các context cần thiết khi test. Hãy nhớ là mỗi lần chúng ta làm gì đó bên trong test, chúng ta không làm những việc như vậy trong ứng dụng, chúng ta giảm bớt sự tự tin mà unit test mang lại.*

> Lưu ý: nếu đang sử dụng Flow hay TypeScript, không cung cấp giá trị mặc định sẽ bị nhận ngay thẻ "cảnh cáo", rất phiền toái nếu sử dụng `React.useContext`. Đọc tiếp phần dưới sẽ chỉ cách khắc phục

Mục đích của `CountDispatchContext` là để làm gì. Mình đã sử dụng context trong một thời gian, và nói chuyện với một số người đang làm việc với nó, có thể chia sẻ với bạn là đây là **cách đơn giản nhất** để tránh các rắc rối với context (đặc biệt khi bạn bắt đầu sử dụng `dispatch` trong effect) khi bạn bắt đầu tách state và dispatch trong context. **Hãy tin mình!**

## Provider Component

Để các component bên dưới có thể sử dụng context module, chúng ta phải *bộc* các component lại về trong cùng một context, sử dụng với Provider Component, cái này thì ai cũng biết

```jsx
function App() {
  return (
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  )
}
```

`CountProvider` được đưa ra để xài như thế nào cho hiệu quả thì lại ích ai quan tâm, đây là cách mà `CountProvider` được đưa ra cho thế giới

```jsx
// src/count-context.js
import React from 'react'
const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}
export {CountProvider}
```

## Consumer Hook

Các thư viện sử dụng context tìm thấy trên mạng đa phần sẽ dùng cách này

```jsx
import React from 'react'
import { SomethingContext } from 'some-context-package'

function YourComponent() {
  const something = React.useContext(SomethingContext)
}
```

Để nâng cao trải nghiệm khi chúng ta sử dụng, câu lệnh này `React.useContext(SomethingContext)` cần phải thay thế. Nếu có thể viết như thế này, sẽ tuyệt vời hơn rất nhiều

```jsx
import React from 'react'
import { useSomething } from 'some-context-package'

function YourComponent() {
  const something = useSomething()
}
```

Để có thể dùng `useSomething()` như bên trên, chúng ta sẽ cần viết lại context như sau

```jsx{32-38,40-46,48}
// src/count-context.js
import React from 'react'

const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CountProvider({children}) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export {CountProvider, useCountState, useCountDispatch}
```

Chúng ta tạo `useCountState` và `useCountDispatch` hook sử dụng `React.useContext` để lấy được giá trị context cung cấp từ `CountProvider`. Tuy nhiên, nếu không có giá trị, chúng ta hiển thị thông báo lỗi để báo hook chỉ được sử dụng trong function component được render bên trong `CountProvider`. Lỗi này rất hay quên, nên nhắc trước cho tốt.

Nếu  cần sử dụng với React < 16.8.0, chúng ta dùng render-prop với Consumer Component như sau

```jsx
function CountConsumer({children}) {
  return (
    <CountStateContext.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error('CountConsumer must be used within a CountProvider')
        }
        return children(context)
      }}
    </CountStateContext.Consumer>
  )
}
```

**Nếu bạn đã dùng React cũ, hoặc là nâng cấp mới nhất, hoặc giữ nguyên tình trạng hiện tại cho an toàn?**

## TypeScript / Flow

Như đã hứa ở trên, với vấn đề `defaultValue` khi sử dụng TypeScript và Flow. Giải quyết như sau

```tsx{9-12,40-44,48-52}
// src/count-context.tsx
import * as React from 'react'

type Action = {type: 'increment'} | {type: 'decrement'}
type Dispatch = (action: Action) => void
type State = {count: number}
type CountProviderProps = {children: React.ReactNode}

const CountStateContext = React.createContext<State| undefined>(undefined)
const CountDispatchContext = React.createContext(<Dispatch | undefined>(
undefined,
)

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CountProvider({children}: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export {CountProvider, useCountState, useCountDispatch}
```

Với cách viết này, ai cũng có thể sử dụng `useCountState` hoặc `useCountDispatch` mà không cần kiểm tra `undefined`


[Xem CodeSandbox](https://codesandbox.io/s/bitter-night-i5mhj)

## Vậy còn dispatch `type`?

Nếu bạn từng viết Redux, sẽ thắc mắc "vậy action creator đâu?". Nếu *thích* bạn có thể tự viết nếu muốn. Nhưng mình không phải là *fan* của action creator (cô thư ký xinh đẹp trong [bài giải thích về Flux Pattern của mình](http://vuilaptrinh.com/2019-05-28-giai-thich-pattern-flux-trong-react/). Mình luôn cảm thấy em này khá dư thừa, không cần thiết phải phức tạp thêm một tổ chức đã quá phức tạp như Flux (**hoàn hảo không phải là không còn gì để thêm nữa mà là ko còn gì có thể bỏ đi mà**). Nếu sử dụng TypeScript hoặc Flow, nó sẽ giúp chúng ta tự điền action type có thể điền

![Sử dụng React Context như thế nào cho hiệu quả](https://kentcdodds.com/static/d99d4329b1d7ebd2e63bf76471f540ab/e3189/auto-complete.png)

![Sử dụng React Context như thế nào cho hiệu quả](https://kentcdodds.com/static/0d45ecb53470729181863636bdafc2b9/e3189/type-error.png)

Mình thích kiểu gọi `dispatch` như thế này, nếu để ý bạn sẽ biết `dispatch` sẽ không thay đổi trong suốt quá trình tồn tại của component, nghĩa là bạn có thể truyền nó vào mảng phụ thuộc của `useEffect` vô tư.

## Vậy còn các async action thì sao ?

Một câu hỏi hay, bạn gặp tình huống cần xử lý là một async (thao tác bất đồng bộ như network request) và bạn cần dispatch nhiều action cùng lúc, dispatch một action nào đó phụ thuộc vào kết quả từ dispatch trước đó? Bạn có thể làm điều đó trong component, tuy nhiên *xử lý thủ công* như thế trên từng component rất là phiền.

Mình đề nghị tạo một helper function trong context module, nhận `dispatch` và tất cả những dữ liệu bạn cần, helper function (AKA middleware) này sẽ chịu trách nhiệm xử lý tất cả những việc đã nêu trên (theo kiểu state machine)

```jsx
// user-context.js
async function updateUser(dispatch, user, updates) {
  dispatch({type: 'start update', updates})
  try {
    const updatedUser = await userClient.updateUser(user, updates)
    dispatch({type: 'finish update', updatedUser})
  } catch (error) {
    dispatch({type: 'fail update', error})
  }
}

export {UserProvider, useUserDispatch, useUserState, updateUser}
```

Sử dụng nó sẽ như thế này


```jsx
// user-profile.js
import {useUserState, useUserDispatch, updateUser} from './user-context'

function UserSettings() {
  const {user, status, error} = useUserState()
  const userDispatch = useUserDispatch()
  
  function handleSubmit(event) {
    event.preventDefault()
    updateUser(userDispatch, user, formState)
  }
  //...
}
```


## Cảm thấy tách state và dispatch rất khó chịu

Nhiều người phàn nàn tách state và dispatch riêng rất khó chịu

```js
const state = useCountState()
const dispatch = useCountDispatch()
```

Tại sao không *đơn giản* là làm thế này

```js
const [state, dispatch] = useCount()
```

Tất nhiên bạn có thể

```js
function useCount() {
  return [useCountState(), useCountDispatch()]
}
```

Cái này tùy cách nhìn nhận của từng người viết, không có chuyện ai đúng ai sai, chỉ là bạn cảm thấy *thoải mái*, *vui* hơn với cách viết nào thôi.


## Toàn bộ source code

```jsx
// src/count-context.js
import React from 'react'
const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CountProvider({children}) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export {CountProvider, useCountState, useCountDispatch}
```

Ở đây, mình đang cố tính không `export CountContext`, chúng ta chỉ cung cấp một cách để cung cấp giá trị trong context và một cách để lấy về giá trị này. Việc này đảm bảo người sử dụng giá trị context đúng theo cái cách chúng ta muốn, cho phép chúng ta hạn chế một số code không cần thiết khi lúc nào cũng phải khai báo `useContext` nào.

Hy vọng bài viết mang đến nhiều điều hữu ích cho bạn. 

**Tâm niệm rằng:**

- Không nên đặt trọn niềm tin 100% vào context có thể giải quyết **tất cả** vấn đề liên quan đến chia sẻ state
- Context không nhất thiết là một global state cho toàn bộ ứng dụng, nó có thể được áp dụng trên một phần của cây component cụ thể nào đó.
- Bạn có thể (và bạn nên) chia các logic khác nhau trên các context khác nhau.


[Code Sandbox cho bạn nào cần vọc vạch](https://codesandbox.io/s/react-codesandbox-je6cc)

[How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

[Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)

[How to optimize your context value](https://kentcdodds.com/blog/how-to-optimize-your-context-value)

