webpackJsonp([64048908175297],{1516:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#v%C3%AD-d%E1%BB%A5-1-l%C3%A0m-dropdown-menu">Ví dụ 1: làm dropdown menu</a></li>\n<li><a href="#v%C3%AD-d%E1%BB%A5-2-l%C3%A0m-form-flipping">Ví dụ 2: làm form flipping</a></li>\n<li><a href="#v%C3%AD-d%E1%BB%A5-3-modal">Ví dụ 3: modal</a></li>\n<li><a href="#v%C3%AD-d%E1%BB%A5-4-todo-list">Ví dụ 4: Todo list</a></li>\n</ul>\n<!-- /TOC -->\n<p>Vue có sẵn một component để chuyên làm animation là <code class="language-text">&lt;transition/&gt;</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nó sẽ thêm một số CSS class, mà dựa vào đó chúng ta có thể thêm animation cho component.</p>\n<ul>\n<li><code class="language-text">v-enter</code>: state ban đầu, được thêm vào trước khi element được chèn vào DOM, remove ngay sau frame insert</li>\n<li><code class="language-text">v-enter-active</code>: được thêm vào trước lúc insert remove sau khi animation kết thúc, tồn tại trong suốt lúc enter. Có thể dùng để define duration, delay, easing cho transition enter</li>\n<li><code class="language-text">v-enter-to</code>: có từ version 2.1.8. Add sau 1 frame khi element đã insert, cùng lúc với <code class="language-text">v-enter</code> bị xóa, xóa sau khi animation kết thúc.</li>\n<li><code class="language-text">v-leave</code>: thêm vào ngay lúc có transition leaving, remove sau đó 1 frame</li>\n<li><code class="language-text">v-leave-active</code>: sẽ có trong lúc leaving. Tương tự v-enter-active</li>\n<li><code class="language-text">v-leave-to</code>: tương tự v-enter-to</li>\n</ul>\n<p><img src="https://vuejs.org/images/transition.png" alt="Làm animation trong Vue bằng component transition"></p>\n<p>Nếu không thích thêm <code class="language-text">v-</code> vào trước mấy class này, chúng ta có thể define một cái prefix khác.</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>my-transition<span class="token punctuation">\'</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p>Để thêm giá trị <code class="language-text">duration</code> trên component (tính theo mili giây)</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">:duration</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>1000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">:duration</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{ enter: 500, leave: 800 }<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h2 id="ví-dụ-1-làm-dropdown-menu"><a href="#v%C3%AD-d%E1%BB%A5-1-l%C3%A0m-dropdown-menu" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ví dụ 1: làm dropdown menu</h2>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dropdown<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dropbtn<span class="token punctuation">"</span></span> <span class="token attr-name">@mouseover</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>show = true<span class="token punctuation">"</span></span> <span class="token attr-name">@mouseout</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>show = false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Dropdown \n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>down-arrow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dropdown<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dropdown-content<span class="token punctuation">"</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>show<span class="token punctuation">"</span></span> <span class="token attr-name">@mouseover</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>show = true<span class="token punctuation">"</span></span> <span class="token attr-name">@mouseout</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>show = false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Link 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Link 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Link 3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span> </code></pre>\n      </div>\n<p>Thêm các CSS cần thiết</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.dropdown-enter,\n.dropdown-leave-to</span> <span class="token punctuation">{</span>\n  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.7<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">.dropdown-enter-to,\n.dropdown-leave</span> <span class="token punctuation">{</span>\n  <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>\n  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> \n<span class="token selector">.dropdown-enter-active,\n.dropdown-leave-active</span> <span class="token punctuation">{</span>\n  <span class="token property">transition</span><span class="token punctuation">:</span> all 0.3s ease-out<span class="token punctuation">;</span>\n  <span class="token property">transform-origin</span><span class="token punctuation">:</span> top center<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<iframe height=\'265\' scrolling=\'no\' title=\'Vue Case 1: Drop Down Menu\' src=\'//codepen.io/tutsplus/embed/qQRgZX/?height=265&theme-id=0&default-tab=css,result\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>See the Pen <a href=\'https://codepen.io/tutsplus/pen/qQRgZX/\'>Vue Case 1: Drop Down Menu</a> by Envato Tuts+ (<a href=\'https://codepen.io/tutsplus\'>@tutsplus</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n</iframe>\n<h2 id="ví-dụ-2-làm-form-flipping"><a href="#v%C3%AD-d%E1%BB%A5-2-l%C3%A0m-form-flipping" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ví dụ 2: làm form flipping</h2>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>out-in<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>front == true<span class="token punctuation">"</span></span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>front<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>Sign In<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Sign In Form<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>Not a member?<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>front = false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        Join Us\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span> <span class="token attr-name">v-else</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>back<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>Sign Up<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Sign Up Form<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>Already a member?<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>front = true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        Log In\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>CSS cần thiết</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.card-enter, .card-leave-to</span> <span class="token punctuation">{</span>\n  <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>90deg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> \n<span class="token selector">.card-enter-active, .card-leave-active</span> <span class="token punctuation">{</span>\n  <span class="token property">transition</span><span class="token punctuation">:</span> all 0.5s<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p data-height="265" data-theme-id="0" data-slug-hash="JeExJr" data-default-tab="html,result" data-user="tutsplus" data-pen-title="Vue Case 2: Flipping Form" class="codepen">See the Pen <a href="https://codepen.io/tutsplus/pen/JeExJr/">Vue Case 2: Flipping Form</a> by Envato Tuts+ (<a href="https://codepen.io/tutsplus">@tutsplus</a>) on <a href="https://codepen.io">CodePen</a>.</p>\n<script src="https://static.codepen.io/assets/embed/ei.js"></script>\n<h2 id="ví-dụ-3-modal"><a href="#v%C3%AD-d%E1%BB%A5-3-modal" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ví dụ 3: modal</h2>\n<p>HTML</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[isShowing ? blurClass : \'\', clearClass]<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Lorem ipsum dolor sit amet...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>toggleShow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Say Hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">enter-active-class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>animated zoomIn<span class="token punctuation">"</span></span>\n    <span class="token attr-name">leave-active-class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>animated zoomOut<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modal</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>isShowing<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>modal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>toggleShow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Close<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modal</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>CSS</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.clear</span> <span class="token punctuation">{</span>\n  <span class="token property">transition</span><span class="token punctuation">:</span> opacity 1s<span class="token punctuation">;</span>\n<span class="token punctuation">}</span> \n<span class="token selector">.blur</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">blur</span><span class="token punctuation">(</span>1px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">opacity</span><span class="token punctuation">:</span> 0.5<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<iframe height=\'265\' scrolling=\'no\' title=\'Vue Case 3: Modal Window\' src=\'//codepen.io/tutsplus/embed/mQRvMz/?height=265&theme-id=0&default-tab=html,result\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>See the Pen <a href=\'https://codepen.io/tutsplus/pen/mQRvMz/\'>Vue Case 3: Modal Window</a> by Envato Tuts+ (<a href=\'https://codepen.io/tutsplus\'>@tutsplus</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n</iframe>\n<h2 id="ví-dụ-4-todo-list"><a href="#v%C3%AD-d%E1%BB%A5-4-todo-list" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ví dụ 4: Todo list</h2>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>newItemText<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>addNewTodo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Add<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>removeTodo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Remove<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition-group</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">tag</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ul<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>task in tasks<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">v-bind:</span>key</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>task<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>{{ task }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition-group</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>CSS</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.list-enter-active</span> <span class="token punctuation">{</span>\n  <span class="token property">animation</span><span class="token punctuation">:</span> add-item 1s<span class="token punctuation">;</span>\n<span class="token punctuation">}</span> \n<span class="token selector">.list-leave-active</span> <span class="token punctuation">{</span>\n  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>\n  <span class="token property">animation</span><span class="token punctuation">:</span> add-item 1s reverse<span class="token punctuation">;</span>\n<span class="token punctuation">}</span> \n<span class="token selector">.list-move</span> <span class="token punctuation">{</span>\n  <span class="token property">transition</span><span class="token punctuation">:</span> transform 1s<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token atrule"><span class="token rule">@keyframes</span> add-item</span> <span class="token punctuation">{</span>\n  <span class="token selector">0%</span> <span class="token punctuation">{</span>\n    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>150px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token selector">50%</span> <span class="token punctuation">{</span>\n    <span class="token property">opacity</span><span class="token punctuation">:</span> 0.5<span class="token punctuation">;</span>\n    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-10px<span class="token punctuation">)</span> <span class="token function">skewX</span><span class="token punctuation">(</span>20deg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token selector">100%</span> <span class="token punctuation">{</span>\n    <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>\n    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>0px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<iframe height=\'265\' scrolling=\'no\' title=\'Vue Case 4: To Do List\' src=\'//codepen.io/tutsplus/embed/PxWVJL/?height=265&theme-id=0&default-tab=css,result\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>See the Pen <a href=\'https://codepen.io/tutsplus/pen/PxWVJL/\'>Vue Case 4: To Do List</a> by Envato Tuts+ (<a href=\'https://codepen.io/tutsplus\'>@tutsplus</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n</iframe>\n<p><a href="https://code.tutsplus.com/tutorials/design-better-ux-with-vuejs-transitions-and-animations--cms-32050" target="_blank" rel="noopener noreferrer">Phần code ví dụ lấy từ Tutsplus</a></p>',
timeToRead:5,excerpt:"Ví dụ 1: làm dropdown menu Ví dụ 2: làm form flipping Ví dụ 3: modal Ví dụ 4: Todo list Vue có sẵn một component để chuyên làm animation là…",frontmatter:{title:"Viết animation cho Vue Component",cover:"",date:"2018-11-17",category:null,tags:["vuejs"],desc:"Làm một số animation đơn giản bằng công cụ có sẵn của Vue"},fields:{slug:"/2018-11-17-huong-dan-lam-animation-voi-vue-component"}}},pathContext:{slug:"/2018-11-17-huong-dan-lam-animation-voi-vue-component",prev:{frontmatter:{title:"Bảo mật web - Một số kiểu tấn công",desc:"Tổng quát các vấn đề bạn cần quan tâm để bảo mật ứng dụng web",type:"post",category:null,tags:["javascript"],date:"2018-11-18",cover:""},fields:{slug:"/2018-11-18-mot-so-van-de-can-quan-tam-de-bao-mat-web"}},next:{frontmatter:{title:"Câu điều kiện trong javascript",desc:"Nắm vững conditional expression trong javascript để viết code sạch sẽ hơn",type:"post",category:null,tags:["javascript"],date:"2018-11-16",cover:""},fields:{slug:"/2018-11-16-cau-dieu-kien-trong-javascript-phan-nang-cao"}}}}}});
//# sourceMappingURL=path---2018-11-17-huong-dan-lam-animation-voi-vue-component-b58bcece2edd12ff13ac.js.map