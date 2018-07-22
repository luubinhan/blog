webpackJsonp([0xa27b475bf260],{501:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#chuy%E1%BB%87n-g%C3%AC-x%E1%BA%A3y-ra-khi-g%E1%BB%8Di-setsate-">Chuyện gì xảy ra khi gọi <code class="language-text">setSate</code> ?</a></li>\n<li><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-element-v%C3%A0-component-trong-react">Sự khác nhau giữa Element và Component trong React?</a></li>\n<li><a href="#khi-n%C3%A0o-th%C3%AC-s%E1%BB%AD-d%E1%BB%A5ng-class-component-v%C3%A0-functional-component">Khi nào thì sử dụng Class Component và Functional Component</a></li>\n<li><a href="#refs-trong-react-d%C3%B9ng-%C4%91%E1%BB%83-l%C3%A0m-g%C3%AC"><code class="language-text">Refs</code> trong React dùng để làm gì</a></li>\n<li><a href="#keys-trong-react-l%C3%A0-g%C3%AC">Keys trong React là gì</a></li>\n<li>\n<p><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-controlled-component-v%C3%A0-uncontrolled-component">Sự khác nhau giữa controlled component và uncontrolled component</a></p>\n<ul>\n<li><a href="#controlled-component">Controlled Component</a></li>\n<li><a href="#uncontrolled-component">Uncontrolled Component</a></li>\n</ul>\n</li>\n<li><a href="#%C4%91%E1%BB%83-g%E1%BB%8Di-ajax-s%E1%BB%B1-d%E1%BB%A5ng-s%E1%BB%B1-ki%E1%BB%87n-n%C3%A0o-c%E1%BB%A7a-lifecycle">Để gọi AJAX, sự dụng sự kiện nào của lifecycle?</a></li>\n<li><a href="#shouldcomponentupdate-d%C3%B9ng-%C4%91%E1%BB%83-l%C3%A0m-g%C3%AC"><code class="language-text">shouldComponentUpdate</code> dùng để làm gì</a></li>\n<li><a href="#build-product-b%E1%BA%B1ng-c%C3%A1ch-n%C3%A0o">Build Product bằng cách nào?</a></li>\n<li><a href="#t%E1%BA%A1i-sao-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng-reactchildrenmap-thay-v%C3%AC-propschildrenmap">Tại sao nên sử dụng <code class="language-text">React.Children.map()</code> thay vì <code class="language-text">props.children.map()</code></a></li>\n<li><a href="#events-%C4%91%C6%B0%E1%BB%A3c-x%E1%BB%AD-l%C3%BD-trong-react-nh%C6%B0-th%E1%BA%BF-n%C3%A0o">Events được xử lý trong React như thế nào?</a></li>\n<li><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-createelement-v%C3%A0-cloneelement">Sự khác nhau giữa <code class="language-text">createElement</code> và <code class="language-text">cloneElement</code></a></li>\n<li><a href="#argument-th%E1%BB%A9-2-c%E1%BB%A7a-setstate-d%C3%B9ng-%C4%91%E1%BB%83-l%C3%A0m-g%C3%AC">Argument thứ 2 của <code class="language-text">setState</code> dùng để làm gì</a></li>\n<li><a href="#%C4%91o%E1%BA%A1n-code-sau-sai-%E1%BB%9F-ch%E1%BB%95-n%C3%A0o">Đoạn code sau sai ở chổ nào</a></li>\n</ul>\n<!-- /TOC -->\n<h1 id="chuyện-gì-xảy-ra-khi-gọi-code-classlanguage-textsetsatecode-"><a href="#chuy%E1%BB%87n-g%C3%AC-x%E1%BA%A3y-ra-khi-g%E1%BB%8Di-code-classlanguage-textsetsatecode-" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chuyện gì xảy ra khi gọi <code class="language-text">setSate</code> ?</h1>\n<p>Đầu tiên, object được truyền trong <code>setState</code> sẽ được merge với state hiện tại của component, dựa trên sự thay đổi của object này, UI được update với state mới. Để làm được chuyện này, React sẽ dựng một cây React Element mới, so sánh sự khác nhau của cây element mới và cây element trước đó, React biết được chính xác chỉ cần update phần UI nào đã bị thay đổi.</p>\n<h1 id="sự-khác-nhau-giữa-element-và-component-trong-react"><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-element-v%C3%A0-component-trong-react" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sự khác nhau giữa Element và Component trong React?</h1>\n<p>React Element ám chỉ những gì thấy trên màn hình.</p>\n<p>React component là một function hoặc class có hoặc không có input và sẽ trả về một React element.</p>\n<h1 id="khi-nào-thì-sử-dụng-class-component-và-functional-component"><a href="#khi-n%C3%A0o-th%C3%AC-s%E1%BB%AD-d%E1%BB%A5ng-class-component-v%C3%A0-functional-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Khi nào thì sử dụng Class Component và Functional Component</h1>\n<p>Nếu component có state và các phương thức của lifecycle, sử dụng <strong>Class Component</strong>, ngược lại dùng <strong>functional component</strong></p>\n<h1 id="code-classlanguage-textrefscode-trong-react-dùng-để-làm-gì"><a href="#code-classlanguage-textrefscode-trong-react-d%C3%B9ng-%C4%91%E1%BB%83-l%C3%A0m-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">Refs</code> trong React dùng để làm gì</h1>\n<p>Refs cho phép access trực tiếp đến DOM element hoặc một instance của component</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> this.input = input} /></code></pre>\n      </div>\n<h1 id="keys-trong-react-là-gì"><a href="#keys-trong-react-l%C3%A0-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Keys trong React là gì</h1>\n<p>Keys giúp React theo dõi sự thay đổi của một item trong list, tại sao thêm key? để tối ưu performance, giúp React tìm nhanh tới element đó khi cần.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>todoItems<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> <span class="token punctuation">(</span>task<span class="token punctuation">,</span> uid<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>task<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="sự-khác-nhau-giữa-controlled-component-và-uncontrolled-component"><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-controlled-component-v%C3%A0-uncontrolled-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sự khác nhau giữa controlled component và uncontrolled component</h1>\n<p>Controlled component là component React control dữ liệu dựa trên state và props, uncontrolled component là component mà dữ liệu được handle bởi DOM</p>\n<h2 id="controlled-component"><a href="#controlled-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Controlled Component</h2>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>text<span class="token punctuation">\'</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>username<span class="token punctuation">}</span></span> <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>updateUsername<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h2 id="uncontrolled-component"><a href="#uncontrolled-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Uncontrolled Component</h2>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>text<span class="token punctuation">\'</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>input <span class="token operator">=</span> input<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h1 id="Để-gọi-ajax-sự-dụng-sự-kiện-nào-của-lifecycle"><a href="#%C4%90%E1%BB%83-g%E1%BB%8Di-ajax-s%E1%BB%B1-d%E1%BB%A5ng-s%E1%BB%B1-ki%E1%BB%87n-n%C3%A0o-c%E1%BB%A7a-lifecycle" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Để gọi AJAX, sự dụng sự kiện nào của lifecycle?</h1>\n<p><code class="language-text">componentDidMount</code> , lý do ko sử dụng <code>componentWillMount</code> vì React  có thể gọi componentWillMount nhiều lần nếu cần thiết, thứ 2 không thể chắc chắn AJAX luôn gọi thành công, nếu gơi vào trường hợp đó câu lệnh <code>setState</code> sẽ chạy trên unmounted component.</p>\n<h1 id="code-classlanguage-textshouldcomponentupdatecode-dùng-để-làm-gì"><a href="#code-classlanguage-textshouldcomponentupdatecode-d%C3%B9ng-%C4%91%E1%BB%83-l%C3%A0m-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">shouldComponentUpdate</code> dùng để làm gì</h1>\n<p><code class="language-text">shouldComponentUpdate</code> cho phép can thiệp quá trình update UI của component và các component con của nó.</p>\n<h1 id="build-product-bằng-cách-nào"><a href="#build-product-b%E1%BA%B1ng-c%C3%A1ch-n%C3%A0o" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Build Product bằng cách nào?</h1>\n<p>Sử dụng phương thức DefinePlugin của Webpack để set <code class="language-text">NODE_ENV = production</code>. Quá trình build production sẽ bỏ hết những đoạn như validate propType, cảnh báo này nọ, minify code, remove comments.</p>\n<h1 id="tại-sao-nên-sử-dụng-code-classlanguage-textreactchildrenmapcode-thay-vì-code-classlanguage-textpropschildrenmapcode"><a href="#t%E1%BA%A1i-sao-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng-code-classlanguage-textreactchildrenmapcode-thay-v%C3%AC-code-classlanguage-textpropschildrenmapcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tại sao nên sử dụng <code class="language-text">React.Children.map()</code> thay vì <code class="language-text">props.children.map()</code></h1>\n<p><code class="language-text">props.children</code> chưa chắc lúc nào cũng là array. Ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Parent</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Welcome<span class="token punctuation">.</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Parent</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nếu sử dụng <code class="language-text">props.children.map</code> trong Parent sẽ bị lỗi vì <code class="language-text">props.children</code> là một object không phải array.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Parent</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Welcome<span class="token punctuation">.</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>props<span class="token punctuation">.</span>children will now be an array<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Parent</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p><code class="language-text">React.Children.map</code> cho phép <code class="language-text">props.children</code> là array hoặc object đều được.</p>\n<h1 id="events-được-xử-lý-trong-react-như-thế-nào"><a href="#events-%C4%91%C6%B0%E1%BB%A3c-x%E1%BB%AD-l%C3%BD-trong-react-nh%C6%B0-th%E1%BA%BF-n%C3%A0o" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Events được xử lý trong React như thế nào?</h1>\n<p>Các hàm xử lý event trong React sẽ được truyền vào một instance của <code class="language-text">SyntheticEvent</code>, <code class="language-text">SyntheticEvent</code> cũng giống như những native event bình thường của Browser trừ việc nó có thể làm việc trên tất cả các trình duyệt.</p>\n<p>React không attach event vô các child node, mà sẽ lắng nghe tất cả các event sử dụng 1 event listener duy nhất, Với mục đích là để tăng performance và React không cần phải update lại event listener khi update DOM.</p>\n<h1 id="sự-khác-nhau-giữa-code-classlanguage-textcreateelementcode-và-code-classlanguage-textcloneelementcode"><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-code-classlanguage-textcreateelementcode-v%C3%A0-code-classlanguage-textcloneelementcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sự khác nhau giữa <code class="language-text">createElement</code> và <code class="language-text">cloneElement</code></h1>\n<p><code class="language-text">createElement</code> là để tạo element, <code class="language-text">cloneElement</code> copy element và đưa vào các props mới.</p>\n<h1 id="argument-thứ-2-của-code-classlanguage-textsetstatecode-dùng-để-làm-gì"><a href="#argument-th%E1%BB%A9-2-c%E1%BB%A7a-code-classlanguage-textsetstatecode-d%C3%B9ng-%C4%91%E1%BB%83-l%C3%A0m-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Argument thứ 2 của <code class="language-text">setState</code> dùng để làm gì</h1>\n<p>callback function, function sẽ chạy sau khi <code class="language-text">component</code> được <code class="language-text">render</code> lại với state mới.</p>\n<p><code class="language-text">setState</code> là một phương thức bất đồng bộ (asynchronous)</p>\n<h1 id="Đoạn-code-sau-sai-ở-chổ-nào"><a href="#%C4%90o%E1%BA%A1n-code-sau-sai-%E1%BB%9F-ch%E1%BB%95-n%C3%A0o" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đoạn code sau sai ở chổ nào</h1>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span>prevState<span class="token punctuation">,</span> props<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n <span class="token keyword">return</span> <span class="token punctuation">{</span> streak<span class="token punctuation">:</span> prevState<span class="token punctuation">.</span>streak <span class="token operator">+</span> props<span class="token punctuation">.</span>count <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Không sai gì cả, ít người biết rằng khi <code class="language-text">setState</code> có thể truyền vào <code class="language-text">previous state</code>.</p>\n<p>Nguồn</p>\n<p><a href="https://tylermcginnis.com/react-interview-questions/">https://tylermcginnis.com/react-interview-questions/</a></p>',timeToRead:8,excerpt:"Chuyện gì xảy ra khi gọi   ? Sự khác nhau giữa Element và Component trong React? Khi nào thì sử dụng Class Component và Functional Component…",frontmatter:{title:"Interview React Developer thì hỏi gì?",cover:"",date:"2017-07-17",category:"javascript",tags:["javascript","react"],desc:"Một vài câu hỏi để kiểm tra mức độ am hiểu react của một lập trình viên frontend"},fields:{slug:"/2017-07-17-interview-react-developer-thi-hoi-gi"}}},pathContext:{slug:"/2017-07-17-interview-react-developer-thi-hoi-gi"}}}});
//# sourceMappingURL=path---2017-07-17-interview-react-developer-thi-hoi-gi-6151ef44dfc3820dc4ca.js.map