webpackJsonp([0x931434b7f3dd],{1249:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#reactchildrenforeach"><code class="language-text">React.Children.forEach</code></a></li>\n<li><a href="#reactchildrencount"><code class="language-text">React.Children.count</code></a></li>\n<li><a href="#reactchildrentoarraychildren"><code class="language-text">React.Children.toArray(children)</code></a></li>\n<li><a href="#reactchildrenonly"><code class="language-text">React.Children.only</code></a></li>\n</ul>\n<!-- /TOC -->\n<p>Hãy nghĩ ngay tới cặp đôi <code class="language-text">React.Children.map</code> và <code class="language-text">React.cloneElement</code> khi cần truyền <code class="language-text">props</code> từ component cha xuống các component con mà <strong>KHÔNG cần gọi render component bên trong component cha</strong></p>\n<p>Hơi mâu thuẫn vì không <code class="language-text">render</code> component con vậy sao nó hiển thị, ví dụ đi</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function">ComponentChaChu</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>children<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n     <span class="token punctuation">{</span>\n        React<span class="token punctuation">.</span>Children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>children<span class="token punctuation">,</span> child <span class="token operator">=></span> <span class="token punctuation">(</span>\n            React<span class="token punctuation">.</span><span class="token function">cloneElement</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n                style<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n                    backgroundColor<span class="token punctuation">:</span> <span class="token string">\'green\'</span><span class="token punctuation">,</span>\n                    color<span class="token punctuation">:</span> <span class="token string">\'white\'</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">)</span><span class="token punctuation">)</span>\n     <span class="token punctuation">}</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token function-variable function">Luckyluu</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>title<span class="token punctuation">,</span> posts<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>NavBar</span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>title<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">{</span>\n            posts<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>post <span class="token operator">=></span><span class="token punctuation">(</span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Post</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>post<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PostHeader</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">post</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span> \n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PostBody</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">post</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Post</span><span class="token punctuation">></span></span>\n            <span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>2 component con ở đây là <code class="language-text">PostHeader</code> và <code class="language-text">NavBar</code> có thể sử dụng ở bất kỳ đâu, còn <code class="language-text">ComponentChaChu</code> có thể có bất kỳ đứa con nào, không cần biết sau này con nó là ai thì nó sẽ truyền hết tài sản là <code class="language-text">backgroundColor</code> và <code class="language-text">color</code> cho đứa con yêu dấu đó</p>\n<p>Sẵn tiện thì nói luôn một số <em>function</em> khác của <code class="language-text">React.Children</code> luôn</p>\n<h2 id="code-classlanguage-textreactchildrenforeachcode"><a href="#code-classlanguage-textreactchildrenforeachcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">React.Children.forEach</code></h2>\n<p>Giống như <code class="language-text">React.Children.map</code> nhưng không trả về gì hết</p>\n<h2 id="code-classlanguage-textreactchildrencountcode"><a href="#code-classlanguage-textreactchildrencountcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">React.Children.count</code></h2>\n<p>Nhà có nhiêu đứa con ?</p>\n<h2 id="code-classlanguage-textreactchildrentoarraychildrencode"><a href="#code-classlanguage-textreactchildrentoarraychildrencode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">React.Children.toArray(children)</code></h2>\n<p>Convert component con về <code class="language-text">array</code></p>\n<h2 id="code-classlanguage-textreactchildrenonlycode"><a href="#code-classlanguage-textreactchildrenonlycode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">React.Children.only</code></h2>\n<p>Để áp dụng chương trình kế hoạch hóa gia đình, mỗi component cha chỉ có <strong>1</strong> và phải có 1 con duy nhất, quăng cái thông báo nếu không đáp ứng yêu cầu này.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">BaBa</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu bắt buộc con thằng <code class="language-text">BaBa</code> phải là <code class="language-text">function</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx">BaBa<span class="token punctuation">.</span>propTypes <span class="token operator">=</span> <span class="token punctuation">{</span>\n    children<span class="token punctuation">:</span> React<span class="token punctuation">.</span>propTypes<span class="token punctuation">.</span>func<span class="token punctuation">.</span>isRequired\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nó log ra thông báo lỗi khi truyền vào con không phải là <code class="language-text">function</code>, dev lười biến có thể \'cho qua\' thông báo này. Nhưng khi mình bắt buộc kiểu này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">BaBa</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> React<span class="token punctuation">.</span>Children<span class="token punctuation">.</span><span class="token function">only</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu không có con là app chết luôn, cho các anh dev không còn lười biếng, giống kiểu mấy người xưa ko có con là không có được vây. ;)</p>',timeToRead:2,excerpt:"Hãy nghĩ ngay tới cặp đôi   và   khi cần truyền   từ component cha xuống các component con mà  KHÔNG cần gọi render component bên trong…",frontmatter:{title:"React Children và React cloneElement",cover:"",date:"2017-10-27",category:"react",tags:["javascript","react"],desc:"Tìm hiểu cách sử dụng react Children và react cloneElement"},fields:{slug:"/2017-10-27-react-children-react-clone-element"}}},pathContext:{slug:"/2017-10-27-react-children-react-clone-element",prev:{frontmatter:{title:"Một vài cải tiến của Google Calendar",desc:"Cách đây hơn một tuần Google Calendar vừa có nâng cấp lên bản mới, cùng nhìn thử giao diện có gì thay đổi",type:"post",category:"ux-ui",tags:["ux-ui"],date:"2017-11-02",cover:""},fields:{slug:"/2017-11-02-mot-vai-cai-tien-google-calendar"}},next:{frontmatter:{title:"Giải thích React Component Lifecycle",desc:"Tìm hiểu vòng đời của một Component React, khi nào và sử dụng ra sao",type:"post",category:"react",tags:["javascript","react"],date:"2017-10-20",cover:"https://cdn-images-1.medium.com/max/1800/0*OoDfQ7pzAqg6yETH."},fields:{slug:"/2017-10-20-react-lifecycle-la-gi"}}}}}});
//# sourceMappingURL=path---2017-10-27-react-children-react-clone-element-b411811ebbac98947849.js.map