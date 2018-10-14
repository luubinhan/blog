---
slug: "/2018-10-08-huong-dan-aria-va-su-dung-voi-ecommerce-site"
date: "2018-10-08"
title: "Sử dụng aria trên site eCommerce, vấn đề accessibility cần quan tâm"
desc: "Accessible là một thuật ngữ ít bạn làm web quan tâm, không có nghĩa là nó không tồn tại, cùng tham khảo những aria nào cần bổ sung cho trang ecommerce"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui"]
---

<!-- TOC -->

- [`aria` là gì](#aria-là-gì)
- [Một vài `aria` phổ biến](#một-vài-aria-phổ-biến)
  - [aria-label và aria-labelledby](#aria-label-và-aria-labelledby)
  - [role](#role)
  - [aria-live](#aria-live)
- [Thêm `aria` cần thiết cho trang ecommerce](#thêm-aria-cần-thiết-cho-trang-ecommerce)

<!-- /TOC -->

# `aria` là gì

ARIA (Accessible Rich Internet Applications) là một tập các guideline yêu cầu gắn attribute trên thẻ HTML, nội dung của mấy attribute này sẽ phản ánh nội dung và công năng của element. Với user bình thường thì nó sẽ không có ý nghĩa mấy, nhưng với người sử dụng web thông qua một thiết bị trợ giúp (cho những người khiếm khuyết) thì nó vô cùng quan trọng.

# Một vài `aria` phổ biến

## aria-label và aria-labelledby

Chức năng tương tự như attribute `alt` của thẻ `<img/>`, nhưng có thể gắn cho bất kỳ element nào.

```html
<div aria-label="Descriptive text"/>

<!-- thay vì thêm label trực tiếp, trỏ đến id của một element khác để làm label -->
 
<img aria-labelledby="image-text-desc" src="#" />
 
<div id="image-text-desc">A text description of the image, visible on the screen</div>

```

## role

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

## aria-live

Thông báo đến user ngay khi nội dung bên trong element gắn thuộc tính này có thay đổi.

Có 2 giá trị có thể thêm cho thuộc tính `aria-live`: **polite**, **assertive**

- **polite**: user không cần tương tác gì, nội dụng tự động cập nhập bởi server, ví dụ như bài viết mới được push lên
- **assertive**: user thực hiện một tương tác làm thay đổi giá trị nào đó, ví dụ như tăng số lượng sản phẩm muốn mua

# Thêm `aria` cần thiết cho trang ecommerce

Mockup ví dụ

![Sử dụng Aria trên site eCommerce, vấn đề accessibility cần quan tâm](https://cms-assets.tutsplus.com/uploads/users/1526/posts/31890/image/untitled_page.png)

```html
<!-- Our code before any changes -->
<div class='row-wrapper'>
 
    <div class='left-column'>
        <img src='bag-image.jpg' alt='brown bag' />
    </div>
 
    <div class='right-column'>
        <h1>A Nice Bag</h1>
        <p>Bag Size:<br/>100x150mm</p>
 
        <select name='color-options'>
            <option value="brown">Brown</option>
            <option value="black">Black</option>
        </select>
    
        <input type="checkbox" value="Glossy"> 
        <fieldset>
            <legend>Adjust Quantity</legend>
            <div>
            <label for="qty-element">Current Quantity</label>
            <input type="text" value="0" id="qty-element" />
            <button type="button">+</button>
            <button type="button" title="subtract 10">=</button>
            </div>
        </fieldset>
        <button>Add to cart</button>
    </div> 
</div>
```

Bổ sung cho cái mockup này với các attribute cần thiết

```html
<div class='row-wrapper' role='main'>
 
    <div class='left-column'>
        <img
            src='bag-image.jpg'
            alt='brown bag'
            aria-labelledby='product-title'
        />
    </div>
 
    <div class='right-column'>
        <h1 id='product-title'>A Nice Bag</h1>
         
        <select name='color-options'
            aria-label='Color Selection Drop Down'>
            <option role='option' aria-selected='false' value="brown">Brown</option>
            <option role='option' aria-selected='false' value="black">Black</option>
        </select>
     
        <input type="checkbox" value="Glossy" role="checkbox" aria-checked="false" aria-label='Glossy Bag?'><br>
        <fieldset>
            <legend>Adjust Quantity</legend>
            <div>
            <label for="qty-element">Current Quantity</label>
            <input type="text" role="alert" aria-live="assertive" value="0" id="qty-element" />
            <button type="button" aria-label='Add to Quantity' aria-controls="qty-element">+</button>
            <button type="button" aria-label='Subtract from Quantity' title="subtract 10" aria-controls="qty-element">=</button>
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
        <li role="presentation"><a href="#more-info" id="tab-more-info" role="tab" aria-selected="true" tabindex="0">Product Info</a></li>
    </ul>
    <div id="more-info" role="tabpanel" aria-hidden="false" aria-labelledby="tab-more-info">
        More product info...
    </div>
</div>
```

![Sử dụng Aria trên site eCommerce, vấn đề accessibility cần quan tâm](https://cms-assets.tutsplus.com/uploads/users/769/posts/31890/image/untitled_page.png)

Menu phân trang

```html
<div id='pagination' role='navigation' aria-label='Pagination Links'>
 
    1
    <a href="#" aria-controls='product-listings'>2</a>
    <a href="#" aria-controls='product-listings'>3</a>
    ...
    <a href="#" aria-controls='product-listings'>Last</a>
 
</div>
```

Menu Categories

```html
<div id='faceted-navigation' role='navigation' aria-controls='product-listings'>
 
    <p>Color Sort</p>
    <a href="#" aria-label='Sort by Red'>Red</a>
    <a href="#" aria-label='Sort by Green'>Green</a>
    <a href="#" aria-label='Sort by Black'>Black</a>
 
    <p>Size Sort</p>
    <a href="#" aria-label='Sort by Large'>Large</a>
    <a href="#" aria-label='Sort by Small'>Small</a>
 
</div>
```

Danh sách sản phẩm

```html
<div id='product-listings' role='main' aria-live='polite'>
 
    <div id='product-block'>
        <h2 id='product-title'>A Nice Bag</h2>
 
        <img src="bag.jpg" alt="A paper bag" />
 
        <button aria-labelledby='product-title'>Add to cart</button>
    </div>
     
    ...
 
</div>
```

Để test accessibility của trang thì có thể dùng extention này của chrome  https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en



[Link bài gốc](https://code.tutsplus.com/tutorials/hands-on-with-aria-ecommerce-implementations--cms-31890)