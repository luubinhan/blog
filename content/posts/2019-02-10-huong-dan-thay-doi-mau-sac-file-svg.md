---
slug: "/2019-02-10-huong-dan-thay-doi-mau-sac-file-svg"
date: "2019-02-10"
title: "Những cách thay đổi giá trị fill của SVG khi hover"
desc: "Chúng ta có thể định dạng file SVG một cách dễ dàng bằng CSS, chúng ta sẽ tận dụng CSS để thay đổi định dạng khi hover chuột lên. Tất cả những cách có thể làm sẽ được liệt kê trong bài viết này."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---


File SVG

```html
<svg class="icon">
    <path />
</svg>
```

## Thay đổi bằng giá trị `fill`

Cách dễ nhất, 1 dòng css duy nhất

```css
.icon:hover {
    fill: #DA4567;
}
```

Tuy nhiên cái này chỉ làm được khi chúng ta sử dụng file svg dạng *inline*, nếu dùng thẻ `<img src='duong-dan-file.svg''/>`, để tách riêng file svg ra cho nó sạch sẽ file html, cached lại hình này trên trình duyệt, thì coi như chúng ta không thực hiện được cách ở trên.

## CSS Filters

Với CSS filters chúng ta có trong tại kha khá đồ chơi **như trong photoshop** để *vẽ hoa vẽ lá* trên trình duyệt. Filter cũng sẽ được thực hiện sau khi trình duyệt render xong DOM, thực hiện xong bước paint (cái này các bạn phải xem lại critical render path để rõ hơn), nghĩa là nếu ko được hỗ trợ bởi trình duyệt thì cũng ko tới mức bể layout

- brightness(<number-percentage>);
- contrast(<number-percentage>);
- grayscale(<number-percentage>);
- invert(<number-percentage>);
- opacity(<number-percentage>);
- saturate(<number-percentage>);
- sepia(<number-percentage>);
- hue-rotate(<angle>);
- blur(<length>);
- drop-shadow(<length><color>);

Chúng ta ko có filter nào để thay đổi cụ thể một giá trị màu, chỉ có `hue-rotate` để **chỉnh nhẹ** cái màu đang hiển thị. May mắn là chúng ta có thể kết hợp nhiều giá trị filter cùng một lúc

```css
.icon:hover {
  filter: grayscale(100%) sepia(100%);
}
```

Nếu một trong số các filter ko được hỗ trợ, thì nó *nhẹ nhàng* cho qua, chứ ko bỏ hết thuộc tính filter. Nếu bạn dùng photoshop rồi, cũng hiểu là thứ tự áp dụng các filter sẽ ảnh hưởng đến kết quả cuối cùng.

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_891,f_auto,q_auto/v1548375654/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548178599920_ScreenShot2019-01-15at16.05.26_nfeayr.png)

Để sử dụng `hue-rotate` chúng ta phải dùng một ảnh SVG có màu, lẽ nào bạn dùng ảnh gốc trắng đen rồi css đổ màu vào được?

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_730,f_auto,q_auto/v1548375670/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548178627636_ScreenShot2019-01-16at10.20.53_ze2wh8.png)

Trước hết phải `invert()` cái hình xuống, chuyển thành dạng medium grey

```css
.icon:hover {
  filter: invert(0.5)
}
```

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548375770/svg-icon-filter-01_ovjce8.png)

Sau đó mới dùng `sepia()`

```css
.icon:hover {
  filter: invert(0.5) sepia(1);
}
```

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548375803/svg-icon-filter-02_rfpwow.png)

Tiếp đến là thêm màu sắc mình yêu thích

```css
.icon:hover {
  filter: invert(0.5) sepia(1) hue-rotate(200deg);                                  
}
```

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548376336/svg-icon-filter-05_b7hae1.png)

Tinh chỉnh một chút nữa

```css
.icon:hover {
  filter: 
    invert(0.5)
    sepia(1)
    hue-rotate(200deg)
    saturate(4)
    brightness(1);
}
```

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548375874/svg-icon-filter-04_v4mo9x.png)

Để dễ hình dung hơn, [dùng tool này của tác giả](https://codepen.io/cassie-codes/pen/561304e31eb955362b8d850d7eb7500e
), kéo thả thấy kết quả

Tuy nhiên đây cũng chỉ cho được kết quả là một màu tương đối, không chỉ định một màu cụ thể được

## SVG filters

Nếu cần hỗ trợ nhiều trình duyệt hơn, màu sắc cụ thể hơn, dùng đến SVG

Không giống với CSS, chúng ta phải *đổ mồ hôi sôi nước miếng* mới làm được

```html
<svg xmlns="<http://www.w3.org/2000/svg>" version="1.1">
  <defs>
    <filter id="id-of-your-filter">
      ...          
      ...
    </filter>
    ...
  </defs>
</svg>
```

Chúng ta định nghĩa bằng thẻ `<filter />`, thẻ này phải nằm trong thẻ `<defs/>`

Trong CSS chúng ta trỏ đến thằng filter ở trên như sau

```css
.icon:hover {
     filter: url('assets/your-SVG.svg#id-of-your-filter');
}
```

Những filter có thể sử dụng

- [<feBlend>]
- [<feColorMatrix>]
- [<feComponentTransfer>]
- [<feComposite>]
- [<feConvolveMatrix>]
- [<feDiffuseLighting>]
- [<feDisplacementMap>]
- [<feDropShadow>]
- [<feFlood>]
- [<feGaussianBlur>]
- [<feImage>]
- [<feMerge>]
- [<feMorphology>]
- [<feOffset>]
- [<feSpecularLighting>]
- [<feTile>]
- [<feTurbulence>]


Với yêu cầu đổi màu, chúng ta sẽ dùng `feColorMatrix`

```html
<svg xmlns="<http://www.w3.org/2000/svg>" version="1.1">
  <defs>
    <filter id="id-of-your-filter">
      <feColorMatrix
        color-interpolation-filters="sRGB"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 1 0 "/>
    </filter>
    ...
  </defs>
</svg>
```

Cùng xem xét kỹ hơn giá trị matrix chúng ta đã sử dụng ở trên

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_795,f_auto,q_auto/v1548375895/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548179549387_ScreenShot2019-01-16at18.17.32_n1bwdy.png)

Các cột giá trị tương ứng là red, green, blue, alpha và multiplier. Chúng ta sẽ ko quan tâm đến giá trị multiplier với nhu cầu đổi màu, chỉ cần 4 giá trị ở đầu.

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_762,f_auto,q_auto/v1548375908/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548179504680_ScreenShot2019-01-16at17.44.47_lin7vm.png)

Ví dụ chúng ta muốn set giá trị rgba(0,128,128,1), chuyển nó về giá trị ma trận theo cách tính

![Những cách thay đổi giá trị fill của SVG khi hover](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_816,f_auto,q_auto/v1548375925/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548179540671_ScreenShot2019-01-16at18.39.03_oe0itu.png)

> Lưu ý: SVG filter không thực hiện được trên hình nền đen, nên nếu đang là hình đen thì invert nó thành trắng trước khi thực hiện

```css
.icon:hover {
  filter: invert(100%) url('assets/your-SVG.svg#id-of-your-filter');
}
```

Tiếp tục [sử dụng công cụ] (https://codepen.io/cassie-codes/pen/46c5b9af3e9923138f950bcdd1dfc4af) **kéo thả thấy kết quả** của tác giả nếu bạn ko siêng làm toán **mẫu giáo**



<a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/the-many-ways-to-change-an-svg-fill-on-hover-and-when-to-use-them/
">The Many Ways to Change an SVG Fill on Hover (and When to Use Them)</a>