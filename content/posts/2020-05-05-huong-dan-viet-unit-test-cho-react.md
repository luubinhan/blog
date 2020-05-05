---
slug: "/2020-05-05-huong-dan-viet-unit-test-cho-react"
date: "2020-05-05"
title: "Hướng dẫn viết unit test trong React"
desc: "Một bài viết tổng hợp, sẽ cố gắng đề cập càng nhiều càng tốt các vấn đề có thể gặp khi đụng đến unit test với React."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---


[Toàn bộ project để bạn tham khảo](https://github.com/iqbal125/react-hooks-testing-complete)

## Tại sao phải test?

Rất hiển nhiên là chúng ta viết test nhằm mục đích hạn chế được càng nhiều lõi càng tốt, đảm bảo những gì chúng ta viết ra chạy đúng như chúng ta mong muốn. Một vài *điểm trừ* khi chúng ta *phải* viết test

1. Là nó tốn thời gian và tương đối khó khăn (dù là lập trình viên kinh nghiệm cũng gặp không ít vất vả khi mới bắt đầu viết test)
2. Test pass không có nghĩa ứng dụng, function của chúng ta chạy đúng 100%
3. Cũng đôi khi, test fail, nhưng ứng dụng, function vẫn chạy hoàn toàn bình thường
4. Trong vài trường hợp đặc biệt, chạy test trong CI có thể tốn tiền

## Test cái gì?

Test các chức năng, function của ứng dụng, những cái mà user sẽ sử dụng. Nó giúp chúng ta tự tin vỗ ngực, ứng dụng đáp ứng đúng nhu cầu sử dụng

## Không test cái gì

Thích quan điểm của Kent C về việc không nên đi quá chi tiết việc hiện thực. Việc mà code nó hiện thực như thế nào chúng ta không quan tâm, user không quan tâm, chúng ta chỉ quan tâm đầu vào-đầu ra của một function.

Các thư viện của người khác viết cũng là thứ không cần thiết phải test, nó là trách nhiệm của người viết thư viện. Nếu không tin thì đừng dùng nó. Còn nếu thật sự có tâm bạn hãy hỗ trợ cho thư viện đó trên github bằng cách bổ sung test cho nó.

## Một vài triết lý cá nhân khi test

> Nhiều integration test, không dùng snapshot test, vài unit test, vài e-to-e test.

Hãy viết thật nhiều integration test, unit test thì tốt nhưng nó không thật sự là cách mà người dùng sử dụng  ứng dụng. Việc test chi tiết code hiện thực ra sao với unit test rất dễ.

Integration test nên dùng mock (dữ liệu giả lập) ít nhất có thể

Không nên test những cái tiểu tiết như *tên hàm, tên biến, cách khai báo biến số, hằng số* có hợp lý.

Lấy ví dụ, nếu chúng ta test một button và thay đổi tên function xử lý `onClick` từ `increment` sang `handleClick`, test sẽ fail nhưng mọi thứ vẫn hoạt động bình thường.

## Shallow vs mount

Mount là phần html, css, js thật sự khi chạy, như cách mà browser sẽ *thấy*, nhưng theo cách **giả lập**. Nó không có render, paint bất cứ thứ gì lên UI, nhưng làm *như thể* nó là browser thật sự và chạy code ngầm bên dưới.

Không bỏ thời gian ra để paint ra UI giúp test chạy nhanh hơn. Tuy nhiên nó vẫn chưa nhanh bằng shallow render

Đó là lý do bạn phải `unmount` và `cleanup` sau mỗi test, nếu không test này sẽ gây side-effect lên test kia.

Mount/render thường được sử dụng cho integration test và shallow sử dụng cho unit test.

Kiểu shallow render sẽ chỉ render ra một component đang test mà không bao gồm các component con, như vậy để tách biệt việc test trên từng component độc lập.

Lấy ví dụ như component cha, con như sau

```jsx
import React from 'react'

const App = () => {
    return (
        <div>
            <ChildComponent />
        </div>
    )
}

const ChildComponent = () => {
    return (
        <div>
            <p>Child component</p>
        </div>
    )
}
```

Nếu chúng ta dùng shallow render component `App`, chúng ta sẽ nhận được DOM như sau, phần `ChildComponent` sẽ không bao gồm bộ "ruột" bên trong

```html
<App>
  <div> 
    <ChildComponent /> 
  </div>
</App> 
```

Với mount, thì chúng ta có

```html
<App>
  <div> 
    <ChildComponent> 
      <div>
       <p> Child components</p>
      </div>
    </ChildComponent>
   </div>
</App> 
```

**react-testing-library** là một thư viện khá ổn cho việc viết unit test react, tuy nhiên **Enzyme** là nền tảng cần nắm chắc, chúng ta sẽ đề cập nó trước

## Enzyme

### Cài đặt

```bash
npm install enzyme enzyme-to-json enzyme-adapter-react-16
```

Sơ qua những gì chúng ta sẽ import

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Basic from '../basic_test'

import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
```

3 cái import đầu tiên là cho React và component đang test, sau đó đến phần của Enzyme, `toJson` là để chuyển shallow component của chúng ta ra thành JSON để lưu thành snapshot

Cuối cùng là Adapter để làm việc được với react 16

## Thực hiện test chi tiết với Enzyme

Chúng ta sẽ lấy một ví dụ tại sao ko nên test việc hiện thực chi tiết, với một component `<Counter />` như thế này

```jsx
import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  increment = () => {
    this.setState({count: this.state.count + 1})
  }

  // đoạn code này mặc dù ko đúng, nhưng khi test vẫn cho kết quả pass
  // <button onClick={this.incremen}>
  //   Clicked: {this.state.count}
  // </button>

  render() {
    return (
      <div>
        <button className="counter-button" onClick={this.incremen}>
          Clicked: {this.state.count}
        </button>
      </div>
  )}
}

export default Counter;
```

Trong component trên, chúng ta cố tình gõ sai chữ `incremen`, ứng dụng sẽ không chạy, nhưng khi chạy test thì vẫn pass

File test

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../counter';

import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

test('increment method increments count', (
    const wrapper = mount(<Counter />);

    expect(wrapper.instance().state.count).toBe(0)

    wrapper.instance().increment();
    expect(wrapper.instance().state.count).toBe(1)

) => {})
```

Thứ nhất là cách viết test như vậy có vấn đề, chúng **ko mô phỏng** cách mà user sẽ sử dụng, chúng ta gọi thẳng  `increment()`.

Nếu bạn simulate việc click nút button `wrapper.find('button.counter-button').simulate('click')` thay vì gọi `increment()`, test sẻ pass, nhưng *lỡ đâu*, một lần cập nhập nào đó bạn thay đổi `className` cho button, mà ko cập nhập lại test thì cũng *toang*.

**Vậy người nông dân biết phải làm sao?**

## React-testing-library

Từ thư viện `react-testing-library`, nó đưa ra một nguyên lý chung như sau

> Test càng gần với thực tế sử dụng của ứng dụng, test càng đem đến sự tự tin cho chúng ta

Hãy tâm niệm nguyên lý này trong đầu, chúng ta sẽ còn bàn tiếp về nó

### useState

Hay bắt đầu test React hook, chúng ta đã và đang sử dụng nó nhiều hơn là class component

```jsx
import React, { useState } from 'react';


const TestHook = (props) => {
  const [state, setState] = useState("Initial State")

  const changeState = () => {
    setState("Initial State Changed")
  }

  const changeNameToSteve = () => {
    props.changeName()
  }

  return (
  <div>
    <button onClick={changeState}>
      State Change Button
    </button>
    <p>{state}</p>
    <button onClick={changeNameToSteve}>
       Change Name
    </button>
    <p>{props.name}</p>
  </div>
  )
}


export default TestHook;
```

Prop sẽ được nhận từ component cha là `App`

```jsx
 const App = () => {
      const [state, setState] = useState("Some Text")
      const [name, setName] = useState("Moe")
  ...
      const changeName = () => {
        setName("Steve")
      }

      return (
        <div className="App">
         <Basic />
        <h1> Counter </h1>
         <Counter />
        <h1> Basic Hook useState </h1>
         <TestHook name={name} changeName={changeName}/>
    ...     
```

Với nguyên lý như đã nói, chúng ta sẽ thực hiện test như thế nào

Cách mà user sử dụng ứng dụng sẽ là: họ thấy một đoạn text trên UI Button, click vào, rồi thấy một kết quả sau khi click đó, một text mới xuất hiện chẳng hạn

Chúng ta cài đặt thư viện `@testing-library/react` (không phải `react-testing-library`  nhé)

```bash
npm install @testing-library/react
```

Thực hiện việc test

```js
import React from 'react'
import ReactDOM from 'react-dom'
import TestHook from '../test_hook.js'
import { render, fireEvent, cleanup } from '@testing-library/react'
import App from '..al/App'

afterEach(cleanup)

it('text in state is changed when button clicked', () => {
    const { getByText } = render(<TestHook />)
    
    expect(getByText(/Initial/i).textContent).toBe("Init State");
    
    fireEvent.click(getByText("State change Button"))

    expect(getByText(/Initial/i).textContent).toBe("Initial State Changed"))
})

it('button click changes props', () => {
    const { getByText } = render(<App><TestHook/></App>)

    expect(getByText(/Moe/i).textContent).toBe("Moe")

    fireEvent.click(getByText("Change Name"))

    expect(getByText(/Steve/i).textContent).toBe("Steve")
})
```

Vì không sử dụng shallow render, nên chúng ta phải gọi `afterEach(cleanup)` để dọn dẹp sau mỗi lực thực hiện test

`getByText` là phương thức nằm trong hàm `render`, còn vài kiểu query khác nữa, nhưng đây là kiểu mà chúng ta dùng nó nhiều nhất, có thể nói là đủ dùng.

Để test giá trị của state, chúng ta không sử dụng bất cứ tên hàm, tên biến state nào cả. Vẫn là nguyên lý "Không đi sâu vào việc thực hiện chi tiết". Vì user sẽ thấy một đoạn text trên UI, chúng ta query nó trên DOM, chúng ta cũng query button bằng cách này và bắn ra sự kiện (`fireEvent.click`). Cuối cùng chúng ta kiểm tra kết quả cuối cùng nhận được, đoạn text bị thay đổi, chứ ko kiểm tra giá trị state (mặc dù nó là tương đương)

### useReducer

Reducer chúng ta sẽ test

```js
import * as ACTIONS from './actions'

export const initialState = {
    stateprop1: false,
}

export const Reducer1 = (state = initialState, action) => {
  switch(action.type) {
    case "SUCCESS":
      return {
        ...state,
        stateprop1: true,
      }
    case "FAILURE":
      return {
        ...state,
        stateprop1: false,
      }
    default:
      return state
  }
}
```

Action

```js
export const SUCCESS = {
  type: 'SUCCESS'
}

export const FAILURE = {
  type: 'FAILURE'
}
```

Cuối cùng là component sử dụng action và reducer đã định nghĩa

```jsx
import React, { useReducer } from 'react';
import * as ACTIONS from '../store/actions'
import * as Reducer from '../store/reducer'


const TestHookReducer = () => {
  const [reducerState, dispatch] = useReducer(Reducer.Reducer1, Reducer.initialState)

  const dispatchActionSuccess = () => {
    dispatch(ACTIONS.SUCCESS)
  }

  const dispatchActionFailure = () => {
    dispatch(ACTIONS.FAILURE)
  }


  return (
    <div>
       <div>
        {reducerState.stateprop1
           ? <p>stateprop1 is true</p>
           : <p>stateprop1 is false</p>}
       </div>
       <button onClick={dispatchActionSuccess}>
         Dispatch Success
       </button>
    </div>
  )
}


export default TestHookReducer;
```

Component này sẽ đổi giá trị của `stateprop` từ `false` sang `true` bằng việc dispatch một `SUCCESS` action

Thực hiện test

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TestHookReducer from '../test_hook_reducer.js';
import {render, fireEvent, cleanup} from '@testing-library/react';
import * as Reducer from '../../store/reducer';
import * as ACTIONS from '../../store/actions';

afterEach(cleanup)

describe('test the reducer and action', () => {
    import { render } from "ejs";

    it('should return the initial state', () => {
      expect(Reducer.initialState).toEqual({ stateprop1: false })
    });

    it('should change stateprop1 from false to true', () => {
      expect(Reducer.Reducer1(Reducer.initialState, ACTIONS.SUCCESS )).toEqual({ stateprop1: true })
    })
})

it('reducer changes stateprop1 from fals to true', () => {
  const { container, getByText } = render(<TestHookReducer />)

  expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is false")

  fireEvent.click(getByText("Dispatch success"))

  expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is true")
})
```

Trước tiên chúng ta test cái reducer bên trong khối `describe`, thực hiện một test đơn giản với giá trị initial state và sau khi có action success.

Với ví dụ trên, reducer và action rất chi là đơn giản, bạn có thể nói không cần thực hiện unit test cho nó làm gì, nhưng trong thực tế sử dụng reducer sẽ không hề đơn giản thế, và việc test reducer là thực sự cần thiết, không những vậy, chúng ta còn phải test theo hướng chi tiết hiện thực bên trong.

Tiếp theo chúng ta có một test cho component, chúng ta vẫn sử dụng cách làm trước đó đã đề cập với `useState`, lấy DOM bằng cách query text và kiểm tra giá trị text sau khi có event click.

### useContext

Giờ chúng ta đi đến việc test một component con có thể cập nhập context state trong component cha.

Thường thì context sẽ được khởi tạo trong một file riêng

```js
import React from 'react'

const Context = React.createContext()

export default Context
```

Chúng ta sẽ cần một component cha, nắm giữ Context provider. Giá trị truyền vào cho provider sẽ là giá trị `state` và hàm `setState`

```js
import React, { useState } from 'react';
import TestHookContext from './components/react-testing-lib/test_hook_context';


import Context from './components/store/context';


const App = () => {
  const [state, setState] = useState("Some Text")
  

  const changeText = () => {
    setState("Some Other Text")
  }


  return (
    <div className="App">
    <h1> Basic Hook useContext</h1>
     <Context.Provider value={{changeTextProp: changeText,
                               stateProp: state
                                 }} >
        <TestHookContext />
     </Context.Provider>
    </div>
  );
}

export default App;
```

Component con, đây là component chúng ta muốn test

```js
import React, { useContext } from 'react';

import Context from '../store/context';

const TestHookContext = () => {
  const context = useContext(Context)

  return (
    <div>
    <button onClick={context.changeTextProp}>
        Change Text
    </button>
      <p>{context.stateProp}</p>
    </div>
  )
}


export default TestHookContext;
```

Lưu ý: các giá trị của `state`, khởi tạo, cập nhập điều nằm trong `App.js`, chúng ta chỉ truyền giá trị này xuống các component con thông qua context, mọi thứ điều thực hiện ở `App`, cái này quan trọng cần nhớ để hiểu lúc test

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TestHookContext from '../test_hook_context.js';
import {act, render, fireEvent, cleanup} from '@testing-library/react';
import App from '../../../App'

import Context from '../../store/context';

afterEach(cleanup)

it('context value is updated by child component', () => {
    const { container, getByText } = render(<App>
      <Context.Provider>
        <TestHookContext />
      </Context.Provider>
    </App>)

    expect(getByText(/Some/i).textContent).toBe("Some text")

    fireEvent.click(getByText("Change text"))

    expect(getByText(/Some/i).textContent).toBe("Some other text")
  })
```

Với context chúng ta cũng không hề thay đổi cách làm như với `useState`, vẫn là tìm và đặt expect thông qua kết quả nhận được cuối cùng.

Bên trong render function, chúng ta có include `<Context.Provider/>` và `<TestHookContext/>` để code dễ đọc hơn, chứ thật sự chúng ta không cần chúng. Test sẽ vẫn chạy nếu truyền vào `<App />` bên trong render function

```jsx
const { container, getByText } = render(<App />)
```

Tại sao lại như vậy?

Hãy nghĩ lại một chút về context, tất cả những state của context được handle bên trong `App.js`, vì lý do đó, đây là component chính chúng ta test, mặc dù trông thì có vẻ chúng ta test một child component sử dụng `useContext` hook. Chúng ta lại không thực hiện shallow render, mà render luôn các component con, nên dĩ nhiên `<Context.Provider />` và `<TestHookContext />` đều được render vì nó là con của `<App />`

[How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)

