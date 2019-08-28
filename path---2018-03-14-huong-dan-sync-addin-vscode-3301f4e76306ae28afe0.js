webpackJsonp([0xe36e30e358a7],{1294:function(t,n){t.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#t%E1%BA%A1o-access-token-tr%C3%AAn-github">Tạo access token trên Github</a></li>\n<li><a href="#upload-nh%E1%BB%AFng-thi%E1%BA%BFt-%C4%91%E1%BA%B7t-extensions-%C4%91%C3%A3-c%C3%A0i-cho-vscode">Upload những thiết đặt, extensions đã cài cho VSCode</a></li>\n<li><a href="#download-c%C3%A1c-thi%E1%BA%BFt-t%E1%BB%AB-gist-v%E1%BB%81">Download các thiết từ gist về</a></li>\n</ul>\n<!-- /TOC -->\n<p>Cần có</p>\n<ul>\n<li>Tài khoản Github, danh sách extension sẽ được lưu lên gist</li>\n<li>Cài thêm extention tên là Settings Sync - tác giả Shan Khan.</li>\n</ul>\n<h1 id="tạo-access-token-trên-github"><a href="#t%E1%BA%A1o-access-token-tr%C3%AAn-github" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tạo access token trên Github</h1>\n<p>Đăng nhập vào tài khoản Github, vào trang Settings / Developer settings / Personal access tokens / Generate New Token</p>\n<p><img src="https://shanalikhan.github.io/img/github1.PNG" alt="Sync extensions của VSCode"></p>\n<p>Nhập tên và cấp quyền tạo gist cho token này</p>\n<p><img src="https://shanalikhan.github.io/img/github2.PNG" alt="Sync extensions của VSCode"></p>\n<p>Sau khi tạo xong, nhớ lưu lại token này ở đâu đó</p>\n<p><img src="https://shanalikhan.github.io/img/github3.PNG" alt="Sync extensions của VSCode"></p>\n<h1 id="upload-những-thiết-đặt-extensions-đã-cài-cho-vscode"><a href="#upload-nh%E1%BB%AFng-thi%E1%BA%BFt-%C4%91%E1%BA%B7t-extensions-%C4%91%C3%A3-c%C3%A0i-cho-vscode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Upload những thiết đặt, extensions đã cài cho VSCode</h1>\n<p>Dùng phím tắt <code class="language-text">Shift + Alt + U</code> hoặc search từ command Palette, search từ sync</p>\n<p>Nó sẽ yêu cầu nhập giá trị token vừa mới tạo</p>\n<p><img src="https://shanalikhan.github.io/img/upload1.png" alt="Sync extensions của VSCode"></p>\n<p>Sau khi upload thành công, nó sẽ trả về gist id, <strong>nhớ copy</strong> và lưu lại giá trị gist Id này để sử dụng trên máy khác.</p>\n<h1 id="download-các-thiết-từ-gist-về"><a href="#download-c%C3%A1c-thi%E1%BA%BFt-t%E1%BB%AB-gist-v%E1%BB%81" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Download các thiết từ gist về</h1>\n<p>Dùng phím tắt <code class="language-text">Shift + Alt + D</code>, hoặc gọi từ command palette</p>\n<p>Nó sẽ yêu cầu nhập lại token và gist id đã tạo, điền vào, xong!\n<img src="https://shanalikhan.github.io/img/upload1.png" alt="Sync extensions của VSCode">\n<img src="https://shanalikhan.github.io/img/download2.png" alt="Sync extensions của VSCode">\n<img src="https://shanalikhan.github.io/img/download3.png" alt="Sync extensions của VSCode"></p>',timeToRead:2,excerpt:"Tạo access token trên Github Upload những thiết đặt, extensions đã cài cho VSCode Download các thiết từ gist về Cần có Tài khoản Github…",frontmatter:{title:"Sync extensions của VSCode",cover:"",date:"2018-03-14",category:null,tags:["javascript"],desc:"Khi sử dụng VSCode chắc ai cũng cài thêm một mớ extensions, lỡ ngày nào cài lại máy, hay sử dụng máy công ty, máy tính ở nhà muốn VSCode sync mấy cái extention hay sử dụng"},fields:{slug:"/2018-03-14-huong-dan-sync-addin-vscode"}}},pathContext:{slug:"/2018-03-14-huong-dan-sync-addin-vscode",prev:{frontmatter:{title:"Authentication với JWT",desc:"Giới thiệu JSON Web Tokens (JWT) và cách hiện thực",type:"post",category:null,tags:["javascript","react","security"],date:"2018-03-14",cover:""},fields:{slug:"/2018-03-14-huong-dan-react-authentication-voi-jwt-redux"}},next:{frontmatter:{title:"Sử dụng biến Node Environment",desc:"Biến environment là một phần cơ bản cần biết khi làm việc với Node",type:"post",category:"javascript",tags:["javascript","webpack"],date:"2018-03-09",cover:""},fields:{slug:"/2018-03-09-huong-dan-su-dung-bien-enviroment-nhu-the-nao"}}}}}});
//# sourceMappingURL=path---2018-03-14-huong-dan-sync-addin-vscode-3301f4e76306ae28afe0.js.map