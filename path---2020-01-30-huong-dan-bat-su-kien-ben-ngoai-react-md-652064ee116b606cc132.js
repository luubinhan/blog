webpackJsonp([0xf7862e905ccf],{1619:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Nếu bạn tự làm một react component như <em>dropdown</em>, <em>modal</em>, <em>popover</em>, không sớm thì muộn bạn sẽ rơi vào tình huống sao "Bắt sự kiện click bên ngoài component để đóng nó (modal, popover, dropdown) lại"</p>\n<p><img src="https://miro.medium.com/max/546/1*7dmOCdkoDLfnWz6hBF0fYA.png"></p>\n<p>Đây là những gì bạn cần làm</p>\n<ol>\n<li>Để biết sự kiện nằm trong hay ngoài component, chúng ta phải lấy được DOM của element, dùng <code class="language-text">ref</code> để lấy tham chiếu đến DOM <em>thực</em> của component</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token operator">...</span>\n\n<span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>node<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        <span class="token operator">...</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<ol start="2">\n<li>Thêm một event listener cho sự kiện click ( <em>mousedown</em> )</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">//  thêm khi đã mount</span>\n    document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"mousedown"</span><span class="token punctuation">,</span> handleClick<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// dọn dẹp</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">"mousedown"</span><span class="token punctuation">,</span> handleClick<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<ol start="3">\n<li>Bên trong <code class="language-text">handleClick</code> <strong>node.current.contains(e.target)</strong> sẽ trả về <code class="language-text">true</code> nếu click xuất phát bên trong ref <code class="language-text">node</code></li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    \n    <span class="token comment">// outside</span>\n    <span class="token operator">...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a href="https://codesandbox.io/s/w62xl39907">Code</a>\n<a href="https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f">Little Neat trick to capture click outside with React Hook</a></p>',timeToRead:1,excerpt:'Nếu bạn tự làm một react component như  dropdown ,  modal ,  popover , không sớm thì muộn bạn sẽ rơi vào tình huống sao "Bắt sự kiện click…',frontmatter:{title:"Bắt sự kiện click bên ngoài Component React",cover:"",date:"2020-01-30",category:null,tags:["thu-thuat","react"],desc:"Thủ thuật nhỏ để bắt sự kiện click có nằm ngoài component không"},fields:{slug:"/2020-01-30-huong-dan-bat-su-kien-ben-ngoai-react-md"}}},pathContext:{slug:"/2020-01-30-huong-dan-bat-su-kien-ben-ngoai-react-md",prev:{frontmatter:{title:"Kiểu enum trong TypeScript: làm việc như thế nào, sử dụng ra sao",desc:"Chúng ta sẽ trả lời 2 câu hỏi sau: enum của TypeScript làm việc như thế nào, Nó được sử dụng để làm gì. Vở lòng cho người mới viết TypeScript",type:"post",category:null,tags:["hoc-thuat","typescript"],date:"2020-02-01",cover:""},fields:{slug:"/2020-02-01-huong-dan-kieu-enum-trong-typescript-can-ban"}},next:{frontmatter:{title:"Những nguyên tắc chung mà Vue 3 đã áp dụng khi thiết kế",desc:"Nguyên tắc (principle) được áp dụng khi cần đưa ra một quyết định kỹ thuật trước vô vàng các lựa chọn. Nếu bạn đã biết được mọi thứ vận hành như thế nào, thì đã đến lúc bạn tiến một bước xa hơn, trả lời cho câu hỏi tại sao",type:"post",category:null,tags:["hoc-thuat","vuejs"],date:"2020-01-29",cover:""},fields:{slug:"/2020-01-29-nguyen-tac-thiet-ke-cua-vue-3"}}}}}});
//# sourceMappingURL=path---2020-01-30-huong-dan-bat-su-kien-ben-ngoai-react-md-652064ee116b606cc132.js.map