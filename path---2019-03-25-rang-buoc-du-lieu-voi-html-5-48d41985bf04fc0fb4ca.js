webpackJsonp([19116841729897],{1544:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Với HTML5 chúng ta có một số kiểu input để validate những giá trị mà user đưa vào, ko cần tự viết javascript để check, chỉ đơn giản là khai báo mấy cái attribute, trường hợp phức tạp hơn, chúng ta có thể can thiệp trong cái <a href="https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation">Validation API</a> để có kết quả mong muốn</p>\n<blockquote>\n<p>Luôn nhớ validate ở phía client không có nghĩa là ko cần đến validate ở server.</p>\n</blockquote>\n<h2 id="một-vài-ràng-buộc-phổ-biến"><a href="#m%E1%BB%99t-v%C3%A0i-r%C3%A0ng-bu%E1%BB%99c-ph%E1%BB%95-bi%E1%BA%BFn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một vài ràng buộc phổ biến</h2>\n<p>Dùng kiểu input\n<code class="language-text">&lt;input type=”email” /&gt;</code>: bắt buộc là giá trị email\n<code class="language-text">&lt;input type=&quot;url&quot; /&gt;</code>: bắt buộc là giá trị url</p>\n<p>Dùng attribute khác</p>\n<table>\n<thead>\n<tr>\n<th>Attribute</th>\n<th align="center">Kiểu input hỗ trợ</th>\n<th align="right">Giải thích</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code class="language-text">pattern</code></td>\n<td align="center">text, search, url, tel, email, password</td>\n<td align="right">phải khớp với giá trị regular expression</td>\n</tr>\n<tr>\n<td><code class="language-text">min</code></td>\n<td align="center">range, number, date, month, week, datetime, datetime-local, time</td>\n<td align="right">giá trị phải lớn hơn hoặc bằng giá trị \n<code class="language-text">min</code></td>\n</tr>\n<tr>\n<td><code class="language-text">max</code></td>\n<td align="center">range, number, date, month, week, datetime, datetime-local, time</td>\n<td align="right">giá trị phải nhỏ hơn hoặc bằng giá trị \n<code class="language-text">max</code></td>\n</tr>\n<tr>\n<td><code class="language-text">required</code></td>\n<td align="center">text, search, url, tel, email, password, date, datetime, datetime-local, month, week, time, number, checkbox, radio, file, select, textarea</td>\n<td align="right">bắt buộc phải có giá trị</td>\n</tr>\n<tr>\n<td><code class="language-text">minlength</code></td>\n<td align="center">text, search, url, tel, email, password, textarea</td>\n<td align="right">số ký tự nhập vào phải thỏa lớn hơn hoặc bằng \n<code class="language-text">minlength</code></td>\n</tr>\n<tr>\n<td><code class="language-text">maxlength</code></td>\n<td align="center">text, search, url, tel, email, password, textarea</td>\n<td align="right">số ký tự nhập vào phải thỏa nhỏ hơn hoặc bằng \n<code class="language-text">maxlength</code></td>\n</tr>\n</tbody>\n</table>\n<p>Ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Enter username (upper and lowercase letters): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">required</span> <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[A-Za-z]+<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<h2 id="quá-trình-validate-dữ-liệu"><a href="#qu%C3%A1-tr%C3%ACnh-validate-d%E1%BB%AF-li%E1%BB%87u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Quá trình validate dữ liệu</h2>\n<p>Quá trình này sẽ thông qua bộ Validation API, nó có thể là trên cả form hoặc trên từng element trong form. Được thực hiện bằng một trong các cách sau\nbằng cách gọi <code class="language-text">checkValidity()</code> của các element input, select, button, textarea. Nó sẽ chỉ validate dữ liệu trên element đó thôi. Nó thường được thực hiện bởi trình duyệt, sau đó chúng ta dùng selector của CSS là <code class="language-text">:valid</code> và <code class="language-text">:invalid</code> để format\ngọi <code class="language-text">checkValidity()</code> hoặc <code class="language-text">reportValidity()</code> trên thằng form\nKhi form được submit bằng click ‘<input type=’submit’ /><code class="language-text">hoặc ‘&lt;button type=’submit’ /&gt;</code> hoặc ấn enter</p>\n<p>Lưu ý</p>\n<ul>\n<li>Nếu set novalidate trên thẻ <code class="language-text">&lt;form novalidate /&gt;</code>, là chúng ta bỏ qua hết việc validate</li>\n<li>Khi gọi <code class="language-text">submit()</code> trên form, không trigger validation, phương thức này sẽ gửi hết dữ liệu của form lên server dù nó có hay không thỏa điều kiện. Nên gọi sự kiện <code class="language-text">click()</code> của nút submit</li>\n</ul>\n<h2 id="can-thiệp-vào-quá-trình-validate-bằng-bộ-validation-api"><a href="#can-thi%E1%BB%87p-v%C3%A0o-qu%C3%A1-tr%C3%ACnh-validate-b%E1%BA%B1ng-b%E1%BB%99-validation-api" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Can thiệp vào quá trình validate bằng bộ Validation API</h2>\n<p>Ý tưởng chính là bắt một sự kiện nào đó trên element như <code class="language-text">onchange</code>, rồi trigger một đoạn javascript để validate, sau đó dùng phương thức <code class="language-text">field.setCustomValidity()</code> để set kết quả validate: nếu là String rỗng nghĩa là ok, còn ngược lại là error, đoạn string này sẽ đem đi hiển thị như thông báo error cho user</p>\n<h3 id="giới-hạn-file-size-khi-upload"><a href="#gi%E1%BB%9Bi-h%E1%BA%A1n-file-size-khi-upload" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Giới hạn file size khi upload</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>FS<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Select a file smaller than 75 kB : <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>FS<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Dùng javascript để đọc file được chọn, <code class="language-text">FIle.size()</code>, so sánh kích thước này rồi trả về kết quả cho trình duyệt</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">checkFileSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> <span class="token constant">FS</span> <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"FS"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> files <span class="token operator">=</span> <span class="token constant">FS</span><span class="token punctuation">.</span>files<span class="token punctuation">;</span>\n\n  <span class="token comment">// Nếu có ít nhất 1 file được chọn</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>files<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n     <span class="token keyword">if</span> <span class="token punctuation">(</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>size <span class="token operator">></span> <span class="token number">75</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// kiểm tra size</span>\n       <span class="token constant">FS</span><span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">"The selected file must not be larger than 75 kB"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token keyword">return</span><span class="token punctuation">;</span>\n     <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// Không có file, ko check.</span>\n  <span class="token constant">FS</span><span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Hook cái phương thức này vào trong sự kiện mong muốn</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"FS"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>onchange <span class="token operator">=</span> checkFileSize<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="hiển-thị-validation"><a href="#hi%E1%BB%83n-th%E1%BB%8B-validation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hiển thị validation</h2>\n<p>Dùng <code class="language-text">:required</code> và <code class="language-text">:optional</code> để trỏ đến các element nào có thuộc tính <code class="language-text">required</code> hoặc không</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">input:required</span> <span class="token punctuation">{</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">input:optional</span> <span class="token punctuation">{</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><code class="language-text">:valid</code> và <code class="language-text">:invalid</code> trên các element bị/không bị lỗi</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">input:valid</span> <span class="token punctuation">{</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">input:invalid</span> <span class="token punctuation">{</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Để thay đổi nội dung câu thông báo, sử dụng <code class="language-text">element.setCustomValidity(&#39;thông báo&#39;)</code> trên các element: <code class="language-text">&lt;fieldset&gt;</code>, <code class="language-text">&lt;input&gt;</code>, <code class="language-text">&lt;output&gt;</code>, <code class="language-text">&lt;select&gt;</code>, <code class="language-text">&lt;button&gt;</code>, <code class="language-text">&lt;textarea&gt;</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> nameInput <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'input\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> form <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'form\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nnameInput<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'input\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  nameInput<span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  nameInput<span class="token punctuation">.</span><span class="token function">checkValidity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nnameInput<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'invalid\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span><span class="token punctuation">(</span>nameInput<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">\'\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    nameInput<span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">\'Enter your username!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    nameInput<span class="token punctuation">.</span><span class="token function">setCustomValidity</span><span class="token punctuation">(</span><span class="token string">\'Usernames can only contain upper and lowercase letters. Try again!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation">Constraint validation\n</a></p>',timeToRead:4,excerpt:"Với HTML5 chúng ta có một số kiểu input để validate những giá trị mà user đưa vào, ko cần tự viết javascript để check, chỉ đơn giản là khai…",frontmatter:{title:"Ràng buộc dữ liệu input với HTML5",cover:"",date:"2019-03-25",category:null,tags:["mobile-web-specialist"],desc:"Vì form quá phức tạp, chúng ta cần thêm một bài viết nữa về validation với html"},fields:{slug:"/2019-03-25-rang-buoc-du-lieu-voi-html-5"}}},pathContext:{slug:"/2019-03-25-rang-buoc-du-lieu-voi-html-5",prev:{frontmatter:{title:"7 thủ thuật trong gatsby",desc:"Tập hợp những thủ thuật khi làm việc với gatsby",type:"post",category:null,tags:["gatsby"],date:"2019-03-31",cover:""},fields:{slug:"/2019-03-31-huong-dan-7-thu-thuat-trong-gatsby"}},next:{frontmatter:{title:"8 thủ thuật khi làm việc với Object sử dụng resting và spreading",desc:"Những đoạn code bỏ túi hay xài nhất khi đụng tới object",type:"post",category:null,tags:["react"],date:"2019-03-23",cover:""},fields:{slug:"/2019-03-23-thu-thuat-lam-viec-voi-object"}}}}}});
//# sourceMappingURL=path---2019-03-25-rang-buoc-du-lieu-voi-html-5-48d41985bf04fc0fb4ca.js.map