---
title: "FrontEnd Developer 2016 thì nên học cái gì?"
desc: "Hey mình có dự án mới về web, không code web lâu quá rồi, không biết bây giờ viết web thì nên làm bằng gì? Mình chỉ là frontend developer, nhưng bạn đã tìm đúng người rồi đó, mình làm web cũng đã lâu, mình có thể chỉ bạn biết cần học gì để tạo web apps"
slug: "/2016-04-12-front-end-developer-2016-nen-hoc-gi"
date: "2016-04-12"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags:
    - javascript
    - css
---

*Hey mình có dự án mới về web, không code web lâu quá rồi, không biết bây giờ viết web thì nên làm bằng gì?*

Mình chỉ là frontend developer, nhưng bạn đã tìm đúng người rồi đó, mình làm web cũng đã lâu, mình có thể chỉ bạn biết cần học gì để tạo web apps

<!--more-->

*Ngon, giờ mình cần một trang hiển thị những hoạt động gần đây của user, mình chỉ cần dữ liệu từ REST sau đó hiện thị lên table, trên đó mình có thể cho phép user lọc lại theo điều kiện họ muốn, chắc là xài jQuery để hiện thị dữ liệu hả?*

Trời, thời nào rồi ông, giờ còn ai viết jQuery nữa. Học React đi, năm 2016 rồi còn làm cái đó bằng jQuery.

*React, có nghe qua, mà nó là cái gì*

Thư viện siêu ngon của mấy thằng làm trong Facebook phát triển, người ta xài cái này để handle mấy cái view cho dễ.

*Mình dùng React để hiển thị dữ liệu từ server?*

Đúng rồi, trước tiên cần thêm React và React DOM vô

*Sau phải tới 2 thư viện?*

Cái đầu là thư viện chính, còn cái DOM là để thao tác với cái DOM, mà bây giờ cái DOM được mô tả trong cái JSX

*JSX là cái quái gì ?*

JSX là syntax mở rộng của javascript, giống hệt như XML, tốt hơn HTML bình thường

*HTML bình thường thì có vấn đề gì*

Giờ chả ai đi viêt HTML thuần nữa ông ơi

*Vậy 2 thư viện đó là đủ ?*

Còn, cần thêm Babel

*Thêm một thư viện nữa ?*

Babel cho phép xác định phiên bản javascript muốn dúng, nếu không có Babel vẫn dùng React được, nhưng sẽ là ES5, tụi con nít bây giờ code trên ES2016+ không

*ES5? ES2016+? mất phương hướng rồi, đó giờ chưa nghe tới*

ES5 viết tắt cho ECMAScript 5, là phiên bản thứ 5 từ khi javascript được chuẩn hóa năm 1999, mới nhất là 7.

*Không hiểu đang nói gì hết, bắt đầu rối quá. Tui chỉ cần tải một mớ dữ liệu từ server, include jquery từ CDN, gọi một cái AJAX, sau không làm vậy cho đơn giản?*

2016 rồi chú, ai xài jQuery nữa, kết thúc thời đại của cái kiểu code hầm bà lằng một đống bùi nhùi.

*Vậy giải pháp là load 3 thư viện rồi hiển thị dữ liệu lên HTML*

Cần thêm cái Module manager

*Module manager nó là cái gì*

Cái này tùy thuộc vào môi trường, trên web thì thường là phải hỗ trợ AMD hoặc CommonJS modules

*rồi vậy AMD và Common JS là cái chi chi ?*

Định nghĩa nè. Có nhiều cách để mấy cái thư viện javascript và classe tương tác với nhau, biết kiểu export và requires hông? mình có thể viết nhiều file javascript rồi sử dụng Browserify để gom nó lại thành một cục

*Browserify ?*

Công cụ cho phép gom các CommonJS đã được định nghĩa, những file dependencies, thằng này được tạo ra để có thể gọi các thư viện được publish trên npm

*npm?*

Nó là cái kho javascript công cộng, được những anh lập trình thông minh đẹp trai tin dùng để đứa đứa con javascript của mình lên đây.

*Giống kiểu CDN hả?*

Không hẳn, nó như cái trung tâm dữ liệu nơi tác giả đưa source lên, nếu cần xài thì mình tải xuống chứ không gọi trực tiếp như CDN.

*À, giống Bower*

Đúng rồi, 2016, chắc ít ai xài Bower lắm cha.

*Tự thấy lạc hậu quá, vậy là cần tải mấy cái thư viện từ npm rồi sau nữa*

Trong trường hợp của chú, để sử dụng React, down cái React module về rồi import vô trong code.

*Giống Angular!*

Angular là chuyện của 2015. Mà cũng đúng, Angular sẽ sánh vai cùng với VueJS và RxJS trong tương lai còn dài

*Phải làm nhiều quá ta*

Đó là lý do cần có task manager như Grunt hoặc Gulp hoặc Broccoli để tự động chạy Browserify, biết sử dụng Mimosa hông?

*Nghe lạ tai rồi, đang nói khỉ gió gì vậy*

Task managers. Thật ra cũng không còn ngon như thời mới ra nữa, sau đó người ta chuyển qua dùng Makefiles, và bây giờ là Webpack

*Ủa tưởng Makefiles chỉ được phổ biến với cộng đồng C hoặc C++ chứ*

Đúng, nhưng người ta vẫn hay bảo, chúng ta thích làm cho mọi thứ phức tạp hết lên rồi sau đó lại quay về với những điều căn bản nhất.

*Còn Webpack là gì*

Một trình quản lý module khác cho trình duyệt, một phiên bản tốt hơn Browserify

*Tốt hơn chổ nào*

Nó cho phép sử dụng những module manager khác nhau không chỉ riêng CommonJS, đề phòng không hổ trợ ES6

*Quá confuse với mới CommoJS/ES6 luôn*

Ai cũng vậy, javascript đó giờ nó vậy

*Còn gì nữa không*

Học Typescript, nó cũng là javascript nhưng tốt hơn, và nếu đang dùng ES6 thì viết Typescript cho nó đã, giảm lỗi run-time, xài thêm cái flow để kiểm tra nữa.

*.... Flow là gì á*

Của mấy cậu nhà Facebook chế, kiểm tra lỗi khi rõ. Họ code bằng OCaml, code theo kiểu function đã lắm

*OCaml, code hướng Function ?*

Con cưng của 2016 man, chỉ cần biết code theo kiểu functional thì tốt hơn OOP, đó là những gì mà lập trình viên 2016 họ làm.

*Hồi đó học OOP ở truong trường, tưởng cái đó good lắm chứ*

Như Java trước khi bị mua lại bởi Oracle. Ý là OOP đã từng tốt và vẫn được sử dụng tới giờ, nhưng bây giờ người ta nhận ra rằng chỉnh sửa một cái state cũng giống như đá đích đứa con nít, mọi người sử dụng đối tượng immutable và code theo functional. Mà bây giờ có thư viện Ramda rồi, viết javascript theo hướng function có gì khó.

*Nữa hả Ramda là cái chi chi*

Thư viện của David Chamber viết. Nếu muốn học kiểu viết functional thì nên biết đến tên của Erik Meijer

*Dừng ở đây được rồi, cái gì cũng tốt, nhưng mà quá phức tạp và chả cần thiết, lấy dữ liệu hiển thị lên mà nhằn vậy hả, có thằng khùng nào học hết cái nùi đó chỉ để hiển thị cái table lên không, rồi quay lại với React đi, giờ làm sao*

Thật ra React không có giữ việc fetch dữ liệu, nó chỉ hiện thị thôi

*Đậu xanh. vậy chở sao get dữ liệu*

Dùng Fetch để fetch dữ liệu từ server

*Đặt tên hay quá*

Fetch là native implement cho một XMLHttpRequests tới server

*AJAX chứ gì*

AJAX chỉ là XMLHttpRequest. Fetch cho phép thực thi AJAX trên promises để tránh thảm họa với callback

*Thảm họa callback*

Đúng rồi, mỗi lần thực thi một asynchronous request tới server, mình phải đợi server response, nghĩa là mình phải thêm một function trong một function, nó được gọi là callback pyramid from hell.

*Vậy giải quyết là*

Bằng cách đưa cái callback qua promise, có thể viết code dễ hiểu hơn, dễ test hơn, thực thi một lúc nhiều request cùng lúc

*Fetch làm chuyện đó ?*

Đúng trong trường hợp user sử dụng trình duyệt hổ trợ, bằng không phải sử dụng thêm Fetch polyfill hoặc Request, Bluebird, Axios

*Trời đất ơi vậy cần bao nhiêu thư viện, bao nhiêu thư viện cho cái việc đơn giản này*

Cần javascript. Có tới hàng ngàn cái thư viện được viết bằng javascript làm được một việc. Mình chọn cái tốt nhất, thư viện thì nhiều nhưng xài có chọn lọc.

*Vậy Bluebird, Request, Axios làm chuyện gì*

Thư viện này cho phép thực thi XMLHttpRequest rồi trả về promises

*jQuery AJAX cũng làm được vậy*

KHÔNG AI dùng "J" trong năm 2016 đâu, chỉ sử dụng Fetch, polyfill,....

*Thôi chắc dừng ở đây đi*

Thật đó nếu giờ là tui phải sử dụng templating engine, tui sẽ chỉ sử dụng Typescript + SystemJS + Babel.

*Hiển thị dữ liệu thôi, cần phải phức tạp hóa vậy không trời, hay cho tui biết cần xài cái templating engine nào đi rồi tui tự học tiếp*

Vậy ông quen với cái nào

*Quên rồi, lâu quá không còn đụng tới*

jTemplate, jQote, PURE?

*Hổng quen, cho cái khác đi*

Transparency? JSRender? MarkupJS? KnockoutJS, PlatesJS? jQuery-tmpl? Handlebars? cũng còn vài người xài cái này.

*Có cái nào dễ biết hơn chút không*

Nhức đầu rồi, underscore? công nghệ từ 2014 ông có biết không?

*Chưa bao giờ đụng tới*

Jade? DustJS? DotJS? EJS ? Coffeescript ?

*Thôi tui xin quay lại với code backend, quá nhiều thay đổi cần phải học tui không thể handle hết, cộng động javascript mấy ông đúng là điên hết rồi nếu nghĩ là có ai đó có thể biết hết chừng đó thứ*

Hiểu rồi, ông nên vô học Python đi

*Tại sao?*

Chưa từng nghe tới Python 3 luôn sao?

Dịch từ: https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.gg2qmpxxd

Tác giả: Jose Aguinaga
Web Engineer. UX & Interactions Designer. Full-Stack Javascript Developer