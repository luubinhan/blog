---
path: "/2018-04-27-google-maps-va-react"
date: "2018-04-27T13:35:13.234Z"
title: "Google Maps và React"
desc: "Hướng Sử dụng google maps api trong React"
tags: ["javascript", "react"]
---


Nhúng Google Maps vào web site bình thường thì quá sức đơn giản, để sử dụng với React Js thì hơi vụng công một chút.

Để sử dụng Google Maps API, ta chỉ cần load đoạn js từ googleapis, chèn thêm một cái `div` với id là gì *map* chằng hạn.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Basic Google Map on a web page</title>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&"></script>
  </body>
</html>

```

Đoạn script của google sẽ được load **sau khi** có static DOM, cái `<div id='map' />` lúc đó đã tồn tại và có thể được sử dụng thoải mái bởi google maps api.

Nhưng mà trong React JS thì DOM được render và re-render từ **virtual DOM**, một file html của app React JS thường là chỉ có thế này

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple React app</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="js/app.js"></script>
  </body>
</html>
```

Tức là nếu làm như cách bình thường ở trên thì cái `<div id='map' />` chưa hề tồn tại trên xã hội.

## Load bất đồng bộ (Asynchronous Loading)

Cả hai đoạn script React và Google maps đều phải tốn thời gian để load, chúng ta phải đảm bảo Google Map chỉ được tạo ra **sau khi** React app đã khởi tạo và render DOM xong. Thoạt nhìn thì dùng asyn google map sẽ là một giải pháp.

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        async defer></script>
```

Chúng ta thêm `asyn` và `defer` để load đoạn googleapis này sau cùng, đồng thời thêm hàm callback sau khi load xong. Nếu `initMap` là một global function thì ta có thể gọi nó bên trong React Component

```jsx
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), { ... });
}
```

Buồn thay! Không chạy đâu các bạn ạ. Ngay cả khi Google Maps chỉ được load sau khi React được load, không có nghĩa là toàn bộ cây DOM đã được mount và render khi thực thi hàm callback.

Ok, chúng ta cần giải pháp tốt hơn. Về cơ bản chúng ta muốn load đoạn script của google ngay khi component có sử dụng đến google api được **mounted**


```jsx
componentDidMount {
    // trỏ global function window.initMap này vào hàm initMap của component để thằng google có thể  gọi trong hàm callback
    window.initMap = this.initMap;

    // chèn ngay đoạn js của googleapis cho anh xài ngay.
    loadJS('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap')
}

initMap = () => {
    map = new google.maps.Map(this.refs.map.getDOMNode(), { /* các options khác*/});
}

render {
    return (
        <div>
            <div ref="map" style="height: '500px', width: '500px'"><⁄div>
        <⁄div>
    );
}

// hàm này để chèn thêm <script /> sau khi gọi
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
```

Để ý là ta thêm `ref='map'` để trỏ tới đúng cái `div` sử dụng để đưa vào cho Google Map constructor bằng hàm `this.refs.map.getDOMNode()` ngay khi DOM đã render.

Vậy là xong. Google Map đã có thể hoạt động trơn tru với React Component, đúng hơn là với Virtual DOM.