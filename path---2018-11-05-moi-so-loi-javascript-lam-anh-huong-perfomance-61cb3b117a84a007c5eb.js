webpackJsonp([0x8d3d2d2c0d36],{1501:function(a,e){a.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#1-loop-qua-m%E1%BB%99t-array">1. loop qua một array</a></li>\n<li><a href="#2-duplicate-m%E1%BB%99t-array">2. Duplicate một array</a></li>\n<li><a href="#3-loop-qua-m%E1%BB%99t-object">3. Loop qua một object</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="1-loop-qua-một-array"><a href="#1-loop-qua-m%E1%BB%99t-array" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>1. loop qua một array</h2>\n<p>Chúng ta thử xem thời gian tiêu tốn cho việc loop qua 10k item trong array</p>\n<ul>\n<li><code class="language-text">for</code>:  ~10 microseconds</li>\n<li><code class="language-text">while</code>: ~11 microseconds</li>\n<li><code class="language-text">forEach</code>: ~77 microseconds</li>\n<li><code class="language-text">for-of</code>: ~110 microseconds</li>\n<li><code class="language-text">reduce</code>: ~113 microseconds</li>\n</ul>\n<p>Nếu muốn tính tổng của một array thì sử dụng <code class="language-text">reduce</code> là rõ ràng, tuy nhiên cái giá phải trả quá lớn. Vòng lặp mới nhất từ ES6 <code class="language-text">for-of</code> cũng về áp chót. Như vậy cứ xài vòng <code class="language-text">for</code> kinh điển, tuy cũ mà nhanh gấp 10 lần cái <code class="language-text">for-of</code></p>\n<h2 id="2-duplicate-một-array"><a href="#2-duplicate-m%E1%BB%99t-array" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2. Duplicate một array</h2>\n<p>Khi thế giới đang tồn thờ tư tưởng <strong>immutable function</strong> ( không sửa cái input khi cho ra output ), việc duplicate một input array là chuyện thường ngày ở huyện.</p>\n<p>Chúng ta hãy xem kết quả tất cả các cách chúng ta có thể dùng để duplicate một array</p>\n<ul>\n<li><code class="language-text">[].concat(arr)</code>: ~366 microseconds</li>\n<li><code class="language-text">arr.slice()</code>: ~367 microseconds</li>\n<li><code class="language-text">arr.map(x =&gt; x)</code>: ~469 microseconds</li>\n<li><code class="language-text">[...arr]</code>: ~512 microseconds</li>\n<li><code class="language-text">Array.from(arr)</code>: ~1,436 microseconds</li>\n</ul>\n<p>Như vậy 2 phương thức cũ như dưa mắm <code class="language-text">concat</code> và <code class="language-text">slice</code> vẫn dành chiến thắng, kiểu spread operation mới ES6 vẫn top cuối.</p>\n<h2 id="3-loop-qua-một-object"><a href="#3-loop-qua-m%E1%BB%99t-object" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>3. Loop qua một object</h2>\n<ul>\n<li><code class="language-text">for(let key in obj)</code>: ~240 microseconds</li>\n<li><code class="language-text">Object.keys(obj)</code> sau đó for each: ~294 microseconds</li>\n<li><code class="language-text">Object.entries(obj)</code> sau đó for of: ~535 microseconds</li>\n</ul>\n<p>Ở hai cách làm bên dưới, do phải tạo thêm một mảng chứa key, rồi mới loop qua mảng này object nên nó chậm.</p>\n<div class="note">Đừng mù quáng xài cách viết mới nếu không phù hợp với ứng dụng đang viết</div>\n<p><a href="https://hackernoon.com/3-javascript-performance-mistakes-you-should-stop-doing-ebf84b9de951" target="_blank" rel="noopener noreferrer">3 JavaScript Performance Mistakes You Should Stop Doing  &#x3C;/a</p>',timeToRead:2,excerpt:"1. loop qua một array 2. Duplicate một array 3. Loop qua một object 1. loop qua một array Chúng ta thử xem thời gian tiêu tốn cho việc loop…",frontmatter:{title:"3 lỗi javascript thường mắc phải làm ảnh hưởng perfomance",cover:"",date:"2018-11-05",category:null,tags:["javascript"],desc:"Bài viết dành cho những người nghiện tốc độ, nghiện cách viết ES6"},fields:{slug:"/2018-11-05-moi-so-loi-javascript-lam-anh-huong-perfomance"}}},pathContext:{slug:"/2018-11-05-moi-so-loi-javascript-lam-anh-huong-perfomance",prev:{frontmatter:{title:"Chia sẻ của lead team React Native trong quá trình lập team React Native",desc:"Bài viết sẽ phù hợp với founder của một startup, hoặc CTO. Bài viết này là chia sẻ của một team lead đang làm React Native, khía cạnh kỹ thuật cũng như cách tổ chức một team.",type:"post",category:null,tags:["react-native"],date:"2018-11-06",cover:""},fields:{slug:"/2018-11-06-react-native-lap-team-nhu-the-nao"}},next:{frontmatter:{title:"Giới thiệu React.memo",desc:"Api mới của React 16.6",type:"post",category:null,tags:["react"],date:"2018-11-04",cover:""},fields:{slug:"/2018-11-04-gioi-thieu-react-memo-moi-trong-react-16"}}}}}});
//# sourceMappingURL=path---2018-11-05-moi-so-loi-javascript-lam-anh-huong-perfomance-61cb3b117a84a007c5eb.js.map