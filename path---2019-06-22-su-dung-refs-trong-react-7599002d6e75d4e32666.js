webpackJsonp([0x93dacad8d10e],{1498:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#V%E1%BA%A5n-%C4%91%E1%BB%81-c%E1%BB%A7a-Refs">Vấn đề của Refs</a></li>\n<li><a href="#L%E1%BB%B1a-ch%E1%BB%8Dn-gi%E1%BB%AFa-callback-refs-v%C3%A0-createRef">Lựa chọn giữa callback refs và <code class="language-text">createRef</code></a></li>\n<li><a href="#Truy%E1%BB%81n-Ref-t%E1%BB%AB-cha-xu%E1%BB%91ng-con">Truyền Ref từ cha xuống con</a></li>\n<li><a href="#useRef-hook">useRef hook</a></li>\n<li><a href="#T%E1%BB%95ng-k%E1%BA%BFt-l%E1%BA%A1i">Tổng kết lại</a></li>\n</ul>\n<!-- /TOC -->\n<p>Là viết tắt cho <code class="language-text">reference</code> nếu bạn có thắc mắc, nó là cách mà React sẽ truy cập tới DOM (dom thực, không phải dom ảo). Có nhiều lý do mà chúng ta muốn truy cập tới DOM, thí dụ như set focus vào input.</p>\n<h2 id="vấn-đề-của-refs"><a href="#v%E1%BA%A5n-%C4%91%E1%BB%81-c%E1%BB%A7a-refs" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Vấn đề của Refs</h2>\n<p>Xử lý DOM là kỹ thuật căn bản mà mọi lập trình frontend cần nắm, tuy nhiên nhiều anh em không cảm thấy hứng thú khi sử dụng refs, CÓ MÌNH TRONG ĐÓ NHÉ.</p>\n<p>Thời điểm hiện tại, chúng ta có đến tận 4 cách để dùng refs !!!! </p>\n<p><img src="https://www.rd.com/wp-content/uploads/2012/05/sourbaby-760x506.jpg" alt="Thời điểm hiện tại, chúng ta có đến tận 4 cách để dùng refs "></p>\n<ul>\n<li>Dùng string (không được khuyến khích) (<code class="language-text">&lt;div ref=&quot;stringGiday&quot; /&gt;</code>)</li>\n<li>Dùng callback ref (<code class="language-text">&lt;div ref={ref =&gt; {this.inputRef = ref }} /&gt;</code>)</li>\n<li>Dùng API <code class="language-text">createRef</code></li>\n<li>Dùng hook <code class="language-text">useRef</code></li>\n</ul>\n<p>Refs đã chán nay còn chán hơn khi có quá nhiều lựa chọn</p>\n<h2 id="lựa-chọn-giữa-callback-refs-và-code-classlanguage-textcreaterefcode"><a href="#l%E1%BB%B1a-ch%E1%BB%8Dn-gi%E1%BB%AFa-callback-refs-v%C3%A0-code-classlanguage-textcreaterefcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lựa chọn giữa callback refs và <code class="language-text">createRef</code></h2>\n<p>Sử dụng string cho refs đã được team React cho vào bảo tàng, câu hỏi còn lại là dùng callback refs hay <code class="language-text">createRef</code> đây</p>\n<blockquote>\n<p>Câu trả lời ngắn gọn: dùng <code class="language-text">createRef</code> là an toàn cho mọi trường hợp.</p>\n</blockquote>\n<p>Lấy ví dụ cho tình huống phổ biến: tự động đặt set focus cho input</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">SimpleRef</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// 1 - Định nghĩa ref</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n    \n  <span class="token comment">// 3 - gọi hàm focus trên ref</span>\n  <span class="token function-variable function">onClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token number">2</span> <span class="token operator">-</span> gắn cái ref mới định nghĩa cho element <span class="token operator">--</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onClick<span class="token punctuation">}</span><span class="token operator">></span>Click để focus<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu sử dụng callback ref thì đây là cách làm</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">SimpleCallbackRef</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">onClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">ref</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef <span class="token operator">=</span> ref<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onClick<span class="token punctuation">}</span><span class="token operator">></span>Click để focus<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Một số anh em, không bao gồm mình, thấy viết <code class="language-text">ref =&gt;</code> nó hơi kỳ, cái ref này ở quỷ quái nào sinh ra?</p>\n<p>Khai báo ref bằng inline function như ở trên, nó sẽ gọi 2 lần trong quá trình update: lần đầu tiên với giá trị <code class="language-text">null</code>, lần thứ hai là khi có DOM element.\nBởi vì mỗi lần render là một inline function khác nhau, React sẽ phải xóa giá trị ref cũ rồi setup ref mới</p>\n<p>Nó cũng còn có nghĩa là viết như sau sẽ bị bug, ref lúc đầu đang null nên không có gọi focus được</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">ref</span> <span class="token operator">=></span> ref<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></code></pre>\n      </div>\n<p>Chắc tới đây anh em đã thấy không còn muốn dùng callback ref.</p>\n<p>Tuy nhiên không có nghĩa là callback ref không còn đất dụng võ, với <code class="language-text">createRef</code> anh em luôn phải tạo-rồi-gán. Nếu tình huống chúng ta phải tạo một danh sách element động</p>\n<p>Như ví dụ này</p>\n<p>Anh em sẽ làm như thế này phải không</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">DynamicRefs</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>\n          tasks<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n            <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"Task 1"</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token string">"red"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"Task 2"</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token string">"green"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"Task 3"</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token string">"yellow"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"Task 4"</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token string">"gray"</span> <span class="token punctuation">}</span>\n          <span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>refsArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token operator">&lt;</span><span class="token operator">></span>\n                <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>tasks<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">task<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n                    <span class="token operator">&lt;</span>div\n                        key<span class="token operator">=</span><span class="token punctuation">{</span>i<span class="token punctuation">}</span>\n                        ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">ref</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n                            <span class="token keyword">this</span><span class="token punctuation">.</span>refArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> ref<span class="token punctuation">;</span>\n                        <span class="token punctuation">}</span><span class="token punctuation">}</span>\n                    <span class="token operator">></span>\n                        <span class="token punctuation">{</span>task<span class="token punctuation">.</span>name<span class="token punctuation">}</span>\n                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n                <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n            <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="truyền-ref-từ-cha-xuống-con"><a href="#truy%E1%BB%81n-ref-t%E1%BB%AB-cha-xu%E1%BB%91ng-con" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Truyền Ref từ cha xuống con</h2>\n<p>Với function component, xét đoạn code sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">CustomInput</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token operator">&lt;</span>input <span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Rồi chúng ta có 1 component khác, dùng ref cho cái <code class="language-text">CustomInput</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">SimpleRef</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>textInput <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>CustomInput ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>textInput<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Đoạn code trên hổng chạy được. Chúng ta cần dùng đến <code class="language-text">forwardRef</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// BẮT BUỘC phải là function component</span>\n<span class="token keyword">const</span> CustomInput <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> ref</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token keyword">class</span> <span class="token class-name">SimpleRefForwarding</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function-variable function">onClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Notice that now we assign the ref to a custom component</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>div<span class="token operator">></span>\n        <span class="token operator">&lt;</span>CustomInput ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>inputRef<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>onClick<span class="token punctuation">}</span><span class="token operator">></span>\n          Click to Focus\n        <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="useref-hook"><a href="#useref-hook" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>useRef hook</h2>\n<p>Nếu là function component, như đã biết, nếu chúng ta dùng <code class="language-text">createRef</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">FunctionComponentWithRef</span>  <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> textInput <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n        <span class="token operator">&lt;</span><span class="token operator">></span>\n            <span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span>textInput<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n            <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> textInput<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>\n            Click to Focus\n            <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>MỖi lần return là mỗi lần tạo ref mới, như vậy không cool, sử dụng hook <code class="language-text">useRef</code> chúng ta sẽ có một cái ref xài đời này qua đời kia dù bao nhiều lần update, cho đến khi nó ra đi (Unmount)</p>\n<h2 id="tổng-kết-lại"><a href="#t%E1%BB%95ng-k%E1%BA%BFt-l%E1%BA%A1i" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tổng kết lại</h2>\n<ul>\n<li>Đừng xài ref nhiều quá</li>\n<li>Đừng bao giờ đụng vô string ref</li>\n<li>Dùng callback ref khi anh em đụng đến vấn đề tạo element động</li>\n<li>Nếu là class component, dùng <code class="language-text">createRef</code> an toàn nhất</li>\n<li>Là function component, dùng <code class="language-text">useRef</code> cho hợp xu thế</li>\n<li>Dùng <code class="language-text">forwardRef</code> khi component cha cần truy cập đến component con</li>\n</ul>\n<p><a target="_blank" rel="noopener noreferrer" href="https://rafaelquintanilha.com/the-complete-guide-to-react-refs">The Complete Guide to React Refs</a></p>',timeToRead:5,excerpt:"Vấn đề của Refs Lựa chọn giữa callback refs và  Truyền Ref từ cha xuống con useRef hook Tổng kết lại Là viết tắt cho   nếu bạn có thắc mắc…",frontmatter:{title:"Sử dụng Refs trong React",cover:"",date:"2019-06-22",category:null,tags:["react","hoc-thuat"],desc:"Lâu quá mới viết React, tại hổm rày cũng ít đụng vô React, chắc gần 8 tháng rồi, chỉ toàn viết Vue trong công ty. Nay lật lại kiến thức cũ nhưng chưa bao giờ vô dụng: sử dụng Refs"},fields:{slug:"/2019-06-22-su-dung-refs-trong-react"}}},pathContext:{slug:"/2019-06-22-su-dung-refs-trong-react",prev:{frontmatter:{title:"Sử dụng React Hook Effect",desc:"Bài này mình contribute cho http://vi.reactjs.org về cách sử dụng React Hook Effect",type:"post",category:null,tags:["react","hoc-thuat"],date:"2019-07-03",cover:""},fields:{slug:"/2019-07-03-huong-dan-su-dung-react-hook-effect"}},next:{frontmatter:{title:"3 bước tối ưu hiệu năng React App bằng các API mới của React",desc:"Bài viết hướng dẫn tối ưu hiệu năng bằng memo, useMemo, useCallback",type:"post",category:null,tags:["react","thu-thuat"],date:"2019-06-17",cover:""},fields:{slug:"/2019-06-17-huong-dan-toi-uu-hieu-nang-react-app"}}}}}});
//# sourceMappingURL=path---2019-06-22-su-dung-refs-trong-react-7599002d6e75d4e32666.js.map