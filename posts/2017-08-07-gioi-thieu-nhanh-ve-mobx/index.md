---
path: "/2017-08-07-gioi-thieu-nhanh-ve-mobx"
date: "2017-08-07T13:35:13.234Z"
title: "Giới thiệu nhanh về Mobx"
desc: "MobX là một một thư viện độc lập để quản lý state, phần lớn nó được sử dụng chung với React"
tags: ["javascript", "react"]
---

## Tư tưởng chính của MobX

MobX đảm bảo vấn để sau: không cho phép tạo ra một state không thống nhất

![](https://mobx.js.org/getting-started-assets/overview.png)

1. Application state: có thể là một mớ bồng bông `object`, `array` nguyên thủy từ database
2. Derivations: tất cả những giá trị có được từ việc kết giữa các Application State với mớ logic lằn ngoằn sau khi tính toán.
3. Reactions: tương tự như `Derivations`, khác nhau chính ở chổ những `function` này không trả về giá trị, nó sẽ thực hiện một tác vụ nào đó, đảm bảo DOM được cập nhập đúng.
4. Actions: là những gì sẽ làm thay đổi `state`, MobX sẽ đảm bảo tất cả những `state` bị thay đổi bởi actions sẽ được thông báo cho `Derivations` và `Reactions`

## Ví dụ

Tạo một cái `store` Todo, gọi nó là `TodoStore`, chứa tất một `collections` *todos*

```js
class TodoStore{
    todos = [];

    get completedTodosCount(){
        return this.todos.filter(
            todo => todo.completed === true
            ).length;
    }

    report(){
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    addTodo(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }    
}

const todoStore = new TodoStore();
```

Giờ thêm một data cho todoStore, mỗi lần thêm mình gọi hàm `report` để thấy được kết quả sau khai thay đổi.

```js
todoStore.addTodo("read MobX tutorial");
console.log(todoStore.report());
​
todoStore.addTodo("try MobX");
console.log(todoStore.report());
​
todoStore.todos[0].completed = true;
console.log(todoStore.report());
​
todoStore.todos[1].task = "try MobX in own project";
console.log(todoStore.report());
​
todoStore.todos[0].task = "grok MobX tutorial";
console.log(todoStore.report());
```

Thay vì phải gọi report như vậy, ta hãy gọi nó một cách tự động khi cái `TodoStore` bị thay đổi, để được như vậy `TodoStore` phải trở thành một *observable* để MobX sẽ tracking tất cả thay đổi trên `TodoStore`

```js
class ObservableTodoStore {
    @observable todos = [];
    @observable pendingRequests = 0;
​
    constructor() {
        mobx.autorun(() => console.log(this.report));
    }
​
    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }
​
    @computed get report() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }
​
    addTodo(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }
}
​
​
const observableTodoStore = new ObservableTodoStore();

```

Với những giá trị tính toán dựa trên `state` đăng ký nó bằng `@computed` và collection TodoStore `@observable`

Bên trong hàm `constructor` chúng ta cho gọi hàm `report` bằng `mobx.autorun`. Thằng này sẽ chạy (gọi là *reaction*) mỗi khi observable data có thay đổi bởi vì bên trong hàm `report` chúng ta có gọi một *observable object* là `this.todos`

## Giờ thì kết hợp với `React`

Sử dụng decorator `@observer` từ package `mobx-react` để wrap 1 component React, đảm bảo các component sẽ được tự động update khi dữ liệu bị thay đổi mà không cần gọi hàm `setState`

```html
@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ this.onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        <RenderCounter />
      </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
}

@observer
class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted }
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
        <RenderCounter />
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
}

ReactDOM.render(
  <TodoList store={ observableTodoStore } />,
  document.getElementById('reactjs-app')
);
```



