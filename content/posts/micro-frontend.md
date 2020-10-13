Micro frontend tại sao và như thế nào

## Tại sao bạn cần biết đến Micro frontend

Vấn đề cần giải quyết:

- Ứng dụng càng lúc càng phình ra về quy mô, cũng như độ phức tạp
- **Một codebase FE** duy nhất mà muốn maintain thì chỉ có *gặp ác mộng hằng đêm*
- Bạn có nhiều team FE khác nhau, mỗi team chỉ làm việc chính trên một phần tính năng nào đó rất cụ thể, chỉ 1 codebase mà hơn 5 team vào làm việc trên đó thì thôi xong
- Bạn muốn có 1 codebase viết bằng typescript, một codebase viết js, một feature được build bằng React, feature khác được build Vue

## Micro frontend là cái gì

Đây là cách tiếp cận cũng *na ná* như micro service, thay vì 1, chúng ta có nhiều codebase, và trên từng codebase chỉ quản lý một tính năng cụ thể mà thôi.

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

####  Tương tác giữa các ứng dụng

Một câu hỏi được đặt ra đầu tiên là nếu tách ra thành nhiều bộ source như vậy, làm sao chúng có thể nói chuyện được với nhau? Một cách tổng quát, **nên hạn chế việc trao đổi thông tin qua lại ít chừng nào tốt chừng đó**, bởi vì nếu bạn làm ngược lại, nghĩa là bạn đang lặp lại vấn đề chúng ta muốn giải quyết ngay từ đâu: **decoupling** các tính năng với nhau.

Nhưng việc trao đổi giữa các ứng dụng với nhau là không tránh khỏi và cần thiết, chúng ta chỉ tiết chế chứ không loại bỏ hết, [Custom event](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) là một cách, cách khác, lấy mô hình truyền callback và data từ trên xuống trong React để làm **kênh** trao đổi thông tin, làm như thế nó sẽ rất tường minh, cách thứ 3 là thông qua thanh đường dẫn trên trình duyệt, chút nữa nói kỹ hơn.

Tựa chung, chúng ta không share state, mà chỉ share dữ liệu trong database  như microservice.

#### Thư viện component dùng chung

#### Styling

#### Các cách để integrate

Để hiện thực hóa ý tưởng của micro frontend, cũng có nhiều cách làm, cách nào cũng có đánh đổi. Tựu chung, nếu xét theo hướng giao diện, chúng ta có thể tổ chức nó theo dạng một ứng dụng dạng **container**, bao gồm những thành phần chung như *header*, *menu*, và các *micro frontend* sẽ nhúng vào phần **ruột** của trang

![A web page with boxes drawn around different sections. One box wraps the whole page, labelling it as the 'container application'. Another box wraps the main content (but not the global page title and navigation), labelling it as the 'browse micro frontend'](https://martinfowler.com/articles/micro-frontends/composition.png)

##### Cách 1: composition dùng server side template

Với một cách *không chính thống lắm* cho việc phát triển code FE, chúng ta render HTML ở phía server, với nhiều bộ template khác nhau. Chúng ta có một file `index.html` với các phần tử chung, server sẽ quyết định phần *ruột* trả về cho từng trang

```html
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Feed me</title>
  </head>
  <body>
    <h1>🍽 Feed me</h1>
    <!--# include file="$PAGE.html" -->
  </body>
</html>
```

Ở ví dụ này đang dùng với Ngĩn, biến `$PAGE` sẽ ứng với URL đang được request

```nginx
server {
    listen 8080;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;
    ssi on;

    # Redirect / to /browse
    rewrite ^/$ http://localhost:8080/browse redirect;

    # Decide which HTML fragment to insert based on the URL
    location /browse {
      set $PAGE 'browse';
    }
    location /order {
      set $PAGE 'order';
    }
    location /profile {
      set $PAGE 'profile'
    }

    # All locations should render through index.html
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
        '/user-profile': 'https://profile.example.com/index.html',
      };

      const iframe = document.getElementById('micro-frontend-container');
      iframe.src = microFrontendsByRoute[window.location.pathname];
    </script>
  </body>
</html>
```

Nhược điểm của cách này là việc tích hợp giữa các phần của ứng dụng, như route, history, deep-link sẽ rất phức tạp, responsive cũng là mà vấn đề phải quan tâm.