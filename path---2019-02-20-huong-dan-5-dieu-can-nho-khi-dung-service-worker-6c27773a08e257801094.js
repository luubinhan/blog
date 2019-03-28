webpackJsonp([19793150344067],{1045:function(n,e){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#%C4%91%E1%BA%B7t-file-service-worker-trong-th%C6%B0-m%E1%BB%A5c-root">Đặt file service worker trong thư mục root</a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng-panel-application-tr%C3%AAn-chrome-dev-tools">Sử dụng Panel Application trên Chrome Dev Tools</a></li>\n<li><a href="#kh%C3%B4ng-s%E1%BB%AD-d%E1%BB%A5ng-hard-reload">Không sử dụng Hard Reload</a></li>\n<li><a href="#b%E1%BA%ADt-update-on-reload">Bật "Update on Reload"</a></li>\n<li><a href="#inspect-v%C3%A0-manual-delete-cache">Inspect và manual delete cache</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nếu chưa biết <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API">Service worker API</a> là gì, bạn hãy vào đọc lại link mình đã gắn sẵn</p>\n<h2 id="Đặt-file-service-worker-trong-thư-mục-root"><a href="#%C4%90%E1%BA%B7t-file-service-worker-trong-th%C6%B0-m%E1%BB%A5c-root" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đặt file service worker trong thư mục root</h2>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/rootdir.jpg" alt="5 điều cần nhớ khi làm việc với service worker"></p>\n<p>Đừng thấy file service worker là js mà bạn đi bỏ nào trong thư mục <em>js</em> hay <em>scripts</em>, bởi vì file service worker bỏ vào thư mục nó sẽ bị giới hạn hoạt động ở trong thư mục <em>js</em> đó thôi. Nghĩa là nó chỉ can thiệp được khi user truy cập <code class="language-text">www.yoursite.com/js/</code>, tất cả request từ <code class="language-text">www.yoursite.com</code> hay <code class="language-text">www.yoursite.com/news</code> nó sẽ cho qua.</p>\n<p>Tuy nhiên, chúng ta có thể thay đổi scope này</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">navigator<span class="token punctuation">.</span>serviceWorker<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">\'/sw.js\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n scope<span class="token punctuation">:</span> <span class="token string">\'/\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Nhưng thật lòng mà nói, bỏ luôn trong thư mục root có phải dễ chịu không, nó tự động handle toàn bộ request ở cả site luôn cho khỏe</p>\n<h2 id="sử-dụng-panel-application-trên-chrome-dev-tools"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-panel-application-tr%C3%AAn-chrome-dev-tools" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng Panel Application trên Chrome Dev Tools</h2>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/applicationstab.jpg" alt="5 điều cần nhớ khi làm việc với service worker"></p>\n<p>Trên tab này chúng ta sẽ biết được mình đã đăng ký file service worker thành công chưa, giả lập offline, bypass cái service worker hoặc gỡ bỏ luôn.</p>\n<h2 id="không-sử-dụng-hard-reload"><a href="#kh%C3%B4ng-s%E1%BB%AD-d%E1%BB%A5ng-hard-reload" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Không sử dụng Hard Reload</h2>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/donthardreload.jpg" alt="5 điều cần nhớ khi làm việc với service worker"></p>\n<p>Một trong những thói quen của chúng ta là dùng "Hard Reload" hay "Empty Cache and Hard Reload" trên trình duyệt để xem những thay đổi mới nhất. Tuy nhiên là khi có service worker rồi, nó sẽ tự động bypass vụ "Hard Reload" này. Tip tiếp theo sẽ chỉ bạn cách làm ngay thôi</p>\n<h2 id="bật-update-on-reload"><a href="#b%E1%BA%ADt-update-on-reload" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Bật "Update on Reload"</h2>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/updateonreload.jpg" alt="5 điều cần nhớ khi làm việc với service worker"></p>\n<p>Để đảm bảo luôn luôn lấy file mới nhất, trên tab <strong>Application</strong> check vào ô <strong>Update on Reload</strong> là xong. Như vậy thì khi thực hiện reload trang (reload bình thường luôn ấy) trình duyệt tự động update cái service worker luôn.</p>\n<p>Còn muốn thực hiện manual, click vào link <strong>Update</strong> bên dưới màn hình này.</p>\n<h2 id="inspect-và-manual-delete-cache"><a href="#inspect-v%C3%A0-manual-delete-cache" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Inspect và manual delete cache</h2>\n<p>Cuối cùng, cũng hay, là trên tab <strong>Application</strong> cho phép chúng ta xóa chỉ định <strong>cụ thể</strong> file cache nào muốn xóa. Cột bên trái, mục <strong>Cache Storage</strong>, click nút expand, bạn sẽ thấy danh sách cache object đang được lưu trên trang này</p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/inspectcache.jpg" alt="5 điều cần nhớ khi làm việc với service worker"></p>\n<p>Muốn xóa? Đơn giản click phải chọn <strong>Delete</strong></p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/manuallydeletecache.jpg" alt="5 điều cần nhớ khi làm việc với service worker"></p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://webdesign.tutsplus.com/tutorials/5-essential-tips-for-service-worker-development--cms-31424">5 Essential Tips for Service Worker Development</a></p>',timeToRead:3,excerpt:'Đặt file service worker trong thư mục root Sử dụng Panel Application trên Chrome Dev Tools Không sử dụng Hard Reload Bật "Update on Reload…',frontmatter:{title:"5 điều cần nhớ khi làm việc với service worker",cover:"",date:"2019-02-20",category:null,tags:["javascript"],desc:"Năm điều nhỏ nhỏ, nhưng rất hay ho cần thiết, cần biết"},fields:{slug:"/2019-02-20-huong-dan-5-dieu-can-nho-khi-dung-service-worker"}}},pathContext:{slug:"/2019-02-20-huong-dan-5-dieu-can-nho-khi-dung-service-worker",prev:{frontmatter:{title:"Không cho phép import với ESlint",desc:"Với ESlint chúng ta có thể cấm import những thư viện lớn, tránh để bà con trong team import tá lả.",type:"post",category:null,tags:["javascript"],date:"2019-02-26",cover:""},fields:{slug:"/2019-02-26-chan-import-bang-eslint"}},next:{frontmatter:{title:"Login form tưởng dễ mà ko dễ",desc:"Review một vài pattern thiết kế login form hay dùng hiện nay",type:"post",category:null,tags:["ux-ui"],date:"2019-02-19",cover:""},fields:{slug:"/2019-02-19-huong-dan-thiet-ke-login-de-dung"}}}}}});
//# sourceMappingURL=path---2019-02-20-huong-dan-5-dieu-can-nho-khi-dung-service-worker-6c27773a08e257801094.js.map