webpackJsonp([0xb8f5ec107b4f],{1302:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#constants">Constants</a></li>\n<li><a href="#actions">Actions</a></li>\n<li><a href="#reducer">Reducer</a></li>\n</ul>\n<!-- /TOC -->\n<h1 id="constants"><a href="#constants" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Constants</h1>\n<p>constants/actionTypes.js</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/* @flow */</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">PLAY</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'PLAY\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">PAUSE</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'PAUSE\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">STOP</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'STOP\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">BACKWARD</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'BACKWARD\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">FORWARD</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'FORWARD\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">UPDATE_TIME</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'UPDATE_TIME\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SELECT_TRACK</span><span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'SELECT_TRACK\'</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Chuyện này có hơi dư thừa vì chúng ta biết chắc chắn các hằng số này sẽ luôn là <code class="language-text">string</code>, có bao giờ chúng ta lại đi đổi giá trị trong constants</p>\n<p>Flow cho phép chúng ta khai báo các type sau:</p>\n<ul>\n<li><strong>string</strong></li>\n<li><strong>number</strong></li>\n<li><strong>boolean</strong></li>\n<li><strong>Function</strong></li>\n<li><strong>Array</strong></li>\n<li><strong>Object</strong></li>\n<li><strong>any</strong></li>\n<li><strong>mixed</strong></li>\n<li><strong>void</strong></li>\n</ul>\n<p>Nếu biến có thể <code class="language-text">null</code>, tức không bắt buộc thì thêm dấu <strong>?</strong> vào trước, ?string, ?number, ?boolean</p>\n<h1 id="actions"><a href="#actions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Actions</h1>\n<p>playerActions.js </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span>\n  <span class="token constant">PLAY</span><span class="token punctuation">,</span>\n  <span class="token constant">PAUSE</span><span class="token punctuation">,</span>\n  <span class="token constant">STOP</span><span class="token punctuation">,</span>\n  <span class="token constant">BACKWARD</span><span class="token punctuation">,</span>\n  <span class="token constant">FORWARD</span><span class="token punctuation">,</span>\n  <span class="token constant">UPDATE_TIME</span><span class="token punctuation">,</span>\n  <span class="token constant">SELECT_TRACK</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'constants/actionTypes\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">PLAY</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">PAUSE</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">STOP</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">backward</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">BACKWARD</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">FORWARD</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">updateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">UPDATE_TIME</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">selectTrack</span><span class="token punctuation">(</span>track<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">SELECT_TRACK</span><span class="token punctuation">,</span> track <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Với những function thế này, chúng ta phải chỉ định kiểu params truyền vào và kiểu return, mỗi một method chúng ta định nghĩa ra một custom type để sử dụng</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">export</span> type PlayerAction <span class="token operator">=</span> <span class="token punctuation">{</span>\n  type<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n  track<span class="token operator">?</span><span class="token punctuation">:</span> Track<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Có thể thấy Track cũng là một custom type khác mà chúng ta định nghĩa ở đâu đó rồi import vào như một module</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">export</span> type Track <span class="token operator">=</span> <span class="token punctuation">{</span>\n  id<span class="token punctuation">:</span> number<span class="token punctuation">;</span>\n  artistId<span class="token punctuation">:</span> number<span class="token punctuation">;</span>\n  title<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n  key<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n  bucket<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Chúng ta sửa lại cái playerActions.js ở trên với Flow</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/* @flow */</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  <span class="token constant">PLAY</span><span class="token punctuation">,</span>\n  <span class="token constant">PAUSE</span><span class="token punctuation">,</span>\n  <span class="token constant">STOP</span><span class="token punctuation">,</span>\n  <span class="token constant">BACKWARD</span><span class="token punctuation">,</span>\n  <span class="token constant">FORWARD</span><span class="token punctuation">,</span>\n  <span class="token constant">UPDATE_TIME</span><span class="token punctuation">,</span>\n  <span class="token constant">SELECT_TRACK</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'constants/actionTypes\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> type PlayerAction <span class="token operator">=</span> <span class="token punctuation">{</span>\n  type<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n  currentTime<span class="token operator">?</span><span class="token punctuation">:</span> number<span class="token punctuation">;</span>\n  track<span class="token operator">?</span><span class="token punctuation">:</span> Track<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Import Track type from player, defines the properties a Track object</span>\n<span class="token comment">// can have.</span>\n<span class="token keyword">import</span> type <span class="token punctuation">{</span> Track <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'reducers/player\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> PlayerAction<span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">PLAY</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerAction <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">PAUSE</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerAction <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">STOP</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">backward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerAction <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">BACKWARD</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerAction <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">FORWARD</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">updateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerAction <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">UPDATE_TIME</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">selectTrack</span><span class="token punctuation">(</span>track<span class="token punctuation">:</span> Track<span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerAction <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token constant">SELECT_TRACK</span><span class="token punctuation">,</span> track <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="reducer"><a href="#reducer" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Reducer</h1>\n<p>Một khi đã quen thuộc với cách định nghĩa type cho hàm như trên thì chúng ta sẽ dễ dàng chỉnh sửa lại reducer thôi, vì nó cũng tương tự.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/* @flow */</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  <span class="token constant">PLAY</span><span class="token punctuation">,</span>\n  <span class="token constant">PAUSE</span><span class="token punctuation">,</span>\n  <span class="token constant">STOP</span><span class="token punctuation">,</span>\n  <span class="token constant">BACKWARD</span><span class="token punctuation">,</span>\n  <span class="token constant">FORWARD</span><span class="token punctuation">,</span>\n  <span class="token constant">UPDATE_TIME</span><span class="token punctuation">,</span>\n  <span class="token constant">SELECT_TRACK</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'constants/actionTypes\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Import the PlayerAction type form the actions/playerActions.js file, much</span>\n<span class="token comment">// like we imported the Track type into our action previously.</span>\n<span class="token keyword">import</span> type <span class="token punctuation">{</span> PlayerAction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'actions/playerActions\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> type Track <span class="token operator">=</span> <span class="token punctuation">{</span>\n  id<span class="token punctuation">:</span> number<span class="token punctuation">;</span>\n  artistId<span class="token punctuation">:</span> number<span class="token punctuation">;</span>\n  title<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n  key<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n  bucket<span class="token punctuation">:</span> string<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Create a type alias called Dictionary. This will allow us to define data</span>\n<span class="token comment">// that follows the model, a bit superfluous for this example, but good to</span>\n<span class="token comment">// understand how it works:</span>\n<span class="token comment">// {</span>\n<span class="token comment">//   key: value</span>\n<span class="token comment">// }</span>\ntype Dictionary<span class="token operator">&lt;</span><span class="token constant">K</span><span class="token punctuation">,</span><span class="token constant">T</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token constant">T</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// In our PlayerState definition we\'re also going to</span>\n<span class="token comment">// define an instance of the Dictionary type</span>\n<span class="token comment">// where the key int he object is a number, and</span>\n<span class="token comment">// the value is of type Track.</span>\n<span class="token keyword">export</span> type PlayerState <span class="token operator">=</span> <span class="token punctuation">{</span>\n  tracks<span class="token punctuation">:</span> Dictonary<span class="token operator">&lt;</span>number<span class="token punctuation">,</span> Track<span class="token operator">></span><span class="token punctuation">;</span>\n  currentTrackId<span class="token punctuation">:</span> <span class="token operator">?</span>number<span class="token punctuation">;</span>\n  currentTime<span class="token punctuation">:</span> number<span class="token punctuation">;</span>\n  playing<span class="token punctuation">:</span> boolean<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Declare our initial player state which follows our PlayerState type.</span>\n<span class="token keyword">const</span> initialState<span class="token punctuation">:</span> PlayerState <span class="token operator">=</span> <span class="token punctuation">{</span>\n  tracks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  currentTrackId<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n  currentTime<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n  playing<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// This helper method will return the id of the next track</span>\n<span class="token comment">// in our playlist. It receives a track dictionary from</span>\n<span class="token comment">// the state, and the current track id. It maps out the</span>\n<span class="token comment">// data to an array, and finds the next sequential index.</span>\n<span class="token keyword">function</span> <span class="token function">getNextTrackId</span><span class="token punctuation">(</span>\n  tracks<span class="token punctuation">:</span> Dictonary<span class="token operator">&lt;</span>Track<span class="token punctuation">,</span> number<span class="token operator">></span><span class="token punctuation">,</span>\n  currentTrackId<span class="token punctuation">:</span> number\n<span class="token punctuation">)</span><span class="token punctuation">:</span> number <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> trackIds <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>tracks<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> nextTrackIndex <span class="token operator">=</span> trackIds<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>currentTrackId<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextTrackIndex <span class="token operator">>=</span> tracks<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    nextTrackIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> tracksIds<span class="token punctuation">[</span>nextTrackIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// This helper method will return the id of the</span>\n<span class="token comment">// previous track in our playlist. It works exactly</span>\n<span class="token comment">// like the previous helper function.</span>\n<span class="token keyword">function</span> <span class="token function">getPreviousTrackId</span><span class="token punctuation">(</span>\n  tracks<span class="token punctuation">:</span> Dictonary<span class="token operator">&lt;</span>Track<span class="token punctuation">,</span> number<span class="token operator">></span><span class="token punctuation">,</span>\n  currentTrackId<span class="token punctuation">:</span> number\n<span class="token punctuation">)</span><span class="token punctuation">:</span> number <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> trackIds <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>tracks<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> nextTrackIndex <span class="token operator">=</span> trackIds<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>currentTrackId<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextTrackIndex <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    nextTrackIndex <span class="token operator">=</span> trackIds<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> trackIds<span class="token punctuation">[</span>nextTrackIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// This is our reducer. There\'s nothing special to call out</span>\n<span class="token comment">// here except that we are declaring our two input types</span>\n<span class="token comment">// of PlayerState and PlayerAction, and that we must</span>\n<span class="token comment">// return a valid instance of PlayerState.</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">player</span><span class="token punctuation">(</span>\n  state<span class="token punctuation">:</span> PlayerState <span class="token operator">=</span> initialState<span class="token punctuation">,</span>\n  action<span class="token punctuation">:</span> PlayerAction\n<span class="token punctuation">)</span><span class="token punctuation">:</span> PlayerState <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">case</span> <span class="token constant">PLAY</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      playing<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">case</span> <span class="token constant">PAUSE</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      playing<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">case</span> <span class="token constant">STOP</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      playing<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n      currentTime<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">case</span> <span class="token constant">BACKWARD</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      currentTime<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      currentTrackId<span class="token punctuation">:</span> <span class="token function">getPreviousTrackId</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>tracks<span class="token punctuation">,</span> state<span class="token punctuation">.</span>currentTrackId<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">case</span> <span class="token constant">FORWARD</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      currentTime<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      currentTrackId<span class="token punctuation">:</span> <span class="token function">getNextTrackId</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>tracks<span class="token punctuation">,</span> state<span class="token punctuation">.</span>currentTrackId<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">case</span> <span class="token constant">UPDATE_TIME</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      currentTime<span class="token punctuation">:</span> action<span class="token punctuation">.</span>currentTime<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">case</span> <span class="token constant">SELECT_TRACK</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token operator">...</span>state<span class="token punctuation">,</span>\n      currentTime<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      currentTrackId<span class="token punctuation">:</span> action<span class="token punctuation">.</span>track<span class="token punctuation">.</span>id<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">default</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> state<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Một lợi ích của việc define type mà mình rất thích là nó sẽ có cái hint trên IDE mỗi khi mình dùng gọi đến hàm hay params đó.</p>\n<p><a href="/blog/2018-09-10-huong-dan-lam-viec-voi-flow-react-type-checking">Đọc thêm: Tại sao sử dụng Flow, và sử dụng Flow như thế nào trong React</a></p>\n<p><a href="https://medium.com/@cdebotton/redux-and-flowtype-69ff1dd09036">Tài liệu tham khảo</a></p>',
timeToRead:4,excerpt:"Constants Actions Reducer Constants constants/actionTypes.js Chuyện này có hơi dư thừa vì chúng ta biết chắc chắn các hằng số này sẽ luôn là…",frontmatter:{title:"Sử dụng Flow để check type trong React Redux",cover:"",date:"2018-09-13",category:null,tags:["react","redux"],desc:"Chúng ta sẽ không nói nhiều cách sử dụng Redux trong bài này, các bạn có thể xem các bài trước, ở đây mình chỉ đi đến vấn đề đưa Flow vào để check type trong Redux"},fields:{slug:"/2018-09-13-huong-dan-su-dung-flow-voi-react-redux"}}},pathContext:{slug:"/2018-09-13-huong-dan-su-dung-flow-voi-react-redux",prev:{frontmatter:{title:"Quản lý dự án theo Agile và Scrum cho người mới bắt đầu",desc:"Nếu muốn chế trực thăng, phát triển một phần mềm, viết một quyển sách, hoặc xây lại một căn nhà bạn bắt đầu từ đâu?",type:"post",category:null,tags:["javascript"],date:"2018-09-15",cover:"https://blog.trello.com/hs-fs/hubfs/Imported_Blog_Media/scrum_agile_feature-1024x512.jpg?t=1537150324734&width=1024&height=512&name=scrum_agile_feature-1024x512.jpg"},fields:{slug:"/2018-09-15-huong-dan-cho-nguoi-moi-bat-dau-voi-scrum-va-agile-project-manament"}},next:{frontmatter:{title:"Làm toast notification system trong React/Redux",desc:"Có lẽ ko có ứng dụng web nào lại ko cần thông báo đến user kết quả của một thao tác nào đó, xây một notification system để sử dụng là hết sức cần thiết",type:"post",category:null,tags:["react","javascript"],date:"2018-09-12",cover:""},fields:{slug:"/2018-09-12-huong-dan-build-notify-system-voi-react-redux"}}}}}});
//# sourceMappingURL=path---2018-09-13-huong-dan-su-dung-flow-voi-react-redux-e76dc05451c68e6a3de2.js.map