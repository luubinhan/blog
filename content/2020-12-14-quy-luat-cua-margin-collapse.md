Trong CSS, khi 2 giá trị margin nằm liền kề với nhau, được biết với tên "margin collapse", thường gây hiểu nhầm nếu bạn không nắm rule được áp dụng.

Ví dụ với 2 đoạn `p` nằm liền kề nhau như thế này:

```html
<style>
  p {
    margin-top: 24px;
    margin-bottom: 24px;
  }
</style>

<p>Paragraph One</p>
<p>Paragraph Two</p>
```

Thay vì `48px`, thật tế giữa hai thẻ `p` chỉ có khoảng cách là `24px`

Không rõ vì lý do *cá nhân* gì, mà CSS chỉ áp dụng cái luật *margin collapse* này cho giá trị đứng, nếu giá trị margin là `left` hoặc `right`, thì nó lại bình thường

```html
<style>
  p {
    display: inline-block;
    margin-left: 24px;
    margin-right: 24px;
  }
</style>

<p>P1</p>
<p>P2</p>
```

*Khoảng cách giữa (trái phải) là 48px

Chưa đủ *dị*, CSS lại còn có quy định **chỉ khi 2 element nằm liền kề với nhau mới hiệu nghiệm**, nếu có 1 element chèn ở giữa thì lại bình thường 48px

```html
<style>
  p {
    margin-top: 24px;
    margin-bottom: 24px;
  }
</style>

<p>Paragraph One</p>
<br />
<p>Paragraph Two</p>
```

Và sẽ ra sao nếu 2 element có giá trị margin không bằng nhau. **winner take all** sẽ được áp dụng, giá trị nào lớn hơn thì chỉ lấy giá trị đó

```html
<style>
    p {
        margin-bottom: 48px;
    }
    div {
        margin-top: 90px;
    }
</style>

<p>Paragraph One</p>
<div>Paragraph Two</div>
```

*khoảng cách trên dưới sẽ là 90px*

margin collapse không chỉ xuất hiện khi có giá trị `top` và `bottom`, nó còn xảy ra khi có 2 giá trị `top` hoặc `bottom`

```html
<style>
  .parent {
    margin-top: 72px;
  }
  .child {
    margin-top: 24px;
  }
</style>

<div class="parent">
  <p class="child">Paragraph One</p>
</div>
```

Giá trị margin sẽ chỉ lấy top = 72px

Lời khuyên cuối cùng, nếu thực sự hiểu và nhớ mình đang viết gì thì dùng margin, còn không thì dùng `padding` cho an toàn.