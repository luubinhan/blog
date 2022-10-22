---
slug: "/2019-01-09-tong-ket-mot-nam-2018-trong-the-gioi-front-end"
date: "2019-01-09"
title: "Tổng kết một năm của thế giới FrontEnd"
desc: "Thế giới lập trình Frontend nhiều biến chuyển, nhanh chóng mặt, chúng ta cùng điểm lại những tin tức, sự kiện, xu hướng nổi bật nhất trong năm 2018 vừa qua"
cover: "https://cdn-images-1.medium.com/max/800/1*lJAYDVQ5iJLzEhmJ-KsqoA.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [WebAssembly ra bản 1.0](#webassembly-ra-bản-10)
- [Top download trên NPM](#top-download-trên-npm)
- [GraphQL phát triển, được chờ đợi nhưng chưa thể thay thế REST](#graphql-phát-triển-được-chờ-đợi-nhưng-chưa-thể-thay-thế-rest)
- [CSS-in-JS muôn hình muôn vẻ](#css-in-js-muôn-hình-muôn-vẻ)
- [Developer tin dùng những bộ CLI có sẵn](#developer-tin-dùng-những-bộ-cli-có-sẵn)
- [Static site generator phát triển đem đến sự đơn giản quá cho Frontend và tối ưu performance](#static-site-generator-phát-triển-đem-đến-sự-đơn-giản-quá-cho-frontend-và-tối-ưu-performance)
- [Serverless và JAMStack](#serverless-và-jamstack)
- [VS Code trở thành ông vua mới của Text Editor/IDE](#vs-code-trở-thành-ông-vua-mới-của-text-editoride)

<!-- /TOC -->



## WebAssembly ra bản 1.0

WebAssembly thường được nhắc đến như là tương lai của web. Performance cao nhất, giảm kích thước file, cho phép phát triển web trên nhiều ngôn ngữ.
Cuối năm 2017 các trình duyệt thông báo sẽ hỗ trợ WebAssembly. Tháng 3 2018, WebAssembly công bố 3 release quan trọng

- [The core specification released 1.0](https://www.w3.org/TR/wasm-core-1/)
- [JavaScript interface for WebAssembly](https://www.w3.org/TR/wasm-js-api-1/)
- [Web API for WebAssembly](https://www.w3.org/TR/wasm-web-api-1/)

## Top download trên NPM

React, jQuery, Angular, Vue là 4 thư viện được download nhiều nhất.

![Tổng kết một năm của thế giới FrontEnd](https://cdn-images-1.medium.com/max/800/1*e036ugWPXTbBzMTSRsXiEw.png)

React chiếm ưu thế tuyệt đối trong năm vừa qua, đồng thời nó tiếp tục là thư viện được yêu thích nhất theo như khảo sát của [Stackoverlow](https://insights.stackoverflow.com/survey/2018/#most-loved-dreaded-and-wanted)

Team phát triển chính của React rất tích cực cập nhập và bổ sung tính năng mới. Trong năm 2018, chúng ta đã thấy rất nhiều thứ được thêm vào trong React 16, các phương thức lifecycle mới, context API mới, pointer event, hàm lazy, React.memo. Tuy nhiên 2 tính năng được cộng động quan tâm lớn nhất là React hook và Suspense API

React Hook nhận được rất nhiều phản hồi tích cực. Hook cho phép thêm `state` trong một function component với hàm `useState`, đồng thời quản lý sự kiện lifecycle

Video của Ryan Florence giới thiệu sử dụng React Hook giúp code sạch hơn 90%

<iframe width="700" height="393" src="https://www.youtube.com/embed/wXLf18DsV-I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
React Suspense cho phép quản lý data fetch bên trong React component. Nó sẽ *đợi* dữ liệu trả về từ một async response (dữ liệu từ việc call api) trước khi render. Trong tương lai, tham vọng của nó sẽ là đảm nhiệm quản lý toàn bộ việc load dữ liệu từ API và cache dữ liệu này.

<iframe width="700" height="393" src="https://www.youtube.com/embed/nLF0n9SACd4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Vue tiếp tục phát triển và vượt React về số lượt Star trên Github

Sau khi được giới thiệu năm 2017, Vue tiếp tục phát triển lớn mạnh trong 2018. Tuy vậy cũng nên biết là nó vẫn còn phía sau React và Angular về số lượng project sử dụng thực tế. Thư viện Vue sẽ còn tiếp tục phát triển trong nhiều năm tới và sẽ không bị mất hút trước sự lớn mạnh của React.

Angular tiếp tục được cập nhập với phiên bản 7
Tháng 10, Angular chính thức ra phiên bản thứ 7. Mặc dù không được cộng đồng fan lớn như React hay Vue, nó là lựa chọn phổ biến cho các dự án *chính quy*. Rất nhiều dev sau khi sử dụng React nhận ra một điều là, để có một ứng dụng hoàn thiện bằng React, phụ thuộc rất nhiều và các thư viện nguồn mở khác. Mỗi thư viện như vậy là được code bởi những cá nhân hoặc tập thể mà kiến trúc của nó tùy thuộc rất nhiều vào nhóm phát triển đó.

Trong khí đó, Angular sẽ gạt bỏ những tư duy và cách code không theo chuẩn mực chung. Angular có thể xem là một framework mà tư duy lập trình khá ràng buộc và nhất quán.

![Tổng kết một năm của thế giới FrontEnd](https://cdn-images-1.medium.com/max/800/1*SXOEH2cmEaC9SBHNp-nvtA.png)

![Tổng kết một năm của thế giới FrontEnd](https://cdn-images-1.medium.com/max/800/1*SXOEH2cmEaC9SBHNp-nvtA.png)

## GraphQL phát triển, được chờ đợi nhưng chưa thể thay thế REST

GraphQL được sự quan tâm của nhiều ông lớn, như Github. Tuy nhiên nó vẫn chưa thay thế REST như người ta đã dự đoán. Theo thống kê, chỉ 1/5 frontend developer đã từng sử dụng GraphQL, mặc dù 62,5% đã nghe và muốn học nó.

![Tổng kết một năm của thế giới FrontEnd](https://cdn-images-1.medium.com/max/1000/1*m6vDkicw6EUt8uc6EhcXAQ.png)

## CSS-in-JS muôn hình muôn vẻ

Làm web có xu hướng đưa toàn bộ xuống javascript, CSS-chung-nhà-với-JS vì thế cũng được nhiều quan tâm, ra đời nhiều kiểu tích hợp.

```jsx
// Component JS file
const MyComp = ({ isActive }) => {
  const className = isActive ? 'active' : 'inactive';
  return <div className={className}>HI</div>
}
// CSS file
.active { color: green; }
.inactive { color: red; }
```

Với CSS-ịn-JS bạn không còn quản lý các class CSS nữa, chúng ta truyền prop vào cho các styled component, nó sẽ xử lý việc cập nhập style.

```jsx
const Header = styled.div`
  color: ${({ isActive }) => isActive ? 'green' : 'red'};
`;
const MyComp = ({ isActive }} => (
  <Header isActive={isActive}>HI</Header>
)
```

2 thư viện nổi đình nổi đám là [styled-components](https://www.styled-components.com/) và [emotion](https://emotion.sh/). Styled-component ra đời sớm hơn và nhiều người sử dụng hơn, Emotion cũng là một đối thủ vươn lên mạnh mẽ.

![Tổng kết một năm của thế giới FrontEnd](https://cdn-images-1.medium.com/max/800/1*WfbUcGwcI4hmuD80S9XsCg.png)

Vue cũng hỗ trợ *scoped* CSS mà ko cần cài thêm bất cứ package gì. Chỉ việc gắn thêm attribute scoped vào là CSS đó sẽ *bám dính* lấy component đang định nghĩa.

## Developer tin dùng những bộ CLI có sẵn

Không có gì ngạc nhiên khi việc cập nhập các thư viện mới nhất, các configure mới nhất, lựa chọn kiến trúc tốt nhất luôn là vấn đề mệt mỏi. Khó khăn này được giải quyết bằng những package CLI cho phép developer tập trung vào viết logic của app. Next.js, Create-React-App, Nuxt.js, Vue CLI, Expo CLI, Angular là những cái tên được dùng nhiều nhất.

## Static site generator phát triển

Ai cũng thích học những công nghệ tiên tiến, những thư viện mới nhất của javascript, tuy nhiên chúng ta cũng nhận ra rằng, không phải tất cả các website điều cần đến một single page app phức tạp. Đó là nguồn gốc của những công cụ phát triển static site.

Static site đem đến các website đơn giản, đảm bảo hiệu năng tốt nhất. Với HTML được render lúc build, chúng ta có ngay một trang html gửi đến user mà không cần server side render, cho phép load trang gần như ngay lập tức. Các file javascript được download cho phép trải nghiệm tương tự như một single page app.

Những cái tên như [Gatsby](https://www.gatsbyjs.org/), [React Static](https://github.com/nozzle/react-static), [VuePress](https://vuepress.vuejs.org/). Sự phổ biến của những trang static như vậy được minh chứng bằng việc Gatsby đã thành lập hẳn một công ty và được rót vốn phát triển trong năm qua

## Serverless và JAMStack

Đi đôi với sự phổ biến của static site, chúng ta cũng thấy sự phát triển để bắt kịp trend ở phía server. Sự ra đời của JAMStack (javascript, APIs, Markup), trong năm 2018 chúng ta lần đầu có [JAMStack hackathon](https://medium.freecodecamp.org/winners-from-the-2018-freecodecamp-jamstack-hackathon-at-github-2a39bd1db878)

Để hiểu hơn một website JAMStack có thể scale đến mức nào mà vẫn có thể duy trì được performance, [Quincy Larson](https://medium.com/@quincylarson) có giải thích freecodecamp.org [sử dụng kiến trúc JAM]  như thế nào(https://www.freecodecamp.org/news/beaucarnes/freecodecamp-jamstack--i9ZVp23pm).

## VS Code trở thành ông vua mới của Text Editor/IDE

Cuộc chiến tranh dành vị trí  Text editor và IDE yêu thích của mọi developer không có gì ngạc nhiên khi VS Code không có đối thủ

![Tổng kết một năm của thế giới FrontEnd](https://cdn-images-1.medium.com/max/800/1*mLBjsSYDWEAdOy8pUjOjOg.png)


<a target="_blank" rel="noopener noreferrer" href="https://levelup.gitconnected.com/a-recap-of-frontend-development-in-2018-715724c9441d
">A Recap of Frontend Development in 2018</a>

