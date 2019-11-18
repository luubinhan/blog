---
slug: "/2019-11-18-huong-dan-goi-fetch-api-bang-react-hook"
date: "2019-11-18"
title: "Làm sao để fetch dữ liệu bằng React Hook"
desc: "Trong bài này chúng ta sẽ sử dụng React.useState, React.useEffect, React.useReducer để fetch dữ liệu từ API, đồng thời cũng viết một custom hook để có thể sử dụng ở bất kỳ đâu"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "react"]
---

<!-- TOC -->

- [Gọi hook thủ công/bằng code](#g%e1%bb%8di-hook-th%e1%bb%a7-c%c3%b4ngb%e1%ba%b1ng-code)
- [Loading indicator](#loading-indicator)
- [Handle Error](#handle-error)
- [Fetch data với Form](#fetch-data-v%e1%bb%9bi-form)
- [Custom hook để Fetch data](#custom-hook-%c4%91%e1%bb%83-fetch-data)
- [Reducer hook](#reducer-hook)
- [Bỏ qua việc fetch data](#b%e1%bb%8f-qua-vi%e1%bb%87c-fetch-data)

<!-- /TOC -->


Chúng ta có một component, dữ liệu của component này sẽ được lấy từ API


```jsx
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({ hits: [] });
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
export default App;
```

Chúng ta sẽ sử dụng axios để fetch dữ liệu, bạn thích xài cái khác thì cứ vô tư

```jsx{7,12}
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
    setData(result.data);
  });

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
export default App;
```

Bên trong `React.useEffect` chúng ta sẽ thực hiện việc fetch data từ API, sau khi nhận được dữ liệu gán giá trị nhận được cho giá trị của state `data`

Nếu dừng ở đây, khi chạy bạn sẽ thấy một vòng lặp vô tận của việc gọi fetch data. Effect sẽ chạy không chỉ ở lúc component mount mà còn ở các lần update tiếp theo. Bởi vì chúng ta gán giá trị state trên mỗi lần fetch, component lại được update và effect lại được gọi lại để chạy. Chúng ta chỉ muốn **fetch data khi component mount lần đầu tiên**. Đó là lý do chúng ta phải thêm một mảng rỗng vào tham số thứ hai của effect, như vậy các lần update tiếp theo nó sẽ không được gọi.

```js{12}
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
    setData(result.data);
  }, []);
  
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
export default App;
```

Tham số thứ 2 truyền vào cho effect này là danh sách những giá trị nào mà hook phụ thuộc, tức nếu các giá trị này thay đổi thì effect được gọi lại. Bỏ array trống sẽ không còn chuyện chạy ở lần update.

Trong đoạn code trên vẫn còn một chỗ phải chỉnh sửa, chúng ta sử dụng `async/await`, *theo như định nghĩa*, tất cả những hàm nào là `async` sẽ được ngầm hiểu là trả về một `Promise`. Tuy nhiên, cũng *theo như định nghĩa* effect hook không được trả về gì cả, hoặc một function để clean up (xem lại bài nói về Hook Effect, có giải thích 2 loại Effect Hook).

Nên bạn mà copy đoạn trên mà chạy thì sẽ nhận thông báo bên dưới console. Không thể sử dụng async function bên trong `React.useEffect`, chúng ta sửa lại

```jsx
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
    setData(result.data);
  };
  fetchData();
}, []);
```

Để fetch dữ liệu bằng `React.useEffect` có thể tóm gọn như ở trên. Chúng ta sẽ tiếp tục xem cách handle error, loading indicator, gọi fetch từ form và làm thế nào tái sử dụng hook để fetch

## Gọi hook thủ công/bằng code

Chúng ta đã xong phần fetch dữ liệu một lần lúc component mount. Nhưng làm thế nào để fetch dữ liệu khi có sự kiện từ user, ví dụ ô search, khi user nhập lấy danh sách kết quả tìm kiếm. Ví dụ bên dưới mặc định sẽ hiển thị kết quả cho từ khóa `redux`, nếu user nhập vào một giá trị khác, chúng ta cần làm sao để chạy `useEffect` một lần nữa

```jsx
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
export default App;
```

Với nhu cầu như trên, chúng ta cần cập nhập lại `useEffect`

```js{4}
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      `http://hn.algolia.com/api/v1/search?query=${query}`,
    );
    setData(result.data);
  };
  fetchData();
}, []);
```

Tuy nhiên, nếu chỉ như vậy, hàm `fetchData` sẽ không được gọi khi user input một giá trị mới vào ô tìm kiếm. Vì chúng ta đã truyền vào một mảng rỗng vào cho giá trị `depend` của effect, nên nó chỉ chạy lần đầu mount

```js{9}
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      `http://hn.algolia.com/api/v1/search?query=${query}`,
    );
    setData(result.data);
  };
  fetchData();
}, [query]);
```

Có một vấn đề khác, user cứ nhập một ký tự, câu `fetchData` lại được gọi, gọi liên tục như vậy không hay, thêm vào một nút để user click vào mới thực hiện search thì sao

```jsx{4,23,24,25}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`,
      );
      setData(result.data);
    };
    fetchData();
  }, [query]);
  
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
```

Giờ effect phải phụ thuộc vào `search`, không chạy khi user nhập vào input

```js{4,9,14}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('redux');
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${search}`,
      );
      setData(result.data);
    };
    fetchData();
  }, [search]);
  
  return (
    ...
  );
}
```

Nhưng nếu sửa như vậy, trường hợp component được mount lần đầu, nó sẽ không có hiển thị kết quả cho từ khóa `redux` nữa. Nếu dùng thềm một `useEffect` khác cho trường hợp chạy lúc đầu sẽ gây nhầm lẫn, không rõ ràng, thay vào đó nếu chúng ta xem search state là nguyên cái `url` sẽ đơn giản hơn

```jsx{4,5,6,10,16,28}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      
      setData(result.data);
    };
    
    fetchData();
  }, [url]);
  
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
```

## Loading indicator

Một nhu cầu khác cũng hay gặp là trong lúc fetch data từ API, chúng ta cần biết trạng thái loading tới đâu rồi, chúng ta sẽ bổ sung thêm state `isLoading`

```jsx{7,11,16}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      const result = await axios(url);
      
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
export default App;
```

## Handle Error

Cũng tương tự như loading, chúng ta sẽ bổ sung thêm state `isError` để xác định việc fetch dữ liệu có bị lỗi không

```jsx{8,12,20}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      
      try {
        const result = await axios(url);
        
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
```

## Fetch data với Form

Nãy giờ chúng ta chỉ fetch data với bằng input và button. Khi có nhiều element hơn, chúng ta sẽ đưa nó vào `form` để có thể trigger form submit bằng cách nhấn Enter

```jsx{5,6,7,8,9,10,16,17}
function App() {
  ...
  return (
    <Fragment>
      <form
        onSubmit={event =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
          event.preventDefault();
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      ...
    </Fragment>
  );
}
```

## Custom hook để Fetch data

Để tái sử dụng được các đoạn code liên quan đến việc fetch data, chúng ta sẽ đưa nó ra thành một custom hook, các giá trị liên quan trực tiếp đến việc fetch data, cụ thể là loading, error chúng ta cũng đưa vào trong custom hook

```js{1,24}
const useHackerNewsApi = () => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, [url]);
  
  return [{ data, isLoading, isError }, setUrl];
}
```

Sử dụng bên trong App Component

```jsx{3,8}
function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi();
  
  return (
    <Fragment>
      <form onSubmit={event => {
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        event.preventDefault();
      }}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      ...
    </Fragment>
  );
}
```

Giá trị state lúc khởi tạo của thể đưa vào như một tham số truyền vào cho custom hook luôn

```jsx{5,6}
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, [url]);
  
  return [{ data, isLoading, isError }, setUrl];
};

function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );
  
  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          );
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
export default App;
```

## Reducer hook

Với cái custom hook để fetch data như ở trên, chúng ta thấy có 2 state `isLoading`, `isError` quan hệ khá *mật thiết* với nhau, có thể hợp nhất 2 đứa nó lại bằng `React.useReducer`

```jsx{5,9,10,11,16,17,18,19}
import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
  ...
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  ...
};
```

`React.useReducer` sẽ nhận vào một hàm reducer (công dụng tương tự như hàm reducer của redux ấy) và các giá trị khởi tạo của state, trong trường hợp của chúng ta là `isLoading` và `isError`. Việc này chẳng qua là gom tất cả state liên quan vào một object cho nó *tinh tế* thôi, thay vì từng state riêng biệt như sử dụng `useState`

```js{16,19,21}
const dataFetchReducer = (state, action) => {
  ...
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
    fetchData();
  }, [url]);
  
  ...
};
```

Mình đã bảo rồi, nó sẽ giống như cái reducer trong redux thôi, chúng ta `dispatch` một object gồm `type` và `payload`, căn cứ vào payload mà chúng ta xử lý, cập nhập state

Cuối cùng chúng ta cập nhập lại giá trị trả về của custom hook nữa

```jsx{12}
const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  
  ...
  
  return [state, setUrl];
};
```

Cuối cùng, không kém phần quan trọng, phần code thực hiện bên trong `dataFetchReducer `

```js
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
```

## Bỏ qua việc fetch data

Tình huống là khi user chuyển qua một route khác, khi đang fetch data, việc gọi fetch ko cần thiết và có thể bỏ qua

```jsx{11,17,21,29}
const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  
  useEffect(() => {
    let didCancel = false;
    
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    
    fetchData();
    
    return () => {
      didCancel = true;
    };
    
  }, [url]);
  
  return [state, setUrl];
};
```

Với việc return một function ở cuối của `React.useEffect`, tên gọi các bạn React đặt là clean up function, nằm trong kiểu effect cần clean up - nói thật mình phát mệt với việc các bạn trong team React cứ thích *chế* thêm liên tục như vậy.

> Nói theo cách của mình đi, nếu bạn return một function ở cuối của `React.useEffect` nó sẽ chạy khi component bị unmount.


Source code có thể tham khảo đầy đủ [ở đây](https://github.com/the-road-to-learn-react/use-data-api/blob/master/src/index.js)

[https://www.robinwieruch.de/react-hooks-fetch-data](https://www.robinwieruch.de/react-hooks-fetch-data)


