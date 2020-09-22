---
slug: "/2018-10-16-huong-dan-progressive-web-app-cho-nguoi-moi-bat-dau"
date: "2018-10-16"
title: "Làm Progressive Web App cho người mới"
desc: "Cùng mình đú trend, dựng một Progressive Web App theo chỉ dẫn của Google"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["pwa", "mobile-web-specialist"]
---

<!-- TOC -->

- [Giới thiệu](#gi%e1%bb%9bi-thi%e1%bb%87u)
- [Đánh giá bằng Lighthouse](#%c4%90%c3%a1nh-gi%c3%a1-b%e1%ba%b1ng-lighthouse)
- [Thêm web app manifest](#th%c3%aam-web-app-manifest)
- [Offline mức căn bản](#offline-m%e1%bb%a9c-c%c4%83n-b%e1%ba%a3n)
  - [Đăng ký service worker](#%c4%90%c4%83ng-k%c3%bd-service-worker)
  - [Xử lý network request bị fail](#x%e1%bb%ad-l%c3%bd-network-request-b%e1%bb%8b-fail)
- [Service worker life cycle](#service-worker-life-cycle)
  - [`install`](#install)
  - [`activate`](#activate)
  - [`fetch`](#fetch)
- [Offline mức cao cấp hơn một chút](#offline-m%e1%bb%a9c-cao-c%e1%ba%a5p-h%c6%a1n-m%e1%bb%99t-ch%c3%bat)
- [Thêm phần cài đặt](#th%c3%aam-ph%e1%ba%a7n-c%c3%a0i-%c4%91%e1%ba%b7t)

<!-- /TOC -->

## Giới thiệu

Trong lúc lầm Progressive Web App (PWA), chúng ta cần nhớ những điều sau

- Không quan trọng user đang dùng trình duyệt gì
- Hỗ trợ tốt trên nhiều loại thiết bị desktop, mobile, tablet bằng responsive
- Sử dụng service worker để có thể làm việc offline hoặc khi mạng chậm
- Có khả năng cài đặt, sử dụng web app manifest và sự kiện `beforeinstallprompt` để báo user biết có thể install

Ứng dụng sẽ thực hành là trang dự báo thời tiết

![Ứng dụng thông báo thời tiết.](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/95fe6f7fbeee5bb1.png)

Chúng ta sẽ tìm hiểu các vấn đề
Làm sao để tạo và thêm file web app manifest
Cung cấp một trải nghiệm cơ bản khi không có mạng
Làm sao để làm cho app có thể install
Bạn cần gì để follow tuts này
- Phiên bản mới nhất của Chrome
- Kiến thức căn bản HTML/CSS/Javascript và Chrome DevTools
- Đăng ký [Dark Sky API](https://darksky.net/dev) để có 1 API key, dữ liệu thời tiết sẽ do API này cung cấp

Sao khi đã có 1 API key, chúng ta có thể kiểm tra xem nó có hoạt động hay không bằng cách mở URL này trên trình duyệt

```
https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319
```

[Download Source code ví dụ](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

Vì chúng ta sử dụng Glitch để làm, nên không cần download bộ source về làm gì

1. Trước hết mở trang [https://glitch.com/](https://glitch.com/), đăng ký 1 tài khoản trên đây
2. Chọn **New Project**, sau đó chọn vào **Clone from Git Repo**
3. Paste đường dẫn `https://github.com/googlecodelabs/your-first-pwapp.git` vào trong hộp thoại popup rồi click OK
4. Sau khi repo đã được load về, mở file `.env` lên và điền vào API key đã đăng ký
5. Click vào nút **Show** > **In a new window** để xem kết quả, nó sẽ theo cấu trúc là <tên project>.glitch.me

## Đánh giá bằng Lighthouse

Trước tiên chúng ta đánh giá sơ bộ trang hiện tại bằng công cụ Lighthouse có sẵn của Chrome. Trên DevTool sẽ có một tab là Audit ở cuối. Nó sẽ cho kết quả đánh giá performance, accessibility, PWA và một số thứ linh tinh khác nữa

![Trước tiên chúng ta đánh giá sơ bộ trang hiện tại bằng công cụ Lighthouse có sẵn của Chrome.](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/b112675caafccef0.png)

Để chạy đánh giá
1. Mở DevTool lên, chọn vào **Audits** tab
2. Dùng tất cả các thiết đặt mặc định nếu ko có ý kiến gì khác
3. Click **Run audit**, đợi chút nó sẽ cho kết quả

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/af1a64a13725428e.png)

Chúng ta tập trung fix mấy cái bị báo đỏ

## Thêm web app manifest

Nó là một file JSON cho phép chúng ta config một số thứ khi xuất hiện trên thiết bị của user

- Mở cửa sổ mới hay không `display`
- Trang mặc định sẽ mở (nếu bạn không muốn là trang index) `start_url`
- Icon sẽ hiển thị `icons`
- Tên `short_name`
- Splash screen `name`, `icons`, `colors`
- Mở ngang hay dọc `orientation`
- Tạo một file `public/manifest.json` rồi copy nội dung sau vào đó

```js
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```
> Trình duyệt Chrome bắt buộc cung cấp ít nhất 2 icon kích thước 192x192px và 512x512px

Bổ sung file này vào trong `public.index.html`

```html
<link rel="manifest" href="/manifest.json">
```

Trên cửa sổ DevTools, chọn tab **Application** có thể kiểm tra file manifest đã load thành công chưa

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/c462743e1bc26958.png)

Trình duyệt Safari trên iOS chưa hỗ trợ file manifest này thì có thể bổ sung một số tag sau

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

Nếu cửa số Audit PWA có thông báo “Does not set an address-bar theme color”, chọn màu thanh address cho phù hợp với màu thương hiệu

```html
<meta name="theme-color" content="#2F3BA2" />
```

## Offline mức căn bản

Bạn có thể tắt mạng, sau đó mở trang google drive, bạn sẽ thấy vẫn xem được danh sách file, folder trong drive, tất nhiên không mở xem chỉnh sửa mấy file này được, nhưng vẫn đảm bảo có những trải nghiệm “không quá tệ”

> Service worker chỉ chạy trên trang web truy cập qua giao thức `https`

Những tính năng mà service worker cung cấp, câng nhắc nó như một dạng “nice-to-have”, đừng quá đặt nặng và xem service worker như đấng cứu thế, và cũng đừng chém xuyên lục địa về những tính năng siêu việt của service worker.

### Đăng ký service worker

public/index.html
```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service worker registered.', reg)
      })
  })
}
```

Service worker có `scope` (phạm vi hoạt động) theo vị trí file, nghĩa là nếu nhét nó vào file rồi đưa file này trong thư mục con `scripts` nó sẽ không can thiệp được gì những đoạn script nằm ngoài thư mục gốc, nếu đặt ở thư mục gốc, toàn bộ thư mục con sẽ kế thừa được service worker đăng ký ở thư mục gốc

Cache cái gì? Chúng ta có 1 file là `public/offline.html`, nếu không có mạng, chúng ta sẽ hiển thị file này, cache file này xuống trình duyệt là hợp lý.

[public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)
```js
const FILES_TO_CACHE = [
  '/offline.html',
]
``` 

Tiếp theo, trong sự kiện `install`, chúng ta đưa file này vào danh sách muốn cache

[public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)
```js
evt.waitUntil(
  caches.open(CACHE_NAME).then((cache) => {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll(FILES_TO_CACHE);
  })
)
```

> Toàn bộ các sự kiện của service worker sẽ được để cập ở phần sau

Mở DevTools, trên tab **Application**, chọn vào service worker để xem những đứa nào đã đăng ký thành công, như hình bên dưới chưa đăng ký gì cả

![Chưa đăng ký service worker nào cả](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/b3aa37b67863fd03.png)

Với đoạn code đăng ký thành công, chúng ta có danh sách các service worker đã đăng ký được, không chỉ một mà có thể đăng ký nhiều nhé

![Service worker đã đăng ký thành công](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/69808e4bf3aee41b.png)

Chổ **status**, cái nút tròn xanh xanh cho biết nó đang hoạt động, con số kế bên (34251) sẽ tự động tăng khi update service worker mới

Trên sự kiện `activate`, chúng ta sẽ thực hiện xóa các cache trước đó

[public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

Ấn F5 trên cửa sổ để refresh lại trang, con số bên cạnh status sẽ cho biết đã cập nhập mới

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/1db827d76bc0b359.png)

### Xử lý network request bị fail

Khi gọi `fetch`, service worker sẽ là thằng đứng giữa, nếu có mạng thì gọi lên server, còn không, thì gọi lại giá trị cache trước đó

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/6302ad4ba8460944.png)

[public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// thêm xử lý sự kiện fetch
if (evt.request.mode !== 'navigate') {
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

Nó giống như khái niệm middleware, incepter của axios vậy thôi.

> Đưa đoạn `fetch` vào bên trong `evt.respondWith()` sẽ chặn trình duyệt tự ý đi mà không nói với ai, chúng ta sẽ dùng người trung gian để đi nói chuyện với thế giới. Nếu không sử dụng `evt.respondWith()` thì cache trước đó sẽ chẳng có tác dụng vì hết.

Bên dưới của tab **Application**, sẽ cho biết những gì đã được cache lại bên dưới trình duyệt

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/c80a2a2e93c1c3ee.png)

Để giả lập tình trạng mất mạng, quay lại **Service workers**, click chọn vào checkbox **Offline**. F5 nếu thấy hình em gấu này là coi như thành công.

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/984b34dc2aa667a.png)

Trên cửa sổ **Service Workers** có một số option khác ngoài **Offline**
- **Update on reload** luôn luôn load lại service worker khi reload
- **Bypass for network** bỏ qua service worker, chạy như không có

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/c7ac93904f473a91.png)

Trên điện thoại có thể dùng chế độ máy bay để tắt mạng và xem trang web nó sẽ ra hình thù thế nào.

## Service worker life cycle

### `install`

Sự kiện này sẽ bắn ra khi worker chạy, và chỉ được tạo ra một lần cho mỗi service worker

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/72ed77b1720512da.png)

Thông thường nó được sử dụng để cache mọi thứ cho app

### `activate`

Sau khi `install`, mỗi lần nó khởi động nó sẽ bắn ra sự kiện `activate`, tức là bạn truy cập lại trang web đã vào trước đó. Được dùng để xóa cache trước đó

### `fetch`

Sự kiện này cho phép chúng ta can thiệp vào mọi network request, trước khi ra khỏi *nhà*, phải trình báo ở đây

Xem [các trường hợp sử dụng ở đây](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)

## Offline mức cao cấp hơn một chút

Ở trên chúng ta chỉ hiển một trang HTML, thông báo với user là mày đang offline, giờ chúng ta sẽ cho nó thấy cái như là có mạng luôn, giống như khi bạn vào Google Drive lúc ko có mạng đó.

Quay lại với ví dụ, app chúng ta sử dụng object `caches` bên trong `window`, tuy nhiên không phải browser nào cũng hỗ trợ `window.caches`, chúng ta sẽ update hàm `getForecastFromCache` để rơi vào tình huống đó, vẫn ko ảnh hưởng gì tới app

[public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)
```js
// kiểm tra trước khi thực hiện những việc tiếp theo
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

Sửa tiếp [updateData()](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196)
[public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)
```js
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

App sẽ gọi lấy dữ liệu từ 1 trong 2 hàm, thông qua cache hoặc `fetch` từ API. Với dữ liệu trả về, chúng ta sẽ xử lý để render lại giao diện nếu cần thiết

[public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)
```js
// nếu dữ liệu này đã mới rồi thì ko cần update làm gì
if (lastUpdated >= data.currently.time) {
  return;
}
```

Để App có *hình hài* lúc mất mạng như lúc có mạng, chúng ta phải cache lại toàn bộ những resource cần thiết khác, ngoài data get từ API

[public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)
```js
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

Vì danh sách mấy file này chúng ta thêm bằng tay, nếu sao này chúng ta thay đổi danh sách file này, phải sửa tay tên `CACHE_NAME`, ví dụ như từ  

```js
const CACHE_NAME = 'static-cache-v2';
// đổi khi thay đổi danh sách file muốn cache
const CACHE_NAME = 'static-cache-v3';
```

> Nếu chỉ sửa mỗi cái tên file cũng phải đổi lại tên cache thì quá tốn công, chưa kể phía user phải down lại toàn bộ resource. [Workbox](https://developers.google.com/web/tools/workbox/) do google phát triển sẽ giải quyết dùm chúng ta vấn đề này, trong quá trình build, chỉ những file nào đã thay đổi mới cần update phía người dùng

Để đảm bảo trong quá trình `activate`, nó ko vô tình xóa dữ liệu của chúng ta, bên trong hàm bắt sự kiện `activate`

public/service-worker.js
```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

Trong sự kiện `fetch` của service worker, chúng ta cũng thực hiện cập nhập, chúng ta luôn ưu tiên lấy data từ API trước, chỉ khi ko thể gọi được API, chúng ta mới lôi thằng cache ra xài

[public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)
```js
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // nếu lấy được data từ API, xài luôn và lưu xuống cache một bản
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // lỗi network thì đưa về cache
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

Chúng ta bỏ phần điều kiện `evt.request.mode !== 'navigate'` vì không chỉ muốn lấy cache cho network request, chúng ta muốn cache mọi thứ từ HTML, CSS, script, image,...

Giờ gần như chúng ta đã đưa hết những gì cần thiết xuống cache, kiểm tra xem kết quả trên DevTool đã cache thành công chưa nhé

![xem kết quả trên DevTool đã cache thành công chưa nhé](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/731e91776cb6ef18.png)

## Thêm phần cài đặt

App thì phải cài đặt được chứ, chúng ta sẽ thêm một nút cho phép user “Cài đặt” vào màn hình điện thoại luôn

![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/d824e1712e46a1cc.png)

User nào *thông minh* như mình thì sẽ biết cách vào menu của Chrome (hoặc Safari) rồi chọn **Add to Homescreen**, tuy nhiên đâu ai thông minh như mình đâu!

Thêm file `install.js`

[public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)
```html
<script src="/scripts/install.js"></script>
```

Điều kiện để user có thể cài đặt được
![Làm Progressive Web App cho người mới](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/img/b921f5583fcddf03.png)

Khi mấy điều kiện này đã có đủ, Chrome sẽ bắn ra sự kiện `beforeinstallprompt`, chúng ta nắm lấy sự kiện này 

[public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)
```js
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

Bên trong hàm `saveBeforeInstallPromptEvent` chúng ta cho hiện nút cài đặt, lưu tạm cái sự kiện `beforeinstallprompt` để dành xài

[public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)
```js
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

Khi user click vào nút **Install**, chúng ta gọi lại thằng `beforeinstallprompt.prompt()`, rồi ẩn nút này đi

[public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)
```js
deferredInstallPrompt.prompt();
evt.srcElement.setAttribute('hidden', true);
```

Cũng có thể bắt lấy lựa chọn mà user đã trả lời

[public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)
```js
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

Khi thêm vào màn hình chính thành công, hay gọi hoa mỹ là Cài đặt thành công, trình duyệt bắn tiếp một sự kiện khác, chúng ta có thể túm lấy sự kiện này và thông báo gì đó nếu thích

```js
window.addEventListener('appinstalled', logAppInstalled);
```

> Tips: để CSS riêng cho trường hợp web đang chạy dạng “App” như vậy ta dùng `display-mode`

Code đầy đủ nè

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```


<a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/">Your First Progressive Web App</a>