webpackJsonp([0x72fd1883ab78],{1277:function(e,n){e.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#x%C3%A1c-th%E1%BB%B1c">Xác thực</a></li>\n<li><a href="#ki%E1%BB%83m-tra-d%E1%BB%AF-li%E1%BB%87u">Kiểm tra dữ liệu</a></li>\n<li><a href="#truy-c%E1%BA%ADp-%C4%91%E1%BA%BFn-c%C3%A1c-documents-kh%C3%A1c">Truy cập đến các documents khác</a></li>\n<li><a href="#h%C3%A0m-t%C3%B9y-bi%E1%BA%BFn">Hàm tùy biến</a></li>\n</ul>\n<!-- /TOC -->\n<h1 id="xác-thực"><a href="#x%C3%A1c-th%E1%BB%B1c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Xác thực</h1>\n<p>Một trong những tình huống phổ biến nhất là cho phép truy cập dữ liệu nếu user đã đăng nhập (còn gọi là xác thực, authentication).</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">service cloud.firestore {\n  match /databases/{database}/documents {\n    // Cho phép user truy cập document\n    // trong collection cities nếu đã đăng nhập\n    match /cities/{city} {\n      allow read, write: if request.auth.uid != null;\n    }\n  }\n}</code></pre>\n      </div>\n<p>Hoặc một tình huống phổ biến thứ 2 là cho phép user read và write lên dữ liệu của chính user đó</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">services cloud.firestore {\n  match /databases/{database}/documents {\n    // chỉ cho phép uid khớp với userId trong document.\n    // Dùng ký tự đại diện {userId} như một biến bên trong câu điều kiện\n    match /users/{userId} {\n      allow read, update, delete: if request.auth.uid == userId;\n      allow create: if request.auth.uid != null;\n    }\n  }\n}</code></pre>\n      </div>\n<p>Nếu đang sử dụng Firebase Authentication, biến <code class="language-text">request.auth</code> sẽ chưa thông tin của user gởi request, xem thêm chi tiết <a href="https://firebase.google.com/docs/reference/rules/rules.firestore.Request#auth">ở đây.</a></p>\n<h1 id="kiểm-tra-dữ-liệu"><a href="#ki%E1%BB%83m-tra-d%E1%BB%AF-li%E1%BB%87u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Kiểm tra dữ liệu</h1>\n<p>Nếu muốn can thiệp việc cho phép hoặc từ chối truy cập theo dữ liệu trong document</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">service cloud.firestore {\n  match /databases/{database}/documents {\n    // cho phép truy cập nếu giá trị của visibility bằng public\n    match /cities/{city} {\n      allow read: if resource.data.visibility == &#39;public&#39;;\n    }\n  }\n}</code></pre>\n      </div>\n<p>Biến <code class="language-text">resource</code> tương ứng với dữ liệu của document đang request, <code class="language-text">request.data</code> sẽ là toàn bộ các field lưu trong document</p>\n<p>Trước khi write dữ liệu xuống, chúng ta sẽ muốn kiểm tra dữ liệu đang có và dữ liệu mới. Nếu chúng ta đang set rule pending write (không write dữ liệu ngay lập tức mà đợi xí), biến <code class="language-text">request.resource</code> lúc này sẽ chứa dữ liệu mới.</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">service cloud.firestore {\n  match /databases/{database}/documents {\n    match /cities/{city} {\n      allow update: if request.resource.data.population &gt; 0\n      &amp;&amp; request.resource.data.name == resource.data.name\n    }\n  }\n}</code></pre>\n      </div>\n<h1 id="truy-cập-đến-các-documents-khác"><a href="#truy-c%E1%BA%ADp-%C4%91%E1%BA%BFn-c%C3%A1c-documents-kh%C3%A1c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Truy cập đến các documents khác</h1>\n<p>Sử dụng <code class="language-text">get()</code> và <code class="language-text">exists()</code> chúng ta có thể đánh giá các request với các documents trong database. Cả hai hàm này đều yêu cầu chỉ định đường dẫn đầy đủ, và phải đưa biến theo cú pháp <code class="language-text">$(biến)</code> trong đường dẫn</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">service cloud.firestore {\n  match /databases/{database}/documents {\n    match /cities/{city} {\n      // kiểm tra user hiện tại\n      // có tồn tại bên trong collections users\n      // trước khi cho phép tạo thêm city mới\n      allow create: if exists(/databases/$(database)/documents/users/$(request.auth.uid))\n\n      // cho phép user xóa city nếu user này là admin\n      allow delete: if get(/databases/$(database)/documents/users/$(request.auth.id).data.admin == true)\n    }\n  }\n}</code></pre>\n      </div>\n<p>Đối với thao tác write, chúng ta có thể sử dụng <code class="language-text">getAfter()</code> để truy cập dữ liệu của document sau khi thực hiện, thằng này cũng giống như <code class="language-text">get</code> phải dùng đường dẫn đầy đủ.</p>\n<h1 id="hàm-tùy-biến"><a href="#h%C3%A0m-t%C3%B9y-bi%E1%BA%BFn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hàm tùy biến</h1>\n<p>Một khi các rule security này trở nên phức tạp, chúng ta sẽ muốn gom các điều kiện này vào trong một hàm để tái sử dụng. Firestore hỗ trợ luôn. Nó sẽ như Javascript, tuy nhiên không hẳn là javascript đâu, nó có một số hạn chế</p>\n<ul>\n<li>Hàm này luôn chỉ chứa 1 return, không chạy loop, gọi service bên ngoài</li>\n<li>Hàm có thể access được các hàm và biến có cùng scope.</li>\n<li>Hàm có thể gọi đến hàm khác nhưng không được recurse, tối đa là sâu đến 10 thôi.</li>\n</ul>\n<p>Ví dụ kết hợp cả 2 điều kiện ở trên thành một hàm</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">service cloud.firestore {\n  match /databases/{database}/documents {\n    function signedInOrPublic() {\n      return request.auth.uid !== null || resource.data.visibility == &#39;public&#39;;\n    }\n\n    match /cities/{city} {\n      allow read, write: if signedInOrPublic();\n    }\n\n    match /users/{user} {\n      allow read, write: if signedInOrPublic();\n    }\n  }\n}</code></pre>\n      </div>\n<p><a href="https://firebase.google.com/docs/firestore/security/rules-conditions">Link bài gốc</a></p>',timeToRead:3,excerpt:"Xác thực Kiểm tra dữ liệu Truy cập đến các documents khác Hàm tùy biến Xác thực Một trong những tình huống phổ biến nhất là cho phép truy…",frontmatter:{title:"Hướng dẫn viết điều kiện security rules cho Cloud Firestore - Phần 2",cover:"",date:"2018-08-18",category:null,tags:["firestore","firebase","security"],desc:"Series hướng dẫn sử dụng các service Firebase"},fields:{slug:"/2018-08-17-huong-dan-viet-dieu-kien-security-rules-cho-cloud-firetore"}}},pathContext:{slug:"/2018-08-17-huong-dan-viet-dieu-kien-security-rules-cho-cloud-firetore",prev:{frontmatter:{title:"Hướng dẫn viết query data cho Cloud Firestore - Phần 3",desc:"Series hướng dẫn sử dụng các service Firebase",type:"post",category:null,tags:["firestore","firebase"],date:"2018-08-19",cover:""},fields:{slug:"/2018-08-19-huong-dan-viet-query-data-tren-firestore"}},next:{frontmatter:{title:"Hướng dẫn cách cài đặt security rules cho Cloud Firestore",desc:"Series hướng dẫn sử dụng các service Firebase",type:"post",category:null,tags:["firestore","firebase","security"],date:"2018-08-17",cover:""},fields:{slug:"/2018-08-17-huong-dan-set-security-rules-cho-cloud-firestore"}}}}}});
//# sourceMappingURL=path---2018-08-17-huong-dan-viet-dieu-kien-security-rules-cho-cloud-firetore-a8a2a828e61e4c39f421.js.map