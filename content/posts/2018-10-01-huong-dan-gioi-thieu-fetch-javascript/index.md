---
slug: "/2018-10-01-huong-dan-gioi-thieu-fetch-javascript"
date: "2018-10-01"
title: "Giới thiệu fetch() của javascript"
desc: "Tạm biệt XMLHttpRequest và cách viết dài dòng, giờ đây ta đã có fetch API"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Viết một câu request network đơn giản với fetch](#viết-một-câu-request-network-đơn-giản-với-fetch)
- [Response Metadata](#response-metadata)
- [Response Types](#response-types)
- [Chuỗi Promise](#chuỗi-promise)
- [POST Request](#post-request)
- [Gởi thông tin xác thực với Fetch](#gởi-thông-tin-xác-thực-với-fetch)

<!-- /TOC -->

`fetch()` cho phép tạo một network request tương tự như XMLHttpRequest(XHR). Sự khác nhau chủ yếu là Fetch hoạt động theo **Promises**, cho phép viết gọn ràng, dễ nhớ hơn là XHR. API Fetch có trong `window.fetch()` từ Chrome 42, để sử dụng `fetch()` cho các version browser cũ hơn thì dùng [polyfill của Github](https://github.com/github/fetch)

# Viết một câu request network đơn giản với fetch

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

Response của câu `fetch()` là một đối tượng **Stream**, nghĩa là khi chúng ta gọi phương thức `json()`, một Promise được trả về, vì quá trình đọc stream sẽ diễn ra bất đồng bộ.

# Response Metadata

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

# Response Types

Khi chúng ta tạo một fetch request, response trả về sẽ chứa **response.type**, với một trong các giá trị **basic**, **cors**, **opaque**. Nó cho biết resource này đến từ đâu, cho chúng ta biết cách chúng ta nên *đối xử* với object trả về

![same origin](https://rootsec.info/wp-content/uploads/2017/07/same-origin-policy.jpg)

Nếu request lên cùng một **nguồn** (ứng dụng host trên server A gởi request lên API trên server A), response.type sẽ là `basic`, không có bất kỳ giới hạn việc xem các thông tin trên response.

Nếu request dạng **CORS**, type trả về `cors.cors`, lúc đó bên trong `header` chúng ta chỉ được phép truy cập đến `Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` và `Pragma`

Type `opaque` cho các request tạo ra khác **nguồn**, và thằng API nó không chấp nhận dạng request **CORS**, nghĩa là không trả về dữ liệu, không xem được status của request.

Để khai báo 1 fetch request chỉ `resolve` khi thõa điều kiện **mode**

- `same-origin`: các request khác nguồn sẽ trả về `reject`
- `cors`: cho phép khác nguồn nếu header trả về cũng là CORs
- `cors-with-forced-preflight` luôn thực hiện kiểm tra [preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests). Trước khi gởi đi, để đảm bảo có an toàn trước, tạo một request dùng phương thức OPTIONS để kiểm tra độ an toàn
- `no-cors` tạo một request không cùng nguồn, không trả về CORS

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

# Chuỗi Promise

Một trong những tính năng hay (**và sinh ra rắc rối**) của Promise là cho phép mốc các Promise theo dạng chuỗi.

Khi làm việc với JSON API, chúng ta quan tâm đến `status` và `parse` JSON trả về trên mỗi kết quả trả về, để đơn giản hóa, đưa phần xử lý kiểm tra status và parse này ra hàm riêng. Chúng ta chỉ lo xử lý kết quả cuối cùng và trường hợp có lỗi

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
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8
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

# Gởi thông tin xác thực với Fetch

Để gởi kèm thông tin xác thực (user là ai), như cookie, chúng ta truyền tham số `credentials: include`

```js
fetch(url, {
  credentials: 'include'
})
```

[Link bài viết gốc](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)