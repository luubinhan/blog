webpackJsonp([0x91246ac341de],{1471:function(n,e){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#logpoint">Logpoint</a></li>\n<li><a href="#tooltip-hi%E1%BB%83n-th%E1%BB%8B-chi-ti%E1%BA%BFt-v%E1%BB%81-element-trong-inspect-mode">Tooltip hiển thị chi tiết về element trong Inspect mode</a></li>\n<li><a href="#export-d%E1%BB%AF-li%E1%BB%87u-code-coverage">Export dữ liệu code coverage</a></li>\n<li><a href="#di-chuy%E1%BB%83n-b%C3%AAn-trong-c%E1%BB%ADa-s%E1%BB%95-console-b%E1%BA%B1ng-ph%C3%ADm-m%C5%A9i-t%C3%AAn">Di chuyển bên trong cửa sổ Console bằng phím mũi tên</a></li>\n<li><a href="#th%C3%AAm-%C4%91%C6%B0%E1%BB%9Dng-contrast-%C4%91%E1%BB%81-ngh%E1%BB%8B-trong-popup-color-picker">Thêm đường contrast đề nghị trong popup Color Picker</a></li>\n<li><a href="#l%C6%B0u-gi%C3%A1-tr%E1%BB%8B-geolocation-%C4%91%C3%A3-thay-%C4%91%E1%BB%95i">Lưu giá trị Geolocation đã thay đổi</a></li>\n<li><a href="#code-folding">Code Folding</a></li>\n<li><a href="#message-tab">Message Tab</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="logpoint"><a href="#logpoint" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Logpoint</h2>\n<p>Cho phép log message trong cửa sổ Console mà không cần dùng lệnh <code class="language-text">console.log()</code> bên trong source</p>\n<p>Để add logpoint</p>\n<p>1 - click phải chuột tại vị trí mong muốn trong source code, chọn <strong>Add logpoint</strong>\n<img src="https://developers.google.com/web/updates/images/2019/01/add-logpoint.png" alt="Chọn Add logpoint trong source"></p>\n<p>2 - Nó sẽ hiện ra popup, nhập vào đó một cái expression mong muốn\n<img src="https://developers.google.com/web/updates/images/2019/01/breakpoint-editor.png" alt="Popup để nhập expression">\n<img src="https://developers.google.com/web/updates/images/2019/01/logpoint-expression.png" alt="Nhập giá trị biến trong cửa sổ popup"></p>\n<blockquote>\n<p>Để nhập giá trị biến, ví dụ <code class="language-text">TodoApp</code>, đặt tên biến bên trong dấu <code class="language-text">{}</code> như vầy <code class="language-text">{TodoApp}</code></p>\n</blockquote>\n<p>Đọc thêm bài viết <a href="https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4#a4f3">Always Log Objects</a> để nắm rõ hơn cú pháp này.</p>\n<p>3 - Click vào vùng bên bất kỳ để save, một cái badge màu cam sẽ đánh dấu cho biết đang log ở vị trí đó. click vào cái badge này để bỏ log, giá trị log này sẽ ko bị mất khi bạn refresh trang.\n<img src="https://developers.google.com/web/updates/images/2019/01/logpoint-badge.png" alt="Nhập giá trị biến trong cửa sổ popup"></p>\n<h2 id="tooltip-hiển-thị-chi-tiết-về-element-trong-inspect-mode"><a href="#tooltip-hi%E1%BB%83n-th%E1%BB%8B-chi-ti%E1%BA%BFt-v%E1%BB%81-element-trong-inspect-mode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tooltip hiển thị chi tiết về element trong Inspect mode</h2>\n<p>Trong khi đang mở chế độ inspect element <img src="https://developers.google.com/web/tools/chrome-devtools/images/shared/inspect.png">, nếu đưa chuột lên trên element đó, một cửa sổ nhỏ hiển thị thông tin quan trong như font size, font color, contrast ratio, margin</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/inspect.png" alt="Tooltip hiển thị chi tiết về element trong Inspect mode"></p>\n<h2 id="export-dữ-liệu-code-coverage"><a href="#export-d%E1%BB%AF-li%E1%BB%87u-code-coverage" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Export dữ liệu code coverage</h2>\n<p>Code coverage là kết quả đánh giá có bao nhiêu phần trong code đã được thực thi, <a href="https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage">xem thêm chi tiết</a>, bây giờ chúng ta có thể export kết quả này ra file json, nội dung file sẽ như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://wndt73.glitch.me/style.css"</span><span class="token punctuation">,</span>\n    <span class="token property">"ranges"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">"start"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n        <span class="token property">"end"</span><span class="token operator">:</span> <span class="token number">21</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">"start"</span><span class="token operator">:</span> <span class="token number">45</span><span class="token punctuation">,</span>\n        <span class="token property">"end"</span><span class="token operator">:</span> <span class="token number">67</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"body { margin: 1em; } figure { padding: 0; } h1 { color: #317EFB; }"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  ...\n<span class="token punctuation">]</span></code></pre>\n      </div>\n<ul>\n<li>\n<p><code class="language-text">url</code> là đường dẫn source file css, hay js đã analyze</p>\n</li>\n<li>\n<p><code class="language-text">ranges</code> là phần code đã sử dụng, trong đó có <code class="language-text">start</code> là hàng đầu tiên, đến vị trí <code class="language-text">end</code></p>\n</li>\n<li>\n<p><code class="language-text">text</code> là toàn bộ source code</p>\n</li>\n<li>\n<p>Đầu tiên gọi <code class="language-text">Control + Shift + P</code> để mở cửa sổ Command</p>\n</li>\n<li></li>\n</ul>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/command-menu.png" alt="mở cửa sổ Command"></p>\n<ol start="2">\n<li>Gõ vào đoạn text <code class="language-text">coverage</code></li>\n</ol>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/show-coverage.png" alt="Chọn Coverage">\n<img src="https://developers.google.com/web/updates/images/2019/01/coverage.png" alt="Cửa sổ Coverage"></p>\n<ol start="3">\n<li>\n<p>Click <strong>Reload</strong> <img src="https://developers.google.com/web/tools/chrome-devtools/images/shared/reload.png" alt="Reload"> để tiến hành analyze</p>\n</li>\n<li>\n<p>Click nút <strong>Export</strong> <img src="https://developers.google.com/web/tools/chrome-devtools/images/shared/export.png" alt="Export"> để xuất file</p>\n</li>\n</ol>\n<h2 id="di-chuyển-bên-trong-cửa-sổ-console-bằng-phím-mũi-tên"><a href="#di-chuy%E1%BB%83n-b%C3%AAn-trong-c%E1%BB%ADa-s%E1%BB%95-console-b%E1%BA%B1ng-ph%C3%ADm-m%C5%A9i-t%C3%AAn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Di chuyển bên trong cửa sổ Console bằng phím mũi tên</h2>\n<p>Ấn Shift + Tab bên trong cửa sổ Console</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/focus1.png" alt="Focusing a link"></p>\n<p>Dùng phím mũi tên lên xuống để di chuyển, trái phải để mở hoặc đóng toàn bộ một node</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/focus2.png" alt="Focusing another link"></p>\n<h2 id="thêm-đường-contrast-đề-nghị-trong-popup-color-picker"><a href="#th%C3%AAm-%C4%91%C6%B0%E1%BB%9Dng-contrast-%C4%91%E1%BB%81-ngh%E1%BB%8B-trong-popup-color-picker" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thêm đường contrast đề nghị trong popup Color Picker</h2>\n<p>Popup Color Picker giờ sẽ có thêm một đường nữa gọi là <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html">AAA Contrast Ratio recommendation</a>, trước đây chỉ có một đường là AA</p>\n<p>Đường ở trên là AA, đường dưới là AAA</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/AAA.png" alt="The AA line (top) and AAA line (bottom)"></p>\n<p>Nếu bạn chưa biết, contrast ratio là độ tương phản đề nghị cần có cho chữ và màu nền để người đọc web có thể đọc được nội dung, design thường thích kiểu chữ xám xám trong khi nó rất khó đọc.</p>\n<h2 id="lưu-giá-trị-geolocation-đã-thay-đổi"><a href="#l%C6%B0u-gi%C3%A1-tr%E1%BB%8B-geolocation-%C4%91%C3%A3-thay-%C4%91%E1%BB%95i" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lưu giá trị Geolocation đã thay đổi</h2>\n<p>Mở cửa sổ <strong>Sensors</strong> Control + Shift + P, gõ tìm <strong>Sensors</strong> </p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/command-menu.png" alt="Command Menu">\n<img src="https://developers.google.com/web/updates/images/2019/01/sensors.png" alt="Sensors tab"></p>\n<p>Trong mục <strong>Geolocation</strong> click <strong>Manager</strong>. <strong>Settings > Geolocations</strong> trong cửa sổ mới mở ra</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/geolocations.png" alt="Geolocations tab in Settings"></p>\n<p>Chọn <strong>Add location</strong>, nhập thông tin xong chọn <strong>Add</strong></p>\n<h2 id="code-folding"><a href="#code-folding" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Code Folding</h2>\n<p>Trong cửa sổ <strong>Source</strong> và <strong>Network</strong> có thể thu gọn code, kiểu collapse ấy</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/folding.png" alt="Lines 54 to 65 have been folded"></p>\n<p>Để bật tính năng này, ấn F1 để vào <strong>Settings > Preferences > Source **, sau đó chọn mục **Code Folding</strong></p>\n<h2 id="message-tab"><a href="#message-tab" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Message Tab</h2>\n<p>Cửa sổ <strong>Frames</strong> giờ đổi tên thành <strong>Message</strong>, nó chỉ có trong tab <strong>Network</strong>, dùng để inspect web socket connection</p>\n<p><img src="https://developers.google.com/web/updates/images/2019/01/messages.png" alt="Messages tab"></p>\n<p><a href="https://www.youtube.com/watch?v=uddZX9ZK6wY&#x26;list=WL&#x26;index=2&#x26;t=0s">Xem video ở đây</a></p>',timeToRead:5,excerpt:"Logpoint Tooltip hiển thị chi tiết về element trong Inspect mode Export dữ liệu code coverage Di chuyển bên trong cửa sổ Console bằng phím…",frontmatter:{title:"Chrome 73 có gì mới",cover:"",date:"2019-03-10",category:null,tags:["chrome"],desc:"Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome"},fields:{slug:"/2019-03-10-chrome-73-co-gi-moi"}}},pathContext:{slug:"/2019-03-10-chrome-73-co-gi-moi",prev:{frontmatter:{title:"Function Component khác Class component như thế nào trong React",desc:"Ngày xưa khi chưa có hook, thì rất dễ để trả lời câu này, nhưng từ ngày hook được sử dụng, câu hỏi lại này lại được đặt ra, ủa vậy 2 thằng nó khác nhau ở điểm nào.",type:"post",category:null,tags:["react"],date:"2019-03-12",cover:""},fields:{slug:"/2019-03-12-su-khac-nhau-giua-function-component-va-class-component-trong-react"}},next:{frontmatter:{title:"for vs forEach vs for/in vs for/of trong javascript",desc:"Trong javascript có rất nhiều cách để loop qua một array, chúng ta cùng bàn qua 4 cách chính hay sử dụng nhất",type:"post",category:null,tags:["javascript"],date:"2019-03-07",cover:""},fields:{slug:"/2019-03-07-huong-dan-lua-chon-phuong-thuc-lap-trong-array"}}}}}});
//# sourceMappingURL=path---2019-03-10-chrome-73-co-gi-moi-1b5259037e8b95856ac5.js.map