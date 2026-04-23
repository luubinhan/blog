---
slug: "/2018-10-18-huong-dan-dung-chrome-dev-tool-de-kiem-tra-contrast"
date: "2018-10-18"
title: "Hướng dẫn sử dụng công cụ để check contrast trong Chrome"
desc: "Tip siêu ngắn để kiểm tra contrast có hợp nhãn với Chrome không"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["chrome", "ux-ui"]
---

Trước đây mình thường sử dụng những trang online để check như 

- [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
- [https://contrastchecker.com/](https://contrastchecker.com/)
- [https://snook.ca/technical/colour_contrast](https://snook.ca/technical/colour_contrast/colour.html#fg=33FF33,bg=333333)
- [https://contrast-ratio.com/](https://contrast-ratio.com/)

Giờ có trong Chrome chúng ta làm như sau

- Inspect đến element có thuộc tính màu muốn check

- Click vào ô màu kế bên giá trị

![Hướng dẫn sử dụng công cụ để check contrast trong Chrome](https://cms-assets.tutsplus.com/uploads/users/53/posts/31504/image/opencolorpicker.png)

Trên đó sẽ có thêm một thông tin là contrast ratio, và dấu thông báo giá trị contrast này ok chưa

![Hướng dẫn sử dụng công cụ để check contrast trong Chrome](https://cms-assets.tutsplus.com/uploads/users/53/posts/31504/image/contrastratioreadout.png)

Click vào nút **Show more** ngay cuối ô check contrast

![Hướng dẫn sử dụng công cụ để check contrast trong Chrome](https://cms-assets.tutsplus.com/uploads/users/53/posts/31504/image/showmore.png)

Phía trên bảng chọn màu, để ý đường line cong ở giữa, nó cho biết các giá trị bên trên đường line là không phù hợp, ở dưới là đạt tiêu chí contrast phù hợp

![Hướng dẫn sử dụng công cụ để check contrast trong Chrome](https://cms-assets.tutsplus.com/uploads/users/53/posts/31504/image/lowerrating.png)
