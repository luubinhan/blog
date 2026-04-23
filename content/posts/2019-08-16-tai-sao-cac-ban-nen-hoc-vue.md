---
slug: "/2019-08-16-tai-sao-cac-ban-nen-hoc-vue"
date: "2019-08-16"
title: "Tại sao các bạn nên học Vue"
desc: "Một vài suy nghĩ cá nhân của mình về mấy cái hay ho của Vue"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["vuejs", "kinh-nghiem"]
---

<!-- TOC -->

- [Single File Component](#single-file-component)
- [Sử dụng Vue mà không build, không cần webpack luôn](#s%e1%bb%ad-d%e1%bb%a5ng-vue-m%c3%a0-kh%c3%b4ng-build-kh%c3%b4ng-c%e1%ba%a7n-webpack-lu%c3%b4n)
- [Tích hợp với các ứng dụng server side đã có](#t%c3%adch-h%e1%bb%a3p-v%e1%bb%9bi-c%c3%a1c-%e1%bb%a9ng-d%e1%bb%a5ng-server-side-%c4%91%c3%a3-c%c3%b3)
- [Những plugin cần thiết, được hỗ trợ đầy đủ](#nh%e1%bb%afng-plugin-c%e1%ba%a7n-thi%e1%ba%bft-%c4%91%c6%b0%e1%bb%a3c-h%e1%bb%97-tr%e1%bb%a3-%c4%91%e1%ba%a7y-%c4%91%e1%bb%a7)
- [Kết](#k%e1%ba%bft)

<!-- /TOC -->

Khi thế giới frontend đang tôn thờ React như một **chuẩn mực mới của lập trình frontend**, có bao giờ bạn tự hỏi "vì React quá lợi hại tới mức không ai đánh bại nổi, hay vì Facebook biết cách quảng cáo bộ đồ chơi của mình trong cộng đồng lập trình viên?"

Bị *ép buộc* xài Vue khoảng 8 tháng nay, từ khi anh lead phán câu "Anh không thích React, build feature lâu quá em", cũng có thể gọi là có chút ít kinh nghiệm xài qua Vue. Tổng kết lại những điểm mà cá nhân mình thấy thích khi sử dụng Vue, mọi người góp ý thêm nếu thấy còn thiếu

## Single File Component

Mỗi component sẽ là 1 file duy nhất, tách 3 phần riêng biệt template HTML, javascript, css (build sẵn luôn SCSS, scoped cho từng component mới ngon chứ)

```html
<template>
    <!-- phần html -->
</template>

<script>
    <!-- phần javascript xử lý logic -->
</script>

<style lang="scss" scoped>
    <!-- phần css định dạng component →
</style>
```

Cái cấu trúc 3 phần riêng biệt, đúng thứ tự 1-HTML, 2-SCRIPT, 3-STYLE mình thấy nó quá tuyệt vời, mở file component lên ai cũng biết mục đích của từng phần nó là để làm gì. Không rõ ai học ai, chỉ biết Web Component cũng dùng một cấu trúc tương tự như vậy.

Một file React component sẽ như thế nào: `state` nằm ở trên, kéo xuống dưới có render function, kéo ngược lên để tìm các function khác, các function ở trên đôi khi lại có render một ít HTML Việc đi **lòng vòng** để tìm đúng vị trí muốn chỉnh là không tránh khỏi.

Khi làm việc trong html template, Vue cung cấp mấy cái gọi là directive `v-for` và `v-if`, không còn loay hoay nghĩ xem render một danh sách các component dạng mảng thế nào mới tốt, đặt ở trong hàm render hay đưa vào một hàm con ở trên?. Đọc code cũng dễ chịu, thử đọc một đoạn `v-for` trong Vue với một hàm render kiểu `arrays.map((item) => this.renderChild(item))` thì biết thằng nào trực quan hơn?

Ngoài ra còn có thể kế đến `computed`, `watch`, `scss`, `slot`, `slotScoped`, transition cũng được hỗ trợ sẵn trong Vue, bạn chẳng cần một thư viện nào khác với những animation đơn giản bằng CSS

Nếu bạn đang dùng React, và nhét mọi thứ trong 1 file, bạn sẽ phải tìm tới một số thư viện bổ sung như `styled-components`, `node-sass`


## Sử dụng Vue mà không build, không cần webpack luôn

Với một file html tĩnh, muốn dùng component với Vue

```html
<div id="app">
    {{ message }}
</div>

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
</script>
```

Bạn chỉ cần load bản build của Vue, một cái `id` trên html và một file javascript là bạn vô tư bind dữ liệu phà phà.

Một ứng dụng thấy liền là nếu bạn đang muốn làm một trang single page, chỉ binding một ít dữ liệu, kiếu mấy trang landing page để làm marketing, bạn xài luôn thế này, khỏi setup rườm rà

Tất nhiên bạn cũng có thể dùng React theo cách tương tự như trên, nhưng không ai dùng React những trang như vậy, thường là phải setup một mớ cái boilerplate, vì React sinh ra cũng chẳng phải để giải quyết mấy trang kiểu như thế.

## Tích hợp với các ứng dụng server side đã có

Trong [bài thuyết trình của Evan You](https://shoptalkshow.com/episodes/350/), tác giả có giải thích quyết định bỏ bước build như yêu cầu bắt buộc trong Vue. Nâng cấp các ứng dụng đã có sẵn là một trong những điều mà Vue muốn nhắm tới. Để nó có thể tích hợp, thay thế một phần trong các ứng dụng có sẵn bằng Vue.

Hôm rồi mình có mò mẫm làm cái [theme wordpress bằng Vue](https://github.com/EvanAgee/vuejs-wordpress-theme-starter) và REST API của Wordpress, mặc dù chưa tới đâu, nhưng khả năng là **có thể**, bạn có thể dùng bộ admin của wordpress, phần theme ở client dùng Vue.

## Những plugin cần thiết, được hỗ trợ đầy đủ

Với những vấn đề gặp hoài, gặp mãi khi làm app như State Management, Routing, Form validate, Vue giới thiệu luôn những plugin làm sẵn như [Vuex](https://vuex.vuejs.org/), [Vue Router](https://router.vuejs.org/), [Vue.js Server-Side Rendering](https://ssr.vuejs.org/#why-ssr)

Sẽ có bạn la lên phản đối, rằng với React bạn được tự do lựa chọn thư viện bạn thích, nếu bạn thấy nó hợp gu với mình, mỗi thư viện có cái hay riêng bạn không nhất thiết gì phải buộc mình vào một thư viện làm routing nào cả, bạn sẽ nói React mạnh mẽ hơn Vue gấp nhiều lần - căn cứ vào đâu?. Cách tiếp cận này của Vue, giúp bạn tiết kiệm được không ít thời gian cho việc tìm kiếm, đánh giá các thư viện trên npm xem nó có phù hợp với mình không.

Ví dụ cái middleware của Redux, nếu để lựa chọn giữa `redux-thunk`, `redux-saga`, `redux-observable` bạn sẽ chọn cái nào? Lý do cho lựa chọn đó là gì? Với Vuex bạn không phải lo chuyện xài cái middleware nào cho lợi nhất.

Những thư viện Vue *chuẩn cơm mẹ nấu* này, không đẩy hết trách nhiệm cho cộng đồng tự quản, nó còn để luôn, ngay trên trang chủ, tụi em cần **nhà tài trợ**, phải có cơm thì mới có người tiếp tục maintain và phát triển tiếp, thế giờ này cần tiền để vận hành, Vue cũng vậy thôi.

## Kết

React sẽ hợp với một số người, Vue sẽ hợp với một số người, Angular sẽ hợp với một số còn lại. Nếu 3 thằng này là 3 cái máy giặt, Angular là một cái máy giặt dành cho bệnh viện, xí nghiệp, React là một cái máy giặt Nhật với hàng tá nút bấm và lựa chọn, dù mục đích bạn là gì, luôn có cách điều chỉnh để React phù hợp với bạn, còn Vue như cái máy giặt gia đình với ngôn ngữ đã được Việt hóa, mua về thì cả ba, má dưới quê cũng xài được. Đó là cách mà 3 **ông lớn** đang thiết kế và nhắm tới.

Mình còn non và xanh lắm, chổ nào nhìn nhận chưa đúng mong cao thủ chỉ thêm.


Bài viết của Vuilaptrinh.com