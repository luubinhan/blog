webpackJsonp([0xdd864ce66e29],{1264:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#t%C6%B0-t%C6%B0%E1%BB%9Fng-ch%C3%ADnh-c%E1%BB%A7a-mobx">Tư tưởng chính của MobX</a></li>\n<li><a href="#v%C3%AD-d%E1%BB%A5">Ví dụ</a></li>\n<li><a href="#gi%E1%BB%9D-th%C3%AC-k%E1%BA%BFt-h%E1%BB%A3p-v%E1%BB%9Bi-react">Giờ thì kết hợp với <code class="language-text">React</code></a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="tư-tưởng-chính-của-mobx"><a href="#t%C6%B0-t%C6%B0%E1%BB%9Fng-ch%C3%ADnh-c%E1%BB%A7a-mobx" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tư tưởng chính của MobX</h2>\n<p>MobX đảm bảo vấn để sau: không cho phép tạo ra một state không thống nhất</p>\n<p><img src="https://mobx.js.org/getting-started-assets/overview.png"></p>\n<ol>\n<li>Application state: có thể là một mớ bồng bông <code class="language-text">object</code>, <code class="language-text">array</code> nguyên thủy từ database</li>\n<li>Derivations: tất cả những giá trị có được từ việc kết giữa các Application State với mớ logic lằn ngoằn sau khi tính toán.</li>\n<li>Reactions: tương tự như <code class="language-text">Derivations</code>, khác nhau chính ở chổ những <code class="language-text">function</code> này không trả về giá trị, nó sẽ thực hiện một tác vụ nào đó, đảm bảo DOM được cập nhập đúng.</li>\n<li>Actions: là những gì sẽ làm thay đổi <code class="language-text">state</code>, MobX sẽ đảm bảo tất cả những <code class="language-text">state</code> bị thay đổi bởi actions sẽ được thông báo cho <code class="language-text">Derivations</code> và <code class="language-text">Reactions</code></li>\n</ol>\n<h2 id="ví-dụ"><a href="#v%C3%AD-d%E1%BB%A5" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ví dụ</h2>\n<p>Tạo một cái <code class="language-text">store</code> Todo, gọi nó là <code class="language-text">TodoStore</code>, chứa tất một <code class="language-text">collections</code> <em>todos</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">TodoStore</span><span class="token punctuation">{</span>\n    todos <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">get</span> <span class="token function">completedTodosCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>\n            todo <span class="token operator">=></span> todo<span class="token punctuation">.</span>completed <span class="token operator">===</span> <span class="token boolean">true</span>\n            <span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span>\n            <span class="token keyword">return</span> <span class="token string">"&lt;none>"</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`Next todo: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>task<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">". `</span></span> <span class="token operator">+</span>\n            <span class="token template-string"><span class="token string">`Progress: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>completedTodosCount<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span>length<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">addTodo</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            task<span class="token punctuation">:</span> task<span class="token punctuation">,</span>\n            completed<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            assignee<span class="token punctuation">:</span> <span class="token keyword">null</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>    \n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> todoStore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TodoStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Giờ thêm một data cho <strong>TodoStore</strong>, mỗi lần thêm mình gọi hàm <code class="language-text">report</code> để thấy được kết quả sau khai thay đổi.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">todoStore<span class="token punctuation">.</span><span class="token function">addTodo</span><span class="token punctuation">(</span><span class="token string">"read MobX tutorial"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>todoStore<span class="token punctuation">.</span><span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n​\ntodoStore<span class="token punctuation">.</span><span class="token function">addTodo</span><span class="token punctuation">(</span><span class="token string">"try MobX"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>todoStore<span class="token punctuation">.</span><span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n​\ntodoStore<span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>completed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>todoStore<span class="token punctuation">.</span><span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n​\ntodoStore<span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>task <span class="token operator">=</span> <span class="token string">"try MobX in own project"</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>todoStore<span class="token punctuation">.</span><span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n​\ntodoStore<span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>task <span class="token operator">=</span> <span class="token string">"grok MobX tutorial"</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>todoStore<span class="token punctuation">.</span><span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Thay vì phải gọi report như vậy, ta hãy gọi nó một cách tự động khi cái <code class="language-text">TodoStore</code> bị thay đổi, để được như vậy <code class="language-text">TodoStore</code> phải trở thành một <em>observable</em> để MobX sẽ tracking tất cả thay đổi trên <code class="language-text">TodoStore</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">ObservableTodoStore</span> <span class="token punctuation">{</span>\n    @observable todos <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    @observable pendingRequests <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n​\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        mobx<span class="token punctuation">.</span><span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>report<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n​\n    @computed <span class="token keyword">get</span> <span class="token function">completedTodosCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>\n            todo <span class="token operator">=></span> todo<span class="token punctuation">.</span>completed <span class="token operator">===</span> <span class="token boolean">true</span>\n        <span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n​\n    @computed <span class="token keyword">get</span> <span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span>\n            <span class="token keyword">return</span> <span class="token string">"&lt;none>"</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`Next todo: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>task<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">". `</span></span> <span class="token operator">+</span>\n            <span class="token template-string"><span class="token string">`Progress: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>completedTodosCount<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span>length<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n​\n    <span class="token function">addTodo</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            task<span class="token punctuation">:</span> task<span class="token punctuation">,</span>\n            completed<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            assignee<span class="token punctuation">:</span> <span class="token keyword">null</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n​\n​\n<span class="token keyword">const</span> observableTodoStore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObservableTodoStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Với những giá trị tính toán dựa trên <code class="language-text">state</code> đăng ký nó bằng <code class="language-text">@computed</code> và collection <strong>TodoStore</strong> <code class="language-text">@observable</code></p>\n<p>Bên trong hàm <code class="language-text">constructor</code> chúng ta cho gọi hàm <code class="language-text">report</code> bằng <code class="language-text">mobx.autorun</code>. Thằng này sẽ chạy (gọi là <em>reaction</em>) mỗi khi observable data có thay đổi bởi vì bên trong hàm <code class="language-text">report</code> chúng ta có gọi một <em>observable object</em> là <code class="language-text">this.todos</code></p>\n<h2 id="giờ-thì-kết-hợp-với-code-classlanguage-textreactcode"><a href="#gi%E1%BB%9D-th%C3%AC-k%E1%BA%BFt-h%E1%BB%A3p-v%E1%BB%9Bi-code-classlanguage-textreactcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Giờ thì kết hợp với <code class="language-text">React</code></h2>\n<p>Sử dụng decorator <code class="language-text">@observer</code> từ package <code class="language-text">mobx-react</code> để wrap 1 component React, đảm bảo các component sẽ được tự động update khi dữ liệu bị thay đổi mà không cần gọi hàm <code class="language-text">setState</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html">@observer\nclass TodoList extends React.Component {\n  render() {\n    const store = this.props.store;\n    return (\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        { store.report }\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>\n        { store.todos.map(\n          (todo, idx) => <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TodoView</span> <span class="token attr-name">todo</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">todo</span> <span class="token attr-name">}</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">idx</span> <span class="token attr-name">}</span> <span class="token punctuation">/></span></span>\n        ) }\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n        { store.pendingRequests > 0 ? <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>marquee</span><span class="token punctuation">></span></span>Loading...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>marquee</span><span class="token punctuation">></span></span> : null }\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">this.onNewTodo</span> <span class="token attr-name">}</span><span class="token punctuation">></span></span>New Todo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>small</span><span class="token punctuation">></span></span> (double-click a todo to edit)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>small</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RenderCounter</span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    );\n  }\n\n  onNewTodo = () => {\n    this.props.store.addTodo(prompt(\'Enter a new todo:\',\'coffee plz\'));\n  }\n}\n\n@observer\nclass TodoView extends React.Component {\n  render() {\n    const todo = this.props.todo;\n    return (\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">onDoubleClick</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">this.onRename</span> <span class="token attr-name">}</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n          <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>checkbox<span class="token punctuation">\'</span></span>\n          <span class="token attr-name">checked</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">todo.completed</span> <span class="token attr-name">}</span>\n          <span class="token attr-name">onChange</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">this.onToggleCompleted</span> <span class="token attr-name">}</span>\n        <span class="token punctuation">/></span></span>\n        { todo.task }\n        { todo.assignee\n          ? <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>small</span><span class="token punctuation">></span></span>{ todo.assignee.name }<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>small</span><span class="token punctuation">></span></span>\n          : null\n        }\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RenderCounter</span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    );\n  }\n\n  onToggleCompleted = () => {\n    const todo = this.props.todo;\n    todo.completed = !todo.completed;\n  }\n\n  onRename = () => {\n    const todo = this.props.todo;\n    todo.task = prompt(\'Task name\', todo.task) || todo.task;\n  }\n}\n\nReactDOM.render(\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TodoList</span> <span class="token attr-name">store</span><span class="token attr-value"><span class="token punctuation">=</span>{</span> <span class="token attr-name">observableTodoStore</span> <span class="token attr-name">}</span> <span class="token punctuation">/></span></span>,\n  document.getElementById(\'reactjs-app\')\n);</code></pre>\n      </div>\n<p>Khi đó, khi ta tương tác với object <code class="language-text">Store</code>, phần việc còn lại sẽ do MobX đảm nhiệm sau cho DOM hiển thị đúng với <code class="language-text">Store</code> này</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> store <span class="token operator">=</span> observableTodoStore<span class="token punctuation">;</span>\nstore<span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>completed <span class="token operator">=</span> <span class="token operator">!</span>store<span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>completed<span class="token punctuation">;</span>\nstore<span class="token punctuation">.</span>todos<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>task <span class="token operator">=</span> <span class="token string">"Random todo "</span> <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nstore<span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> task<span class="token punctuation">:</span> <span class="token string">"Find a fine cheese"</span><span class="token punctuation">,</span> completed<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// etc etc.. add your own statements here...</span></code></pre>\n      </div>',timeToRead:4,excerpt:"Tư tưởng chính của MobX Ví dụ Giờ thì kết hợp với  Tư tưởng chính của MobX MobX đảm bảo vấn để sau: không cho phép tạo ra một state không…",frontmatter:{title:"Giới thiệu nhanh về Mobx",cover:"",date:"2017-08-07",category:"react",tags:["javascript","react"],desc:"MobX là một một thư viện độc lập để quản lý state, phần lớn nó được sử dụng chung với React"},fields:{slug:"/2017-08-07-gioi-thieu-nhanh-ve-mobx"}}},pathContext:{slug:"/2017-08-07-gioi-thieu-nhanh-ve-mobx",prev:{frontmatter:{title:"7 khái niệm JavaScript cần biết",desc:"Một vài khái niệm căn bản trong javascript cần nắm nếu là frontend developer",type:"post",category:"javascript",tags:["javascript","react"]},fields:{slug:"/2017-09-25-10-khai-niem-javascript-can-biet"}},next:{frontmatter:{title:"Giới thiệu React Router",desc:"React không phải một framework, nó chỉ là một thư viện javascript, bởi vì vậy nó không thể giải quyết tất cả các yêu cầu một application. Việc mà React làm rất tốt là tạo component và cách thức quản lý state của component, nhưng để tạo một Single Page App (sẽ viết tắt là SPA) phức tạp, nó cần những thư viện khác nữa, đầu tiền cần nhắc đến là React Router",type:"post",category:"react",tags:["javascript","react"]},fields:{slug:"/2017-07-31-react-router"}}}}}});
//# sourceMappingURL=path---2017-08-07-gioi-thieu-nhanh-ve-mobx-330771f1f23adcca6de7.js.map