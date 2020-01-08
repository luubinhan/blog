webpackJsonp([46825453465067],{1581:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#setinterval">setInterval</a></li>\n<li><a href="#settimeout">setTimeout</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nếu bạn cần gọi một hàm <strong>lặp lại</strong> theo một khoản thời gian nhất định trong javascript bạn sẽ dùng gì? Một là dùng <code class="language-text">setInterval</code>  hay là đệ quy <code class="language-text">setTimeout</code></p>\n<p>Vì sao bạn nên cân nhắc trước khi sử dụng <code class="language-text">setInterval</code>, nó đã gây ra tội tình gì? Vì sao sẽ tốt hơn nếu chúng ta lắng nghe và đợi một <em>tín hiệu</em> nào đó rồi chạy</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// đợi tính hiệu nào đó rồi thực thi một số việc </span>\n  <span class="token comment">// sẽ luôn là lựa chọn tốt nhất</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Nếu ông bà có dạy <em>đợi mua bò mới đi làm chuồng thì đã muộn</em> không đúng trong trường hợp này. <strong>CÓ</strong> trước hẳn làm gì thì làm.</p>\n<h3 id="setinterval"><a href="#setinterval" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>setInterval</h3>\n<p>Với <code class="language-text">setInterval</code> nó sẽ tiếp tục chạy cho tới khi chúng ta ra lệnh xóa nó hoặc đóng luôn trình duyệt.</p>\n<p><code class="language-text">setInterval</code> cam kết đoạn code của chúng ta nó sẽ được đưa vào <strong>STACK</strong> theo đúng một chu kỳ thời gian. <em>Tuy nhiên</em>, đoạn code này của bạn <strong>không được cam kết</strong> sẽ chạy theo đúng chu kỳ thời gian, phụ thuộc vào các yếu tố khác nữa, và đã phần là có độ trễ, theo một cách dân gian ta gọi nó là <strong>HÊN XUI</strong></p>\n<p><img src="https://miro.medium.com/max/1837/1*A138JkWveIfKajztvhu60g.png" alt="Bàn luận về setTimeout và setInterval trong javascript"></p>\n<p>Thời gian chạy của hàm <code class="language-text">dummyMethod1</code> tốn nhiều thời gian hơn dự tính, lý do thì không rõ.</p>\n<blockquote>\n<p>Nếu bạn chưa biết, javascript được thiết kế để chạy single thread, nghĩa là nó <strong>không</strong> thực hiện hai công việc cùng một lúc.</p>\n</blockquote>\n<p>Điều đó có nghĩa, các phương thức khác phía trên stack phải đợi cho đến khi <code class="language-text">dummyMethod1</code> làm xong công chuyện của nó.</p>\n<p>Thêm một ví dụ khác, nếu hàm khai báo bên trong <code class="language-text">setInterval</code> có thời gian chạy lớn hơn giá trị delay của <code class="language-text">setInterval</code> (ví dụ như hàm gọi ajax), chúng ta sẽ có vấn đề như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token function-variable function">fakeCallToServer</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'returning from server\'</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">4000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">let</span> insideSetInterval <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'insideSetInterval\'</span><span class="token punctuation">,</span> insideSetInterval<span class="token punctuation">)</span><span class="token punctuation">;</span>\n <span class="token function">fakeCallToServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//insideSetInterval 14:13:47</span>\n<span class="token comment">//insideSetInterval 14:13:49</span>\n<span class="token comment">//insideSetInterval 14:13:51</span>\n<span class="token comment">//returning from server 14:13:51</span>\n<span class="token comment">//insideSetInterval 14:13:53</span>\n<span class="token comment">//returning from server 14:13:53 </span>\n<span class="token comment">//insideSetInterval 14:13:55</span>\n<span class="token comment">//returning from server 14:13:55</span></code></pre>\n      </div>\n<p>Như kết quả ở trên cho thấy, câu <code class="language-text">console.log(&quot;insideSetInterval&quot;)</code> sẽ liên tục gọi ajax bất kể trước đó đã gọi thành công chưa. Đáng lẽ chúng ta phải kết thúc việc gọi liên tục này, đa phần chúng ta quên <code class="language-text">clearInterval</code>. Nó sẽ tạo ra một hàng đợi <em>dài ngoằn</em> trong stack.</p>\n<p>Giờ thử một xử lý tuần tự trong <code class="language-text">setInterval</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> <span class="token function-variable function">fakeTimeIntensiveOperation</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> <span class="token number">50000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'random\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">let</span> insideTimeTakingFunction  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'insideTimeTakingFunction\'</span><span class="token punctuation">,</span> insideTimeTakingFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> \n\n    <span class="token keyword">let</span> insideSetInterval <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'insideSetInterval\'</span><span class="token punctuation">,</span> insideSetInterval<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    counter<span class="token operator">++</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span>counter <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token function">fakeTimeIntensiveOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>counter <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//insideSetInterval 13:50:53</span>\n<span class="token comment">//insideTimeTakingFunction 13:50:55</span>\n<span class="token comment">//insideSetInterval 13:50:55 &lt;---- mất tiêu câu gọi lúc 54 giây</span>\n<span class="token comment">//insideSetInterval 13:50:56</span>\n<span class="token comment">//insideSetInterval 13:50:57</span>\n<span class="token comment">//insideSetInterval 13:50:58</span></code></pre>\n      </div>\n<p>Những gì đang diễn ra ở trên, với một thao tác tốn kha khá thời gian xử lý, nó mất hẳn đoạn code <code class="language-text">console.log(&quot;insideSetInterval&quot;)</code>, nôm na là nó bị <em>đứt một nhịp</em>, tình huống này xảy ra với Chrome, nó tạo ra một <em>nhịp</em> mới.</p>\n<p>Thay vì dùng <code class="language-text">setInterval</code>, chúng ta có thể dùng đệ quy <code class="language-text">setTimeout</code></p>\n<h3 id="settimeout"><a href="#settimeout" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>setTimeout</h3>\n<p>Mặc dù cũng chưa hẳn cam kết 100% đoạn code của chúng chạy đúng theo một chu kỳ đã định với đệ quy <code class="language-text">setTimeout</code>. Chí ít nó cũng không gây ra chuyện đưa hàng đống lệnh chờ chạy vào trong stack</p>\n<p><img src="https://miro.medium.com/max/1920/1*A9gNYo3pOtnzuXi30NHjfA.png" alt="Bàn luận về setTimeout và setInterval trong javascript"></p>\n<p>Khi thực hiện bằng <code class="language-text">setTimeout</code>, bên trong vòng đệ quy chúng ta đã có bước kiểm tra <strong>có nên</strong> gọi thêm lần nữa không.</p>\n<p>Lưu ý khi bạn dùng setTimeout, chớ có <strong>thực thi</strong> hàm đó luôn (kèm dấu <code class="language-text">()</code>), chúng ta chỉ truyền hàm đó thôi</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token comment">// ☠ Lỗi</span>\n<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>\n<span class="token comment">// 👍 OK</span>\n<span class="token function">setTimeout</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p><strong>Nguồn tham khảo</strong></p>\n<p><a href="https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9">Why not to use setInterval</a></p>\n<p><a href="https://develoger.com/settimeout-vs-setinterval-cff85142555b">setTimeout VS setInterval</a></p>\n<p><a href="https://javascript.info/settimeout-setinterval">Scheduling: setTimeout and setInterval</a></p>',timeToRead:4,excerpt:"setInterval setTimeout Nếu bạn cần gọi một hàm  lặp lại  theo một khoản thời gian nhất định trong javascript bạn sẽ dùng gì? Một là dùng…",frontmatter:{title:"Bàn luận về setTimeout và setInterval trong javascript",cover:"",date:"2019-11-16",category:null,tags:["hoc-thuat","javascript"],desc:"Một số vấn đề về setTimeout đáng để bạn cân nhắc trước khi sử dụng"},fields:{slug:"/2019-11-16-ban-luan-settimout-va-setinterval-trong-javascript"}}},pathContext:{slug:"/2019-11-16-ban-luan-settimout-va-setinterval-trong-javascript",prev:{frontmatter:{title:"Tại sao lại sinh ra React hook",desc:"Tại sao và lợi ích mà react hook đem lại là gì, mà thiên hạ cứ rần rần lên vậy?",type:"post",category:null,tags:["hoc-thuat","react"],date:"2019-11-17",cover:""},fields:{slug:"/2019-11-17-giai-thich-tai-sao-ban-can-react-hook"}},next:{frontmatter:{title:"Gắn video làm background toàn màn hình",desc:"Chia sẽ kỹ thuật làm background video để chạy full màn hình",type:"post",category:null,tags:["thu-thuat","javascript","react","css"],date:"2019-11-12",cover:""},fields:{slug:"/2019-11-12-lam-video-fullscreen-voi-react"}}}}}});
//# sourceMappingURL=path---2019-11-16-ban-luan-settimout-va-setinterval-trong-javascript-8aa2aac7a2d060e9601f.js.map