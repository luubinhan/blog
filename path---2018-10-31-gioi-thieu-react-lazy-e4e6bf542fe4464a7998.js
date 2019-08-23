webpackJsonp([0xa415c5a6f8c4],{1382:function(n,a){n.exports={data:{markdownRemark:{html:'<p>React 16.6 giới thiệu api mới, <a href="https://reactjs.org/docs/code-splitting.html#reactlazy" target="_blank" rel="noopener noreferrer">React.lazy</a>, function này sẽ cho phép chúng ta render 1 component được import kiểu <a href="/blog/2018-10-07-huong-dan-lazy-load-component-react">lazy load</a></p>\n<p>Như trước đây chúng ta thường phải tự viết phần kiểm tra khi nào nên load, kết hợp với <code class="language-text">componentDidUpdate</code>. Chúng ta không cần làm những công việc như vậy nữa, với api mới này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> LazyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">\'./Component\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Wrap component này lại bên trong <code class="language-text">Suspense</code>, trả fallback khi ko load được</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>Loading Component<span class="token operator">...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LazyComponent</span></span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Suspense</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Sử dụng <code class="language-text">React.lazy</code> để làm ví dụ sau</p>\n<p><a href="http://vigneshm.com/react-lazy-example/" target="_blank" rel="noopener noreferrer">Demo</a></p>\n<p><a href="https://github.com/vigzmv/react-lazy-example" target="_blank" rel="noopener noreferrer">Source Github</a></p>\n<p>Phần code sử dụng <code class="language-text">React.lazy</code> không có gì cao siêu, thay vì import bình thường, chúng ta <em>import</em> bằng <code class="language-text">React.lazy</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> User <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">\'./User\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//...</span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>Loading Component<span class="token operator">...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">{</span>user <span class="token operator">&amp;&amp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">User</span></span> <span class="token attr-name">user</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">}</span>\n  <span class="token punctuation">{</span>loading <span class="token operator">?</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>Loading User<span class="token operator">...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token punctuation">(</span>\n    <span class="token operator">!</span>user <span class="token operator">&amp;&amp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>loadUser<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Press Me<span class="token operator">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">}</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Suspense</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Chưa tìm được tài liệu chính thức về <code class="language-text">React.Suspense</code>, mình chỉ giải thích nhanh</p>\n<p>Suspense là một tính năng mới của React, có thể hiểu nó như là một <strong>Placeholder</strong> component, mà theo định nghĩa chính xác đầy đủ nhất</p>\n<blockquote>\n<p>Suspense allows you to defer rendering part of your application tree until some condition is met (for example, data from an endpoint or a resource is loaded).</p>\n</blockquote>\n<p>Tạm dịch: Suspense cho phép chúng ta defer render (render không đồng thời) một phần của <strong>tree</strong> đến khi thõa điều kiện ( thí dụ load xong data và resource )</p>\n<p><a href="https://codesandbox.io/s/8nq4w3jj39" target="_blank" rel="noopener noreferrer">Demo Suspense</a></p>\n<p><a href="https://dev.to/vigzmv/reactlazy-what-and-how-to-use-in-your-app-p9a" target="_blank" rel="noopener noreferrer">React.lazy, What and how to use in your app</a></p>',timeToRead:2,excerpt:"React 16.6 giới thiệu api mới,  React.lazy , function này sẽ cho phép chúng ta render 1 component được import kiểu  lazy load Như trước đây…",frontmatter:{title:"Sử dụng React.lazy ra làm sao?",cover:"",date:"2018-10-31",category:null,tags:["react"],desc:"Api mới của React 16.6"},fields:{slug:"/2018-10-31-gioi-thieu-react-lazy"}}},pathContext:{slug:"/2018-10-31-gioi-thieu-react-lazy",prev:{frontmatter:{title:"Hướng dẫn dùng npm link",desc:"Cách dùng npm link để trỏ dependency đến thư mục local",type:"post",category:null,tags:["javascript"],date:"2018-11-01",cover:""},fields:{slug:"/2018-11-01-gioi-thieu-npm-link"}},next:{frontmatter:{title:"Giới thiệu về Reactive Programing trong javascript",desc:"Reactive programing là khái niệm khá trừu tượng và khó tiếp cận với người mới bắt đầu, chuẩn bị tinh thần đọc bài này vài lần trong vài ngày thì mới mong thẩm thấu hết",type:"post",category:null,tags:["javascript"],date:"2018-10-30",cover:""},fields:{slug:"/2018-10-30-gioi-thieu-reactive-programing-trong-javascript"}}}}}});
//# sourceMappingURL=path---2018-10-31-gioi-thieu-react-lazy-e4e6bf542fe4464a7998.js.map