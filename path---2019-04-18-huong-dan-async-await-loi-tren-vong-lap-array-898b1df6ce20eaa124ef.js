webpackJsonp([0x94c0f7a5706],{1530:function(n,s){n.exports={data:{markdownRemark:{html:'<blockquote>\n<p><code class="language-text">async</code>/<code class="language-text">await</code> không hoạt động như chúng ta nghĩ, bên trong vòng lặp <code class="language-text">Array.prototype.forEach</code></p>\n</blockquote>\n<p>Ví dụ để thấy kết quả nếu dùng bên trong <code class="language-text">forEach</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> urls <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token string">\'https://jsonplaceholder.typicode.com/todos/1\'</span><span class="token punctuation">,</span>\n  <span class="token string">\'https://jsonplaceholder.typicode.com/todos/2\'</span><span class="token punctuation">,</span>\n  <span class="token string">\'https://jsonplaceholder.typicode.com/todos/3\'</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">await</span> urls<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> idx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> \n    <span class="token keyword">const</span> todo <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received Todo </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>idx<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> todo<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  \n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Finished!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">getTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Kết quả nhận được không phải theo thứ tự 1,2,3, mà là một <em>thứ tự không có thứ tự</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">Finished!\nReceived Todo <span class="token number">2</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nReceived Todo <span class="token number">1</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nReceived Todo <span class="token number">3</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>\n<p>Vấn đề 1: đoạn <em>Finished!</em> được log ra trước, mặc dù chúng ta đã đặt <code class="language-text">await</code> trước <code class="language-text">urls.forEach</code>. Chúng ta ko ép nó <code class="language-text">await</code> cả vòng lặp <code class="language-text">forEach</code> được</p>\n</li>\n<li>\n<p>Vấn đề 2: mỗi lần chạy <code class="language-text">fetch</code>, nó cũng ko <code class="language-text">await</code> cho tới khi xong mới chạy tiếp thằng thứ 2, vòng lặp sẽ vẫn chạy bình thường như ko hề có <code class="language-text">await</code> </p>\n</li>\n</ul>\n<blockquote>\n<p>Tóm lại, ko dùng <code class="language-text">forEach</code> chung với <code class="language-text">async</code>/<code class="language-text">await</code></p>\n</blockquote>\n<p>Để giải quyết vấn đề với <em>Finished!</em>, dùng <code class="language-text">Promise.all</code>, chúng ta có thể sử dụng <code class="language-text">Promise.all</code> để <code class="language-text">await</code> toàn bộ request</p>\n<p>Sửa lại hàm <code class="language-text">getTodos</code> ở trên </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> promises <span class="token operator">=</span> urls<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> idx</span><span class="token punctuation">)</span> <span class="token operator">=></span> \n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received Todo </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>idx<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>promises<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Finished!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Kết quả</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">Received Todo <span class="token number">1</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nReceived Todo <span class="token number">2</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nReceived Todo <span class="token number">3</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nFinished!</code></pre>\n      </div>\n<p>Một điểm cần lưu ý là <code class="language-text">Promise.all</code> sẽ cho tất cả xuất phát cùng lúc, nó sẽ ko đợi thằng này xong tới thằng kia, trong hầu hết các trường hợp thì ko vấn đề, thực ra lại tối ưu hiệu năng. Nhưng khi chúng ta cần chạy theo một thứ tự nhất định, ko thể dùng <code class="language-text">Promise.all</code>. Đoạn code trên là đúng là <code class="language-text">Received Todo 1,2,3</code> theo đúng thứ tự, nhưng đó là do <strong>hên</strong>, không đúng trong mọi trường hợp</p>\n<p>Để giải quyết triệt để, chúng ta dùng <code class="language-text">for...of</code>, nó sẽ đợi thằng <code class="language-text">await</code> trước đó chạy xong trước khi chạy tiếp</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>idx<span class="token punctuation">,</span> url<span class="token punctuation">]</span> <span class="token keyword">of</span> urls<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> todo <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Received Todo </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>idx<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> todo<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Finished!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu chúng ta ko cần tới index, viết gọn hơn như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> url <span class="token keyword">of</span> urls<span class="token punctuation">)</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Kết quả</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">Received Todo <span class="token number">1</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nReceived Todo <span class="token number">2</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nReceived Todo <span class="token number">3</span><span class="token punctuation">,</span> Response<span class="token operator">:</span> <span class="token punctuation">{</span> ··· <span class="token punctuation">}</span>\nFinished!</code></pre>\n      </div>\n<p>Cái giá phải trả khi sử dụng <code class="language-text">for...of</code> là nó rất chậm, hiệu năng thấp nhất trong các vòng lặp của array.</p>\n<p>Bạn có thể sử dụng vòng lặp <code class="language-text">for</code> căn bản nhất để vừa đạt kết quả vừa đạt hiệu năng tốt nhất.</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://medium.com/dailyjs/the-pitfalls-of-async-await-in-array-loops-cf9cf713bfeb">The Pitfalls of Async/Await in Array Loops\n</a></p>',timeToRead:2,excerpt:"/  không hoạt động như chúng ta nghĩ, bên trong vòng lặp  Ví dụ để thấy kết quả nếu dùng bên trong  Kết quả nhận được không phải theo thứ tự…",frontmatter:{title:"Vấn đề khi dùng array.forEach với async/await",cover:"",date:"2019-04-18",category:null,tags:["javascript"],desc:"Khi chúng ta sử dụng async/await bên trong vòng lặp array.forEach không cho kết quả đúng như mong muốn và cách giải quyết"},fields:{slug:"/2019-04-18-huong-dan-async-await-loi-tren-vong-lap-array"}}},pathContext:{slug:"/2019-04-18-huong-dan-async-await-loi-tren-vong-lap-array",prev:{frontmatter:{title:"Có gì mới trong DevTools của Chrome 74",desc:"Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome",type:"post",category:null,tags:["chrome"],date:"2019-04-24",cover:"https://i.imgur.com/bj1kcFp.png"},fields:{slug:"/2019-04-24-chrome-74-co-gi-moi"}},next:{frontmatter:{title:"Sửa lỗi scroll với fixed header bằng CSS",desc:"Giải quyết issue với fixed header và scroll đến một element bằng hashtag",type:"post",category:null,tags:["css"],date:"2019-04-17",cover:""},fields:{slug:"/2019-04-17-huong-dan-sua-loi-scroll-voi-fixed-header"}}}}}});
//# sourceMappingURL=path---2019-04-18-huong-dan-async-await-loi-tren-vong-lap-array-898b1df6ce20eaa124ef.js.map