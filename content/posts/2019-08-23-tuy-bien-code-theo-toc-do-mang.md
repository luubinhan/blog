---
slug: "/2019-08-23-tuy-bien-code-theo-toc-do-mang"
date: "2019-08-23"
title: "Tùy biến code theo tốc độ mạng"
desc: "Responsive với CSS chúng ta tùy biến code bằng @media, vậy với JS, ta thêm các điều kiện theo tốc độ mạng bằng cách nào?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "thu-thuat"]
---

Responsive với CSS chúng ta tùy biến code bằng @media, vậy với JS, ta thêm các điều kiện theo tốc độ mạng bằng cách nào?

Chúng ta sẽ sử dụng API của trình duyệt `navigator.connection.effectiveType` để tối ưu theo tốc độ kết nối mạng của user

Các thông tin về mạng của user có thể lấy qua [navigator.connection](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection), trong đó có giá trị [effectiveType](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType) là một trong các giá trị 'slow-2g', '2g', '3g', '4g'

Chrome 62 trở về trước, chúng ta chỉ có giá trị `navigator.connection.type`, giá trị này không phải tốc độ mạng. Mặc dù `type` là wifi, nhưng lại là một wifi cùi mía, tốc độ ngang ngửa 2g, Chrome sau này có *phát minh* thêm giá trị `effectiveType`, tính theo tốc độ đi-về của cục dữ liệu cho chính xác.


![Đáp ứng theo tốc độ mạng](https://res.cloudinary.com/practicaldev/image/fetch/s--T54UF-7H--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/wqeuhx12frs3k126bmrv.png)

Còn trường hợp, trong nhà có thanh niên nào đó mở link down film Nhật, tốc độ mạng đang "như tia chớp", thì chuyển sang "cùi mía", biết được sự thay đổi này cần add thêm cái listener cho đối tượng `navigator.connection`


```js
function onConnectionChange () {
    const {
        rtt,
        downlink,
        effectiveType,
        saveData
    } = navigator.connection

    console.log(`Effective network connection type: ${effectiveType}`)
    console.log(`Downlink Speed/bandwidth estimate: ${downlink}Mb/s`)
    console.log(`Round-trip time estimate: ${rtt}ms`)
    console.log(`Data-saver mode on/requested: ${saveData}`)
}

navigator.connection.addEventListener('change', onConnectionChange)
```

Dùng Chrome DevTools để giả lập các tốc độ mạng khác nhau để test, chứ đừng down film để test tốc độ

![Đáp ứng theo tốc độ mạng](https://res.cloudinary.com/practicaldev/image/fetch/s--gdIz0VyD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/t9zadl65erjhll14zbcp.png)

Mấy trình duyệt xịn xịn như Chrome, Opera, Firefox là dùng được `navigator.connection` chứ không riêng gì Chrome

Dùng một regex để gom mấy kết quả *gờ gờ* là mạng chậm hết, 3g Việt Nam thì cũng như 2g thôi

```js
if (/\slow-2g|2g|3g/.test(navigator.connection.effectiveType)) {
  this.connection = "slow";
} else {
  this.connection = "fast";
}
```

Mình sử dụng Vue.js, không phải HTML thuần nên đừng thắc mắc sao có cái `v-if` nhé

```html
<template>
  <div id="home">
    <div v-if="connection === 'fast'">
      <!-- 1.3MB video -->
      <video class="theatre" autoplay muted playsinline control>
        <source src="/static/img/doodle-theatre.webm" type="video/webm">
        <source src="/static/img/doodle-theatre.mp4" type="video/mp4">
      </video>
    </div>
    <!-- 28KB image -->
    <div v-if="connection === 'slow'">
      <img class="theatre" src="/static/img/doodle-theatre-poster.jpg">
    </div>
  </div>
</template>
```

![Đáp ứng theo tốc độ mạng](https://res.cloudinary.com/practicaldev/image/fetch/s--_tvmKtK---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/8jukzhdu62nbghw0cfx3.png)

Nếu bạn viết React, có [bài này cũng hay](https://mxb.dev/blog/connection-aware-components/), nói về việc làm component đáp ứng theo tốc độ kết nối


<a target="_blank" rel="noopener noreferrer" href="https://dev.to/addyosmani/adaptive-serving-using-javascript-and-the-network-information-api-331p">📜 Adaptive Serving using JavaScript and the Network Information API</a>



