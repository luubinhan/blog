webpackJsonp([0x79606990d14f],{1360:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#stack">Stack</a></li>\n<li><a href="#switch">Switch</a></li>\n<li><a href="#drawer">Drawer</a></li>\n<li><a href="#bottom-tab">Bottom Tab</a></li>\n<li><a href="#material-top-tab">Material Top Tab</a></li>\n</ul>\n<!-- /TOC -->\n<p>Có rất nhiều thư viện khác nhau để làm navigation với React native, mình khuyến khích các bạn dùng <strong>react-navigation</strong> của Facebook phát triển cho React Native, nói chung cái gì đã có bản official của chính người sáng lập thì mình cứ đè nó ra xài</p>\n<h1 id="stack"><a href="#stack" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Stack</h1>\n<p><img src="https://i.stack.imgur.com/25MyO.jpg" alt="Điểm qua các kiểu navigator của thư viện react-navigation"></p>\n<p>Khi mở một màn hình mới, nó sẽ sếp chồng lên trên màn hình trước đó. Kiếu sếp bánh tráng.</p>\n<p>Theo mặc định, màn hình mới chạy từ cạnh phải -> qua trái màn hình trong iOS, mờ -> đến rõ dần từ dưới lên trong android</p>\n<p>API</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">createStackNavigator</span><span class="token punctuation">(</span>RouteConfigs<span class="token punctuation">,</span> StackNavigatorConfig<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> StackScreens <span class="token operator">=</span> <span class="token function">createStackNavigator</span><span class="token punctuation">(</span>\n  <span class="token punctuation">{</span>\n    Main<span class="token punctuation">:</span> <span class="token punctuation">{</span> screen<span class="token punctuation">:</span> Main <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    Login<span class="token punctuation">:</span> <span class="token punctuation">{</span> screen<span class="token punctuation">:</span> Login <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    headerMode<span class="token punctuation">:</span> <span class="token string">\'none\'</span><span class="token punctuation">,</span>\n    mode<span class="token punctuation">:</span> <span class="token string">\'modal\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h1 id="switch"><a href="#switch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Switch</h1>\n<p>Với Swtich Navigator chỉ hiển thị 1 màn hình, không có <code class="language-text">goBack()</code>, phù hợp nhất với flow Authentication, flow này thường sẽ là</p>\n<ul>\n<li>User mở ứng dụng</li>\n<li>Ứng dụng load dữ liệu authentication (nếu có) trong <code class="language-text">AsyncStorage</code></li>\n<li>Sau khi load, hiển thị trang chính hoặc màn hình đăng nhập</li>\n<li>Sau khi user sign out, hiển thị màn hình đăng nhập</li>\n</ul>\n<p>API</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">createSwitchNavigator</span><span class="token punctuation">(</span>RouteConfigs<span class="token punctuation">,</span> SwitchNavigatorConfig<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> createSwitchNavigator<span class="token punctuation">,</span> createStackNavigator <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-navigation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>HomeScreen<span class="token punctuation">,</span> SignInScreen<span class="token punctuation">,</span> OtherScreen<span class="token punctuation">,</span> AuthLoadingScreen<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./screens\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> AppStack <span class="token operator">=</span> <span class="token function">createStackNavigator</span><span class="token punctuation">(</span><span class="token punctuation">{</span> Home<span class="token punctuation">:</span> HomeScreen<span class="token punctuation">,</span> Other<span class="token punctuation">:</span> OtherScreen <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> AuthStack <span class="token operator">=</span> <span class="token function">createStackNavigator</span><span class="token punctuation">(</span><span class="token punctuation">{</span> SignIn<span class="token punctuation">:</span> SignInScreen <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">createSwitchNavigator</span><span class="token punctuation">(</span>\n  <span class="token punctuation">{</span>\n    AuthLoading<span class="token punctuation">:</span> AuthLoadingScreen<span class="token punctuation">,</span>\n    App<span class="token punctuation">:</span> AppStack<span class="token punctuation">,</span>\n    Auth<span class="token punctuation">:</span> AuthStack<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    initialRouteName<span class="token punctuation">:</span> <span class="token string">\'AuthLoading\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Tham khảo thêm <a href="https://reactnavigation.org/docs/en/auth-flow.html">cách implement Authentication Flow</a></p>\n<h1 id="drawer"><a href="#drawer" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Drawer</h1>\n<p>Kiểu menu trượt từ bên trái thấy trong Android</p>\n<p><img src="https://github.com/xke/SimpleReactDrawerNavigationExample/raw/master/SimpleReactDrawerNavigationExample.gif" alt="Điểm qua các kiểu navigator của thư viện react-navigation"></p>\n<p>API</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">createDrawerNavigator</span><span class="token punctuation">(</span>RouteConfigs<span class="token punctuation">,</span> DrawerNavigatorConfig<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Ví dụ</p>\n<ol>\n<li><code class="language-text">TouchableMenuIcon</code> là component luôn hiển thị ở gốc trái của ứng dụng</li>\n<li>Chạm vào icon, <code class="language-text">SideMenu</code> component được hiển thị, style tùy thích</li>\n<li><code class="language-text">RootStack</code> là một Stack Navigator chứa các màn hình chính của ứng dụng</li>\n<li><code class="language-text">MyDrawerNavigator</code> tạo ra từ <code class="language-text">createDrawerNavigator()</code>, sẽ đảm nhiệm việc show side menu, để ý cái <code class="language-text">props</code> <strong>contentComponent</strong></li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Button<span class="token punctuation">,</span> View<span class="token punctuation">,</span> Text<span class="token punctuation">,</span> Image<span class="token punctuation">,</span> TouchableOpacity <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-native\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> createStackNavigator<span class="token punctuation">,</span> createDrawerNavigator <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-navigation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>RootStackScreen1<span class="token punctuation">,</span> RootStackScreen2<span class="token punctuation">,</span> RootStackScreen3<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./screens\'</span><span class="token punctuation">;</span>\n\n\n<span class="token comment">// 1) `TouchableMenuIcon` là component luôn hiển thị ở gốc trái của ứng dụng</span>\n\n<span class="token keyword">class</span> <span class="token class-name">TouchableMenuIcon</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n\n  <span class="token function-variable function">toggleDrawer</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>    \n    <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigationProps<span class="token punctuation">.</span><span class="token function">toggleDrawer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">View</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>flexDirection<span class="token punctuation">:</span> <span class="token string">\'row\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TouchableOpacity</span></span> <span class="token attr-name">onPress</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toggleDrawer</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">></span></span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Image</span></span>\n            <span class="token attr-name">source</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>uri <span class="token punctuation">:</span> <span class="token string">\'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> width<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">,</span> marginLeft<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n          <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TouchableOpacity</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">View</span></span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 2) Chạm vào icon, `SideMenu` component được hiển thị, style tùy thích</span>\n\n<span class="token keyword">class</span> <span class="token class-name">SideMenu</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">View</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>flex<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> backgroundColor<span class="token punctuation">:</span> <span class="token string">\'white\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">View</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>flexDirection<span class="token punctuation">:</span> <span class="token string">\'column\'</span><span class="token punctuation">,</span> marginTop<span class="token punctuation">:</span><span class="token number">30</span><span class="token punctuation">,</span> justifyContent<span class="token punctuation">:</span> <span class="token string">\'space-around\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span>\n              <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Screen 1<span class="token punctuation">"</span></span>\n              <span class="token attr-name">onPress</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token string">\'RootStackScreen1\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">closeDrawer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n              <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n          <span class="token punctuation">/></span></span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span>\n              <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Screen 2<span class="token punctuation">"</span></span>\n              <span class="token attr-name">onPress</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token string">\'RootStackScreen2\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">closeDrawer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n              <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token punctuation">/></span></span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span>\n              <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Screen 3<span class="token punctuation">"</span></span>\n              <span class="token attr-name">onPress</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token string">\'RootStackScreen3\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span><span class="token function">closeDrawer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n              <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">View</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">View</span></span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 3) `RootStack` là một Stack Navigator chứa các màn hình chính của ứng dụng</span>\n<span class="token keyword">const</span> RootStack <span class="token operator">=</span> <span class="token function">createStackNavigator</span><span class="token punctuation">(</span>\n  <span class="token punctuation">{</span>\n    RootStackScreen1<span class="token punctuation">:</span> RootStackScreen1<span class="token punctuation">,</span>\n    RootStackScreen2<span class="token punctuation">:</span> RootStackScreen2<span class="token punctuation">,</span>\n    RootStackScreen3<span class="token punctuation">:</span> RootStackScreen3\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    initialRouteName<span class="token punctuation">:</span> <span class="token string">\'RootStackScreen1\'</span><span class="token punctuation">,</span>  \n    <span class="token function-variable function">navigationOptions</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> navigation <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n      title<span class="token punctuation">:</span> <span class="token string">"Root Stack"</span><span class="token punctuation">,</span> \n      headerLeft<span class="token punctuation">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TouchableMenuIcon</span></span> <span class="token attr-name">navigationProps</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span> navigation <span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n\n<span class="token comment">// 4) `MyDrawerNavigator` tạo ra từ `createDrawerNavigator()`, sẽ đảm nhiệm việc show side menu, để ý cái `props` **contentComponent**</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> MyDrawerNavigator <span class="token operator">=</span> <span class="token function">createDrawerNavigator</span><span class="token punctuation">(</span>  \n  <span class="token punctuation">{</span>\n    RootStack<span class="token punctuation">:</span> RootStack<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    contentComponent<span class="token punctuation">:</span> SideMenu\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h1 id="bottom-tab"><a href="#bottom-tab" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Bottom Tab</h1>\n<p>Kiểu tab bar nằm ở dưới màn hình, các màn hình sẽ không được render cho đến khi user focus</p>\n<p><img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-1.gif" alt="Điểm qua các kiểu navigator của thư viện react-navigation"></p>\n<p>API</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">createBottomTabNavigator</span><span class="token punctuation">(</span>RouteConfigs<span class="token punctuation">,</span> BottomTabNavigatorConfig<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h1 id="material-top-tab"><a href="#material-top-tab" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Material Top Tab</h1>\n<p>Hoạt động tương tự như Bottom Tab, chỉ là menu tab đặt ở phía dưới màn hình</p>\n<p><img src="https://i.stack.imgur.com/tGJ0l.png" alt="Điểm qua các kiểu navigator của thư viện react-navigation"></p>\n<p>API</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">createMaterialTopTabNavigator</span><span class="token punctuation">(</span>RouteConfigs<span class="token punctuation">,</span> TabNavigatorConfig<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Ví dụ lấy từ <a href="https://reactnavigation.org/docs/">https://reactnavigation.org/docs/</a></p>',timeToRead:4,excerpt:"Stack Switch Drawer Bottom Tab Material Top Tab Có rất nhiều thư viện khác nhau để làm navigation với React native, mình khuyến khích các…",frontmatter:{title:"Điểm qua các kiểu navigator của thư viện react-navigation",cover:"",date:"2018-09-27",category:null,tags:["javascript","react-native"],desc:"Chúng ta cùng liệt kê qua các dạng navigator, khi nào, dùng ở đâu là hợp lý"},fields:{slug:"/2018-09-27-huong-dan-react-native-cac-kieu-react-navigation"}}},pathContext:{slug:"/2018-09-27-huong-dan-react-native-cac-kieu-react-navigation",prev:{frontmatter:{title:"Bộ kiến thức của google để được gọi là chuẩn Web Mobile Developer",desc:"Mình bắt đầu một series mới, đây là bài đầu tiên tổng hợp tất cả những chủ đề sẽ điểm qua trong series này, nắm hết các kiến thức này, các bạn có thể tự tin lấy chứng chỉ Web Mobile Specialist của Google",type:"post",category:null,tags:["mobile-web-specialist"],date:"2018-09-30",cover:""},fields:{slug:"/2018-09-30-huong-dan-tro-thanh-web-moblie-specialist"}},next:{frontmatter:{title:"Chỉ dẫn để thiết kế React Component",desc:"Tốt hơn, tốt nữa, tốt mãi, luôn là điều mình muốn, ngoài chuyện viết cho nó chạy đúng, viết thế nào tốt nhất nên là mục tiêu khi làm việc",type:"post",category:null,tags:["javascript","react"],date:"2018-09-25",cover:""},fields:{slug:"/2018-09-25-huong-dan-thiet-ke-react-component-tot"}}}}}});
//# sourceMappingURL=path---2018-09-27-huong-dan-react-native-cac-kieu-react-navigation-1a570e19e74d7e64b8c1.js.map