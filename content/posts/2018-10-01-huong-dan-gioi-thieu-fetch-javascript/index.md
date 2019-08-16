---
slug: "/2018-10-01-huong-dan-gioi-thieu-fetch-javascript"
date: "2018-10-01"
title: "Giới thiệu fetch() của javascript"
desc: "Tạm biệt XMLHttpRequest và cách viết dài dòng, giờ đây ta đã có fetch API"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "mobile-web-specialist"]
---

<!-- TOC -->

- [Viết một câu request network đơn giản với fetch](#viết-một-câu-request-network-đơn-giản-với-fetch)
- [Response Metadata](#response-metadata)
- [Response Types](#response-types)
- [Chuỗi Promise](#chuỗi-promise)
- [POST Request](#post-request)
- [Gửi thông tin xác thực với Fetch](#gửi-thông-tin-xác-thực-với-fetch)
- [Upload file](#upload-file)
- [Upload nhiều file](#upload-nhiều-file)

<!-- /TOC -->

`fetch()` cho phép tạo một network request tương tự như XMLHttpRequest(XHR). Sự khác nhau chủ yếu là Fetch hoạt động theo **Promises**, cho phép viết gọn ràng, dễ nhớ hơn là XHR. API Fetch có trong `window.fetch()` giờ đã được hổ trợ phổ biến, bạn không cần polyfill gì đâu, vĩnh biệt IE.

# Mmột câu request network bằng `fetch`

```jsx
fetch('/api/some-url')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Lỗi, mã lỗi ' + response.status);
        return;
      }
      // parse response data
      response.json().then(data => {
        console.log(data);
      })
    }
  )
  .catch(err => {
    console.log('Error :-S', err)
  });
```

Response của câu `fetch()` là một đối tượng **Stream**, nghĩa là khi chúng ta gọi phương thức `json()`, một `Promise` được trả về, vì quá trình đọc stream sẽ diễn ra bất đồng bộ.

# Response MetaData

Bên cạnh các dữ liệu chúng ta có thể truy cập như trong ví dụ trên, chúng ta có thể truy cập đến các meta data khác

```js
fetch('/api/some-url')
  .then(response => {
    console.log(response.headers.get('Content-Type'));
    console.log(response.headers.get('Date'));

    console.log(response.status);
    console.log(response.statusText);
    console.log(response.type);
    console.log(response.url)
  })
```

# `response.type`

Khi chúng ta tạo một fetch request, response trả về sẽ chứa **response.type**, với một trong 3 giá trị: **basic**, **cors**, **opaque**. 

Nó cho biết resource này đến từ đâu, cho chúng ta biết cách chúng ta nên *đối xử* với object trả về

![same origin](https://rootsec.info/wp-content/uploads/2017/07/same-origin-policy.jpg)

- Nếu request lên cùng một **nhà** (ứng dụng host trên server A gửi request lên API trên server A), `response.type` sẽ là `basic`, không có bất kỳ giới hạn việc xem các thông tin trên response.

- Nếu request dạng **CORS**, nhà em ở Hồ Chí Mình, em quen bạn gái Hà Nội,  `type` trả về sẽ là `cors.cors`, lúc đó bên trong `header` chúng ta chỉ được phép truy cập đến `Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` và `Pragma`

- Type `opaque` cho các request tạo ra khác **nhà**, và thằng server nó không chấp nhận dạng request **CORS**, ba má cấm chú quen gái Hà Nội, nghĩa là không trả về dữ liệu, không xem được status của request, chia tay tình yêu.

Để khai báo 1 fetch request chỉ `resolve` khi thõa điều kiện **mode**

- `same-origin`: các request nhà kế bên sẽ trả về `reject`
- `cors`: cho phép nhà khác nếu header trả về cũng là cors
- `cors-with-forced-preflight` luôn thực hiện kiểm tra [preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests). Là trước khi gửi đi, để đảm bảo an toàn, tạo một request dùng phương thức OPTIONS để kiểm tra độ an toàn, (nhà anh có điều kiện ko mà đòi quen bạn gái tận Hà Nội xa xôi)
- `no-cors` tạo một request không *cùng nhà*, không trả về `CORS`

Để khai báo mode

```js
fetch('http://some-site.com/cors-enabled/some.json', {mode, 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    console.log('Request successful', text);
  })
  .catch(function(error) {
    log('Request failed', error)
  });
```

# Liên kết Promise

Một trong những tính năng hay (**và sinh ra rắc rối**) của Promise là cho phép mắc-xích-các-Promise lại với nhau.

Khi làm việc với JSON API, chúng ta quan tâm đến `status` và `parse` JSON trả về, để đơn giản hóa, đưa phần xử lý kiểm tra `status` và `parse` này ra hàm riêng. Chúng ta chỉ lo xử lý kết quả cuối cùng và trường hợp có lỗi

```js
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
function json(response) {
  return response.json()
}

fetch('')
  .then(status)
  .then(json)
  .then(data => {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function(error) {
    console.log('Request failed', error);
  });
```

# POST Request

Set giá trị `method` và `body` để tạo một POST request

```js
fetch(url, {
  method: 'POST',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  body: 'foo=bar&lorem=ipsum'
})
.then(json)
.then(data => {
  console.log('Request succeeded with JSON response', data);
})
.catch(error => {
  console.log('Request failed', error);
  });
})
```

Gửi lên dữ liệu dạng JSON

```js
var data = {username: 'example'};

fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data), 
  headers:{
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error))
```

# Gửi thông tin xác thực với Fetch

Để gửi kèm thông tin xác thực cookie (user là ai), chúng ta truyền tham số `credentials: include`

```js
fetch(url, {
  credentials: 'include'
})
```

Nếu muốn gửi credentials khi request URL là **cùng nhà***, truyền giá trị `same-origin`

```js
fetch(url, {
  crendentials: 'same-origin'
})
```

Không cho trình duyệt gửi thông tin xác thực, dùng `omit`

```js
fetch(url, {
  crendentials: 'omit'
})
```

# Upload file

Sử dụng cùng `<input type='file' />`, `FormData()`

```js
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.then(response => console.log('Success:', JSON.stringify(response)));
.catch(error => console.error('Error:', error))
```

# Upload nhiều file

```js
var formData = new FormData();
var photos = document.querySelector("input[type='file'][multiple]");

formData.append('title', 'My Vegas Vacation');
formData.append('photos', photos.files);

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
```

[Link bài viết gốc](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)

[Ví dụ tham khảo, chi tiết hơn về header, body, response object](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)