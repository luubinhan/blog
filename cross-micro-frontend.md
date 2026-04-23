# Trao đổi state trong Micro frontend
Để hiểu bài này, bạn cần biết micro frontend là gì trước, mình sẽ không giải thích nó, trong bài này chỉ tập trung thảo luận qua các phương pháp để trao đổi state trong micro frontend

Có thể kể ra 5 phương pháp ở thời điểm hiện tại
- web worker
- prop và callback
- custom event
- pub sub / windowed-observable
- tự viết

Bảng so sánh

-   ✅ có sẵn dùng luôn, đơn giản
-   💛 tốt nhưng còn có thể tốt hơn
-   🔶 Tricky and easy to mess up
-   🛑 phức tạp và khó

| Tiêu chí  | Web worker | prop và callback | custom event | windowed-observable | Tự viết |
| --------- | ---------- | ---------------- | ------------ | ------------------- | ------- |
| Cài đặt   | 🛑          | ✅                | ✅            | ✅                   | 🔶       |
| Api       | 🔶          | 💛                | 💛            | ✅                   | 🔶       |
| Framework | ✅          | ✅                | ✅            | ✅                   | 🔶       |
| Tùy biến  | ✅          | ✅                | ✅            | ✅                   | 🔶       |

## Web worker

Worker

```js
let said = [];

export function say(message) {
  console.log({ message, said });

  said.push(message)

  // This postMessage communicates with everyone listening to this worker
  postMessage(message);
}
```

Container app

```js
...
import worky from 'worky';

window.worky = worky;

...
```

Tất cả app trong micro frontend đều sử dụng cùng một instance `window`

#### Microfrontend 1️⃣

```js
const { worky } = window;

function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    if (message.data.type) {
      return;
    }

    setMessages((currentMessages) => currentMessages.concat(message.data));
  };

  useEffect(() => {
    worky.addEventListener('message', handleNewMessage);

    return () => {
      worky.removeEventListener('message', handleNewMessage)
    }
  }, [handleNewMessage]);

  return (
    <div className="MF">
      <h3>Microfrontend 1️⃣</h3>
      <p>New messages will be displayed below 👇</p>
      <div className="MF__messages">
        {messages.map((something, i) => <p key={something + i}>{something}</p>)}
      </div>
    </div>
  );
}
```

#### Microfrontend 2️⃣

```js
const { worky } = window;

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { target: form } = e;
    const input = form?.elements?.something;

    worky.say(input.value);
    form.reset();
  }

  return (
    <div className="MF">
      <h3>Microfrontend 2️⃣</h3>
      <p>⌨️ Use this form to communicate with the other microfrontend</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="something" placeholder="Type something in here"/>
        <button type="submit">Communicate!</button>
      </form>
    </div>
  );
}
```

**Ưu điểm**

Chạy trên thread riêng nên tối ưu về hiệu năng nhất

**Nhược điểm**

- Setup phức tạp
- API dài dòng
- Ràng buộc vào đối tượng `window`

## Prop và callback

Container app

Đưa toàn bộ state lên trên container app và truyền `messages` như `prop` vaf`handleNewMassge` như callback

```js
const App = ({ microfrontends }) => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages((currentMessages) => currentMessages.concat(message));
  };

  return (
    <main className="App">
      <div className="App__header">
        <h1>⚔️ Cross microfrontend communication 📦</h1>
        <p>Workerized example</p>
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {
            Object.keys(microfrontends).map(microfrontend => (
              <Microfrontend
                key={microfrontend}
                microfrontend={microfrontends[microfrontend]}
                customProps={{
                  messages,
                  onNewMessage: handleNewMessage,
                }}
              />
            ))
          }
        </div>
      </div>
    </main>
  );
}
```

#### Microfrontend 1️⃣

```js
function App({ messages = [] }) {
  return (
    <div className="MF">
      <h3>Microfrontend 1️⃣</h3>
      <p>New messages will be displayed below 👇</p>
      <div className="MF__messages">
        {messages.map((something, i) => <p key={something + i}>{something}</p>)}
      </div>
    </div>
  );
}
```

#### Microfrontend 2️⃣

```js
function App({ onNewMessage }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { target: form } = e;
    const input = form?.elements?.something;

    onNewMessage(input.value);
    form.reset();
  }

  ...
}
```

**Ưu điểm**

- Api đơn giản
- Setup đơn giản
- Tùy biến dễ

**Nhược điểm**

- Khó setup nếu sử dùng nhiều framework (Vue, Angular, React)
- Một thay đổi property thay đổi cùng làm toàn bộ tất cả micro frontend

## Custom event

#### Microfrontend 1️⃣

```js
function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (event) => {
    setMessages((currentMessages) => currentMessages.concat(event.detail));
  };

  useEffect(() => {  
    window.addEventListener('message', handleNewMessage);

    return () => {
      window.removeEventListener('message', handleNewMessage)
    }
  }, [handleNewMessage]);

  ...
}
```

#### Microfrontend 2️⃣

```js
function App({ onNewMessage }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { target: form } = e;
    const input = form?.elements?.something;

    const customEvent = new CustomEvent('message', { detail: input.value });
    window.dispatchEvent(customEvent)
    form.reset();
  }

  ...
}
```

**Ưu điểm**

- Setup đơn giản
- Tùy biến
- Framework nào cũng được
- Micro frontend không cần biết parent

**Nhược điểm**

- Hạn chế trong việc custom API

## Windowed observable

https://github.com/luistak/windowed-observable

Sử dụng lib này

```js
import { Observable } from 'windowed-observable';

// Define a specific context namespace
const observable = new Observable('cart-items');

const observer = (item) => console.log(item);

// Add an observer subscribing to new events on this observable
observable.subscribe(observer)

// Unsubscribing
observable.unsubscribe(observer);

...

// On the publisher part of the app
const observable = new Observable('cart-items');
observable.publish({ id: 1234, name: 'Mouse Gamer XyZ', quantity: 1 });
```

#### Microfrontend 1️⃣

```js
import { Observable } from 'windowed-observable';

const observable = new Observable('messages');

function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (newMessage) => {
    setMessages((currentMessages) => currentMessages.concat(newMessage));
  };

  useEffect(() => {  
    observable.subscribe(handleNewMessage);

    return () => {
      observable.unsubscribe(handleNewMessage)
    }
  }, [handleNewMessage]);

  ...
}
```

#### Microfrontend 2️⃣

```js
import { Observable } from 'windowed-observable';

const observable = new Observable('messages');

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { target: form } = e;
    const input = form?.elements?.something;
    observable.publish(input.value);
    form.reset();
  }

  ...
}
```

**Ưu điểm**

- API đơn giản
- Dễ setup
- Dễ customize

**Nhược điểm**

- Phụ thuộc vào window, ai cũng có thể ghi đề lên

## Tự viết

Tự viết theo ý thích cá nhân và dự án bạn đang cần. Khôn phải là một lựa chọn được khuyên dùng