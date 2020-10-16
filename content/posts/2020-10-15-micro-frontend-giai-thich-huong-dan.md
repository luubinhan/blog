---
slug: '2020-10-15-micro-frontend-giai-thich-huong-dan'
date: '2020-10-15'
title: 'Micro frontend tại sao và như thế nào'
desc: 'Lướt qua một vài điểm về Micro Frontend, ý tưởng chính và các vấn đề được quan tâm'
tags: ['dam-dao', 'hoc-thuat']
canonical_url: false
---

<!-- TOC -->

- [Tại sao bạn cần biết đến Micro frontend](#tại-sao-bạn-cần-biết-đến-micro-frontend)
- [Micro frontend là cái gì](#micro-frontend-là-cái-gì)
- [Hiện thực hóa như thế nào](#hiện-thực-hóa-như-thế-nào)
  - [Tương tác giữa các ứng dụng](#tương-tác-giữa-các-ứng-dụng)
  - [Thư viện component dùng chung](#thư-viện-component-dùng-chung)
  - [Styling](#styling)
  - [Các cách để integrate](#các-cách-để-integrate)
    - [Cách 1: composition dùng server side template](#cách-1-composition-dùng-server-side-template)
  - [Integrate lúc build](#integrate-lúc-build)
    - [Integrate lúc run-time bằng iframe](#integrate-lúc-run-time-bằng-iframe)
  - [Integrate lúc run-time bằng JavaScript](#integrate-lúc-run-time-bằng-javascript)
  - [Integrate lúc run-time bằng Web Component](#integrate-lúc-run-time-bằng-web-component)
  - [Trao đổi giữa Backend](#trao-đổi-giữa-backend)
- [Kết](#kết)

<!-- /TOC -->

## Tại sao bạn cần biết đến Micro frontend

Vấn đề cần giải quyết:

- Ứng dụng càng lúc càng phình ra về quy mô, cũng như độ phức tạp
- **Một codebase FE** duy nhất mà muốn maintain thì chỉ có _gặp ác mộng hằng đêm_
- Nhiều team FE, mỗi team chỉ làm việc trên một phần tính năng nào đó rất cụ thể, chỉ 1 codebase mà hơn 5 team vào làm việc trên đó thì thôi xong
- Bạn muốn có 1 codebase viết bằng typescript, một codebase viết js, một feature được build bằng React, feature khác được build Vue. Nếu bạn có thắc mắc tại sao lại có nhu cầu này? Câu trả lời là vì bạn ko ràng buộc team vào một technical nào cả, team có thể tự quyết định
- Nâng cấp từng project sẽ dễ hơn nhiều

## Micro frontend là cái gì

Đây là cách tiếp cận cũng _na ná_ như microservice, thay vì 1, chúng ta có nhiều codebase, và trên từng codebase chỉ quản lý một tính năng cụ thể mà thôi.

Có thể xem một ứng dụng web là một bộ kết hợp của nhiều tính năng, mỗi một tính năng như vậy được quản lý bởi một team

![A flow diagram showing 3         independent deployment pipelines for 3 different micro frontends, which         are then composed into a single app after deployment](https://microfrontends.com/img/deployment.png)

Thuật ngữ này được giới thiệu lần đầu vào 2016 bởi [Thourghtworks Tech Radar](https://www.thoughtworks.com/radar/techniques/micro-frontends)

> An architectural style where independently deliverable frontend applications are composed into a greater whole

![Micro frontends on the ThoughtWorks tech radar](https://microfrontends.com/img/radar.png)

Một cách trực quan hơn bạn có thể tham khảo hình sau

![A wireframe of an example website,         showing a container application that embeds a micro frontend within it](https://microfrontends.com/img/composition.png)

Còn đây là demo của trang microfrontends.com [https://demo.microfrontends.com/](https://demo.microfrontends.com/)

## Hiện thực hóa như thế nào

Để có thể hiện thực hóa hoàn chỉnh micro frontend sẽ bao gồm rất nhiều thứ, ở đây chỉ tóm tắt một số vấn đề cơ bản cần giải quyết

#### Tương tác giữa các ứng dụng

Một câu hỏi được đặt ra đầu tiên là nếu tách ra thành nhiều bộ source như vậy, làm sao chúng có thể nói chuyện được với nhau? Một cách tổng quát, **nên hạn chế việc trao đổi thông tin qua lại ít chừng nào tốt chừng đó**, bởi vì nếu bạn làm ngược lại, nghĩa là bạn đang lặp lại vấn đề chúng ta muốn giải quyết ngay từ đâu: **decoupling** các tính năng với nhau.

Nhưng việc trao đổi giữa các ứng dụng với nhau là không tránh khỏi và cần thiết, chúng ta chỉ tiết chế chứ không loại bỏ hết, [Custom event](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) là một cách, cách khác, lấy mô hình truyền callback và data từ trên xuống trong React để làm **kênh** trao đổi thông tin, làm như thế nó sẽ rất tường minh, cách thứ 3 là thông qua thanh đường dẫn trên trình duyệt, chút nữa nói kỹ hơn.

Tựa chung, chúng ta không share state, mà chỉ share dữ liệu trong database như microservice.

#### Thư viện component dùng chung

Nó chung, ý tưởng **re-use** lại những component UI không có gì mới, nghe cũng rất hợp lý, mặc dù ai cũng biết việc đó khó làm.

Sai lầm thường thấy là việc tạo các component như vậy quá sớm, việc _hào hứng_ quá mức vào xây dựng một Framework UI chuẩn không cần chỉnh, viết một lần xài mãi mãi, thống nhất giao diện trên mọi mặt trận là điều thường thấy ở mọi team. Tuy nhiên, trong thực tế, kinh nghiệm cho biết rằng việc đó rất khó, nếu không muốn nói là không thể, không thể ngồi nghĩ ra một bộ Framework với tất cả các API cần thiết rồi đưa cho tất cả các team xài, chắc gì API đó đã đáp ứng đúng nhu cầu cho tất cả các team? Lời khuyên là các team cứ tạo ra những component riêng trong codebase nếu họ thấy cần, dù cho nó có bị duplicate đây nữa cũng chẳng sao. Và khi đã chín mùi, những API nào cần thiết sẽ hiện nguyên hình, chúng ta đưa những cho đang bị duplicate vào trong thư viện dùng chung.

Tất nhiên cũng có những ngoại lệ, những component mà nhìn vào chúng ta biết ngay là cần đưa vào share component, như icon, label, button, autocomplete, drop-down, search, table. Và nhớ là chỉ đưa đúng UI logic, đừng đưa bất kỳ business logic và domain logic vào đây. Ví dụ như một component `ProductTable` cho riêng cái domain Product là không nên, chỉ nên làm một cái component `Table`.

Thoạt nghe làm một share component có vẻ đơn giản, nhưng nó lại là công việc đòi hỏi kỹ thuật phải rất cứng tay, và người có nhúng tay vào tất cả các team.

#### Styling

Styling 2020 là một câu chuyện dài, như mình đã kể trong một [bài viết](https://vuilaptrinh.com/2020-05-22-cam-giac-viet-css-nam-2020/), tựa chung mà nói bạn có thể dùng BEM, dùng SASS, dùng CSS module, dùng CSS-in-JS, dùng Styled Component, dùng Tailwind, kiểu gì cũng được, miễn đảm bảo được style không chồng chéo lên nhau, thằng nào độc lập thằng đó, và tự tin đoạn code nó sẽ chạy như **đúng như lường trước**.

#### Các cách để integrate

Để hiện thực hóa ý tưởng của micro frontend, cũng có nhiều cách làm, cách nào cũng có đánh đổi. Tựu chung, nếu xét theo hướng giao diện, chúng ta có thể tổ chức nó theo dạng một ứng dụng dạng **container**, bao gồm những thành phần chung như _header_, _menu_, và các _micro frontend_ sẽ nhúng vào phần **ruột** của trang

![A web page with boxes drawn around different sections. One box wraps the whole page, labelling it as the 'container application'. Another box wraps the main content (but not the global page title and navigation), labelling it as the 'browse micro frontend'](https://martinfowler.com/articles/micro-frontends/composition.png)

##### Cách 1: composition dùng server side template

Với một cách _không chính thống lắm_ cho việc phát triển code FE, chúng ta render HTML ở phía server, với nhiều bộ template khác nhau. Chúng ta có một file `index.html` với các phần tử chung, server sẽ quyết định phần _ruột_ trả về cho từng trang

```html
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>Feed me</title>
  </head>
  <body>
    <h1>🍽 Feed me</h1>
    <!--# include file="$PAGE.html" -->
  </body>
</html>
```

Ở ví dụ này đang dùng với Nginx, biến `$PAGE` sẽ ứng với URL đang được request

```nginx
server {
    listen 8080;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;
    ssi on;

    # Redirect / đến /browse
    rewrite ^/$ http://localhost:8080/browse redirect;

    # Dùng HTML nào để insert dựa vào URL
    location /browse {
      set $PAGE 'browse';
    }
    location /order {
      set $PAGE 'order';
    }
    location /profile {
      set $PAGE 'profile'
    }

    # Cho phép render ở index.html
    error_page 404 /index.html;
}
```

Kỹ thuật này mình không nắm lắm, nên cũng chỉ để đây cho các bạn tham khảo, trong thực tế mình gặp và làm việc với những cách làm bên dưới nhiều hơn.

#### Integrate lúc build

Cách này sẽ publish cái micro frontend ở dạng package, container sẽ khai báo những micro frontend này ở dạng dependency. File `package.json` nó sẽ trông như thế này:

```json
{
  "name": "@feed-me/container",
  "version": "1.0.0",
  "description": "A food delivery web app",
  "dependencies": {
    "@feed-me/browse-restaurants": "^1.2.3",
    "@feed-me/order-food": "^4.5.6",
    "@feed-me/user-profile": "^7.8.9"
  }
}
```

Thoạt nhìn, cũng khá hợp lý, tuy nhiên nếu để ý, bạn sẽ thấy chúng ta phải re-compile và release trên từng cục dependency, rồi sao đó lại phải release tiếp container. Đây vẫn không phải là cách làm được khuyến khích.

##### Integrate lúc run-time bằng iframe

Đây cũng là cách mà dự án mình đang dùng, một cách tiếp cận đơn giản nhất để compose nhiều ứng dụng với nhau trong trình duyệt đã có từ rất rất lâu. Lợi ích có thể kể thêm của cách làm này là phần styling và biến global đều độc lập và không bị đụng độ lẫn nhau

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <iframe id="micro-frontend-container"></iframe>

    <script type="text/javascript">
      const microFrontendsByRoute = {
        '/': 'https://browse.example.com/index.html',
        '/order-food': 'https://order.example.com/index.html',
        '/user-profile': 'https://profile.example.com/index.html'
      };

      const iframe = document.getElementById('micro-frontend-container');
      iframe.src = microFrontendsByRoute[window.location.pathname];
    </script>
  </body>
</html>
```

Nhược điểm của cách này là việc tích hợp giữa các phần của ứng dụng, như route, history, deep-link sẽ rất phức tạp, responsive cũng sẽ gặp nhiều vấn đề cần xử lý hơn.

#### Integrate lúc run-time bằng JavaScript

Đây là cách linh hoạt nhất, và được nhiều team chọn làm. Mỗi một micro frontend sẽ được nhét vào trong trang bằng thẻ `<script />`. Container sẽ làm nhiệm vụ cho mount micro frontend nào và thực thi các hàm liên quan để báo cho các micro frontend sẽ render ở đâu và khi nào.

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <!-- Nó không render bất cứ gì cả -->
    <!-- Nó sẽ đưa vào hàm entry-point vào `window` -->
    <script src="https://browse.example.com/bundle.js"></script>
    <script src="https://order.example.com/bundle.js"></script>
    <script src="https://profile.example.com/bundle.js"></script>

    <div id="micro-frontend-root"></div>

    <script type="text/javascript">
      // Những global function này được nhét vào window bằng các đoạn script include ở trên
      const microFrontendsByRoute = {
        '/': window.renderBrowseRestaurants,
        '/order-food': window.renderOrderFood,
        '/user-profile': window.renderUserProfile
      };
      const renderFunction = microFrontendsByRoute[window.location.pathname];

      // Sau khi đã có các hàm cần thiết,
      // đưa id của element sẽ dùng để render
      renderFunction('micro-frontend-root');
    </script>
  </body>
</html>
```

Trên đây chỉ là ví dụ cơ bản nhất để mô tả kỹ thuật sẽ làm, thật tế có thể phải thêm thắt một số thứ khác. Không giống với cách integrate lúc build, `bundle.js` có thể được deploy một cách độc lập. Và khác iframe, chúng ta có thể linh động chọn lựa việc render micro frontend nào chúng ta thích.

Nếu có hứng thú với cách làm này, có thể tham khảo thêm [ví dụ chi tiết hơn](https://martinfowler.com/articles/micro-frontends.html#TheExampleInDetail)

#### Integrate lúc run-time bằng Web Component

Một lựa chọn khác cũng tương tự như cách làm trên, mỗi một micro frontend sẽ được link với element

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <!-- Chưa render gì cả -->
    <script src="https://browse.example.com/bundle.js"></script>
    <script src="https://order.example.com/bundle.js"></script>
    <script src="https://profile.example.com/bundle.js"></script>

    <div id="micro-frontend-root"></div>

    <script type="text/javascript">
      // Những element type này được định nghĩa ở các script trên
      const webComponentsByRoute = {
        '/': 'micro-frontend-browse-restaurants',
        '/order-food': 'micro-frontend-order-food',
        '/user-profile': 'micro-frontend-user-profile'
      };
      const webComponentType = webComponentsByRoute[window.location.pathname];

      // Tạo instance và đưa vào document ứng với từng loại phù hợp
      const root = document.getElementById('micro-frontend-root');
      const webComponent = document.createElement(webComponentType);
      root.appendChild(webComponent);
    </script>
  </body>
</html>
```

Khác nhau duy nhất so với cách trên có lẽ chỉ là việc dùng _web component_ thay vì một interface chúng ta tự định nghĩa.

#### Trao đổi giữa Backend

Cái này chưa biết, không dám chém.

## Kết

Micro frontend có thể không lạ với một số người và khá mới với số còn lại, thực tế mà nói đã có rất nhiều dự án đang áp dụng kiến trúc này (dự án mình đang làm).

Cùng hy vọng với bài viết này bạn đã thấy công việc của những lập trình viên frontend không còn đơn thuần là việc làm sao cho trang web bay, lượn, responsive mượt mà, nếu bạn muốn tiến xa hơn, giới hạn là chân trời.

**Các bài viết đã tham khảo**

- https://martinfowler.com/articles/micro-frontends.html
- https://microfrontends.com/
- https://micro-frontends.org/
