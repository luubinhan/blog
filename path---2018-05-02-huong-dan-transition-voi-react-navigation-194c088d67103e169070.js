webpackJsonp([0xfa0c09a62b42],{1429:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Chúng ta sẽ build những màn hình đầu tiên khi mới vào app: on-boarding screen, mấy cái màn hình kiểu chào hỏi khi mới vừa cài app xong, mở app lên, giới thiệu đôi ba nét rồi kêu người ta sign in/sign up.</p>\n<p>Chúng ta sẽ setup 2 screen, <code class="language-text">Screen1</code>, <code class="language-text">Screen2</code>, nhét 2 screens này vào trong <code class="language-text">StackNavigator</code> component</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span>Component<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>Text<span class="token punctuation">,</span> View<span class="token punctuation">,</span> Button<span class="token punctuation">,</span> Image<span class="token punctuation">,</span> StyleSheet <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-native\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>StackNavigator<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-navigation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">LogoImage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Image</span></span> <span class="token attr-name">source</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>uri<span class="token punctuation">:</span> <span class="token string">\'https://picsum.photos/100/100?image=56\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>style<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n<span class="token punctuation">)</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Screen1</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">View</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>container<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LogoImage</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>largeLogo<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>paragraph<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                    Welcome<span class="token operator">!</span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Text</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>Next<span class="token punctuation">\'</span></span> <span class="token attr-name">onPress</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token string">\'Screen2\'</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">View</span></span><span class="token punctuation">></span></span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Screen2</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">View</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>container<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LogoImage</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>smallLogo<span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>paragraph<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>fontWeight<span class="token punctuation">:</span><span class="token string">\'normal\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                    Now you should have a basic understanding <span class="token keyword">of</span> how <span class="token keyword">this</span> app works<span class="token punctuation">.</span> \n                    Please sign up and take part <span class="token keyword">in</span> <span class="token keyword">this</span> fantastic user experience<span class="token operator">!</span>\n                  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Text</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Text</span></span><span class="token punctuation">></span></span>  \n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>paragraph<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                    This is the last page <span class="token keyword">of</span> the onboarding<span class="token punctuation">.</span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Text</span></span><span class="token punctuation">></span></span>  \n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Back<span class="token punctuation">"</span></span> <span class="token attr-name">onPress</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">goBack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">View</span></span><span class="token punctuation">></span></span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> Navigator <span class="token operator">=</span> <span class="token function">StackNavigator</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    screen1<span class="token punctuation">:</span> <span class="token punctuation">{</span>screen<span class="token punctuation">:</span> Screen1<span class="token punctuation">}</span><span class="token punctuation">,</span>\n    screen2<span class="token punctuation">:</span> <span class="token punctuation">{</span>screen<span class="token punctuation">:</span> Screen2<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Navigator</span></span> <span class="token punctuation">/></span></span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> styles <span class="token operator">=</span> StyleSheet<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  container<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    flex<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    alignItems<span class="token punctuation">:</span> <span class="token string">\'center\'</span><span class="token punctuation">,</span>\n    justifyContent<span class="token punctuation">:</span> <span class="token string">\'space-around\'</span><span class="token punctuation">,</span>\n    backgroundColor<span class="token punctuation">:</span> <span class="token string">\'#ecf0f1\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  largeLogo<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n    height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n    borderRadius<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  smallLogo<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    width<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">,</span>\n    height<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">,</span>\n    borderRadius<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  paragraph<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    margin<span class="token punctuation">:</span> <span class="token number">24</span><span class="token punctuation">,</span>\n    fontSize<span class="token punctuation">:</span> <span class="token number">15</span><span class="token punctuation">,</span>\n    fontWeight<span class="token punctuation">:</span> <span class="token string">\'bold\'</span><span class="token punctuation">,</span>\n    textAlign<span class="token punctuation">:</span> <span class="token string">\'center\'</span><span class="token punctuation">,</span>\n    color<span class="token punctuation">:</span> <span class="token string">\'#34495e\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="thêm-transition"><a href="#th%C3%AAm-transition" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thêm transition</h2>\n<p>Chúng ta sẽ sử dụng thêm một thư viện <code class="language-text">react-navigation-fluid-transitions</code> để thêm transition khi chuyển từ <code class="language-text">Screen1</code> qua <code class="language-text">Screen2</code>, logo ở <code class="language-text">Screen1</code> sẽ nhỏ dần nhỏ dần thành logo ở <code class="language-text">Screen2</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">npm i react-navigation-fluid-transitions --save</code></pre>\n      </div>\n<p>Thay vì sử dụng <code class="language-text">StackNavigator</code>, ta chuyển sang dùng <code class="language-text">FluidNavigator</code> của thư viện mới</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> FluidNavigator<span class="token punctuation">,</span> Transition <span class="token punctuation">}</span> <span class="token keyword">from</span> react<span class="token operator">-</span>navigation<span class="token operator">-</span>fluid<span class="token operator">-</span>transitions’<span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> Navigator <span class="token operator">=</span> <span class="token function">FluidNavigator</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n screen1<span class="token punctuation">:</span> <span class="token punctuation">{</span>screen<span class="token punctuation">:</span> Screen1<span class="token punctuation">}</span><span class="token punctuation">,</span>\n screen2<span class="token punctuation">:</span> <span class="token punctuation">{</span>screen<span class="token punctuation">:</span> Screen2<span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Ở đây chúng ta muốn cái Logo sẽ <em>biến hình</em> nên bọc nó vào <code class="language-text">Transition</code> với cùng một giá trị <em>prop</em> <code class="language-text">shared</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Transition</span></span> <span class="token attr-name">shared</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>logo<span class="token punctuation">\'</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LogoImage</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>largeLogo<span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Transition</span></span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Transition</span></span> <span class="token attr-name">shared</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>logo<span class="token punctuation">\'</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LogoImage</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>smallLogo<span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Transition</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Kết quả có được</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*Pg-22BI0Z_vG1mMxe9Scjg.gif"></p>\n<p>Nếu để ý ta sẽ thấy phần text sẽ không có áp dụng transition lên nên nó đơn giản là ẩn/hiện khi chuyển qua lại giữa 2 màn hình, chúng ta sẽ thêm transition luôn cho phần text này bằng component <code class="language-text">Transition</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Transition</span></span> <span class="token attr-name">appear</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>horizontal<span class="token punctuation">\'</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>paragraph<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n    Welcome<span class="token operator">!</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Text</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Transition</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*Da1RpwEKtsKL4fwp0oZ8Iw.gif"></p>\n<p>Thư viện React Navigation Fluid Transition hỗ trợ sẵn một số transition có thể dùng mì-ăn-liền như <code class="language-text">appear</code> ở trên, một số hiệu ứng có sẵn khác, đọc thêm tại <a href="https://github.com/fram-x/FluidTransitions/blob/develop/README.md">document ở đây</a></p>\n<p>Tác Giả: Christian Falch\nLink Bài Gốc: <a href="https://medium.com/@christian.falch/fluid-transitions-with-react-navigation-a049d2f71494">https://medium.com/@christian.falch/fluid-transitions-with-react-navigation-a049d2f71494</a></p>',timeToRead:3,excerpt:"Chúng ta sẽ build những màn hình đầu tiên khi mới vào app: on-boarding screen, mấy cái màn hình kiểu chào hỏi khi mới vừa cài app xong, mở…",frontmatter:{title:"Transition trong React Native với React Navigation",cover:"",date:"2018-05-02",category:null,tags:["javascript","react","react-native"],desc:"Hướng dẫn làm transition trong React Native với react navigation"},fields:{slug:"/2018-05-02-huong-dan-transition-voi-react-navigation"}}},pathContext:{slug:"/2018-05-02-huong-dan-transition-voi-react-navigation",prev:{frontmatter:{title:"Giải thích async/await của javascript",desc:"Hướng dẫn các bạn nắm vững async/await trong javascript, kèm ví dụ cụ thể",type:"post",category:null,tags:["javascript"],date:"2018-05-07",cover:""},fields:{slug:"/2018-05-07-huong-dan-async-await-giai-thich-vi-du"}},next:{frontmatter:{title:"Cải thiện performance của React App",desc:"Trong bài này, chúng ta cùng đi qua các bước để fix những issue liên quan đến performance thường thấy.",type:"post",category:null,tags:["javascript","react","performance"],date:"2018-05-01",cover:""},fields:{slug:"/2018-05-01-huong-dan-cai-thien-performance-react-app"}}}}}});
//# sourceMappingURL=path---2018-05-02-huong-dan-transition-voi-react-navigation-194c088d67103e169070.js.map