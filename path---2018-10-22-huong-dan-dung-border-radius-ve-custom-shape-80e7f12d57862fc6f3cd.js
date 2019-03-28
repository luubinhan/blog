webpackJsonp([0xa11b1e9a12c],{1537:function(n,e){n.exports={data:{markdownRemark:{html:'<p>Anh <a href="https://9elements.com/io/css-border-radius/" target="_blank" rel="noopener noreferrer">Nils Binder</a> nghĩ ra một trick khá hay để vẽ hình bằng <code class="language-text">border-radius</code></p>\n<p>Bạn có thể dùng ngay luôn <a href="https://9elements.github.io/fancy-border-radius/">công cụ anh này làm</a>, kéo chỉnh theo ý muốn, rồi copy giá trị.</p>\n<p><strong>Giải thích cách làm này</strong></p>\n<p><img src="https://9elements.com/io/images/border-radius-2.png" alt="Sử dụng border-radius để vẽ custom shape"></p>\n<p>Nếu chúng ta set <code class="language-text">border-radius: 50%</code>, giá trị % này là dựa trên chiều rộng và cao của element. Nếu element hình vuông, chúng ta có một hình tròn, là hình chữ nhật? chúng ta không nhận được hình tròn nữa.</p>\n<p>Nếu set 4 giá trị khác nhau cho 4 góc</p>\n<p><img src="https://9elements.com/io/images/border-radius-3.png" alt="Sử dụng border-radius để vẽ custom shape"></p>\n<p>Mấy cách làm trên không có gì đặc biệt, điều đặc biệt là khi dùng giá trị với dấu <code class="language-text">/</code>, theo kiểu</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.element</span> <span class="token punctuation">{</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> a b c d / e f g h<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Theo W3C định nghĩa 4 giá trước <code class="language-text">/</code> sẽ là radius cho hướng nằm ngang, 4 giá trị sau <code class="language-text">/</code> là giá trị radius cho hướng thẳng đứng, nếu không có dấu <code class="language-text">/</code> coi như 2 giá trị này bằng nhau.</p>\n<p>Như vậy, nếu set <code class="language-text">border-radius: 4em 8em</code> sẽ khác với <code class="language-text">border-radius: 4em / 8em</code></p>\n<p><img src="https://9elements.com/io/images/border-radius-4.png" alt="Sử dụng border-radius để vẽ custom shape"></p>\n<p>Với cách làm này, ta có kết quả</p>\n<p><img src="https://9elements.com/io/images/border-radius-5.png" alt="Sử dụng border-radius để vẽ custom shape"></p>\n<p><img src="https://9elements.com/io/images/border-radius-6.png" alt="Sử dụng border-radius để vẽ custom shape"></p>\n<p>Dễ như ăn cơm sườn há!!</p>',timeToRead:1,excerpt:"Anh  Nils Binder  nghĩ ra một trick khá hay để vẽ hình bằng  Bạn có thể dùng ngay luôn  công cụ anh này làm , kéo chỉnh theo ý muốn, rồi…",frontmatter:{title:"Sử dụng border-radius để vẽ custom shape",cover:"https://9elements.com/io/images/border-radius-7.png",date:"2018-10-22",category:null,tags:["css"],desc:"Trick hay trong CSS sử dụng border-radius để vẽ hình"},fields:{slug:"/2018-10-22-huong-dan-dung-border-radius-ve-custom-shape"}}},pathContext:{slug:"/2018-10-22-huong-dan-dung-border-radius-ve-custom-shape",prev:{frontmatter:{title:"Đo thời gian render bằng Chrome",desc:"Bàn luận kỹ thuật để đo chính xác thời gian render",type:"post",category:null,tags:["chrome","performance"],date:"2018-10-23",cover:""},fields:{slug:"/2018-10-23-huong-dan-do-toc-do-website-bang-chrome"}},next:{frontmatter:{title:"Sử dụng localStorage trên website như thế nào",desc:"Kiến thức căn bản sử dụng localStorage để lưu thông tin cần thiết xuống trình duyệt",type:"post",category:null,tags:["javascript"],date:"2018-10-21",cover:""},fields:{slug:"/2018-10-21-huong-dan-su-dung-local-storage"}}}}}});
//# sourceMappingURL=path---2018-10-22-huong-dan-dung-border-radius-ve-custom-shape-80e7f12d57862fc6f3cd.js.map