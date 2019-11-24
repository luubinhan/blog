---
slug: "/2019-11-24-huong-dan-chon-framework-frontend"
date: "2019-11-24"
title: "Lựa chọn framework frontend nào trong thời điểm hiện tại"
desc: "Đây không phải là một bài so sánh đâu mới là framework chạy nhanh nhất"
cover: "https://hackernoon.com/drafts/7m4a23g7.png"
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "javascript"]
---


Thời điểm hiện tại nếu bạn đang làm Frontend thì chắc hẳn đang sử dụng một framework nào đó trong 3 thằng này, Vue, React, và Angular. Nếu trước đây trên cả tá framework, và cả tá ví dụ về làm một ứng dụng web ToDoMVC trên github, thì cuộc chơi giờ đây đã đỡ hơn rất nhiều, khi chúng ta chỉ còn 3 lựa chọn sáng giá.

Để viết một ứng dụng phức tạp, chúng ta bắt buộc phải sử dụng framework, vì nếu không có những framework như vậy, chúng ta sẽ tốn không biết bao nhiêu thời gian để đạt được kết quả cuối cùng.

Chắc các bạn cũng như mình đã quá mệt mỏi với những bài viết so sánh 3 framework trên, ai ngon hơn ai, các bạn cũng nên dừng tìm kiếm câu trả lời cho câu hỏi "Top 10 framework nên xài trong năm 2019". Tại sao? Vì những bài viết này đa phần sẽ tập trung vào  đếm số lượng *sao* trên Github, số lượng tải về từ NPM, số câu hỏi liên quan trên Stack Overflow. Những con số thống kê vô hồn này chỉ có tác dụng trong những trường hợp cụ thể, như đi quảng bá về mức độ phủ rộng của những framework này. Nếu bạn là dân kỹ thuật và nhìn nhận ở góc độ kỹ thuật, phán xét những framework này ở góc độ kỹ thuật chứ không thể căn cứ trên số lượt *view* và *download*

> Kỹ thuật quyết định bên trong của từng framework là gì, đâu là sự khác nhau thực sự của từng framework

Mục tiêu cuối cùng của các framework đều là để giúp chúng ta viết ứng dụng web hiệu quả nhất có thể, việc cạnh tranh giữa các framework với nhau là ý tưởng tốt hay không? Mỗi framework sẽ có một số lượng người sử dụng nhất định, như React-Angular-Vue hiện tại có khoản hơn nửa triệu developer đang *ăn nằm* với nó hằng ngày.

Không có khái niệm "điểm tốt" và "điểm chưa tốt" cho các framework. Người ta thường hay hỏi mấy câu, framework nào xài ngon nhất. Một dạng câu hỏi bạn nên ngừng làm khó nhau vì không thể nào so sánh như toán học 3 > 2 > 1

Việc thiết kế phần mềm luôn đòi hỏi một sự đánh đổi, đặc biệt là với web, chắc có lẽ vì có quá nhiều thứ người ta muốn làm thông qua web, từ một trang web đơn giản chỉ là HTML tĩnh đến cả một hệ thống phức tạp nhất bạn có thể nghĩ ra, để đáp ứng toàn bộ những nhu cầu khác nhau đó, các framework phải chấp nhận đánh đổi một số thứ, chứ ko thể đáp ứng toàn bộ với một giải pháp toàn diện được

## Scope

> Framework cung cấp bao nhiêu đồ chơi cho bạn

Một trong những ví dụ kinh điển giữa **thư viện** và **framework** là React và Angular. React được xem là thư viện trong khi Angular sẽ là framework

Là một thư viện, React chỉ muốn tập trung cung cấp mô hình để phát triển UI. Để hình dung dễ hơn, liên tưởng tới các nhà máy sản xuất bún, scope rất cụ thể, tôi sẽ tập trung vào việc sản xuất ra bún, việc các bạn đem bún này về nấu thành món gì là do bạn, lý do tại sao ecosystem của React luôn luôn sôi động, rất nhiều dev đã chế biến thành các món khác nhau, như với món bún chúng ta có bún riêu, canh bún, bún đậu mắm tôm, bún cá châu đốc, bún mắm, vâng vâng.

Trong khi đó, Angular với tư cách là một framework thực thụ, nó sẽ tiếp cận vấn đề theo hướng từ trên xuống. Hình dung như mì gói nuôi nhân tài ở Việt Nam, với mọi thứ đóng gói đầy đủ để bạn có một món cứu đói tạm thời, bột nêm, dầu, hành. Angular cung cấp hệ thống form validation, animation,... rất nhiều tính năng khác mà chúng ta rất cần thiết để dựng nên một ứng dụng hoàn chỉnh. Với scope lớn như vậy, mọi tính năng khi thiết kế đã được nghĩ đến làm thế nào để chúng *sống chung* với nhau một cách mượt mà

**Lợi ích khi có scope nhỏ và cụ thể**

- Ít khái niệm, dễ tiếp cận ngay từ đầu. Trong React bạn sẽ có mô hình làm component, prop, state, virtual DOM, hook, bao nhiêu kiến thức thôi là bạn đã có thể bắt đầu làm quen React.
- Linh động, món bún có thể kết hợp với rất nhiều thứ gia vị, cách nấu khác nhau để cho ra các món ăn khác nhau.
- Team duy trì React *rảnh* hơn, những chuyện khác đã có cộng đồng gánh vác, như đi làm React Router, React Redux, React Form, họ sẽ có thời gian nhiều hơn để tập trung vào các ý tưởng mới cho bản thân React

**Hạn chế khi scope nhỏ và cụ thể**

- Khi bạn phải xây dựng một ứng dụng phức tạp, một vài concept cơ bản là không đủ xài, bạn phải tự viết khá nhiều. Giống như bắt bạn diễn tả tất cả những câu nói hằng ngày bằng cách chỉ sử dụng 10 từ, thì bạn diễn đạt ý như thế nào?
- Cách làm (*pattern*) mới ngày càng nhiều. Nói học React rất dễ là bạn thực sự chưa biết đến ngoài React ra, bạn có phải học vô số các cách làm (pattern) khác, như Redux, mặc dù không có trong tài liệu chính thức trên React, nhưng lại là thứ bạn không thể bỏ qua nếu muốn dùng React như một React Developer chân chính. Nào là Higher Other Component, Render Props, React hook, rồi quá trời cách để sử dụng CSS trong JS, tài liệu chính thức của React sẽ không nói bạn nên dùng gì, bạn phải tự tìm hiểu và chọn cái nào mình thích. Những kiến thức này bạn phải nạp từ từ như là một kiến thức chính quy để bạn có thể vỗ ngực xưng tên *tao là React Developer*.
- Ecosystem phát triển quá nhanh không đồng nghĩa với chất lượng các thư viện dành cho React cái nào cũng ngon, rất nhiều thư viện nổi lên một thời rồi ra đi mãi mãi, như Flux, rồi bao nhiêu là cách viết CSS trong JS. Trong ta luôn trong cảm giác lo sợ **lỡ mất không xài thằng ngon nhất rồi**
 
**Lợi ích khi có scope bao la bát ngát**

- Các vấn đề thường gặp đã được giải quyết hết, bạn có ngay tô mì để ăn trong 5 phút mà không cần suy nghĩ nhiều, cứ lên trang chủ, đọc tài liệu, học cái framework xong là xài, để nghiên cứu giây mơ rễ má có thể để sau. Đâu ai cấm bạn ăn mì gói bỏ thêm thịt bò, trứng hay tôm càng.
- Các tính năng bên trong được thiết kế để làm việc mượt mà đảm bảo tính thống nhất của toàn bộ hệ thống, không cần chạy đi đâu để kiếm giải pháp cho một vấn đề quá căn bản, bạn cứ lên trang chính thức của nó xem người ta giải quyết vấn đề đó như thế nào, không còn phải suy nghĩ lựa chọn đâu là cách tốt nhất trong hơn chục cái giải pháp được đưa ra.

**Hạn chế của scope bao quát bát ngát hết vườn hoa**

- Học là một quá trình dài, nhiều khi để tới được bước có một cái gì đó hiển thị trên màn hình, bạn phải trải qua cả khóa học bài bảng. Những người không có kiến thức về một ngôn ngữ Backend nào cả, chỉ biết HTML, CSS, javascript mà đọc tài liệu của Angular thì phải nói là một trãi nghiệm vô cùng đau thương
- Đôi khi một giải pháp được cung cấp sẵn lại không phù hợp với tính huống gặp phải, chúng ta ước gì có thể làm cách khác, nhưng điều đó là không thể.
- Hệ thống lớn đòi hỏi chi phí rất lớn để duy trì cũng như đưa ra các ý tưởng mới, rất nhiều thành phần phải tích hợp để cả hệ thống có thể kết nối hoạt động trơn tru


## Cơ chế render

> Cách structure, cách quản lý code của framework

Để đơn giản chúng ta so sánh JSX và Templates

**Điểm cộng của JSX/Virtual DOM**

- Tất cả điều là javascript, ai cũng thích, bạn không cần biết những syntax mới được định nghĩa bởi framework, những kiến thức bạn nạp vào là kiến thức nền tảng của javascript, một khi bạn đã cứng tay, bạn có thể thiên biến vạn hóa theo sở thích.
- Xem *view* như một dạng *data *, một component sẽ return một thứ gì đó dựa vào những giá trị input khác nhau, bạn có thể làm những thứ như chụp một cái snapshot dựa trên virtual DOM, render nó trên những target khác như terminal, PDF, Canvas, WebGL

**Điểm trừ của JSX/Virtual DOM**

- Vốn dĩ sẽ tiêu tốn tài nguyên. Khi React mới ra đời, họ cũng đã trả lời cho câu hỏi *làm như vậy có chậm không?*, *vâng nó chậm nhưng vẫn nhanh đủ để dùng*. Nếu nhìn nhận về mặc kỹ thuật, phải làm rất nhiều thao tác xử lý trên virtual DOM. Kích thước của một VDom chuẩn sẽ liên quan tới kích thước của view chứ không phải số lượng node sẽ thay đổi.
- Hàm render cơ bản rất linh động, vì linh động nên nó cũng rất khó optimize, linh động ở đây muốn nói đến một hàm render như thế này

```jsx
function render() {
    const children = []
    for (let i = 0; i < 5; i++) {
        children.push(h('p', {
            class: 'text'
        }, i === 2 ? this.message: "vuilaptrinh.com" ))
    }
    return h('div', { id: 'content'}, children)
}
```

Chúng ta có thể tạo parent node trước, rồi sau đó nhét thêm các node con, hoặc bất cứ thứ gì bạn có thể nghĩ ra được, javascript rất linh động, có nhiều tình huống đặc biệt chúng ta khó có thể đảm bảo optimize được cho tất cả.

- Giải pháp của React cho tình huống này không tập trung vào việc làm cho virtual DOM nhanh hơn, mà làm cho chúng ta *cảm giác* performance tốt hơn (giống như việc gửi tin nhắn trên facebook luôn cảm giác như gửi được liền chứ không cần đợi), việc đó được thực hiện bằng các kỹ thuật runtime scheduling, concurrent mode, time slicing. Những giải pháp này buộc họ phải tự tạo và quản lý một *stack* riêng, một công việc rất tốn kém

**Điểm cộng của Template**

- Với cách tiếp cận trực tiếp hơn cho việc render, performance đương nhiên sẽ *gần* hơn render performance của trình duyệt, với cách viết template như thế này sẽ không thể nào thay đổi được thứ tứ của những element đã khai báo

```html
<template>
    <div id="content">
        <p class="text">Lorem ipsum</p>
        <p class="text">Lorem ipsum</p>
        <p class="text">{{ message }}</p>
        <p class="text">Lorem ipsum</p>
    </div>
</template>
```
Việc đoán trước được những gì có thể thay đổi, giúp việc cải thiện hiệu năng cũng sẽ dễ tiếp cận hơn 

- Tùy vào tình huống, có thể giá trị baseline runtime sẽ thấp hơn

**Điểm trừ của Template**

- Dính chặt vào cú pháp của Template, bạn sẽ mất đi một ít tự do bay nhảy bằng javascript thông thường. Sự sáng tạo của chúng ta bị giới hạn trong những thứ mà framework cung cấp. Lỡ đâu bạn đã là một master javascript và bạn thấy cách làm của framework này *chuối* cả nải và muốn làm khác hơn.
- Cái giá phải trả cho giá trị baseline runtime thấp sẽ là kết quả trả về của mỗi template sẽ dài dòng hơn. Đôi khi để code chạy nhanh nhất có thể, chúng ta phải nhét cứng một số thông tin bên trong output

## Cơ chế State

> mutable vs immutable, dirty checking vs dependency tracking, reactivity vs simulated reactivity

Rất tiếc, Evan You không có thời gian trình bài phần này trong bài thuyết trình của mình.


## Tổng kết

Nếu bạn đang muốn chọn một framework một cách hợp lý, bạn phải hiểu được những gì mà framework đó đang đánh đổi, biết hướng đi của framework đó có khớp với những gì bạn ưu tiên hàng đầu cho dự án mình làm.

Các bạn có thể xem Video bài thuyết trình của Evan You [ở đây](https://www.youtube.com/watch?v=ANtSWq-zI0s)

