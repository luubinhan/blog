webpackJsonp([0xd48ccab81c27],{1279:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#v%E1%BA%A5n-%C4%91%E1%BB%81-portal-gi%E1%BA%A3i-quy%E1%BA%BFt">Vấn đề Portal giải quyết</a></li>\n<li><a href="#c%C3%BA-ph%C3%A1p">Cú pháp</a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng">Sử dụng</a></li>\n</ul>\n<!-- /TOC -->\n<p>Gọi là bản hổ trợ chính thức vì trước bản React 16 thì không có support, chúng ta phải dùng các thư viện bổ sung. Giờ thì nó official rồi nhé.</p>\n<h2 id="vấn-đề-portal-giải-quyết"><a href="#v%E1%BA%A5n-%C4%91%E1%BB%81-portal-gi%E1%BA%A3i-quy%E1%BA%BFt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Vấn đề Portal giải quyết</h2>\n<p>Thông thường khi chúng ta có component cha là A, bên trong đó render component con là B, thì thằng B này sẽ luôn bị bọc lại bên trong A</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-c<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Giờ nếu ta muốn khi viết thì vẫn viết component B bên trong component A, nhưng kết quả html ta có được thì component B lại nằm trong component C. Đó là lúc chúng ta cần đến Portal, ta sẽ bọc component B bằng hàm <code class="language-text">createPortal</code>, để khi <code class="language-text">render</code> B thì nó lại <code class="language-text">render</code> ở C.</p>\n<h2 id="cú-pháp"><a href="#c%C3%BA-ph%C3%A1p" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cú pháp</h2>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">createPortal</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Trong đó</p>\n<ul>\n<li><code class="language-text">ReactDOM.createPortal</code> là hàm của <code class="language-text">react-dom</code></li>\n<li>child là thằng B, thằng con đi lông nhông không thèm ở nhà với cha nó</li>\n<li>container là nhà thằng hàng xóm, nơi thằng con B hoang đàng sẽ ở ké.</li>\n</ul>\n<h2 id="sử-dụng"><a href="#s%E1%BB%AD-d%E1%BB%A5ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng</h2>\n<p>Để sử dụng Portal, chúng ta tạo ra một component mới, độc lập với B, rồi đẩy thằng B hay bất kỳ đứa nào muốn có cuộc sống du mục thành child component của component mới tạo này, đặt tên là <code class="language-text">MyPortal</code> nha.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> PropTypes <span class="token keyword">from</span> <span class="token string">\'prop-types\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">MyPortal</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// tìm coi có đứa nào chịu chứa chấp nó không</span>\n    <span class="token keyword">const</span> haveTarget <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// không nơi chứa chấp thì ta ko render luôn</span>\n    <span class="token keyword">return</span> haveTarget <span class="token operator">?</span> ReactDOM<span class="token punctuation">.</span><span class="token function">createPortal</span><span class="token punctuation">(</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">,</span>\n      haveTarget\n    <span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">null</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nMyPortal<span class="token punctuation">.</span>propTypes <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// là id của html element ta sẽ append cái đứa con hoang đàng vô</span>\n  target<span class="token punctuation">:</span> PropTypes<span class="token punctuation">.</span>string<span class="token punctuation">.</span>isRequired<span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> MyPortal<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Component A sẽ viết như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token operator">...</span>\n<span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        Hello An<span class="token punctuation">.</span>Luu\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyPortal</span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>targetForB<span class="token punctuation">\'</span></span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                Em là <span class="token constant">B</span><span class="token operator">!</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>MyPortal</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>\n<span class="token operator">...</span>\n\n<span class="token comment">// trong đó, id có thể nằm ở bất kỳ component nào đó khác, thậm chí window khác luôn mới ghê</span>\n\n<span class="token comment">// ví dụ component C</span>\n<span class="token operator">...</span>\n<span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-c<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        Em là <span class="token constant">C</span><span class="token operator">!</span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>targetForB<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>\n<span class="token operator">...</span></code></pre>\n      </div>\n<p>Đọc thêm </p>\n<ul>\n<li><a href="https://reactjs.org/docs/portals.html">https://reactjs.org/docs/portals.html</a> </li>\n<li><a href="https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202">https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202</a></li>\n</ul>',timeToRead:3,excerpt:"Vấn đề Portal giải quyết Cú pháp Sử dụng Gọi là bản hổ trợ chính thức vì trước bản React 16 thì không có support, chúng ta phải dùng các thư…",frontmatter:{title:"Giới thiệu React Portal",cover:"",date:"2018-05-31",category:"react",tags:["javascript","react"],desc:"Tìm hiểu về Portals, bản hổ trợ chính thức của react-dom"},fields:{slug:"/2018-05-31-huong-dan-gioi-thieu-react-portal"}}},pathContext:{slug:"/2018-05-31-huong-dan-gioi-thieu-react-portal",prev:{frontmatter:{title:"Kinh nghiệm tổ chức file và thư mục React project",desc:"Có bao giờ cảm thấy lạc lối trong đóng code ngày càng lúc bự ra, một vài tip từ người có kinh nghiệm",type:"post",category:"react",tags:["react"],date:"2018-06-08",cover:""},fields:{slug:"/2018-06-08-huong-dan-kinh-nghiem-lam-viec-voi-du-an-lon"}},next:{frontmatter:{title:"Hướng dẫn webpack 4 cho người mới bắt đầu - Phần 3",desc:"Bài này sẽ nói Plugins, Development, HotModuleReplacement trong Webpack",type:"post",category:"javascript",tags:["javascript","webpack"],date:"2018-05-28",cover:""},fields:{slug:"/2018-05-28-huong-dan-webpack-4-cho-nguoi-moi-bat-dau-phan-3"}}}}}});
//# sourceMappingURL=path---2018-05-31-huong-dan-gioi-thieu-react-portal-f633376dfa3a94e604a2.js.map