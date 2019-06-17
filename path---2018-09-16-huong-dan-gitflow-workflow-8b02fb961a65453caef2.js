webpackJsonp([94639336898736],{1346:function(t,n){t.exports={data:{markdownRemark:{html:'<p>Gitflow được thiết kế cho các dự án phần mềm release theo version, theo kiểu version release ấy. Đây là quy trình làm việc, nó sẽ không thêm các tính năng mới cho Git, nó chỉ định rất rõ vai trò của mỗi <strong>branch</strong>, tại sao, khi nào các branch sẽ tương tác qua lại với nhau.</p>\n<p>Chúng ta cùng nghiên cứu mục đích của từng branch</p>\n<h2 id="develop"><a href="#develop" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Develop</h2>\n<p><img src="https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg"></p>\n<p>Nếu <strong>master</strong> để lưu trữ lịch sử những bản release chính thức, <strong>develop</strong> mục đích như một branch cho việc tích hợp các <strong>feature</strong> branch. Trên <strong>master</strong> branch chúng ta sẽ thêm tag theo từng version release.</p>\n<h2 id="feature-branch"><a href="#feature-branch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Feature Branch</h2>\n<p><img src="https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg"></p>\n<p>Mỗi feature mới sẽ có branch riêng, tên branch sẽ được đặt theo feature đang phát triển, <strong>Feature</strong> branch xem <strong>develop</strong> branch như là branch cha của nó. Khi đã hoàn tất feature này, chúng ta <em>merge</em> nó lên trên <strong>develop</strong>, không bao giờ tương tác lên <strong>master</strong>, đồng thời xóa branch này.</p>\n<h2 id="release-branch"><a href="#release-branch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Release Branch</h2>\n<p><img src="https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg"></p>\n<p>Khi tất cả feature cần thiết đã hoàn thành để có thể release. Chúng ta tạo thêm branch <strong>release</strong>, tên branch là tên của của release version. Tạo branch này cũng đồng nghĩa với việc bắt đầu một vòng phát triển mới, không thêm các tính năng mới nữa, mà tập trung vào bug fix, tạo document này kia. Khi đã hoàn tất tiếp tục <em>merge</em> lên <strong>master</strong></p>\n<p>Bằng cách này, chúng ta có thể tách một team để đẩy việc đưa ra release và một team khác tiếp tục phát triển tính năng cho release tiếp theo.</p>\n<p>Sau khi được merge vào <strong>master</strong> và <strong>develop</strong>, có thể xóa branch <strong>release</strong>.</p>\n<h2 id="hotfix"><a href="#hotfix" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hotfix</h2>\n<p><img src="https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg"></p>\n<p>Rất giống với <strong>release</strong> và <strong>feature</strong> trừ việc nó sẽ dựa trên <strong>master</strong> chứ không phải <strong>develop</strong>, để sửa các lỗi trên production. Đây là branch duy nhất <em>fork</em> trực triếp từ <strong>master</strong>. Một khi sửa xong, thì merge vào cả <strong>master* và **develop</strong> rồi xóa</p>\n<p>Bên cạnh Gitflow, một số quy trình làm việc khác cũng khá phổ biến với Git là: Centralized Workflow, Feature branching, Forking Workflow</p>\n<p>Để làm việc với GitFlow bằng SourceTree, có thể xem video tuts hướng dẫn trên youtube <a href="https://www.youtube.com/watch?v=z53JJ7P78Vc">https://www.youtube.com/watch?v=z53JJ7P78Vc</a></p>\n<p><a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow">Link bài gốc</a></p>',timeToRead:2,excerpt:"Gitflow được thiết kế cho các dự án phần mềm release theo version, theo kiểu version release ấy. Đây là quy trình làm việc, nó sẽ không thêm…",frontmatter:{title:"Giải thích Workflow theo kiểu Gitflow",cover:"https://image.slidesharecdn.com/gitflow-160421170910/95/git-flow-7-638.jpg",date:"2018-09-16",category:null,tags:["javascript"],desc:"Gitflow là một dạng quy trình làm việc với Git, được giới thiệu bởi Vincent Driessen và sử dụng rất phổ biến trong các công ty phần mềm, đặt ra những quy ước trong việc tổ chức các branch trên Git"},fields:{slug:"/2018-09-16-huong-dan-gitflow-workflow"}}},pathContext:{slug:"/2018-09-16-huong-dan-gitflow-workflow",prev:{frontmatter:{title:"So sánh localStorage, sessionStorage, cookie",desc:"Sự khác nhau giữa 3 cách lưu thông tin xuống trình duyệt",type:"post",category:null,tags:["javascript","security"],date:"2018-09-17",cover:""},fields:{slug:"/2018-09-17-huong-dan-luu-token-o-dau"}},next:{frontmatter:{title:"Quản lý dự án theo Agile và Scrum cho người mới bắt đầu",desc:"Nếu muốn chế trực thăng, phát triển một phần mềm, viết một quyển sách, hoặc xây lại một căn nhà bạn bắt đầu từ đâu?",type:"post",category:null,tags:["javascript"],date:"2018-09-15",cover:"https://blog.trello.com/hs-fs/hubfs/Imported_Blog_Media/scrum_agile_feature-1024x512.jpg?t=1537150324734&width=1024&height=512&name=scrum_agile_feature-1024x512.jpg"},fields:{slug:"/2018-09-15-huong-dan-cho-nguoi-moi-bat-dau-voi-scrum-va-agile-project-manament"}}}}}});
//# sourceMappingURL=path---2018-09-16-huong-dan-gitflow-workflow-8b02fb961a65453caef2.js.map