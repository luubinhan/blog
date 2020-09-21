---
slug: "/2018-10-21-huong-dan-dung-chrome-devtool-de-inspect-animation"
date: "2018-10-21"
title: "Hướng dẫn inspect animation với Chrome DevTools"
desc: "Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome", "animation"]
---

Ấn `Ctrl + Shift + I` để mở Chrome DevTools. Nhìn lên góc phải, chỗ có 3 dấu chấm, chọn vào **More tools** > **Animations**

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/activateInDevTools.png)

F5 lại trang để bắt đầu xem phân tích animation

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/afterRefresh.png)

Di chuyển nút tròn màu đỏ (gọi là playhead) trên timeline đến vị trí tương ứng với thời gian của animation

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/animationGraphs.png)

Mỗi element đang chạy animate sẽ được đại diện bằng một màu line khác nhau. Trên mỗi line này sẽ có các keyframe

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/calculateKeyframePercentage.png)

# Delay và Duration

2 thay đổi này sẽ update lại css trên tab **Styles**

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/delayAnimation.png)

Để thay đổi delay, rê chuột lên đường line đến khi nào nhìn thấy trỏ chuột chuyển thành hình bàn tay, kéo rê qua lại để thấy giá trị css được update

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/lengthenAnimation.png)

Tăng duration của animation, rê chuột lên trên keyframe cuối cùng đến khi thấy chuyển thành mũi tên 2 đầu, kéo rê qua lại để tăng hoặc giảm thời gian.

# Cubic bezier

Inspect đến element có animation, phía trước thuộc tính animation, có một ô vuông nhỏ màu tím, click vào để mở popup chỉnh cubic bezier.

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/openCurveEditor.png)

Có thể chọn theo preset có sẵn, hoặc dùng chuột kéo theo ý thích, sau đó copy lại css đã được thay đổi

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/curveEditorPanel.png)

# Xoay layer

Một tính năng cũng khá hay khác là visualize các layer được sử dụng, bao gồm tùy chọn xoay và xem trên nhiều góc độ để hiểu rõ hơn cách mọi thứ chạy

Để mở bảng Layer, vào **More Tools > Layers **

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/openLayers.png)

Dùng công cụ này để xoay các layer theo góc độ mong muốn

![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/rotateMode.png)
![Học cách sử dụng công cụ inspection animation trong Chrome DevTools rất hữu ích khi làm animate](https://cms-assets.tutsplus.com/uploads/users/53/posts/31505/image/rotatedLayers.png)


[https://webdesign.tutsplus.com/articles/quick-tip-chrome-animation-dev-tools--cms-31505](https://webdesign.tutsplus.com/articles/quick-tip-chrome-animation-dev-tools--cms-31505)

Đọc thêm [10 CSS3 Projects: UI and Layout](https://webdesign.tutsplus.com/courses/10-css3-projects-ui-and-layout)

[Cubic bezier](http://webdesign.tutsplus.com/courses/easing-in-to-cubic-bezier-functions)
