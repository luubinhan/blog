---
slug: "/2018-10-16-huong-dan-progressive-web-app-cho-nguoi-moi-bat-dau"
date: "2018-10-16"
title: "Dựng Progressive Web App đầu tiên của bạn"
desc: "Cùng mình đú trend, dựng một Progressive Web App theo chỉ dẫn của Google"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["pwa", "mobile-web-specialist"]
---

<!-- TOC -->

- [1. Giới thiệu](#1-giới-thiệu)
- [2. Bắt đầu](#2-bắt-đầu)
- [3.Phương pháp App Shell](#3phương-pháp-app-shell)
- [4. Implement App Shell](#4-implement-app-shell)
- [5. Lần load đầu tiên](#5-lần-load-đầu-tiên)
- [6. Sử dụng Service Worker để pre-cache](#6-sử-dụng-service-worker-để-pre-cache)
  - [Đăng ký Service worker](#đăng-ký-service-worker)
  - [Cache site asset](#cache-site-asset)
  - [Đưa app shell vào cache](#đưa-app-shell-vào-cache)
- [7. Sử dụng service worker để cache dữ liệu forecast](#7-sử-dụng-service-worker-để-cache-dữ-liệu-forecast)
  - [Tương quan giữa network request và cache](#tương-quan-giữa-network-request-và-cache)
  - [Gửi request](#gửi-request)
- [8. Hỗ trợ các tương tác native](#8-hỗ-trợ-các-tương-tác-native)
  - [Quảng cáo cài đặt Web App và Add to Homescreen trên Chrome cho mobile](#quảng-cáo-cài-đặt-web-app-và-add-to-homescreen-trên-chrome-cho-mobile)
- [9. Deploy và tổ chức ăn mừng](#9-deploy-và-tổ-chức-ăn-mừng)
- [10. Đọc thêm](#10-đọc-thêm)

<!-- /TOC -->

# 1. Giới thiệu

Trong lúc dựng một Progressive Web App, chúng ta cần nhớ những điều sau

- Không quan trọng user đang dùng trình duyệt gì
- Hỗ trợ tốt trên nhiều loại thiết bị desktop, mobile, tablet
- Sử dụng service worker để có thể làm việc offline hoặc khi mạng chậm
- Như một ứng dụng thực thụ, cung cấp không chỉ nội dung mà cả tính năng
- Luôn cập nhập mới nhất
- Host thông qua HTTPS để đảm bảo an toàn
- Cho phép các công cụ tìm kiếm chạy index
- Cho phép user cài đặt như một ứng dụng hiển thị trang chủ, menu chính
- Dễ dàng chia sẻ bằng URL

Chúng ta sẽ đi qua từng bước một để làm một progressive web app, bao gồm cân nhắc thiết kế, implement chi tiết, đảm bảo ứng dụng chúng ta đáp ứng các nguyên tắc trên

![Ứng dụng thông báo thời tiết.](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/166c3b4982e4a0ad.png)

Chúng ta sẽ tìm hiểu các vấn đề

- Cách thiết kế sử dụng phương pháp "app shell"
- Làm thế nào để chạy offline
- Lưu dữ liệu để sử dụng offline

Bạn cần gì để follow tuts này

- Phiên bản mới nhất của Chrome
- [Web Server](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) cho Chrome
- Download [Source code ví dụ](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)
- Công cụ soạn thảo
- Kiến thức căn bản HTML/CSS/Javascript và Chrome DevTools

# 2. Bắt đầu

Download [Source Code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip), sau khi giải nén, bạn sẽ thấy các thư mục step-NN chứa source code tương ứng với từng bước của tuts, để bạn tham khảo, nên tự viết cho nhớ nhé. Chúng ta làm việc chủ yếu trong thư mục work

Cài Web Server For Chrome từ Chrome Web Store

Click vào nút `Apps` trên thanh bookmarks

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/9efdf0d1258b78e4.png)

Trên cửa sổ mới click icon Web Server

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/dc07bbc9fcfe7c5b.png)

Hộp thoại config sau sẽ xuất hiện

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/433870360ad308d4.png)

Click **Choose folder**, trỏ đến thư mục work

Bên dưới mục Options, check vào nút "Automatically show index.html"

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/39b4e0371e9703e6.png)

Sau đó click **Stop** rồi **restart** server

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/daefd30e8a290df5.png)

Click vào Web Server URL để truy cập site

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/aa64e93e8151b642.png)

Nếu bạn thấy icon spinner thì bạn đã thành công

# 3.Phương pháp App Shell

App Shell bao gồm HTML/CSS/Javascript **cần thiết nhất** để đảm bảo ứng dụng hoạt động. First load phải nhanh và được cache ngay lập tức. Những lần truy cập sau, những shell file này sẽ được load từ máy của user

![Phương pháp App Shell](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/156b5e3cc8373d55.png)

Phương pháp App Shell tách phần core của ứng dụng, UI và data. Những phần UI và infrastructure được cache ở local sử dụng service worker, như vậy lần sau nó chỉ cần gọi lên để lấy dữ liệu.

Service worker là script của trình duyệt chạy nền, tách biệt với phần trang web, cho phép không cần web page hoặc giao diện tương tác người dùng.

Nói cách khác, app shell tương tự như phần code bundle của react.

**Tại sao sử dụng phương pháp App Shell**

Dễ thấy là nó có làm chúng ta feel like native app, load cực nhanh

**Thiết kế**

Chia ra thành các core component

- Phần nào cần hiển thị trên màn hình ngay lập tức
- Các UI nào là key của ứng dụng
- Những file nào khác cần thiết: hình, style

Với ứng dụng Thông báo thời tiết

- Header: title, add/refresh button
- Forecast card
- Dialog để thêm thành phố
- Loading indicator

![Tại sao sử dụng phương pháp App Shell](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/166c3b4982e4a0ad.png)

Với ứng dụng phức tạp hơn, chúng ta không nên load toàn bộ UI một lúc, lazy load khi cần đến

# 4. Implement App Shell

Ở đây chúng ta tập trung làm PWA, nên có thể dùng luôn phần code ví dụ

Copy toàn bộ file trong thư mục **step-04** vào work, tìm file `index.html`, bỏ comment chỗ đoạn script

F5 lại trang để thấy kết quả

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/166c3b4982e4a0ad.png)

Đây chỉ là dữ liệu giả, để test.

# 5. Lần load đầu tiên

PWA khi khởi chạy là phải thật nhanh, chúng cache các shell file để đạt được tốc độ đó.

Ở lần chạy đầu tiên nay chúng ta cũng gọi lên API để lấy dữ liệu, được viết trong hàm `initialWeatherForecast`, nếu thích bạn có thể đọc.

Với các lần load sau, chúng ta sẽ lưu lại danh sách thành phố user đã thêm, sử dụng `IndexedDB`, để đơn giản hơn với ví dụ này, chúng ta dùng `localStorage`, khi làm một app thực thụ nên tránh sử dụng vì đôi khi rất chậm trên một số thiết bị.

Toàn bộ source code trong **step-05**

# 6. Sử dụng Service Worker để pre-cache

Nếu chưa biết về Service Worker, đọc bài [Giới thiệu Service Worker](https://developers.google.com/web/fundamentals/primers/service-worker/), [Debugging Service Worker](http://goo.gl/jhXCBy)

Cách tính năng cung cấp bởi Service worker chỉ nên cân nhắc nó như là một phần cộng thêm, được thêm vào nếu trình duyệt có hỗ trợ.

> Service worker chỉ có khi trang chúng ta được truy cập qua HTTPS hoặc localhost

## Đăng ký Service worker

Chỉ 2 bước đơn giản

- Đăng ký file javascript như service worker với trình duyệt
- Tạo file javascript chứa service worker
- Trước tiên kiểm tra trình duyệt có hỗ trợ không

File app.js

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
}
```

## Cache site asset

Khi service worker đã được đăng ký, một event install được trigger khi lần đầu user truy cập trang. Bên trong event handler, chúng ta cache toàn bộ asset cần thiết

*Lưu ý* phần code ví dụ này này tuyệt đối không được sử dụng trên production, mục đích chỉ để bạn chạy thử

Tạo file `service-worker.js` bên trong thư mục gốc của ứng dụng

```js
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

Trước tiên chúng ta bật cache với `cache.open()`. Truyền vào tên để chúng ta quản lý version của cache, đồng thời tách riêng phần dữ liệu và asset, không để update thằng này mất thằng kia

Hàm `cache.addAll()` nhận vào một tập URL, gọi fetch lên server, đưa response xuống cache. Lưu ý hàm này nếu có một chỗ nào mà `fetch` không được thì toàn bộ cache **fail**

Giờ làm quen với debug Service Worker trên DevTools của Chrome, mở tab **Application**, chọn **Service workers**

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/ed4633f91ec1389f.png)

Nếu trốn trơn là không có service worker nào được đăng ký. Chép hết file từ step-06 vào **work**, F5 để cập nhập.

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/bf15c2f18d7f945c.png)

Toàn bộ service worker được đăng ký của tất cả các trang cũng sẽ liệt kê ở đây.

Cuối cùng, đưa toàn bộ file muốn cache vào biến `filesToCache`

```js
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];
```

## Đưa app shell vào cache

Việc chúng ta lựa chọn phần nào để cache với service worker là do chúng ta quyết định

Ví dụ ta có thể can thiệp vào quá trình `fetch`

```js
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
```

`caches.match()` sẽ so sánh giá trị trong cache với request, truyền lại kết quả này cho e.respondWith()

```js
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

Yup! Đến đây Web App đã chạy được offline

Mở **Cache storage** trên tab application để thấy các file được cache

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/ab9c361527825fac.png)

Quay lại chỗ **Service workers** để chạy thử offline

![Chạy thử offline](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/7656372ff6c6a0f7.png)

Tại sao lúc nãy mình nói không nên lấy code này chạy production, vì nó chưa xử lý hết các tình huống có thể xảy ra, App của bạn chạy sẽ không đúng. Có thể sử dụng [Workbox](https://developers.google.com/web/tools/workbox/) để thực hiện một số xử lý cần thiết.


# 7. Sử dụng service worker để cache dữ liệu forecast

Lựa chọn một [phương pháp cache](https://jakearchibald.com/2014/offline-cookbook/) dữ liệu là yếu tố sống còn, tùy thuộc vào loại dữ liệu mà ứng dụng làm việc trên đó.

Với ví dụ này, thông tin thời tiết là quan trọng nhất, các dữ liệu như avatar, nội dung bài viết sẽ không update thường xuyên.

## Tương quan giữa network request và cache

Chúng ta cần chỉnh sửa service worker để request lên weather API và lưu response trong cache. Với cách tiếp cận cache-then-network, response từ network sẽ là "ngọn nguồn chân lý", luôn xem nó là thông tin mới nhất chúng ta sẽ sử dụng. Nếu fail cũng không sao, chúng ta sử dụng cache trong trường hợp đó

Thêm đoạn code sau vào file `service-worker.js`

```js
var dataCacheName = 'weatherData-v1';
```

Update lại activate để nó không xoá dữ liệu cache khi update lại app shell

```js
if (key !== cacheName && key !== dataCacheName) { }
```

Cuối cùng, update `fetch` request để nó riêng biệt với các phần khác

```js
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

## Gửi request

App cần gửi đi 2 request async, 1 để cache, 2 là request network. Object cache có thể không phải lúc nào cũng có trên mọi trình duyệt, trong trường hợp đó request network vẫn phải hoạt động

Bên trong hàm `app.getForecast()`

```js
if ('caches' in window) {
  /*
    * Check if the service worker has already cached this city's weather
    * data. If the service worker has the data, then display the cached
    * data while the app fetches the latest data.
    */
  caches.match(url).then(function(response) {
    if (response) {
      response.json().then(function updateFromCache(json) {
        var results = json.query.results;
        results.key = key;
        results.label = label;
        results.created = json.query.created;
        app.updateForecastCard(results);
      });
    }
  });
}
```

Mỗi thành phố sẽ được lưu cache ở một mục riêng biệt

![Dựng Progressive Web App đầu tiên của bạn](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/cf095c2153306fa7.png)

# 8. Hỗ trợ các tương tác native

Không ai thích phải gõ một đường dẫn dài ngoằng trên bàn phím điện thoại. Với tính năng **Add To Home** của trình duyệt điện thoại, user có thể truy cập đến trang web như một ứng dụng được cài đặt

## Quảng cáo cài đặt Web App và Add to Homescreen trên Chrome cho mobile

Chrome xử lý phần lớn, chúng ta setup rất đơn giản, thêm file `manifest.json` cung cấp chi tiết thông tin về app

Tạo file manifest.json trong thư mục work

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

Cập nhập lại bên trong thẻ `<head>`

```html
<link rel="manifest" href="/manifest.json">

<!-- Add to home screen for Safari on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="images/icons/icon-152x152.png">

<meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
<meta name="msapplication-TileColor" content="#2F3BA2">
```

# 9. Deploy và tổ chức ăn mừng

Bước cuối cùng là chúng ta sẽ deploy cái app thời tiết này lên server hỗ trợ HTTPS, nếu chưa có thì dùng cái của Firebase

# 10. Đọc thêm

- Hướng dẫn nhanh cách deploy lên Firebase

- PageSpeed Insight Rule

[https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)