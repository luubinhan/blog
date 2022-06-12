---
slug: "/2022-06-12-chen-youtube-video-responsive"
date: "2022-06-12"
title: "Chèn Youtube Video responsive"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "thu-thuat"]
---

Khi nhúng video youtube bằng iframe, chúng ta phải đảm bảo kích thước iframe phải theo đúng tỷ lệ, nếu không nó sẽ xuất hiện viền đen phía trên và dưới video

Để hiển thị tốt trên nhiều thiết bị khác nhau (responsive) chúng ta phải đưa kích thước chiều ngang về 100%

```html
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/...." frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

Để chiều cao tự động co giản theo chiều ngang, vì tỷ lệ ngang/dọc của youtube video là không đổi, height luôn = **56.25%** width

```css
.video-container {
    overflow: hidden;
    position: relative;
    width: 100%;
}

.video-container::after {
	/* tương ứng với độ cao video, tỷ lệ 16:9 */
    padding-top: 56.25%;
    display: block;
    content: '';
}

/* scale video theo div bọc ngoài */
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

Nếu video hiển thị ở tỷ lệ 4:3, chúng ta sẽ cần set giá trị padding **75%**