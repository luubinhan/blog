webpackJsonp([62356747618122],{1328:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Class component như <code class="language-text">PureComponent</code>, hoặc return <code class="language-text">false</code> trong <code class="language-text">shouldComponentUpdate</code>, component đó sẽ không bị re-render khi <strong>tree</strong> thay đổi, nó chỉ thay đổi khi <code class="language-text">prop</code> truyền vào thay đổi</p>\n<p><code class="language-text">React.memo()</code> hoạt động y chang như <code class="language-text">React.PureComponent()</code>, nhưng nó là function component thay vì class như <code class="language-text">PureComponent</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">/* chỉ render khi prop thay đổi */</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// khai báo bằng arrow function</span>\n<span class="token keyword">const</span> MyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>props <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">></span>my memoized component<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// ngắn hơn nữa</span>\n<span class="token keyword">const</span> MyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>props <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div<span class="token operator">></span>implicit memoized component<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Vì <code class="language-text">React.memo()</code> là HOC, chúng ta cũng có thể dùng như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">RocketComponent</span> <span class="token operator">=</span> props <span class="token operator">=></span> <span class="token operator">&lt;</span>div<span class="token operator">></span>my rocket component<span class="token punctuation">.</span> <span class="token punctuation">{</span>props<span class="token punctuation">.</span>fuel<span class="token punctuation">}</span><span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>\n\n<span class="token comment">// một version chỉ render khi prop thay đổi</span>\n<span class="token keyword">const</span> MemoizedRocketComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>RocketComponent<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Tại sao đặt tên là <code class="language-text">memo</code> nghe có vẻ chướng tai? <strong>Memoization</strong> là một kỹ thuật lập trình để optimize tốc độ, thực hiện bằng việc lưu kết quả của một function vào cache để nếu có gọi và truyền vào cùng input thì return cache thay vì thực thi các câu lệnh trong function.</p>',timeToRead:1,excerpt:"Class component như  , hoặc return   trong  , component đó sẽ không bị re-render khi  tree  thay đổi, nó chỉ thay đổi khi   truyền vào thay…",frontmatter:{title:"Giới thiệu React.memo",cover:"",date:"2018-11-04",category:null,tags:["react"],desc:"Api mới của React 16.6"},fields:{slug:"/2018-11-04-gioi-thieu-react-memo-moi-trong-react-16"}}},pathContext:{slug:"/2018-11-04-gioi-thieu-react-memo-moi-trong-react-16",prev:!1,next:{frontmatter:{title:"Giới thiệu Markdown",desc:"Markdown vở lòng cho bạn nào chưa biết",type:"post",category:null,tags:["css"],date:"2018-11-03",cover:""},fields:{slug:"/2018-11-03-gioi-thieu-markdown"}}}}}});
//# sourceMappingURL=path---2018-11-04-gioi-thieu-react-memo-moi-trong-react-16-63d746311bfaebcfa21d.js.map