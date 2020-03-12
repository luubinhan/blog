webpackJsonp([0xe76e942d5926],{1593:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-slot-%c4%91%e1%bb%83-component-d%e1%bb%85-hi%e1%bb%83u-h%c6%a1n-v%c3%a0-d%e1%bb%85-t%c3%b9y-bi%e1%ba%bfn-h%c6%a1n">Sử dụng <code class="language-text">slot</code> để component dễ hiểu hơn và dễ tùy biến hơn</a></li>\n<li><a href="#t%e1%bb%95-ch%e1%bb%a9c-vuex-store">Tổ chức Vuex Store</a></li>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-action-%c4%91%e1%bb%83-l%e1%ba%a5y-v%c3%a0-g%e1%bb%adi-d%e1%bb%af-li%e1%bb%87u">Sử dụng action để lấy và gửi dữ liệu</a></li>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-mapstate-mapgetters-mapmutations-v%c3%a0-mapactions">Sử dụng <code class="language-text">mapState</code>, <code class="language-text">mapGetters</code>, <code class="language-text">mapMutations</code> và <code class="language-text">mapActions</code></a></li>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-api-factories">Sử dụng API Factories</a></li>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-config-%c4%91%e1%bb%83-truy-c%e1%ba%adp-bi%e1%ba%bfn-m%c3%b4i-tr%c6%b0%e1%bb%9dng">Sử dụng <code class="language-text">$config</code> để truy cập biến môi trường</a></li>\n<li><a href="#tu%c3%a2n-theo-m%e1%bb%99t-nguy%c3%aan-t%e1%ba%afc-chung-khi-vi%e1%ba%bft-commit">Tuân theo một nguyên tắc chung khi viết commit</a></li>\n<li><a href="#khi-l%c3%aan-production-fix-lu%c3%b4n-c%c3%a1c-package-version-%c4%91ang-x%c3%a0i">Khi lên production, fix luôn các package version đang xài</a></li>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-virtual-scroller-khi-hi%e1%bb%83n-th%e1%bb%8b-nhi%e1%bb%81u-d%e1%bb%af-li%e1%bb%87u">Sử dụng Virtual Scroller khi hiển thị nhiều dữ liệu</a></li>\n<li><a href="#ki%e1%bb%83m-tra-dung-l%c6%b0%e1%bb%a3ng-package">Kiểm tra dung lượng package</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="sử-dụng-code-classlanguage-textslotcode-để-component-dễ-hiểu-hơn-và-dễ-tùy-biến-hơn"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-code-classlanguage-textslotcode-%C4%91%E1%BB%83-component-d%E1%BB%85-hi%E1%BB%83u-h%C6%A1n-v%C3%A0-d%E1%BB%85-t%C3%B9y-bi%E1%BA%BFn-h%C6%A1n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng <code class="language-text">slot</code> để component dễ hiểu hơn và dễ tùy biến hơn</h2>\n<p>Bài viết hướng dẫn chi tiết khái niệm và cách dùng <code class="language-text">slot</code> bạn <a href="/2019-10-20-huong-dan-ung-dung-tuyet-voi-cua-vue-renderless-component">đọc lại ở đây</a>. Với việc sử dụng <code class="language-text">slot</code> bạn sẽ có những component với khả năng <em>xào đi nấu lại</em> dễ hơn.</p>\n<p>Một ví dụ để thấy lợi ích của slot trong thực tế.</p>\n<p>Khi mới nhận thiết kế từ bên design, popup modal vô cùng đơn giản, chỉ gồm <code class="language-text">title</code>, <code class="language-text">description</code> và dâm ba cái button bên dưới. Thoạt nhìn chúng ta chỉ cần 3 cái <code class="language-text">prop</code> và một sự kiện bắn ra khi click button để thay đổi tùy theo tình huống sử dụng.</p>\n<p>Nhưng sau một thời gian, bên design họ vẽ vời thêm một mớ mới, nhúng form, chèn hẳn một component khác vào trong đó, vâng vâng. <code class="language-text">Prop</code> không đáp ứng nổi độ khùng của mấy bạn design. Và cách mà chúng ta refactor lại cái modal bằng <code class="language-text">slot</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>c-base-popup<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>$slot.header<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>c-base-popup__header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>$slot.subheader<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>c-base-popup__subheader<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>subheader<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>c-base-popup__body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>{{ title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>description<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ description }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>$slot.actions<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>c-base-popup__actions<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>actions<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>$slot.footer<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>c-base-popup__footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  props<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    description<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> String<span class="token punctuation">,</span>\n      <span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token keyword">null</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> String<span class="token punctuation">,</span>\n      required<span class="token punctuation">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<h2 id="tổ-chức-vuex-store"><a href="#t%E1%BB%95-ch%E1%BB%A9c-vuex-store" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tổ chức Vuex Store</h2>\n<p>Một lập trình viên bắt đầu mò mẫm cách xài Vuex vì họ gặp 2 vấn đề sau</p>\n<ol>\n<li>Cần truy cập vào dữ liệu từ một component khác, nó nằm xa ơi là xa so với component hiện tại.</li>\n<li>Sau khi component bị xóa khỏi DOM, bạn vẫn muốn dữ liệu đó không bị xóa</li>\n</ol>\n<p>Khi bắt đầu tạo Vuex Store, chúng ta bắt đầu học được khái niệm <code class="language-text">module</code> và cách sử dụng trong ứng dụng.</p>\n<p>Không một quy chuẩn nào để tổ chức <code class="language-text">module</code>, đồng nghĩa là mỗi người mỗi ý, đa phần các lập trình viên sẽ tổ chức theo dạng tính năng</p>\n<ul>\n<li>Auth</li>\n<li>Blog</li>\n<li>Inbox</li>\n<li>Setting</li>\n</ul>\n<p>Hợp lý mà, một cách tiếp cận khác cũng hợp lý luôn là tổ chức theo dữ liệu trả về từ API</p>\n<ul>\n<li>User</li>\n<li>Team</li>\n<li>Message</li>\n<li>Widget</li>\n<li>Article</li>\n</ul>\n<p>Vì là quan điểm nên không thể nói đúng sai, nhưng chúng ta phải <strong>thống nhất một cách</strong> tổ chức Vuex Store mà mọi người đều đồng ý là hợp lý. Người mới vào team cũng dễ follow hơn.</p>\n<p><a href="http://vuilaptrinh.com/2018-11-10-huong-dan-to-chuc-vuex-store-tren-du-an-lon/">Xem Kinh nghiệm tổ chức Vuex cho ứng dụng lớn</a></p>\n<p><a href="http://vuilaptrinh.com/2019-10-12-flat-state-trong-vue-store-de-toi-uu-toc-do/"># Sử dụng flat state trong Vue Store</a></p>\n<h2 id="sử-dụng-action-để-lấy-và-gửi-dữ-liệu"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-action-%C4%91%E1%BB%83-l%E1%BA%A5y-v%C3%A0-g%E1%BB%ADi-d%E1%BB%AF-li%E1%BB%87u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng action để lấy và gửi dữ liệu</h2>\n<p>Hầu hết các network request được đưa vào Vuex action. Bạn có thắc mắc, tại sao lại thế? 🤨</p>\n<p>Đơn giản là vì hầu hết các dữ liệu lấy về sẽ được đưa vào trong store. Mặc khác, xét trên khía cạnh đóng gói và tái sử dụng thì đây là cách mang lại sự dễ chịu khi sử dụng nhất.</p>\n<h2 id="sử-dụng-code-classlanguage-textmapstatecode-code-classlanguage-textmapgetterscode-code-classlanguage-textmapmutationscode-và-code-classlanguage-textmapactionscode"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-code-classlanguage-textmapstatecode-code-classlanguage-textmapgetterscode-code-classlanguage-textmapmutationscode-v%C3%A0-code-classlanguage-textmapactionscode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng <code class="language-text">mapState</code>, <code class="language-text">mapGetters</code>, <code class="language-text">mapMutations</code> và <code class="language-text">mapActions</code></h2>\n<p>Không có lý do gì phải có nhiều giá trị <code class="language-text">computed</code> hoặc phương thức chỉ vì bạn cần truy cập vào <code class="language-text">state/getter</code> hoặc gọi <code class="language-text">actions/mutations</code> bên trong component. Sử dụng các hàm được cung cấp sẵn của Vuex <code class="language-text">mapState</code>, <code class="language-text">mapGetters</code>, <code class="language-text">mapMutations</code> và <code class="language-text">mapActions</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> mapState<span class="token punctuation">,</span> mapGetters<span class="token punctuation">,</span> mapActions<span class="token punctuation">,</span> mapMutations <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuex"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  computed<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// truy cập properties trong my_module</span>\n    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span><span class="token string">"my_module"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"property"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token comment">// truy cập getters</span>\n    <span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token string">"my_module"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"property"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token comment">// truy cập các properties khác</span>\n    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span><span class="token string">"my_module"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n      <span class="token function-variable function">property</span><span class="token punctuation">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>object<span class="token punctuation">.</span>nested<span class="token punctuation">.</span>property\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// truy cập actions</span>\n    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span><span class="token string">"my_module"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"myAction"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token comment">// truy cập mutations</span>\n    <span class="token operator">...</span><span class="token function">mapMutations</span><span class="token punctuation">(</span><span class="token string">"my_module"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"myMutation"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a href="https://vuex.vuejs.org/guide/modules.html">Xem tài liệu của Vuex</a></p>\n<h2 id="sử-dụng-api-factories"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-api-factories" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng API Factories</h2>\n<p>Tạo một hàm <code class="language-text">this.$api</code> để có thể gọi ở bất kỳ đâu khi cần tạo network request. Trong thư mục gốc, thêm một thư mục tên <code class="language-text">api</code> chứa tất cả các phương thức liên quan</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">api\n├── auth.js\n├── notifications.js\n└── teams.js</code></pre>\n      </div>\n<p><a href="https://vuejs.org/v2/guide/plugins.html">Xem cách đăng ký một phương thức global</a></p>\n<h2 id="sử-dụng-code-classlanguage-textconfigcode-để-truy-cập-biến-môi-trường"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-code-classlanguage-textconfigcode-%C4%91%E1%BB%83-truy-c%E1%BA%ADp-bi%E1%BA%BFn-m%C3%B4i-tr%C6%B0%E1%BB%9Dng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng <code class="language-text">$config</code> để truy cập biến môi trường</h2>\n<p>Trong bộ source chúng ta sẽ luôn cần những biến chưa config trên môi trường khác nhau</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">config\n├── development.json\n└── production.json</code></pre>\n      </div>\n<p>Nếu có thể truy cập những biến này thông qua <code class="language-text">this.$config</code> có phải tiện lợi lắm không</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> development <span class="token keyword">from</span> <span class="token string">"@/config/development.json"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> production <span class="token keyword">from</span> <span class="token string">"@/config/production.json"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">"production"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$config <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>production<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$config <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>development<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="tuân-theo-một-nguyên-tắc-chung-khi-viết-commit"><a href="#tu%C3%A2n-theo-m%E1%BB%99t-nguy%C3%AAn-t%E1%BA%AFc-chung-khi-vi%E1%BA%BFt-commit" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tuân theo một nguyên tắc chung khi viết commit</h2>\n<p>Nếu bạn nào có contribute cho các dự án trên Github, sẽ thấy lợi ích của việc có một chuẩn chung khi viết diễn giải cho commit. Có thể lấy cách viết của <a href="https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines">Angular tham khảo</a></p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">git</span> commit -am <span class="token string">"&lt;type>(&lt;scope>): &lt;subject>"</span>\n\n<span class="token comment"># Một vài ví dụ</span>\n<span class="token function">git</span> commit -am <span class="token string">"docs(changelog): update changelog to beta.5"</span>\n<span class="token function">git</span> commit -am <span class="token string">"fix(release): need to depend on latest rxjs and zone.js"</span></code></pre>\n      </div>\n<p><a href="http://vuilaptrinh.com/2019-10-04-huong-dan-viet-code-vue-chuan">Xem Bộ guide để viết code sạch dành riêng cho Vue</a></p>\n<h2 id="khi-lên-production-fix-luôn-các-package-version-đang-xài"><a href="#khi-l%C3%AAn-production-fix-lu%C3%B4n-c%C3%A1c-package-version-%C4%91ang-x%C3%A0i" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Khi lên production, fix luôn các package version đang xài</h2>\n<p>Không phải package nào cũng được đặt version theo quy tắc đã chuẩn hóa. Để tránh nửa đêm bị gọi dậy vì một trong các package đã cài bộ source bỗng dưng không tương thích, production không còn chạy như trên local.</p>\n<p>Tội đồ là cái prefix <code class="language-text">^</code> này. Xóa hết nó khi lên production</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my project"</span><span class="token punctuation">,</span>\n\n  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>\n\n  <span class="token property">"private"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\n  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"axios"</span><span class="token operator">:</span> <span class="token string">"0.19.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"imagemin-mozjpeg"</span><span class="token operator">:</span> <span class="token string">"8.0.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"imagemin-pngquant"</span><span class="token operator">:</span> <span class="token string">"8.0.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"imagemin-svgo"</span><span class="token operator">:</span> <span class="token string">"7.0.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"nuxt"</span><span class="token operator">:</span> <span class="token string">"2.8.1"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"autoprefixer"</span><span class="token operator">:</span> <span class="token string">"9.6.1"</span><span class="token punctuation">,</span>\n    <span class="token property">"babel-eslint"</span><span class="token operator">:</span> <span class="token string">"10.0.2"</span><span class="token punctuation">,</span>\n    <span class="token property">"eslint"</span><span class="token operator">:</span> <span class="token string">"6.1.0"</span><span class="token punctuation">,</span>\n    <span class="token property">"eslint-friendly-formatter"</span><span class="token operator">:</span> <span class="token string">"4.0.1"</span><span class="token punctuation">,</span>\n    <span class="token property">"eslint-loader"</span><span class="token operator">:</span> <span class="token string">"2.2.1"</span><span class="token punctuation">,</span>\n    <span class="token property">"eslint-plugin-vue"</span><span class="token operator">:</span> <span class="token string">"5.2.3"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><a href="https://semver.org/">Xem Nguyên tắc đặt version</a></p>\n<h2 id="sử-dụng-virtual-scroller-khi-hiển-thị-nhiều-dữ-liệu"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-virtual-scroller-khi-hi%E1%BB%83n-th%E1%BB%8B-nhi%E1%BB%81u-d%E1%BB%AF-li%E1%BB%87u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng Virtual Scroller khi hiển thị nhiều dữ liệu</h2>\n<p>Khi cần hiển thị một số lượng lớn các hàng dữ liệu trên mộ trang, việc loop qua toàn bộ dữ liệu và render sẽ bị chậm. Dùng <a href="https://github.com/Akryum/vue-virtual-scroller">vue-virtual-scroller</a></p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> vue-virtual-scroller</code></pre>\n      </div>\n<p>Nó sẽ chỉ render các dữ liệu có thể vừa vặn trong viewport, phần dữ liệu chưa hiển thị trên viewport sẽ được <em>lazy</em> render khi cuộn tới, tăng tốc độ đáng kể</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RecycleScroller</span>\n    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>scroller<span class="token punctuation">"</span></span>\n    <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span>\n    <span class="token attr-name">:item-size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>32<span class="token punctuation">"</span></span>\n    <span class="token attr-name">key-field</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span>\n    <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{ item }<span class="token punctuation">"</span></span>\n  <span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      {{ item.name }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RecycleScroller</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<h2 id="kiểm-tra-dung-lượng-package"><a href="#ki%E1%BB%83m-tra-dung-l%C6%B0%E1%BB%A3ng-package" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Kiểm tra dung lượng package</h2>\n<p>Bộ source lớn thường đồng nghĩa sử dụng nhiều package <em>lụm</em> được trên mạng, nếu không để ý, việc cài đặt bừa bãi các package này dễ dẫn đến việc dung lượng tăng vọt</p>\n<p><a href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost">Visual Studio Code có công cụ để kiểm tra dung lượng import</a> hoặc chạy công cụ <a href="https://www.npmjs.com/package/webpack-bundle-analyzer">Webpack Bundle Analyzer</a></p>\n<p><strong>Bài viết sử dụng tham khảo</strong></p>\n<p><a href="https://www.telerik.com/blogs/10-good-practices-building-maintaining-large-vuejs-projects">https://www.telerik.com/blogs/10-good-practices-building-maintaining-large-vuejs-projects</a></p>',
timeToRead:9,excerpt:"Sử dụng   để component dễ hiểu hơn và dễ tùy biến hơn Tổ chức Vuex Store Sử dụng action để lấy và gửi dữ liệu Sử dụng  ,  ,   và  Sử dụng…",frontmatter:{title:"10 kinh nghiệm khi làm việc với các dự án lớn viết bằng Vue.js",cover:"",date:"2019-11-01",category:null,tags:["kinh-nghiem","vuejs"],desc:"Đây là 10 kinh nghiệm được đúc kết trong lúc làm việc với các bộ source lớn. Vấn đề với tất cả các bộ source lớn là nó rất khó để bảo trì."},fields:{slug:"/2019-11-01-muoi-kinh-nghiem-lam-viec-voi-du-an-vue-lon"}}},pathContext:{slug:"/2019-11-01-muoi-kinh-nghiem-lam-viec-voi-du-an-vue-lon",prev:{frontmatter:{title:"Thuật toán QuickSort",desc:"Một thuật toán rất phổ biến mà chúng ta phải nắm thật chắc và hình dung được cách hiện thực nó ngay khi được nhắc tới.",type:"post",category:null,tags:["hoc-thuat","javascript"],date:"2019-11-02",cover:""},fields:{slug:"/2019-11-02-gioi-thieu-thuat-toan-quicksort"}},next:{frontmatter:{title:"JAMstack và ngành công nghiệp hủ tiếu gõ Việt Nam",desc:"Sau khi đọc bài này, bạn sẽ hiểu được JAMstack là gì, lợi lộc gì, để hiện thức hóa JAMstack bạn cần nghiên cứu những công cụ gì",type:"post",category:null,tags:["hoc-thuat"],date:"2019-10-30",cover:""},fields:{slug:"/2019-10-30-gioi-thieu-jamstack"}}}}}});
//# sourceMappingURL=path---2019-11-01-muoi-kinh-nghiem-lam-viec-voi-du-an-vue-lon-dacda1dc9b73da6448d3.js.map