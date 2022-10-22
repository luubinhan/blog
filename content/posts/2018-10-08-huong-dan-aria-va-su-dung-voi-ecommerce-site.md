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

- [`aria` là gì](#aria-l%c3%a0-g%c3%ac)
- [Một vài `aria` phổ biến](#m%e1%bb%99t-v%c3%a0i-aria-ph%e1%bb%95-bi%e1%ba%bfn)
  - [`aria-label` và `aria-labelledby`](#aria-label-v%c3%a0-aria-labelledby)
  - [role](#role)
  - [aria-live](#aria-live)
- [aria-owns](#aria-owns)
  - [aria-activedescendant](#aria-activedescendant)
  - [aria-pressed](#aria-pressed)
  - [aria-hidden](#aria-hidden)
- [Thêm `aria` cần thiết cho trang ecommerce](#th%c3%aam-aria-c%e1%ba%a7n-thi%e1%ba%bft-cho-trang-ecommerce)

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

### aria-pressed

Thông tin về trạng thái "bị nhấn" của một element

```html
<div class="button" role="button" aria-pressed="true">Save</div>
```

Để định dạng cho theo từng giá trị của `aria`, lấy ví như cái `pressed` này, chúng ta dùng css selector

```css
.button[aria-pressed="true"] { ... }
```

### aria-hidden

Nếu chúng ta muốn bỏ qua những element khỏi "ánh mắt dòm ngó" của screen reader, dùng `aria-hidden`, ngoài ra nếu các element này được định dạng là `visibility: hidden`, `display: none` hay `hidden` thì nó cũng sẽ bị bỏ qua

```html
<div hidden>Ko thấy đâu</div>
<div aria-hidden="true">Vấn thấy, nhưng screen reader ko đọc</div>
```

Còn có nhưng element không được hiển thị cho user thấy, những vẫn được dòm ngó bởi screen reader, kỹ thuật css sẽ làm điều đó

```css
.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

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

Để test accessibility của trang thì có thể dùng [extention này của chrome](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)

Bài viết liên quan

- [Ràng buộc dữ liệu input với HTML5](2019-03-25-rang-buoc-du-lieu-voi-html-5/)
- [Giới thiệu focus trên web](/2018-10-05-gioi-thieu-focus)
- [Sử dụng tabindex](https://luubinhan.github.io/blog/2018-10-02-huong-dan-su-dung-tabindex-de-di-chuyen/)

<a target="_blank" rel="noopener noreferrer" href="https://code.tutsplus.com/tutorials/hands-on-with-aria-ecommerce-implementations--cms-31890">📜 Hands-on With ARIA: Accessibility for eCommerce</a>

<a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/web/fundamentals/accessibility/accessible-styles">📜 Styling focus</a>