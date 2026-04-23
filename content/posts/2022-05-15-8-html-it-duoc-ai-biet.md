---
slug: "2022-05-15-8-html-it-duoc-ai-biet"
date: "2022-05-15"
title: "8 thẻ html ít ai biết nhưng lại rất hay ho"
desc: ""
tags: ["css", "beginner", "hoc-thuat"]
---

<!-- TOC -->

- [`s`](#s)
- [`ruby`, `rt`, `rp`](#ruby-rt-rp)
- [`details`](#details)
- [`optgroup`](#optgroup)
- [`meter`](#meter)
- [`progress`](#progress)
- [`kbd`](#kbd)
- [`bdo`](#bdo)

<!-- /TOC -->

## `s`
Được dùng để đánh dấu một nội dung không còn chính xác nữa, ví dụ giá cũ. Nội dung sẽ bị gạch ngang

```html
<h4><s>10.000 đ</s> <span>9.999 đ</span></h4>
```

CSS để có format giống như tag `<s>`

```css
.line-through {
	text-decoration: line-through;
}
```
## `ruby`, `rt`, `rp`
Thêm phần ghi chú, lúc đầu được thiết kế để dùng thêm chú thích cho các ký tự không phải latin

```html
<ruby>帶翅膀<rt>Carmine</rt></ruby>
<ruby>的老鼠<rt>Falcone</rt></ruby>
```
![](https://res.cloudinary.com/practicaldev/image/fetch/s--iNjF4CSp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1xmmeopz2m96ngxh7a6h.png)

## `details`
Cũng dùng để thêm chú thích, nhưng dưới dạng *collapse*, user có thể đóng/mở phần chú thích này

```html
<details>
	<summary style="cursor:pointer;">Xem diễn giải</summary>
	<p>
		Đây là nội dung có ích lắm
	</p>
</details> 
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--hQRdd3Sa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xgal47336yb6ktmuccqm.png)

## `optgroup`
Được dùng để gộp các element liên quan với nhau bên trong `<select>`

```html
<select>
	<optgroup label="Trái cây">
		<option value="cam">Cam</option>
		<option value="dua-hau">Dưa hấu</option>
	</optgroup>
	<optgroup label="Nước Ép">
		<option value="ca-sau">Cá sấu</option>
		<option value="khung-long">Khủng Long</option>
	</optgroup>
</select>
```

## `meter`

Hiển thị `gauge` (cột năng lượng), như vầy nè

![](https://res.cloudinary.com/practicaldev/image/fetch/s--oG5gI0AM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/11rwsx8j10ccqaak6zhs.png)

```html
<p> 0L 
    <meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="20">
        at 50/100
    </meter> 5L
</p>

<p> 0L 
    <meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="50">
        at 50/100
    </meter> 5L
</p>
<p> 0L 
    <meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="80">
        at 50/100
    </meter> 5L
</p>
```

## `progress`

Như tên đã nói lên tất cả, dùng để hiển thị tiến trình, cũng hơi na ná với `meter` há

```html
<label for="file">File progress:</label>
<progress id="file" max="100" value="70"> 70% </progress>
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--guaJQXSD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6wm0r9c5ez7iasz6gj3q.png)

## `kbd`

Được thiết kế *kẹp*  phím tắt, nội dung bên trong sẽ được mặc định hiện thị bằng font `monospace`

```html
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text (Windows).</p>
```
![](https://res.cloudinary.com/practicaldev/image/fetch/s--IDPlHZaK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vgqcbg81dptv46om81up.png)

## `bdo`

Viết tắt cho `Bi-Directional Override`, hiển thị text ở dạng animate, đổi hướng hiển thị, một trong những tag ít sử dụng và *lạ* nhất so với những thằng đã kể trên

```html
<p><bdo dir="rtl">May the force be with you.</bdo></p>
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--g9ok-gPV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i54v3vic225493ihkkuy.gif)

[8 Unknown HTML tags that are actually quite useful](https://dev.to/samsundar/8-unknown-html-tags-that-are-actually-quite-useful-2l45)