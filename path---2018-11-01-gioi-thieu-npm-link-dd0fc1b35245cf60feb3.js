webpackJsonp([0xca56fd798d2a],{1325:function(n,e){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng">Sử dụng</a></li>\n<li><a href="#debug">Debug</a></li>\n<li><a href="#quay-l%E1%BA%A1i-b%C3%ACnh-th%C6%B0%E1%BB%9Dng">Quay lại bình thường</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nếu như bạn là tác giả của một module, bạn đang để nó ở một thư mục trên máy local, bạn không có viết test cho module này, bạn dùng chính app đang viết như là cách để test module luôn, tìm thấy lỗi trên module, sau khi sửa lỗi một cách thủ công trong thư mục <code class="language-text">node_modules</code>, copy toàn bộ file qua git repository, rồi commit lên.</p>\n<p><img src="https://cdn-images-1.medium.com/max/880/0*wvDueqq35PXNE1qA" alt="Cách dùng npm link để trỏ dependency đến thư mục local"></p>\n<p>Có một cách làm <strong>sạch sẽ</strong> hơn: <code class="language-text">npm link</code></p>\n<h1 id="sử-dụng"><a href="#s%E1%BB%AD-d%E1%BB%A5ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng</h1>\n<p>Để link package, thực hiện bằng 2 bước</p>\n<ol>\n<li>Tạo một shortcut trên dependency với <code class="language-text">npm link</code>. Shortcut này trỏ tới một thư một khác trên máy.</li>\n<li>Khai báo trên project sử dụng shortcut này, <code class="language-text">npm link some-dep</code></li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-powershell"><code class="language-powershell">cd ~<span class="token operator">/</span>projects<span class="token operator">/</span>some<span class="token operator">-</span>dep\nnpm link  <span class="token comment"># Step 1.</span>\ncd ~<span class="token operator">/</span>projects<span class="token operator">/</span>my<span class="token operator">-</span>app\nnpm link some<span class="token operator">-</span>dep  <span class="token comment"># Step 2.</span></code></pre>\n      </div>\n<p><img src="https://cdn-images-1.medium.com/max/880/0*x8jMbWUMifff9Eao" alt="Cách dùng npm link để trỏ dependency đến thư mục local"></p>\n<p>Bạn có thể sửa, transpile, chạy test, commit bình thường trên <code class="language-text">some-dep</code>. Khi chạy <code class="language-text">my-app</code> nó sẽ chạy với những thay đổi đã thực hiện trên <code class="language-text">some-dep</code>. Shortcut đã tạo ra sẽ ko được commit lên git, nó chỉ có hiệu lực trên local</p>\n<h1 id="debug"><a href="#debug" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Debug</h1>\n<p>Nếu đang sử dụng VSCode và muốn set breakpoint trong <code class="language-text">some-dep</code>, trên debugger của <code class="language-text">my-app</code>, bạn cần thiết đặt trong <code class="language-text">launch.json</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token property">"runtimeArgs"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n  <span class="token string">"--preserve-symlinks"</span>\n<span class="token punctuation">]</span></code></pre>\n      </div>\n<p><img src="https://cdn-images-1.medium.com/max/880/0*H1TB22svP8POFP8p" alt="Cách dùng npm link để trỏ dependency đến thư mục local"></p>\n<h1 id="quay-lại-bình-thường"><a href="#quay-l%E1%BA%A1i-b%C3%ACnh-th%C6%B0%E1%BB%9Dng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Quay lại bình thường</h1>\n<p>Nếu không còn muốn sử dụng bản local của <code class="language-text">some-dep</code> nửa, <code class="language-text">npm unlink</code> chăng? Cũng được, nhưng thật ra nó sẽ chạy <code class="language-text">npm uninstall</code>, nghĩa là bạn phải uninstall rồi install lại từ đầu</p>\n<div class="gatsby-highlight">\n      <pre class="language-powershell"><code class="language-powershell">cd ~<span class="token operator">/</span>projects<span class="token operator">/</span>my<span class="token operator">-</span>app\nnpm uninstall <span class="token operator">--</span>no<span class="token operator">-</span>save some<span class="token operator">-</span>dep &amp;&amp; npm install </code></pre>\n      </div>\n<p>Nếu xóa shortcut trên <code class="language-text">some-dep</code> sẽ an toàn hơn, không đụng tới dependency của <code class="language-text">my-app</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-powershell"><code class="language-powershell">cd ~<span class="token operator">/</span>projects<span class="token operator">/</span>some<span class="token operator">-</span>dep\nnpm uninstall  <span class="token comment"># Delete global symlink</span></code></pre>\n      </div>\n<p><a href="https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557" target="_blank" rel="noopener noreferrer">Understanding npm-link</a></p>',timeToRead:2,excerpt:"Sử dụng Debug Quay lại bình thường Nếu như bạn là tác giả của một module, bạn đang để nó ở một thư mục trên máy local, bạn không có viết…",frontmatter:{title:"Hướng dẫn dùng npm link",cover:"",date:"2018-11-01",category:null,tags:["javascript"],desc:"Cách dùng npm link để trỏ dependency đến thư mục local"},fields:{slug:"/2018-11-01-gioi-thieu-npm-link"}}},pathContext:{slug:"/2018-11-01-gioi-thieu-npm-link",prev:{frontmatter:{title:"Validate form với HTML5",desc:"Bài này nằm trong loạt bài chuẩn kiến thức để đi thi web mobile specialist của google. Một số cách validate bằng HTML, sử dụng API kết hợp với javascript để custom lại theo ý muốn",type:"post",category:null,tags:["mobile-web-specialist"],date:"2018-11-02",cover:""},fields:{slug:"/2018-11-02-validate-form-voi-html-5"}},next:{frontmatter:{title:"Sử dụng React.lazy ra làm sao?",desc:"Api mới của React 16.6",type:"post",category:null,tags:["react"],date:"2018-10-31",cover:""},fields:{slug:"/2018-10-31-gioi-thieu-react-lazy"}}}}}});
//# sourceMappingURL=path---2018-11-01-gioi-thieu-npm-link-dd0fc1b35245cf60feb3.js.map