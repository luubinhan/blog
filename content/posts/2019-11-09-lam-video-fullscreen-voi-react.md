---
slug: "/2019-11-09-lam-video-fullscreen-voi-react"
date: "2019-11-09"
title: "Gắn video làm background toàn màn hình"
desc: "Chia sẽ kỹ thuật làm background video để chạy full màn hình"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "javascript", "react", "css"]
---


Kết quả các bạn có thể xem trên trang mình mới làm 
[http://chat-production.com/](http://chat-production.com/)

Để có một cái video chạy toàn màn hình, chúng ta sẽ nghĩ ngay đến việc dùng thẻ `<video />` của HTML5, đặt nó trong một cái `<div/>` có kích thước `width: 100%`, buồn thay nó không đúng như chúng ta mong đợi.

```html
<!-- HTML -->
<div id="videoContainer">
  <video loop autoplay muted playsinline>
    <source src="/show-reel.mp4" type="video/mp4" />
  </video>
</div>
```

> Thêm `playsinline` để có thể chạy trên IOS như iPhone

```css
#container {
  overflow: hidden;
  height: 60vw;
  position: relative;
}
 
video {
  width: 100%;
  height: 100%;   
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
}
```


Thứ nhất là nó sẽ không tự scale ra 100% của màn hình, thứ 2 khi chúng ta kéo to thu nhỏ cửa sổ trình duyệt, tỷ lệ khung hình (ngang và đứng) cũng sẽ không đạt đúng tỉ lệ thật của video.


Để video có thể thay đổi kích thước theo từng giá trị màn hình khác nhau, chúng ta phải dùng đến javascript và css

```scss
#videoContainer {
  height: 100vh;
  overflow: hidden;
  position: relative;
  @media (max-width: 780px) {
    height: 60vw;
  }
  video {
    width: 100vw;
    position: absolute;
    /* canh video ngay giữa */
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
  }
}
```

Source này được lấy từ [https://codetheory.in/html5-fullscreen-background-video/](https://codetheory.in/html5-fullscreen-background-video/), mình sử dụng chung với React

```js
componentDidMount() {
  // JS
  var video = document.querySelector("video"),
    container = document.querySelector("#videoContainer");

  var setVideoDimensions = function() {
    var w = video.videoWidth,
      h = video.videoHeight;

    // Intrinsic Ratio
    // Will be more than 1 if W > H and less if W < H
    var videoRatio = (w / h).toFixed(2);

    // Get the container's computed styles
    //
    // Also calculate the min dimensions required (this will be
    // the container dimensions)
    var containerStyles = window.getComputedStyle(container),
      minW = parseInt(containerStyles.getPropertyValue("width")),
      minH = parseInt(containerStyles.getPropertyValue("height"));

    // What's the min:intrinsic dimensions
    //
    // The idea is to get which of the container dimension
    // has a higher value when compared with the equivalents
    // of the video. Imagine a 1200x700 container and
    // 1000x500 video. Then in order to find the right balance
    // and do minimum scaling, we have to find the dimension
    // with higher ratio.
    //
    // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
    // scale 500 to 700 and then calculate what should be the
    // right width. If we scale 1000 to 1200 then the height
    // will become 600 proportionately.
    var widthRatio = minW / w,
      heightRatio = minH / h;

    // Whichever ratio is more, the scaling
    // has to be done over that dimension
    let newWidth = 0;
    let newHeight = 0;
    if (widthRatio > heightRatio) {
      newWidth = minW;
      newHeight = Math.ceil(newWidth / videoRatio);
    } else {
      newHeight = minH;
      newWidth = Math.ceil(newHeight * videoRatio);
    }

    video.style.width = newWidth + "px";
    video.style.height = newHeight + "px";
  };

  video.addEventListener("loadedmetadata", setVideoDimensions, false);
  window.addEventListener("resize", setVideoDimensions, false);
}
```

Đoạn js trên để đảm bảo kích thước của video được scale ra hết khung hình và thay đổi cho phù hợp khi trình duyệt thay đổi kích thước

> Dùng 2 listener `loadedmetadata` trên video và `resize` trên window để chỉnh lại kích thước thẻ video

