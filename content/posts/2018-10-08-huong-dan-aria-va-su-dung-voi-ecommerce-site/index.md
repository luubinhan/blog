---
slug: "/2018-10-08-huong-dan-aria-va-su-dung-voi-ecommerce-site"
date: "2018-10-08"
title: "Sử dụng aria trên site eCommerce, vấn đề accessibility cần quan tâm"
desc: "Accessible là một thuật ngữ ít bạn làm web quan tâm, không có nghĩa là nó không tồn tại, cùng tham khảo những aria nào cần bổ sung cho trang ecommerce"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui", "mobile-web-specialist"]
---

<!-- TOC -->

- [`aria` là gì](#aria-là-gì)
- [Một vài `aria` phổ biến](#một-vài-aria-phổ-biến)
  - [aria-label và aria-labelledby](#aria-label-và-aria-labelledby)
  - [role](#role)
  - [aria-live](#aria-live)
- [Thêm `aria` cần thiết cho trang ecommerce](#thêm-aria-cần-thiết-cho-trang-ecommerce)

<!-- /TOC -->

## `aria` là gì

ARIA (Accessible Rich Internet Applications) là một attribute trên thẻ HTML, chúng ta gắn thẻ nào cũng được, nội dung này thông tin và tác dụng của thẻ element đó. Với user bình thường thì nó sẽ không có ý nghĩa mấy, nhưng với người sử dụng web thông qua một thiết bị đọc màn hình (cho những người khiếm khuyết) thì nó vô cùng quan trọng.

```html
<div aria-label="button click me">Click Me</div>
```

## Một vài `aria` phổ biến

### `aria-label` và `aria-labelledby`

Chức năng tương tự như attribute `alt` của thẻ `<img/>`, nhưng có thể gắn cho bất kỳ element nào.


```html
<button
    aria-label="menu"
    class="hamburger"
>
</button> 


```

Thay vì thêm `aria-label` trực tiếp, `aria-labelledby` trỏ đến id một element khác để làm label 

![aria-label](https://developers.google.com/web/fundamentals/accessibility/semantics-aria/imgs/aria-label.jpg)

```html
<span id="rg-label">
    Drink options
</span>
<div role="radiogroup"
    aria-labelledby="rg-label"
>
    ...
</div>
```

![aria-labeledby](https://developers.google.com/web/fundamentals/accessibility/semantics-aria/imgs/aria-labelledby.jpg)

### role

Không bắt đầu bằng `aria`, dùng để khai báo công dụng của từng element

- search
- banner
- presentation
- toolbar
- status
- menuitem
- log
- dialog
- link

```html
 
<div src="questionmark.png" role="tooltip" />
```

### aria-live

Thông báo đến user ngay khi nội dung bên trong element gắn thuộc tính này có thay đổi.

Có 2 giá trị có thể thêm cho thuộc tính `aria-live`: **polite**, **assertive**

- **polite**: user không cần tương tác gì, nội dụng tự động cập nhập bởi server, ví dụ như bài viết mới được push lên
- **assertive**: user thực hiện một tương tác làm thay đổi giá trị nào đó, ví dụ như tăng số lượng sản phẩm muốn mua


## aria-owns

Nó cung cấp thông tin "tui là ba của đứa bé". Trường hợp nào chúng ta cần dùng? Ví dụ cái submenu, vì lý do nào đó không đặt nó trong cấu trúc lồng ghép được, phải tách riêng ra, ta khai báo để screen reader biết được ai là ba đứa bé

```html
<div role="menu">
    <div role="menuitem"
        aria-haspopup="true"
    >
        New
    </div>
    <div aria-owns="submenu"></div>
    ...
</div>

<div role="menu" id="submenu">
    <div role="menuitem"></div>
</div>
```

![aria-owns](https://developers.google.com/web/fundamentals/accessibility/semantics-aria/imgs/aria-owns.jpg)

### aria-activedescendant

Thuộc tính này dùng trong cái dropdown, khi cái dropdown được focus, chứa giá trị thằng nào đang được chọn

![aria-activedescendant](https://developers.google.com/web/fundamentals/accessibility/semantics-aria/imgs/aria-activedescendant.jpg)

## Thêm `aria` cần thiết cho trang ecommerce

Mockup ví dụ

![Sử dụng Aria trên site eCommerce, vấn đề accessibility cần quan tâm](https://cms-assets.tutsplus.com/uploads/users/1526/posts/31890/image/untitled_page.png)

Bổ sung cho cái mockup này với các attribute cần thiết

```html
<div role='main'> 
    <div>
        <img
            ...
            aria-labelledby='product-title'
        />
    </div>
 
    <div>
        <h1 id='product-title'>A Nice Bag</h1>
         
        <select
            ...
            aria-label='Color Selection Drop Down'
        >
            <option
                ...
                role='option'
                aria-selected='false'
            >
                Brown
            </option>
        </select>
     
        <input
            ...
            role="checkbox"
            aria-checked="false"
            aria-label='Glossy Bag?'
        >
        <fieldset>
            <legend>Adjust Quantity</legend>
            <div>
            <label for="qty-element">Current Quantity</label>
            <input
                ...
                role="alert"
                aria-live="assertive"
                id="qty-element" 
            />
            <button
                ...
                aria-label='Add to Quantity'
                aria-controls="qty-element"
            >
                +
            </button>
            <button
                ...
                aria-label='Subtract from Quantity'
                aria-controls="qty-element"
            >
                -
            </button>
            </div>
        </fieldset>
        <button aria-label="Add to Cart">Add to Cart</button>
    </div>
     
</div>
```

Nếu trang sản phẩm có các tab thông tin

```html
<div id="tabs" role='comlementary' aria-label="Expanded Content Area">
    <ul role="tablist">
        <li role="presentation">
            <a
                href="#more-info"
                id="tab-more-info"
                role="tab"
                aria-selected="true"
                tabindex="0"
            >
            Product Info
            </a>
        </li>
    </ul>
    <div
        id="more-info"
        role="tabpanel"
        aria-hidden="false"
        aria-labelledby="tab-more-info"
    >
        More product info...
    </div>
</div>
```

![Sử dụng Aria trên site eCommerce, vấn đề accessibility cần quan tâm](https://cms-assets.tutsplus.com/uploads/users/769/posts/31890/image/untitled_page.png)

Menu phân trang

```html
<div role='navigation' aria-label='Pagination Links'>
    1
    <a href="#" aria-controls='product-listings'>2</a>
    <a href="#" aria-controls='product-listings'>3</a>
    ...
    <a href="#" aria-controls='product-listings'>Last</a> 
</div>
```

Danh sách sản phẩm

```html
<div role='main' aria-live='polite'> 
    <div>
        <h2 id='product-title'>A Nice Bag</h2> 
        <img src="bag.jpg" alt="A paper bag" /> 
        <button aria-labelledby='product-title'>Add to cart</button>
    </div>     
    ... 
</div>
```

Để test accessibility của trang thì có thể dùng extention này của chrome  https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en


[Link bài gốc](https://code.tutsplus.com/tutorials/hands-on-with-aria-ecommerce-implementations--cms-31890)