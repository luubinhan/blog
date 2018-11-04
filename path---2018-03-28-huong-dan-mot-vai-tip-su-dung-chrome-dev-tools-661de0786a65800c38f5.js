webpackJsonp([66044771220268],{1232:function(e,t){e.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#k%C3%A9o-th%E1%BA%A3-c%C3%A1c-element">Kéo thả các Element</a></li>\n<li><a href="#reference-%C4%91%E1%BA%BFn-element-%C4%91ang-ch%E1%BB%8Dn-trong-console">Reference đến element đang chọn trong console</a></li>\n<li><a href="#g%E1%BB%8Di-l%E1%BA%A1i-gi%C3%A1-tr%E1%BB%8B-t%C3%ADnh-to%C3%A1n-l%E1%BA%A7n-tr%C6%B0%E1%BB%9Bc-trong-console">Gọi lại giá trị tính toán lần trước trong console</a></li>\n<li><a href="#x%C3%A1c-%C4%91%E1%BB%8Bnh-%C4%91o%E1%BA%A1n-css-%C4%91%C6%B0%E1%BB%A3c-%C4%91%E1%BB%8Bnh-ngh%C4%A9a-%E1%BB%9F-%C4%91%C3%A2u">Xác định đoạn CSS được định nghĩa ở đâu</a></li>\n<li><a href="#screenshot-m%E1%BB%99t-element">screenshot một element</a></li>\n<li><a href="#t%C3%ACm-element-s%E1%BB%AD-d%E1%BB%A5ng-css-selectors">Tìm element sử dụng CSS selectors</a></li>\n<li><a href="#shift-enter-trong-console">Shift-Enter trong console</a></li>\n<li><a href="#clear-console">Clear console</a></li>\n<li><a href="#go-to-nh%C6%B0-trong-sumblime-text-hay-vscode"><code class="language-text">Go to</code> như trong sumblime text hay VSCode</a></li>\n<li><a href="#watch-expression">Watch Expression</a></li>\n<li><a href="#xhrfetch-debugging">XHR/Fetch debugging</a></li>\n<li><a href="#debug-khi-dom-b%E1%BB%8B-thay-%C4%91%E1%BB%95i">Debug khi DOM bị thay đổi</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="kéo-thả-các-element"><a href="#k%C3%A9o-th%E1%BA%A3-c%C3%A1c-element" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Kéo thả các Element</h2>\n<p>Bên trong tab Elements có thể kéo các element HTML và thả nó vào vị trí mới</p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/drag-and-drop.gif" alt="Kéo thả các Element"></p>\n<h2 id="reference-đến-element-đang-chọn-trong-console"><a href="#reference-%C4%91%E1%BA%BFn-element-%C4%91ang-ch%E1%BB%8Dn-trong-console" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Reference đến element đang chọn trong console</h2>\n<p>Để reference đến 1 element đang được chọn, gõ <code class="language-text">$0</code>, nếu đang load jquery thì có thể dùng <code class="language-text">$($0)</code></p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/reference-elements.gif" alt="Reference đến element đang chọn trong console"></p>\n<h2 id="gọi-lại-giá-trị-tính-toán-lần-trước-trong-console"><a href="#g%E1%BB%8Di-l%E1%BA%A1i-gi%C3%A1-tr%E1%BB%8B-t%C3%ADnh-to%C3%A1n-l%E1%BA%A7n-tr%C6%B0%E1%BB%9Bc-trong-console" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Gọi lại giá trị tính toán lần trước trong console</h2>\n<p><code class="language-text">$_</code> để gọi lại giá trị tính toán lần trước</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">3 + 4\n// = 7\n$_ * 2\n// = 14</code></pre>\n      </div>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/use-last-result.gif" alt="Gọi lại giá trị tính toán lần trước trong console"></p>\n<h2 id="xác-định-đoạn-css-được-định-nghĩa-ở-đâu"><a href="#x%C3%A1c-%C4%91%E1%BB%8Bnh-%C4%91o%E1%BA%A1n-css-%C4%91%C6%B0%E1%BB%A3c-%C4%91%E1%BB%8Bnh-ngh%C4%A9a-%E1%BB%9F-%C4%91%C3%A2u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Xác định đoạn CSS được định nghĩa ở đâu</h2>\n<p><code class="language-text">cmd-click</code> (<code class="language-text">ctrl-click</code> trong windows) vào property CSS trong tab Elements để nhảy ngay tới chổ định nghĩa</p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/find-where-css-defined.gif" alt="Xác định đoạn CSS được định nghĩa ở đâu"></p>\n<h2 id="screenshot-một-element"><a href="#screenshot-m%E1%BB%99t-element" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>screenshot một element</h2>\n<p>Chọn element + nhấn <code class="language-text">cmd+shift+p</code> (<code class="language-text">ctrl+shift+p</code> trong windows) để mở menu Command và chọn <strong>Capture node screenshot</strong></p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/screenshot-node.gif" alt="screenshot một element"></p>\n<h2 id="tìm-element-sử-dụng-css-selectors"><a href="#t%C3%ACm-element-s%E1%BB%AD-d%E1%BB%A5ng-css-selectors" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tìm element sử dụng CSS selectors</h2>\n<p><code class="language-text">ctrl+f</code> (<code class="language-text">cmd+f</code> trong Mac) mở ô search, gõ đoạn css selector ở đây</p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/find-elements-css-selectors.gif" alt="Tìm element sử dụng CSS selectors"></p>\n<h2 id="shift-enter-trong-console"><a href="#shift-enter-trong-console" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Shift-Enter trong console</h2>\n<p>Để gõ đoạn code trên nhiều dòng trong console, ấn phím <code class="language-text">shift-enter</code></p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/multiple-lines-commands.gif" alt="Shift-Enter trong console"></p>\n<h2 id="clear-console"><a href="#clear-console" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Clear console</h2>\n<p>Để clear console thường ta sẽ nhấn nút Clear ở trên cùng, hoặc bằng gõ <code class="language-text">ctrl+l</code> (<code class="language-text">cmd+k</code>)</p>\n<h2 id="code-classlanguage-textgo-tocode-như-trong-sumblime-text-hay-vscode"><a href="#code-classlanguage-textgo-tocode-nh%C6%B0-trong-sumblime-text-hay-vscode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">Go to</code> như trong sumblime text hay VSCode</h2>\n<p>Trong tab Source</p>\n<ul>\n<li><code class="language-text">ctrl+o</code> (cmd+o) để hiển thị tất cả file đang load</li>\n<li><code class="language-text">ctrl+shift+o</code> (cmd+shift+o) để hiển thị biểu tượng property, function hay là class trong file hiện tại</li>\n<li><code class="language-text">ctrl+g</code> để nhảy đến dòng</li>\n</ul>\n<h2 id="watch-expression"><a href="#watch-expression" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Watch Expression</h2>\n<p>Thay vì phải viết đi viết lại biến hoặc expression trong lúc debug, thêm nó vào trong Watch Expression</p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/watch-expressions.gif" alt="Watch Expression"></p>\n<h2 id="xhrfetch-debugging"><a href="#xhrfetch-debugging" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>XHR/Fetch debugging</h2>\n<p>Chỉ định khi nào dừng nếu send đi một XHR/Fetch request trong XHR/Fetch breakpoint panel</p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/xhr-fetch-breakpoints.png"></p>\n<h2 id="debug-khi-dom-bị-thay-đổi"><a href="#debug-khi-dom-b%E1%BB%8B-thay-%C4%91%E1%BB%95i" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Debug khi DOM bị thay đổi</h2>\n<p>Right click vào element -> chọn <strong>enable Break on Subtree Modifications</strong>, khi có đoạn script nào thay đổi element, debugger sẽ stop ngay lập tức</p>\n<p><img src="https://flaviocopes.com/chrome-devtools-tips/break-subtree-modifications.png" alt="Debug khi DOM bị thay đổi"></p>',timeToRead:4,excerpt:"Kéo thả các Element Reference đến element đang chọn trong console Gọi lại giá trị tính toán lần trước trong console Xác định đoạn CSS được…",frontmatter:{title:"Một vài tip sử dụng Chrome Dev Tools",cover:"",date:"2018-03-28",category:null,tags:["chrome"],desc:"Chrome DevTools càng ngày càng mạnh mấy bạn, bạn nào làm frontend cũng phải biết xài, một vài tip cóp nhặt có thể bạn chưa biết"},fields:{slug:"/2018-03-28-huong-dan-mot-vai-tip-su-dung-chrome-dev-tools"}}},pathContext:{slug:"/2018-03-28-huong-dan-mot-vai-tip-su-dung-chrome-dev-tools",prev:{frontmatter:{title:"Query String với React Router",desc:"Cách sử dụng query string với React Router siêu căn bản",type:"post",category:null,tags:["javascript","react"],date:"2018-03-29",cover:""},fields:{slug:"/2018-03-29-huong-dan-query-string-voi-react-router"}},next:{frontmatter:{title:"Trick Sử dụng Sticky trong CSS",desc:"Một cái trick hay để giải quyết vấn đề thường mắt phải",type:"post",category:null,tags:["css"],date:"2018-03-27",cover:""},fields:{slug:"/2018-03-27-huong-dan-css-sticky-de-fixed-element"}}}}}});
//# sourceMappingURL=path---2018-03-28-huong-dan-mot-vai-tip-su-dung-chrome-dev-tools-661de0786a65800c38f5.js.map